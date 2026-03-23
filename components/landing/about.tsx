import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

const highlights = [
  "Sistemas claros y medibles",
  "Soluciones escalables",
  "Visión práctica",
  "Resultados tangibles",
]

const teamMembers = [
  {
    name: "Hernan Stupniki",
    role: "Ingeniero de datos y automatización",
    description:
      "Soy analista en sistemas y estudiante avanzado de Ingenieria en Sistemas de la Informacion. Me enfoco en Python, SQL, n8n, Spark y Airflow para disenar automatizaciones y soluciones de datos orientadas a resultados.",
    photo: "/hernan-stupniki.jpg",
  },
  {
    name: "Tobias Tarnowski",
    role: "Tecnico informatico y analista de sistemas",
    description:
      "Soy tecnico informatico y analista de sistemas. Me enfoco en Python, SQL y Power BI, y como estudiante de Ingenieria en Sistemas de Informacion trabajo para convertir datos y procesos en soluciones practicas para el negocio.",
    photo: "/tobias-tarnowski.png",
  },
  {
    name: "Facundo Salazar",
    role: "Analista en Sistemas",
    description:
      "Soy analista en sistemas y estudiante avanzado de Ingenieria en Sistemas de la Informacion. Me enfoco en desarrollo de software, redes y automatizacion, con una mirada de emprendimiento y negocios tecnologicos para crear soluciones utiles y escalables.",
    photo: "/facundo-salazar.png",
  },
]

export function About() {
  return (
    <section id="nosotros" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Quiénes somos
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              KORA es una agencia de automatización y desarrollo de software enfocada en diseñar sistemas claros, medibles y escalables.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Creamos soluciones para atención, ventas, operaciones, cobros, datos y control interno, con una visión práctica: menos tareas manuales, más orden y mejores resultados.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-foreground" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-border/50 to-transparent" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">+10</div>
                    <div className="mt-1 text-sm text-muted-foreground">Proyectos entregados</div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">100%</div>
                    <div className="mt-1 text-sm text-muted-foreground">Clientes satisfechos</div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">24/7</div>
                    <div className="mt-1 text-sm text-muted-foreground">Sistemas funcionando</div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="text-3xl font-bold text-foreground">-70%</div>
                    <div className="mt-1 text-sm text-muted-foreground">Tiempo en tareas manuales</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Nuestro equipo</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm font-medium text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
