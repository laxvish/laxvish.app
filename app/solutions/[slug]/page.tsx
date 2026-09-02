import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { USE_CASES, getUseCase } from "@/lib/use-cases";

export function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) return {};
  return buildPageMetadata({
    title: `${uc.title} — Laxvish`,
    description: uc.subhead,
    path: `/solutions/${uc.slug}`,
    keywords: uc.keywords,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  const related = (uc.related ?? [])
    .map((relatedSlug) => getUseCase(relatedSlug))
    .filter((r) => r !== undefined);

  return (
    <>
      <PageHero
        eyebrow={uc.eyebrow}
        title={uc.headline}
        summary={uc.subhead}
      />

      {/* What this AI worker does */}
      {uc.whatItDoes.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            What this AI worker does
          </h2>
          <ul className="mt-12 max-w-3xl space-y-6">
            {uc.whatItDoes.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 border-l border-charcoal/20 pl-6 text-base leading-relaxed text-charcoal/70"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How a typical engagement works */}
      {uc.engagement.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            How a typical engagement works
          </h2>
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {uc.engagement.map((item) => (
              <div key={item.step} className="flex flex-col border-l border-charcoal/20 pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
                  Step {item.step}
                </p>
                <h3 className="mt-4 text-2xl font-normal tracking-tight text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed tracking-wide text-charcoal/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What you'd see in the first month */}
      {uc.outcomes.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            What you&rsquo;d see in the first month
          </h2>
          <ul className="mt-12 max-w-3xl space-y-6">
            {uc.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-4 text-base leading-relaxed text-charcoal/70"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/40" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How we keep you in control */}
      {uc.control.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            How we keep you in control
          </h2>
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {uc.control.map((point) => (
              <div key={point} className="flex flex-col border-l border-charcoal/20 pl-6">
                <p className="text-base leading-relaxed text-charcoal/70">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Questions */}
      {uc.faq.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            Questions
          </h2>
          <div className="mt-12 max-w-4xl border-t border-charcoal">
            {uc.faq.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group border-b border-charcoal/20 py-6 transition-colors hover:bg-vaultAmber/50"
              >
                <summary className="cursor-pointer list-none text-xl font-normal text-charcoal outline-none marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-neonCyan">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related use cases */}
      {related.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-12 lg:px-16 lg:pb-32">
          <div className="border-t border-charcoal/10 pt-12">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
              Explore more
            </p>
            <div className="flex flex-wrap gap-4">
              {related.map((link) => (
                <Link
                  key={link.slug}
                  href={`/solutions/${link.slug}`}
                  className="text-sm font-medium tracking-wide text-charcoal underline underline-offset-4 decoration-charcoal/20 transition-colors duration-300 hover:decoration-charcoal"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
