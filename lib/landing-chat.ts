import type { Language } from "@/components/landing/language"

export const LANDING_CHAT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LANDING_CHAT_WEBHOOK_URL?.trim() ||
  "https://n8n.zubuagency.com/webhook/landing-chat"

export const LANDING_CHAT_SOURCE = "landing"
export const LANDING_CHAT_HISTORY_KEY = "zubu-landing-chat-history"
export const LANDING_CHAT_SESSION_KEY = "zubu-landing-chat-session-id"
export const LANDING_CHAT_WELCOME_MESSAGE = "Hola, en que puedo ayudarte?"

export const landingChatCopy: Record<
  Language,
  {
    title: string
    subtitle: string
    online: string
    welcome: string
    typing: string
    placeholder: string
    submitLabel: string
    inputLabel: string
    footer: string
    genericError: string
    invalidResponse: string
  }
> = {
  es: {
    title: "Chat ZUBU",
    subtitle: "Proba el asistente de ZUBU",
    online: "En linea",
    welcome: "Hola, en que puedo ayudarte?",
    typing: "Escribiendo...",
    placeholder: "Escribi tu mensaje",
    submitLabel: "Enviar mensaje",
    inputLabel: "Mensaje",
    footer: "Presiona Enter para enviar. La conversacion se reinicia al volver a entrar.",
    genericError: "No pude responder en este momento. Proba de nuevo.",
    invalidResponse: "No pude interpretar la respuesta del chat. Proba de nuevo.",
  },
  en: {
    title: "ZUBU Chat",
    subtitle: "Try the ZUBU assistant",
    online: "Online",
    welcome: "Hi, how can I help you?",
    typing: "Typing...",
    placeholder: "Write your message",
    submitLabel: "Send message",
    inputLabel: "Message",
    footer: "Press Enter to send. The conversation resets when you come back.",
    genericError: "I couldn't reply right now. Please try again.",
    invalidResponse: "I couldn't understand the chat response. Please try again.",
  },
  pt: {
    title: "Chat ZUBU",
    subtitle: "Teste o assistente da ZUBU",
    online: "Online",
    welcome: "Ola, como posso ajudar?",
    typing: "Digitando...",
    placeholder: "Escreva sua mensagem",
    submitLabel: "Enviar mensagem",
    inputLabel: "Mensagem",
    footer: "Pressione Enter para enviar. A conversa reinicia ao voltar.",
    genericError: "Nao consegui responder agora. Tente novamente.",
    invalidResponse: "Nao consegui interpretar a resposta do chat. Tente novamente.",
  },
}

export function getLandingChatCopy(language: Language) {
  return landingChatCopy[language] ?? landingChatCopy.es
}

export type LandingChatRole = "bot" | "user"

export type LandingChatMessage = {
  id: string
  role: LandingChatRole
  text: string
  timestamp: string
  error?: boolean
}

type LandingChatResponse = {
  ok?: boolean
  reply?: unknown
  message?: unknown
  output?: unknown
  sessionId?: unknown
}

export function normalizeLandingChatText(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

export function createLandingChatSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `landing-${crypto.randomUUID()}`
  }

  return `landing-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export async function requestLandingChatReply(input: {
  message: string
  sessionId: string
  language: Language
}) {
  const copy = getLandingChatCopy(input.language)
  const response = await fetch(LANDING_CHAT_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: input.message,
      sessionId: input.sessionId,
      source: LANDING_CHAT_SOURCE,
      timestamp: new Date().toISOString(),
      language: input.language,
    }),
  })

  let payload: LandingChatResponse | null = null

  try {
    payload = (await response.json()) as LandingChatResponse
  } catch {
    payload = null
  }

  const reply =
    typeof payload?.reply === "string"
      ? payload.reply
      : typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.output === "string"
          ? payload.output
          : null

  if (!response.ok && reply) {
    throw new Error(reply)
  }

  if (!response.ok) {
    throw new Error(copy.genericError)
  }

  if (!reply) {
    throw new Error(copy.invalidResponse)
  }

  return {
    ok: payload?.ok !== false,
    reply,
    sessionId:
      typeof payload?.sessionId === "string" && payload.sessionId.trim()
        ? payload.sessionId
        : input.sessionId,
  }
}
