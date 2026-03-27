import { faqItems } from "@/components/landing/faq"
import { LandingPageClient } from "@/components/landing/landing-page-client"

export default function Home() {
  const baseUrl = "https://zubuagency.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZUBU Agency",
    url: baseUrl,
    logo: `${baseUrl}/placeholder-logo2.png`,
    sameAs: [
      "https://www.linkedin.com/in/hernanstupniki/",
      "https://www.instagram.com/zubudevagency/",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["Spanish", "English"],
        areaServed: "AR",
      },
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ZUBU Agency",
    url: baseUrl,
    image: `${baseUrl}/industrial-automation.png`,
    description:
      "Agencia de automatizacion de procesos, desarrollo de software a medida e inteligencia artificial para PyMEs y empresas.",
    areaServed: ["Argentina", "Latam"],
    serviceType: [
      "Automatizacion de procesos",
      "Desarrollo de software a medida",
      "Integraciones con CRM y ERP",
      "Agentes de inteligencia artificial",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Posadas",
      addressRegion: "Misiones",
      addressCountry: "AR",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZUBU Agency",
    url: baseUrl,
    inLanguage: "es-AR",
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPageClient />
    </div>
  )
}
