"use client";

// ============================================================================
// EDITORIAL COMMAND STRIP
// World: workshop calibration tape, not a SaaS strip.
// Single editorial row with mono labels. No rounded chips, no pills, no shadows.
// ============================================================================

interface StripMetric {
  label: string;
  value: string;
}

const stripMetrics: StripMetric[] = [
  { label: "Connected Nodes", value: "120+" },
  { label: "Governed Templates", value: "45" },
  { label: "Verification Coverage", value: "99.2%" },
];

export function EcosystemCommandStrip() {
  return (
    <section className="border-y border-deepink/15">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-baseline gap-x-12 gap-y-8 lg:grid-cols-12">
          {/* Editorial headline */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              Activation Layer
            </p>
            <h3 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink sm:text-3xl">
              Ecosystem complexity, turned into verified execution.
            </h3>
          </div>

          {/* Editorial metrics — NO rounded chips */}
          <dl className="grid grid-cols-3 gap-x-6 lg:col-span-5 lg:col-start-6">
            {stripMetrics.map((metric) => (
              <div key={metric.label} className="border-t border-deepink/20 pt-3">
                <dd className="font-mono text-2xl font-semibold tracking-tight text-deepink">
                  {metric.value}
                </dd>
                <dt className="mt-1 font-mono text-[10px] tracking-[0.18em] text-deepink/55 uppercase">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Action — clearly named, not generic */}
          <div className="flex flex-col gap-4 lg:col-span-2 lg:items-end lg:pt-1">
            <a
              href="/contact"
              className="inline-flex w-fit items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.16em] text-mark uppercase transition-colors hover:border-deepink hover:text-deepink"
            >
              <span>Request integration walk-through</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/solutions"
              className="inline-flex w-fit items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-deepink/65 uppercase transition-colors hover:text-mark"
            >
              <span>See all 13 capabilities</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
