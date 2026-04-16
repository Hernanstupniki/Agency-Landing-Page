import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import type { Language } from "@/components/landing/language"

const highlightsEs = [
  "Sistemas claros y medibles",
  "Soluciones escalables",
  "Visión práctica",
  "Resultados tangibles",
]

const highlightsEn = [
  "Clear and measurable systems",
  "Scalable solutions",
  "Practical approach",
  "Tangible results",
]

const highlightsPt = [
  "Sistemas claros e mensuraveis",
  "Solucoes escalaveis",
  "Visao pratica",
  "Resultados tangiveis",
]

const teamMembersEs = [
  {
    name: "Hernan Stupniki",
    role: "Ingeniero de datos y automatización",
    description:
      "Especialista en automatizacion, datos y procesos con Python, SQL y n8n.",
    photo: "/hernan-stupniki.webp",
    linkedin: "https://www.linkedin.com/in/hernanstupniki/",
  },
  {
    name: "Tobias Tarnowski",
    role: "Tecnico informatico y analista de sistemas",
    description:
      "Enfocado en Python, SQL y Power BI para convertir datos en soluciones practicas.",
    photo: "/tobias-tarnowski.webp",
    linkedin: "https://www.linkedin.com/in/tobiastarnowski/",
  },
  {
    name: "Facundo Salazar",
    role: "Analista en Sistemas",
    description:
      "Enfocado en software, redes y automatizacion con mirada de negocio.",
    photo: "/facundo-salazar.webp",
    linkedin: "https://www.linkedin.com/in/facundosalazar/",
  },
]

const teamMembersEn = [
  {
    name: "Hernan Stupniki",
    role: "Data and automation engineer",
    description:
      "Focused on automation, data, and process design with Python, SQL, and n8n.",
    photo: "/hernan-stupniki.webp",
    linkedin: "https://www.linkedin.com/in/hernanstupniki/",
  },
  {
    name: "Tobias Tarnowski",
    role: "IT technician and systems analyst",
    description:
      "Focused on Python, SQL, and Power BI to turn data into practical solutions.",
    photo: "/tobias-tarnowski.webp",
    linkedin: "https://www.linkedin.com/in/tobiastarnowski/",
  },
  {
    name: "Facundo Salazar",
    role: "Systems analyst",
    description:
      "Focused on software, networks, and automation with a business mindset.",
    photo: "/facundo-salazar.webp",
    linkedin: "https://www.linkedin.com/in/facundosalazar/",
  },
]

const teamMembersPt = [
  {
    name: "Hernan Stupniki",
    role: "Engenheiro de dados e automacao",
    description:
      "Especialista em automacao, dados e processos com Python, SQL e n8n.",
    photo: "/hernan-stupniki.webp",
    linkedin: "https://www.linkedin.com/in/hernanstupniki/",
  },
  {
    name: "Tobias Tarnowski",
    role: "Tecnico de TI e analista de sistemas",
    description:
      "Focado em Python, SQL e Power BI para transformar dados em solucoes praticas.",
    photo: "/tobias-tarnowski.webp",
    linkedin: "https://www.linkedin.com/in/tobiastarnowski/",
  },
  {
    name: "Facundo Salazar",
    role: "Analista de sistemas",
    description:
      "Focado em software, redes e automacao com visao de negocio.",
    photo: "/facundo-salazar.webp",
    linkedin: "https://www.linkedin.com/in/facundosalazar/",
  },
]

type AboutProps = {
  language: Language
}

type TeamSectionProps = {
  language: Language
}

export function TeamSection({ language }: TeamSectionProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const teamMembers = isEn ? teamMembersEn : isPt ? teamMembersPt : teamMembersEs

  return (
    <section id="equipo" className="bg-background py-14 dark-section-deep sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {isEn ? (
              <>
                Our <span className="indigo-accent">team</span>
              </>
            ) : isPt ? (
              <>
                Nosso <span className="indigo-accent">time</span>
              </>
            ) : (
              <>
                Nuestro <span className="indigo-accent">equipo</span>
              </>
            )}
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="dark-panel flex h-full flex-col rounded-2xl border border-border/60 bg-card px-6 pb-6 pt-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm font-medium text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.description}</p>
                <div className="mt-auto flex justify-end pt-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={isEn ? `LinkedIn profile of ${member.name}` : isPt ? `LinkedIn de ${member.name}` : `LinkedIn de ${member.name}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function About({ language }: AboutProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const highlights = isEn ? highlightsEn : isPt ? highlightsPt : highlightsEs

  return (
    <section id="nosotros" className="bg-muted/30 pb-14 pt-10 dark-section-alt sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {isEn ? (
                <>
                  Who we <span className="indigo-accent">are</span>
                </>
              ) : isPt ? (
                <>
                  Quem <span className="indigo-accent">somos</span>
                </>
              ) : (
                <>
                  Quiénes <span className="indigo-accent">somos</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {isEn
                ? "ZUBU is an automation and software development agency focused on designing clear, measurable, and scalable systems."
                : isPt
                  ? "A ZUBU e uma agencia de automacao e desenvolvimento de software focada em desenhar sistemas claros, mensuraveis e escalaveis."
                : "ZUBU es una agencia de automatización y desarrollo de software enfocada en diseñar sistemas claros, medibles y escalables."}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {isEn
                ? "We build solutions for customer service, sales, operations, collections, data, and internal control, with a practical vision: fewer manual tasks, more order, and better outcomes."
                : isPt
                  ? "Criamos solucoes para atendimento, vendas, operacoes, cobrancas, dados e controle interno, com uma visao pratica: menos tarefas manuais, mais organizacao e melhores resultados."
                : "Creamos soluciones para atención, ventas, operaciones, cobros, datos y control interno, con una visión práctica: menos tareas manuales, más orden y mejores resultados."}
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#3BB3E8]" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-border/50 to-transparent" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="dark-panel rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">+10</div>
                    <div className="mt-1 text-sm text-muted-foreground">{isEn ? "Delivered projects" : isPt ? "Projetos entregues" : "Proyectos entregados"}</div>
                  </div>
                  <div className="dark-panel rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">100%</div>
                    <div className="mt-1 text-sm text-muted-foreground">{isEn ? "Satisfied clients" : isPt ? "Clientes satisfeitos" : "Clientes satisfechos"}</div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="dark-panel rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">24/7</div>
                    <div className="mt-1 text-sm text-muted-foreground">{isEn ? "Systems running" : isPt ? "Sistemas funcionando" : "Sistemas funcionando"}</div>
                  </div>
                  <div className="dark-panel rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">-70%</div>
                    <div className="mt-1 text-sm text-muted-foreground">{isEn ? "Time on manual tasks" : isPt ? "Tempo em tarefas manuais" : "Tiempo en tareas manuales"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
