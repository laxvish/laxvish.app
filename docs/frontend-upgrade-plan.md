# Laxvish.app — Frontend Upgrade Plan

> **Status:** Proposal — for review. **Mode:** `redesign — preserve` (targeted evolution).
> **Positioning:** **Laxvish is an AI company that *builds* AI systems** for Indian enterprise. It is *not* "an operating system" that wraps your business — it *engineers and operates* the AI systems (workers / brain / brakes) that do the work.
> **Visual world (chosen):** **"The Control Surface"** — the page is the operator's console of a precision machine-building company. You are watching the AI systems Laxvish builds, run live.
> **Positioning thesis:** The page must read as an **engineered machine / precision control surface**, not a marketing scroll. We are not adding decoration — we are removing the generic-SaaS tells and executing the existing industrial contract *exactly*.
> **Non-negotiable carries:** a11y 100, Best Practices 100, SEO 100, every text↔bg pair WCAG AA+, `useReducedMotion`, DPDP/security headers, no horizontal overflow. Any change that regresses these is rejected.

---

## 0. Decision frame

**Design read:** Enterprise B2B marketing site for technical/operational buyers (Founders, COOs, CXOs) at 50–2000-employee Indian companies. **Laxvish = an AI engineering company that builds AI systems.** Ultra-minimal, monochrome, industrial, machine-architecture language, rendered as an **operator's control surface**.

**Dials (set for this product, over-tuned toward "precision" not "spin"):**
- `DESIGN_VARIANCE: 6` — asymmetric but disciplined; no chaos.
- `MOTION_INTENSITY: 2` — subtractive, purposeful. The website is a machine, not a show.
- `VISUAL_DENSITY: 5` — engineered density (hairlines, spec-sheet microdetail), not clutter.

**The 6 "generic SaaS" tells we are removing** (these are what make it feel like a template):
1. 5-line, 81px hero headline that overflows the viewport.
2. Rotating blurred "floating blobs" hero background.
3. Two identical 3-column equal-card grids back-to-back.
4. Two different contact-intent CTA labels ("Talk to us" vs "Book a working session") + two different /solutions labels.
5. Space Grotesk (the mandated display font) never actually applied — everything renders in Inter.
6. No proof / trust / evidence layer for an enterprise buyer.

---

## 1. Design language: what "professional, not generic SaaS" means here

**The World (chosen): "The Control Surface."** The page is a machine-building company's operator console. You are at the threshold of the systems Laxvish builds and runs. Every element is a control, a gauge, a sub-panel or a readout — not a "card on a marketing page." This is what makes it feel authored by an engineering company rather than templated.

The visual grammar is engineering, not marketing:

- **Type as structure.** Display = **Space Grotesk** (400–600 only — never 700). Body/UI = **Inter**. Technical overlines/labels/metadata = uppercase Space Grotesk or Inter with `tracking-[0.2em]` and `text-[10px]`. No mixed-family emphasis; emphasize with weight/italic of the *same* family.
- **Grid = measurement.** Hairline rules everywhere (`border-charcoal/10`–`/20`), disciplined `max-w-[1440px]`, 1px borders, generous negative space, asymmetric column divisions. A **persistent machine frame** wraps the page: corner registration ticks + alignment crosshairs at the viewport corners, and a **title block** (engineering-drawing "PROJECT / SCALE / REV") in the footer. Sections carry a **numerical index** (01 / 02 / 03) in the overline.
- **Surface = material.** `#FAFAFA` base with the 24px radial dot grain; `#EAEAEA` for panels; `#111111` ink; `#666666` muted. **Sharpness as identity** — one corner-radius system: **0 (sharp)** for surfaces/cards, **0** for buttons (AGENTS.md already bans the `rounded-full` cluster). No glassmorphism, no drop shadows, no baked gradients.
- **Motion = crafted & purposeful (weighted, cinematic).** High-damping spring physics (`stiffness ~180–200`, `damping ~20–25`) for physical mass. **Silence is the weapon** — ~70% of the frame stays motionless; one kinetic element (a needle, a gauge, a signal trace) carries the movement. Animation is applied to **crafted SVG assets** via a JS framework (Framer Motion) — never to generic shapes. `useReducedMotion` → static.
- **Telemetry = storytelling.** Restrained monochrome status lines read as instrumentation ("WORKERS 03 · GATE 01 · READY") — **static, sparse, mono**, never a blinking dashboard of lights.
- **One accent, locked.** Strictly `#111111` (action) + `#666666` (muted). No accent color introduced anywhere.

---

## 2. Section-by-section recomposition

