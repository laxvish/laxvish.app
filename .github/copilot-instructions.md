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
