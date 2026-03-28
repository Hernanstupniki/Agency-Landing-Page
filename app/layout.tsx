import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zubuagency.com'),
  applicationName: 'ZUBU Agency',
  title: 'ZUBU Agency | Automatización de Procesos, Software a Medida e IA para Empresas',
  description: 'Ayudamos a negocios y PyMEs a ahorrar tiempo, reducir errores y aumentar ventas mediante automatizaciones, desarrollo de software a medida, bots e inteligencia artificial. Solicita tu diagnóstico gratuito.',
  keywords: [
    'automatizacion de procesos',
    'desarrollo de software a medida',
    'software para empresas',
    'inteligencia artificial para empresas',
    'automatizacion para PyMEs',
    'automatizacion de WhatsApp',
    'sistemas web para negocios',
    'crm',
    'erp',
    'agencia de automatizacion en argentina',
  ],
  authors: [{ name: 'ZUBU Agency' }],
  creator: 'ZUBU Agency',
  publisher: 'ZUBU Agency',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZUBU Agency | Automatización, Software e IA para Empresas',
    description: 'Transformamos procesos manuales en sistemas inteligentes. Automatización, desarrollo de software a medida e inteligencia artificial para empresas y PyMEs.',
    url: 'https://zubuagency.com/',
    siteName: 'ZUBU Agency',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/industrial-automation.png',
        width: 1088,
        height: 770,
        alt: 'Automatizacion de procesos y software a medida para empresas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZUBU Agency | Automatización, Software e IA para Empresas',
    description: 'Transformamos procesos manuales en sistemas inteligentes. Automatización, desarrollo de software a medida e inteligencia artificial para empresas y PyMEs.',
    images: ['/industrial-automation.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/zubu-logo-favicon.png?v=2', sizes: '32x32', type: 'image/png' }],
    shortcut: [{ url: '/zubu-logo-favicon.png?v=2', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png' }],
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
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
