import type { Metadata } from "next";
import { CallmeSection } from "@/components/sections/CallmeSection";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
import { UseCaseGrid } from "@/components/sections/UseCaseGrid";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Workers for Indian Businesses — Sales, Support, Operations, Finance",
  description:
    "Laxvish builds AI workers that take over the repetitive work in your business — sales calls, customer support, document processing, finance, IT, and more. Built for Indian businesses. DPDP-ready.",
  path: "/",
  keywords: [
    "ai workers for business",
    "ai solutions india",
    "ai sales automation",
    "ai customer support",
    "ai document processing",
    "ai for indian enterprises",
  ],
});

export default function Home() {
  return (
    <>
      <Hero />
      <UseCaseGrid />
      <PillarsGrid />
      <HowItWorks />
      <CallmeSection />
      <ContactPanel />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
