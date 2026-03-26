import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Logramos ordenar procesos que antes hacíamos manualmente y hoy ahorramos mucho tiempo.",
    author: "María González",
    role: "Directora de Operaciones",
    company: "Distribuidora Norte",
    metric: "-60% tiempo en tareas admin",
  },
  {
    quote: "La automatización mejoró nuestra atención y nos permitió responder más rápido a nuestros clientes.",
    author: "Carlos Fernández",
    role: "Gerente General",
    company: "Servicios Express",
    metric: "Respuesta en < 5 min",
  },
  {
    quote: "Tener un sistema más claro y medible nos ayudó a tomar mejores decisiones para el negocio.",
    author: "Laura Martínez",
    role: "CEO",
    company: "TechStore Online",
    metric: "+40% en ventas",
  },
  {
    quote: "ZUBU entendió nuestro problema y nos propuso una solución práctica y profesional.",
    author: "Roberto Sánchez",
    role: "Fundador",
    company: "Inmobiliaria Sur",
    metric: "100+ propiedades gestionadas",
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Clientes que confiaron en ZUBU
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nuestros clientes valoran la claridad, la eficiencia y el impacto real de cada solución implementada
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative rounded-2xl border border-border/60 bg-card p-8"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-muted/30" />
              <p className="text-lg leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
                <div className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
                  {testimonial.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
