"use client";

import Link from "next/link";
import { EditorialReveal } from "@/components/ui/FadeIn";
import { PaperPanel } from "@/components/ui/SystemPanel";
import { PressButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function FinalCta() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section
      id="compliance"
      className="mx-auto w-full max-w-[90rem] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <EditorialReveal>
        <PaperPanel className="border border-rule-hair bg-parchment px-8 py-16 sm:px-16 sm:py-24">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
            <div className="space-y-6">
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-mark uppercase">
                Next step
              </p>
              <h2 className="text-4xl font-normal leading-[1.04] tracking-tight text-deepink sm:text-5xl">
                See what an AI worker can do for your team.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-deepink/75 sm:text-lg">
                Talk to our team. We&rsquo;ll show you a real walkthrough using
                your kind of work. 15 minutes. No pitch deck.
              </p>
            </div>

            <div className="flex flex-col items-start justify-end gap-5">
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
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-rule-hair pt-6 text-xs font-medium text-deepink/60 sm:flex-row sm:items-center font-mono">
            <span className="tracking-[0.2em] uppercase text-mark">Laxvish</span>
            <span className="tracking-wide">DPDP-ready · Built for Indian businesses</span>
          </div>
        </PaperPanel>
      </EditorialReveal>
    </section>
  );
}
