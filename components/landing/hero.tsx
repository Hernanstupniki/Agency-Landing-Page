import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3, Bot } from "lucide-react"
import { Montserrat } from "next/font/google"

const heroPrimaryFont = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
})

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f5f7fb] pb-20 pt-4 sm:pt-6 lg:pt-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-80 w-80 animate-hero-float rounded-full bg-[#a7d7ff]/35 blur-3xl" />
        <div className="absolute -right-24 top-8 h-96 w-96 animate-hero-float-reverse rounded-full bg-[#ffd6b3]/35 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dce3ee_1px,transparent_1px),linear-gradient(to_bottom,#dce3ee_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-45 [mask-image:radial-gradient(ellipse_70%_58%_at_50%_35%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="mb-5 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 px-0 py-0 text-xs font-medium text-slate-600">
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

          <h1 className="flex flex-col items-center lg:items-start">
            <span className={`${heroPrimaryFont.className} block text-6xl font-black uppercase tracking-tight text-[#0a0f1c] sm:text-7xl lg:text-8xl`}>
              KORA
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-[#4a5668] sm:text-xl lg:mx-0">
            Ayudamos a negocios y pymes a ahorrar tiempo, reducir errores y aumentar ventas mediante automatizaciones, software a medida, bots e integraciones inteligentes.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Button asChild size="lg" className="h-12 rounded-full bg-[#0a0f1c] px-8 text-base shadow-[0_14px_32px_rgba(10,15,28,0.22)] hover:bg-[#121a2f]">
              <a href="#contacto">
                Solicitar diagnóstico
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-slate-300 bg-white/80 px-8 text-base text-slate-900 shadow-[0_10px_25px_rgba(148,163,184,0.2)] hover:bg-white">
              <a href="#servicios">Nuestros servicios</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="animate-hero-float rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <p className="text-sm font-semibold text-black">Automatización</p>
            </div>
            <div className="animate-hero-float-delayed rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <BarChart3 className="h-5 w-5 text-black" />
              </div>
              <p className="text-sm font-semibold text-black">Software a medida</p>
            </div>
            <div className="animate-hero-float rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm [animation-delay:0.9s]">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <Bot className="h-5 w-5 text-black" />
              </div>
              <p className="text-sm font-semibold text-black">IA aplicada</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div className="relative">
            <Image
              src="/industrial-automation.png"
              alt="Ilustración de automatización industrial"
              width={1088}
              height={770}
              priority
              className="h-[360px] w-full object-contain sm:h-[500px] lg:h-[620px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
