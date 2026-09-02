import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";

interface ProofRow {
  slot: string;
  value: string;
  detail: string;
}

/**
 * Placeholder rows — SLOT markers, not claims.
 *
 * Values marked "SLOT" are to be replaced with verified figures by the team.
 * Nothing here may be presented as a real measurement until it is (AGENTS.md
 * forbids invented precision and fake social proof).
 */
const proofRows: ProofRow[] = [
  {
    slot: "Pilot timeline",
    value: "SLOT — e.g. 2–4 weeks",
    detail: "From first working session to the AI system running on your real work.",
  },
  {
    slot: "Data residency",
    value: "India",
    detail: "Your data stays in India unless you tell us otherwise.",
  },
  {
    slot: "Decision logging",
    value: "Every decision",
    detail: "Audit-grade logs your compliance team can read, export, and keep.",
  },
  {
    slot: "Governance",
    value: "DPDP-first",
    detail: "Verification controls validate outputs and enforce your policies.",
  },
];

/**
 * Proof — the evidence band.
 *
 * A measured spec table (hairline rows, mono overline, no badges, no logo
 * wall). Reads as the machine's own certification sheet. Sits directly under
 * the Pillars band.
 */
export function ProofBand() {
  return (
    <section
      id="proof"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="grid gap-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-24">
        <div className="max-w-sm">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              Verification record
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.06] tracking-[-0.02em] text-charcoal">
              What the machine commits to.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              Not promises — the operating envelope of every Laxvish system. The
              numbers are on the record; if one is missing, we say so.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger>
          <ul className="border-t border-charcoal">
            {proofRows.map((row) => (
              <FadeIn key={row.slot}>
                <li className="grid grid-cols-1 gap-1 border-b border-charcoal/20 py-7 sm:grid-cols-[minmax(0,11rem)_minmax(0,12rem)_1fr] sm:gap-x-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neonCyan">
                    {row.slot}
                  </span>
                  <span className="text-lg font-normal tracking-tight text-charcoal">
                    {row.value}
                  </span>
                  <span className="text-sm leading-relaxed text-charcoal/70">
                    {row.detail}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
          <FadeIn delay={0.3}>
            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-neonCyan">
              Slots marked “slot” are filled with verified figures before launch.
            </p>
          </FadeIn>
        </FadeInStagger>
      </div>
    </section>
  );
}
