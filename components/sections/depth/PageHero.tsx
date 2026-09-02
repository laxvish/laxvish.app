import { EditorialReveal } from "@/components/ui/FadeIn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  summary: string;
  /** Mono datum stamped under the eyebrow — gives each route its own
   *  establishing shot (see docs/DIRECTORS_TREATMENT.md §4). */
  stamp?: string;
  shape?: any; // Deprecated, kept for backward compatibility if passed
}

export function PageHero({
  eyebrow,
  title,
  summary,
  stamp,
}: PageHeroProps) {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-6 pt-32 pb-20 sm:px-12 sm:pt-40 lg:px-16">
      <div className="max-w-3xl space-y-8 lg:pr-12">
        <EditorialReveal delay={0.1} yOffset={6}>
          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-mark uppercase">
            {eyebrow}
          </p>
        </EditorialReveal>

        {stamp ? (
          <EditorialReveal delay={0.15} yOffset={6}>
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-deepink/45 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-mark/60" />
              {stamp}
            </p>
          </EditorialReveal>
        ) : null}

        <EditorialReveal delay={0.2} yOffset={8}>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.05] tracking-tight text-deepink">
            {title}
          </h1>
        </EditorialReveal>

        <EditorialReveal delay={0.3} yOffset={8}>
          <p className="max-w-xl text-base leading-relaxed tracking-wide text-deepink/70 sm:text-lg">
            {summary}
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}