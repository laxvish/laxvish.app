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
      <h2 className="text-3xl font-bold text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-4xl">
        One Platform. Three Control Planes.
      </h2>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {capabilityCards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-charcoal/20 bg-[#F6F1F1]/30 p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neonCyan">{card.title}</h3>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  card.accent === "cyan" ? "bg-neonCyan" : "bg-vaultAmber"
                }`}
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
