"use client";

import Link from "next/link";
import { PaperGrain } from "@/components/ui/AIFabric";
import { EditorialReveal } from "@/components/ui/FadeIn";
import { PressButton } from "@/components/ui/MagneticButton";
import { HeroAstrolabe } from "@/components/visuals/engine/HeroAstrolabe";
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

      <div className="relative z-10 mx-auto flex min-h-[100dvh] sm:min-h-[820px] w-full max-w-[1440px] flex-col justify-end px-4 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-16 lg:pb-24 lg:pt-40 pointer-events-none">
        <div className="grid grid-cols-1 items-center lg:items-end gap-10 lg:grid-cols-[minmax(0,3.2fr)_minmax(0,2.3fr)] lg:gap-16">
          {/* Left Column: Editorial Value Proposition & Action CTAs */}
          <div className="max-w-3xl space-y-6 sm:space-y-8 lg:space-y-10 lg:pr-12 pointer-events-auto">
            <EditorialReveal delay={0.05} yOffset={6}>
              <p className="font-mono text-[10px] sm:text-xs font-medium tracking-[0.16em] sm:tracking-[0.2em] text-mark uppercase">
                The Laxvish Thread — an operating system for Indian enterprise
              </p>
            </EditorialReveal>

            <EditorialReveal delay={0.12} yOffset={8}>
              <h1 className="text-[clamp(2.25rem,5.5vw,5.5rem)] font-normal leading-[1.06] sm:leading-[1.04] tracking-tight text-deepink">
                Hire AI workers that do the real work in your business.
              </h1>
            </EditorialReveal>

            <EditorialReveal delay={0.2} yOffset={8}>
              <p className="max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-deepink/75">
                Laxvish builds AI assistants that take over the repetitive work —
                sales, customer support, document processing, finance, IT, and
                more. You stay in control of every decision. Built for Indian
                businesses. DPDP-ready.
              </p>
            </EditorialReveal>

            <EditorialReveal delay={0.3} yOffset={8}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4 lg:pt-6">
                <PressButton
                  as="a"
                  href={bookDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BOOK_NOW_BUTTON_CLASS}
                >
                  <span>Book a working session</span>
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

          {/* Right Column / Mobile Centerpiece: The Precision Astrolabe & Kinetic Thread Core */}
          <div className="flex w-full items-center justify-center pointer-events-auto pt-4 sm:pt-6 lg:pt-0 lg:justify-end pb-2 lg:pb-4">
            <HeroAstrolabe />
          </div>
        </div>
      </div>
    </section>
  );
}
