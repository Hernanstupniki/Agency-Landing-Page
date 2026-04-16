export const LANDING_CHAT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LANDING_CHAT_WEBHOOK_URL?.trim() ||
  "https://n8n.zubuagency.com/webhook/landing-chat"

export const LANDING_CHAT_SOURCE = "landing"
export const LANDING_CHAT_HISTORY_KEY = "zubu-landing-chat-history"
export const LANDING_CHAT_SESSION_KEY = "zubu-landing-chat-session-id"
export const LANDING_CHAT_WELCOME_MESSAGE = "Hola, ¿en qué puedo ayudarte?"

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
}) {
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
    throw new Error("No pude responder en este momento. Probá de nuevo.")
  }

  if (!reply) {
    throw new Error("No pude interpretar la respuesta del chat. Probá de nuevo.")
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
