"use client";

import React, { useRef, useCallback } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { NarrativeConsole } from "./intelligence/NarrativeConsole";
import { LiveTelemetryLedger } from "./intelligence/LiveTelemetryLedger";
import { useLaxvishContext } from "@/lib/laxvish-context/client";
import { NarrativeStage } from "@/lib/context/types";

export function PersonalizedIntelligenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    contextGraph,
    activeStage,
    setActiveStage,
    streamNarrativeStage,
    isStreaming,
    streamingToken,
    isLocationCalibrating,
  } = useLaxvishContext();

  const handleStageSelect = useCallback(
    (stage: NarrativeStage) => {
      if (contextGraph.narratives[stage]) {
        setActiveStage(stage);
      } else {
        streamNarrativeStage(stage);
      }
    },
    [contextGraph.narratives, setActiveStage, streamNarrativeStage]
  );

  return (
    <section
      id="intelligence"
      ref={containerRef}
      className="relative isolate w-full border-b border-charcoal/20 bg-obsidian py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-charcoal/20 pb-6 sm:pb-8">
          <div>
            <FadeIn>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 bg-charcoal animate-pulse" />
                <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-neonCyan uppercase">
                  SECTION 02 // REAL-TIME CONTEXT REASONER
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-3 text-[clamp(1.75rem,3.8vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal font-space-grotesk">
                An operating system that understands where it is.
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mt-4 md:mt-0">
            <div className="flex items-center gap-4 text-xs font-mono text-neonCyan">
              <span>LATENCY: &lt;180MS</span>
              <span className="text-charcoal/30">|</span>
              <span>SIGNALS: {contextGraph.environment.locationSource.toUpperCase()}</span>
              <span className="text-charcoal/30">|</span>
              <span className="text-charcoal font-semibold">
                CONFIDENCE: {(contextGraph.environment.locationConfidence * 100).toFixed(0)}%
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Console Workspace Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Legitimate Telemetry Ledger (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <LiveTelemetryLedger
              contextGraph={contextGraph}
              isCalibrating={isLocationCalibrating}
            />
          </div>

          {/* Right Column: Active Narrative Reasoning Console (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <NarrativeConsole
              contextGraph={contextGraph}
              activeStage={activeStage}
              isStreaming={isStreaming}
              streamingToken={streamingToken}
              onSelectStage={handleStageSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
