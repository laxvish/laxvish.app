import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  summary: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export function PageHero({
  eyebrow,
  title,
  summary,
  image,
}: PageHeroProps) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className={`grid w-full min-w-0 gap-8 sm:gap-12 ${image ? "lg:grid-cols-[1.15fr_0.85fr]" : "max-w-3xl"} lg:gap-16 items-center`}>
        <div className="w-full min-w-0 max-w-2xl space-y-4 sm:space-y-6">
          <FadeIn delay={0.1} yOffset={10}>
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              {eyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} yOffset={16}>
            <h1 className="text-[clamp(1.85rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
              {title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} yOffset={16}>
            <p className="max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-charcoal/70">
              {summary}
            </p>
          </FadeIn>
        </div>

        {image && (
          <FadeIn delay={0.25} yOffset={16} className="w-full min-w-0 max-w-full">
            <div className="relative w-full max-w-full overflow-hidden border border-charcoal/20 bg-vaultAmber group">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={450}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
                className="h-auto w-full max-w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {image.caption && (
                <div className="flex items-center justify-between border-t border-charcoal/10 bg-obsidian/95 px-3 sm:px-4 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em] text-neonCyan">
                  <span className="truncate pr-2">{image.caption}</span>
                  <span className="shrink-0">16:9 / RAW</span>
                </div>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
