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
    title: "Answers calls naturally",
    description:
      "Speaks like a real person, understands accents, switches between English and Hindi mid-sentence. Your callers don't feel like they're talking to a robot.",
  },
  {
    title: "Stays inside your rules",
    description:
      "Every call is recorded and logged. Sensitive topics go straight to a human. You set which calls the AI handles and which it must transfer.",
  },
  {
    title: "Works with what you have",
    description:
      "Connects to your phone system, your CRM, and your calendar. The AI can book appointments, update records, and hand off to your team when needed.",
  },
];

export function CallmeSection() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
      <div className="max-w-2xl">
        <FadeIn>
          <p className="font-mono text-xs font-semibold tracking-[0.25em] text-vaultAmber uppercase">
            CallMe — Voice & WhatsApp
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 text-4xl font-normal tracking-tight text-charcoal sm:text-5xl">
            An AI receptionist that never puts anyone on hold.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
            Answer every phone call and WhatsApp message, in your customer&rsquo;s
            language, 24/7. Hand off to a human with the full conversation
            history when it matters.
          </p>
        </FadeIn>
      </div>

      <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-3 group/grid">
        {features.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.1 * (i + 1)}>
            <SystemPanel
              as="article"
              className="group flex h-full flex-col border-t border-vaultAmber/30 pt-8 transition-all duration-700 hover:opacity-100 opacity-90 group-hover/grid:opacity-30 hover:!opacity-100"
            >
              <h3 className="text-2xl font-normal tracking-tight text-charcoal">
                {feature.title}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-charcoal/70">
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
            href="/solutions/voice-whatsapp"
            className={SECONDARY_HERO_CTA_CLASS}
          >
            See Voice & WhatsApp automation →
          </MagneticButton>
        </div>
      </FadeIn>
    </section>
  );
}
