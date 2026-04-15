import type { Metadata } from "next";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Enterprise AI OS for Workers, Brain and Brakes",
  description:
    "Deploy enterprise AI workers, orchestrate with centralized intelligence, and enforce verification controls with Laxvish.",
  path: "/",
  keywords: ["enterprise ai platform", "ai workers", "ai verification"],
});

export default function Home() {
  return (
    <>
      <Hero />
      <PillarsGrid />
      <ContactPanel />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
