interface Pillar {
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    title: "Workers",
    description:
      "Focused AI workers for repeatable business tasks with measurable output.",
  },
  {
    title: "Brain",
    description:
      "A control layer that routes tasks, monitors execution, and keeps workflows aligned.",
  },
  {
    title: "Brakes",
    description:
      "Verification controls that keep AI actions auditable, policy-aware, and enterprise safe.",
  },
];

export function PillarsGrid() {
  return (
    <section
      id="the-os"
      className="mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-4xl">
          Workers. Brain. Brakes.
        </h2>
        <p className="mt-4 text-sm text-charcoal/80 sm:text-base">
          Three primitives that make enterprise AI easier to understand, govern,
          and scale.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-2xl border border-charcoal/20 bg-[#0d0d0d] p-6"
          >
            <h3 className="text-lg font-semibold text-neonCyan [font-family:var(--font-space-grotesk)]">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-charcoal/78">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
