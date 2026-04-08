# Contributing to Laxvish Website

Thanks for contributing.

## Scope

This repository is for the **website experience only**:

- marketing pages
- frontend interactions/animations
- website-safe API routes (for example lead capture)

Do not add backend orchestration systems, runtime agent infrastructure, or database platform code here.

## Development Setup

```bash
npm install
npm run dev
```

## Required Checks

Before opening a pull request, run:

```bash
npm run lint
npm run test
npm run build
```

## Branch and PR Guidelines

1. Create a feature branch from `main`.
2. Keep PRs focused and small when possible.
3. Use clear commit messages.
4. Explain user impact in the PR description.

## Code Standards

- Use TypeScript with explicit interfaces/types.
- Follow existing component and naming patterns.
- Keep responsive behavior intact across breakpoints.
- Maintain accessibility and keyboard usability.
- Prefer reusable, component-scoped animation logic.

## Testing Expectations

- Add or update unit tests for logic changes in `lib/` and `app/api/`.
- Keep tests deterministic and fast.

## Security and Privacy

- Never commit secrets.
- Use environment variables for credentials/tokens.
- Keep forms privacy-conscious and avoid unnecessary PII collection.
