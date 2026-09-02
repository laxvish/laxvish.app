# DIRECTOR'S TREATMENT — LAXVISH.APP
### "The Thread" — a one-reel feature for the Indian enterprise

> Genre: industrial science-documentary meets mythic origin story.
> Audience: founders, COOs, CXOs, IT/operations heads at 50–2000 employee Indian companies.
> The emotional contract, stated plainly:
> **"You have a messy business. This machine makes it calm — and a human still holds the brakes."**

---

## 0. THE EMOTIONAL SPINE (the beats the film must hit, in order)

| Beat | Emotion | Scene | Current state |
|---|---|---|---|
| 1. Cold open | Awe + precision | Hero — Precision Astrolabe | STRONG, hold |
| 2. The seed | Wonder | Genesis — Atomic Helium Core | STRONG, hold |
| 3. The five tasks | Relief (tension → resolution) | Five flagship artifacts | STRONG scenes, WEAK frames (montage variation needed) |
| 4. The continent | Aliveness | Living Network — NIXI bus | STRONG, hold |
| 5. The zoom-out | Scale + inevitability | OS Reveal — Ziggurat Cathedral | STRONG, hold |
| 6. The people | Trust + honesty | Process notes, FAQ, contact | Copy STRONG; frames flat in places |
| 7. The invitation | Welcome | Final CTA + footer signature | STRONG, hold |

The film has a soul. The problem is not the scenes — it is the **cutting and the series**.

---

## 1. THE DIRECTOR'S VERDICT

> **The feature film (home) is 70% shot. The series (every deep route) is 40% shot — and the series is where the slop physically lives.**

Deep routes (workers, brain, brakes, security-trust, about, privacy, terms, contact, solutions) share one template: `PageHero` + `PageBlocks`. That template still contains
surviving AI tells that the home-page pass removed:

