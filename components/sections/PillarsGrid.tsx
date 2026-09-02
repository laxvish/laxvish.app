"use client";

import Link from "next/link";
import { FadeInStagger, FadeIn } from "@/components/ui/FadeIn";
import { SystemPanel } from "@/components/ui/SystemPanel";

interface Pillar {
  /** Plain-language benefit shown first */
  benefit: string;
  /** The architecture name we use internally */
  name: string;
  /** Plain-language description of what this does */
  description: string;
  /** Link to learn more about the architecture */
  href: string;
}

const pillars: Pillar[] = [
  {
    benefit: "The work gets done",
    name: "Workers",
    description:
      "AI assistants trained on one specific job each — answering customer questions, processing invoices, qualifying sales leads. They work 24/7, sound like your team, and never drift from what they're supposed to do.",
    href: "/workers",
  },
  {
    benefit: "You stay in control",
    name: "Brain",
    description:
      "One control layer that coordinates every AI worker. See what's running, change the rules, route anything unusual to a human. No black boxes.",
    href: "/brain",
  },
  {
    benefit: "It's safe and compliant",
    name: "Brakes",
    description:
      "Every AI decision is checked before it goes anywhere important. Anything uncertain is escalated to a human. Every action is logged for your compliance team. Built for DPDP from day one.",
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
          The work gets done. You stay in control.
        </h2>
        <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
          Every Laxvish deployment runs on three layers. The first one does
          the work. The second one keeps you in the loop. The third one keeps
          it safe.
        </p>
      </div>

      <FadeInStagger className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-3 group/grid">
        {pillars.map((pillar) => (
          <FadeIn key={pillar.name}>
            <Link href={pillar.href} className="block h-full">
              <SystemPanel
                as="article"
                className="group flex h-full flex-col border-t border-vaultAmber/30 pt-8 transition-all duration-700 hover:opacity-100 opacity-90 group-hover/grid:opacity-30 hover:!opacity-100"
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
                  {pillar.benefit}
                </p>
                <h3 className="mt-3 text-2xl font-normal tracking-tight text-charcoal">
                  {pillar.name}
                </h3>
                <p className="mt-6 text-base leading-relaxed tracking-wide text-charcoal/70">
                  {pillar.description}
                </p>
                <span className="mt-auto pt-8 font-mono text-xs font-semibold tracking-widest uppercase text-vaultAmber underline underline-offset-4 decoration-vaultAmber/30 transition-colors duration-300">
                  Learn more
                </span>
              </SystemPanel>
            </Link>
          </FadeIn>
        ))}
      </FadeInStagger>

      <FadeIn>
        <p className="mt-16 max-w-2xl text-sm leading-relaxed text-charcoal/60">
          We call this architecture{" "}
          <span className="font-semibold text-charcoal">
            Workers, Brain, and Brakes
          </span>
          . Three names for three jobs: do the work, coordinate the work, keep
          the work safe.{" "}
          <Link
            href="/workers"
            className="font-mono text-xs font-semibold uppercase tracking-widest text-vaultAmber underline underline-offset-4 hover:text-charcoal"
          >
            See how they fit together
          </Link>
          .
        </p>
      </FadeIn>
    </section>
  );
}
