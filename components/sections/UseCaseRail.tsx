interface UseCase {
  title: string;
  summary: string;
  outcome: string;
}

const useCases: UseCase[] = [
  {
    title: "MSME Dispute Resolution",
    summary:
      "Route case intake, classify issue patterns, and prioritize interventions with explainable logic.",
    outcome: "Outcome: Faster triage with lower manual escalation load",
  },
  {
    title: "AYUSH Health Ops",
    summary:
      "Support structured follow-up workflows and multilingual patient operations with consistent playbooks.",
    outcome: "Outcome: Better service continuity across distributed teams",
  },
  {
    title: "Logistics Exception Control Tower",
    summary:
      "Track anomalies, trigger guided interventions, and coordinate exception handling in near real-time.",
    outcome: "Outcome: Reduced exception cycle time and SLA slippage",
  },
];

export function UseCaseRail() {
  return (
    <section id="agents" className="border-y border-white/5 bg-black/25">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-3xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-4xl">
          Built for Real-World Indian Enterprise Workloads
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-800 bg-charcoal/60 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">{item.summary}</p>
              <p className="mt-4 text-xs font-medium text-vaultAmber">
                {item.outcome}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
