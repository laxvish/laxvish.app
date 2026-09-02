import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/depth/PageHero";
import { AgentTaskSimulator } from "@/components/visuals/simulations/AgentTaskSimulator";
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
        shape="sphere"
      />

      {/* Quick Action bar */}
      <section className="relative z-10 border-b border-vaultAmber/15 bg-obsidian">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-4 px-6 py-8 sm:px-12 lg:px-16">
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
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-vaultAmber">
              Live Task Simulation
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              Watch how this AI worker executes in real time.
            </h2>
            <p className="text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Explore every phase from intake and entity extraction to action dispatch and Brakes quality verification.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <AgentTaskSimulator slug={uc.slug} />
        </FadeIn>
      </section>

      {/* What this AI worker does */}
      <section
        id="what-it-does"
        className="relative z-10 border-t border-vaultAmber/15 bg-obsidian"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              What this AI worker does
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {uc.whatItDoes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border-l-2 border-vaultAmber/50 bg-voidSurface p-6 backdrop-blur-sm"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-vaultAmber" />
                <p className="text-base leading-relaxed text-charcoal/80">
                  {item}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Engagement timeline */}
      <section className="relative z-10 border-y border-vaultAmber/15 bg-voidSurface/40">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              How a typical engagement works
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {uc.engagement.map((step) => (
              <div key={step.step} className="border-l border-vaultAmber/30 pl-6 space-y-3">
                <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
                  {step.step}
                </div>
                <h3 className="text-xl font-medium text-charcoal">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/70">
                  {step.description}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        <FadeIn>
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            What you&rsquo;d see in the first month
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
          {uc.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="flex items-start gap-4 rounded-2xl border border-vaultAmber/20 bg-voidSurface p-6"
            >
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vaultAmber text-xs font-bold text-obsidian">
                ✓
              </span>
              <p className="text-base leading-relaxed text-charcoal/80">
                {outcome}
              </p>
            </div>
          ))}
        </FadeInStagger>
      </section>

      {/* Control / trust */}
      <section className="relative z-10 border-y border-vaultAmber/15 bg-obsidian text-charcoal">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight">
              How we keep you in control
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {uc.control.map((c) => (
              <div
                key={c}
                className="flex items-start gap-4 rounded-2xl border border-vaultAmber/15 bg-voidSurface/60 p-6 backdrop-blur-sm"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-vaultAmber" />
                <p className="text-base leading-relaxed text-charcoal/80">
                  {c}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ specific to this use case */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        <FadeIn>
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            Common questions about {uc.title}
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-12 space-y-3">
          {uc.faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-vaultAmber/15 bg-voidSurface p-6 transition-colors hover:bg-white/5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-charcoal">
                <span>{item.question}</span>
                <span className="font-mono text-vaultAmber text-lg transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                {item.answer}
              </p>
            </details>
          ))}
        </FadeInStagger>
      </section>

      {/* Related use cases */}
      {relatedUseCases.length > 0 && (
        <section className="relative z-10 border-t border-vaultAmber/15 bg-voidSurface/40">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
            <FadeIn>
              <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
                Related automations
              </h2>
            </FadeIn>
            <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedUseCases.map((r) => (
                <Link
                  key={r.slug}
                  href={`/solutions/${r.slug}`}
                  className="group block rounded-2xl border border-vaultAmber/20 bg-voidSurface p-6 transition-all duration-500 hover:border-vaultAmber/60 hover:bg-white/5"
                >
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber/70">
                    {r.category}
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-charcoal group-hover:text-vaultAmber transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                    {r.oneLiner}
                  </p>
                  <div className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-vaultAmber">
                    Learn more →
                  </div>
                </Link>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative z-10 border-t border-vaultAmber/15 bg-obsidian text-charcoal">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-6 py-24 text-center sm:px-12 lg:px-16 lg:py-32">
          <FadeIn>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight">
              Want to see {uc.title.toLowerCase()} on your real work?
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="max-w-xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Talk to our team. We&rsquo;ll show you a real walkthrough using
              your kind of work. 15 minutes, no pitch deck.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-4">
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
                as="a"
                href="/solutions"
                className={SECONDARY_HERO_CTA_CLASS}
              >
                See all automations
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
