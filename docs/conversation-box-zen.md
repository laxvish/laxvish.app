# Conversation Box backend (OpenCode Zen)

The Conversation Box (`components/ui/ConversationalBox.tsx`) is powered by our
own `POST /api/conversation` route, which proxies to OpenCode Zen over the
OpenAI-compatible Chat Completions API.

- Upstream: `POST https://opencode.ai/zen/v1/chat/completions`
- Headers: `Content-Type: application/json` + `User-Agent: Laxvish/1.0`
- Authentication is intentionally NOT configured. There is no Zen/OpenCode API
  key in `.env*`, source, deployment config, or frontend code. Never add one,
  and never send an `Authorization` header from `lib/conversation/zen.ts`.
- Model (server-side constant `ZEN_MODEL`): `nemotron-3.5-lightning-free`,
  the verified free model. The browser cannot select or override it.
- Never introduce paid fallback behavior. If the free model is unavailable,
  the route returns `{ "error": "AI_TEMPORARILY_UNAVAILABLE" }` and the UI
  shows the calm unavailable message.
- Non-streaming (`stream: false`, `max_tokens: 800`). Server prepends the
  Laxvish system prompt; the client sends only recent `{role, content}`
  history (validated: user/assistant only, <= 20 messages, <= 2000 chars each,
  <= 12000 total). No conversation is stored; logs carry metadata only.
