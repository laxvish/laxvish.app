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
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-vaultAmber">
        The Living Intelligence Mesh
      </p>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
        The Intelligence Mesh Behind Enterprise Execution
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70">
        Every node is governed, every pathway is observable, and every action can
        be traced to business outcomes.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {meshCards.map((card) => (
          <article
            key={card.domain}
            className="rounded-2xl border border-vaultAmber/20 bg-voidSurface p-6 transition-all duration-500 hover:border-vaultAmber/40 hover:bg-white/5"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber/80">
              {card.domain}
            </p>
            <p className="mt-3 text-base font-medium text-charcoal">{card.signal}</p>
            <p className="mt-2 font-mono text-xs text-charcoal/70">{card.outcome}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.pathways.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-vaultAmber/25 bg-vaultAmber/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-charcoal/80"
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
