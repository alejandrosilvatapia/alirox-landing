'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Play, ArrowRight } from 'lucide-react'
import AliroxLogo from '@/components/ui/AliroxLogo'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.aliroxclinic.cl'

// ── Data ──────────────────────────────────────────────────────────────────────

const DEMO_STEPS = [
  {
    tab: 'Dashboard',
    title: 'Panel de control',
    desc: 'Visualiza los KPIs más importantes de tu clínica en tiempo real: citas del día, ingresos del mes, tasa de inasistencia y pacientes activos. Todo actualizado al instante.',
    tip: 'El dashboard se actualiza cada 30 segundos y puede personalizarse según tu rol.',
  },
  {
    tab: 'Agenda',
    title: 'Agenda inteligente',
    desc: 'Gestiona las citas con una vista semanal clara. Filtra por dentista, sala o tratamiento. El sistema detecta automáticamente los horarios disponibles y bloquea solapamientos.',
    tip: 'Los pacientes pueden agendar directamente desde WhatsApp sin llamar a la clínica.',
  },
  {
    tab: 'Pacientes',
    title: 'Fichas clínicas completas',
    desc: 'Cada paciente tiene su ficha completa: odontograma FDI, anamnesis, historial de tratamientos, recetas y documentos. Todo en un solo lugar, accesible desde cualquier dispositivo.',
    tip: 'El odontograma se actualiza en tiempo real mientras el dentista trabaja en consulta.',
  },
  {
    tab: 'Presupuestos',
    title: 'Cotizaciones digitales',
    desc: 'Crea presupuestos detallados con tratamientos, precios y planes de pago. El paciente los recibe por WhatsApp y puede aprobarlos digitalmente con un clic.',
    tip: 'Los presupuestos aprobados generan automáticamente el plan de tratamiento.',
  },
  {
    tab: 'IA Dental',
    title: 'Recepcionista virtual 24/7',
    desc: 'Tu agente IA atiende consultas, agenda citas y responde preguntas por WhatsApp, Instagram y Facebook — las 24 horas, los 7 días. Sin tiempo de espera para tus pacientes.',
    tip: 'La IA aprende de tu clínica: servicios, precios, horarios y protocolos personalizados.',
  },
]

type BillingPeriod = 'monthly' | 'semiannual' | 'annual'

