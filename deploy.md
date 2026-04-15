# Laxvish Website Deployment Guide

This document is the full production deployment process for `laxvish.app` (Next.js App Router + Prisma + PostgreSQL).

## 1. Prerequisites

1. GitHub repository access with push rights to `main`.
2. Vercel account with project import permission.
3. PostgreSQL database (Neon or Supabase recommended).
4. Local tooling:
   - Node.js 20+
   - npm 10+
   - Git

## 2. Required Environment Variables

Configure these in Vercel **Project Settings → Environment Variables** and in GitHub Actions secrets when needed:

### Public
- `NEXT_PUBLIC_NEETOCAL_URL` (bookings URL)

### Server/API
- `DATABASE_URL`
- `LEAD_CAPTURE_HANDSHAKE`
- `LEAD_SYNC_MODE` (`direct` or `webhook`)
- `LEAD_SYNC_SECRET`
- `LEAD_SYNC_WEBHOOK_URL` (required if `LEAD_SYNC_MODE=webhook`)
- `ADMIN_API_KEY`

## 3. Local Production Readiness

Run before pushing:

```bash
npm install
npm run lint
npm run build
```

If Prisma schema changed:

```bash
npx prisma migrate deploy
```

## 4. GitHub Push Workflow (Whole Worktree)

From repository root:

```bash
git add -A
git commit -m "feat: finalize website premium updates and deployment guide"
git push origin main
```

If branch protection blocks direct push, push to a feature branch and open PR:

```bash
git checkout -b feat/deploy-handoff
git push -u origin feat/deploy-handoff
```

## 5. Vercel Deployment Setup

1. Go to <https://vercel.com/new>.
2. Import `laxvish/laxvish.app`.
3. Set framework preset to **Next.js** (auto-detected).
4. Add all env vars from section 2.
5. Deploy.

### Build settings
- Install command: `npm install`
- Build command: `npm run build`
- Output: `.next` (default Next.js output)

## 6. Optional GitHub Actions → Vercel Tokenized Deploy

Repository secrets required:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

On push to `main`, deploy workflow can trigger production deployment.

## 7. Post-Deploy Validation Checklist

1. Open homepage and verify hero animation renders.
2. Verify navbar CTA redirects to NeetoCal URL.
3. Verify depth routes:
   - `/solutions`, `/workers`, `/brain`, `/brakes`, `/security-trust`
   - `/about`, `/contact`, `/faq`, `/privacy`, `/terms`
4. Validate API routes:
   - `POST /api/lead-capture`
   - `POST /api/webhooks/lead-sync` (if webhook mode)
   - `GET /api/admin/leads` (with admin key)
5. Confirm database writes for new lead capture.

## 8. Rollback Plan

1. In Vercel, open Deployments.
2. Promote last stable deployment.
3. Revert bad commit in GitHub and push:

```bash
git revert <commit_sha>
git push origin main
```

## 9. Ongoing Operations

1. Rotate `ADMIN_API_KEY` and sync secrets quarterly.
2. Monitor build logs and API error rates after each release.
3. Keep Prisma schema/migrations versioned with application code.
