'use client'
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.aliroxclinic.cl'

const PLANS = [
  { slug: 'basic', name: 'Básico', price: '$19.990/mes' },
  { slug: 'pro', name: 'Pro', price: '$39.990/mes' },
  { slug: 'pro_ia', name: 'Pro + IA', price: '$59.990/mes' },
  { slug: 'enterprise', name: 'Enterprise', price: '$99.990/mes' },
]

function formatRut(value: string): string {
  const clean = value.replace(/[^0-9kK]/g, '').toUpperCase()
  if (clean.length < 2) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formatted}-${dv}`
}

function RegistroForm() {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    clinicName: '',
    rutEmpresa: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    phone: '',
    planSlug: 'pro_ia',
    terms: false,
  })

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan) setForm(f => ({ ...f, planSlug: plan }))
  }, [searchParams])

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.terms) { setError('Debes aceptar los términos y condiciones'); return }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }

    setLoading(true)
    setError(null)

    try {
      // Create account via API route
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicName: form.clinicName,
          rutEmpresa: form.rutEmpresa,
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
          phone: form.phone,
          planSlug: form.planSlug,
        }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Error al crear la cuenta')
        setLoading(false)
        return
      }

      // Now sign in with the credentials
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      if (signInError) {
        // Account created but can't sign in automatically
        setSuccess(true)
        setLoading(false)
        return
      }

      // Redirect to app dashboard with welcome message
      window.location.href = `${APP_URL}/dashboard?welcome=1`
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0c0f] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#111318] border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#00d4a0]/15 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-[#00d4a0]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">¡Cuenta creada!</h2>
          <p className="text-gray-400 text-sm mb-6">Tu clínica fue registrada exitosamente. Ahora puedes iniciar sesión.</p>
          <a href={`${APP_URL}/login`} className="block w-full bg-[#00d4a0] hover:bg-[#00b389] text-[#0a0c0f] font-semibold py-2.5 rounded-xl text-center transition-colors">
            Iniciar sesión
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0c0f] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={14} /> Volver
          </Link>
        </div>

        <div className="bg-[#111318] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,160,0.15)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                <path d="M50 10 C35 10,20 25,20 40 C20 55,30 65,35 75 C38 82,40 90,45 90 C48 90,49 85,50 80 C51 85,52 90,55 90 C60 90,62 82,65 75 C70 65,80 55,80 40 C80 25,65 10,50 10Z" fill="#00d4a0"/>
              </svg>
            </div>
            <span className="font-bold text-white">Alirox Clinic</span>
          </div>

          <h1 className="text-xl font-bold text-white mb-1">Crea tu cuenta gratis</h1>
          <p className="text-sm text-gray-500 mb-6">30 días de prueba sin tarjeta de crédito</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Clinic */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Nombre de la clínica *</label>
              <input
                required
                value={form.clinicName}
                onChange={e => set('clinicName', e.target.value)}
                placeholder="Ej: Clínica Dental Sonrisa"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">RUT empresa</label>
              <input
                value={form.rutEmpresa}
                onChange={e => set('rutEmpresa', formatRut(e.target.value))}
                placeholder="76.123.456-7"
                maxLength={12}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
              />
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Nombre *</label>
                <input
                  required
                  value={form.nombre}
                  onChange={e => set('nombre', e.target.value)}
                  placeholder="Juan"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Apellido</label>
                <input
                  value={form.apellido}
                  onChange={e => set('apellido', e.target.value)}
                  placeholder="Pérez"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="admin@tuclinica.cl"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Contraseña *</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Teléfono</label>
              <input
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+56 9 1234 5678"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00d4a0]/50"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Plan seleccionado</label>
              <div className="grid grid-cols-2 gap-2">
                {PLANS.map(p => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => set('planSlug', p.slug)}
                    className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${form.planSlug === p.slug ? 'border-[#00d4a0] bg-[#00d4a0]/8 text-white' : 'border-white/10 text-gray-400 hover:border-white/20'}`}
                  >
                    <div className="font-medium">{p.name}</div>
                    <div className="text-gray-500 mt-0.5">{p.price}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-1.5">Gratis 30 días, luego se cobra el plan elegido</p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={e => set('terms', e.target.checked)}
                className="mt-0.5 accent-[#00d4a0]"
              />
              <span className="text-xs text-gray-400">
                Acepto los <span className="text-[#00d4a0]">términos y condiciones</span> y la política de privacidad de Alirox Clinic
              </span>
            </label>

            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4a0] hover:bg-[#00b389] disabled:opacity-50 text-[#0a0c0f] font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta gratis'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            ¿Ya tienes cuenta?{' '}
            <a href={`${APP_URL}/login`} className="text-[#00d4a0] font-medium hover:underline">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegistroPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0c0f] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#00d4a0] border-t-transparent rounded-full" />
      </div>
    }>
      <RegistroForm />
    </Suspense>
  )
}
