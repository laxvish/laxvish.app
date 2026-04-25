import type { Metadata } from "next";
import { CareersApplicationPanel } from "@/components/sections/CareersApplicationPanel";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_CONTENT } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers at Laxvish",
  description:
    "Apply for internship and full-time opportunities to build enterprise AI products with Laxvish.",
  path: "/careers/apply",
});

export default function CareersApplyPage() {
  const content = PAGE_CONTENT.careers;

  return (
    <>
      <PageHero eyebrow={content.eyebrow} title={content.title} summary={content.summary} />
      <CareersApplicationPanel />
    </>
  );
}
