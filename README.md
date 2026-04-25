# Laxvish Website

A premium Next.js 16 marketing website for Laxvish — the Operating System for Enterprise AI.

**Live:** [laxvish.app](https://laxvish.app)

---

## Project Overview

This is a website-only implementation focused on the marketing and product narrative. It showcases three core brand pillars:
1. **The Workers** — Domain AI agents
2. **The Brain** — Orchestration intelligence
3. **The Brakes** — Verification and DPDP-first trust

**Not included:** Backend orchestration, agent runtime, audit database, or production compliance pipelines. See [CONTRIBUTING.md](./CONTRIBUTING.md) for scope boundaries.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP, Framer Motion, Rive Canvas
- **Testing:** Vitest
- **Deployment:** Vercel (CI via GitHub Actions)

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/laxvish/laxvish.app.git
cd laxvish.app
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-refreshes on edits to `app/page.tsx` and related components.

To use your own Book Demo popup target, set:

```bash
NEXT_PUBLIC_NEETOCAL_URL="https://laxvish.neetocal.com/meeting-with-shubham-kumar"
```

### Build

```bash
npm run build
npm start
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint on source files |
| `npm test` | Run Vitest suite (enterprise vault + API route) |

---

## Site Navigation

The premium navigation and footer route to dedicated pages:

- `/solutions`
- `/workers`
- `/brain`
- `/brakes`
- `/security-trust`
- `/faq`
- `/about`
- `/contact`
- `/privacy`
- `/terms`

---

## Testing

Unit tests cover two critical areas:

### Enterprise Vault (`lib/enterpriseVault.ts`)
- ✅ Validates lead data (name, workEmail, company, useCase, action)
- ✅ Enforces length constraints
- ✅ Persists records in-memory

### Lead Capture API (`app/api/lead-capture/route.ts`)
- ✅ Multi-layer anti-abuse checks (per-IP + per-identity throttling)
- ✅ Per-IP and per-identity rate limiting (6 + 3 requests per 60s window)
- ✅ Honeypot field detection
- ✅ SHA-256 identity hashing for deduplication

Run tests locally:

```bash
npm test
```

Expected output: **7 passing tests**.

---

## CI/CD

This project uses GitHub Actions for continuous integration and Vercel for production deployment.

### GitHub Actions Workflows

#### `.github/workflows/ci.yml` — Lint, Test, Build
**Triggers:** Push to any branch, Pull Requests

1. Installs dependencies
2. Runs ESLint linting
3. Runs Vitest unit tests
4. Builds Next.js production bundle

**Status badge:** See Actions tab for live status.

#### `.github/workflows/deploy-vercel.yml` — Production Deployment
**Triggers:** Push to `main` branch, manual workflow dispatch

Deploys to Vercel production environment after CI passes.

**Requirements (must configure in repository settings):**
- `VERCEL_TOKEN` — Personal access token from [Vercel CLI](https://vercel.com/docs/cli#setup)
- `VERCEL_ORG_ID` — Organization ID (visible in Vercel dashboard)
- `VERCEL_PROJECT_ID` — Project ID (from `vercel.json` or dashboard)

**Setup:**
1. Go to repository Settings → Secrets and Variables → Actions
2. Add the three secrets above
3. Deployment will run automatically on next `main` push

---

## Database Setup (Prompt 17: Serverless Database Sync)

### Overview
The application supports PostgreSQL backend integration for persistent lead storage via Prisma ORM, plus near real-time webhook sync.

### Prerequisites
- PostgreSQL database (free options: [Neon](https://neon.tech), [Supabase](https://supabase.com))
- Neon free tier: 0.5GB storage, 0.5 compute, 3 branches
- Supabase free tier: 500MB storage, realtime APIs

### Setup Steps

1. **Get Database URL:**
   - Sign up for Neon or Supabase
   - Create a new PostgreSQL database
   - Copy connection string (format: `postgresql://user:password@host:port/database?sslmode=require`)

2. **Configure Local Environment:**
   ```bash
   # Copy .env.example to .env.local
   cp .env.example .env.local
   
   # Add your DATABASE_URL
   echo "DATABASE_URL=\"postgresql://...\"" >> .env.local
   ```

3. **Run Migrations:**
   ```bash
   # Automatically run before build
   npm run prebuild
   
    # Or manually
    npx prisma migrate deploy
    ```

4. **Configure Sync + Admin Secrets (`.env.local`):**
   ```bash
    LEAD_SYNC_MODE="direct" # direct | webhook
    LEAD_SYNC_SECRET="replace-with-strong-secret"
    ADMIN_API_KEY="replace-with-admin-key"
   ```
   Optional:
   ```bash
   LEAD_SYNC_WEBHOOK_URL="https://your-domain.com/api/webhooks/lead-sync"
   ```
5. **Verify Database:**
   ```bash
   # View Prisma Studio (admin interface)
   npx prisma studio
   ```

### Schema (Prompt 17 Implementation)
- **Lead Table** — Stores captured leads with:
  - `id` (CUID primary key)
  - `name`, `workEmail`, `company`, `useCase`, `action` (lead details)
  - `status` (pending/contacted/pilot/inactive)
  - `identity` (SHA-256 deduplication hash)
  - `source` (always "website" for website scope)
  - `metadata` (JSON for additional context)
  - `createdAt`, `updatedAt` (timestamps)
  - Indexes on workEmail, company, createdAt, status for query performance

### Deployment
Set `DATABASE_URL` in GitHub repository secrets for production:
1. Settings → Secrets and Variables → Actions
2. Add `DATABASE_URL` with production database connection string
3. Add `LEAD_SYNC_MODE`, `LEAD_SYNC_SECRET`, `LEAD_SYNC_WEBHOOK_URL` (if webhook mode is enabled), and `ADMIN_API_KEY`
4. Vercel deployment will automatically apply migrations

### Runtime Endpoints (Prompt 17)
- `POST /api/lead-capture` — Uses `LEAD_SYNC_MODE`:
  - `direct`: writes directly to database.
  - `webhook`: queues via webhook and returns `202`.
- `POST /api/webhooks/lead-sync` — Async sync handler to Prisma/PostgreSQL (requires `x-lead-sync-secret`).
- `GET /api/admin/leads?format=json|csv&limit=100` — Optional admin export endpoint (requires `x-admin-api-key`).

### Future Enhancements
- Retry queue + dead-letter handling for webhook delivery
- Analytics dashboard for lead status tracking

---

## Project Structure

```
laxvish.app/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── lead-capture/     # Lead capture POST endpoint
├── components/
│   ├── layout/               # Navbar, NoiseOverlay
│   ├── sections/             # Homepage sections (Hero, Pillars, etc.)
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── enterpriseVault.ts    # Lead validation & storage
│   ├── prisma.ts             # Prisma client singleton (Prompt 17)
│   └── generated/prisma/     # Auto-generated Prisma types
├── prisma/
│   ├── schema.prisma         # Lead table schema
│   └── migrations/           # Database migration files
├── public/                   # Static assets (fonts, images)
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/            # CI/CD workflows
├── vitest.config.ts          # Test runner config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind theme tokens
├── prisma.config.ts          # Prisma configuration
├── .env.example              # Environment template with DATABASE_URL
└── prompt.md                 # Full prompt specifications (17 sections)
```

---

## Performance Optimizations

- **NeuralCanvas:** Adaptive quality tiers based on pixel load; visibility-aware rendering (IntersectionObserver)
- **Animations:** CSS `@keyframes` for marquees; CSS transforms for button motions
- **Images:** Next.js `<Image>` component with lazy loading
- **Fonts:** Geist font preloaded via `next/font`
- **Rendering:** Server components by default; selective client-side interactivity
- **Database:** Prisma connection pooling (Neon/Supabase automatic)

---

## API Routes

### POST `/api/lead-capture`

Secure endpoint for lead intake with trusted-origin checks, rate limiting, and anti-abuse honeypot.

**Request:**
```typescript
{
  "name": string,
  "workEmail": string,
  "company": string,
  "useCase": string,
  "action": string,
  "website"?: string  // Anti-spam honeypot (should be empty)
}
```

**Response (200):**
```typescript
{
  "success": true,
  "leadId": string,
  "message": string
}
```

**Response (400/429/500):**
```typescript
{
  "error": string,
  "code": string
}
```

**Headers required:**
- `content-type: application/json`

**Rate limit:** 6 requests per IP and 3 requests per identity-action key per 60 seconds.

---

## Deployment

### Vercel

The easiest deployment method:

1. **Initial Setup:**
   - Connect repository to [Vercel](https://vercel.com/new)
   - Vercel auto-detects Next.js and uses optimal defaults
   - Set environment secrets (see CI/CD section above)

2. **Automatic Deployment:**
   - Merges to `main` trigger production builds
   - Deploy workflow validates lint/test/build before pushing

3. **Manual Deployment:**
   ```bash
   # Using Vercel CLI
   npm install -g vercel
   vercel --prod
   ```

### Self-Hosted (Node.js)

```bash
npm run build
npm start
```

Runs production server on port 3000 (configurable via `PORT` env var).

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development setup
- Code standards
- Testing expectations
- Security guidelines
- Website-only scope boundaries

---

## Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [GSAP Animation Library](https://gsap.com)
- [Vitest Docs](https://vitest.dev)
- [Vercel Docs](https://vercel.com/docs)

---

## License

See [LICENSE](./LICENSE).
