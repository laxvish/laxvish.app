import { FadeIn } from "@/components/ui/FadeIn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  summary: string;
  shape?: any; // Deprecated, kept for backward compatibility if passed
}

export function PageHero({
  eyebrow,
  title,
  summary,
}: PageHeroProps) {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-6 pt-32 pb-20 sm:px-12 sm:pt-40 lg:px-16">
      <div className="max-w-3xl space-y-10 lg:pr-12">
        <FadeIn delay={0.1} yOffset={10}>
          <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
            {eyebrow}
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2} yOffset={20}>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            {title}
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3} yOffset={20}>
          <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
            {summary}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
