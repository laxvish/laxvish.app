# ANTI-SLOP REMEDIATION FLOWCHARTS

> If the recognition engine flags a 60-ban violation, the remediation flowcharts below tell you exactly how to redesign the artifact so the violation is gone and the world/main story/protag/vocabulary become clear.

Each section begins with: **Trigger → Question → Action**.

---

## Violation Group A: Color & Visual Treatment

### A1. Purple → Blue Gradient
> **Trigger:** Linear gradient between violet/indigo/blue used as primary identity.
>
> **Question:** *Why is the brand violet? If the answer is "because AI templates pick violet," the gradient must go.*
>
> **Action:**
> 1. Pick a world that justifies a single dominant hue (the *Laxvish substitute*: a cinematic Indian enterprise backbone uses `#9B8EC7` Lavender Indigo as a *mark*, not as a gradient).
> 2. Replace the gradient with **a single solid color** for the brand mark.
> 3. Keep the gradient only if the world has a single, specific reason (e.g., a sunset over a foundry; a thermal map of a vulcanization process).

### A2. Indigo/Violet Glow Blobs
> **Trigger:** `radial-gradient(...)` behind hero content.
>
> **Question:** *Does the bloom have a physical meaning or is it decorative?*
>
> **Action:**
> 1. Remove all `radial-gradient` decorative glows.
> 2. If a bloom is structurally required, use a **layered halftone**, **a pen-plotter cross-section**, **a fractured stone surface**, or **a printed circuit pattern** — never a smooth blur.

### A3–A4. Gradient Text / Gradient Buttons
> **Trigger:** Headlines or CTAs use `bg-clip-text` or `linear-gradient` purely for visual variety.
>
> **Question:** *Is the gradient a typographic device (e.g., a thermograph of metal under stress) or just decoration?*
>
> **Action:** Replace with solid color and add *typographic detail* instead (kerning adjustments, ligature, variable weight, chamfered letterforms, engraved metal monogram).

---

## Violation Group B: Cards

### B1. Three Identical Feature Cards
> **Action:** Replace with **three different presentation modes**.
> Example: feature 1 is a numbered paragraph block, feature 2 is a quoted testimonial in serif, feature 3 is a labeled data table. Different rhythms, different shapes, different paddings.

### B2. Every Card Has `rounded-2xl`
> **Action:**
> 1. Audit: pick ONE corner radius for the page (e.g., `rounded-none` for editorial / `rounded-sm` for utilitarian / `rounded-full` for tactile).
> 2. Apply consistently.
> 3. Mix is allowed only when one component has a documented reason (e.g., buttons `rounded-full`, cards `rounded-sm`, inputs `rounded-none`).

### B3. Glassmorphism / Backdrop-Blur
> **Trigger:** `backdrop-blur-*` on > 2 components.
>
> **Action:** Replace glass with *an actual glass metaphor* only where necessary (a real settings panel above a media stream). For everything else, use **a documented surface** (vellum sheet, metal sheet, parchment, blueprint paper).

### B4. Border + Rounded-2xl + Shadow-lg on Every Card
> **Action:** Establish **one card system** with a documented variation matrix (`{padded | compact}`, `{structured | conversational}`, `{executive | utility}`), each pinned to a different brand metaphor.

---

## Violation Group C: Typography

### C1. Inter / Poppins / Geist / Space Grotesk / Roboto
> **Action:** Stop importing them. Use `next/font/google` to load the two binding families only: **Cormorant Garamond** (display) and **JetBrains Mono** (UI / data). Re-style all UI accordingly.

### C2. Huge 64–96px Centered Hero Headline
> **Action:** Switch to **editorial split hero** (left-aligned editorial column + asymmetric visual anchor). Reduce H1 to `clamp(2.25rem, 5.5vw, 5.5rem)`.

### C3. Heavy `font-bold` / `font-extrabold` Headlines
> **Action:** Use **variable weight 300–500** in display. Heavy bold only at *decision moments* (CTA, call-out).

