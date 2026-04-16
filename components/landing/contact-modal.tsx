"use client"

import { useEffect } from "react"
import { ArrowUpRight, CalendarDays, MessageCircleMore, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmailOptions } from "@/components/landing/email-options"
import type { Language } from "@/components/landing/language"

const calendarBookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
  "https://calendar.app.google/1xH4S97J5b2vuiBR6"

type ContactModalProps = {
  language: Language
  open: boolean
  onClose: () => void
}

export function ContactModal({ language, open, onClose }: ContactModalProps) {
  const isEn = language === "en"
  const isPt = language === "pt"

  useEffect(() => {
    if (!open || typeof window === "undefined") {
      return
    }

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const title = isEn ? "Contact us" : isPt ? "Fale conosco" : "Contactanos"
  const body = isEn
    ? "Choose the channel you prefer and we will coordinate the next step."
    : isPt
      ? "Escolha o canal que preferir e alinhamos o proximo passo."
      : "Elegi el canal que prefieras y coordinamos el siguiente paso."
  const calendarLabel = isEn ? "Book a meeting" : isPt ? "Agendar reuniao" : "Agendar una reunion"
  const quickReplyLabel = isEn ? "Reply within 24h" : isPt ? "Respuesta em 24h" : "Respuesta en 24h"
  const closeLabel = isEn ? "Close" : isPt ? "Fechar" : "Cerrar"
  const whatsappMessage = isEn
    ? "https://wa.me/5493764502803?text=Hi%20ZUBU,%20I%20want%20to%20automate%20my%20business"
    : isPt
      ? "https://wa.me/5493764502803?text=Ola%20ZUBU,%20quero%20automatizar%20meu%20negocio"
      : "https://wa.me/5493764502803?text=Hola%20ZUBU,%20quiero%20automatizar%20mi%20negocio"

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        className="absolute inset-0 animate-contact-overlay bg-slate-950/52 backdrop-blur-[3px]"
        onClick={onClose}
        aria-label={closeLabel}
      />

      <div
        className="dark-panel-strong animate-contact-panel relative z-10 w-full max-w-[430px] overflow-hidden rounded-[30px] border border-border/70 bg-card text-card-foreground shadow-[0_34px_90px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(59,179,232,0.18),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(95,227,244,0.16),transparent_68%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(59,179,232,0.72),transparent)]" />

        <div className="relative p-6 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-[#3BB3E8]/18 bg-[#3BB3E8]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f7fac] dark:text-[#82daff]">
                {quickReplyLabel}
              </span>
              <h3 id="contact-modal-title" className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>

            <button
              type="button"
              className="rounded-full border border-border/80 bg-background/85 p-2 text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <Button
              asChild
              className="contact-action animate-contact-option h-14 w-full justify-between rounded-2xl bg-[#121826] px-5 text-base font-semibold text-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] hover:bg-[#0c1220] hover:text-white hover:shadow-[0_26px_52px_rgba(15,23,42,0.26)] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:hover:shadow-[0_26px_52px_rgba(2,8,23,0.36)]"
            >
              <a
                href={calendarBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                <span className="flex items-center gap-3">
                  <span className="contact-action-icon inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/14 dark:bg-slate-200">
                    <CalendarDays className="h-[18px] w-[18px]" />
                  </span>
                  {calendarLabel}
                </span>
                <ArrowUpRight className="contact-action-arrow h-4 w-4 opacity-80" />
              </a>
            </Button>

            <Button
              asChild
              className="contact-action animate-contact-option h-14 w-full justify-between rounded-2xl bg-[#25D366] px-5 text-base font-semibold text-white shadow-[0_18px_38px_rgba(37,211,102,0.24)] hover:bg-[#169c47] hover:text-white hover:shadow-[0_26px_52px_rgba(22,156,71,0.28)]"
            >
              <a
                href={whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                <span className="flex items-center gap-3">
                  <span className="contact-action-icon inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/16">
                    <MessageCircleMore className="h-[18px] w-[18px]" />
                  </span>
                  WhatsApp
                </span>
                <ArrowUpRight className="contact-action-arrow h-4 w-4 opacity-80" />
              </a>
            </Button>

            <div className="animate-contact-option">
              <EmailOptions language={language} onOptionSelected={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
