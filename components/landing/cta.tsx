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
      <section id="contacto" className="bg-muted/30 py-14 dark-section-alt sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="dark-panel-strong relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 shadow-sm sm:px-12 sm:py-20 lg:px-16">
            {/* Subtle decorative elements */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-muted/50 dark:bg-[#3BB3E8]/14" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-muted/50 dark:bg-[#1a2840]/90" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {isEn ? (
                  <>
                    Turn manual processes into smart <span className="indigo-accent">systems</span>
                  </>
                ) : isPt ? (
                  <>
                    Transforme processos manuais em sistemas <span className="indigo-accent">inteligentes</span>
                  </>
                ) : (
                  <>
                    Transformá procesos manuales en sistemas <span className="indigo-accent">inteligentes</span>
                  </>
                )}
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                {isEn
                  ? "Start with a free assessment. We analyze your business and show you how to save time, reduce errors, and scale faster."
                  : isPt
                    ? "Comece com um diagnostico gratuito. Analisamos seu negocio e mostramos como economizar tempo, reduzir erros e escalar mais rapido."
                  : "Empezá con un diagnóstico gratuito. Analizamos tu negocio y te mostramos cómo podemos ayudarte a ahorrar tiempo, reducir errores y escalar."}
              </p>
              <div className="mt-10">
                <Button
                  size="lg"
                  className="h-14 bg-primary px-10 text-base text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                  onClick={() => setContactModalOpen(true)}
                >
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

      <ContactModal language={language} open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
