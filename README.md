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

## Testing

Unit tests cover two critical areas:

### Enterprise Vault (`lib/enterpriseVault.ts`)
- ✅ Validates lead data (name, email, company, use case)
- ✅ Enforces length constraints
- ✅ Persists records in-memory

### Lead Capture API (`app/api/lead-capture/route.ts`)
- ✅ Handshake header validation (`x-laxvish-handshake`)
- ✅ Per-IP rate limiting (6 requests per 60s window)
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
│   └── enterpriseVault.ts    # Lead validation & storage
├── public/                   # Static assets (fonts, images)
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/            # CI/CD workflows
├── vitest.config.ts          # Test runner config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind theme tokens
└── prompt.md                 # Full prompt specifications (16 sections)
```

---

## Performance Optimizations

- **NeuralCanvas:** Adaptive quality tiers based on pixel load; visibility-aware rendering (IntersectionObserver)
- **Animations:** CSS `@keyframes` for marquees; CSS transforms for button motions
- **Images:** Next.js `<Image>` component with lazy loading
- **Fonts:** Geist font preloaded via `next/font`
- **Rendering:** Server components by default; selective client-side interactivity

---

## API Routes

### POST `/api/lead-capture`

Secure endpoint for lead intake with three-layer protection: handshake header, rate limiting, and anti-abuse honeypot.

**Request:**
```typescript
{
  "name": string,
  "email": string,
  "company": string,
  "useCase": string,
  "honeypot"?: string  // Anti-spam (should be empty)
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
- `x-laxvish-handshake: true` — Must be present and true

**Rate limit:** 6 requests per IP per 60 seconds.

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
