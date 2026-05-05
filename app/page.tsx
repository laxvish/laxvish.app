import type { Metadata } from "next";
import { CallmeSection } from "@/components/sections/CallmeSection";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Enterprise AI Operating System — Workers, Brain, Brakes",
  description:
    "Laxvish is the enterprise AI operating system that deploys domain AI agents, orchestrates workflows with centralized intelligence, and verifies every outcome. Move from AI experiments to real operations.",
  path: "/",
  keywords: [
    "enterprise ai operating system",
    "ai workflow platform",
    "ai orchestration system",
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
