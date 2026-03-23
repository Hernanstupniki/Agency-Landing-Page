import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="contacto" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 shadow-sm sm:px-12 sm:py-20 lg:px-16">
          {/* Subtle decorative elements */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-muted/50" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-muted/50" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transformá procesos manuales en sistemas inteligentes
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Empezá con un diagnóstico gratuito. Analizamos tu negocio y te mostramos cómo podemos ayudarte a ahorrar tiempo, reducir errores y escalar.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="h-14 px-10 text-base">
                <a
                  href="https://wa.me/5493764502803?text=Hola%20KORA,%20quiero%20automatizar%20mi%20negocio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero automatizar mi negocio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Sin compromiso. Respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