### 2.1 Hero — from "wall of text" to "crafted instrument + poster" (P1)
**Before:** 5-line 81px headline, two-sentence copy, 3 rotating blurred `mix-blend` blob layers, 997px tall (overflows a 940px viewport).
**After:** Asymmetric engineering hero with a **crafted signature SVG** (animated via Framer Motion) + a poster headline.
- Left column (~55%): technical overline (`Operating system for Indian enterprise`), display headline **≤ 2 lines** (`clamp(2.75rem, 4.5vw, 4.5rem)`), 20-word max subtext, primary CTA (`Book a working session`) + one secondary. Top padding ≤ `pt-24`. Total **≤ 4** text elements.
- Right column (~45%): the **signature hero SVG** — a purpose-designed, high-quality, monochrome composition (see §2.1b). Animated with a JS framework (Framer Motion): slow group rotation + draw-on (`stroke-dashoffset`) + subtle scroll-linked response. `useReducedMotion` → static frame. **No** `mix-blend-screen`, **no** blurred generic blobs.
- **Front-page headline copy (proposal):** overline `AN AI COMPANY · AI SYSTEMS FOR INDIAN ENTERPRISE`; headline **≤ 2 lines** — *"We build the AI systems that do your real work."* + secondary line *"You stay in control of every decision."* — sharp. (This reframes Laxvish as the AI *company* that *builds* systems, not "an operating system." The current SEO title `AI Operating System for Indian Enterprises` must be updated to match.)
- **Why non-generic:** one precise sentence, and the visual is a hand-crafted, brand-specific instrument — not a stock blob, not a stock AI-brain render.

### 2.1b Asset strategy — crafted SVG + professional AI imagery (the "really worthy" layer)

The visual identity is built from **two asset classes**, **both produced for the brand**, both monochrome/industrial:

**A. Crafted signature SVG (inline, animated with Framer Motion).**
A single, high-quality, purpose-designed SVG is the hero centrepiece and recurs as a section motif. It must be *specific to Laxvish* — an engineered composition suggesting an operating system / machine architecture, drawn in hairline `#111111` / `#666666` strokes. Animated with a JS framework (Framer Motion is already a dependency): slow rotation, draw-on, scroll-linked response. Concept directions — **chosen: Machine cross-section** (layered angular plates, fasteners, gears; half-technical / half-abstract, mechanical theme). The others are noted as alternates:
- **Precision instrument** — concentric rings + radiating hairline spokes + central node cluster + a ruled gauge (measurement theme). *(alternate)*
- **System lattice** — an angular network of minimal nodes and connectors (operating-system theme). *(alternate)*
**Banned in the SVG:** generic flowing lines/"thread" strips, blurred blobs, stock 3D robot or glowing brain icons.

**B. Professional AI-generated imagery (real, on-brand).**
Produce real, high-quality images and use them as section backgrounds / split-image blocks. Treatment to keep them on-brand:
- **Monochrome / desaturated** (greyscale, high contrast) so they sit inside the `#FAFAFA / #111111 / #EAEAEA / #666666` world.
- **Subject direction** — **chosen: macro machine detail** (machined metal, wire harnesses, circuitry-as-texture). Fits an AI operating system for enterprises and grades cleanly to mono. Alternates: abstract industrial architecture, clean facility/production abstractions. **Not** a generic glowing AI brain, **not** a robot 3D render, **not** a handshake stock photo.
- **Integration:** overlaid with the hairline grid / dot grain so it reads as part of the system, not a pasted stock photo.
- **Production tooling available in-session:** `imagegen-frontend-web` / `fal-ai-media` / `nano-banana-pro-openrouter` (generation), `image-manipulation-image-magick` (desaturate/grade to palette). Every image passes the **stranger test** (swap "Laxvish" → page only still makes sense for Laxvish).

**Why non-generic:** the assets are authored for this brand, not picked from a template library. A monochrome precision instrument + industrial imagery cannot be mistaken for a generic SaaS page.

### 2.2 Pillars — "Three layers" as an engineered spec, not 3 equal cards (P1)
**Before:** 3 identical `border-t` cards in a `md:grid-cols-3`.
**After:** An **asymmetric numbered spec band** — `01 Workers / 02 Brain / 03 Brakes` stacked as rows divided by hairlines, each row a wide left-aligned title with a tighter description and a "Learn more" rule on the right. On large screens: a 1/2 + 1 composition or a 3-column grid at **unequal widths** (e.g. `2fr 1fr 1fr`) so it is *not* three twins. On mobile: full-width stacked rows.
- **Why non-generic:** reads as engineering documentation, not a features grid.

