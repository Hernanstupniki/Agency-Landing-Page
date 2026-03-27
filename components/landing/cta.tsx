"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmailOptions } from "@/components/landing/email-options"
import { ArrowRight, X } from "lucide-react"
import type { Language } from "@/components/landing/language"

const calendarBookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
  "https://calendar.app.google/1xH4S97J5b2vuiBR6"

type CTAProps = {
  language: Language
}

export function CTA({ language }: CTAProps) {
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
      <section id="contacto" className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 shadow-sm sm:px-12 sm:py-20 lg:px-16">
            {/* Subtle decorative elements */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-muted/50" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-muted/50" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {isEn ? "Turn manual processes into smart systems" : isPt ? "Transforme processos manuais em sistemas inteligentes" : "Transformá procesos manuales en sistemas inteligentes"}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                {isEn
                  ? "Start with a free assessment. We analyze your business and show you how to save time, reduce errors, and scale faster."
                  : isPt
                    ? "Comece com um diagnostico gratuito. Analisamos seu negocio e mostramos como economizar tempo, reduzir erros e escalar mais rapido."
                  : "Empezá con un diagnóstico gratuito. Analizamos tu negocio y te mostramos cómo podemos ayudarte a ahorrar tiempo, reducir errores y escalar."}
              </p>
              <div className="mt-10">
                <Button size="lg" className="h-14 px-10 text-base" onClick={() => setContactModalOpen(true)}>
                  {isEn ? "I want to automate my business" : isPt ? "Quero automatizar meu negocio" : "Quiero automatizar mi negocio"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                {isEn ? "No commitment. We reply in under 24 hours." : isPt ? "Sem compromisso. Respondemos em menos de 24 horas." : "Sin compromiso. Respondemos en menos de 24 horas."}
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
              <h3 className="text-base font-semibold">{isEn ? "Contact us" : isPt ? "Fale conosco" : "Contactanos"}</h3>
              <button
                className="rounded-md p-1 text-black/70 transition-colors hover:bg-black/10 hover:text-black"
                onClick={() => setContactModalOpen(false)}
                aria-label={isEn ? "Close" : isPt ? "Fechar" : "Cerrar"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-3 text-sm text-black/70">
              {isEn
                ? "Book a meeting through Google Calendar and we will coordinate via Google Meet."
                : isPt
                  ? "Agende uma reuniao pelo Google Calendar e alinhamos tudo pelo Google Meet."
                : "Agenda una reunion por Google Calendar y coordinamos por Google Meet."}
            </p>

            <div className="space-y-2">
              <Button asChild className="w-full bg-black text-white hover:bg-black/85">
                <a
                  href={calendarBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  {isEn ? "Book a meeting" : isPt ? "Quero agendar uma reuniao" : "Quiero agendar una reunion"}
                </a>
              </Button>
              <Button asChild className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]">
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
