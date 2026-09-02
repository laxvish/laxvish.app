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
 * the generic three-column feature grid.
 */
export function PillarsGrid() {
  return (
    <section
      id="the-os"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="max-w-3xl space-y-10">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
            The system architecture
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.02em] text-charcoal">
            Three layers. One AI orchestration system.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
            Workers execute. Brain coordinates. Brakes verify. Three foundational
            layers that make enterprise AI easier to deploy, govern, and scale
            with confidence.
          </p>
        </FadeIn>
      </div>

      <FadeInStagger className="mt-20">
        <ul className="border-t border-charcoal">
          {pillars.map((pillar) => (
            <li key={pillar.index} className="border-b border-charcoal/20">
              <FadeIn>
                <Link
                  href={pillar.href}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 py-10 transition-colors duration-300 hover:bg-vaultAmber/40 sm:grid-cols-[3.5rem_1fr] lg:grid-cols-[5rem_minmax(0,18rem)_1fr_auto] lg:items-start lg:gap-x-12"
                >
                  <span className="text-sm font-medium tracking-[0.2em] text-neonCyan">
                    {pillar.index}
                  </span>
                  <h3 className="text-3xl font-normal tracking-tight text-charcoal lg:text-4xl">
                    {pillar.title}
                  </h3>
                  <p className="col-span-2 max-w-xl text-base leading-relaxed text-charcoal/70 sm:col-span-1 lg:col-span-1">
                    {pillar.description}
                  </p>
                  <span className="col-span-2 pt-2 text-sm font-medium tracking-wide text-charcoal underline decoration-charcoal/20 underline-offset-4 transition-colors duration-300 group-hover:decoration-charcoal sm:col-span-1 lg:col-span-1 lg:pt-1 lg:text-right">
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
