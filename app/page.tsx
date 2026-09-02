import type { Metadata } from "next";
import { CallmeSection } from "@/components/sections/CallmeSection";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Systems for Indian Enterprise — Sales, Support, Documents, Telephony",
  description:
    "Laxvish is an AI company that builds AI systems for Indian enterprise. Workers execute, Brain coordinates, Brakes verify — the systems enter messy real-world tasks and deliver finished commitments while you stay in control.",
  path: "/",
  keywords: [
    "ai company india",
    "ai systems for enterprise",
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
