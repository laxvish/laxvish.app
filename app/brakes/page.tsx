import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Verification Brakes for Safe Execution",
  description:
    "Apply verification-first controls, risk-triggered checks, and audit-ready guardrails for AI.",
  path: "/brakes",
});

export default function BrakesPage() {
  const content = PAGE_CONTENT.brakes;

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="cone"
      />
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
