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
 * Numbered spec list on vaultAmber band with mobile-first responsive spacing.
 */
export function CallmeSection() {
  return (
    <section className="relative z-10 border-y border-charcoal/10 bg-vaultAmber">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
        <div>
          <FadeIn>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              CallMe — Enterprise AI Voice Agent
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 sm:mt-5 text-[clamp(1.85rem,3.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
              Voice AI for enterprise conversations.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 sm:mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-charcoal/70">
              Deploy an enterprise AI voice agent that handles calls with natural
              conversation, compliance-grade controls, and seamless workflow
              integration.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 sm:mt-10">
              <MagneticButton
                as={Link}
                href="/callme"
                className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto text-center justify-center`}
              >
                Explore CallMe
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        {/* Numbered spec list — hairline rows */}
        <FadeIn delay={0.2}>
          <ul className="border-t border-charcoal">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-charcoal/20 py-5 sm:py-6"
              >
                <span className="text-xs sm:text-sm font-medium tracking-[0.2em] text-neonCyan pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-normal tracking-tight text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-base leading-relaxed text-charcoal/70">
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
