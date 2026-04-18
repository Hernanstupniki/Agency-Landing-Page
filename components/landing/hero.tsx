"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/landing/contact-modal"
import { LandingChatPanel } from "@/components/landing/floating-chat"
import { ArrowRight, BarChart3, Bot, Zap } from "lucide-react"
import type { Language } from "@/components/landing/language"

type HeroProps = {
  language: Language
}

export function Hero({ language }: HeroProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const isEn = language === "en"
  const isPt = language === "pt"
  const salesAccentClass =
    "block font-black tracking-[-0.045em] bg-[linear-gradient(90deg,#5FE3F4_0%,#3BB3E8_34%,#3BB3E8_66%,#3397FF_100%)] bg-clip-text text-transparent"

  return (
    <>
      <section
        className="relative overflow-hidden bg-[radial-gradient(circle_at_88%_14%,rgba(38,38,220,0.1),transparent_24%),radial-gradient(circle_at_top_left,#ffffff_0%,#f5f9ff_42%,#eef4fb_100%)] pb-8 pt-3 dark:bg-[radial-gradient(circle_at_88%_14%,rgba(88,88,255,0.18),transparent_26%),radial-gradient(circle_at_top_left,#112442_0%,#09111f_42%,#050a14_100%)] sm:pb-10 sm:pt-5 lg:pb-10 lg:pt-6"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 h-80 w-80 animate-hero-float rounded-full bg-[#8edfff]/26 blur-3xl dark:bg-[#3BB3E8]/18" />
          <div className="absolute -right-24 top-8 h-96 w-96 animate-hero-float-reverse rounded-full bg-[#d8ecff]/40 blur-3xl dark:bg-[#1a2f53]/42" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#d9e4f0_1px,transparent_1px),linear-gradient(to_bottom,#d9e4f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 [mask-image:radial-gradient(ellipse_70%_58%_at_50%_35%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(113,135,168,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,135,168,0.16)_1px,transparent_1px)] dark:opacity-28" />
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_520px] lg:gap-8 lg:px-8 xl:grid-cols-[minmax(0,1.12fr)_520px]">
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
              className="mx-auto mb-3 mt-3 max-w-[19ch] text-center text-5xl font-black leading-[0.96] tracking-[-0.03em] text-foreground sm:max-w-none sm:text-6xl lg:mx-0 lg:mb-5 lg:text-left lg:text-[4.6rem]"
            >
              {isEn ? (
                <>
                  <span className="block lg:whitespace-nowrap lg:tracking-[-0.055em]">- manual tasks.</span>
                  <span className="block">- errors.</span>
                  <span className={salesAccentClass}>+ sales.</span>
                </>
              ) : isPt ? (
                <>
                  <span className="block lg:whitespace-nowrap lg:tracking-[-0.055em]">- tarefas manuais.</span>
                  <span className="block">- erros.</span>
                  <span className={salesAccentClass}>+ vendas.</span>
                </>
              ) : (
                <>
                  <span className="block lg:whitespace-nowrap lg:tracking-[-0.055em]">- tareas manuales.</span>
                  <span className="block">- errores.</span>
                  <span className={salesAccentClass}>+ ventas.</span>
                </>
              )}
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-[15px] lg:mx-0">
              {isEn
                ? "We help businesses and SMEs save time, reduce errors, and increase sales through automation, custom software, bots, and smart integrations."
                : isPt
                  ? "Ajudamos empresas e PMEs a economizar tempo, reduzir erros e aumentar vendas por meio de automacoes, software sob medida, bots e integracoes inteligentes."
                  : "Ayudamos a negocios y PyMEs a ahorrar tiempo, reducir errores y aumentar ventas mediante automatizaciones, software a medida, bots e integraciones inteligentes."}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Button
                size="lg"
                className="contact-cta-shine h-12 rounded-full border px-8 text-base"
                onClick={() => setContactModalOpen(true)}
              >
                {isEn ? "Contact us" : isPt ? "Fale conosco" : "Contactanos"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-border bg-background/85 px-8 text-base text-foreground shadow-[0_10px_25px_rgba(148,163,184,0.2)] transition-transform hover:-translate-y-0.5 hover:border-foreground/35 hover:bg-foreground hover:text-background dark:bg-card/85 dark:hover:border-foreground/35 dark:hover:bg-foreground dark:hover:text-background"
              >
                <a href="#servicios">
                  <span>{isEn ? "Our services" : isPt ? "Nossos servicos" : "Nuestros servicios"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-[34rem]">
              <div className="dark-panel animate-hero-float rounded-2xl border border-border/70 bg-card p-3 text-left shadow-sm">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] border border-[#3BB3E8]/16 bg-[linear-gradient(180deg,rgba(59,179,232,0.12),rgba(38,38,220,0.05))] text-[#3BB3E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_18px_rgba(59,179,232,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_24px_rgba(2,8,23,0.24)]">
                  <Zap className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {isEn ? "Automation" : isPt ? "Automacao" : "Automatizacion"}
                </p>
              </div>

              <div className="dark-panel animate-hero-float-delayed rounded-2xl border border-border/70 bg-card p-3 text-left shadow-sm">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] border border-[#3BB3E8]/16 bg-[linear-gradient(180deg,rgba(59,179,232,0.12),rgba(38,38,220,0.05))] text-[#3BB3E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_18px_rgba(59,179,232,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_24px_rgba(2,8,23,0.24)]">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {isEn ? "Custom software" : isPt ? "Software sob medida" : "Software a medida"}
                </p>
              </div>

              <div className="dark-panel animate-hero-float rounded-2xl border border-border/70 bg-card p-3 text-left shadow-sm [animation-delay:0.9s]">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] border border-[#3BB3E8]/16 bg-[linear-gradient(180deg,rgba(59,179,232,0.12),rgba(38,38,220,0.05))] text-[#3BB3E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_18px_rgba(59,179,232,0.08)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_24px_rgba(2,8,23,0.24)]">
                  <Bot className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {isEn ? "Applied AI" : isPt ? "IA aplicada" : "IA aplicada"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[32.5rem] pt-3 lg:w-[520px] lg:max-w-[520px] lg:justify-self-end lg:pt-6">
            <div className="pointer-events-none absolute inset-x-6 inset-y-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(88,88,255,0.22),rgba(38,38,220,0.12)_42%,transparent_75%)] blur-3xl dark:bg-[radial-gradient(circle_at_50%_45%,rgba(112,112,255,0.32),rgba(59,179,232,0.12)_45%,transparent_78%)]" />
            <LandingChatPanel language={language} />
          </div>
        </div>
      </section>

      <ContactModal language={language} open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
