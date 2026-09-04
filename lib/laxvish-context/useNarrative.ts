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
    predictedSolutions,
    activeSolutionIndex,
    setActiveSolutionIndex,
    isPredicting,
    refreshPredictedSolutions,
  } = useLaxvishContext();

  const currentNarrative = contextGraph.narratives[activeStage];
  const currentSolution = predictedSolutions[activeSolutionIndex] || predictedSolutions[0];

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
    predictedSolutions,
    currentSolution,
    activeSolutionIndex,
    setActiveSolutionIndex,
    isPredicting,
    refreshPredictedSolutions,
  };
}
