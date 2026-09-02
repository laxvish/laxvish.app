# Technology Stack

## Runtime Summary

| Area | Value | Evidence |
|------|-------|----------|
| Primary language | TypeScript 5.x | `package.json` (`typescript: "^5"`), `tsconfig.json` |
| Runtime + version | Node.js 20+ (engine requirement) | `README.md` |
| Package manager | npm 10+ | `package-lock.json` |
| Module/build system | Next.js 16 with Turbopack (default dev bundler), ES modules | `package.json`, `next.config.ts` |
| LSP config | TypeScript strict mode, `moduleResolution: "bundler"` | `tsconfig.json` |

## Production Frameworks and Dependencies

| Dependency | Version | Role in system | Evidence |
|------------|---------|----------------|----------|
| next | 16.2.3 | Web framework (App Router, SSR, routing) | `package.json` |
| react / react-dom | 19.2.4 | UI rendering | `package.json` |
| @prisma/client / @prisma/adapter-pg | ^7.7.0 | ORM / PostgreSQL adapter | `package.json` |
| pg | ^8.20.0 | PostgreSQL driver | `package.json` |
| three / @react-three/fiber / @react-three/drei | ^0.183 / ^9.6 / ^10.7 | 3D WebGL rendering | `package.json` |
| framer-motion | ^12.38.0 | Animation library | `package.json` |
| motion | ^12.38.0 | Animation library (motion.dev) | `package.json` |
| animejs | ^4.3.6 | Animation library | `package.json` |
| matter-js | ^0.20.0 | 2D physics engine | `package.json` |

## Development Toolchain

| Tool | Purpose | Evidence |
|------|---------|----------|
| TypeScript ^5 | Type checking | `package.json` |
| eslint ^9 + eslint-config-next | Linting | `package.json`, `eslint.config.mjs` |
| tailwindcss ^4 + @tailwindcss/postcss | CSS framework | `package.json`, `tailwind.config.ts`, `postcss.config.mjs` |
| prisma ^7.7.0 | Schema management & migrations | `package.json`, `prisma/schema.prisma` |

## Key Commands

```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build (runs prisma generate first)
npm start         # Start production server
npm run lint      # Run ESLint
```

## Environment and Config

- Config sources: `next.config.ts`, `tailwind.config.ts`, `prisma.config.ts`, `tsconfig.json`, `postcss.config.mjs`
- Required env vars: `DATABASE_URL` (PostgreSQL), `LEAD_SYNC_MODE`, `LEAD_SYNC_SECRET`, `ADMIN_API_KEY`, `LEAD_SYNC_WEBHOOK_URL` (optional), `NEXT_PUBLIC_NEETOCAL_URL` (optional)
- Deployment: Vercel (primary), or self-hosted Node.js

## Evidence

- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `prisma/schema.prisma`
