"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/landing/contact-modal"
import { ArrowRight } from "lucide-react"
import type { Language } from "@/components/landing/language"

type CTAProps = {
  language: Language
}

export function CTA({ language }: CTAProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const isEn = language === "en"
  const isPt = language === "pt"

  return (
    <>
      <section id="contacto" className="cta-final-section py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="cta-final-card relative overflow-hidden rounded-3xl border px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <div className="cta-final-orb cta-final-orb-top" aria-hidden="true" />
            <div className="cta-final-orb cta-final-orb-bottom" aria-hidden="true" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="cta-final-title text-4xl font-bold tracking-tight">
                {isEn ? (
                  "Turn manual processes into smart systems"
                ) : isPt ? (
                  "Transforme processos manuais em sistemas inteligentes"
                ) : (
                  "Transformá procesos manuales en sistemas inteligentes"
                )}
              </h2>
              <p className="cta-final-description mt-6 text-lg">
                {isEn
                  ? "Start with a free assessment. We analyze your business and show you how to save time, reduce errors, and scale faster."
                  : isPt
                    ? "Comece com um diagnostico gratuito. Analisamos seu negocio e mostramos como economizar tempo, reduzir erros e escalar mais rapido."
                  : "Empezá con un diagnóstico gratuito. Analizamos tu negocio y te mostramos cómo podemos ayudarte a ahorrar tiempo, reducir errores y escalar."}
              </p>
              <div className="mt-10">
                <Button
                  size="lg"
                  className="contact-cta-shine h-14 rounded-full border px-10 text-base"
                  onClick={() => setContactModalOpen(true)}
                >
                  {isEn ? "I want to automate my business" : isPt ? "Quero automatizar meu negocio" : "Quiero automatizar mi negocio"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="cta-final-note mt-6 text-sm">
                {isEn ? "No commitment. We reply in under 24 hours." : isPt ? "Sem compromisso. Respondemos em menos de 24 horas." : "Sin compromiso. Respondemos en menos de 24 horas."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactModal language={language} open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
