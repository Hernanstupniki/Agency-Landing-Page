import {
  BarChart3,
  Bot,
  Code2,
  Database,
  FileText,
  LayoutDashboard,
  Link2,
  MessageSquare,
} from "lucide-react"
import type { Language } from "@/components/landing/language"

const servicesEs = [
  {
    icon: MessageSquare,
    title: "Automatización de WhatsApp y atención al cliente",
    description: "Respuestas automáticas, chatbots y flujos de atención que trabajan las 24 horas.",
  },
  {
    icon: Database,
    title: "Desarrollo de ERP/CRM",
    description: "Sistemas de gestión personalizados para controlar clientes, ventas y operaciones.",
  },
  {
    icon: Link2,
    title: "Integraciones con CRM, ERP, formularios y pagos",
    description: "Conectamos tus herramientas para que los datos fluyan automáticamente.",
  },
  {
    icon: FileText,
    title: "Automatización de cobros, reservas y documentos",
    description: "Procesos administrativos que funcionan solos, sin intervención manual.",
  },
  {
    icon: Code2,
    title: "Desarrollo de software a medida",
    description: "Aplicaciones y sistemas diseñados específicamente para tu negocio.",
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas web, paneles de gestión y herramientas internas",
    description: "Dashboards y herramientas para visualizar y controlar tu operación.",
  },
  {
    icon: BarChart3,
    title: "Reportes, KPIs y análisis de procesos",
    description: "Métricas claras para tomar mejores decisiones basadas en datos.",
  },
  {
    icon: Bot,
    title: "Agentes de IA y flujos de trabajo automáticos",
    description: "Inteligencia artificial aplicada a tareas repetitivas y complejas.",
  },
]

const servicesEn = [
  {
    icon: MessageSquare,
    title: "WhatsApp automation and customer service",
    description: "Automated replies, chatbots, and support flows that work 24/7.",
  },
  {
    icon: Database,
    title: "ERP/CRM development",
    description: "Custom management systems to control customers, sales, and operations.",
  },
  {
    icon: Link2,
    title: "CRM, ERP, forms, and payment integrations",
    description: "We connect your tools so data flows automatically.",
  },
  {
    icon: FileText,
    title: "Billing, booking, and document automation",
    description: "Administrative processes that run on their own with no manual work.",
  },
  {
    icon: Code2,
    title: "Custom software development",
    description: "Apps and systems designed specifically for your business.",
  },
  {
    icon: LayoutDashboard,
    title: "Web systems, dashboards, and internal tools",
    description: "Dashboards and tools to visualize and control your operation.",
  },
  {
    icon: BarChart3,
    title: "Reports, KPIs, and process analytics",
    description: "Clear metrics to make better data-driven decisions.",
  },
  {
    icon: Bot,
    title: "AI agents and automated workflows",
    description: "Artificial intelligence applied to repetitive and complex tasks.",
  },
]

const servicesPt = [
  {
    icon: MessageSquare,
    title: "Automacao de WhatsApp e atendimento ao cliente",
    description: "Respostas automaticas, chatbots e fluxos de atendimento que funcionam 24 horas.",
  },
  {
    icon: Database,
    title: "Desenvolvimento de ERP/CRM",
    description: "Sistemas de gestao personalizados para controlar clientes, vendas e operacoes.",
  },
  {
    icon: Link2,
    title: "Integracoes com CRM, ERP, formularios e pagamentos",
    description: "Conectamos suas ferramentas para que os dados fluam automaticamente.",
  },
  {
    icon: FileText,
    title: "Automacao de cobrancas, reservas e documentos",
    description: "Processos administrativos que funcionam sozinhos, sem intervencao manual.",
  },
  {
    icon: Code2,
    title: "Desenvolvimento de software sob medida",
    description: "Aplicacoes e sistemas desenhados especificamente para o seu negocio.",
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas web, paines de gestao e ferramentas internas",
    description: "Dashboards e ferramentas para visualizar e controlar sua operacao.",
  },
  {
    icon: BarChart3,
    title: "Relatorios, KPIs e analise de processos",
    description: "Metricas claras para tomar melhores decisoes baseadas em dados.",
  },
  {
    icon: Bot,
    title: "Agentes de IA e fluxos de trabalho automaticos",
    description: "Inteligencia artificial aplicada a tarefas repetitivas e complexas.",
  },
]

type ServicesProps = {
  language: Language
}

export function Services({ language }: ServicesProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const services = isEn ? servicesEn : isPt ? servicesPt : servicesEs

  return (
    <section id="servicios" className="bg-background pt-12 pb-14 dark-section-deep sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            {isEn ? (
              <>
                Our <span>services</span>
              </>
            ) : isPt ? (
              <>
                Nossos <span>servicos</span>
              </>
            ) : (
              <>
                Nuestros <span>servicios</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isEn
              ? "End-to-end solutions to digitize, automate, and scale your business"
              : isPt
                ? "Solucoes completas para digitalizar, automatizar e escalar o seu negocio"
              : "Soluciones integrales para digitalizar, automatizar y escalar tu negocio"}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="dark-panel group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-md dark:hover:border-[#3BB3E8]/22 dark:hover:shadow-[0_22px_50px_rgba(2,8,23,0.42)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-[#3BB3E8]/14 bg-[linear-gradient(180deg,rgba(59,179,232,0.14),rgba(38,38,220,0.06))] text-[#3BB3E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_10px_18px_rgba(59,179,232,0.08)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#3BB3E8]/28 group-hover:bg-[#3BB3E8] group-hover:text-white group-hover:shadow-[0_16px_28px_rgba(59,179,232,0.18)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_26px_rgba(2,8,23,0.28)]">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
