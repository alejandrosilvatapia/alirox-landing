import Link from 'next/link'
import AliroxLogo from '@/components/ui/AliroxLogo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Alirox Clinic',
  description: 'Conoce cómo Alirox SpA recopila, usa y protege tus datos personales conforme a la Ley 19.628 y Ley 21.719 de Chile.',
}

export default function PrivacidadPage() {
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
        <h1 className="text-4xl font-bold text-white mb-3">Política de Privacidad</h1>
        <p className="text-gray-500 text-sm mb-12">
          Última actualización: 29 de mayo de 2025 · Vigente desde la misma fecha
        </p>

        <div className="space-y-12 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              1. Responsable del tratamiento
            </h2>
            <p>
              El responsable del tratamiento de tus datos personales es <strong className="text-white">Alirox SpA</strong>,
              RUT <strong className="text-white">78.003.105-0</strong>, con domicilio en Chile. Para cualquier consulta
              relacionada con el tratamiento de tus datos puedes escribirnos a{' '}
              <a href="mailto:contacto@alirox.cl" className="text-[#00d4a0] hover:underline">
                contacto@alirox.cl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              2. Datos que recopilamos
            </h2>
            <p className="mb-4">
              En función del uso que hagas de nuestra plataforma, podemos recopilar las siguientes categorías de datos:
            </p>
            <ul className="space-y-3 list-none">
              {[
                ['Datos de identificación', 'Nombre completo, RUT o documento de identidad.'],
                ['Datos de contacto', 'Correo electrónico, número de teléfono.'],
                ['Datos de cuenta', 'Nombre de la clínica, credenciales de acceso (contraseña almacenada en hash).'],
                ['Datos de pacientes', 'Información ingresada por la clínica: nombre, RUT, teléfono, historial de citas y notas clínicas. Alirox actúa como encargado de tratamiento respecto a estos datos; la clínica es el responsable.'],
                ['Datos de uso y navegación', 'Dirección IP, tipo de dispositivo, páginas visitadas, acciones dentro de la plataforma.'],
                ['Datos de facturación', 'Información necesaria para procesar pagos a través de Mercado Pago. No almacenamos datos de tarjetas de crédito.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="text-[#00d4a0] mt-1 shrink-0">▸</span>
                  <span>
                    <strong className="text-white">{title}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              3. Finalidad del tratamiento
            </h2>
            <p className="mb-4">Utilizamos tus datos para:</p>
            <ul className="space-y-2 list-none">
              {[
                'Proveer y mantener el servicio de gestión de clínicas dentales.',
                'Enviar recordatorios de citas a los pacientes de las clínicas suscritas.',
                'Enviar comunicaciones relacionadas con tu cuenta, actualizaciones del servicio y soporte técnico.',
                'Procesar pagos de suscripción.',
                'Mejorar la plataforma mediante análisis de uso agregado y anónimo.',
                'Cumplir con obligaciones legales y requerimientos de autoridades competentes.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#00d4a0] shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              4. Base legal del tratamiento
            </h2>
            <p>
              El tratamiento de tus datos se realiza al amparo de la{' '}
              <strong className="text-white">Ley N° 19.628</strong> sobre Protección de la Vida Privada y la{' '}
              <strong className="text-white">Ley N° 21.719</strong> que establece la nueva regulación de protección de
              datos personales en Chile. Las bases legales aplicables son: ejecución del contrato de servicio,
              cumplimiento de obligaciones legales y, en su caso, el consentimiento explícito del titular.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              5. Subprocesadores y terceros
            </h2>
            <p className="mb-4">
              Para operar la plataforma recurrimos a los siguientes subprocesadores, cada uno sujeto a sus propias
              políticas de privacidad y medidas de seguridad:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Supabase', 'Base de datos, autenticación y almacenamiento de archivos.'],
                ['Brevo (ex-Sendinblue)', 'Envío de correos electrónicos transaccionales y de marketing.'],
                ['Meta (Facebook / Instagram)', 'Integraciones de mensajería y publicidad.'],
                ['Mercado Pago', 'Procesamiento de pagos y suscripciones.'],
              ].map(([name, role]) => (
                <div key={name} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-sm text-gray-400 mt-1">{role}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              No vendemos ni cedemos tus datos personales a terceros con fines comerciales propios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              6. Período de retención
            </h2>
            <p>
              Conservamos tus datos mientras tu cuenta se encuentre activa. Una vez que solicites la eliminación de tu
              cuenta, procederemos a borrar o anonimizar tus datos dentro de los <strong className="text-white">30 días hábiles</strong>{' '}
              siguientes, salvo aquellos que debamos conservar por obligación legal (por ejemplo, registros contables y
              tributarios conforme al Código Tributario chileno).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              7. Tus derechos
            </h2>
            <p className="mb-4">
              Conforme a la Ley 19.628 y la Ley 21.719, tienes derecho a:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['Acceso', 'Conocer qué datos tuyos tratamos.'],
                ['Rectificación', 'Corregir datos inexactos o incompletos.'],
                ['Eliminación', 'Solicitar la supresión de tus datos.'],
                ['Oposición', 'Oponerte al tratamiento en ciertos supuestos.'],
                ['Portabilidad', 'Recibir tus datos en formato estructurado.'],
                ['Revocación del consentimiento', 'Cuando el tratamiento se base en tu consentimiento.'],
              ].map(([right, desc]) => (
                <div key={right} className="flex gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  <span className="text-[#00d4a0] font-bold shrink-0">·</span>
                  <span>
                    <strong className="text-white">{right}:</strong>{' '}
                    <span className="text-gray-400 text-sm">{desc}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Para ejercer cualquiera de estos derechos, escríbenos a{' '}
              <a href="mailto:contacto@alirox.cl" className="text-[#00d4a0] hover:underline">
                contacto@alirox.cl
              </a>{' '}
              indicando tu nombre completo, el derecho que deseas ejercer y, si es posible, una copia de tu
              documento de identidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              8. Seguridad
            </h2>
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no
              autorizados, pérdida o divulgación indebida. Entre ellas: cifrado en tránsito (TLS), almacenamiento
              cifrado en reposo, control de acceso basado en roles y autenticación segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              9. Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta política en cualquier momento. Cuando lo hagamos, notificaremos los cambios
              relevantes por correo electrónico o mediante un aviso destacado en la plataforma. La fecha de la última
              actualización siempre aparecerá al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              10. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos, contáctanos en{' '}
              <a href="mailto:contacto@alirox.cl" className="text-[#00d4a0] hover:underline">
                contacto@alirox.cl
              </a>
              . Responderemos dentro de los plazos establecidos por la legislación chilena vigente.
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
            <Link href="/privacidad" className="text-[#00d4a0]">Privacidad</Link>
            <Link href="/eliminar-datos" className="hover:text-[#00d4a0] transition-colors">Eliminar datos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
