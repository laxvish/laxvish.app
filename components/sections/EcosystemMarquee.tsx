interface LaneProps {
  items: string[];
  reverse?: boolean;
}

function MarqueeLane({ items, reverse = false }: LaneProps) {
  const loopItems = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`marquee-track ${
          reverse ? "marquee-track-right" : "marquee-track-left"
        }`}
      >
        {loopItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-neonCyan/45 bg-charcoal/30 px-4 py-2 text-xs text-charcoal/80 sm:px-5 sm:text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const laneA: string[] = [
  "Bhashini",
  "UIDAI",
  "GSTN",
  "Open Network",
  "RBI Systems",
  "DigiLocker",
  "Account Aggregator",
  "UPI Rails",
];

const laneB: string[] = [
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
    <section className="border-y border-charcoal/20 bg-[#F6F1F1]/25">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-2xl font-bold text-charcoal [font-family:var(--font-space-grotesk)] sm:text-3xl lg:text-4xl">
          Ecosystem Pathways, Flowing as One Neural Fabric
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-charcoal/70 sm:text-base">
          Laxvish aligns enterprise systems, public rails, and verification loops
          into one continuously orchestrated signal network.
        </p>

        <div className="mt-8 space-y-4">
          <MarqueeLane items={laneA} />
          <MarqueeLane items={laneB} reverse />
        </div>
      </div>
    </section>
  );
}
