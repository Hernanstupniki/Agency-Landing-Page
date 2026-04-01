"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EmailOptions } from "@/components/landing/email-options"
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import type { Language } from "@/components/landing/language"

const calendarBookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ??
  "https://calendar.app.google/1xH4S97J5b2vuiBR6"

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isEn = language === "en"
  const isPt = language === "pt"
  const isDarkMode = mounted && resolvedTheme === "dark"

  const navLinks = [
    { href: "#servicios", label: isEn ? "Services" : isPt ? "Serviços" : "Servicios" },
    { href: "#nosotros", label: isEn ? "About" : isPt ? "Sobre nós" : "Nosotros" },
    { href: "#para-quien", label: isEn ? "Who It Is For" : isPt ? "Para quem é" : "Para Quién" },
    { href: "#testimonios", label: isEn ? "Testimonials" : isPt ? "Depoimentos" : "Testimonios" },
    { href: "#faq", label: "FAQ" },
  ]

  const languageLabel = isEn ? "English" : isPt ? "Português" : "Español"
  const contactLabel = isEn ? "Contact us" : isPt ? "Fale conosco" : "Contactanos"
  const openMenuLabel = isEn ? "Open menu" : isPt ? "Abrir menu" : "Abrir menú"
  const closeMenuLabel = isEn ? "Close menu" : isPt ? "Fechar menu" : "Cerrar menú"
  const selectLanguageLabel = isEn ? "Select language" : isPt ? "Selecionar idioma" : "Seleccionar idioma"
  const toggleThemeLabel = isDarkMode
    ? isEn
      ? "Switch to light mode"
      : isPt
        ? "Mudar para modo claro"
        : "Cambiar a modo claro"
    : isEn
      ? "Switch to dark mode"
      : isPt
        ? "Mudar para modo escuro"
        : "Cambiar a modo oscuro"
  const languageTitle = isEn ? "Language" : isPt ? "Idioma" : "Idioma"
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

  const FlagEs = () => (
    <svg className="h-3.5 w-5 rounded-sm" viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  )

  const FlagUs = () => (
    <svg className="h-3.5 w-5 rounded-sm" viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#FFFFFF" />
      <rect width="24" height="2" y="0" fill="#B22234" />
      <rect width="24" height="2" y="4" fill="#B22234" />
      <rect width="24" height="2" y="8" fill="#B22234" />
      <rect width="24" height="2" y="12" fill="#B22234" />
      <rect width="10.5" height="8.5" fill="#3C3B6E" />
    </svg>
  )

  const FlagBr = () => (
    <svg className="h-3.5 w-5 rounded-sm" viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#009C3B" />
      <polygon points="12,2 21,8 12,14 3,8" fill="#FFDF00" />
      <circle cx="12" cy="8" r="3" fill="#002776" />
    </svg>
  )

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative mx-auto grid h-14 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-8 md:grid-cols-[1fr_auto_1fr]">
          <a href="/" className="ml-2 flex items-center gap-2 sm:ml-3 md:ml-4 md:justify-self-start" aria-label="Zubu Agency">
            <Image
              src="/placeholder-logo.png"
              alt="Zubu"
              width={180}
              height={64}
              priority
              className="h-5 w-auto dark:hidden sm:h-6"
            />
            <Image
              src="/placeholder-logo-dark.png"
              alt="Zubu"
              width={180}
              height={64}
              priority
              className="hidden h-5 w-auto dark:block sm:h-6"
            />
            <span className="translate-y-[1px] text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">Agency</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex md:-translate-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex md:justify-self-end">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              onClick={toggleTheme}
              aria-label={toggleThemeLabel}
              title={toggleThemeLabel}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="relative">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
                aria-label={selectLanguageLabel}
              >
                {language === "es" ? <FlagEs /> : language === "en" ? <FlagUs /> : <FlagBr />}
                <span>{languageLabel}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 top-11 z-50 w-40 rounded-md border border-border bg-background p-1 shadow-md">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      onLanguageChange("es")
                      setLanguageMenuOpen(false)
                    }}
                  >
                    <FlagEs />
                    Español
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      onLanguageChange("en")
                      setLanguageMenuOpen(false)
                    }}
                  >
                    <FlagUs />
                    English
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted"
                    onClick={() => {
                      onLanguageChange("pt")
                      setLanguageMenuOpen(false)
                    }}
                  >
                    <FlagBr />
                    Português
                  </button>
                </div>
              )}
            </div>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setContactModalOpen(true)}
            >
              {contactLabel}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="ml-auto flex items-center gap-1 md:hidden">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
              onClick={toggleTheme}
              aria-label={toggleThemeLabel}
              title={toggleThemeLabel}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? closeMenuLabel : openMenuLabel}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 bg-background md:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 space-y-2">
                <div className="rounded-md border border-border p-2">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{languageTitle}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm ${
                        language === "es"
                          ? "border-foreground bg-muted text-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                      onClick={() => onLanguageChange("es")}
                    >
                      <FlagEs />
                      ES
                    </button>
                    <button
                      type="button"
                      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm ${
                        language === "en"
                          ? "border-foreground bg-muted text-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                      onClick={() => onLanguageChange("en")}
                    >
                      <FlagUs />
                      EN
                    </button>
                    <button
                      type="button"
                      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm ${
                        language === "pt"
                          ? "border-foreground bg-muted text-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                      onClick={() => onLanguageChange("pt")}
                    >
                      <FlagBr />
                      PT
                    </button>
                  </div>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setContactModalOpen(true)
                  }}
                >
                  {contactLabel}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

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
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <a
                  href={calendarBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactModalOpen(false)}
                >
                  {calendarLabel}
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
