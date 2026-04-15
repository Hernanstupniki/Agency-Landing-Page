"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/landing/contact-modal"
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import type { Language } from "@/components/landing/language"

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
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur shadow-[0_10px_30px_rgba(148,163,184,0.12)] supports-[backdrop-filter]:bg-white/72 dark:border-white/10 dark:bg-[#050a14]/88 dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] supports-[backdrop-filter]:dark:bg-[#050a14]/72">
        <div className="relative mx-auto grid h-14 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-8 md:grid-cols-[1fr_auto_1fr]">
          <a href="/" className="ml-2 flex items-center gap-2 sm:ml-3 md:ml-4 md:justify-self-start" aria-label="Zubu Agency">
            <div className="relative h-[34px] w-[124px] sm:h-9 sm:w-[140px]">
              <Image
                src="/placeholder-logo.webp"
                alt="Zubu"
                fill
                priority
                sizes="(min-width: 640px) 148px, 132px"
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="/placeholder-logo-dark.webp"
                alt="Zubu"
                fill
                priority
                sizes="(min-width: 640px) 148px, 132px"
                className="hidden object-contain object-left dark:block"
              />
            </div>
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:border-[#3BB3E8]/40 dark:hover:bg-white/[0.08]"
              onClick={toggleTheme}
              aria-label={toggleThemeLabel}
              title={toggleThemeLabel}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="relative">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:border-[#3BB3E8]/40 dark:hover:bg-white/[0.08]"
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
                <div className="absolute right-0 top-11 z-50 w-40 rounded-md border border-border bg-background p-1 shadow-md dark:border-white/10 dark:bg-[#0b1220] dark:shadow-[0_20px_45px_rgba(0,0,0,0.38)]">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted hover:text-foreground"
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
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted hover:text-foreground"
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
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted hover:text-foreground"
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
              className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
              onClick={() => setContactModalOpen(true)}
            >
              {contactLabel}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="ml-auto flex items-center gap-1 md:hidden">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:border-[#3BB3E8]/40 dark:hover:bg-white/[0.08]"
              onClick={toggleTheme}
              aria-label={toggleThemeLabel}
              title={toggleThemeLabel}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground dark:hover:border-white/10 dark:hover:bg-white/[0.06]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? closeMenuLabel : openMenuLabel}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 bg-background dark:border-white/10 dark:bg-[#060d18] md:hidden">
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
                <div className="rounded-md border border-border p-2 dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{languageTitle}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
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
                      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
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
                      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
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
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
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

      <ContactModal language={language} open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
