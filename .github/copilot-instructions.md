# Laxvish Website Copilot Instructions

## Project Context (Website-Only Scope)
Laxvish is the **Operating System for Enterprise AI**.  
This instruction file is strictly for the **marketing/product website experience only**, not the full application platform.

The website should communicate three brand pillars:
1. **The Workers** (domain AI agents),
2. **The Brain** (orchestration intelligence),
3. **The Brakes** (verification and DPDP-first trust).

Do not implement backend orchestration, agent runtime logic, audit database features, or production compliance pipelines in this website scope.

---

## Copilot Role Adoption (Website Files)

### `@UI_Animator` (default role for `.tsx`, `.css`, `.ts` in frontend)
- Use Next.js 15 App Router patterns and modern React architecture.
- Build smooth, premium interactions with Framer Motion, GSAP, and Rive.
- Optimize for 60fps and minimal layout shift.
- Keep animations component-scoped and reusable.

### `@Website_Guard` (for content, routing, and integration boundaries)
- Keep implementation strictly frontend-focused.
- Use mock/static data for demos unless a real website API layer already exists.
- Do not introduce backend services, orchestration engines, or DB coupling.

---

## Required Website Tech Stack (No Deviation)
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- `@rive-app/react-canvas`
- React Three Fiber

---

## MCP Usage Rules (Website Development)
1. **File System MCP**
   - Map and preserve clean website structure.
   - Keep code inside frontend/web directories.
   - Prevent accidental coupling to backend/runtime folders.

2. **API Reference MCP**
   - If website integrations are needed (e.g., Bhashini display/demo), fetch current docs first.
   - Never invent endpoints, payload shapes, or auth contracts.

---

## Development Rules (Website-Only)

### Performance & UX
- Never use `.mp4` for character animations; use **Rive**.
- Use React Three Fiber for 3D visual nodes/scene elements.
- Wrap heavy visual components with `next/dynamic`.
- Prioritize Core Web Vitals, image optimization, and lazy-loading.

### Architecture Boundaries
- Maintain strict separation from backend and orchestration systems.
- No direct implementation of LangGraph, CrewAI, FastAPI, PostgreSQL, Presidio, or NeMo Guardrails in website code.
- If a section references those systems, present them as UI content/components only.

### Content & Compliance Representation
- You may describe DPDP compliance and verification concepts in UI copy.
- Do not implement compliance enforcement pipelines in website scope.
- Any form/input UX should be privacy-conscious and avoid unnecessary PII collection by default.

---

## Output & Style Rules
- Write website code in **TypeScript**.
- Always use explicit types and interface/type declarations for component props and structured data.
- Comment non-trivial GSAP timelines and advanced animation sequencing.
- Prioritize accessibility, responsiveness, and clean component architecture.

---

## Current UI/UX Principles (Premium Minimal Refresh)

Use these principles as the default for all new website UI work:

1. **Clarity in first 20 seconds**
   - Hero must communicate value immediately with one primary CTA.
   - Prefer short, high-signal copy over decorative wording.

2. **Premium minimal composition**
   - Keep page flow concise (5-6 sections).
   - Remove duplicated “proof” and ornamental sections.
   - Favor strong spacing, typography hierarchy, and clean borders over visual noise.

3. **Motion budget discipline**
   - Motion should support comprehension, not decoration.
   - Keep particle/ambient animation subtle-to-moderate and text-safe.
   - Maintain stable perceived speed across viewport sizes and refresh rates.

4. **Interaction quality**
   - Buttons/inputs: calm transitions, no excessive glows or jitter.
   - Ensure focus states and contrast remain strong on dark backgrounds.

## Approved Color Palette (Do Not Drift)

Use only these core brand/UI colors unless explicitly requested:
- `#000000` — base/background
- `#B6B09F` — premium accent
- `#EAE4D5` — secondary text/surface tint
- `#F2F2F2` — primary text/highlight

Implementation guidance:
- Prefer tokenized use through Tailwind theme colors.
- Avoid introducing bright neon blues/ambers unless user explicitly asks.
- Keep contrast WCAG-friendly, especially for form elements and navigation.

---

## Security Debugging Workflow (Required)

When any error may involve security, use this sequence:

1. Reproduce and isolate the failure path (request/response, headers, payload, env assumptions).
2. Classify severity: auth bypass, data leak, injection, secret exposure, DoS/rate-limit gap, or logic flaw.
3. Confirm trust boundaries (client input, API route, storage, logs, third-party calls).
4. Fix root cause first (validation, auth checks, sanitization, least privilege, safe logging).
5. Add regression checks for the exact exploit/error path.
6. Re-verify with lint/build/tests and route-level probes.
7. Document what failed, why, and how recurrence is prevented.

Security logging rules:
- Never log secrets, tokens, raw PII payloads, or credentials.
- Log safe metadata only (status code, route, field keys, correlation id).

## Skill + Agent Selection Matrix

Use these skills/agents by default:

| Scenario | Required Skills | Optional Skills | Agent Preference |
|---|---|---|---|
| Runtime bug / failing route | `systematic-debugging` | `test-driven-development` | `task` (run checks), `code-review` (validate fix impact) |
| Security bug or suspected vulnerability | `systematic-debugging`, `receiving-code-review` | `python-backend` (API patterns), `verification-before-completion` | `code-review` for security-focused diff audit |
| Performance lag / UI jank | `systematic-debugging` | `refactoring-expert`, `requesting-code-review` | `task` for profiling/build checks |
| Large refactor / cleanup | `writing-plans`, `executing-plans` | `refactoring-expert`, `dispatching-parallel-agents` | `general-purpose` for complex multi-step changes |
| Pre-merge quality gate | `requesting-code-review`, `verification-before-completion` | `receiving-code-review` | `code-review` |

## Instructions to Follow During Error/Security Work

For any bug/security/optimization task, apply these guardrails:
- Start with `systematic-debugging` before proposing a fix.
- Prefer root-cause fixes over superficial patches.
- Keep website-only scope: no unrelated backend platform expansion.
- Use parameterized DB access, strict input validation, and explicit error responses.
- Preserve telemetry quality while preventing sensitive-data exposure in logs.
- After major fixes, run `requesting-code-review` to catch hidden regressions.

## Security Incident Mini-Playbook (Website Scope)

If a high-risk issue is found:
1. **Triage:** confirm exploitability and affected routes/components.
2. **Contain:** disable risky path or gate behind strict checks.
3. **Patch:** implement least-privilege + validation hardening.
4. **Verify:** re-run exploit scenario and regression checks.
5. **Record:** add concise postmortem notes in session/PR context.

## Optimization Playbook

For optimization changes:
- Measure first (slow route/component, render cost, animation frame stability).
- Reduce unnecessary work (duplicate writes/queries, extra layout/reflow, heavy effects).
- Keep animation speed time-normalized (delta-time based), especially on resize and high-DPR screens.
- Favor simpler architecture if output quality is equal or better.