### C4. ALL-CAPS Tiny Labels Above Every Section
> **Action:** Cap section labels at `ceil(sectionCount / 3)`. Make the eyebrows *meaningful*, not generic.

---

## Violation Group D: Layout

### D1. Centered Hero
> **Action:** Use **editorial split** or **editorial manifesto** layout.

### D2. SaaS Template Sequence
> **Action:** Reorder the section narrative. The Laxvish standard: **Genesis → Flagship artifacts → Living network → OS zoom-out → Constellation → Contact**. Strictly bound, never default.

### D3. Three Columns / Three Steps / Alternating Left/Right
> **Action:** Vary the column count: 2 here, 5 there, 1 here, 4 there. Avoid the 3-up trio unless the content is genuinely 3-fold (legislative pillars are 3-fold; "how it works" usually isn't).

---

## Violation Group E: Components

### E1. Generic CTAs ("Get Started" / "Learn More")
> **Action:** Replace with a **product-specific verb** that names the actual action:
> - Laxvish: "Book a working session", "Talk to our team", "See what we automate", "See a real run".
> - Each page should have one such per page section.

### E2. Lucide Icons
> **Action:** Allow-list libraries (priority order): Phosphor → HugeIcons → Radix → Tabler. Lucide is *not* in the allow-list.

### E3. Pill-Shaped Badges Everywhere
> **Action:** Audit. Pick **one badge shape** per project and apply consistently.

---

## Violation Group F: Animation

### F1. Fade-Up On Scroll (`opacity: 0 → 1 + translateY(20px)`)
> **Action:** Replace with one of:
> 1. **Inertia spring** (`stiffness: 180-200, damping: 20-25`).
> 2. **Slow fade** (700–1200ms) with no translation.
> 3. **Stillness** + 1 subtle kinetic element drawing the eye.
>
> Apply scene-by-scene rather than mechanically.

### F2. Hover Scale 1.05
> **Action:** Use **a single property meaningfully** on hover (color shift, line draw, border weight, tactile push). No uniform scale.

### F3. Floating Gradient Blobs
> **Action:** Delete entirely. Re-spend the visual budget on the protagonist or silence.

---

## The 9 Worlds Reference (When Stuck)

When you cannot name a world, pick from this list:

1. **1960s Swiss aerospace blueprint drafting board.** Hairline rules, monospace telemetry, metric scale ticks, no gradient.
2. **Rajasthani stone observatory (Jantar Mantar).** Concentric rings, sundial shadows, analog pressure gauges, lithographic prints.
3. **Industrial risograph poster printer.** 4-color halftone overlap, off-register prints, dense ink coverage.
4. **Maritime navigation chart.** Solid plates, latitude and longitude, radar terminology, plotted course lines.
5. **Mechanical typewriter ribbon changelog.** Strikethrough editing, line-numbered, justified ragged-right text.
6. **PCBA / oscilloscope schematic.** Strict orthogonal traces, SMD packages, pin breakouts, differential impedance annotations.
7. **Mid-century Swiss newspaper editorial.** Cormorant display, mono captions, two-column body, classification boxes, drop caps.
8. **Cabinetmaker's atelier.** Texture of oak and ash, dovetail joints, hand-stamped maker marks, real wood.
9. **Atomic helium core.** Probability density shells, electron clouds, nucleons, isotope half-life table.

Pick one. Commit. Resist mixing.

---

## When Even This List Can't Help

If you ship a surface that still feels like "any AI template," the answer is almost always one of these:

1. **You forgot to name the world.** Go back to Step 1.
2. **You forgot the protagonist.** Go back to Step 2.
3. **You lost the stranger test.** Go back to §3.
4. **You reused a default font or palette in a moment of hurry.** Go back to §1 Axiom 4.
5. **You applied a 60-ban without reading the rationale behind it.** Read the ban, not just the rule.

**Default never ships.**
