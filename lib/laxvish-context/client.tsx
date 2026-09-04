"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  LaxvishContextGraph,
  LaxvishEvent,
  NarrativeMoment,
  NarrativeStage,
} from "./types.ts";

interface LaxvishContextValue {
  contextGraph: LaxvishContextGraph;
  activeStage: NarrativeStage;
  setActiveStage: (stage: NarrativeStage) => void;
  streamNarrativeStage: (stage: NarrativeStage) => Promise<void>;
  isStreaming: boolean;
  isLocationCalibrating: boolean;
  requestPreciseLocation: () => void;
  streamingToken: string;
}

const DEFAULT_GRAPH: LaxvishContextGraph = {
  sessionId: "",
  anonymousVisitorId: "",
  isReturning: false,
  technical: {
    platform: "Android",
    deviceClass: "mobile",
    browser: "Chrome",
    viewport: { width: 412, height: 915, pixelRatio: 2.6 },
    touchSupported: true,
    prefersReducedMotion: false,
    colorScheme: "light",
  },
  temporal: {
    clientTimestamp: Date.now(),
    serverTimestamp: Date.now(),
    timezone: "Asia/Kolkata",
    localHour: 12,
    localDayOfWeek: "Friday",
    isWeekend: false,
    sessionDurationSec: 0,
  },
  environment: {
    locationSource: "none",
    locationConfidence: 0.35,
    confidenceTier: "L1",
    city: "India Region",
    country: "IN",
    categories: {
      healthcare: 0.25,
      education: 0.30,
      business: 0.75,
      finance: 0.40,
      government: 0.20,
      retail: 0.35,
      transport: 0.30,
      hospitality: 0.25,
      industrial: 0.45,
      residential: 0.50,
      cultural: 0.20,
    },
    nearestRepresentative: [],
  },
  behavior: {
    sections: {},
    topicsOfInterest: {},
    attentionScore: 0.5,
    readingDepthScore: 0.2,
    backtrackingRatio: 0.0,
    ctasClicked: [],
    searchQueries: [],
  },
  direct: {
    promptQueries: [],
  },
  hypotheses: [
    {
      id: "hyp_init",
      problemKey: "workflow_fragmentation",
      title: "Cross-Functional Enterprise Workflow Automation",
      confidence: 0.65,
      supportingEvidence: ["Enterprise platform visitor pattern"],
      status: "hypothesis",
    },
  ],
  narratives: {},
  activeStage: "arrival",
};

const LaxvishContext = createContext<LaxvishContextValue | null>(null);

