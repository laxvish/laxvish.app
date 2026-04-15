import type { Metadata } from "next";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageHero } from "@/components/sections/depth/PageHero";
import { buildPageMetadata } from "@/lib/seo";

const FAQ_HERO = {
  eyebrow: "FAQ",
  title: "Answers for enterprise teams evaluating Laxvish.",
  summary:
    "Explore deployment, governance, and implementation questions before your pilot.",
};

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "Get answers to common enterprise AI deployment, governance, and pilot questions.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={FAQ_HERO.eyebrow}
        title={FAQ_HERO.title}
        summary={FAQ_HERO.summary}
      />
      <FaqAccordion />
    </>
  );
}
