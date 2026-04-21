import {
  Clock,
  Eye,
  Heart,
  ListChecks,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react"
import type { Language } from "@/components/landing/language"

const benefitsEs = [
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

const benefitsEn = [
  {
    icon: Clock,
    title: "Fewer manual tasks",
    description: "Automate repetitive work and focus your energy on what matters",
  },
  {
    icon: ShieldCheck,
    title: "Fewer errors",
    description: "Systems that do not get tired, forget, or make mistakes",
  },
  {
    icon: Zap,
    title: "More speed",
    description: "Processes that took hours now take minutes",
  },
  {
    icon: Eye,
    title: "More control",
    description: "Complete visibility of every process in real time",
  },
  {
    icon: ListChecks,
    title: "Better operational order",
    description: "Everything documented, structured, and easy to audit",
  },
  {
    icon: TrendingUp,
    title: "More scalability",
    description: "Grow without multiplying your team or your costs",
  },
  {
    icon: Heart,
    title: "Better customer experience",
    description: "Fast responses, smoother processes, and consistent service",
  },
]

const benefitsPt = [
  {
    icon: Clock,
    title: "Menos tarefas manuais",
    description: "Automatize o repetitivo e foque sua energia no que importa",
  },
  {
    icon: ShieldCheck,
    title: "Menos erros",
    description: "Sistemas que nao se cansam, nao esquecem e nao erram",
  },
  {
    icon: Zap,
    title: "Mais velocidade",
    description: "Processos que levavam horas agora levam minutos",
  },
  {
    icon: Eye,
    title: "Mais controle",
    description: "Visibilidade total de cada processo em tempo real",
  },
  {
    icon: ListChecks,
    title: "Mais organizacao operacional",
    description: "Tudo documentado, estruturado e facil de auditar",
  },
  {
    icon: TrendingUp,
    title: "Mais escalabilidade",
    description: "Cresca sem multiplicar sua equipe nem seus custos",
  },
  {
    icon: Heart,
    title: "Melhor experiencia do cliente",
    description: "Respostas rapidas, processos fluidos e atendimento consistente",
  },
]

type BenefitsProps = {
  language: Language
}

export function Benefits({ language }: BenefitsProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const benefits = isEn ? benefitsEn : isPt ? benefitsPt : benefitsEs

  return (
    <section id="beneficios" className="bg-muted/30 py-14 dark-section-alt sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            {isEn ? (
              <>
                Results you can <span>expect</span>
              </>
            ) : isPt ? (
              <>
                Resultados que voce pode <span>esperar</span>
              </>
            ) : (
              <>
                Resultados que podés <span>esperar</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isEn ? "Concrete and measurable benefits for your business" : isPt ? "Beneficios concretos e mensuraveis para o seu negocio" : "Beneficios concretos y medibles para tu negocio"}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.slice(0, 4).map((benefit) => (
            <div
              key={benefit.title}
              className="dark-panel rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[1.05rem] border border-[#3BB3E8]/16 bg-[linear-gradient(180deg,rgba(59,179,232,0.12),rgba(38,38,220,0.05))] text-[#3BB3E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_18px_rgba(59,179,232,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_24px_rgba(2,8,23,0.24)]">
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-4xl gap-6 sm:grid-cols-3">
          {benefits.slice(4).map((benefit) => (
            <div
              key={benefit.title}
              className="dark-panel rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[1.05rem] border border-[#3BB3E8]/16 bg-[linear-gradient(180deg,rgba(59,179,232,0.12),rgba(38,38,220,0.05))] text-[#3BB3E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_18px_rgba(59,179,232,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_24px_rgba(2,8,23,0.24)]">
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
