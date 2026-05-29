import Link from 'next/link'
import AliroxLogo from '@/components/ui/AliroxLogo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Alirox Clinic',
  description: 'Lee los términos y condiciones del servicio SaaS de gestión de clínicas dentales de Alirox SpA.',
}

export default function TerminosPage() {
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
          Legal
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Términos y Condiciones</h1>
        <p className="text-gray-500 text-sm mb-12">
          Última actualización: 29 de mayo de 2025 · Al usar Alirox Clinic aceptas estos términos.
        </p>

        <div className="space-y-12 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              1. Identificación del proveedor
            </h2>
            <p>
              El servicio es ofrecido por <strong className="text-white">Alirox SpA</strong>, RUT{' '}
              <strong className="text-white">78.003.105-0</strong>, empresa constituida conforme a las leyes de la
              República de Chile. Para consultas puedes contactarnos en{' '}
              <a href="mailto:contacto@alirox.cl" className="text-[#00d4a0] hover:underline">
                contacto@alirox.cl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              2. Descripción del servicio
            </h2>
            <p className="mb-4">
              Alirox Clinic es un <strong className="text-white">software como servicio (SaaS)</strong> diseñado para
              la gestión integral de clínicas dentales. La plataforma incluye, entre otras funcionalidades:
            </p>
            <ul className="space-y-2 list-none">
              {[
                'Agenda inteligente y gestión de citas.',
                'Fichas clínicas digitales de pacientes.',
                'Recordatorios automáticos por WhatsApp, SMS y correo electrónico.',
                'Agente de IA para atención de pacientes en canales digitales.',
                'Módulo de facturación y cobros.',
                'Panel de reportes y estadísticas.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#00d4a0] shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-400 text-sm">
              Alirox se reserva el derecho de agregar, modificar o descontinuar funcionalidades con previo aviso
              razonable a los usuarios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              3. Período de prueba y suscripción
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-[#00d4a0] font-semibold mb-2">Prueba gratuita</p>
                <p className="text-sm text-gray-400">
                  Al registrarte accedes a <strong className="text-white">30 días de prueba gratuita</strong> con
                  acceso completo a la plataforma. No se requiere tarjeta de crédito para comenzar.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-[#00d4a0] font-semibold mb-2">Suscripción de pago</p>
                <p className="text-sm text-gray-400">
                  Al finalizar la prueba, el servicio continúa mediante una{' '}
                  <strong className="text-white">suscripción mensual</strong> según el plan elegido. El acceso se
                  suspende si el pago no se realiza en la fecha de vencimiento.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Los precios están expresados en pesos chilenos (CLP) e incluyen IVA cuando corresponda. Alirox puede
              ajustar los precios con un aviso mínimo de 30 días antes del nuevo período de facturación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              4. Obligaciones del usuario
            </h2>
            <p className="mb-4">Al usar Alirox Clinic te comprometes a:</p>
            <ul className="space-y-2 list-none">
              {[
                'Proporcionar información veraz y mantenerla actualizada.',
                'Mantener la confidencialidad de tus credenciales de acceso.',
                'Usar el servicio únicamente para la gestión legítima de tu clínica dental.',
                'No intentar acceder a datos de otras clínicas ni vulnerar la seguridad de la plataforma.',
                'Cumplir con la normativa vigente en materia de protección de datos de pacientes.',
                'No ceder el acceso a la cuenta a terceros no autorizados.',
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
              5. Responsabilidad sobre los datos de pacientes
            </h2>
            <p className="mb-4">
              La <strong className="text-white">clínica dental (usuario) es el responsable del tratamiento</strong> de
              los datos personales de sus pacientes conforme a la Ley 19.628 y la Ley 21.719 de Chile. Alirox
              actúa como <strong className="text-white">encargado del tratamiento</strong>, procesando dichos datos
              únicamente según las instrucciones del responsable y para la prestación del servicio contratado.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-200">
              <strong>Importante:</strong> La clínica es responsable de contar con el consentimiento adecuado de sus
              pacientes para el tratamiento de sus datos y de cumplir con las obligaciones que la ley le impone como
              responsable del fichero.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              6. Limitación de responsabilidad
            </h2>
            <p className="mb-4">
              Alirox SpA no será responsable por:
            </p>
            <ul className="space-y-2 list-none">
              {[
                'El uso indebido de la plataforma por parte de la clínica o sus empleados.',
                'Pérdidas derivadas de interrupciones del servicio causadas por terceros (proveedores de infraestructura, telecomunicaciones, etc.).',
                'Daños indirectos, lucro cesante o pérdida de datos imputables al usuario.',
                'Incumplimiento por parte de la clínica de sus obligaciones legales frente a sus pacientes.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gray-500 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              La responsabilidad total de Alirox frente al usuario, en cualquier supuesto, no superará el monto
              pagado por el usuario en los últimos <strong className="text-white">3 meses</strong> de suscripción.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              7. Disponibilidad del servicio
            </h2>
            <p>
              Alirox procurará una disponibilidad del servicio del <strong className="text-white">99 % mensual</strong>.
              Sin embargo, no garantiza disponibilidad ininterrumpida y podrá realizar mantenciones programadas,
              informando con anticipación razonable cuando sea posible. Las interrupciones por mantenimiento
              planificado no constituyen incumplimiento del contrato.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              8. Propiedad intelectual
            </h2>
            <p>
              Todos los elementos de la plataforma —código, diseño, marca, logotipos, documentación— son propiedad
              exclusiva de Alirox SpA o sus licenciantes. El usuario obtiene únicamente una licencia de uso no
              exclusiva, intransferible y revocable para acceder al servicio durante la vigencia de su suscripción.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              9. Terminación
            </h2>
            <p className="mb-4">
              Cualquiera de las partes puede terminar la relación contractual:
            </p>
            <ul className="space-y-2 list-none">
              {[
                'El usuario puede cancelar su suscripción en cualquier momento desde la plataforma o contactando a soporte. No hay reembolso del período en curso.',
                'Alirox puede suspender o cancelar el acceso ante incumplimiento de estos términos, con o sin aviso previo según la gravedad de la infracción.',
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
              10. Ley aplicable y jurisdicción
            </h2>
            <p>
              Estos términos se rigen por las leyes de la <strong className="text-white">República de Chile</strong>.
              Cualquier controversia se someterá a los{' '}
              <strong className="text-white">Tribunales Ordinarios de Justicia de Santiago de Chile</strong>,
              renunciando las partes a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">
              11. Modificaciones
            </h2>
            <p>
              Alirox puede modificar estos términos en cualquier momento. Notificaremos los cambios con al menos{' '}
              <strong className="text-white">15 días de anticipación</strong> por correo electrónico. El uso continuado
              del servicio tras ese período implica la aceptación de los nuevos términos.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Alirox SpA · RUT 78.003.105-0</p>
          <div className="flex gap-6">
            <Link href="/terminos" className="text-[#00d4a0]">Términos</Link>
            <Link href="/privacidad" className="hover:text-[#00d4a0] transition-colors">Privacidad</Link>
            <Link href="/eliminar-datos" className="hover:text-[#00d4a0] transition-colors">Eliminar datos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
