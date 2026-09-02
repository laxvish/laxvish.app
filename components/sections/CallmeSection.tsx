"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SECONDARY_HERO_CTA_CLASS } from "@/lib/site-navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface CallmeFeature {
  title: string;
  description: string;
}

const features: CallmeFeature[] = [
  {
    title: "Realtime Voice AI",
    description:
      "Natural speech recognition and generation for fluid, human-like conversations.",
  },
  {
    title: "Enterprise Controls",
    description:
      "Call recording, compliance logging, escalation paths, and policy enforcement.",
  },
  {
    title: "Workflow Integration",
    description:
      "Trigger actions, update records, and hand off to human agents inside your workflows.",
  },
];

/**
 * CallMe — split composition (copy + spec list left, machine detail right).
 *
 * Deliberately NOT a second three-column card row: the numbered spec list
 * keeps the control-surface grammar and breaks the repeated layout family.
 */
export function CallmeSection() {
  return (
    <section className="relative z-10 border-y border-charcoal/10 bg-vaultAmber">
      <div className="mx-auto grid w-full max-w-[1440px] gap-16 px-6 py-24 sm:px-12 lg:grid-cols-2 lg:px-16 lg:py-32">
        <div>
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              CallMe — Enterprise AI Voice Agent
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.06] tracking-[-0.02em] text-charcoal">
              Voice AI for enterprise conversations.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Deploy an enterprise AI voice agent that handles calls with natural
              conversation, compliance-grade controls, and seamless workflow
              integration.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <MagneticButton as={Link} href="/callme" className={SECONDARY_HERO_CTA_CLASS}>
                Explore CallMe
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        {/* Numbered spec list — hairline rows, no cards */}
        <FadeIn delay={0.2}>
          <ul className="border-t border-charcoal">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-charcoal/20 py-7"
              >
                <span className="text-sm font-medium tracking-[0.2em] text-neonCyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-normal tracking-tight text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-charcoal/70">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
