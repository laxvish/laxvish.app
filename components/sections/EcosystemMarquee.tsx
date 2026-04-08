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
            className="rounded-full border border-neonCyan/45 bg-charcoal/75 px-4 py-2 text-xs text-gray-200 sm:px-5 sm:text-sm"
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
    <section className="border-y border-white/5 bg-black/25">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-2xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-3xl lg:text-4xl">
          Ecosystem Pathways, Flowing as One Neural Fabric
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
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
