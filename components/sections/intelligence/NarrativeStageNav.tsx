"use client";

import React from "react";
import { NarrativeMoment, NarrativeStage } from "@/lib/context/types";

interface NarrativeStageNavProps {
  activeStage: NarrativeStage;
  narratives: Partial<Record<NarrativeStage, NarrativeMoment>>;
  onSelectStage?: (stage: NarrativeStage) => void;
}

const STAGES: { key: NarrativeStage; label: string; step: string }[] = [
  { key: "arrival", label: "ARRIVAL", step: "01" },
  { key: "environment", label: "ENVIRONMENT", step: "02" },
  { key: "opportunity", label: "AI LEVERAGE", step: "03" },
  { key: "interaction", label: "INTERACTION", step: "04" },
  { key: "synthesis", label: "SYNTHESIS", step: "05" },
];

export function NarrativeStageNav({
  activeStage,
  narratives,
  onSelectStage,
}: NarrativeStageNavProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-charcoal/10 pb-4">
      {STAGES.map((s) => {
        const isActive = activeStage === s.key;
        const isReady = Boolean(narratives[s.key]?.text);

        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onSelectStage?.(s.key)}
            className={`flex flex-col text-left p-2.5 transition-colors border ${
              isActive
                ? "border-charcoal bg-charcoal text-obsidian"
                : isReady
                ? "border-charcoal/20 bg-obsidian text-charcoal hover:border-charcoal/50"
                : "border-charcoal/10 bg-vaultAmber/30 text-neonCyan hover:border-charcoal/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[9px] font-mono tracking-[0.2em] font-semibold ${
                  isActive ? "text-obsidian/70" : "text-neonCyan"
                }`}
              >
                {s.step}
              </span>
              {isReady && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-obsidian" : "bg-charcoal"
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-1 text-[10px] font-mono font-medium tracking-[0.12em] uppercase truncate ${
                isActive ? "text-obsidian" : "text-charcoal"
              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
