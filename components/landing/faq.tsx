import type { Language } from "@/components/landing/language"

const faqItemsEs = [
  {
    question: "Que tipo de procesos se pueden automatizar?",
    answer:
      "Podemos automatizar atencion al cliente, seguimiento comercial, cobros, reportes, carga de datos, reservas e integraciones entre herramientas como CRM, ERP, WhatsApp, formularios y pasarelas de pago.",
  },
  {
    question: "Cuanto tarda implementar una solucion?",
    answer:
      "Depende del alcance. Una automatizacion puntual puede estar lista en pocos dias, mientras que un sistema a medida suele requerir algunas semanas. Definimos tiempos concretos despues del diagnostico.",
  },
  {
    question: "Trabajan con PyMEs y empresas de cualquier rubro?",
    answer:
      "Si. Trabajamos con PyMEs, empresas de servicios, e-commerce, gastronomia, inmobiliarias y otros negocios que necesiten ordenar procesos y escalar con tecnologia.",
  },
  {
    question: "Necesito conocimientos tecnicos para empezar?",
    answer:
      "No. Nos ocupamos de la parte tecnica y te acompanamos en todo el proceso para que la implementacion sea simple y enfocada en resultados de negocio.",
  },
]

const faqItemsEn = [
  {
    question: "What kind of processes can be automated?",
    answer:
      "We can automate customer service, sales follow-up, collections, reporting, data entry, bookings, and integrations between tools such as CRM, ERP, WhatsApp, forms, and payment gateways.",
  },
  {
    question: "How long does an implementation take?",
    answer:
      "It depends on scope. A specific automation can be ready in a few days, while a custom system usually takes a few weeks. We define concrete timelines after the assessment.",
  },
  {
    question: "Do you work with SMEs and companies in any industry?",
    answer:
      "Yes. We work with SMEs, service companies, e-commerce, food businesses, real estate, and other businesses that need to organize processes and scale with technology.",
  },
  {
    question: "Do I need technical knowledge to get started?",
    answer:
      "No. We handle the technical side and support you throughout the process so implementation is simple and business-results oriented.",
  },
]

const faqItemsPt = [
  {
    question: "Que tipo de processos podem ser automatizados?",
    answer:
      "Podemos automatizar atendimento ao cliente, follow-up comercial, cobrancas, relatorios, carga de dados, reservas e integracoes entre ferramentas como CRM, ERP, WhatsApp, formularios e gateways de pagamento.",
  },
  {
    question: "Quanto tempo leva para implementar uma solucao?",
    answer:
      "Depende do escopo. Uma automacao pontual pode ficar pronta em poucos dias, enquanto um sistema sob medida geralmente leva algumas semanas. Definimos prazos concretos depois do diagnostico.",
  },
  {
    question: "Vocês trabalham com PMEs e empresas de qualquer setor?",
    answer:
      "Sim. Trabalhamos com PMEs, empresas de servicos, e-commerce, gastronomia, imobiliarias e outros negocios que precisam organizar processos e escalar com tecnologia.",
  },
  {
    question: "Preciso de conhecimento tecnico para comecar?",
    answer:
      "Nao. Cuidamos da parte tecnica e acompanhamos voce em todo o processo para que a implementacao seja simples e focada em resultados de negocio.",
  },
]

type FaqProps = {
  language: Language
}

export function Faq({ language }: FaqProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const faqItems = isEn ? faqItemsEn : isPt ? faqItemsPt : faqItemsEs

  return (
    <section id="faq" className="bg-background py-14 dark-section-deep sm:py-20" aria-labelledby="faq-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="faq-title" className="text-4xl font-bold tracking-tight text-foreground">
            {isEn ? (
              <>
                Frequently asked <span className="indigo-accent">questions</span>
              </>
            ) : isPt ? (
              <>
                Perguntas <span className="indigo-accent">frequentes</span>
              </>
            ) : (
              <>
                Preguntas <span className="indigo-accent">frecuentes</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isEn
              ? "Quick answers to understand how we work and what results you can expect"
              : isPt
                ? "Respostas rapidas para entender como trabalhamos e quais resultados voce pode esperar"
              : "Respuestas rapidas para entender como trabajamos y que resultados podes esperar"}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item) => (
            <details key={item.question} className="dark-panel group rounded-2xl border border-border/60 bg-card p-6">
              <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-foreground marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export const faqItems = faqItemsEs
