# ANTI-SLOP REFERENCE CATALOG

> Reference appendices for the **design-taste-anti-slop** skill. Returned from the recognition table.

## A. Color & Visual Treatment (8)

| # | Ban | Distinguishing Fingerprint |
|---|---|---|
| 1 | Purple → blue gradient as primary visual | The repeated `#6366F1 → #8B5CF6` or `#A78BFA → #60A5FA` combination. |
| 2 | Indigo/violet glow blobs behind hero | `radial-gradient(..., rgba(99,102,241,...), ...)` + `blur(>20px)`. |
| 3 | Gradient text on headline for no reason | `bg-gradient-to-r bg-clip-text text-transparent` on H1 with one brand color. |
| 4 | Gradient buttons | `bg-gradient-to-r from-X to-Y` on `<button>` or `<a>`. |
| 5 | Every section using the same accent gradient | Same gradient declaration repeated 3+ times across sections. |
| 6 | Neon cyan/purple on dark | `#06b6d4`, `#22d3ee`, `#a855f7`, `#a78bfa` on `#0a0a0a`-class backgrounds. |
| 7 | Generic AI purple palette without brand reason | Tailwind `indigo-X`, `violet-X`, `purple-X` colors chosen as defaults. |
| 8 | Excessive color to make UI feel "exciting" | 4+ unique brand colors used per micro-component (status, badge, dot, etc.). |

## B. Cards (12)

| # | Ban |
|---|---|
| 9 | Everything is a card |
| 10 | Three identical feature cards in a row |
| 11 | Every card has `rounded-2xl` |
| 12 | Every card has `shadow-lg` |
| 13 | Every card has a `1px gray border` |
| 14 | Cards nested inside cards |
| 15 | Floating cards stacked over other cards |
| 16 | "Glass" cards with `backdrop-blur` |
| 17 | Semi-transparent cards because "glassmorphism looks modern" |
| 18 | Identical cards regardless of content |
| 19 | A colored vertical strip on the left of cards (`border-l-4`) |
| 20 | Cards floating with meaningless `translate-y` hover |
| 21 | Dashboard mockup as another giant floating card |

## C. Typography (10)

| # | Ban |
|---|---|
| 22 | Inter / Poppins / Geist / Space Grotesk / Roboto everywhere |
| 23 | Huge 64–96px centered hero headline by default |
| 24 | Heavy `font-bold` / `font-extrabold` on every headline |
| 25 | Every section heading following the same typography formula |
| 26 | Random italic serif word in a modern sans-serif headline |
| 27 | ALL-CAPS tiny labels above every section |
| 28 | Decorative monospace to scream "technical/AI" |
| 29 | Excessive letter-spacing on tiny labels |
| 30 | Every paragraph limited to the same narrow width |
| 31 | Generic phrases: "The future of / Powered by AI" |

## D. Layout (10)

| # | Ban |
|---|---|
| 32 | Centered hero (badge + H1 + paragraph + 2 buttons) |
| 33 | Exactly three columns for features |
| 34 | Exactly three steps for "How it works" |
| 35 | Alternating left/right feature sections repeated 3+ times |
| 36 | Giant centered dashboard screenshot under hero |
| 37 | Every section constrained to the exact same max-width |
| 38 | Excessive symmetrical layouts |
| 39 | Every section has enormous vertical padding |
| 40 | SaaS template sequence (Logo → Features → Testimonials → Pricing → FAQ → CTA) |
| 41 | Four-column footer because that's what SaaS sites do |

## E. Components (12)

| # | Ban |
|---|---|
| 42 | Stock shadcn/ui components left unmodified |
| 43 | Generic rounded buttons everywhere |
| 44 | "Get Started" as primary CTA regardless of product |
| 45 | Pill-shaped badges everywhere |
| 46 | "Trusted by innovative teams" logo strip |
| 47 | Generic testimonial cards |
| 48 | Three-column pricing table with glowing middle |
| 49 | Accordion FAQ copied across pages |
| 50 | Generic notification/toast animations |
| 51 | Stock avatar circles |
| 52 | Lucide icons used for literally everything |
| 53 | Emoji used as feature icons |

## F. Animation (8)

| # | Ban |
|---|---|
| 54 | Everything fades up on scroll (`opacity: 0 → 1 + translateY(20px)`) |
| 55 | Every animation lasts ~300ms |
| 56 | Every hover uses `scale(1.05)` |
| 57 | Buttons bounce on hover for no reason |
| 58 | Cards lift on hover for no functional reason |
| 59 | Staggered animations applied mechanically |
| 60 | Floating blobs moving infinitely in the background |

---

## When To Break The Rules (Rare)

For each violation, append a written rationale to the commit message.

| Ban | Acceptable Violation |
|---|---|
| Purple gradient | Only if brand is luxury wellness / heritage |
| Glass blur cards | Settings panel, floating media control |
| Three cards | Content demands three units (legislative, three-person team, three-tier plan) |
| Fade-up scroll | Single-page chronological narrative (milestones) |
| Inter font | Public-sector trust-first projects |

**No violation permissible without a rationale documented in the commit message.**
