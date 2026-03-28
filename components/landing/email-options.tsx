"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
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
        className="w-full border-border text-foreground hover:bg-muted"
        onClick={() => setOpen((prev) => !prev)}
      >
        {isEn ? "Email" : isPt ? "E-mail" : "Mail"}
      </Button>

      {open && (
        <div className="mt-2 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-sm">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {isEn ? "Choose how to send" : isPt ? "Escolha como enviar" : "Elegi como enviar"}
          </p>

          <div className="space-y-1">
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              onClick={() => {
                onOptionSelected?.()
                setOpen(false)
              }}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#EA4335] text-xs font-bold text-white">
                G
              </span>
              Gmail
            </a>

            <a
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              onClick={() => {
                onOptionSelected?.()
                setOpen(false)
              }}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0078D4] text-xs font-bold text-white">
                O
              </span>
              Outlook
            </a>

            <a
              href={mailtoUrl}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              onClick={() => {
                onOptionSelected?.()
                setOpen(false)
              }}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/80 text-white">
                <Mail className="h-3.5 w-3.5" />
              </span>
              {isEn ? "Default email app" : isPt ? "Aplicativo de e-mail padrao" : "Correo predeterminado"}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
