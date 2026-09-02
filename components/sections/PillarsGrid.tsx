"use client";

// ============================================================================
// EDITORIAL PILLARS :: Three-Column Editorial Landing
// World: 1960s Swiss aerospace blueprint drafting board.
// Geometry: ruled editorial sheets, not rounded cards. No shadow, no border-radius.
// Each pillar is a numbered editorial paragraph, not a card.
// ============================================================================

interface Pillar {
  number: string;
  benefit: string;
  name: string;
  body: string;
  href: string;
  metric: { k: string; v: string }[];
}

const pillars: Pillar[] = [
  {
    number: "I",
    benefit: "The work gets done",
    name: "Workers",
    body:
      "Specialist AI workers trained on one specific job each: answering customer questions, processing invoices, qualifying sales leads. They run on your rules, your tone, your policy. They do not drift.",
    href: "/workers",
    metric: [
      { k: "Domain workers", v: "13 functional pillars" },
      { k: "Uptime", v: "24/7 / never on leave" },
      { k: "Override", v: "human at any step" },
    ],
  },
  {
    number: "II",
    benefit: "You stay in control",
    name: "Brain",
    body:
      "One coordinating layer that routes the right work to the right worker, keeps you informed of every action, and surfaces anything unusual before it goes anywhere important. No black boxes.",
    href: "/brain",
    metric: [
      { k: "Routing", v: "context-aware" },
      { k: "Visibility", v: "every step logged" },
      { k: "Circuit breakers", v: "policy-driven" },
    ],
  },
  {
    number: "III",
    benefit: "It stays safe and compliant",
    name: "Brakes",
    body:
      "Every commitment an AI worker makes is checked before it goes anywhere irreversible. Anything uncertain is escalated to a human. Every action is logged for your compliance officer. Built for DPDP from day one.",
    href: "/brakes",
    metric: [
      { k: "Verification", v: "pre-commitment" },
      { k: "Audit trail", v: "immutable ledger" },
      { k: "Compliance", v: "DPDP, RBI-ready" },
    ],
  },
];

export function PillarsGrid() {
  return (
    <section
      id="the-os"
      className="relative z-10 mx-auto w-full max-w-[1440px] border-y border-rule-hair px-6 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32"
    >
      {/* Editorial header */}
      <header className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Chapter 03 — The Operating System
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            The work gets done.<br />
            You stay in control.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <p className="max-w-md text-base leading-relaxed text-deepink/75 sm:text-lg">
            Every Laxvish deployment runs on three layers. The first does the work.
            The second keeps you in the loop. The third keeps it safe. The names
            are old engineering vocabulary: Workers, Brain, and Brakes.
          </p>
        </div>
      </header>

      {/* Three pillars as numbered editorial entries — NOT cards, NOT rounded, NOT shadowed */}
      <ol className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <li key={pillar.name} className="flex flex-col border-t border-deepink/30 pt-6">
            {/* Roman numerals + benefit short tag */}
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.18em]">
              <span className="font-medium text-deepink">{pillar.number}</span>
              <span className="text-deepink/55">{pillar.benefit}</span>
            </div>

            {/* Pillar name as the editorial title */}
            <h3 className="mt-6 font-serif text-3xl font-normal leading-tight tracking-tight text-deepink">
              {pillar.name}
            </h3>

            {/* Pillar body */}
            <p className="mt-5 max-w-sm text-base leading-relaxed text-deepink/75">
              {pillar.body}
            </p>

            {/* Inline editorial metric table — never a card */}
            <dl className="mt-8 grid grid-cols-3 gap-x-3 border-t border-rule-hair pt-4">
              {pillar.metric.map((m) => (
                <div key={m.k}>
                  <dt className="font-mono text-[9px] tracking-[0.18em] text-deepink/55 uppercase">
                    {m.k}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[11px] font-medium leading-tight text-deepink">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Direct deep-link */}
            <a
              href={pillar.href}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.16em] text-mark uppercase transition-colors hover:border-deepink hover:text-deepink"
            >
              <span>Read {pillar.name} chapter</span>
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
