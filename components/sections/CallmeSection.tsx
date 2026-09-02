"use client";

// ============================================================================
// EDITORIAL FEATURE DOSSIER
// World: editorial white paper — three findings, no rounded cards, no pills.
// ============================================================================

import Link from "next/link";

interface CallmeFeature {
  index: string;
  title: string;
  description: string;
  metric: string;
}

const features: CallmeFeature[] = [
  {
    index: "01",
    title: "Answers calls naturally",
    description:
      "Speaks like a real person, understands accents, switches between English and Hindi mid-sentence. Your callers don&rsquo;t feel like they&rsquo;re talking to a robot.",
    metric: "Latency · 240 ms first byte",
  },
  {
    index: "02",
    title: "Stays inside your rules",
    description:
      "Every call is recorded and logged. Sensitive topics go straight to a human. You set which calls the AI handles and which it must transfer.",
    metric: "Override paths · 11",
  },
  {
    index: "03",
    title: "Works with what you have",
    description:
      "Connects to your phone system, your CRM, and your calendar. The AI can book appointments, update records, and hand off to your team when needed.",
    metric: "Connectors · telephony · CRM · calendar",
  },
];

export function CallmeSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] border-t border-rule-hair px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
      <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            CallMe — Voice & WhatsApp Receptionist
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            An AI receptionist that never puts anyone on hold.
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
          <p className="max-w-md text-base leading-relaxed text-deepink/75">
            Answer every phone call and WhatsApp message, in your
            customer&rsquo;s language, 24/7. Hand off to a human with the full
            conversation history when it matters.
          </p>
        </div>
      </header>

      {/* Three feature findings — typographic, NOT identical cards */}
      <ol className="mt-16 divide-y divide-rule-hair border-t border-rule-hair">
        {features.map((feature) => (
          <li
            key={feature.index}
            className="grid grid-cols-1 gap-y-3 py-10 lg:grid-cols-[5rem_1fr_2fr] lg:items-baseline lg:gap-x-10"
          >
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              Finding {feature.index}
            </span>
            <div>
              <h3 className="font-serif text-3xl font-normal leading-tight tracking-tight text-deepink">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-deepink/75">
                {feature.description}
              </p>
            </div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-deepink/55 uppercase">
              {feature.metric}
            </p>
          </li>
        ))}
      </ol>

      {/* Direct inline action — no rounded button */}
      <div className="mt-16 border-t border-deepink/30 pt-8">
        <Link
          href="/solutions/voice-whatsapp"
          className="inline-flex items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase transition-colors hover:border-deepink hover:text-deepink"
        >
          <span>Read the Voice & WhatsApp dossier</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
