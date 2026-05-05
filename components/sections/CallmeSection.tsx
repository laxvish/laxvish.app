"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SECONDARY_HERO_CTA_CLASS } from "@/lib/site-navigation";
import { SystemPanel } from "@/components/ui/SystemPanel";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface CallmeFeature {
  title: string;
  description: string;
}

const features: CallmeFeature[] = [
  {
    title: "Realtime Voice AI",
    description:
      "Natural speech recognition and generation for fluid, human-like conversations. An enterprise AI voice agent that callers interact with naturally.",
  },
  {
    title: "Enterprise Controls",
    description:
      "Call recording, compliance logging, escalation paths, and policy enforcement. AI voice automation with governance built into every conversation.",
  },
  {
    title: "Workflow Integration",
    description:
      "Trigger actions, update records, and hand off to human agents seamlessly. A conversational AI system connected to your existing workflows.",
  },
];

export function CallmeSection() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
      <div className="max-w-2xl">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
            CallMe — Enterprise AI Voice Agent
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 text-4xl font-normal tracking-tight text-charcoal sm:text-5xl">
            Voice AI for enterprise conversations.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-lg leading-relaxed text-neonCyan">
            Deploy an enterprise AI voice agent that handles calls with natural conversation,
            compliance-grade controls, and seamless workflow integration.
          </p>
        </FadeIn>
      </div>

      <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-3 group/grid">
        {features.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.1 * (i + 1)}>
            <SystemPanel
              as="article"
              className="group flex h-full flex-col border-t border-charcoal pt-8 transition-all duration-700 hover:opacity-100 opacity-90 group-hover/grid:opacity-30 hover:!opacity-100"
            >
              <h3 className="text-2xl font-normal tracking-tight text-charcoal">
                {feature.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-neonCyan">
                {feature.description}
              </p>
            </SystemPanel>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <div className="mt-16 flex">
          <MagneticButton
            as={Link}
            href="/callme"
            className={SECONDARY_HERO_CTA_CLASS}
          >
            Explore CallMe
          </MagneticButton>
        </div>
      </FadeIn>
    </section>
  );
}
