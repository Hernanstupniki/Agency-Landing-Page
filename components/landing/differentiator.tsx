"use client"

import { useState } from "react"
import { Layers, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmailOptions } from "@/components/landing/email-options"
import type { Language } from "@/components/landing/language"

const calendarBookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
  "https://calendar.app.google/1xH4S97J5b2vuiBR6"

type DifferentiatorProps = {
  language: Language
}

export function Differentiator({ language }: DifferentiatorProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const isEn = language === "en"
  const isPt = language === "pt"
  const whatsappMessage = isEn
    ? "https://wa.me/5493764502803?text=Hi%20ZUBU,%20I%20want%20to%20automate%20my%20business"
    : isPt
      ? "https://wa.me/5493764502803?text=Ola%20ZUBU,%20quero%20automatizar%20meu%20negocio"
    : "https://wa.me/5493764502803?text=Hola%20ZUBU,%20quiero%20automatizar%20mi%20negocio"

  return (
    <>
      <section id="como-trabajamos" className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-16 shadow-sm sm:px-12 sm:py-20 lg:px-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,130,160,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,160,0.14)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(120,130,160,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,160,0.2)_1px,transparent_1px)]" />
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Layers className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {isEn ? "We do more than automate isolated tasks" : isPt ? "Fazemos mais do que automatizar tarefas isoladas" : "No solo automatizamos tareas sueltas"}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {isEn
                  ? "We design complete systems. We combine automation, custom software, artificial intelligence, and metrics to make every process more efficient, clearer, and easier to scale."
                  : isPt
                    ? "Desenhamos sistemas completos. Combinamos automacao, software sob medida, inteligencia artificial e metricas para tornar cada processo mais eficiente, mais claro e mais facil de escalar."
                  : "Diseñamos sistemas completos. Combinamos automatización, desarrollo de software, inteligencia artificial y métricas para que cada proceso sea más eficiente, más claro y más fácil de escalar."}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground"
                >
                  {isEn ? "CONTACT US" : isPt ? "FALE CONOSCO" : "CONTACTANOS"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
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
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{isEn ? "Contact us" : isPt ? "Fale conosco" : "Contactanos"}</h3>
              <button
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setContactModalOpen(false)}
                aria-label={isEn ? "Close" : isPt ? "Fechar" : "Cerrar"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              {isEn
                ? "Book a meeting through Google Calendar and we will coordinate via Google Meet."
                : isPt
                  ? "Agende uma reuniao pelo Google Calendar e alinhamos tudo pelo Google Meet."
                : "Agenda una reunion por Google Calendar y coordinamos por Google Meet."}
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <a
                  href={calendarBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  {isEn ? "Book a meeting" : isPt ? "Quero agendar uma reuniao" : "Agendar una reunion"}
                </a>
              </Button>
              <Button asChild className="w-full bg-[#25D366] text-white hover:bg-[#169c47] hover:text-white">
                <a
                  href={whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  WhatsApp
                </a>
              </Button>
              <EmailOptions language={language} onOptionSelected={() => setContactModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