export function LaxvishContextProvider({ children }: { children: ReactNode }) {
  const [contextGraph, setContextGraph] = useState<LaxvishContextGraph>(DEFAULT_GRAPH);
  const [activeStage, setActiveStage] = useState<NarrativeStage>("arrival");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamingToken, setStreamingToken] = useState<string>("");
  const [isLocationCalibrating, setIsLocationCalibrating] = useState<boolean>(false);

  const eventBufferRef = useRef<LaxvishEvent[]>([]);
  const activeStageRef = useRef<NarrativeStage>(activeStage);
  activeStageRef.current = activeStage;

  const sessionIdRef = useRef<string>("");

  // 1. Silent Background Geolocation Request
  const requestPreciseLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    setIsLocationCalibrating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocationCalibrating(false);
        const { latitude, longitude, accuracy } = pos.coords;

        if (sessionIdRef.current) {
          try {
            const res = await fetch("/api/context/location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sessionId: sessionIdRef.current,
                coordinates: { latitude, longitude, accuracy },
              }),
            });
            const data = await res.json();
            if (data.ok && data.data.environment) {
              setContextGraph((prev) => ({
                ...prev,
                environment: data.data.environment,
                hypotheses: data.data.activeHypothesis ? [data.data.activeHypothesis, ...prev.hypotheses.slice(1)] : prev.hypotheses,
              }));
            }
          } catch (err) {
            console.error("[Silent Location Sync Error]", err);
          }
        }
      },
      (err) => {
        // Silent failure - do not show invasive warnings
        setIsLocationCalibrating(false);
      },
      { timeout: 8000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  }, []);

  // 2. Stream Narrative Stage from Server SSE
  const streamNarrativeStage = useCallback(
    async (stage: NarrativeStage) => {
      if (!sessionIdRef.current || isStreaming) return;

      // If already generated and cached, switch directly
      if (contextGraph.narratives[stage]?.text) {
        setActiveStage(stage);
        return;
      }

      setIsStreaming(true);
      setActiveStage(stage);
      setStreamingToken("");

      try {
        const response = await fetch("/api/narrative/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            stage,
          }),
        });

        if (!response.body) {
          setIsStreaming(false);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedText = "";
        let streamMeta: Partial<NarrativeMoment> = {};

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("event: token")) {
              continue;
            }
            if (line.startsWith("event: meta")) {
              continue;
            }
            if (line.startsWith("data: ")) {
              try {
                const parsed = JSON.parse(line.slice(6));
                if (parsed.token) {
                  accumulatedText += parsed.token;
                  setStreamingToken(accumulatedText);
                } else if (parsed.confidence !== undefined) {
                  streamMeta = parsed;
                }
              } catch {
                // Ignore malformed partial chunks
              }
            }
          }
        }

        const newMoment: NarrativeMoment = {
          stage,
          text: accumulatedText || "Context synthesized successfully.",
          confidence: streamMeta.confidence || 0.85,
          evidenceUsed: streamMeta.evidenceUsed || [],
          solutionCandidate: streamMeta.solutionCandidate,
          generatedAt: Date.now(),
          isFallback: false,
        };

        setContextGraph((prev) => ({
          ...prev,
          narratives: {
            ...prev.narratives,
            [stage]: newMoment,
          },
          activeStage: stage,
        }));
      } catch (err) {
        console.error("[Stream Narrative Client Error]", err);
      } finally {
        setIsStreaming(false);
      }
    },
    [contextGraph.narratives, isStreaming]
  );

  // 3. Initial Session Boot & Silent Geolocation on mount
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        const technical = {
          platform: /Android/i.test(navigator.userAgent)
            ? ("Android" as const)
            : /iPhone|iPad/i.test(navigator.userAgent)
            ? ("iOS" as const)
            : /Mac/i.test(navigator.userAgent)
            ? ("macOS" as const)
            : /Win/i.test(navigator.userAgent)
            ? ("Windows" as const)
            : ("Other" as const),
          deviceClass: window.innerWidth < 640 ? ("mobile" as const) : window.innerWidth < 1024 ? ("tablet" as const) : ("desktop" as const),
          browser: /Chrome/i.test(navigator.userAgent) ? ("Chrome" as const) : /Safari/i.test(navigator.userAgent) ? ("Safari" as const) : ("Other" as const),
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
          },
          touchSupported: "ontouchstart" in window || navigator.maxTouchPoints > 0,
          prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          colorScheme: "light" as const,
        };

        const res = await fetch("/api/context/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            temporal: {
              clientTimestamp: Date.now(),
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            technical,
            referrer: document.referrer,
          }),
        });

        const json = await res.json();
        if (isMounted && json.ok && json.data) {
          sessionIdRef.current = json.data.sessionId;

          setContextGraph((prev) => ({
            ...prev,
            sessionId: json.data.sessionId,
            isReturning: json.data.isReturning,
            environment: json.data.environment || prev.environment,
            hypotheses: json.data.hypotheses || prev.hypotheses,
            topSolution: json.data.topSolution || prev.topSolution,
            narratives: json.data.narratives || prev.narratives,
          }));

          // Trigger silent background location calibration immediately upon opening website
          requestPreciseLocation();
        }
      } catch (err) {
        console.error("[Context Init Error]", err);
      }
    }

    initSession();

    return () => {
      isMounted = false;
    };
  }, [requestPreciseLocation]);

  // 4. Batched Event Dispatch Loop (Every 2.5s)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!sessionIdRef.current || eventBufferRef.current.length === 0) return;

      const eventsToSend = [...eventBufferRef.current];
      eventBufferRef.current = [];

      try {
        await fetch("/api/context/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            events: eventsToSend,
            aggregatedFeatures: {
              attentionScore: contextGraph.behavior.attentionScore,
              readingDepthScore: contextGraph.behavior.readingDepthScore,
              topicsOfInterest: contextGraph.behavior.topicsOfInterest,
            },
          }),
        });
      } catch (err) {
        console.error("[Events Batch Error]", err);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [contextGraph.behavior]);

  return (
    <LaxvishContext.Provider
      value={{
        contextGraph,
        activeStage,
        setActiveStage,
        streamNarrativeStage,
        isStreaming,
        isLocationCalibrating,
        requestPreciseLocation,
        streamingToken,
      }}
    >
      {children}
    </LaxvishContext.Provider>
  );
}

export function useLaxvishContext() {
  const ctx = useContext(LaxvishContext);
  if (!ctx) {
    throw new Error("useLaxvishContext must be used within a LaxvishContextProvider");
  }
  return ctx;
}
