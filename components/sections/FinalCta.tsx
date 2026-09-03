"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

/**
 * FinalCta — the sign-off band.
 *
 * Full-width hairline-ruled closing panel with an inline "title block" footer
 * (engineering-drawing metadata) instead of a boxed, centered pill. Reads as
 * the last line of a spec sheet, not a conversion box.
 */
export function FinalCta() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section
      id="start"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <FadeIn yOffset={30}>
        <div className="border border-charcoal bg-obsidian">
          <div className="border-b border-charcoal/20 px-8 py-16 sm:px-16 sm:py-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              Start with one worker
            </p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <h2 className="max-w-2xl text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.06] tracking-[-0.02em] text-charcoal">
                See what an AI worker can do for your team.
              </h2>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:justify-end">
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
            </div>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-charcoal/70">
              Fifteen minutes on your kind of work — no pitch deck, no slide
              library. Honest in scope, honest in cost, honest in what we cannot
              do.
            </p>
          </div>

          {/* Title block — engineering-drawing metadata */}
          <div className="grid grid-cols-2 divide-x divide-charcoal/20 border-b border-charcoal/20 text-[10px] font-medium uppercase tracking-[0.2em] text-neonCyan sm:grid-cols-4">
            <span className="px-6 py-4">Project — Laxvish</span>
            <span className="px-6 py-4">Made in India</span>
            <span className="px-6 py-4">DPDP ready</span>
            <span className="px-6 py-4">Rev — {new Date().getFullYear()}</span>
          </div>
        </div>
      </FadeIn>

      <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-charcoal pt-8 text-xs font-medium text-neonCyan sm:flex-row sm:items-center">
        <span className="tracking-[0.2em] uppercase text-charcoal">Laxvish</span>
        <span className="tracking-wide">
          Built for Indian businesses — sales, support, documents, finance.
        </span>
      </footer>
    </section>
  );
}
