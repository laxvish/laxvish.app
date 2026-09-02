# External Integrations

## Integration Inventory

| System | Type | Purpose | Auth model | Criticality | Evidence |
|--------|------|---------|------------|-------------|----------|
| Neon / Supabase PostgreSQL | Database (via Prisma) | Persistent lead storage | Connection string (DATABASE_URL env var) | Medium | `lib/prisma.ts`, `prisma/schema.prisma` |
| NeetoCal | External URL (redirect) | Book demo scheduling | None (public URL) | Low | `lib/site-navigation.ts:16` |
| Cloudflare Insights | Analytics script | Visitor analytics | None (public) | Low | `next.config.ts:14` |

## Data Stores

| Store | Role | Access layer | Key risk | Evidence |
|-------|------|--------------|----------|----------|
| PostgreSQL (Neon/Supabase) | Lead persistence (name, email, company, metadata) | Prisma ORM via `@prisma/adapter-pg` | Connection string exposure, DB availability | `lib/prisma.ts`, `prisma/schema.prisma` |
| In-memory array (fallback) | Lead storage when no DATABASE_URL | `globalThis.leadVaultMemory` | Data loss on restart | `lib/enterpriseVault.ts:236` |

## Secrets and Credentials Handling

- Credential sources: Environment variables (`DATABASE_URL`, `LEAD_SYNC_SECRET`, `ADMIN_API_KEY`)
- Hardcoding checks: No hardcoded credentials found
- Rotation or lifecycle notes: No rotation mechanism — secrets read from `process.env` at runtime; re-deploy required to change

## Reliability and Failure Behavior

- Retry/backoff behavior: None — Prisma handles connection pooling; webhook sync attempt is fire-and-forget
- Timeout policy: None configured explicitly
- Circuit-breaker: In-memory fallback when DATABASE_URL is missing; webhook failure returns 503

## Observability for Integrations

- Logging around external calls: `console.error` on webhook failure and DB storage errors
- Metrics/tracing coverage: None detected
- Missing visibility gaps: No structured logging, no APM, no health-check endpoints for integrations

## Evidence

- `lib/prisma.ts` — Prisma client with Neon adapter
- `lib/enterpriseVault.ts` — in-memory fallback
- `lib/leadSync.ts` — webhook sync to external URL
- `next.config.ts` — CSP including Cloudflare Insights
