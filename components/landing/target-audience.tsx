import { 
  Building2, 
  Store, 
  Utensils, 
  ShoppingCart, 
  Home, 
  Briefcase,
  Stethoscope,
  Scissors,
} from "lucide-react"
import type { Language } from "@/components/landing/language"

const audiencesEs = [
  {
    icon: Building2,
    title: "PyMEs",
    description: "Empresas que buscan crecer sin aumentar costos operativos",
  },
  {
    icon: Briefcase,
    title: "Empresas de servicios",
    description: "Negocios que necesitan optimizar atención y seguimiento de clientes",
  },
  {
    icon: Utensils,
    title: "Restaurantes y gastronomía",
    description: "Locales que quieren automatizar pedidos, reservas y delivery",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Tiendas online que necesitan integrar ventas, stock y envíos",
  },
  {
    icon: Home,
    title: "Inmobiliarias",
    description: "Agencias que buscan automatizar seguimiento de propiedades y clientes",
  },
  {
    icon: Store,
    title: "Estudios y negocios",
    description: "Profesionales que necesitan digitalizar procesos y tener más control",
  },
  {
    icon: Stethoscope,
    title: "Clínicas",
    description: "Centros de salud que quieren automatizar turnos, recordatorios y seguimiento de pacientes",
  },
  {
    icon: Scissors,
    title: "Barberías y peluquerías",
    description: "Equipos que necesitan ordenar agenda, recordatorios y atención por WhatsApp",
  },
  {
    icon: Scissors,
    title: "Spas",
    description: "Salones que buscan automatizar reservas, confirmaciones y campañas de fidelización",
  },
]

const audiencesEn = [
  {
    icon: Building2,
    title: "SMEs",
    description: "Companies that want to grow without increasing operating costs",
  },
  {
    icon: Briefcase,
    title: "Service companies",
    description: "Businesses that need to optimize customer care and follow-up",
  },
  {
    icon: Utensils,
    title: "Restaurants and food businesses",
    description: "Businesses that want to automate orders, bookings, and delivery",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Online stores that need to integrate sales, stock, and shipping",
  },
  {
    icon: Home,
    title: "Real estate",
    description: "Agencies looking to automate property and lead follow-up",
  },
  {
    icon: Store,
    title: "Firms and businesses",
    description: "Professionals who need to digitize processes and gain more control",
  },
  {
    icon: Stethoscope,
    title: "Clinics",
    description: "Health centers that want to automate appointments, reminders, and patient follow-up",
  },
  {
    icon: Scissors,
    title: "Barbershops and hair salons",
    description: "Teams that need better scheduling, reminders, and WhatsApp customer care",
  },
  {
    icon: Scissors,
    title: "Spas",
    description: "Salons looking to automate bookings, confirmations, and retention campaigns",
  },
]

const audiencesPt = [
  {
    icon: Building2,
    title: "PMEs",
    description: "Empresas que buscam crescer sem aumentar custos operacionais",
  },
  {
    icon: Briefcase,
    title: "Empresas de servicos",
    description: "Negocios que precisam otimizar atendimento e acompanhamento de clientes",
  },
  {
    icon: Utensils,
    title: "Restaurantes e gastronomia",
    description: "Negocios que querem automatizar pedidos, reservas e delivery",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Lojas online que precisam integrar vendas, estoque e envios",
  },
  {
    icon: Home,
    title: "Imobiliarias",
    description: "Agencias que buscam automatizar acompanhamento de imoveis e clientes",
  },
  {
    icon: Store,
    title: "Escritorios e negocios",
    description: "Profissionais que precisam digitalizar processos e ter mais controle",
  },
  {
    icon: Stethoscope,
    title: "Clinicas",
    description: "Centros de saude que querem automatizar agendamentos, lembretes e acompanhamento de pacientes",
  },
  {
    icon: Scissors,
    title: "Barbearias e saloes de beleza",
    description: "Equipes que precisam organizar agenda, lembretes e atendimento por WhatsApp",
  },
  {
    icon: Scissors,
    title: "Spas",
    description: "Saloes que buscam automatizar reservas, confirmacoes e campanhas de fidelizacao",
  },
]

type TargetAudienceProps = {
  language: Language
}

export function TargetAudience({ language }: TargetAudienceProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const audiences = isEn ? audiencesEn : isPt ? audiencesPt : audiencesEs

  return (
    <section id="para-quien" className="bg-muted/30 py-14 dark-section-alt sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {isEn ? "Who is ZUBU for?" : isPt ? "Para quem e a ZUBU?" : "¿Para quién es ZUBU?"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isEn
              ? "We work with businesses that need to digitize processes, respond faster, and gain more control"
              : isPt
                ? "Trabalhamos com negocios que precisam digitalizar processos, responder mais rapido e ter mais controle"
              : "Trabajamos con negocios que necesitan digitalizar procesos, responder más rápido y tener más control"}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#3BB3E8]/18 bg-[#3BB3E8]/10 text-[#3BB3E8]">
                <audience.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{audience.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
