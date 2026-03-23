import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3, Bot } from "lucide-react"
import { Montserrat, Cormorant_Garamond, Lora } from "next/font/google"

const heroPrimaryFont = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
})

const heroSecondaryFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
})

const heroTertiaryFont = Lora({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
})

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="pointer-events-none absolute right-24 top-6 z-10 hidden lg:block xl:right-28">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-2.5 py-0.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <svg
            className="h-3 w-5 overflow-hidden rounded-[2px]"
            viewBox="0 0 24 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="24" height="16" fill="#74ACDF" />
            <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
            <circle cx="12" cy="8" r="1.2" fill="#F6B40E" />
          </svg>
          Posadas, Misiones
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="flex flex-col items-center">
            <span className={`${heroPrimaryFont.className} block text-3xl font-black uppercase tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl`}>
              Automatización de procesos
            </span>
            <span className={`${heroSecondaryFont.className} block text-3xl font-semibold uppercase tracking-[0.14em] text-[#4a4a4a] sm:text-4xl lg:text-5xl`}>
              Desarrollo de software
            </span>
            <span className={`${heroTertiaryFont.className} block text-2xl font-semibold tracking-wide text-[#7a7a7a] sm:text-3xl lg:text-4xl`}>
              Inteligencia artificial para empresas
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl lg:max-w-4xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Ayudamos a negocios y pymes a ahorrar tiempo, reducir errores y aumentar ventas mediante automatizaciones, software a medida, bots e integraciones inteligentes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <a href="#contacto">
                Solicitar diagnóstico
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <a href="#servicios">Nuestros servicios</a>
            </Button>
          </div>
        </div>

        {/* Visual Elements - Abstract dashboard/automation cards */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <Zap className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Automatización</h3>
              <p className="mt-2 text-sm text-muted-foreground">Procesos que antes tomaban horas, ahora funcionan solos</p>
            </div>
            <div className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <BarChart3 className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Software a Medida</h3>
              <p className="mt-2 text-sm text-muted-foreground">Sistemas diseñados para las necesidades de tu negocio</p>
            </div>
            <div className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <Bot className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Inteligencia Artificial</h3>
              <p className="mt-2 text-sm text-muted-foreground">Agentes y bots que trabajan por vos las 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
