interface VerificationSignal {
  title: string;
  metric: string;
  accent: "cyan" | "amber";
}

const signals: VerificationSignal[] = [
  {
    title: "PII Guard Active",
    metric: "96.4% sensitive payloads masked pre-routing",
    accent: "cyan",
  },
  {
    title: "Hallucination Checks Running",
    metric: "1,248 output validations in the last 24h",
    accent: "amber",
  },
  {
    title: "Compliance Ledger Synced",
    metric: "100% governance events appended and traceable",
    accent: "cyan",
  },
];

export function VerificationPanel() {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vaultAmber">
          Operational Trust · Live Telemetry
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
          Operational Trust, Live.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/70">
          Verification isn&apos;t a sidecar. It runs as a continuous signal layer
          across every critical workflow.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {signals.map((signal) => (
          <article
            key={signal.title}
            className="rounded-2xl border border-vaultAmber/20 bg-voidSurface p-6 transition-all duration-500 hover:border-vaultAmber/50 hover:bg-mist/30"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-charcoal">{signal.title}</h3>
              <span
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${ signal.accent === "cyan" ? "border-vaultAmber/40 text-vaultAmber" : "border-[#C46B4E]/40 text-[#C46B4E]" }`}
              >
                Live
              </span>
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-charcoal/70">{signal.metric}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
