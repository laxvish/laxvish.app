"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

/**
 * FinalCta — the sign-off band with architectural perspective split.
 */
export function FinalCta() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section
      id="start"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
    >
      <FadeIn yOffset={20}>
        <div className="border border-charcoal bg-obsidian">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] border-b border-charcoal/20 px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 items-center">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
                Start with one worker
              </p>
              <h2 className="mt-4 sm:mt-5 text-[clamp(1.85rem,3.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                See what an AI worker can do for your team.
              </h2>
              <p className="mt-4 sm:mt-5 max-w-xl text-base leading-relaxed text-charcoal/70">
                Fifteen minutes on your kind of work — no pitch deck, no slide
                library. Honest in scope, honest in cost, honest in what we cannot
                do.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
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
            </div>

            <div className="relative w-full max-w-full overflow-hidden border border-charcoal/20 bg-vaultAmber group">
              <Image
                src="/images/editorial-system-architecture.png"
                alt="Enterprise multi-agent AI system architecture and autonomous deployment mesh"
                width={800}
                height={450}
                sizes="(max-width: 768px) 100vw, 600px"
                className="h-auto w-full max-w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="flex items-center justify-between border-t border-charcoal/10 bg-obsidian/95 px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em] text-neonCyan">
                <span className="truncate pr-2">SPEC. 05 / ARCHITECTURE</span>
                <span className="shrink-0">SYSTEM COMMITMENT</span>
              </div>
            </div>
          </div>

          {/* Title block — engineering metadata */}
          <div className="grid grid-cols-2 divide-x divide-charcoal/20 border-b border-charcoal/20 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-neonCyan sm:grid-cols-4">
            <span className="px-4 py-3 sm:px-6 sm:py-3.5">Project — Laxvish</span>
            <span className="px-4 py-3 sm:px-6 sm:py-3.5">Made in India</span>
            <span className="px-4 py-3 sm:px-6 sm:py-3.5">DPDP ready</span>
            <span className="px-4 py-3 sm:px-6 sm:py-3.5">Rev — {new Date().getFullYear()}</span>
          </div>
        </div>
      </FadeIn>

      <footer className="mt-10 sm:mt-14 flex flex-col items-start justify-between gap-3 border-t border-charcoal pt-6 text-xs font-medium text-neonCyan sm:flex-row sm:items-center">
        <span className="tracking-[0.2em] uppercase text-charcoal">Laxvish</span>
        <span className="tracking-wide">
          Built for Indian businesses — sales, support, documents, finance.
        </span>
      </footer>
    </section>
  );
}
