import Link from 'next/link'
import AliroxLogo from '@/components/ui/AliroxLogo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eliminar mis datos — Alirox Clinic',
  description: 'Solicita la eliminación de tu cuenta y datos personales en Alirox Clinic conforme a la Ley 19.628 y Ley 21.719 de Chile.',
}

export default function EliminarDatosPage() {
  return (
    <div className="min-h-screen bg-[#0a0c0f] text-gray-200">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-[#0a0c0f]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <AliroxLogo size="sm" theme="dark" />
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-[#00d4a0] transition-colors flex items-center gap-1"
          >
            ← Volver
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-sm text-[#00d4a0] font-semibold uppercase tracking-widest mb-4">
          Privacidad
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Solicitud de eliminación de datos</h1>
        <p className="text-gray-500 text-sm mb-12">
          Tu derecho al olvido conforme a la Ley 19.628 y Ley 21.719 de Chile.
        </p>

        {/* CTA Box */}
        <div className="bg-[#00d4a0]/10 border border-[#00d4a0]/30 rounded-2xl p-8 mb-12 text-center">
          <p className="text-lg text-gray-300 mb-2">Para solicitar la eliminación de tus datos, escríbenos a:</p>
          <a
            href="mailto:contacto@alirox.cl?subject=Solicitud%20eliminaci%C3%B3n%20de%20datos"
            className="text-3xl font-bold text-[#00d4a0] hover:underline"
          >
            contacto@alirox.cl
          </a>
          <p className="text-sm text-gray-500 mt-3">
            Asunto sugerido: <em>"Solicitud eliminación de datos — [tu nombre o nombre de la clínica]"</em>
          </p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              ¿Quién puede solicitar la eliminación?
            </h2>
            <p>
              Cualquier persona cuyos datos estén almacenados en Alirox Clinic puede ejercer su derecho de
              eliminación, incluyendo:
            </p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Titulares de cuentas (administradores o usuarios de una clínica suscrita).',
                'Pacientes de una clínica que deseen solicitar la eliminación de sus datos de la plataforma.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#00d4a0] shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Cómo realizar la solicitud
            </h2>
            <div className="grid gap-4">
              {[
                {
                  step: '01',
                  title: 'Envía un correo',
                  desc: 'Escribe a contacto@alirox.cl desde el email asociado a tu cuenta o indicando tu nombre completo y RUT.',
                },
                {
                  step: '02',
                  title: 'Acredita tu identidad',
                  desc: 'Adjunta una copia de tu cédula de identidad o pasaporte vigente para verificar que eres el titular de los datos.',
                },
                {
                  step: '03',
                  title: 'Especifica tu solicitud',
                  desc: 'Indica si deseas eliminar tu cuenta completa o solo determinados datos (por ejemplo, un registro de paciente específico).',
                },
                {
                  step: '04',
                  title: 'Confirmación y plazo',
                  desc: 'Confirmaremos la recepción dentro de 5 días hábiles y ejecutaremos la eliminación en un máximo de 30 días hábiles.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5 bg-white/5 rounded-xl p-5 border border-white/10">
                  <span className="text-3xl font-black text-[#00d4a0]/30 shrink-0 leading-none">{step}</span>
                  <div>
                    <p className="font-semibold text-white mb-1">{title}</p>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Qué datos se eliminan
            </h2>
            <p className="mb-4">
              Cuando procesamos una solicitud de eliminación de cuenta completa, borramos o anonimizamos
              permanentemente:
            </p>
            <ul className="space-y-2 list-none">
              {[
                'Cuenta de usuario: nombre, correo electrónico, contraseña y credenciales.',
                'Datos de la clínica: nombre, dirección, teléfono y configuración.',
                'Registros de pacientes: fichas clínicas, datos de contacto e historial de citas.',
                'Archivos adjuntos: radiografías, imágenes y documentos almacenados en la plataforma.',
                'Historial de mensajes: conversaciones gestionadas a través del agente IA.',
                'Datos de facturación: información de pagos asociada a la cuenta.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-red-400/70 shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Qué datos NO se pueden eliminar
            </h2>
            <p className="mb-4">
              Ciertos datos deben conservarse por obligación legal y no pueden eliminarse a petición del usuario:
            </p>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <ul className="space-y-3 list-none">
                {[
                  [
                    'Registros contables y tributarios',
                    'Las facturas, comprobantes de pago y registros de transacciones deben conservarse por el período exigido por el Servicio de Impuestos Internos (SII) y el Código Tributario chileno (mínimo 6 años).',
                  ],
                  [
                    'Registros de auditoría',
                    'Los logs de acceso y operaciones críticas que deban mantenerse para cumplir con regulaciones de seguridad o requerimientos judiciales.',
                  ],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <span className="text-amber-400/70 shrink-0 mt-1">!</span>
                    <span>
                      <strong className="text-white">{title}:</strong>{' '}
                      <span className="text-gray-400 text-sm">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Una vez vencidos los plazos legales, estos datos también serán eliminados de forma definitiva.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Efectos de la eliminación
            </h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-200 mb-4">
              <strong>Atención:</strong> La eliminación de datos es irreversible. Una vez procesada, no podremos
              recuperar ninguna información asociada a tu cuenta.
            </div>
            <p>
              Al eliminar tu cuenta perderás acceso a la plataforma y a toda la información allí almacenada.
              Si en el futuro deseas volver a usar Alirox Clinic, deberás crear una cuenta nueva desde cero.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Plazos de respuesta
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ['5 días hábiles', 'Confirmación de recepción de tu solicitud.'],
                ['30 días hábiles', 'Plazo máximo para ejecutar la eliminación desde la confirmación.'],
                ['Inmediato', 'Suspensión del acceso a la cuenta una vez aprobada la solicitud.'],
              ].map(([time, desc]) => (
                <div key={time} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                  <p className="text-[#00d4a0] font-bold text-lg mb-2">{time}</p>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              Base legal
            </h2>
            <p>
              Este proceso se enmarca en el derecho de supresión reconocido por la{' '}
              <strong className="text-white">Ley N° 19.628</strong> sobre Protección de la Vida Privada y la{' '}
              <strong className="text-white">Ley N° 21.719</strong> de Protección de Datos Personales de Chile.
              Estos derechos te permiten solicitar la eliminación de tus datos cuando ya no sean necesarios para
              la finalidad con que fueron recabados, o cuando retires tu consentimiento.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Alirox SpA · RUT 78.003.105-0</p>
          <div className="flex gap-6">
            <Link href="/terminos" className="hover:text-[#00d4a0] transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-[#00d4a0] transition-colors">Privacidad</Link>
            <Link href="/eliminar-datos" className="text-[#00d4a0]">Eliminar datos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
