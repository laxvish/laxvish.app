"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLaxvishContext } from "@/lib/laxvish-context/client";
import { NarrativeStage } from "@/lib/context/types";

const ROTATION_STAGES: NarrativeStage[] = [
  "arrival",
  "environment",
  "opportunity",
  "interaction",
  "synthesis",
];

const ROTATION_INTERVAL_MS = 3000;
const TRANSITION_MS = 550;

export function PersonalizedIntelligenceSection() {
  const { contextGraph, streamNarrativeStage } = useLaxvishContext();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Populate all 5 narratives on mount using the existing client function
  // (no backend changes — only orchestrates calls to the same streamNarrativeStage
  // the original UI used on click). Staggered so the client's isStreamingRef
  // guard serializes them safely.
  useEffect(() => {
    ROTATION_STAGES.forEach((stage, i) => {
      setTimeout(() => streamNarrativeStage(stage), i * 400);
    });
    // Intentionally run once on mount; streamNarrativeStage identity is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Advance the active index every 3 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATION_STAGES.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const currentStage = ROTATION_STAGES[activeIndex];
  const currentText = useMemo(
    () => contextGraph.narratives[currentStage]?.text || "—",
    [contextGraph.narratives, currentStage]
  );

  return (
    <section
      id="intelligence"
      className="w-full bg-obsidian border-b border-charcoal/20 py-20 sm:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="border border-charcoal/20 bg-obsidian min-h-[60vh] sm:min-h-[72vh] p-8 sm:p-16 lg:p-24 flex items-end">
          <div className="max-w-3xl w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
                className="text-[clamp(1.25rem,2.4vw,1.875rem)] font-normal leading-[1.5] tracking-[-0.01em] text-charcoal font-space-grotesk"
              >
                {currentText}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
