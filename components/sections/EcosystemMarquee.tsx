"use client";

// ============================================================================
// EDITORIAL PATHWAY LEDGER
// World: station archive — textual listing, never infinite-loop marquees.
// 16 enterprise pathways listed as a typographic catalog.
// ============================================================================

const publicRails: string[] = [
  "Bhashini",
  "UIDAI",
  "GSTN",
  "Open Network for Digital Commerce",
  "RBI Systems",
  "DigiLocker",
  "Account Aggregator",
  "UPI Rails",
];

const internalRails: string[] = [
  "ERP Connectors",
  "CRM Signals",
  "Policy Engines",
  "Gov Workflows",
  "Human Escalation",
  "Audit Pipelines",
  "Risk Scoring",
  "Case Orchestration",
];

export function EcosystemMarquee() {
  return (
    <section className="border-y border-deepink/15">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-24">
        <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              Ecosystem Pathways Index
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3rem)] font-normal leading-[1.04] tracking-tight text-deepink">
              Pathways, listed as they exist in the engine.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-md text-base leading-relaxed text-deepink/75">
              Laxvish aligns enterprise systems, public rails, and verification
              loops into one continuously orchestrated signal network. Below is
              the catalog of pathways currently maintained.
            </p>
          </div>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          <ol className="border-t border-rule-hair">
            <li className="border-b border-rule-hair py-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-deepink/55 uppercase">
                Public Rails
              </p>
            </li>
            {publicRails.map((name, i) => (
              <li
                key={name}
                className="flex items-baseline justify-between border-b border-rule-hair py-2.5"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-deepink/45 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 px-4 text-base text-deepink">{name}</span>
              </li>
            ))}
          </ol>

          <ol className="border-t border-rule-hair">
            <li className="border-b border-rule-hair py-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-deepink/55 uppercase">
                Enterprise Rails
              </p>
            </li>
            {internalRails.map((name, i) => (
              <li
                key={name}
                className="flex items-baseline justify-between border-b border-rule-hair py-2.5"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-deepink/45 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 px-4 text-base text-deepink">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
