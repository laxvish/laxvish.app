import { MiniHeroShape } from "@/components/visuals/MiniHeroShape";
import type { ShapeVariant } from "@/components/visuals/MiniHeroShape";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  summary: string;
  shape?: ShapeVariant;
}

export function PageHero({
  eyebrow,
  title,
  summary,
  shape = "octahedron",
}: PageHeroProps) {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <div className="grid items-center gap-6 rounded-3xl border border-charcoal/20 bg-[#0a0a0a] p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/80 sm:text-base">
            {summary}
          </p>
        </div>
        <div>
          <MiniHeroShape variant={shape} />
        </div>
      </div>
    </section>
  );
}
