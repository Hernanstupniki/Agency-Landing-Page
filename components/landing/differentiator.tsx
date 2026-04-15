"use client"

import { useState } from "react"
import { Layers, ArrowRight } from "lucide-react"
import { ContactModal } from "@/components/landing/contact-modal"
import type { Language } from "@/components/landing/language"

type DifferentiatorProps = {
  language: Language
}

export function Differentiator({ language }: DifferentiatorProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const isEn = language === "en"
  const isPt = language === "pt"

  return (
    <>
      <section id="como-trabajamos" className="bg-background py-14 dark-section-deep sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="dark-panel-strong relative overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-16 shadow-sm sm:px-12 sm:py-20 lg:px-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,130,160,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,160,0.14)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(120,130,160,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,160,0.2)_1px,transparent_1px)]" />
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3BB3E8]/12 text-[#3BB3E8]">
                <Layers className="h-8 w-8" />
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

      <ContactModal language={language} open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
