"use client";

import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";

interface Pillar {
  index: string;
  title: string;
  description: string;
  href: string;
}

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Workers",
    description:
      "Enterprise AI agents scoped to specific business functions. Predictable behavior, measurable output, production-grade execution.",
    href: "/workers",
  },
  {
    index: "02",
    title: "Brain",
    description:
      "The AI orchestration system that routes tasks, sequences workflows, and governs execution between workers and human teams.",
    href: "/brain",
  },
  {
    index: "03",
    title: "Brakes",
    description:
      "AI governance and verification controls that validate outputs, enforce policies, and maintain audit-grade compliance.",
    href: "/brakes",
  },
];

/**
 * Pillars — "three layers" rendered as an engineering spec band.
 *
 * Numbered rows separated by hairlines (01 / 02 / 03) instead of three equal
 * cards: reads as machine documentation, keeps focal hierarchy, and avoids
 * the generic three-column feature grid. Mobile-first responsive layout.
 */
export function PillarsGrid() {
  return (
    <section
      id="pillars"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
    >
      <div className="max-w-3xl">
        <FadeIn>
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
            The system architecture
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 sm:mt-5 text-[clamp(1.85rem,4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            Three layers. One AI orchestration system.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg leading-relaxed tracking-wide text-charcoal/70">
            Workers execute. Brain coordinates. Brakes verify. Three foundational
            layers that make enterprise AI easier to deploy, govern, and scale
            with confidence.
          </p>
        </FadeIn>
      </div>

      <FadeInStagger className="mt-12 sm:mt-16">
        <ul className="border-t border-charcoal">
          {pillars.map((pillar) => (
            <li key={pillar.index} className="border-b border-charcoal/20">
              <FadeIn>
                <Link
                  href={pillar.href}
                  className="group grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-2 py-7 sm:grid-cols-[3.5rem_1fr] sm:py-8 lg:grid-cols-[4.5rem_minmax(0,16rem)_1fr_auto] lg:items-start lg:gap-x-10 transition-colors duration-300 hover:bg-vaultAmber/40"
                >
                  <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-neonCyan pt-1">
                    {pillar.index}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-charcoal lg:text-4xl">
                    {pillar.title}
                  </h3>
                  <p className="col-span-2 sm:col-span-1 max-w-xl text-base leading-relaxed text-charcoal/70 mt-1 sm:mt-0">
                    {pillar.description}
                  </p>
                  <span className="col-span-2 sm:col-span-1 pt-2 sm:pt-0 text-sm font-medium tracking-wide text-charcoal underline decoration-charcoal/20 underline-offset-4 transition-colors duration-300 group-hover:decoration-charcoal lg:text-right">
                    Learn more
                  </span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </section>
  );
}
