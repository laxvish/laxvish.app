import type { Metadata } from "next";
import { PageBlocks } from "@/components/sections/depth/PageBlocks";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Security and Trust for Enterprise AI",
  description:
    "Review DPDP-first trust controls, data minimization, and secure enterprise AI operating posture.",
  path: "/security-trust",
});

export default function SecurityTrustPage() {
  const content = PAGE_CONTENT["security-trust"];

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        summary={content.summary}
        shape="octahedron"
      />
      <PageBlocks details={content.details} outcomes={content.outcomes} />
    </>
  );
}
