"use client";

// ============================================================================
// EDITORIAL TELEMETRY LEDGER
// World: aviation operations panel. No rounded cards. Just three numerical
// signal lines published as a typographic ledger.
// ============================================================================

interface VerificationSignal {
  title: string;
  metric: string;
}

const signals: VerificationSignal[] = [
  {
    title: "PII Guard Active",
    metric: "96.4% sensitive payloads masked pre-routing",
  },
  {
    title: "Hallucination Checks Running",
    metric: "1,248 output validations in the last 24h",
  },
  {
    title: "Compliance Ledger Synced",
    metric: "100% governance events appended and traceable",
  },
];

export function VerificationPanel() {
  return (
    <section className="mx-auto w-full max-w-[1440px] border-t border-rule-hair px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
      <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Operational Trust · Live Telemetry
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            Operational Trust, Live.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-md text-base leading-relaxed text-deepink/75">
            Verification isn&rsquo;t a sidecar. It runs as a continuous signal
            layer across every critical workflow. Three published numbers
            below.
          </p>
        </div>
      </header>

      <ol className="mt-16 divide-y divide-rule-hair border-t border-rule-hair">
        {signals.map((signal, i) => (
          <li
            key={signal.title}
            className="grid grid-cols-[4rem_1fr_auto] items-baseline gap-x-8 py-7"
          >
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
              {signal.title}
            </h3>
            <p className="font-mono text-[11px] tracking-[0.18em] text-deepink/65 uppercase">
              {signal.metric}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
