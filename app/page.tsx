import type { Metadata } from "next";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeaturedAgentsShowcase } from "@/components/sections/FeaturedAgentsShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SystemRevealPayoff } from "@/components/visuals/engine/SystemRevealPayoff";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Operating System for Indian Enterprises — Sales, Support, Documents, Telephony",
  description:
    "Laxvish is an intelligent enterprise operating system. The Laxvish Thread enters messy real-world tasks, extracts meaning, coordinates systems, verifies decisions with Brakes, and delivers finished commitments.",
  path: "/",
  keywords: [
    "ai operating system india",
    "laxvish machine",
    "ai sales automation",
    "ai customer support",
    "ai document processing",
    "enterprise ai workers india",
  ],
});

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedAgentsShowcase />
      <SystemRevealPayoff />
      <HowItWorks />
      <ContactPanel />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
