import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/depth/PageHero";
import { LaxvishConstellationStage } from "@/components/visuals/engine/LaxvishConstellationStage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";
import { buildPageMetadata } from "@/lib/seo";
import { USE_CASES, getUseCase } from "@/lib/use-cases";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) return {};
  return buildPageMetadata({
    title: `${uc.title} for Indian Enterprises`,
    description: uc.subhead,
    path: `/solutions/${uc.slug}`,
    keywords: uc.keywords,
  });
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  const bookDemoUrl = getBookDemoUrl();
  const relatedUseCases = uc.related
    .map((s) => getUseCase(s))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  return (
    <>
      <PageHero
        eyebrow={uc.eyebrow}
        title={uc.headline}
        summary={uc.subhead}
        stamp="WORKER FILE // LIVE RUN"
      />

      {/* Quick Action bar — one action, one intent */}
      <section className="relative z-10 border-b border-rule-hair bg-parchment/60">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-4 px-6 py-8 sm:px-12 lg:px-16">
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
            as="a"
            href="#live-simulation"
            className={SECONDARY_HERO_CTA_CLASS}
          >
            Watch live simulation
          </MagneticButton>
        </div>
      </section>

      {/* Live Simulation Workspace section */}
      <section
        id="live-simulation"
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28"
      >
        <FadeIn>
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-mark">
              Live Task Simulation
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-tight text-deepink">
              Watch how this AI worker executes in real time.
            </h2>
            <p className="text-base leading-relaxed text-deepink/65 sm:text-lg">
              Explore every phase from intake and entity extraction to action dispatch and Brakes quality verification.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <LaxvishConstellationStage
            initialSlug={uc.slug}
            showConstellationNav={false}
          />
        </FadeIn>
      </section>

      {/* What this AI worker does — ruled ledger, no dots, no rounded boxes */}
      <section
        id="what-it-does"
        className="relative z-10 border-t border-rule-hair bg-parchment/60"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
              What this AI worker does
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-12 border-t border-rule-hair">
            {uc.whatItDoes.map((item, i) => (
              <div
                key={item}
                className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-b border-rule-hair py-6"
              >
                <span className="font-serif text-2xl leading-none text-mark/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-2xl text-base leading-relaxed text-deepink/75">
                  {item}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Engagement timeline — running-rule, not four equal cards */}
      <section className="relative z-10 border-y border-rule-hair bg-cream">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
              How a typical engagement works
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-14">
            {uc.engagement.map((step) => (
              <div
                key={step.step}
                className="grid grid-cols-[6rem_1fr] gap-x-8 border-t border-rule-hair py-7 sm:grid-cols-[10rem_1fr]"
              >
                <span className="font-mono text-xs tracking-[0.14em] text-mark/80 uppercase">
                  {step.step}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-normal tracking-tight text-deepink">
                    {step.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-deepink/65 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Outcomes — datum strip on baseline rules */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
        <FadeIn>
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
            What you&rsquo;d see in the first month
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-x-10 gap-y-8 border-t border-rule-hair pt-10 sm:grid-cols-2">
          {uc.outcomes.map((outcome) => (
            <div key={outcome} className="border-l border-mark/40 pl-5">
              <p className="text-base leading-relaxed text-deepink/75">
                {outcome}
              </p>
            </div>
          ))}
        </FadeInStagger>
      </section>

      {/* Control / trust — quiet dossier, no boxes */}
      <section className="relative z-10 border-y border-rule-hair bg-parchment/60">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
              How we keep you in control
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {uc.control.map((c) => (
              <p
                key={c}
                className="border-t border-rule-hair pt-5 text-base leading-relaxed text-deepink/75"
              >
                {c}
              </p>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ specific to this use case — ledger rows with one open action */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
        <FadeIn>
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
            Common questions about {uc.title}
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-12 border-t border-rule-hair">
          {uc.faq.map((item) => (
            <details
              key={item.question}
              className="group border-b border-rule-hair py-6"
            >
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 text-left text-base font-medium text-deepink list-none marker:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-sm text-mark transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-deepink/65">
                {item.answer}
              </p>
            </details>
          ))}
        </FadeInStagger>
      </section>

      {/* Related use cases — numbered ledger rows, one line each */}
      {relatedUseCases.length > 0 && (
        <section className="relative z-10 border-t border-rule-hair bg-parchment/60">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
            <FadeIn>
              <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
                Related automations
              </h2>
            </FadeIn>
            <FadeInStagger className="mt-12 border-t border-rule-hair">
              {relatedUseCases.map((r, i) => (
                <Link
                  key={r.slug}
                  href={`/solutions/${r.slug}`}
                  className="group grid items-baseline gap-x-6 gap-y-1 border-b border-rule-hair py-6 sm:grid-cols-[4rem_18rem_1fr] sm:gap-x-10"
                >
                  <span className="font-mono text-xs tracking-[0.14em] text-mark/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-normal tracking-tight text-deepink transition-colors duration-300 group-hover:text-mark sm:text-xl">
                    {r.title}
                  </span>
                  <span className="flex items-baseline justify-between gap-6 text-sm text-deepink/65 sm:text-base">
                    <span>{r.oneLiner}</span>
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-8 shrink-0 self-center bg-mark/40 transition-all duration-500 group-hover:w-14 group-hover:bg-mark sm:block"
                    />
                  </span>
                </Link>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* Final CTA — asymmetric, one action */}
      <section className="relative z-10 border-t border-rule-hair bg-cream">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-deepink">
                  Want to see {uc.title.toLowerCase()} on your real work?
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-deepink/65 sm:text-lg">
                  Talk to our team. We&rsquo;ll show you a real walkthrough using
                  your kind of work. 15 minutes, no pitch deck.
                </p>
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
                  <Link
                    href="/solutions"
                    className="group inline-flex items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.16em] text-mark uppercase transition-colors duration-200 hover:text-deepink hover:border-deepink"
                  >
                    <span>See the full catalog</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
