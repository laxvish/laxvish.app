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

const ROTATION_INTERVAL_MS = 3000;
const TRANSITION_MS = 550;
const PARTIAL_FLUSH_MS = 200;

export function PersonalizedIntelligenceSection() {
  const { contextGraph } = useLaxvishContext();
  const sessionId = contextGraph.sessionId;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [liveTexts, setLiveTexts] = useState<Partial<Record<NarrativeStage, string>>>({});

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
  // Gated on sessionId because init is asynchronous: mount-time calls made
  // before the session exists would otherwise bail out and never retry.
  useEffect(() => {
    if (!sessionId || firedForSession.current === sessionId) return;
    firedForSession.current = sessionId;

    const controllers = ROTATION_STAGES.map(() => new AbortController());
    abortRef.current = controllers;

    ROTATION_STAGES.forEach((stage, index) => {
      const controller = controllers[index];

      void (async () => {
        let buffered = "";
        let finalText: string | null = null;
        let lastFlush = 0;

        const flush = () => {
          const now = Date.now();
          if (now - lastFlush >= PARTIAL_FLUSH_MS) {
            lastFlush = now;
            setLiveTexts((prev) => ({ ...prev, [stage]: buffered }));
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
                // Prefer the authoritative done-event text over accumulated
                // tokens, which can lose fragments at chunk boundaries.
                if (parsed.fullText) {
                  finalText = parsed.fullText;
                }
              } catch {
                // Ignore a JSON object split across network chunks.
              }
            }
          }

          const text = finalText ?? buffered;
          if (text) {
            setLiveTexts((prev) => ({ ...prev, [stage]: text }));
          }
        } catch {
          // Aborted or failed: keep any partial text that already landed.
        }
      })();
    });
  }, [sessionId]);

  // Advance the active thought every 3 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATION_STAGES.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const currentStage = ROTATION_STAGES[activeIndex];
  const currentText = useMemo(
    () =>
      liveTexts[currentStage] ||
      contextGraph.narratives[currentStage]?.text ||
      "—",
    [liveTexts, contextGraph.narratives, currentStage]
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
