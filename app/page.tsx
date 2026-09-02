import type { Metadata } from "next";
import { CallmeSection } from "@/components/sections/CallmeSection";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
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
      <PillarsGrid />
      <CallmeSection />
      <ContactPanel />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
