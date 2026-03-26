import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'ZUBU Agency | Automatización de Procesos, Software a Medida e IA para Empresas',
  description: 'Ayudamos a negocios y pymes a ahorrar tiempo, reducir errores y aumentar ventas mediante automatizaciones, desarrollo de software a medida, bots e inteligencia artificial. Solicita tu diagnóstico gratuito.',
  keywords: 'automatización de procesos, desarrollo de software a medida, software para empresas, inteligencia artificial para empresas, automatización para pymes, automatización de WhatsApp, sistemas web para negocios, CRM, ERP',
  authors: [{ name: 'ZUBU Agency' }],
  openGraph: {
    title: 'ZUBU Agency | Automatización, Software e IA para Empresas',
    description: 'Transformamos procesos manuales en sistemas inteligentes. Automatización, desarrollo de software a medida e inteligencia artificial para empresas y pymes.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZUBU Agency | Automatización, Software e IA para Empresas',
    description: 'Transformamos procesos manuales en sistemas inteligentes. Automatización, desarrollo de software a medida e inteligencia artificial para empresas y pymes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
