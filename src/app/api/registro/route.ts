import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clinicName, rutEmpresa, nombre, apellido, email, password, phone, planSlug } = body

    if (!clinicName || !nombre || !email || !password) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const admin = createAdminClient()

    // 1. Create auth user
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Error creando usuario' }, { status: 400 })
    }
    const authId = authData.user.id

    // 2. Create clinic with unique slug
    const baseSlug = generateSlug(clinicName)
    let slug = baseSlug
    let attempt = 0
    while (attempt < 5) {
      const { data: existing } = await admin.from('clinics').select('id').eq('slug', slug).maybeSingle()
      if (!existing) break
      attempt++
      slug = `${baseSlug}-${attempt}`
    }

    const { data: clinic, error: clinicError } = await admin
      .from('clinics')
      .insert({
        name: clinicName,
        slug,
        rut_empresa: rutEmpresa || null,
        phone: phone || null,
        email,
        timezone: 'America/Santiago',
        currency: 'CLP',
        country: 'CL',
        plan: 'starter',
        plan_slug: planSlug || 'trial',
        is_active: true,
      })
      .select()
      .single()

    if (clinicError || !clinic) {
      await admin.auth.admin.deleteUser(authId)
      return NextResponse.json({ error: clinicError?.message || 'Error creando clínica' }, { status: 400 })
    }

    // 3. Create user record
    const { data: userRecord, error: userError } = await admin
      .from('users')
      .insert({
        clinic_id: clinic.id,
        auth_id: authId,
        email,
        nombre,
        apellido: apellido || '',
        role: 'admin',
        phone: phone || null,
        is_active: true,
        is_super_admin: false,
      })
      .select()
      .single()

    if (userError || !userRecord) {
      await admin.auth.admin.deleteUser(authId)
      await admin.from('clinics').delete().eq('id', clinic.id)
      return NextResponse.json({ error: userError?.message || 'Error creando usuario' }, { status: 400 })
    }

    // Update clinic owner_id
    await admin.from('clinics').update({ owner_id: userRecord.id }).eq('id', clinic.id)

    // 4. Create subscription (trial)
    const trialEnd = new Date()
    trialEnd.setDate(trialEnd.getDate() + 30)

    await admin.from('subscriptions').insert({
      clinic_id: clinic.id,
      status: 'trial',
      trial_ends_at: trialEnd.toISOString(),
      current_period_start: new Date().toISOString(),
      current_period_end: trialEnd.toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: '¡Cuenta creada exitosamente! 30 días de prueba activados.',
      clinicId: clinic.id,
    })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
