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

const SOLUTION_IMAGES: Record<string, { src: string; alt: string; caption: string }> = {
  "sales-automation": {
    src: "/images/solutions-sales-telemetry.png",
    alt: "Precision chronograph needles and minimalist gauge markings on dial",
    caption: "SPEC. 01 / INBOUND PIPELINE TELEMETRY",
  },
  "marketing-operations": {
    src: "/images/solutions-sales-telemetry.png",
    alt: "Precision chronograph needles and campaign telemetry",
    caption: "SPEC. 01 / CAMPAIGN PIPELINE TELEMETRY",
  },
  "customer-support": {
    src: "/images/solutions-support-acoustic.png",
    alt: "Acoustic waveform etched into brushed aluminum plate",
    caption: "SPEC. 02 / REALTIME CONVERSATIONAL ENGINE",
  },
  "voice-whatsapp": {
    src: "/images/callme-acoustic-macro.png",
    alt: "Studio acoustic condenser capsule and audio transducer",
    caption: "SPEC. 02 / MULTI-MODAL VOICE & WHATSAPP ENGINE",
  },
  "document-processing": {
    src: "/images/solutions-document-optical.png",
    alt: "Precision optical glass prism scanning over document substrate",
    caption: "SPEC. 03 / OPTICAL EXTRACTION & OCR",
  },
  "contract-automation": {
    src: "/images/solutions-document-optical.png",
    alt: "Precision optical document extraction and contract verification",
    caption: "SPEC. 03 / CONTRACT CLAUSE VERIFICATION",
  },
  "internal-knowledge": {
    src: "/images/brain-routing-mesh.png",
    alt: "Optical fiber routing channels and enterprise knowledge index",
    caption: "SPEC. 05 / ENTERPRISE KNOWLEDGE MESH",
  },
  "it-helpdesk": {
    src: "/images/workers-actuator-macro.png",
    alt: "Robotic micro-actuators and IT automation infrastructure",
    caption: "SPEC. 06 / TICKET RESOLUTION WORKER",
  },
  "finance-ap": {
    src: "/images/solutions-finance-balance.png",
    alt: "Micro-engraved calibration weights and polished stainless balance pivot",
    caption: "SPEC. 04 / ACCOUNTS PAYABLE & RECONCILIATION",
  },
  "procurement": {
    src: "/images/solutions-finance-balance.png",
    alt: "Micro-engraved calibration balance and purchase verification",
    caption: "SPEC. 04 / PURCHASE ORDER VERIFICATION",
  },
  "reporting-analytics": {
    src: "/images/verification-wafer-macro.png",
    alt: "Laser-etched serial telemetry and real-time operational reporting",
    caption: "SPEC. 07 / RECONCILED ANALYTICS TELEMETRY",
  },
  "executive-intelligence": {
    src: "/images/security-vault-bolt.png",
    alt: "Solid stainless steel vault locking bolt and executive trust",
    caption: "SPEC. 08 / EXECUTIVE DECISION CONTROL",
  },
  "hr-operations": {
    src: "/images/final-cta-architecture.png",
    alt: "Precision-milled aluminum plates and structured employee lifecycle",
    caption: "SPEC. 09 / HR WORKFLOW ARCHITECTURE",
  },
};

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

  const heroImage =
    SOLUTION_IMAGES[slug] ??
    (uc.category === "Sales & Growth"
      ? SOLUTION_IMAGES["sales-automation"]
      : uc.category === "Customer Operations"
      ? SOLUTION_IMAGES["customer-support"]
      : uc.category === "Finance & Compliance"
      ? SOLUTION_IMAGES["finance-ap"]
      : SOLUTION_IMAGES["document-processing"]);

  return (
    <>
      <PageHero
        eyebrow={uc.eyebrow}
        title={uc.headline}
        summary={uc.subhead}
        image={heroImage}
      />

      {/* What this AI worker does */}
      {uc.whatItDoes.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
          <h2 className="max-w-3xl text-[clamp(1.85rem,4vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            What this AI worker does
          </h2>
          <ul className="mt-8 sm:mt-10 max-w-3xl space-y-5 sm:space-y-6">
            {uc.whatItDoes.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 border-l border-charcoal/20 pl-5 sm:pl-6 text-base leading-relaxed text-charcoal/70"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How a typical engagement works */}
      {uc.engagement.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
          <h2 className="max-w-3xl text-[clamp(1.85rem,4vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            How a typical engagement works
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-8 sm:gap-10 md:grid-cols-3">
            {uc.engagement.map((item) => (
              <div key={item.step} className="flex flex-col border-l border-charcoal/20 pl-5 sm:pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
                  Step {item.step}
                </p>
                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-normal tracking-tight text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What you'd see in the first month */}
      {uc.outcomes.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
          <h2 className="max-w-3xl text-[clamp(1.85rem,4vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            What you&rsquo;d see in the first month
          </h2>
          <ul className="mt-8 sm:mt-10 max-w-3xl space-y-4 sm:space-y-5">
            {uc.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-3.5 text-base leading-relaxed text-charcoal/70"
              >
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/40" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How we keep you in control */}
      {uc.control.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
          <h2 className="max-w-3xl text-[clamp(1.85rem,4vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            How we keep you in control
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-8 sm:gap-10 md:grid-cols-3">
            {uc.control.map((point) => (
              <div key={point} className="flex flex-col border-l border-charcoal/20 pl-5 sm:pl-6">
                <p className="text-base leading-relaxed text-charcoal/70">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related use cases */}
      {related.length > 0 && (
        <section className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-charcoal/10 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase mb-3">
            Related solutions
          </p>
          <h2 className="max-w-3xl text-[clamp(1.85rem,4vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
            More ways we help your business
          </h2>
          <div className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/solutions/${rel.slug}`}
                className="group flex flex-col justify-between border border-charcoal/20 bg-vaultAmber/30 p-6 sm:p-8 transition-colors duration-300 hover:border-charcoal hover:bg-vaultAmber"
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neonCyan">
                    {rel.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl sm:text-2xl font-normal tracking-tight text-charcoal">
                    {rel.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-charcoal/70">
                    {rel.oneLiner}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-medium tracking-wide text-charcoal underline decoration-charcoal/20 underline-offset-4 group-hover:decoration-charcoal">
                  View solution
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
