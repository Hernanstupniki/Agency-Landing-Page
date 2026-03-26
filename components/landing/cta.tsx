"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"

export function CTA() {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <>
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
                <Button size="lg" className="h-14 px-10 text-base" onClick={() => setContactModalOpen(true)}>
                  Quiero automatizar mi negocio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Sin compromiso. Respondemos en menos de 24 horas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {contactModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl bg-white p-5 text-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold">Contactanos</h3>
              <button
                className="rounded-md p-1 text-black/70 transition-colors hover:bg-black/10 hover:text-black"
                onClick={() => setContactModalOpen(false)}
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                <a
                  href="https://wa.me/5493764502803?text=Hola%20ZUBU,%20quiero%20automatizar%20mi%20negocio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full border-black/20 text-black hover:bg-black/5">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contacto@zubu.agency&su=Consulta%20desde%20la%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  Mail
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
