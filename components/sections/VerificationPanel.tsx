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
        <h2 className="text-3xl font-bold text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-4xl">
          Operational Trust, Live.
        </h2>
        <p className="mt-4 text-charcoal/70">
          Verification isn&apos;t a sidecar. It runs as a continuous signal layer
          across every critical workflow.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {signals.map((signal) => (
          <article
            key={signal.title}
            className="rounded-xl border border-charcoal/20 bg-[#F6F1F1]/30 p-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-charcoal">{signal.title}</h3>
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  signal.accent === "cyan"
                    ? "border-neonCyan/40 text-neonCyan"
                    : "border-vaultAmber/40 text-vaultAmber"
                }`}
              >
                Live
              </span>
            </div>
            <p className="mt-4 text-xs leading-5 text-charcoal/70">{signal.metric}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
