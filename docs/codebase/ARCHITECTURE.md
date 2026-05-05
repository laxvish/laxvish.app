# Architecture

## Architectural Style

- **Primary style:** Layered with server-first composition
- **Why:** Next.js App Router enforces a server-component-by-default model. Pages are server-rendered with minimal client-side interactivity islands. A `lib/` layer encapsulates all business logic (validation, DB access, security), keeping `app/` routes thin and `components/` presentation-focused.
- **Primary constraints:** (1) No backend orchestration or agent runtime in website scope, (2) Client components only where interactivity is required, (3) In-memory fallback when DATABASE_URL is unset.

## System Flow

```text
Browser request -> next.config.ts (security headers) -> app/layout.tsx (fonts, SEO JSON-LD) -> app/page.tsx (server component) -> lib/seo.ts (metadata builder) -> components/sections/* (client/server components) -> lib/enterpriseVault.ts (form submission) -> Prisma/PostgreSQL or in-memory fallback
```

## Layer/Module Responsibilities

| Layer or module | Owns | Must not own | Evidence |
|-----------------|------|--------------|----------|
| `app/` (pages) | Route composition, metadata export | Business logic, DB access | `app/page.tsx` |
| `app/api/*` | Request handling, rate limiting, routing | Complex domain logic | `app/api/lead-capture/route.ts` |
| `components/` | UI rendering, interactivity, animations | Data fetching (beyond props) | `components/sections/Hero.tsx` |
| `lib/enterpriseVault.ts` | Lead validation, record building, persistence | HTTP handling, routing | `lib/enterpriseVault.ts` |
| `lib/leadSync.ts` | Webhook sync, DB upsert logic | UI code | `lib/leadSync.ts` |
| `lib/security.ts` | Timing-safe token comparison | Business domain logic | `lib/security.ts` |
| `lib/prisma.ts` | Prisma singleton, DB adapter | Schema definitions | `lib/prisma.ts` |

## Reused Patterns

| Pattern | Where found | Why it exists |
|---------|-------------|---------------|
| Singleton | `lib/prisma.ts` (globalThis.prismaClient) | Prevent multiple Prisma clients in dev hot-reload |
| In-memory fallback | `lib/enterpriseVault.ts` (globalThis.leadVaultMemory) | Allow dev/playwright use without a database |
| Rate limiting with in-memory Map | `app/api/lead-capture/route.ts` | Per-IP and per-identity throttling without external cache |
| Content-driven pages | `lib/site-pages.ts` (PAGE_CONTENT) | Share content across deep pages (solutions, workers, brain, etc.) |

## Known Architectural Risks

- **In-memory rate limiting** — Rate windows are stored in a Map local to each Node.js process. With multiple instances (e.g., Vercel serverless), rate limits are per-instance rather than global.
- **In-memory fallback persistence** — When `DATABASE_URL` is missing, leads are stored in a global array that is lost on process restart. This is acceptable for dev but misleading if accidentally deployed.

## Evidence

- `app/page.tsx` — server component entry point
- `app/api/lead-capture/route.ts` — API flow with rate limiting, validation, persistence
- `lib/enterpriseVault.ts` — validation + persistence logic
- `lib/prisma.ts` — singleton client pattern
