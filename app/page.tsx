import { CapabilityMatrix } from "@/components/sections/CapabilityMatrix";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { EcosystemCommandStrip } from "@/components/sections/EcosystemCommandStrip";
import { EcosystemMarquee } from "@/components/sections/EcosystemMarquee";
import { EcosystemMesh } from "@/components/sections/EcosystemMesh";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { PillarsGrid } from "@/components/sections/PillarsGrid";
import { TrustRibbon } from "@/components/sections/TrustRibbon";
import { UseCaseRail } from "@/components/sections/UseCaseRail";
import { VerificationPanel } from "@/components/sections/VerificationPanel";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustRibbon />
      <EcosystemMarquee />
      <EcosystemMesh />
      <EcosystemCommandStrip />
      <PillarsGrid />
      <UseCaseRail />
      <VerificationPanel />
      <CapabilityMatrix />
      <FaqAccordion />
      <ContactPanel />
      <FinalCta />
    </>
  );
}
