"use client";

import Link from "next/link";
import Image from "next/image";
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
 * CallMe — split composition (copy + tactile acoustic image left, feature spec list right).
 */
export function CallmeSection() {
  return (
    <section className="relative z-10 border-y border-charcoal/10 bg-vaultAmber">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
        <div className="flex flex-col justify-between">
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
          </div>

          <FadeIn delay={0.25} className="my-8 sm:my-10">
            <div className="relative overflow-hidden border border-charcoal/20 bg-obsidian group">
              <Image
                src="/images/callme-acoustic-macro.png"
                alt="Realtime enterprise conversational voice AI stream and neural intent telemetry"
                width={800}
                height={450}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="flex items-center justify-between border-t border-charcoal/10 bg-obsidian/95 px-4 py-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-neonCyan">
                <span>FIG. 01 / REALTIME VOICE INTELLIGENCE</span>
                <span>RAW 16:9</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
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

        {/* Numbered spec list */}
        <FadeIn delay={0.2} className="flex flex-col justify-center">
          <ul className="border-t border-charcoal">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-charcoal/20 py-6 sm:py-7"
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
