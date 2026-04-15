import Link from "next/link";
import { BOOK_NOW_BUTTON_CLASS, getBookDemoUrl } from "@/lib/site-navigation";

export function FinalCta() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section
      id="compliance"
      className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="rounded-2xl border border-charcoal/20 bg-[#0d0d0d] p-6 text-center sm:p-10">
        <h2 className="text-3xl font-bold text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-4xl">
          Ready for a focused pilot?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-charcoal/80 sm:text-base">
          We help your team move from idea to a controlled, measurable AI
          workflow without platform sprawl.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={bookDemoUrl}
            target="_blank"
            rel="noreferrer"
            className={`${BOOK_NOW_BUTTON_CLASS} px-7 py-3`}
          >
            <span className="relative z-10">Book Now</span>
          </a>
          <Link
            href="/solutions"
            className="rounded-full border border-charcoal/30 px-6 py-3 text-sm font-semibold text-neonCyan transition-colors duration-200 hover:border-charcoal/60"
          >
            Explore Solutions
          </Link>
        </div>
      </div>

      <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-charcoal/20 pt-5 text-xs text-charcoal/65 sm:flex-row">
        <span className="tracking-[0.22em] text-neonCyan">LAXVISH</span>
        <span>DPDP-First • Audit-Ready • India-Native</span>
      </footer>
    </section>
  );
}
