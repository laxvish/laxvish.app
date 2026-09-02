# Codebase Structure

## Top-Level Map

| Path | Purpose | Evidence |
|------|---------|----------|
| `app/` | Next.js App Router — pages, layouts, API routes, global styles | `app/layout.tsx`, `app/page.tsx` |
| `components/` | Reusable UI components (layout, sections, ui, visuals) | `components/` directory |
| `lib/` | Shared utilities, Prisma client, lead logic, security, SEO | `lib/` directory |
| `prisma/` | Database schema and migration files | `prisma/schema.prisma` |
| `public/` | Static assets (favicon, images, sitemap.xml) | `public/` directory |
| `.github/` | Copilot instructions, GH workflows, linting rules | `.github/` directory |
| `.agents/` | Copilot agent skill definitions | `.agents/skills/` |
| `docs/` | Project documentation | `docs/codebase/` |

## Entry Points

- Main runtime entry: `next dev` / `next start` (Next.js handles entrypoint via `app/layout.tsx`)
- API entry points: `app/api/lead-capture/route.ts` (POST), `app/api/webhooks/lead-sync/route.ts` (POST), `app/api/admin/leads/route.ts` (GET)

## Module Boundaries

| Boundary | What belongs here | What must not be here |
|----------|-------------------|------------------------|
| `app/` | Route pages, layouts, API handlers | Business logic (goes in lib/), UI components (goes in components/) |
| `components/` | Reusable UI — layout, sections, visuals | Data fetching, direct DB access |
| `lib/` | Business logic, DB client, validation, security, SEO helpers | UI markup, routing |
| `prisma/` | DB schema and migrations | Application code |

## Naming and Organization Rules

- File naming pattern: `PascalCase` for components (e.g., `Hero.tsx`, `Navbar.tsx`), `camelCase` for utilities (e.g., `prisma.ts`, `security.ts`)
- Directory organization: `domain-based` (e.g., `layout/`, `sections/`, `ui/`, `visuals/` under components; routes organized by page under `app/`)
- Import aliasing: `@/*` maps to project root via TypeScript `paths` config

## Evidence

- `app/` directory tree
- `components/` directory tree
- `lib/` directory listing
- `tsconfig.json` (paths config)
