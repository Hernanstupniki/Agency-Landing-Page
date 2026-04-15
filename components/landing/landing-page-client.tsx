"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import type { Language } from "@/components/landing/language"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { About, TeamSection } from "@/components/landing/about"
import { Services } from "@/components/landing/services"
import { TargetAudience } from "@/components/landing/target-audience"
import { Differentiator } from "@/components/landing/differentiator"
import { Benefits } from "@/components/landing/benefits"
import { Testimonials } from "@/components/landing/testimonials"
import { Faq } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

const LANGUAGE_STORAGE_KEY = "zubu-language"

gsap.registerPlugin(useGSAP)

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
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (media) => {
          const buttons = gsap.utils.toArray<HTMLElement>("[data-slot='button']")

          if (!buttons.length) {
            return
          }

          const { reduceMotion } = media.conditions as { reduceMotion: boolean }

          if (!reduceMotion) {
            gsap.from(buttons, {
              autoAlpha: 0,
              y: 10,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.04,
              clearProps: "opacity,visibility,transform",
            })
          }

          const handleEnter = contextSafe((event: Event) => {
            if (reduceMotion) {
              return
            }

            const target = event.currentTarget as HTMLElement
            gsap.to(target, {
              scale: 1.04,
              y: -1,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            })
          })

          const handleLeave = contextSafe((event: Event) => {
            const target = event.currentTarget as HTMLElement
            gsap.to(target, {
              scale: 1,
              y: 0,
              duration: reduceMotion ? 0 : 0.2,
              ease: "power2.out",
              overwrite: "auto",
            })
          })

          const handlePress = contextSafe((event: Event) => {
            if (reduceMotion) {
              return
            }

            const target = event.currentTarget as HTMLElement
            gsap.to(target, {
              scale: 0.98,
              y: 0,
              duration: 0.12,
              ease: "power1.out",
              overwrite: "auto",
            })
          })

          const handleRelease = contextSafe((event: Event) => {
            if (reduceMotion) {
              return
            }

            const target = event.currentTarget as HTMLElement
            gsap.to(target, {
              scale: 1.04,
              y: -1,
              duration: 0.12,
              ease: "power2.out",
              overwrite: "auto",
            })
          })

          for (const button of buttons) {
            button.style.willChange = "transform"
            button.addEventListener("pointerenter", handleEnter)
            button.addEventListener("pointerleave", handleLeave)
            button.addEventListener("focus", handleEnter)
            button.addEventListener("blur", handleLeave)
            button.addEventListener("pointerdown", handlePress)
            button.addEventListener("pointerup", handleRelease)
            button.addEventListener("pointercancel", handleLeave)
          }

          return () => {
            for (const button of buttons) {
              button.removeEventListener("pointerenter", handleEnter)
              button.removeEventListener("pointerleave", handleLeave)
              button.removeEventListener("focus", handleEnter)
              button.removeEventListener("blur", handleLeave)
              button.removeEventListener("pointerdown", handlePress)
              button.removeEventListener("pointerup", handleRelease)
              button.removeEventListener("pointercancel", handleLeave)
              button.style.willChange = ""
            }
          }
        },
      )

      return () => {
        mm.revert()
      }
    },
    { scope: containerRef },
  )

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let animationFrameId = 0

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)

    const animateScrollTo = (targetY: number) => {
      cancelAnimationFrame(animationFrameId)

      const startY = window.scrollY
      const distance = targetY - startY

      if (Math.abs(distance) < 2) {
        window.scrollTo(0, targetY)
        return
      }

      const duration = 420
      const startTime = performance.now()

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        window.scrollTo(0, startY + distance * easedProgress)

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step)
        }
      }

      animationFrameId = window.requestAnimationFrame(step)
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target as HTMLElement | null
      const anchor = target?.closest("a[href^='#']") as HTMLAnchorElement | null

      if (!anchor) {
        return
      }

      const hash = anchor.getAttribute("href")

      if (!hash || hash === "#") {
        return
      }

      const destination = document.querySelector(hash) as HTMLElement | null

      if (!destination) {
        return
      }

      event.preventDefault()

      const headerOffset = 76
      const destinationTop = destination.getBoundingClientRect().top + window.scrollY - headerOffset

      if (reduceMotionQuery.matches) {
        window.scrollTo(0, destinationTop)
      } else {
        animateScrollTo(destinationTop)
      }

      if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash)
      }
    }

    document.addEventListener("click", handleDocumentClick)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    }
  }

  return (
    <div ref={containerRef}>
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
        <TeamSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}
