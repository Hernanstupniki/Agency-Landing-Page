import { Layers, ArrowRight } from "lucide-react"

export function Differentiator() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>
          
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10">
              <Layers className="h-8 w-8 text-background" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl">
              No solo automatizamos tareas sueltas
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-background/80">
              Diseñamos sistemas completos. Combinamos automatización, desarrollo de software, inteligencia artificial y métricas para que cada proceso sea más eficiente, más claro y más fácil de escalar.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background/90"
              >
                Conocé cómo trabajamos
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
