import { faqItems } from "@/components/landing/faq"
import { LandingPageClient } from "@/components/landing/landing-page-client"

export default function Home() {
  const baseUrl = "https://zubuagency.com"
  const organizationId = `${baseUrl}/#organization`
  const localBusinessId = `${baseUrl}/#localbusiness`

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "ZUBU Agency",
    url: baseUrl,
    logo: `${baseUrl}/zubu-logo-favicon.png`,
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
    "@id": `${baseUrl}/#service`,
    name: "ZUBU Agency",
    provider: {
      "@id": organizationId,
    },
    url: baseUrl,
    image: `${baseUrl}/industrial-automation.png`,
    description:
      "Agencia de automatizacion de procesos, desarrollo de software a medida e inteligencia artificial en Posadas, Misiones, Argentina.",
    areaServed: ["Posadas", "Misiones", "Argentina"],
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId,
    name: "ZUBU Agency",
    url: baseUrl,
    image: `${baseUrl}/zubu-logo-favicon.png`,
    logo: `${baseUrl}/zubu-logo-favicon.png`,
    description:
      "Agencia de automatizacion y desarrollo de software para empresas en Posadas, Misiones, Argentina.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Posadas",
      addressRegion: "Misiones",
      addressCountry: "AR",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Posadas",
      },
      {
        "@type": "AdministrativeArea",
        name: "Misiones",
      },
      {
        "@type": "Country",
        name: "Argentina",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/hernanstupniki/",
      "https://www.instagram.com/zubudevagency/",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZUBU Agency",
    url: baseUrl,
    inLanguage: "es-AR",
    publisher: {
      "@id": organizationId,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