- `rounded-full bg-vaultAmber` dot bullets (decorative dots, banned)
- `group-hover/grid:opacity-30` dim-sibling hover (mechanical hover theater)
- uniform 3-column grids repeated 4× per page (three-column default)
- `Step 01` eyebrows above every step (numbered-eyebrow flood)
- centered CTA panel asking twice (primary + "Contact Us" duplicate contact intent)
- `rounded-2xl` cards + "Learn more →" on `/solutions` (banned CTA copy that the audit's capitalization check misses)
- Every route opens with the same title card (`eyebrow + H1 + summary`)

The audience never notices the scenes on these routes. They notice that *every route feels like the same route*.
That sameness is the slop. This treatment kills the sameness, not the content.

---

## 2. CUT LIST — CHANGE (what we re-shoot)

| # | Scene | Change | Why (cinematic + anti-slop) |
|---|---|---|---|
| C1 | `PageBlocks.tsx` (all deep routes) | Kill dot bullets, kill dim-sibling hover, break 3-col monotony (mixed widths, ledger rows, timeline), replace centered CTA panel with asymmetric editorial close, single primary CTA | The series must read as instruments, not templates |
| C2 | `PageHero.tsx` | Optional per-route datum stamp (each route opens like a different instrument panel); EditorialReveal discipline (yOffset ≤ 8, no 20px shifts) | Every chapter gets its own establishing shot |
| C3 | `/solutions` | Replace `rounded-2xl` cards + "Learn more →" with a 13-row capability ledger: mono index numerals, real links, hairline draw-on hover, varied column bands | Kill the last physical slop; a catalog, not a card wall |
| C4 | `Footer.tsx` + `FOOTER_GROUPS` | 3 link groups (What we automate / Platform & Trust / Company), brand band above, signature strip below | AGENTS.md §3.10: footer is 2–3 columns, not 4 |
| C5 | `FeaturedAgentsShowcase.tsx` | Montage rhythm: vary metric row widths (2/3/4), vary the artifact frame (one bleeds edge-to-edge, one datum-cornered, one inside a drawer) | Five scenes, five shot sizes — montage needs variation |
| C6 | `HeroAstrolabe.tsx` | One micro human-signature: an operator's initials in a telemetry corner ("OPS // S.K.") | The machine was built by a person; a blueprint carries a signature |
| C7 | `HowItWorks.tsx` | Frame the weeks as a dossier: running datum rule, large Cormorant numerals, asymmetric column widths | The most honest copy on the site deserves a frame with gravity |
| C8 | CTA naming | One contact-intent label across all non-form CTAs: "Book a working session". Form submit buttons keep their action label ("Request pilot", "Apply") | No duplicate CTA intent on any page |

---

## 3. HOLD LIST — what we do NOT touch

- Hero copy, telemetry language, `HeroAstrolabe` mechanics (spoke geometry, gimbals, vernier, hubs)
- All five artifact scene engines + phase machines (they are the crown jewels — already approved)
- `GenesisPrologue` core, `LivingNetworkStage` visuals, `SystemRevealPayoff` ziggurat
- Brand palette (4 colors), fonts (Cormorant Garamond + JetBrains Mono), the 15 irreducible bans
- All copy that has real claims (96.4%, 1.4s, ₹1,46,320, Dr. Rao's EMR slot, honest-caveat blocks)
- Route slugs, nav labels, IA, SEO metadata, form field names
- The 23/23 anti-slop audit, `tsc`, and `npm run build` must stay green
- Mobile-first: every change must hold at 360px and at 1440px

**Stranger test for every change:** if a stranger could paste another AI-SaaS name over this route and the page still makes sense, the cut failed.

---

## 4. ROUTE-BY-ROUTE ESTABLISHING SHOTS (the series)

Every deep route opens with the same title card today. New datum stamps give each route its own instrument:

| Route | Instrument | Datum stamp (mono, under eyebrow) |
|---|---|---|
| `/workers` | Crew manifest | `CREW MANIFEST // 08 DOMAIN MODULES` |
| `/brain` | Orchestration layer | `ORCHESTRATION LAYER // LIVE` |
| `/brakes` | Governor | `GOVERNOR // ENFORCEMENT LIVE` |
| `/security-trust` | Vault | `VAULT // DPDP + ISO POSTURE` |
| `/about` | Ledger of origin | `ORIGIN LEDGER // FOUNDED 2025` |
| `/privacy`, `/terms` | Quiet dossier | `DOSSIER // LEGAL BINDING` |
| `/contact` | Open channel | `CHANNEL // RESPONSE < 1 DAY` |
| `/solutions` | Catalog | `CATALOG // 13 CAPABILITIES` |
| `/careers/apply` | Recruitment desk | `RECRUITMENT // OPEN ROLES` |

Stamps are small, mono, ink-toned — never badge-shaped, never pill-shaped, never animated.

---

## 5. ANTI-SLOP GUARDRAILS FOR THIS PRODUCTION (the bans we re-affirm)

1. No new colors, no gradients, no glow, no blur, no glassmorphism, no `rounded-2xl` — anywhere.
2. No new perpetual motion. Motion is pacing: a line draws, a frame breathes, a datum ticks. Nothing floats forever.
3. No fade-up-on-scroll defaults: only `EditorialReveal` (≤ 8px, 700–1000ms) and the phase machines.
4. No hover:scale, no dim-sibling theater. Hover changes one meaningful property (line draw, border weight, ink color).
5. No decorative dots. A dot only exists if it carries a state.
6. No em-dashes. No italic-serif-in-mono. No ALL-CAPS label above every section (stamps are selective).
7. No duplicate CTA intent on a page. One contact-intent label: "Book a working session".
8. Every deep route must differ from every other deep route in at least two of: column count, section order, frame treatment, datum stamp.
9. Cards exist only where elevation communicates hierarchy. Prefer ruled rows, ledgers, timelines, and negative space.
10. The stranger test runs on every route before the take is printed.

---

## 6. VERIFICATION (before print)

1. `bash scripts/audit-anti-slop.sh` → 23/23 PASS
2. `npx tsc --noEmit` → clean
3. `npm run build` → 0 errors
4. CDP walk of home + `/solutions` + `/workers` + `/brakes` at desktop and 360px mobile
5. Commit conventional, push to `main`

*End of treatment. The film is approved to shoot.*