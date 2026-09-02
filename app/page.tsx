import type { Metadata } from "next";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeaturedAgentsShowcase } from "@/components/sections/FeaturedAgentsShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
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
      <FeaturedAgentsShowcase />
      <PillarsGrid />
      <HowItWorks />
      <ContactPanel />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
