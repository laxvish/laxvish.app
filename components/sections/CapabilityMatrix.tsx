"use client";

// ============================================================================
// EDITORIAL CAPABILITY LEDGER
// World: operations memorandum — numbered rules, no card surfaces, no pills.
// ============================================================================

interface CapabilityRule {
  index: string;
  domain: string;
  rule: string;
  evidence: string;
}

const rules: CapabilityRule[] = [
  {
    index: "01",
    domain: "Agent Execution",
    rule: "Domain workers for MSME, AYUSH, and logistics operations.",
    evidence: "Each worker is trained on one specific job; never generalist.",
  },
  {
    index: "02",
    domain: "Agent Execution",
    rule: "Task-level automation with explainable actions.",
    evidence: "Every action logged with rationale, timestamp, and human override path.",
  },
  {
    index: "03",
    domain: "Agent Execution",
    rule: "Operational handoff patterns for human review loops.",
    evidence: "Configurable thresholds route edge cases to the right human.",
  },
  {
    index: "04",
    domain: "Orchestration Intelligence",
    rule: "Central coordination across multi-agent workflows.",
    evidence: "Brain layer sequences and routes work between specialised workers.",
  },
  {
    index: "05",
    domain: "Orchestration Intelligence",
    rule: "Context-aware routing for enterprise process states.",
    evidence: "Routes based on CRM, ERP, HRIS state — not just keywords.",
  },
  {
    index: "06",
    domain: "Orchestration Intelligence",
    rule: "Policy-driven sequencing to reduce agent sprawl.",
    evidence: "Deterministic ordering when multiple workers are eligible.",
  },
  {
    index: "07",
    domain: "Verification & Compliance",
    rule: "Continuous validation checks before high-impact actions.",
    evidence: "Brakes gate every irreversible commitment.",
  },
  {
    index: "08",
    domain: "Verification & Compliance",
    rule: "Trace-first governance signals for audit visibility.",
    evidence: "Every action emits an immutable trail entry.",
  },
  {
    index: "09",
    domain: "Verification & Compliance",
    rule: "DPDP-aligned operational controls by default.",
    evidence: "Consent, retention, and red-pact rules built in from day one.",
  },
];

export function CapabilityMatrix() {
  return (
    <section className="mx-auto w-full max-w-[1440px] border-t border-rule-hair px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
      <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Operations Memorandum
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            Three control planes. One platform.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-md text-base leading-relaxed text-deepink/75">
            A complete enumeration — issued once, never silently changed — of
            every operational rule the Laxvish Thread will and will not do
            inside a customer enterprise.
          </p>
        </div>
      </header>

      {/* Numbered rules ledger — NO rounded card surfaces */}
      <div className="mt-16 border-t border-rule-hair">
        {rules.map((rule) => (
          <div
            key={rule.index}
            className="grid grid-cols-1 gap-y-3 border-b border-rule-hair py-7 lg:grid-cols-[5rem_1fr_2fr] lg:items-baseline lg:gap-x-10"
          >
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              {rule.index}
            </span>
            <div className="font-mono text-[10px] tracking-[0.18em] text-deepink/65 uppercase">
              {rule.domain}
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-deepink">
              {rule.rule}{" "}
              <span className="text-deepink/60">— {rule.evidence}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
