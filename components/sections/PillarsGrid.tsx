"use client";

import Link from "next/link";
import { FadeInStagger, FadeIn } from "@/components/ui/FadeIn";
import { SystemPanel } from "@/components/ui/SystemPanel";

interface Pillar {
  title: string;
  description: string;
  href: string;
}

const pillars: Pillar[] = [
  {
    title: "Workers",
    description:
      "Enterprise AI agents scoped to specific business functions. Predictable behavior, measurable output, production-grade execution.",
    href: "/workers",
  },
  {
    title: "Brain",
    description:
      "The AI orchestration system that routes tasks, sequences workflows, and governs execution between workers and human teams.",
    href: "/brain",
  },
  {
    title: "Brakes",
    description:
      "AI governance and verification controls that validate outputs, enforce policies, and maintain audit-grade compliance.",
    href: "/brakes",
  },
];

export function PillarsGrid() {
  return (
    <section
      id="the-os"
      className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32 relative z-10"
    >
      <div className="max-w-3xl space-y-10">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
          Three layers. One AI orchestration system.
        </h2>
        <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
          Workers execute. Brain coordinates. Brakes verify. Three foundational layers that make enterprise AI easier to deploy, govern, and scale with confidence.
        </p>
      </div>

      <FadeInStagger className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-3 group/grid">
        {pillars.map((pillar) => (
          <FadeIn key={pillar.title}>
            <Link href={pillar.href} className="block h-full">
              <SystemPanel
                as="article"
                className="group flex h-full flex-col border-t border-charcoal pt-8 transition-all duration-700 hover:opacity-100 opacity-90 group-hover/grid:opacity-30 hover:!opacity-100"
              >
                <h3 className="text-2xl font-normal tracking-tight text-charcoal">
                  {pillar.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed tracking-wide text-charcoal/70">
                  {pillar.description}
                </p>
                <span className="mt-auto pt-8 text-sm font-medium tracking-wide text-charcoal underline underline-offset-4 decoration-charcoal/20 group-hover:decoration-charcoal transition-colors duration-300">
                  Learn more
                </span>
              </SystemPanel>
            </Link>
          </FadeIn>
        ))}
      </FadeInStagger>
    </section>
  );
}
