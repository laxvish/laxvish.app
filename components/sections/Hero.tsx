"use client";

import Link from "next/link";
import { AIFabric } from "@/components/ui/AIFabric";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SignatureMachine } from "@/components/ui/SignatureMachine";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

/**
 * Hero — Control Surface establishing shot.
 *
 * Asymmetric split: copy left, the signature machine cross-section right.
 * The headline is capped at two lines and the section fits the first
 * viewport. The machine carries all motion; the copy holds still.
 */
export function Hero() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal/10 bg-obsidian">
      {/* Immersive Intelligence Field Background — restored by user request */}
      <AIFabric />

      {/* Control-surface corner registration ticks (the machine frame) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 z-20 hidden lg:block"
      >
        <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-charcoal/30" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-charcoal/30" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-charcoal/30" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-charcoal/30" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-16 px-6 pb-20 pt-32 sm:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-16 lg:pb-28 lg:pt-40">
        {/* ——— Copy column (holds still) ——— */}
        <div className="max-w-2xl">
          <FadeIn delay={0.1} yOffset={10}>
            <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              An AI company — AI systems for Indian enterprise
            </p>
          </FadeIn>

          <FadeIn delay={0.2} yOffset={20}>
            <h1 className="mt-8 text-[clamp(2.5rem,4vw,4rem)] font-normal leading-[1.06] tracking-[-0.02em] text-charcoal">
              We build AI systems that do the real work.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} yOffset={20}>
            <p className="mt-8 max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
              Workers execute. Brain coordinates. Brakes verify. Laxvish
              engineers the systems, runs them on your rules, and hands you
              finished work — you stay in control of every decision.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} yOffset={20}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton
                as="a"
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={BOOK_NOW_BUTTON_CLASS}
              >
                <span>Book a working session</span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                href="/solutions"
                className={SECONDARY_HERO_CTA_CLASS}
              >
                See what we automate
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Sparse mono telemetry line — static instrumentation, not a dashboard */}
          <FadeIn delay={0.5} yOffset={10}>
            <p className="mt-14 border-t border-charcoal/20 pt-6 text-[10px] font-medium tracking-[0.2em] text-neonCyan uppercase">
              Workers 03&ensp;·&ensp;Gate 01&ensp;·&ensp;Ready&ensp;·&ensp;DPDP
            </p>
          </FadeIn>
        </div>

        {/* ——— Machine column (carries the motion) ——— */}
        <FadeIn delay={0.25} yOffset={24} className="hidden lg:block">
          <SignatureMachine />
        </FadeIn>
      </div>
    </section>
  );
}
