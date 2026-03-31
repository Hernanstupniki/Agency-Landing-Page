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
  manifest: '/site.webmanifest',
  title: 'ZUBU Agency en Posadas, Misiones | Automatización, Software e IA para Empresas',
  description: 'Agencia de automatización y desarrollo de software en Posadas, Misiones, Argentina. Ayudamos a PyMEs y empresas a ahorrar tiempo, reducir errores y aumentar ventas con sistemas e inteligencia artificial.',
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
    'agencia de software en posadas',
    'automatizacion en posadas misiones',
    'desarrollo web en misiones argentina',
    'inteligencia artificial en posadas',
  ],
  authors: [{ name: 'ZUBU Agency' }],
  creator: 'ZUBU Agency',
  publisher: 'ZUBU Agency',
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'es-AR': '/',
    },
  },
  openGraph: {
    title: 'ZUBU Agency en Posadas, Misiones | Automatización, Software e IA',
    description: 'Agencia en Posadas, Misiones, Argentina. Transformamos procesos manuales en sistemas inteligentes para PyMEs y empresas.',
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
    title: 'ZUBU Agency en Posadas, Misiones | Automatización, Software e IA',
    description: 'Agencia en Posadas, Misiones, Argentina. Automatización y software a medida para empresas y PyMEs.',
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
    icon: [
      { url: '/zubu-logo-favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/zubu-logo-favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [{ url: '/zubu-logo-favicon.png', type: 'image/png' }],
    apple: [{ url: '/zubu-logo-favicon.png', sizes: '180x180', type: 'image/png' }],
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
