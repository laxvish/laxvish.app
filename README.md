# Laxvish Website

Marketing website for **Laxvish — the Operating System for Enterprise AI**.

This repository is website-only scope (frontend experience + website API surface for lead capture) and focuses on:

- **The Workers**: domain AI agent experiences
- **The Brain**: orchestration intelligence storytelling
- **The Brakes**: verification and DPDP-first trust messaging

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Run unit tests with Vitest |
| `npm run build` | Build production bundle |
| `npm run start` | Serve built app |

## Testing

Unit tests currently cover:

- `lib/enterpriseVault.ts` validation and record persistence behavior
- `app/api/lead-capture/route.ts` handshake, validation, and rate-limiting behavior

Run:

```bash
npm run test
```

## CI/CD

### Continuous Integration

Workflow: `.github/workflows/ci.yml`

On push to `main` and on pull requests, CI runs:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

### Vercel Deployment

Workflow: `.github/workflows/deploy-vercel.yml`

Production deploy runs on:

- push to `main`
- manual trigger (`workflow_dispatch`)

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Lead Capture API

Route: `POST /api/lead-capture`

Security controls implemented:

- required handshake header (`x-laxvish-handshake`)
- payload validation
- honeypot field
- in-memory per-IP rate limiting

## Repository Structure

```text
app/                    # Next.js app router pages and API routes
components/             # UI and section components
lib/                    # Shared domain logic (lead vault, validators)
public/                 # Static assets
.github/workflows/      # CI + deployment workflows
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.
