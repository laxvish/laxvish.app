import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PillarsGrid } from "@/components/sections/PillarsGrid";

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
