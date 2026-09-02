"use client";

// ============================================================================
// EDITORIAL FINAL INVITATION
// World: magazine closing colophon + editorial masthead.
// No PaperPanel card, no rounded-2xl, no shadow-lg.
// ============================================================================

import Link from "next/link";
import { getBookDemoUrl } from "@/lib/site-navigation";

export function FinalCta() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section
      id="compliance"
      className="relative border-t border-deepink/30"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {/* Editorial copy */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
              Closing Invitation
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.04] tracking-tight text-deepink">
              See what an AI worker can do for your team.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-deepink/75 sm:text-lg">
              Talk to our team. We&rsquo;ll show you a real walk-through using
              your kind of work — fifteen minutes, no pitch deck, no slide
              library. Honest in scope, honest in cost, honest in what we
              cannot do.
            </p>
          </div>

          {/* Editorial action rail */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
            <ul className="divide-y divide-rule-hair border-t border-deepink/30">
              <li className="py-5">
                <a
                  href={bookDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-3 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink transition-colors hover:text-mark"
                >
                  <span>Book a working session</span>
                  <span aria-hidden="true" className="font-mono text-base">→</span>
                </a>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.18em] text-deepink/55 uppercase">
                  A 15-minute walk-through using your kind of work
                </p>
              </li>
              <li className="py-5">
                <Link
                  href="/solutions"
                  className="group inline-flex w-fit items-center gap-3 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink transition-colors hover:text-mark"
                >
                  <span>See what we automate</span>
                  <span aria-hidden="true" className="font-mono text-base">→</span>
                </Link>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.18em] text-deepink/55 uppercase">
                  Browse all 13 functional capabilities
                </p>
              </li>
              <li className="py-5">
                <Link
                  href="/workers"
                  className="group inline-flex w-fit items-center gap-3 font-serif text-2xl font-normal leading-tight tracking-tight text-deepink transition-colors hover:text-mark"
                >
                  <span>Read about the workers</span>
                  <span aria-hidden="true" className="font-mono text-base">→</span>
                </Link>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.18em] text-deepink/55 uppercase">
                  How a specialist AI worker is trained and run
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Closing colophon strip */}
        <div className="mt-20 grid grid-cols-2 items-baseline gap-x-8 gap-y-3 border-t border-deepink/30 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-deepink/65 sm:grid-cols-4">
          <span className="font-medium text-deepink">Laxvish</span>
          <span className="hidden sm:inline">DPDP Ready</span>
          <span className="hidden sm:inline">Made in India</span>
          <span className="text-right">{`{Thread · 142.84 Hz}`}</span>
        </div>
      </div>
    </section>
  );
}
