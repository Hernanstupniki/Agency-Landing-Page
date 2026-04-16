"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { AlertCircle, MessageCircleMore, SendHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import {
  createLandingChatSessionId,
  LANDING_CHAT_HISTORY_KEY,
  LANDING_CHAT_SESSION_KEY,
  LANDING_CHAT_WELCOME_MESSAGE,
  type LandingChatMessage,
  normalizeLandingChatText,
  requestLandingChatReply,
} from "@/lib/landing-chat"

const CHAT_PANEL_ID = "landing-floating-chat-panel"

function createChatMessage(
  role: LandingChatMessage["role"],
  text: string,
  options?: { error?: boolean },
): LandingChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    text,
    timestamp: new Date().toISOString(),
    error: options?.error,
  }
}

function getInitialMessages() {
  return [createChatMessage("bot", LANDING_CHAT_WELCOME_MESSAGE)]
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<LandingChatMessage[]>(() => getInitialMessages())
  const [sessionId, setSessionId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const storedSessionId = window.localStorage.getItem(LANDING_CHAT_SESSION_KEY)
    const nextSessionId = storedSessionId || createLandingChatSessionId()

    if (!storedSessionId) {
      window.localStorage.setItem(LANDING_CHAT_SESSION_KEY, nextSessionId)
    }

    setSessionId(nextSessionId)

    const storedHistory = window.localStorage.getItem(LANDING_CHAT_HISTORY_KEY)

    if (!storedHistory) {
      setMessages(getInitialMessages())
      return
    }

    try {
      const parsed = JSON.parse(storedHistory) as LandingChatMessage[]

      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(
          parsed.filter(
            (message) =>
              typeof message?.id === "string" &&
              (message?.role === "bot" || message?.role === "user") &&
              typeof message?.text === "string" &&
              typeof message?.timestamp === "string",
          ),
        )
        return
      }
    } catch {
      window.localStorage.removeItem(LANDING_CHAT_HISTORY_KEY)
    }

    setMessages(getInitialMessages())
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || messages.length === 0) {
      return
    }

    window.localStorage.setItem(LANDING_CHAT_HISTORY_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const container = bodyRef.current

    if (!container) {
      return
    }

    container.scrollTop = container.scrollHeight
  }, [messages, isOpen, isSending])

  useEffect(() => {
    if (!isOpen || !inputRef.current) {
      return
    }

    inputRef.current.focus()
  }, [isOpen])

  const submitMessage = async () => {
    const normalized = normalizeLandingChatText(draft)

    if (!normalized || isSending || !sessionId) {
      return
    }

    const userMessage = createChatMessage("user", normalized)

    setDraft("")
    setErrorMessage("")
    setIsSending(true)
    setMessages((current) => [...current, userMessage])

    try {
      const result = await requestLandingChatReply({
        message: normalized,
        sessionId,
      })

      if (result.sessionId !== sessionId) {
        setSessionId(result.sessionId)

        if (typeof window !== "undefined") {
          window.localStorage.setItem(LANDING_CHAT_SESSION_KEY, result.sessionId)
        }
      }

      setMessages((current) => [...current, createChatMessage("bot", result.reply)])
    } catch (error) {
      const friendlyMessage =
        error instanceof Error && error.message
          ? error.message
          : "No pude responder en este momento. Probá de nuevo."

      setErrorMessage(friendlyMessage)
      setMessages((current) => [
        ...current,
        createChatMessage("bot", friendlyMessage, { error: true }),
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submitMessage()
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()
    await submitMessage()
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex justify-end sm:inset-x-6 sm:bottom-6">
      <div className="pointer-events-auto flex w-full max-w-[24rem] flex-col items-end gap-3">
        {isOpen ? (
          <section
            id={CHAT_PANEL_ID}
            aria-label="Chat de la landing"
            className="dark-panel-strong flex h-[min(34rem,calc(100vh-7.5rem))] w-full flex-col overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/95 shadow-[0_28px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#08111de8]"
          >
            <header className="flex items-center justify-between gap-3 border-b border-border/60 bg-[linear-gradient(135deg,rgba(95,227,244,0.22),rgba(59,179,232,0.08)_42%,rgba(38,38,220,0.12)_100%)] px-4 py-4 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(59,179,232,0.22),rgba(12,20,36,0.32)_45%,rgba(38,38,220,0.22)_100%)]">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Chat ZUBU</p>
                <p className="text-xs text-muted-foreground">
                  Respuesta conectada con n8n en producción
                </p>
              </div>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="rounded-full"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                <X />
              </Button>
            </header>

            <div
              ref={bodyRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => {
                const isUser = message.role === "user"

                return (
                  <div
                    key={message.id}
                    className={cn("flex", isUser ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                        isUser
                          ? "rounded-br-md bg-[linear-gradient(135deg,#5858ff_0%,#2626dc_55%,#1f1fae_100%)] text-white shadow-[0_14px_34px_rgba(38,38,220,0.28)]"
                          : message.error
                            ? "rounded-bl-md border border-red-200/80 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/12 dark:text-red-100"
                            : "rounded-bl-md border border-white/70 bg-white/90 text-foreground dark:border-white/10 dark:bg-white/6",
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.text}</p>
                    </div>
                  </div>
                )
              })}

              {isSending ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-3xl rounded-bl-md border border-white/70 bg-white/90 px-4 py-3 text-sm text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/6">
                    <Spinner className="size-4" />
                    <span>Escribiendo...</span>
                  </div>
                </div>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-border/60 bg-background/75 px-4 py-4 dark:border-white/10 dark:bg-[#07101a]/90"
            >
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribí tu mensaje"
                  disabled={isSending}
                  maxLength={1000}
                  aria-label="Mensaje"
                  className="h-11 rounded-full border-white/70 bg-white/90 pr-4 shadow-[0_10px_26px_rgba(148,163,184,0.14)] dark:border-white/10 dark:bg-white/6"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="contact-cta-shine size-11 rounded-full"
                  disabled={isSending || normalizeLandingChatText(draft).length === 0}
                  aria-label="Enviar mensaje"
                >
                  {isSending ? <Spinner className="size-4" /> : <SendHorizontal />}
                </Button>
              </div>

              {errorMessage ? (
                <div className="mt-3 flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  Presioná Enter para enviar. El historial queda guardado en este navegador.
                </p>
              )}
            </form>
          </section>
        ) : null}

        <Button
          type="button"
          size="icon-lg"
          className="contact-cta-shine size-14 rounded-full shadow-[0_18px_40px_rgba(38,38,220,0.36)]"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls={CHAT_PANEL_ID}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <X className="size-5" /> : <MessageCircleMore className="size-5" />}
        </Button>
      </div>
    </div>
  )
}
