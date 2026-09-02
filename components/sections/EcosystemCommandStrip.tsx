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
    <section className="border-y border-vaultAmber/20 bg-voidSurface/40">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vaultAmber">
              Activation Layer
            </p>
            <h3 className="mt-3 text-2xl font-normal tracking-tight text-charcoal sm:text-3xl">
              Turn Ecosystem Complexity into Verified Execution
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stripMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-vaultAmber/20 bg-voidSurface px-4 py-3"
              >
                <p className="text-lg font-semibold text-vaultAmber font-mono">{metric.value}</p>
                <p className="mt-1 text-xs text-charcoal/70">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-obsidian transition-transform duration-200 hover:bg-vaultAmber hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              Activate Ecosystem Pilot
            </button>
            <button
              type="button"
              className="border border-mark bg-mark px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-deepink cursor-pointer"
            >
              View Integration Blueprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
