"use client"

import { Fragment, FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react"
import { AlertCircle, SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import type { Language } from "@/components/landing/language"
import { cn } from "@/lib/utils"
import {
  createLandingChatSessionId,
  getLandingChatCopy,
  type LandingChatMessage,
  normalizeLandingChatText,
  requestLandingChatReply,
} from "@/lib/landing-chat"

const URL_PATTERN = /(https?:\/\/[^\s<>"')\]]+)/gi
const CONTACT_LINK_PATTERN =
  /\b(Instagram|WhatsApp(?:\s+directo|\s+direto)?|Direct WhatsApp|Contacto(?:\s+directo)?|Contact(?:\s+channel)?|Email|Correo|Mail)\s*:\s*(https?:\/\/[^\s<>"')\]]+)/gi

function toSafeHref(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString()
    }

    return null
  } catch {
    return null
  }
}

function formatBotContactLayout(text: string) {
  const normalized = text.replace(/\r\n?/g, "\n").trim()
  const matches = Array.from(normalized.matchAll(CONTACT_LINK_PATTERN))

  if (!matches.length) {
    return normalized
  }

  const firstMatch = matches[0]
  const lastMatch = matches[matches.length - 1]
  const firstIndex = firstMatch.index ?? 0
  const lastIndex = lastMatch.index ?? 0
  const lastEnd = lastIndex + lastMatch[0].length
  const prefix = normalized.slice(0, firstIndex).trim()
  const suffix = normalized.slice(lastEnd).trim()
  const contactLines = matches.map((match) => `${match[1]}: ${match[2]}`)

  if (matches.length >= 2) {
    return [prefix, contactLines.join("\n"), suffix].filter(Boolean).join("\n")
  }

  const label = firstMatch[1]
  const url = firstMatch[2]

  if (!prefix && !suffix) {
    return `${label}: ${url}`
  }

  if (/[.!?:]$/.test(prefix)) {
    return [prefix, `${label}: ${url}`, suffix].filter(Boolean).join("\n")
  }

  if (/\b(te dejo|te paso|te comparto|here is|here are|i can send|te deixo|te passo)\b/i.test(prefix)) {
    return [`${prefix} ${label}:`.trim(), url, suffix].filter(Boolean).join("\n")
  }

  return [prefix, `${label}: ${url}`, suffix].filter(Boolean).join("\n")
}

function renderLineWithLinks(line: string, keyPrefix: string): ReactNode[] {
  const pieces: ReactNode[] = []
  let cursor = 0

  for (const match of line.matchAll(URL_PATTERN)) {
    const url = match[0]
    const matchIndex = match.index ?? 0

    if (matchIndex > cursor) {
      pieces.push(line.slice(cursor, matchIndex))
    }

    const href = toSafeHref(url)

    if (href) {
      pieces.push(
        <a
          key={`${keyPrefix}-url-${matchIndex}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          {url}
        </a>,
      )
    } else {
      pieces.push(url)
    }

    cursor = matchIndex + url.length
  }

  if (cursor < line.length) {
    pieces.push(line.slice(cursor))
  }

  return pieces.length ? pieces : [line]
}

function renderBotMessage(text: string) {
  const formattedText = formatBotContactLayout(text)
  const lines = formattedText.split("\n")

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={`line-${index}`}>
          {renderLineWithLinks(line, `line-${index}`)}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  )
}

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

function getInitialMessages(language: Language) {
  return [createChatMessage("bot", getLandingChatCopy(language).welcome)]
}

export function LandingChatPanel({
  className,
  language,
}: {
  className?: string
  language: Language
}) {
  const copy = getLandingChatCopy(language)
  const [draft, setDraft] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<LandingChatMessage[]>(() => getInitialMessages(language))
  const [sessionId, setSessionId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const conversationVersionRef = useRef(0)

  useEffect(() => {
    setSessionId(createLandingChatSessionId())
    setMessages(getInitialMessages(language))
    setDraft("")
    setErrorMessage("")
    setIsSending(false)
    conversationVersionRef.current += 1
  }, [language])

  useEffect(() => {
    const container = bodyRef.current

    if (!container) {
      return
    }

    container.scrollTop = container.scrollHeight
  }, [messages, isSending])

  const submitMessage = async () => {
    const normalized = normalizeLandingChatText(draft)

    if (!normalized || isSending || !sessionId) {
      return
    }

    const activeConversationVersion = conversationVersionRef.current
    const userMessage = createChatMessage("user", normalized)

    setDraft("")
    setErrorMessage("")
    setIsSending(true)
    setMessages((current) => [...current, userMessage])

    try {
      const result = await requestLandingChatReply({
        message: normalized,
        sessionId,
        language,
      })

      if (activeConversationVersion !== conversationVersionRef.current) {
        return
      }

      if (result.sessionId !== sessionId) {
        setSessionId(result.sessionId)
      }

      setMessages((current) => [...current, createChatMessage("bot", result.reply)])
    } catch (error) {
      const friendlyMessage =
        error instanceof Error && error.message
          ? error.message
          : copy.genericError

      if (activeConversationVersion !== conversationVersionRef.current) {
        return
      }

      setErrorMessage(friendlyMessage)
      setMessages((current) => [
        ...current,
        createChatMessage("bot", friendlyMessage, { error: true }),
      ])
    } finally {
      if (activeConversationVersion === conversationVersionRef.current) {
        setIsSending(false)
      }
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
    <section
      aria-label="Chat de la landing"
      className={cn(
        "dark-panel-strong relative flex h-[480px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/95 shadow-[0_24px_72px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(10,18,34,0.98)_0%,rgba(7,13,26,0.99)_100%)]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border/70 bg-white px-4 py-3 text-foreground dark:border-white/10 dark:bg-[#0b1220] dark:text-white">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground dark:text-white">{copy.title}</p>
          <p className="text-xs text-muted-foreground dark:text-white/60">{copy.subtitle}</p>
        </div>
        <div className="animate-chat-badge flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground dark:border-white/10 dark:bg-white/6 dark:text-white/75">
          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)] dark:bg-emerald-400 dark:shadow-[0_0_0_4px_rgba(52,211,153,0.14)]" />
          <span>{copy.online}</span>
        </div>
      </header>

      <div
        ref={bodyRef}
        className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,255,0.96)_100%)] px-4 py-4 dark:bg-[linear-gradient(180deg,rgba(11,18,32,0.94)_0%,rgba(8,14,26,0.98)_100%)]"
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
                  "max-w-[82%] rounded-3xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                  isUser
                    ? "rounded-br-md bg-[linear-gradient(135deg,#5858ff_0%,#2626dc_55%,#1f1fae_100%)] text-white shadow-[0_14px_34px_rgba(38,38,220,0.28)]"
                    : message.error
                      ? "rounded-bl-md border border-red-200/80 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/12 dark:text-red-100"
                      : "rounded-bl-md border border-white/70 bg-white/90 text-foreground dark:border-white/10 dark:bg-white/6",
                )}
              >
                <p className="whitespace-pre-wrap break-words">
                  {isUser ? message.text : renderBotMessage(message.text)}
                </p>
              </div>
            </div>
          )
        })}

        {isSending ? (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-3xl rounded-bl-md border border-white/70 bg-white/90 px-3.5 py-2.5 text-[13px] text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/6">
              <Spinner className="size-4" />
              <span>{copy.typing}</span>
            </div>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#0b1220]"
      >
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={copy.placeholder}
            disabled={isSending}
            maxLength={1000}
            aria-label={copy.inputLabel}
            className="h-11 rounded-full border-white/70 bg-white/90 pr-4 shadow-[0_10px_26px_rgba(148,163,184,0.14)] dark:border-white/10 dark:bg-white/6"
          />
          <Button
            type="submit"
            size="icon"
            className="contact-cta-shine size-11 rounded-full"
            disabled={isSending || normalizeLandingChatText(draft).length === 0}
            aria-label={copy.submitLabel}
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
          <p className="mt-3 text-xs text-muted-foreground dark:text-white/55">
            {copy.footer}
          </p>
        )}
      </form>
    </section>
  )
}
