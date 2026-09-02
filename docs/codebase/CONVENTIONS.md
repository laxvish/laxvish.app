# Coding Conventions

## Naming Rules

| Item | Rule | Example | Evidence |
|------|------|---------|----------|
| Files (components) | PascalCase | `Hero.tsx`, `Navbar.tsx` | `components/sections/Hero.tsx` |
| Files (utilities) | camelCase | `prisma.ts`, `security.ts` | `lib/prisma.ts` |
| Functions/methods | camelCase | `validateLeadVaultInsert`, `getSiteUrl` | `lib/enterpriseVault.ts:96` |
| Types/interfaces | PascalCase | `LeadVaultRecord`, `SiteLink` | `lib/enterpriseVault.ts:31` |
| Constants/env vars | UPPER_SNAKE_CASE | `MAX_NAME_LENGTH`, `DATABASE_URL` | `lib/enterpriseVault.ts:63` |

## Formatting and Linting

- Formatter: [TODO] — no Prettier config detected
- Linter: ESLint 9 with `eslint-config-next` (`eslint.config.mjs`)
- Most relevant enforced rules: Next.js core-web-vitals and TypeScript rules
- Run command: `npm run lint`

## Import and Module Conventions

- Import grouping: External imports first (next, react), then internal `@/path` aliases
- Alias vs relative: `@/*` path alias used exclusively for internal imports (maps to project root via `tsconfig.json`)
- Public exports/barrel policy: Named exports only, no barrel `index.ts` files

## Error and Logging Conventions

- Error strategy: Validation returns structured `{ success, errors }` objects; API routes return typed JSON error responses with HTTP status codes
- Logging: `console.error` for failures; safe metadata only (no secrets, raw PII)
- Sensitive-data redaction: `lib/security.ts` provides `safeTokenCompare` for timing-safe secret comparison; logs filter out raw payloads

## Testing Conventions

- Test file naming/location: [TODO] — no test files found in the codebase
- Mocking strategy: [TODO] — no established pattern
- Coverage expectation: [TODO] — no coverage config detected

## Evidence

- `lib/enterpriseVault.ts` — naming conventions, error strategy
- `eslint.config.mjs` — linting configuration
- `tsconfig.json` — TypeScript strict mode, path aliases
- `app/api/lead-capture/route.ts` — error response pattern
