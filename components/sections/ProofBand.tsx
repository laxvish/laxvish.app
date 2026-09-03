import Image from "next/image";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";

interface ProofRow {
  slot: string;
  value: string;
  detail: string;
}

/**
 * Placeholder rows — SLOT markers, not claims.
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
 * Proof — the evidence band with tactile silicon verification imagery.
 */
export function ProofBand() {
  return (
    <section
      id="proof"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
    >
      <div className="grid gap-10 sm:gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <div className="flex flex-col justify-between max-w-sm">
          <div>
            <FadeIn>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
                Verification record
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 sm:mt-5 text-[clamp(1.85rem,3.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                What the machine commits to.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 sm:mt-5 text-base leading-relaxed text-charcoal/70">
                Not promises — the operating envelope of every Laxvish system. The
                numbers are on the record; if one is missing, we say so.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.25} className="mt-8">
            <div className="relative overflow-hidden border border-charcoal/20 bg-vaultAmber group">
              <Image
                src="/images/verification-wafer-macro.png"
                alt="Laser-etched serial numbers and silicon wafer microcircuitry"
                width={800}
                height={450}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="flex items-center justify-between border-t border-charcoal/10 bg-obsidian/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neonCyan">
                <span>FIG. 02 / VERIFICATION LEDGER</span>
                <span>DPDP</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeInStagger className="flex flex-col justify-center">
          <ul className="border-t border-charcoal">
            {proofRows.map((row) => (
              <li
                key={row.slot}
                className="border-b border-charcoal/20 py-5 sm:py-6"
              >
                <FadeIn>
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[minmax(0,10rem)_minmax(0,12rem)_1fr] sm:gap-x-8 sm:items-baseline">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neonCyan">
                      {row.slot}
                    </span>
                    <span className="text-base sm:text-lg font-normal tracking-tight text-charcoal">
                      {row.value}
                    </span>
                    <span className="text-sm leading-relaxed text-charcoal/70 mt-0.5 sm:mt-0">
                      {row.detail}
                    </span>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
          <FadeIn delay={0.3}>
            <p className="mt-5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-neonCyan">
              Slots marked “slot” are filled with verified figures before launch.
            </p>
          </FadeIn>
        </FadeInStagger>
      </div>
    </section>
  );
}
