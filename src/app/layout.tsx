import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alirox Clinic — Software dental con IA para clínicas',
  description: 'Agenda inteligente, fichas clínicas digitales, facturación y un agente IA que atiende a tus pacientes 24/7 por WhatsApp, Instagram y Facebook.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
