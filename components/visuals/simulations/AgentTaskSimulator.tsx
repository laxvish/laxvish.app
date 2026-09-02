"use client";

import { LaxvishConstellationStage } from "@/components/visuals/engine/LaxvishConstellationStage";

interface AgentTaskSimulatorProps {
  slug: string;
  className?: string;
  showConstellationNav?: boolean;
}

export function AgentTaskSimulator({
  slug,
  className = "",
  showConstellationNav = false,
}: AgentTaskSimulatorProps) {
  return (
    <LaxvishConstellationStage
      initialSlug={slug}
      className={className}
      showConstellationNav={showConstellationNav}
    />
  );
}
