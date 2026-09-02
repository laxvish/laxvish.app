"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SystemPanel } from "@/components/ui/SystemPanel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_NOW_BUTTON_CLASS, SECONDARY_HERO_CTA_CLASS, getBookDemoUrl } from "@/lib/site-navigation";

export function FinalCta() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section
      id="compliance"
      className="mx-auto w-full max-w-[90rem] px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <FadeIn yOffset={40}>
        <SystemPanel className="border border-charcoal bg-vaultAmber p-12 text-center sm:p-20 shadow-2xl shadow-charcoal/5">
          <h2 className="text-4xl font-normal tracking-tight text-charcoal sm:text-5xl">
            See what an AI worker can do for your team.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neonCyan">
            Talk to our team. We&rsquo;ll show you a real walkthrough using
            your kind of work. 15 minutes. No pitch deck.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <MagneticButton
              as="a"
              href={bookDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={BOOK_NOW_BUTTON_CLASS}
            >
              <span>Talk to our team</span>
            </MagneticButton>
            <MagneticButton
              as={Link}
              href="/solutions"
              className={SECONDARY_HERO_CTA_CLASS}
            >
              See what we automate
            </MagneticButton>
          </div>
        </SystemPanel>
      </FadeIn>

      <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-charcoal/20 pt-8 text-xs font-medium text-neonCyan sm:flex-row">
        <span className="tracking-[0.2em] uppercase text-charcoal">Laxvish</span>
        <span className="tracking-wide">DPDP-ready • Built for Indian businesses</span>
      </footer>
    </section>
  );
}
