"use client";

import { useLaxvishContext } from "./client.tsx";

export function useNarrative() {
  const {
    contextGraph,
    activeStage,
    setActiveStage,
    streamNarrativeStage,
    isStreaming,
    streamingToken,
    isLocationCalibrating,
  } = useLaxvishContext();

  const currentNarrative = contextGraph.narratives[activeStage];

  return {
    activeStage,
    setActiveStage,
    currentNarrative,
    allNarratives: contextGraph.narratives,
    hypotheses: contextGraph.hypotheses,
    topSolution: contextGraph.topSolution,
    environment: contextGraph.environment,
    streamNarrativeStage,
    isStreaming,
    streamingToken,
    isLocationCalibrating,
  };
}
