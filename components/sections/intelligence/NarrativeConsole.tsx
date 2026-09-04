"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LaxvishContextGraph, NarrativeStage } from "@/lib/context/types";
import { NarrativeStageNav } from "./NarrativeStageNav";
import { StreamingTextDisplay } from "./StreamingTextDisplay";
import { DiscoveredOpportunityCard } from "./DiscoveredOpportunityCard";
import { DecisionPhase } from "@/lib/motion-system";

interface NarrativeConsoleProps {
  contextGraph: LaxvishContextGraph;
  activeStage: NarrativeStage;
  isStreaming: boolean;
  streamingToken?: string;
  onSelectStage: (stage: NarrativeStage) => void;
}

export const NarrativeConsole = memo(function NarrativeConsole({
  contextGraph,
  activeStage,
  isStreaming,
  streamingToken,
  onSelectStage,
}: NarrativeConsoleProps) {
  const currentNarrative = contextGraph.narratives[activeStage];
  const displayText = isStreaming && streamingToken
    ? streamingToken
    : currentNarrative?.text || "Synthesizing environment and session signals...";

  return (
    <div className="border border-charcoal/20 bg-vaultAmber/50 p-6 sm:p-8 relative">
      {/* Console Top Bar */}
      <div className="flex items-center justify-between border-b border-charcoal/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-charcoal" />
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-charcoal">
            NARRATIVE STAGE // {activeStage.toUpperCase()}
          </span>
        </div>
        <div className="text-[10px] font-mono text-neonCyan uppercase tracking-[0.16em]">
          {isStreaming ? "POOLSIDE_STREAM_ACTIVE" : "HYPOTHESIS_LOCKED"}
        </div>
      </div>

      {/* 5-Stage Stepper Navigation */}
      <div className="mt-6">
        <NarrativeStageNav
          activeStage={activeStage}
          narratives={contextGraph.narratives}
          onSelectStage={onSelectStage}
        />
      </div>

      {/* Primary Narrative Output Stream */}
      <div className="mt-8 min-h-[140px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage + (isStreaming ? "-streaming" : "")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: DecisionPhase.duration.standard, ease: DecisionPhase.ease }}
          >
            <StreamingTextDisplay
              text={displayText}
              isStreaming={isStreaming}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Evidence Provenance Tags */}
      {currentNarrative?.evidenceUsed && currentNarrative.evidenceUsed.length > 0 && (
        <div className="mt-6 pt-4 border-t border-charcoal/10 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neonCyan">
            EVIDENCE:
          </span>
          {currentNarrative.evidenceUsed.map((ev, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 border border-charcoal/20 bg-obsidian text-charcoal"
            >
              {ev}
            </span>
          ))}
        </div>
      )}

      {/* Discovered Solution Blueprint (Shown during Moment 4 & 5) */}
      {(activeStage === "opportunity" || activeStage === "interaction" || activeStage === "synthesis") && (
        <div className="mt-8 pt-6 border-t border-charcoal/20">
          <DiscoveredOpportunityCard
            hypothesis={contextGraph.hypotheses[0]}
            solution={contextGraph.topSolution}
          />
        </div>
      )}
    </div>
  );
});
