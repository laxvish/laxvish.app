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
            className="rounded-full border border-vaultAmber/30 bg-voidSurface px-4 py-2 font-mono text-xs text-charcoal/80 sm:px-5 sm:text-sm"
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
    <section className="border-y border-vaultAmber/15 bg-obsidian">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-vaultAmber">
          Ecosystem Pathways
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
          Ecosystem Pathways, Flowing as One Neural Fabric
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
          Laxvish aligns enterprise systems, public rails, and verification loops
          into one continuously orchestrated signal network.
        </p>

        <div className="mt-10 space-y-4">
          <MarqueeLane items={laneA} />
          <MarqueeLane items={laneB} reverse />
        </div>
      </div>
    </section>
  );
}
