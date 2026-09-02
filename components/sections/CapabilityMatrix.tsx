interface CapabilityCard {
  title: string;
  points: string[];
  accent: "cyan" | "amber";
}

const capabilityCards: CapabilityCard[] = [
  {
    title: "Agent Execution",
    points: [
      "Domain workers for MSME, AYUSH, and logistics operations",
      "Task-level automation with explainable actions",
      "Operational handoff patterns for human review loops",
    ],
    accent: "cyan",
  },
  {
    title: "Orchestration Intelligence",
    points: [
      "Central coordination across multi-agent workflows",
      "Context-aware routing for enterprise process states",
      "Policy-driven sequencing to reduce agent sprawl",
    ],
    accent: "amber",
  },
  {
    title: "Verification & Compliance",
    points: [
      "Continuous validation checks before high-impact actions",
      "Trace-first governance signals for audit visibility",
      "DPDP-aligned operational controls by default",
    ],
    accent: "cyan",
  },
];

export function CapabilityMatrix() {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vaultAmber">
        Three Control Planes · One Platform
      </p>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
        One Platform. Three Control Planes.
      </h2>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {capabilityCards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-vaultAmber/20 bg-voidSurface p-6 transition-all duration-500 hover:border-vaultAmber/40 hover:bg-mist/30"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-charcoal">{card.title}</h3>
              <span
                className={`h-2.5 w-2.5 rounded-full ${ card.accent === "cyan" ? "bg-vaultAmber" : "bg-[#C46B4E]" }`}
              />
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-charcoal/70">
              {card.points.map((point) => (
                <li key={point} className="leading-6">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
