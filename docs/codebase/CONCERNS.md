# Codebase Concerns

## Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
|----------|---------|----------|--------|------------------|
| High | No test infrastructure — test script not defined in package.json despite README documentation | `package.json` scripts, no `vitest.config.ts` or test files | Untested code regressions; CI cannot run tests | Add vitest config and test files; fix npm test script |
| Medium | In-memory rate limiting won't scale across multiple serverless instances | `app/api/lead-capture/route.ts` (local `Map` rate windows) | Rate limits reset per-instance; attackers can rotate instances | Use external cache (e.g., Upstash Redis) for distributed rate limiting |
| Medium | No structured logging or observability | No APM, no logging library | Hard to debug production issues, no performance visibility | Add a logging library (pino/winston) and optional OpenTelemetry |
| Low | In-memory lead vault fallback loses data on process restart | `lib/enterpriseVault.ts:236` | Dev data loss; risk of accidental deployment without DB | Warn on startup when DATABASE_URL is missing; fail in production |

## Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
|-----------|---------------|-------|-----------------|---------------|
| No test files | Feature velocity priority over testing | Entire codebase | No regression safety net | Establish vitest + RTL pattern with test for lead-capture route |
| Lib/enterpriseVault.ts has dual in-memory + DB persistence path | Allows development without PostgreSQL | `lib/enterpriseVault.ts` | Logic diverges between paths; in-memory path may not mirror DB behavior | Extract persistence behind an interface with two implementations |
| No Prettier config | Not yet configured | Root | Inconsistent formatting across contributors | Add `.prettierrc` and format script |

## Security Concerns

| Risk | OWASP category | Evidence | Current mitigation | Gap |
|------|----------------|----------|--------------------|-----|
| In-memory rate limiting per-instance | A04:2021 (Insecure Design) | `app/api/lead-capture/route.ts` | Per-IP + per-identity limit within single process | Distributed DoS across instances |
| Missing env var validation on startup | A05:2021 (Security Misconfiguration) | `lib/prisma.ts` silently returns null | Graceful fallback to in-memory | No startup validation for critical env vars in production |

## Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
|---------|----------|-----------------|-------------|-----------------------|
| Large bundle from Three.js + Framer Motion + animejs + matter-js | `package.json` dependencies | Page load time with 4 animation libraries | Higher load times on slow connections | Audit animation library usage; lazyload 3D components |

## Fragile/High-Churn Areas

| Area | Why fragile | Churn signal | Safe change strategy |
|------|-------------|-------------|----------------------|
| `app/api/lead-capture/route.ts` | Contains rate limiting, validation, sync logic in one file | 4 commits in last 90 days (3rd highest) | Add unit tests before modifying; extract rate limiter into lib/ |
| `lib/enterpriseVault.ts` | Dual persistence path, complex validation logic | 4 commits in last 90 days | Test both in-memory and DB paths separately |
| `components/sections/Hero.tsx` | Core visual component with 3D canvas | 4 commits in last 90 days | Visual regression testing |

## [ASK USER] Questions

1. Vitest is mentioned in README but no config or test files exist. Should tests be scaffolded, or was vitest listed prematurely?
2. Is there a preferred logging library or should `console.error` remain the standard?
3. Are there plans to add visual regression testing for the 3D/Three.js components?
4. The README references CI/CD workflows (.github/workflows/) but none were detected — are they pending or stored elsewhere?

## Evidence

- `.codebase-scan.txt` — high-churn files, no TODOs, no test files
- `package.json` — no test script
- `app/api/lead-capture/route.ts` — in-memory Map for rate limiting
- `lib/enterpriseVault.ts` — dual persistence path
- `next.config.ts` — security headers
