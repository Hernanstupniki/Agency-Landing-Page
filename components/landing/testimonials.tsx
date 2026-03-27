import { Quote } from "lucide-react"
import type { Language } from "@/components/landing/language"

const testimonialsEs = [
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

const testimonialsEn = [
  {
    quote: "We managed to organize processes that used to be manual, and now we save a lot of time.",
    author: "Maria Gonzalez",
    role: "Operations Director",
    company: "Distribuidora Norte",
    metric: "-60% admin task time",
  },
  {
    quote: "Automation improved our customer service and allowed us to respond much faster.",
    author: "Carlos Fernandez",
    role: "General Manager",
    company: "Servicios Express",
    metric: "Response in < 5 min",
  },
  {
    quote: "Having a clearer and measurable system helped us make better business decisions.",
    author: "Laura Martinez",
    role: "CEO",
    company: "TechStore Online",
    metric: "+40% sales",
  },
  {
    quote: "ZUBU understood our problem and proposed a practical, professional solution.",
    author: "Roberto Sanchez",
    role: "Founder",
    company: "Inmobiliaria Sur",
    metric: "100+ properties managed",
  },
]

const testimonialsPt = [
  {
    quote: "Conseguimos organizar processos que antes eram manuais e hoje economizamos muito tempo.",
    author: "Maria Gonzalez",
    role: "Diretora de Operacoes",
    company: "Distribuidora Norte",
    metric: "-60% tempo em tarefas admin",
  },
  {
    quote: "A automacao melhorou nosso atendimento e nos permitiu responder muito mais rapido.",
    author: "Carlos Fernandez",
    role: "Gerente Geral",
    company: "Servicios Express",
    metric: "Resposta em < 5 min",
  },
  {
    quote: "Ter um sistema mais claro e mensuravel nos ajudou a tomar melhores decisoes para o negocio.",
    author: "Laura Martinez",
    role: "CEO",
    company: "TechStore Online",
    metric: "+40% em vendas",
  },
  {
    quote: "A ZUBU entendeu nosso problema e propôs uma solucao pratica e profissional.",
    author: "Roberto Sanchez",
    role: "Fundador",
    company: "Inmobiliaria Sur",
    metric: "100+ imoveis gerenciados",
  },
]

type TestimonialsProps = {
  language: Language
}

export function Testimonials({ language }: TestimonialsProps) {
  const isEn = language === "en"
  const isPt = language === "pt"
  const testimonials = isEn ? testimonialsEn : isPt ? testimonialsPt : testimonialsEs

  return (
    <section id="testimonios" className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {isEn ? "Clients who trusted ZUBU" : isPt ? "Clientes que confiaram na ZUBU" : "Clientes que confiaron en ZUBU"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isEn
              ? "Our clients value clarity, efficiency, and the real impact of every implemented solution"
              : isPt
                ? "Nossos clientes valorizam a clareza, a eficiencia e o impacto real de cada solucao implementada"
              : "Nuestros clientes valoran la claridad, la eficiencia y el impacto real de cada solución implementada"}
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
