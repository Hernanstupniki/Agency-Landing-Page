"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#para-quien", label: "Para Quién" },
  { href: "#testimonios", label: "Testimonios" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-8 md:grid-cols-[1fr_auto_1fr]">
        <a href="/" className="flex items-center gap-2 md:justify-self-start">
          <span className="text-xl font-bold tracking-tight text-foreground">KORA</span>
          <span className="text-sm font-medium text-muted-foreground">Agency</span>
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

        <div className="hidden items-center gap-3 md:flex md:justify-self-end">
          <Button asChild size="sm">
            <a href="#contacto">Solicitar diagnóstico</a>
          </Button>
          <Button asChild size="sm" className="bg-[#25D366] text-white hover:bg-[#1ebe5b]">
            <a href="https://wa.me/5493764502803?text=Hola%20KORA,%20quiero%20automatizar%20mi%20negocio" target="_blank" rel="noopener noreferrer">Contactanos</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
              <Button asChild className="w-full">
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                  Solicitar diagnóstico
                </a>
              </Button>
              <Button asChild className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                <a
                  href="https://wa.me/5493764502803?text=Hola%20KORA,%20quiero%20automatizar%20mi%20negocio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contactanos
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
