"use client";

import Link from "next/link";
import { PaperGrain } from "@/components/ui/AIFabric";
import { EditorialReveal } from "@/components/ui/FadeIn";
import { PressButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Hero() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section className="relative isolate overflow-hidden border-b border-rule-hair bg-cream">
      <PaperGrain intensity={1} />

      <div className="relative z-10 mx-auto flex min-h-[820px] w-full max-w-[1440px] flex-col justify-end px-6 pb-24 pt-40 sm:px-12 lg:px-16 pointer-events-none">
        <div className="max-w-3xl space-y-10 lg:pr-12 pointer-events-auto">
          <EditorialReveal delay={0.05} yOffset={6}>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-mark uppercase">
              The Laxvish Thread — an operating system for Indian enterprise
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.12} yOffset={8}>
            <h1 className="text-[clamp(2.75rem,6vw,5.5rem)] font-normal leading-[1.04] tracking-tight text-deepink">
              Hire AI workers that do the real work in your business.
            </h1>
          </EditorialReveal>

          <EditorialReveal delay={0.2} yOffset={8}>
            <p className="max-w-xl text-base leading-relaxed text-deepink/75 sm:text-lg">
              Laxvish builds AI assistants that take over the repetitive work —
              sales, customer support, document processing, finance, IT, and
              more. You stay in control of every decision. Built for Indian
              businesses. DPDP-ready.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.3} yOffset={8}>
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <PressButton
                as="a"
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={BOOK_NOW_BUTTON_CLASS}
              >
                <span>Talk to our team</span>
              </PressButton>
              <PressButton
                as={Link}
                href="/solutions"
                className={SECONDARY_HERO_CTA_CLASS}
              >
                See what we automate
              </PressButton>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
