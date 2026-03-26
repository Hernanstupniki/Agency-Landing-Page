import { 
  Building2, 
  Store, 
  Utensils, 
  ShoppingCart, 
  Home, 
  Briefcase 
} from "lucide-react"

const audiences = [
  {
    icon: Building2,
    title: "Pymes",
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
]

export function TargetAudience() {
  return (
    <section id="para-quien" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ¿Para quién es ZUBU?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trabajamos con negocios que necesitan digitalizar procesos, responder más rápido y tener más control
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-card border border-border/60">
                <audience.icon className="h-6 w-6 text-foreground" />
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
