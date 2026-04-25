import Link from "next/link";
import { LivingPaintingCanvas } from "@/components/ui/LivingPaintingCanvas";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Hero() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal/20">
      <div className="absolute inset-0 opacity-90">
        <LivingPaintingCanvas />
      </div>
      {/* Subtle overlay to ensure text readability */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(242,242,242,0.12),transparent_46%),linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.88))]" />
      <div className="relative z-10 mx-auto flex min-h-[78svh] w-full max-w-[90rem] items-center px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-[#B6B09F] uppercase">
            The Operating System for Enterprise AI
          </p>
          <h1
            className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.04] text-[#F2F2F2] [font-family:var(--font-space-grotesk)]"
          >
            Workers that learn.
            <br />
            Systems that trust.
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#EAE4D5] sm:text-base">
            Orchestrate AI agents with verification and control. Deploy domain workers
            that adapt, backed by verification engines and policy guardrails you define.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={bookDemoUrl}
              target="_blank"
              rel="noreferrer"
              className={`${BOOK_NOW_BUTTON_CLASS} w-full px-6 py-3 sm:w-auto`}
            >
              <span className="relative z-10">Explore Platform</span>
            </a>
            <Link
              href="/careers/apply"
              className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto`}
            >
              Join the Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
