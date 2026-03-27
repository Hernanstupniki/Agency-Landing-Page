"use client"

import { useEffect, useState } from "react"
import type { Language } from "@/components/landing/language"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Services } from "@/components/landing/services"
import { TargetAudience } from "@/components/landing/target-audience"
import { Differentiator } from "@/components/landing/differentiator"
import { Benefits } from "@/components/landing/benefits"
import { Testimonials } from "@/components/landing/testimonials"
import { Faq } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

const LANGUAGE_STORAGE_KEY = "zubu-language"

function isSupportedLanguage(value: string): value is Language {
  return value === "es" || value === "en" || value === "pt"
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "es"
  }

  const preferred = [...(navigator.languages ?? []), navigator.language]

  for (const lang of preferred) {
    const normalized = lang.toLowerCase()

    if (normalized.startsWith("pt")) {
      return "pt"
    }

    if (normalized.startsWith("en")) {
      return "en"
    }

    if (normalized.startsWith("es")) {
      return "es"
    }
  }

  return "es"
}

export function LandingPageClient() {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (stored && isSupportedLanguage(stored)) {
      setLanguage(stored)
      return
    }

    setLanguage(detectBrowserLanguage())
  }, [])

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    }
  }

  return (
    <>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Services language={language} />
        <TargetAudience language={language} />
        <Differentiator language={language} />
        <Benefits language={language} />
        <Testimonials language={language} />
        <Faq language={language} />
        <CTA language={language} />
      </main>
      <Footer language={language} />
    </>
  )
}
