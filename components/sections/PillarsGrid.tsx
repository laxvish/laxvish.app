interface Pillar {
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    title: "Workers",
    description:
      "Domain agents that execute high-value tasks across MSME, AYUSH, and logistics workflows.",
  },
  {
    title: "Brain",
    description:
      "A coordination layer that routes, supervises, and aligns actions across the digital workforce.",
  },
  {
    title: "Brakes",
    description:
      "Verification controls that reduce risk with policy-first governance and trust-by-design guardrails.",
  },
];

export function PillarsGrid() {
  return (
    <section
      id="the-os"
      className="mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-4xl lg:text-5xl">
          Workers. Brain. Brakes.
        </h2>
        <p className="mt-4 text-gray-400">
          One operating model to orchestrate execution while keeping enterprise
          AI verifiable and compliant.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-neonCyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
          >
            <h3 className="text-xl font-semibold text-white [font-family:var(--font-space-grotesk)]">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
