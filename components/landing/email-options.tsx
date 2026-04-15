"use client"

import { useState } from "react"
import { ChevronDown, Mail, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/components/landing/language"

type EmailOptionsProps = {
  language: Language
  onOptionSelected?: () => void
}

export function EmailOptions({ language, onOptionSelected }: EmailOptionsProps) {
  const [open, setOpen] = useState(false)
  const isEn = language === "en"
  const isPt = language === "pt"

  const subject = isEn ? "Website inquiry" : isPt ? "Consulta pelo site" : "Consulta desde la web"
  const body = isEn
    ? "Hi ZUBU, I want to automate my business."
    : isPt
      ? "Ola ZUBU, quero automatizar meu negocio."
      : "Hola ZUBU, quiero automatizar mi negocio."

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=agencyzubu@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=agencyzubu@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const mailtoUrl = `mailto:agencyzubu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        className="h-14 w-full justify-between rounded-2xl border-border/70 bg-background/88 px-5 text-base font-semibold text-foreground shadow-[0_10px_24px_rgba(148,163,184,0.12)] hover:border-foreground/18 hover:bg-foreground/4 hover:text-foreground dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#3BB3E8]/12 text-[#3BB3E8]">
            <Mail className="h-[18px] w-[18px]" />
          </span>
          {isEn ? "Email" : isPt ? "E-mail" : "Mail"}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      {open && (
        <div className="animate-contact-reveal mt-2 rounded-2xl border border-border/70 bg-popover/95 p-2 text-popover-foreground shadow-[0_16px_34px_rgba(15,23,42,0.12)] dark:bg-[#0b1220]/96">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {isEn ? "Choose how to send" : isPt ? "Escolha como enviar" : "Elegi como enviar"}
          </p>

          <div className="space-y-1.5">
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition-colors hover:bg-muted/80 dark:hover:bg-white/[0.06]"
              onClick={() => {
                onOptionSelected?.()
                setOpen(false)
              }}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EA4335] text-xs font-bold text-white">
                  G
                </span>
                Gmail
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>

            <a
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition-colors hover:bg-muted/80 dark:hover:bg-white/[0.06]"
              onClick={() => {
                onOptionSelected?.()
                setOpen(false)
              }}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0078D4] text-xs font-bold text-white">
                  O
                </span>
                Outlook
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>

            <a
              href={mailtoUrl}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition-colors hover:bg-muted/80 dark:hover:bg-white/[0.06]"
              onClick={() => {
                onOptionSelected?.()
                setOpen(false)
              }}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/80 text-white dark:bg-white dark:text-slate-950">
                  <Mail className="h-4 w-4" />
                </span>
                {isEn ? "Default email app" : isPt ? "Aplicativo de e-mail padrao" : "Correo predeterminado"}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
