import Link from "next/link";
import type { DetailItem, OutcomeItem } from "@/lib/site-pages";

interface PageBlocksProps {
  details: DetailItem[];
  outcomes: OutcomeItem[];
  ctaHref?: string;
}

export function PageBlocks({
  details,
  outcomes,
  ctaHref = "/contact",
}: PageBlocksProps) {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        {details.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-charcoal/20 bg-[#0d0d0d] p-6"
          >
            <h2 className="text-lg font-semibold text-neonCyan">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/80">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-charcoal/20 bg-[#090909] p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-neonCyan [font-family:var(--font-space-grotesk)]">
          Expected outcomes
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item.metric} className="rounded-xl border border-charcoal/15 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-vaultAmber">
                {item.metric}
              </p>
              <p className="mt-2 text-sm text-charcoal/85">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href={ctaHref}
            className="inline-flex rounded-full bg-vaultAmber px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-vaultAmber/90"
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
}
