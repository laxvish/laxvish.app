# Contributing to Laxvish.app

## Read this first

[`AGENTS.md`](../AGENTS.md) is **binding** for every contributor, agent and
automation that touches this repo. It locks the colour palette, typography,
interaction language and the anti-slop bans. Read it before writing code and
re-read it before committing. It may be tightened by adding sections, never
relaxed.

The rules it encodes are not advisory — they are enforced by a test. See
[Conformance gate](#conformance-gate).

## Setup

```bash
git clone https://github.com/laxvish/laxvish.app
cd laxvish.app
npm install
cp .env.example .env.local   # then fill in DATABASE_URL etc.
npm run dev                  # http://localhost:3050
```

Requires **Node 22**. The test runner uses `--experimental-strip-types`, so
older Node versions cannot run the suite.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port **3050** |
| `npm run build` | Production build (`prebuild` runs `prisma generate`) |
| `npm start` | Serve the production build on port 3050 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Node test suite |

## Conformance gate

`tests/agents-conformance.test.mjs` scans every `.ts`/`.tsx` file under
`components/`, `app/` and `lib/` and fails on:

- hex colours outside `#FAFAFA` `#EAEAEA` `#111111` `#666666`
- `backdrop-blur`, `bg-gradient-*`, `rounded-2xl`, `rounded-3xl`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- banned fonts (Geist, Roboto, Poppins, Manrope, Sora, Plus Jakarta)
- the `"Get Started"` CTA
- generic marketing phrasing

If you have a genuinely justified exception, append the comment
`conformance-ignore` to the offending line so the exception is visible in
review. Do not weaken the rule itself.

## Verifying before you commit

`AGENTS.md` §5 requires all four of these to be clean:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The build must succeed **without** a `DATABASE_URL` set — CI relies on that.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
fix(lead-capture): fail open when the rate-limit store is unreachable
feat(seo): generate sitemap from USE_CASES instead of a static file
```

Types in use: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `ci`.

## Scope boundaries

This repository is the **marketing surface and lead funnel only**. Not
included: backend orchestration, the agent runtime, the audit database, or
production compliance pipelines.

## Testing notes

- Tests run on Node's built-in runner. **There is no Vitest and no Playwright
  in this project**, and none should be added without a decision from the
  maintainers.
- Tests must be deterministic and must not require a database, network, or a
  running server.
- Source-level static tests (like the conformance gate) are preferred over
  brittle DOM assertions for design-contract rules.
