interface StripMetric {
  label: string;
  value: string;
}

const stripMetrics: StripMetric[] = [
  { label: "Connected Ecosystem Nodes", value: "120+" },
  { label: "Governed Workflow Templates", value: "45" },
  { label: "Verification-First Coverage", value: "99.2%" },
];

export function EcosystemCommandStrip() {
  return (
    <section className="border-y border-charcoal/20 bg-[#F6F1F1]/10">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-neonCyan/90">
              Activation Layer
            </p>
            <h3 className="mt-3 text-2xl font-bold text-charcoal [font-family:var(--font-space-grotesk)] sm:text-3xl">
              Turn Ecosystem Complexity into Verified Execution
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stripMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-charcoal/20 bg-[#F6F1F1]/30 px-4 py-3"
              >
                <p className="text-lg font-semibold text-charcoal">{metric.value}</p>
                <p className="mt-1 text-xs text-charcoal/70">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-vaultAmber px-6 py-3 text-sm font-semibold text-charcoal transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Activate Ecosystem Pilot
            </button>
            <button
              type="button"
              className="rounded-full border border-neonCyan px-6 py-3 text-sm font-semibold text-neonCyan transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              View Integration Blueprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
