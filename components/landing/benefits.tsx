import { 
  Clock, 
  ShieldCheck, 
  Zap, 
  Eye, 
  ListChecks, 
  TrendingUp, 
  Heart 
} from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Menos tareas manuales",
    description: "Automatizá lo repetitivo y enfocá tu energía en lo que importa",
  },
  {
    icon: ShieldCheck,
    title: "Menos errores",
    description: "Sistemas que no se cansan, no se olvidan y no se equivocan",
  },
  {
    icon: Zap,
    title: "Más rapidez",
    description: "Procesos que antes tomaban horas, ahora toman minutos",
  },
  {
    icon: Eye,
    title: "Más control",
    description: "Visibilidad total de cada proceso, en tiempo real",
  },
  {
    icon: ListChecks,
    title: "Más orden operativo",
    description: "Todo documentado, estructurado y fácil de auditar",
  },
  {
    icon: TrendingUp,
    title: "Más escalabilidad",
    description: "Crecé sin multiplicar tu equipo ni tus costos",
  },
  {
    icon: Heart,
    title: "Mejor experiencia del cliente",
    description: "Respuestas rápidas, procesos fluidos y atención consistente",
  },
]

export function Benefits() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Resultados que podés esperar
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Beneficios concretos y medibles para tu negocio
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.slice(0, 4).map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <benefit.icon className="h-8 w-8 text-foreground" />
              <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-4xl gap-6 sm:grid-cols-3">
          {benefits.slice(4).map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <benefit.icon className="h-8 w-8 text-foreground" />
              <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
