"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EmailOptions } from "@/components/landing/email-options"
import { ArrowRight, Zap, BarChart3, Bot, X } from "lucide-react"
import type { Language } from "@/components/landing/language"

const calendarBookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
  "https://calendar.app.google/1xH4S97J5b2vuiBR6"

type HeroProps = {
  language: Language
}

export function Hero({ language }: HeroProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const isEn = language === "en"
  const isPt = language === "pt"
  const modalTitle = isEn ? "Contact us" : isPt ? "Fale conosco" : "Contactanos"
  const modalBody = isEn
    ? "Book a meeting through Google Calendar and we will coordinate via Google Meet."
    : isPt
      ? "Agende uma reuniao pelo Google Calendar e alinhamos tudo pelo Google Meet."
      : "Agenda una reunion por Google Calendar y coordinamos por Google Meet."
  const calendarLabel = isEn ? "Book a meeting" : isPt ? "Quero agendar uma reuniao" : "Agendar una reunion"
  const whatsappMessage = isEn
    ? "https://wa.me/5493764502803?text=Hi%20ZUBU,%20I%20want%20to%20automate%20my%20business"
    : isPt
      ? "https://wa.me/5493764502803?text=Ola%20ZUBU,%20quero%20automatizar%20meu%20negocio"
      : "https://wa.me/5493764502803?text=Hola%20ZUBU,%20quiero%20automatizar%20mi%20negocio"

  return (
    <>
      <section className="relative overflow-hidden bg-[#f5f7fb] pb-10 pt-4 dark:bg-[#0b111f] sm:pb-12 sm:pt-6 lg:pb-14 lg:pt-8" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-80 w-80 animate-hero-float rounded-full bg-[#a7d7ff]/35 blur-3xl" />
        <div className="absolute -right-24 top-8 h-96 w-96 animate-hero-float-reverse rounded-full bg-[#ffd6b3]/35 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dce3ee_1px,transparent_1px),linear-gradient(to_bottom,#dce3ee_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-45 [mask-image:radial-gradient(ellipse_70%_58%_at_50%_35%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(137,160,198,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(137,160,198,0.2)_1px,transparent_1px)] dark:opacity-35" />
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_620px] lg:gap-12 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="mb-0 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 px-0 py-0 text-xs font-medium text-muted-foreground">
              <svg
                className="h-3 w-5 overflow-hidden rounded-[2px]"
                viewBox="0 0 24 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="24" height="16" fill="#74ACDF" />
                <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
                <circle cx="12" cy="8" r="1.2" fill="#F6B40E" />
              </svg>
              {isEn ? "Posadas, Argentina" : isPt ? "Posadas, Argentina" : "Posadas, Misiones"}
            </span>
          </div>

          <h1
            id="hero-title"
            className="mx-auto mb-4 mt-3 max-w-[19ch] text-center text-6xl font-black leading-[0.98] tracking-[-0.025em] text-foreground sm:max-w-none sm:text-7xl lg:mx-0 lg:mb-6 lg:text-left lg:text-7xl"
          >
            {isEn ? (
              <>
                <span className="block lg:whitespace-nowrap lg:tracking-[-0.055em]">- manual tasks.</span>
                <span className="block">- errors.</span>
                <span className="block">+ sales.</span>
              </>
            ) : isPt ? (
              <>
                <span className="block lg:whitespace-nowrap lg:tracking-[-0.055em]">- tarefas manuais.</span>
                <span className="block">- erros.</span>
                <span className="block">+ vendas.</span>
              </>
            ) : (
              <>
                <span className="block lg:whitespace-nowrap lg:tracking-[-0.055em]">- tareas manuales.</span>
                <span className="block">- errores.</span>
                <span className="block">+ ventas.</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-2 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {isEn
              ? "We help businesses and SMEs save time, reduce errors, and increase sales through automation, custom software, bots, and smart integrations."
              : isPt
                ? "Ajudamos empresas e PMEs a economizar tempo, reduzir erros e aumentar vendas por meio de automacoes, software sob medida, bots e integracoes inteligentes."
              : "Ayudamos a negocios y PyMEs a ahorrar tiempo, reducir errores y aumentar ventas mediante automatizaciones, software a medida, bots e integraciones inteligentes."}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Button
              size="lg"
              className="h-12 rounded-full bg-primary px-8 text-base text-primary-foreground shadow-[0_14px_32px_rgba(10,15,28,0.22)] hover:bg-primary/80 hover:text-primary-foreground"
              onClick={() => setContactModalOpen(true)}
            >
              {isEn ? "Request an assessment" : isPt ? "Solicitar diagnostico" : "Solicitar diagnóstico"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-border bg-background/85 px-8 text-base text-foreground shadow-[0_10px_25px_rgba(148,163,184,0.2)] hover:border-foreground/35 hover:bg-foreground hover:text-background dark:bg-card/85 dark:hover:border-foreground/35 dark:hover:bg-foreground dark:hover:text-background">
              <a href="#servicios">{isEn ? "Our services" : isPt ? "Nossos servicos" : "Nuestros servicios"}</a>
            </Button>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-none lg:w-[620px] lg:max-w-[620px] lg:justify-self-end">
          <div className="relative">
            <Image
              src="/industrial-automation.png"
              alt={isEn ? "Industrial automation illustration" : isPt ? "Ilustracao de automacao industrial" : "Ilustración de automatización industrial"}
              width={1088}
              height={770}
              priority
              className="mx-auto h-auto w-full object-contain object-top"
            />
          </div>

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="animate-hero-float rounded-2xl border border-border/70 bg-card p-4 text-left shadow-sm">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Zap className="h-5 w-5 text-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">{isEn ? "Automation" : isPt ? "Automacao" : "Automatización"}</p>
            </div>
            <div className="animate-hero-float-delayed rounded-2xl border border-border/70 bg-card p-4 text-left shadow-sm">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <BarChart3 className="h-5 w-5 text-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">{isEn ? "Custom software" : isPt ? "Software sob medida" : "Software a medida"}</p>
            </div>
            <div className="animate-hero-float rounded-2xl border border-border/70 bg-card p-4 text-left shadow-sm [animation-delay:0.9s]">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Bot className="h-5 w-5 text-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">{isEn ? "Applied AI" : isPt ? "IA aplicada" : "IA aplicada"}</p>
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
              <h3 className="text-lg font-semibold">{modalTitle}</h3>
              <button
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setContactModalOpen(false)}
                aria-label={isEn ? "Close" : isPt ? "Fechar" : "Cerrar"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              {modalBody}
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <a
                  href={calendarBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  {calendarLabel}
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
