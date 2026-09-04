"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

const TRANSITION_MS = 550;
const PARTIAL_FLUSH_MS = 150;
const TYPEWRITER_TICK_MS = 28;
const HOLD_DURATION_MS = 3000;

function parseThoughtAndNarrative(raw: string): { thought: string; text: string } {
  if (!raw) return { thought: "", text: "" };

  const thinkMatch = raw.match(/<think>([\s\S]*?)<\/think>/i);
  if (thinkMatch) {
    const thought = thinkMatch[1].trim();
    const text = raw.replace(/<think>[\s\S]*?<\/think>/i, "").trim();
    return { thought, text };
  }

  const openThinkMatch = raw.match(/<think>([\s\S]*)$/i);
  if (openThinkMatch) {
    return { thought: openThinkMatch[1].trim(), text: "" };
  }

  return { thought: "", text: raw.trim() };
}

export function PersonalizedIntelligenceSection() {
  const { contextGraph } = useLaxvishContext();
  const sessionId = contextGraph.sessionId;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [liveTexts, setLiveTexts] = useState<Partial<Record<NarrativeStage, string>>>({});
  const [liveThoughts, setLiveThoughts] = useState<Partial<Record<NarrativeStage, string>>>({});
  const [showInspector, setShowInspector] = useState<boolean>(false);
  const [displayedLength, setDisplayedLength] = useState<number>(0);

  const prefersReducedMotion = Boolean(
    contextGraph.technical?.prefersReducedMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
  );

  const firedForSession = useRef<string>("");
  const abortRef = useRef<AbortController[]>([]);

  // Abort in-flight streams on unmount and re-arm the fire guard so a
  // StrictMode remount can refetch instead of skipping an aborted prefetch.
  useEffect(() => {
    return () => {
      abortRef.current.forEach((controller) => controller.abort());
      abortRef.current = [];
      firedForSession.current = "";
    };
  }, []);

  // Fetch all five narratives in parallel once the session exists.
  // The stages are independent server-side, so wall-clock time is the slowest
  // single stream rather than the sum of five serial streams. The displayed
  // stage streams visibly; the other four warm silently in the background.
  useEffect(() => {
    if (!sessionId || firedForSession.current === sessionId) return;
    firedForSession.current = sessionId;

    const controllers = ROTATION_STAGES.map(() => new AbortController());
    abortRef.current = controllers;

    ROTATION_STAGES.forEach((stage, index) => {
      const controller = controllers[index];

      void (async () => {
        let buffered = "";
        let finalCleanText: string | null = null;
        let finalThought: string | null = null;
        let lastFlush = 0;

        const flush = () => {
          const now = Date.now();
          if (now - lastFlush >= PARTIAL_FLUSH_MS) {
            lastFlush = now;
            const parsed = parseThoughtAndNarrative(buffered);
            if (parsed.text) {
              setLiveTexts((prev) => ({ ...prev, [stage]: parsed.text }));
            }
            if (parsed.thought) {
              setLiveThoughts((prev) => ({ ...prev, [stage]: parsed.thought }));
            }
          }
        };

        try {
          const response = await fetch("/api/narrative/stream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, stage }),
            signal: controller.signal,
          });
          if (!response.ok || !response.body) return;

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let carry = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            carry += decoder.decode(value, { stream: true });
            const lines = carry.split("\n");
            carry = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              try {
                const parsed = JSON.parse(line.slice(6));
                if (parsed.token) {
                  buffered += parsed.token;
                  flush();
                }
                if (parsed.text) {
                  finalCleanText = parsed.text;
                }
                if (parsed.thought) {
                  finalThought = parsed.thought;
                }
                if (parsed.fullText && !finalCleanText) {
                  const extracted = parseThoughtAndNarrative(parsed.fullText);
                  finalCleanText = extracted.text || parsed.fullText;
                  if (extracted.thought) finalThought = extracted.thought;
                }
              } catch {
                // Ignore a JSON object split across network chunks.
              }
            }
          }

          const resolved = parseThoughtAndNarrative(buffered);
          const text = finalCleanText ?? resolved.text;
          const thought = finalThought ?? resolved.thought;

          if (text) {
            setLiveTexts((prev) => ({ ...prev, [stage]: text }));
          }
          if (thought) {
            setLiveThoughts((prev) => ({ ...prev, [stage]: thought }));
          }
        } catch {
          // Aborted or failed: keep any partial text that already landed.
        }
      })();
    });
  }, [sessionId]);

  const currentStage = ROTATION_STAGES[activeIndex];

  const currentText = useMemo(() => {
    const live = liveTexts[currentStage];
    if (live) return live;

    const fromGraph = contextGraph.narratives[currentStage]?.text;
    if (fromGraph) {
      return parseThoughtAndNarrative(fromGraph).text || fromGraph;
    }
    return "Connecting to enterprise intelligence context...";
  }, [liveTexts, contextGraph.narratives, currentStage]);

  // Reset typewriter on stage switch, or set full text when reduced motion is preferred.
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(currentText.length);
    } else {
      setDisplayedLength(0);
    }
  }, [activeIndex, prefersReducedMotion]);

  // Incremental typewriter reveal toward currentText length at calm readable cadence
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(currentText.length);
      return;
    }

    if (displayedLength >= currentText.length) {
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => {
        if (prev >= currentText.length) {
          return prev;
        }
        const remaining = currentText.length - prev;
        const step = remaining > 160 ? 2 : 1;
        return Math.min(prev + step, currentText.length);
      });
    }, TYPEWRITER_TICK_MS);

    return () => clearTimeout(timer);
  }, [currentText.length, displayedLength, prefersReducedMotion]);

  // Completion-driven stage advance: hold completed text on screen before advancing
  useEffect(() => {
    // Stage NEVER advances while displayedLength < currentText.length
    if (displayedLength < currentText.length || currentText.length === 0) {
      return;
    }

    const holdTimer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATION_STAGES.length);
    }, HOLD_DURATION_MS);

    return () => clearTimeout(holdTimer);
  }, [activeIndex, currentText.length, displayedLength]);

  const displayedText = prefersReducedMotion
    ? currentText
    : currentText.slice(0, displayedLength);

  const isTyping = !prefersReducedMotion && displayedLength < currentText.length;

  const currentThought = useMemo(() => {
    return (
      liveThoughts[currentStage] ||
      contextGraph.narratives[currentStage]?.thought ||
      ""
    );
  }, [liveThoughts, contextGraph.narratives, currentStage]);

  const evidenceUsed = useMemo(() => {
    return contextGraph.narratives[currentStage]?.evidenceUsed || [];
  }, [contextGraph.narratives, currentStage]);

  return (
    <section
      id="intelligence"
      className="w-full bg-obsidian border-b border-charcoal/20 py-20 sm:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="border border-charcoal/20 bg-obsidian min-h-[60vh] sm:min-h-[72vh] p-8 sm:p-16 lg:p-24 flex flex-col justify-between">
          {/* Top metadata & Discrete Thinking Inspector Toggle */}
          <div className="flex items-center justify-between w-full pb-8 border-b border-charcoal/10 relative z-10">
            <div className="flex items-center gap-3">
              <span className="inline-block w-1.5 h-1.5 bg-charcoal" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                {`MOMENT 0${activeIndex + 1} / 0${ROTATION_STAGES.length}`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowInspector((prev) => !prev)}
              aria-expanded={showInspector}
              className="text-[11px] font-mono tracking-[0.15em] text-neonCyan hover:text-charcoal border border-charcoal/20 px-2.5 py-1 bg-obsidian hover:bg-vaultAmber transition-colors uppercase cursor-pointer select-none touch-manipulation"
            >
              {`[ SYS_THINK // ${showInspector ? "HIDE" : "INSPECT"} ]`}
            </button>
          </div>

          {/* Main Editorial Paragraph (Thinking is hidden here) */}
          <div className="max-w-3xl w-full my-auto py-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
                className="text-[clamp(1.25rem,2.4vw,1.875rem)] font-normal leading-[1.5] tracking-[-0.01em] text-charcoal font-space-grotesk"
              >
                {displayedText}
                {isTyping && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-[2px] h-[0.9em] bg-charcoal ml-1.5 align-baseline animate-pulse"
                  />
                )}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Optional Collapsible Thinking Inspector Panel */}
          <AnimatePresence>
            {showInspector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden border-t border-charcoal/20 pt-6 mt-4"
              >
                <div className="bg-vaultAmber/40 border border-charcoal/15 p-5 sm:p-6 font-mono">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.18em] text-neonCyan uppercase pb-3 border-b border-charcoal/10 mb-3">
                    <span>REASONING TRACE</span>
                    <span>CONFIDENCE: {(contextGraph.narratives[currentStage]?.confidence ?? 0.85) * 100}%</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-charcoal/90 leading-relaxed font-mono whitespace-pre-wrap">
                    {currentThought || "Synthesizing real-time telemetry and environmental observations..."}
                  </p>
                  {evidenceUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-charcoal/10">
                      {evidenceUsed.map((ev) => (
                        <span
                          key={ev}
                          className="text-[10px] tracking-wider text-neonCyan border border-charcoal/15 px-2 py-0.5 uppercase"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
