"use client";

// ============================================================================
// EDITORIAL MESH LIST
// World: a naval routing chart. Numbered paragraphs, no rounded cards, no pills.
// ============================================================================

interface MeshEntry {
  index: string;
  domain: string;
  signal: string;
  outcome: string;
}

const meshEntries: MeshEntry[] = [
  {
    index: "01",
    domain: "Citizen Service Stack",
    signal: "Multilingual intent + policy verification.",
    outcome: "Routing accelerated 43% across inbound cases — measured against pre-Laxvish baseline.",
  },
  {
    index: "02",
    domain: "Financial Operations",
    signal: "Exception clustering and controlled escalation.",
    outcome: "31% lower intervention latency on high-risk flows.",
  },
  {
    index: "03",
    domain: "Supply & Logistics",
    signal: "Delay prediction with SLA-aware orchestration.",
    outcome: "27% reduction in breach-prone exception queues.",
  },
  {
    index: "04",
    domain: "Health & AYUSH",
    signal: "Protocol-aware case handling and follow-up governance.",
    outcome: "More consistent service continuity across distributed teams.",
  },
];

export function EcosystemMesh() {
  return (
    <section className="mx-auto w-full max-w-[1440px] border-t border-rule-hair px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
      <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Ecosystem Pathways
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            The intelligence mesh behind enterprise execution.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-md text-base leading-relaxed text-deepink/75">
            Every node is governed. Every pathway is observable. Every action
            traces back to a business outcome. Below are the four lattice
            regions we currently operate.
          </p>
        </div>
      </header>

      <ol className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        {meshEntries.map((entry) => (
          <li key={entry.index} className="border-t border-deepink/30 pt-6">
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.18em]">
              <span className="font-medium text-mark">{entry.index}</span>
              <span className="text-deepink/55">{entry.domain}</span>
            </div>
            <p className="mt-5 font-serif text-xl leading-snug text-deepink sm:text-2xl">
              {entry.signal}
            </p>
            <p className="mt-4 max-w-md font-mono text-xs leading-relaxed tracking-wide text-deepink/65 uppercase">
              Outcome · {entry.outcome}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