### 2.3 CallMe — split composition (P2)
**Before:** second 3-column card grid immediately after Pillars.
**After:** Split layout — descriptive copy + CTA on the left, a **small instrument/diagram panel** on the right (reuse the hairline Thread motif, or a compact "call flow" diagram). Kills the repeated card family and adds a second layout type.
- Keep the `Realtime Voice AI / Enterprise Controls / Workflow Integration` content, just re-presented.

### 2.4 Proof & evidence layer — NEW, on-brand (P2)
**Before:** none.
**After:** A single, dense "Proof" band that is *not* a fake SaaS logo wall, placed directly under the Pillars band (trust lives under the hero, but as evidence not names — per design-taste §"logo wall under hero"). Content to source from the product:
- **Verified metrics row** (hairline table): e.g. "2–4 week pilot", "audit-grade logs", "DPDP-first", "India data residency" — presented as a measured spec table, not badges.
- **Verification/governance** cards repurposed into the industrial spec format (from the dead `VerificationPanel`/`CapabilityMatrix` — see §3).
- **Why non-generic:** numbers, not logos; precision, not "trusted by" vanity.

### 2.5 Contact / FAQ / Final CTA — unify + tighten (P2)
- **ContactPanel** keeps the accessible form (label-above, inline errors, honeypot, aria-live) — do not regress. Just align it to the sharper surface spec.
- **FAQ** keeps the accessible `<details>` accordion — fine as-is.
- **FinalCTA** — replace the centered vaultAmber pill panel with a **full-width hairline-ruled closing band** (left-aligned display line + both CTAs), so conversion reads as a sign-off, not a box.
- **CTA labels — one per intent (P2):**
  - Contact/book intent → **`Book a working session`** everywhere (nav, hero, footer, final). Nav gets the same label.
  - Solutions intent → pick **one** of `Explore Solutions` / `See what we automate`. Recommend **`See what we automate`** (names the action). Use it in hero + final.
- Nav secondary becomes an inline text link instead of a second boxed button to keep single primary emphasis.

### 2.6 Footer — keep, tighten spacing to the new hairline rhythm (P3)

---

## 3. Code-level changes (the mechanical list)

| File(s) | Change |
|---|---|
| `app/globals.css` | Add `.font-display { font-family: var(--font-space-grotesk); }`; apply to `h1,h2,h3`. Add `prefers-reduced-motion` guards for new animation. |
| `components/ui/SignatureSVG.tsx` | **NEW** — the crafted, high-quality monochrome signature SVG, animated with Framer Motion (rotation + draw-on + scroll-linked). The hero centrepiece. |
| `components/ui/AIFabric.tsx` | **Retire as the hero visual** (replaced by `SignatureSVG`). Keep at most a subtle, near-static page-level grain/backdrop if desired, or delete. This kills the generic "blurred rotating blob" look. |
| `components/sections/Hero.tsx` | Recompose to asymmetric engineering hero (§2.1): headline ≤ 2 lines, reduced scale, `SignatureSVG` on the right, fits first viewport. |
| `components/sections/PillarsGrid.tsx` | Rebuild as asymmetric numbered spec band (§2.2). |
| `components/sections/CallmeSection.tsx` | Rebuild as split layout (§2.3); use a crafted SVG or mono AI image block. |
| `components/sections/FinalCta.tsx` | Rebuild as hairline full-width closing band (§2.5). |
| `app/page.tsx` | Compose: Hero → Pillars → Proof → CallMe → Contact → FAQ → FinalCTA. |
| `public/images/*` | **NEW** — AI-generated professional imagery, desaturated/graded to the mono palette, used as backgrounds / split blocks (see §2.1b). |
| `components/sections/TrustRibbon.tsx` | **Revive** into the Proof band (§2.4) or delete. |
| `components/sections/VerificationPanel.tsx`, `CapabilityMatrix.tsx` | **Wire in** (industrial spec format) for the proof/governance layer, or delete. |
| `components/sections/UseCaseRail.tsx`, `EcosystemMesh.tsx`, `EcosystemMarquee.tsx`, `EcosystemCommandStrip.tsx` | **Delete** (dead code) unless scoped into the proof layer. |
| `lib/site-navigation.ts` | Unify CTA label to `Book a working session` everywhere; choose one solutions label; update `PRIMARY_NAV_LINKS` wording. |
| `lib/seo.ts` | Reframe title/desc/OG to "AI company that builds AI systems" (drop "AI Operating System" phrasing). |
| `README.md`, `docs/*` | Sweep drift (GSAP/Rive/Vitest claims no longer true). |

