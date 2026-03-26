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
    linkedin: "https://www.linkedin.com/in/hernanstupniki/",
  },
  {
    name: "Tobias Tarnowski",
    role: "Tecnico informatico y analista de sistemas",
    description:
      "Soy tecnico informatico y analista de sistemas. Me enfoco en Python, SQL y Power BI, y como estudiante de Ingenieria en Sistemas de Informacion trabajo para convertir datos y procesos en soluciones practicas para el negocio.",
    photo: "/tobias-tarnowski.png",
    linkedin: "https://www.linkedin.com/in/tobiastarnowski/",
  },
  {
    name: "Facundo Salazar",
    role: "Analista en Sistemas",
    description:
      "Soy analista en sistemas y estudiante avanzado de Ingenieria en Sistemas de la Informacion. Me enfoco en desarrollo de software, redes y automatizacion, con una mirada de emprendimiento y negocios tecnologicos para crear soluciones utiles y escalables.",
    photo: "/facundo-salazar.png",
    linkedin: "https://www.linkedin.com/in/facundosalazar/",
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
              ZUBU es una agencia de automatización y desarrollo de software enfocada en diseñar sistemas claros, medibles y escalables.
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
              <article key={member.name} className="flex h-full flex-col rounded-2xl border border-border/60 bg-card px-6 pt-6 pb-6 shadow-sm">
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
                <div className="mt-auto flex justify-end pt-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