const PLANS = [
  {
    id: 'basico',
    name: 'Básico',
    prices: { monthly: 19990, semiannual: 99950, annual: 199900 },
    dentists: '1 dentista',
    popular: false,
    features: ['Agenda inteligente', 'Fichas de pacientes', 'Presupuestos y pagos', 'Recordatorios email', 'Pacientes ilimitados', 'Soporte por email'],
    highlightedFeatures: [],
  },
  {
    id: 'pro',
    name: 'Pro',
    prices: { monthly: 39990, semiannual: 199950, annual: 399900 },
    dentists: 'Hasta 5 dentistas',
    popular: false,
    features: ['Todo Básico incluido', 'Facturación electrónica', 'Reportes avanzados', 'Comisiones dentistas', 'Gastos operacionales', 'Soporte prioritario'],
    highlightedFeatures: [],
  },
  {
    id: 'proia',
    name: 'Pro + IA',
    prices: { monthly: 59990, semiannual: 299950, annual: 599900 },
    dentists: 'Hasta 10 dentistas',
    popular: true,
    features: ['Todo Pro incluido', 'Agente IA 24/7', '500 WhatsApp/mes', 'Campañas de marketing', 'Instagram + Facebook', 'Motor de ventas IA'],
    highlightedFeatures: ['Agente IA 24/7', '500 WhatsApp/mes'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    prices: { monthly: 99990, semiannual: 499950, annual: 999900 },
    dentists: 'Dentistas ilimitados',
    popular: false,
    features: ['Todo Pro + IA', 'Sucursales ilimitadas', '1.000 WhatsApp/mes', 'API FHIR R4 completa', 'Soporte dedicado 24/7', 'SLA 99.9% garantizado'],
    highlightedFeatures: [],
  },
]

function getMonthlyEquivalent(plan: typeof PLANS[0], period: BillingPeriod) {
  if (period === 'monthly') return plan.prices.monthly
  if (period === 'semiannual') return Math.round(plan.prices.semiannual / 6)
  return Math.round(plan.prices.annual / 12)
}

function getSavingsText(plan: typeof PLANS[0], period: BillingPeriod) {
  if (period === 'monthly') return null
  const freeMonths = period === 'semiannual' ? 1 : 2
  const totalPrice = period === 'semiannual' ? plan.prices.semiannual : plan.prices.annual
  const periodLabel = period === 'semiannual' ? 'semestre' : 'año'
  return `${freeMonths} ${freeMonths === 1 ? 'mes gratis' : 'meses gratis'} · Pagas $${formatCLP(totalPrice)}/${periodLabel}`
}

const TESTIMONIALS = [
  {
    initials: 'CT',
    bg: '#7c3aed',
    name: 'Dra. Camila Torres',
    role: 'Directora, Clínica Torres & Asociados',
    text: 'Desde que usamos Alirox, nuestros ingresos aumentaron un 40% en sólo 3 meses. La IA agenda mientras dormimos y las inasistencias desaparecieron.',
    stat: '+40% ingresos en 3 meses',
  },
  {
    initials: 'RM',
    bg: '#2563eb',
    name: 'Dr. Rodrigo Muñoz',
    role: 'Dentista General, Santiago Centro',
    text: 'Las inasistencias bajaron un 80%. Los recordatorios automáticos por WhatsApp son un cambio total de juego. Mis pacientes agradecen la atención inmediata.',
    stat: '-80% inasistencias',
  },
  {
    initials: 'VS',
    bg: '#db2777',
    name: 'Valentina Soto',
    role: 'Administradora, ClínicaDent Providencia',
    text: 'Ahorro 5 horas a la semana en gestión administrativa. Todo está en un solo lugar, simple y rápido. El equipo de soporte siempre disponible en español.',
    stat: '5 horas/semana ahorradas',
  },
]

const FAQ_ITEMS = [
  {
    q: '¿Necesito instalar algún software?',
    a: 'No. Alirox funciona 100% en la nube. Accede desde cualquier computador, tablet o celular con tu navegador. Sin instalaciones ni actualizaciones manuales.',
  },
  {
    q: '¿Cuánto tiempo tarda la configuración?',
    a: 'En menos de 24 horas tu clínica está lista. Nuestro equipo te acompaña en la configuración inicial sin costo adicional. Importamos tus datos existentes si los tienes.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí. Sin contratos de permanencia ni letras pequeñas. Cancela cuando quieras desde tu panel, sin penalizaciones ni preguntas incómodas.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Totalmente. Usamos cifrado AES-256 en tránsito y en reposo, backups diarios automáticos y alojamos en infraestructura enterprise con certificaciones de seguridad.',
  },
  {
    q: '¿Qué canales de comunicación incluye?',
    a: 'WhatsApp Business API, Instagram Direct y Facebook Messenger. Todo en una bandeja de entrada unificada. Los planes Pro + IA incluyen el agente omnicanal 24/7.',
  },
  {
    q: '¿Ofrecen soporte en español?',
    a: 'Sí. Soporte por chat y email en español, de lunes a viernes de 9 a 18 hrs. Los planes Pro y superiores incluyen soporte prioritario con tiempos de respuesta menores a 2 horas.',
  },
]

function formatCLP(n: number) {
  return n.toLocaleString('es-CL')
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [demoStep, setDemoStep] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('semiannual')

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-white">

      {/* ── 1. NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-[#0a0c0f]/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <AliroxLogo size="sm" theme="dark" />
          {/* Links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#caracteristicas" className="text-sm text-gray-400 hover:text-white transition-colors">Características</a>
            <a href="#precios" className="text-sm text-gray-400 hover:text-white transition-colors">Precios</a>
            <a href="#demo-sec" className="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`${APP_URL}/login`}
              className="text-sm px-4 py-2 rounded-lg text-white border transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)' }}
            >
              Iniciar sesión
            </a>
            <a
              href="https://app.aliroxclinic.cl/registro"
              className="text-sm px-4 py-2 rounded-lg font-bold transition-colors hover:opacity-90"
              style={{ background: '#00d4a0', color: '#04342C' }}
            >
              Prueba gratis
            </a>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO ── */}
      <section className="max-w-[820px] mx-auto px-4 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#00d4a0]/10 border border-[#00d4a0]/25 rounded-full px-4 py-1.5 text-sm text-[#00d4a0] mb-7">
          ✦ IA que agenda por WhatsApp, Instagram y Facebook — 24/7
        </div>

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
          Tu clínica dental,<br />
          en{' '}
          <span style={{ color: '#00d4a0' }}>piloto automático</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Agenda inteligente, fichas clínicas digitales, facturación y un agente IA que atiende a tus pacientes 24/7 por WhatsApp, Instagram y Facebook.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <a
            href="https://app.aliroxclinic.cl/registro"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-colors hover:opacity-90"
            style={{ background: '#00d4a0', color: '#04342C' }}
          >
            Prueba gratis — 15 días <ArrowRight size={16} />
          </a>
          <a
            href="#demo-sec"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base border-2 border-white/30 text-white hover:border-white/60 transition-colors"
          >
            <Play size={14} fill="currentColor" /> Ver demo interactivo
          </a>
        </div>

        <p className="text-xs text-gray-500 mb-10">
          Sin tarjeta de crédito · Cancela cuando quieras · Soporte en español
        </p>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {[
              { bg: '#00d4a0', t: 'MG' },
              { bg: '#7c3aed', t: 'JR' },
              { bg: '#f59e0b', t: 'CT' },
              { bg: '#db2777', t: 'VS' },
              { bg: '#2563eb', t: 'RM' },
            ].map(av => (
              <div
                key={av.t}
                className="w-8 h-8 rounded-full border-2 border-[#0a0c0f] flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: av.bg }}
              >
                {av.t}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: '#00d4a0' }}>★★★★★</span>
            <span className="text-sm text-gray-300">+500 dentistas en Chile confían en Alirox</span>
          </div>
        </div>
      </section>

      {/* ── 3. SCREENSHOT DASHBOARD ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4a0' }}>La plataforma</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Todo en un solo lugar</h2>
          <p className="text-gray-400">Así se ve Alirox Clinic en tu clínica</p>
        </div>

        {/* Browser window */}
        <div className="bg-[#111318] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8" style={{ background: '#0d1014' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 bg-white/5 rounded-md h-6 flex items-center px-3 max-w-xs mx-auto">
              <span className="text-xs text-gray-500 truncate">app.aliroxclinic.cl/dashboard</span>
            </div>
          </div>

          {/* Dashboard layout */}
          <div className="flex" style={{ minHeight: 340 }}>
            {/* Sidebar */}
            <div className="w-36 border-r border-white/8 p-3 flex-shrink-0" style={{ background: '#111318' }}>
              {/* Mini logo */}
              <div className="flex items-center gap-1.5 mb-5 pb-3 border-b border-white/8">
                <div className="w-6 h-6 rounded-md border border-[#00d4a0] flex items-center justify-center flex-shrink-0" style={{ background: '#111318' }}>
                  <span className="text-[#00d4a0] text-xs font-bold">A</span>
                </div>
                <div>
                  <p className="text-white text-[10px] font-semibold leading-tight">Alirox</p>
                  <p className="text-[#00d4a0] text-[7px] font-semibold leading-tight">AI DENTAL</p>
                </div>
              </div>
              {[
                { label: 'Dashboard', active: true },
                { label: 'Agenda', active: false },
                { label: 'Pacientes', active: false },
                { label: 'Bandeja', active: false },
                { label: 'IA Dental', active: false },
                { label: 'Reportes', active: false },
              ].map(item => (
                <div
                  key={item.label}
                  className={`px-2 py-1.5 rounded-md mb-1 text-[10px] font-medium ${
                    item.active
                      ? 'border-l-2 pl-1.5'
                      : 'text-gray-500'
                  }`}
                  style={item.active ? { background: 'rgba(0,212,160,0.10)', color: '#00d4a0', borderLeftColor: '#00d4a0' } : {}}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-5" style={{ background: '#0a0c0f' }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-white text-sm font-semibold">Clínica Dental Centro</h3>
                  <p className="text-gray-500 text-xs mt-0.5">Martes, 1 de Abril 2026</p>
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(0,212,160,0.2)', color: '#00d4a0' }}>
                  DR
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Citas hoy', value: '12', color: '#00d4a0' },
                  { label: 'Ingresos mes', value: '$842K', color: '#a78bfa' },
                  { label: 'Inasistencia', value: '2.1%', color: '#fbbf24' },
                  { label: 'Pacientes', value: '284', color: '#60a5fa' },
                ].map(k => (
                  <div key={k.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <p className="text-gray-500 text-[10px]">{k.label}</p>
                    <p className="text-sm font-bold mt-1" style={{ color: k.color }}>{k.value}</p>
                  </div>
                ))}
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Agenda hoy */}
                <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-white text-xs font-semibold mb-3">Agenda hoy</p>
                  {[
                    { time: '09:00', name: 'María G.', color: '#00d4a0' },
                    { time: '10:30', name: 'Carlos M.', color: '#60a5fa' },
                    { time: '11:00', name: 'Ana P.', color: '#fbbf24' },
                    { time: '14:00', name: 'Luis R.', color: '#00d4a0' },
                  ].map(slot => (
                    <div key={slot.time} className="flex items-center gap-2 mb-1.5">
                      <span className="text-gray-500 text-[10px] w-8 shrink-0">{slot.time}</span>
                      <div
                        className="flex-1 h-5 rounded flex items-center px-2"
                        style={{ background: `${slot.color}18` }}
                      >
                        <span className="text-[10px] text-gray-300">{slot.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp IA */}
                <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <p className="text-white text-xs font-semibold">IA WhatsApp</p>
                    <div className="px-1.5 py-0.5 rounded-full text-[8px] font-semibold" style={{ background: 'rgba(0,212,160,0.15)', color: '#00d4a0' }}>
                      EN VIVO
                    </div>
                  </div>
                  {[
                    { msg: '¿Tienen hora para el jueves?', from: 'p' },
                    { msg: 'Sí, tengo las 11:00 disponibles ¿le acomoda?', from: 'ai' },
                    { msg: '¡Perfecto! Confirmo para el jueves 11:00', from: 'p' },
                    { msg: 'Cita confirmada ✓ Le envío recordatorio mañana.', from: 'ai' },
                  ].map((m, i) => (
                    <div key={i} className={`mb-1.5 flex ${m.from === 'ai' ? 'justify-end' : ''}`}>
                      <div
                        className="px-2 py-1 rounded-lg text-[9px] max-w-[85%]"
                        style={
                          m.from === 'ai'
                            ? { background: 'rgba(0,212,160,0.15)', color: '#00d4a0' }
                            : { background: 'rgba(255,255,255,0.08)', color: '#d1d5db' }
                        }
                      >
                        {m.msg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GRID 2 SCREENSHOTS ── */}
      <section id="caracteristicas" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Agenda screenshot */}
          <div>
            <div className="bg-[#111318] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8" style={{ background: '#0d1014' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded h-5 flex items-center px-2">
                  <span className="text-[10px] text-gray-500">app.aliroxclinic.cl/agenda</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-4" style={{ background: '#0a0c0f' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white text-xs font-semibold">Semana 30 Mar – 4 Abr</p>
                  <div className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: '#00d4a0', color: '#04342C' }}>
                    + Nueva cita
                  </div>
                </div>
                {/* Days header */}
                <div className="grid grid-cols-6 gap-1 mb-2">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                    <div key={d} className="text-center text-gray-500 text-[10px] font-medium">{d}</div>
                  ))}
                </div>
                {/* Slots */}
                <div className="space-y-1.5">
                  {[
                    { time: '09:00', name: 'María G.', type: 'confirmed' },
                    { time: '10:30', name: 'Carlos M.', type: 'pending' },
                    { time: '11:00', name: 'Ana P.', type: 'confirmed' },
                    { time: '14:00', name: 'Luis R.', type: 'confirmed' },
                    { time: '15:30', name: 'Carmen V.', type: 'pending' },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md border-l-2"
                      style={
                        a.type === 'confirmed'
                          ? { background: 'rgba(0,212,160,0.08)', borderLeftColor: '#00d4a0' }
                          : { background: 'rgba(251,191,36,0.08)', borderLeftColor: '#fbbf24' }
                      }
                    >
                      <span className="text-gray-500 text-[10px] w-8 shrink-0">{a.time}</span>
                      <span className="text-gray-200 text-[10px]">{a.name}</span>
                      <span
                        className="ml-auto text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                        style={
                          a.type === 'confirmed'
                            ? { background: 'rgba(0,212,160,0.15)', color: '#00d4a0' }
                            : { background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }
                        }
                      >
                        {a.type === 'confirmed' ? 'Confirmada' : 'En espera'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center mt-3 text-xs font-medium" style={{ color: '#00d4a0' }}>
              Agenda semanal inteligente
            </p>
          </div>

          {/* Ficha clínica screenshot */}
          <div>
            <div className="bg-[#111318] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8" style={{ background: '#0d1014' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded h-5 flex items-center px-2">
                  <span className="text-[10px] text-gray-500">app.aliroxclinic.cl/ficha/123</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-4" style={{ background: '#0a0c0f' }}>
                {/* Patient header */}
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-white/8">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(124,58,237,0.25)', color: '#a78bfa' }}>
                    MG
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold">María González P.</p>
                    <p className="text-gray-500 text-[10px]">RUT 12.345.678-9 · 34 años</p>
                  </div>
                  <div className="px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
                    ALÉRGICA
                  </div>
                </div>
                {/* Tabs */}
                <div className="flex gap-3 mb-3 border-b border-white/8">
                  <span className="pb-1.5 text-[10px] font-semibold border-b-2" style={{ color: '#00d4a0', borderBottomColor: '#00d4a0' }}>Odontograma</span>
                  <span className="pb-1.5 text-[10px] text-gray-500">Anamnesis</span>
                  <span className="pb-1.5 text-[10px] text-gray-500">Historial</span>
                  <span className="pb-1.5 text-[10px] text-gray-500">Recetas</span>
                </div>
                {/* Odontogram FDI */}
                <div className="space-y-1.5">
                  {/* Upper arch */}
                  <div className="flex justify-center gap-0.5">
                    {[
                      { n: '18', s: '' }, { n: '17', s: '' }, { n: '16', s: 'caries' }, { n: '15', s: '' },
                      { n: '14', s: '' }, { n: '13', s: 'treated' }, { n: '12', s: '' }, { n: '11', s: '' },
                      { n: '21', s: '' }, { n: '22', s: '' }, { n: '23', s: 'treated' }, { n: '24', s: '' },
                      { n: '25', s: 'caries' }, { n: '26', s: '' }, { n: '27', s: '' }, { n: '28', s: 'absent' },
                    ].map(t => (
                      <div
                        key={t.n}
                        className="w-5 h-5 rounded-sm border flex items-center justify-center"
                        style={{
                          background: t.s === 'caries' ? 'rgba(245,158,11,0.3)'
                            : t.s === 'treated' ? 'rgba(0,212,160,0.3)'
                            : t.s === 'absent' ? 'rgba(239,68,68,0.3)'
                            : 'rgba(255,255,255,0.05)',
                          borderColor: t.s === 'caries' ? 'rgba(245,158,11,0.5)'
                            : t.s === 'treated' ? 'rgba(0,212,160,0.5)'
                            : t.s === 'absent' ? 'rgba(239,68,68,0.5)'
                            : 'rgba(255,255,255,0.15)',
                        }}
                      >
                        <span className="text-[6px] text-gray-500">{t.n}</span>
                      </div>
                    ))}
                  </div>
                  {/* Lower arch */}
                  <div className="flex justify-center gap-0.5">
                    {[
                      { n: '48', s: '' }, { n: '47', s: '' }, { n: '46', s: 'treated' }, { n: '45', s: '' },
                      { n: '44', s: '' }, { n: '43', s: '' }, { n: '42', s: '' }, { n: '41', s: '' },
                      { n: '31', s: '' }, { n: '32', s: '' }, { n: '33', s: '' }, { n: '34', s: '' },
                      { n: '35', s: 'caries' }, { n: '36', s: 'treated' }, { n: '37', s: '' }, { n: '38', s: 'absent' },
                    ].map(t => (
                      <div
                        key={t.n}
                        className="w-5 h-5 rounded-sm border flex items-center justify-center"
                        style={{
                          background: t.s === 'caries' ? 'rgba(245,158,11,0.3)'
                            : t.s === 'treated' ? 'rgba(0,212,160,0.3)'
                            : t.s === 'absent' ? 'rgba(239,68,68,0.3)'
                            : 'rgba(255,255,255,0.05)',
                          borderColor: t.s === 'caries' ? 'rgba(245,158,11,0.5)'
                            : t.s === 'treated' ? 'rgba(0,212,160,0.5)'
                            : t.s === 'absent' ? 'rgba(239,68,68,0.5)'
                            : 'rgba(255,255,255,0.15)',
                        }}
                      >
                        <span className="text-[6px] text-gray-500">{t.n}</span>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="flex justify-center gap-4 pt-1">
                    {[
                      { label: 'Caries', bg: 'rgba(245,158,11,0.3)', border: 'rgba(245,158,11,0.5)' },
                      { label: 'Tratado', bg: 'rgba(0,212,160,0.3)', border: 'rgba(0,212,160,0.5)' },
                      { label: 'Ausente', bg: 'rgba(239,68,68,0.3)', border: 'rgba(239,68,68,0.5)' },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded border" style={{ background: l.bg, borderColor: l.border }} />
                        <span className="text-[9px] text-gray-500">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center mt-3 text-xs font-medium" style={{ color: '#00d4a0' }}>
              Ficha clínica con odontograma FDI
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. DEMO INTERACTIVO ── */}
      <section id="demo-sec" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4a0' }}>Demo interactivo</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explora la plataforma</h2>
          <p className="text-gray-400">Recorre las funciones principales en 3 minutos</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Steps list */}
          <div className="flex md:flex-col gap-2 md:gap-1 w-full md:w-52 shrink-0 overflow-x-auto md:overflow-visible">
            {DEMO_STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => setDemoStep(i)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all shrink-0 md:shrink w-auto"
                style={
                  demoStep === i
                    ? { background: 'rgba(0,212,160,0.10)', border: '1px solid rgba(0,212,160,0.25)' }
                    : { background: 'transparent', border: '1px solid transparent' }
                }
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all"
                  style={
                    i < demoStep
                      ? { background: '#00d4a0', color: '#04342C' }
                      : i === demoStep
                      ? { background: '#00d4a0', color: '#04342C' }
                      : { background: 'rgba(255,255,255,0.08)', color: '#6b7280' }
                  }
                >
                  {i < demoStep ? '✓' : i + 1}
                </div>
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: demoStep === i ? '#00d4a0' : i < demoStep ? '#ffffff' : '#6b7280' }}
                >
                  {step.tab}
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            className="flex-1 rounded-2xl p-6 md:p-8 border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#00d4a0' }}>
              Paso {demoStep + 1} de {DEMO_STEPS.length}
            </p>
            <h3 className="text-2xl font-bold text-white mb-3">{DEMO_STEPS[demoStep].title}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">{DEMO_STEPS[demoStep].desc}</p>

            {/* Tip box */}
            <div
              className="rounded-xl px-4 py-3 mb-8 border"
              style={{ background: 'rgba(0,212,160,0.06)', borderColor: 'rgba(0,212,160,0.2)' }}
            >
              <p className="text-sm" style={{ color: '#00d4a0' }}>
                <span className="font-semibold">💡 Tip:</span>{' '}
                <span style={{ color: '#99f6e4' }}>{DEMO_STEPS[demoStep].tip}</span>
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDemoStep(s => Math.max(0, s - 1))}
                disabled={demoStep === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all disabled:opacity-30"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
              >
                ← Anterior
              </button>

              {demoStep < DEMO_STEPS.length - 1 ? (
                <button
                  onClick={() => setDemoStep(s => s + 1)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: '#00d4a0', color: '#04342C' }}
                >
                  Siguiente →
                </button>
              ) : (
                <a
                  href="https://app.aliroxclinic.cl/registro"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: '#00d4a0', color: '#04342C' }}
                >
                  Empezar gratis →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BENEFICIOS ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4a0' }}>Por qué Alirox</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Todo lo que tu clínica necesita</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '📅',
              title: 'Agenda inteligente',
              desc: 'Citas online 24/7, recordatorios automáticos y gestión de disponibilidad en tiempo real. Tu equipo siempre sincronizado.',
            },
            {
              icon: '🤖',
              title: 'Recepcionista virtual 24/7',
              desc: 'La IA atiende WhatsApp, Instagram y Facebook, agenda citas y responde consultas sin descanso. Nunca pierdas un paciente.',
            },
            {
              icon: '📊',
              title: 'Cero inasistencias',
              desc: 'Recordatorios automáticos por WhatsApp reducen las inasistencias hasta un 80%. Más citas confirmadas, más ingresos.',
            },
          ].map(b => (
            <div
              key={b.title}
              className="rounded-2xl p-6 border transition-all hover:border-opacity-40"
              style={{ background: '#111318', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: 'rgba(0,212,160,0.10)' }}
              >
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. PRECIOS ── */}
      <section id="precios" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4a0' }}>Precios</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple y transparente</h2>
          <p className="text-gray-400"><span style={{ color: '#00d4a0' }}>15 días gratis</span> en todos los planes. Sin tarjeta de crédito.</p>
        </div>

        {/* Toggle de período */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl gap-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {[
              { value: 'monthly' as BillingPeriod, label: 'Mensual' },
              { value: 'semiannual' as BillingPeriod, label: 'Semestral', badge: '-17%' },
              { value: 'annual' as BillingPeriod, label: 'Anual', badge: '-17%' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setBillingPeriod(option.value)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={
                  billingPeriod === option.value
                    ? { background: 'rgba(255,255,255,0.1)', color: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }
                    : { background: 'transparent', color: '#9ca3af' }
                }
              >
                {option.label}
                {option.badge && (
                  <span
                    className="ml-2 px-2 py-0.5 rounded text-xs text-white"
                    style={{ background: option.value === 'annual' ? '#00a77d' : '#00d4a0' }}
                  >
                    {option.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map(p => {
            const monthlyEquivalent = getMonthlyEquivalent(p, billingPeriod)
            const savingsText = getSavingsText(p, billingPeriod)
            const showStrikethrough = billingPeriod !== 'monthly'

            return (
              <div
                key={p.id}
                className="relative rounded-2xl p-5 flex flex-col"
                style={{
                  background: p.popular
                    ? 'linear-gradient(135deg, rgba(0,212,160,0.08), rgba(0,167,125,0.03))'
                    : '#111318',
                  border: p.popular ? '2px solid #00d4a0' : '1px solid rgba(255,255,255,0.10)',
                  boxShadow: p.popular ? '0 0 30px rgba(0,212,160,0.1)' : 'none',
                }}
              >
                {p.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
                    style={{ background: '#00d4a0', color: '#04342C' }}
                  >
                    MÁS POPULAR
                  </div>
                )}

                <div className="mb-5">
                  <p className="font-bold text-base" style={{ color: p.popular ? '#00d4a0' : '#ffffff' }}>{p.name}</p>

                  <div className="mt-2">
                    {showStrikethrough && (
                      <div className="text-sm text-gray-500 line-through">
                        ${formatCLP(p.prices.monthly)}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">${formatCLP(monthlyEquivalent)}</span>
                      <span className="text-gray-500 text-sm">/mes</span>
                    </div>
                  </div>

                  {savingsText && (
                    <p className="text-xs mt-1" style={{ color: '#00d4a0' }}>{savingsText}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-2">{p.dentists}</p>
                </div>

                <ul className="space-y-2 flex-1 mb-5">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={13} className="shrink-0 mt-0.5" style={{ color: '#00d4a0' }} />
                      <span
                        className={p.highlightedFeatures.includes(f) ? 'font-medium' : ''}
                        style={{ color: p.highlightedFeatures.includes(f) ? '#00d4a0' : '#d1d5db' }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://app.aliroxclinic.cl/registro?plan=${p.id}&period=${billingPeriod}`}
                  className="block w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90"
                  style={
                    p.popular
                      ? { background: '#00d4a0', color: '#04342C', fontWeight: 700 }
                      : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.30)', color: '#ffffff' }
                  }
                >
                  Empezar gratis
                </a>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">
          Todos los precios en CLP. IVA no incluido.
        </p>
      </section>

      {/* ── 8. TESTIMONIOS ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4a0' }}>Testimonios</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div
              key={t.name}
              className="rounded-2xl p-5 flex flex-col border"
              style={{ background: '#111318', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: t.bg }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
              {/* Stars */}
              <p className="text-sm mb-3" style={{ color: '#00d4a0' }}>★★★★★</p>
              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed italic flex-1 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Stat */}
              <div
                className="px-3 py-2 rounded-lg text-sm font-semibold text-center"
                style={{ background: 'rgba(0,212,160,0.10)', color: '#00d4a0' }}
              >
                {t.stat}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#00d4a0' }}>FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Preguntas frecuentes</h2>
        </div>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden transition-all"
              style={{
                background: '#111318',
                borderColor: openFaq === i ? 'rgba(0,212,160,0.3)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full px-5 py-4 text-left"
              >
                <span className="text-white font-medium text-sm pr-4">{item.q}</span>
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-lg font-light" style={{ color: '#00d4a0' }}>
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. CTA FINAL ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div
          className="rounded-2xl p-10 md:p-14 text-center border"
          style={{ background: 'rgba(0,212,160,0.04)', borderColor: 'rgba(0,212,160,0.2)' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para automatizar tu clínica?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Únete a más de 500 dentistas en Chile que ya confían en Alirox. Empieza gratis hoy — sin tarjeta de crédito, sin complicaciones.
          </p>
          <a
            href="https://app.aliroxclinic.cl/registro"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:opacity-90"
            style={{ background: '#00d4a0', color: '#04342C' }}
          >
            Empieza gratis hoy <ArrowRight size={18} />
          </a>
          <p className="text-xs text-gray-600 mt-5">
            15 días gratis · Sin tarjeta de crédito · Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* ── 11. FOOTER ── */}
      <footer className="border-t border-white/8 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Marca */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <AliroxLogo size="sm" theme="dark" />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Software dental con inteligencia artificial para clínicas en Chile y LATAM.
              </p>
            </div>

            {/* Producto */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Producto</p>
              <ul className="space-y-2.5">
                {['Características', 'Precios', 'Demo', 'Seguridad', 'Integraciones'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Empresa</p>
              <ul className="space-y-2.5">
                {['Sobre nosotros', 'Blog', 'Contacto', 'Soporte', 'Estado del sistema'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Legal</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'Privacidad', href: '/privacidad' },
                  { label: 'Términos de uso', href: '/terminos' },
                  { label: 'Cookies', href: '/privacidad' },
                  { label: 'Cumplimiento GDPR', href: '/privacidad' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 text-sm hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              © 2026 Alirox Clinic · Hecho con ♥ en Chile
            </p>
            <p className="text-xs text-gray-600">soporte@aliroxclinic.cl</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