---

## 4. Staged delivery + verification gates

Each stage ships only after **RED + GREEN** evidence and a fresh `verify_evidence` entry, and after an `adversarial_eval ≥ 7.0` on the touched surface. All commits use Conventional Commits.

| Stage | Scope | Exit criteria |
|---|---|---|
| **0. Baseline** | (already done) | typecheck ✅ / lint ✅ / a11y-100 / BP-100 / SEO-100 |
| **1. Typography system** | `globals.css` `.font-display` + apply to headings; fix weight discipline (400–600) | Every live h1/h2/h3 = Space Grotesk; Inter for body; lint+typecheck pass; no layout shift from font swap |
| **2. Signature SVG asset** | Design + build the crafted monochrome `SignatureSVG` (Framer Motion: rotation + draw-on + scroll-linked) | On-brand, hairline, mono; reduced-motion → static; `adversarial_eval ≥ 7.0` on the asset |
| **3. Hero recompose** | `Hero.tsx` with `SignatureSVG`; headline ≤ 2 lines, reduced scale, fits first viewport | Headline ≤ 2 lines; hero fits first viewport; CTAs visible; no a11y regression |
| **4. AI imagery assets + integrate** | Generate professional images, desaturate/grade to mono, insert as section backgrounds / split blocks (see §2.1b) | On-brand subject (industrial, not robot/brain); mono-graded; under hero + at least one split block; also a11y-100 |
| **5. Section recomposition + CTA labels** | Pillars / CallMe / FinalCTA / nav CTA wording | No two identical 3-col card grids; one label per intent (`Book a working session`); a11y-100 |
| **6. Proof layer** | Revive/wire TrustRibbon + VerificationPanel + CapabilityMatrix (industrial spec) | Evidence band under pillars with placeholder slots; no fake-SaaS logo wall; a11y-100 |
| **7. Cleanup** | Delete dead components; drop unused font payload; docs sweep | `npx tsc --noEmit` pass; `npx eslint .` pass; `npm run build` pass; bundle leaner |

---

## 5. What we will NOT do (guardrails)

- **No** purple/blue/neon gradients, glassmorphism, `backdrop-blur` flood, `rounded-2xl/3xl` everywhere, `shadow-lg`.
- **No** generic swirling "thread"/flowing-line strips, blurred rotating blobs, holographic brains, robot 3D renders, bouncy SaaS scroll animations. (Crafted, on-brand SVG and mono-graded AI imagery **are** allowed — the clichés are not.)
- **No** generic marketing fluff ("transform / revolutionize / unlock the power / seamlessly integrate"). No "Get Started". CTAs name the action.
- **No** fake SaaS logo walls, fake test scores, or "trusted by" vanity. Proof = numbers + verified controls (placeholder slots for now).
- **No** new accent color. Strictly `#FAFAFA / #111111 / #EAEAEA / #666666` — and **AI imagery is graded to this mono palette**, never full-colour.
- **No** mixed-font families for emphasis; no serif injection; no Fraunces/Instrument_Serif.
- **No** change to route slugs, IA, or primary nav labels (nav CTA *wording* unified to `Book a working session` only — route unchanged).
- **No** regressions: skip-link, focus rings, contrast, reduced-motion, aria-live, honeypot, DPDP/security headers.

---

## 6. Decisions

**Resolved:**
1. **No new font.** Two-font contract kept (Space Grotesk display + Inter body). Instrument feel via tracking micro-type.
2. **Crafted SVG + AI imagery** for the hero/visual layer (not generic threads/blobs).
3. **Proof band = placeholder slots** (no invented metrics).
4. **Nav/contact CTA = `Book a working session`** (replaces `Talk to us`); one solutions label.
5. **Signature SVG concept = Machine cross-section** — layered angular plates, fasteners, gears; half-technical / half-abstract.
6. **AI image subjects = Macro machine detail** — machined metal, wires, circuitry-as-texture; all graded to mono.
7. **Hero layout = Asymmetric split** — text left, signature SVG right.
8. **World = "The Control Surface"** — the page is the operator's console of a machine-building company (chassis frame + corner ticks + title block + sub-panels + live gauge + sparse mono telemetry).
9. **Positioning = AI company that *builds* AI systems** — reframe copy/SEO so Laxvish reads as the AI *company* engineering systems for enterprises, **not** "an operating system." Includes updating the SEO title / meta (`lib/seo.ts`) accordingly.

---

*End of plan. Stage 0 is verified. Awaiting your read + the open decisions before Stage 1 (typography), which then unlocks Stages 2–4.*
