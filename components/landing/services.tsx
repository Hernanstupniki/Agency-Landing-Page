import { 
  MessageSquare, 
  Database, 
  Link2, 
  FileText, 
  Code2, 
  LayoutDashboard, 
  BarChart3, 
  Bot 
} from "lucide-react"

const services = [
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

export function Services() {
  return (
    <section id="servicios" className="bg-background pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluciones integrales para digitalizar, automatizar y escalar tu negocio
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
