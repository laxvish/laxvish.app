"use client";

import Link from "next/link";
import { AIFabric } from "@/components/ui/AIFabric";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TheMoon } from "@/components/ui/TheMoon";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

/**
 * Hero — Mobile-first Control Surface establishing shot.
 *
 * Asymmetric split on desktop, stacked on mobile.
 * The moon visual is visible and gracefully sized on all viewports.
 * Strict typography scale, generous tap targets, and consistent spacing.
 */
export function Hero() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal/10 bg-obsidian">
      {/* Immersive Intelligence Field Background */}
      <AIFabric />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-10 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 px-5 sm:px-10 lg:px-16 pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        {/* ——— Copy column ——— */}
        <div className="max-w-2xl">
          <FadeIn delay={0.1} yOffset={10}>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              An AI company — AI systems for Indian enterprise
            </p>
          </FadeIn>

          <FadeIn delay={0.2} yOffset={20}>
            <h1 className="mt-5 sm:mt-7 text-[clamp(2.15rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
              We build AI systems that do the real work.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} yOffset={20}>
            <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed tracking-wide text-charcoal/70">
              Workers execute. Brain coordinates. Brakes verify. Laxvish
              engineers the systems, runs them on your rules, and hands you
              finished work — you stay in control of every decision.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} yOffset={20}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
              <MagneticButton
                as="a"
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BOOK_NOW_BUTTON_CLASS} w-full sm:w-auto text-center justify-center`}
              >
                <span>Book a working session</span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                href="/solutions"
                className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto text-center justify-center`}
              >
                See what we automate
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Provenance line */}
          <FadeIn delay={0.5} yOffset={10}>
            <p className="mt-10 sm:mt-14 border-t border-charcoal/20 pt-5 sm:pt-6 text-[10px] sm:text-xs font-medium tracking-[0.18em] text-neonCyan uppercase">
              Made in India&ensp;·&ensp;DPDP-ready&ensp;·&ensp;You stay in
              control
            </p>
          </FadeIn>
        </div>

        {/* ——— The moon visual (visible on mobile & desktop) ——— */}
        <FadeIn delay={0.25} yOffset={20} className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-none mx-auto">
          <TheMoon />
        </FadeIn>
      </div>
    </section>
  );
}
