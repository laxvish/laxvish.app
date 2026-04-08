interface MeshCard {
  domain: string;
  signal: string;
  outcome: string;
  pathways: string[];
}

const meshCards: MeshCard[] = [
  {
    domain: "Citizen Service Stack",
    signal: "Multilingual intent + policy verification",
    outcome: "43% faster resolution routing across inbound cases",
    pathways: ["Bhashini", "Policy Gate", "Human Review"],
  },
  {
    domain: "Financial Operations",
    signal: "Exception anomaly clustering and controlled escalation",
    outcome: "31% lower intervention latency on high-risk flows",
    pathways: ["Ledger Events", "Risk Lens", "Audit Trail"],
  },
  {
    domain: "Supply & Logistics",
    signal: "Delay prediction with SLA-aware orchestration",
    outcome: "27% reduction in breach-prone exception queues",
    pathways: ["Telemetry", "SLA Guard", "Ops Escalation"],
  },
  {
    domain: "Health & AYUSH",
    signal: "Protocol-aware case handling and follow-up governance",
    outcome: "More consistent service continuity across distributed teams",
    pathways: ["Case Context", "Care Logic", "Supervisor Control"],
  },
];

export function EcosystemMesh() {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <h2 className="text-3xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-4xl">
        The Intelligence Mesh Behind Enterprise Execution
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400">
        Every node is governed, every pathway is observable, and every action can
        be traced to business outcomes.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {meshCards.map((card) => (
          <article
            key={card.domain}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-neonCyan/90">
              {card.domain}
            </p>
            <p className="mt-3 text-base font-medium text-white">{card.signal}</p>
            <p className="mt-2 text-sm text-vaultAmber">{card.outcome}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.pathways.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
