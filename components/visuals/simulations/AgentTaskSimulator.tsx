"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSimulationForSlug, type SimulationStep } from "@/lib/simulations-data";

interface AgentTaskSimulatorProps {
  slug: string;
  className?: string;
  autoPlay?: boolean;
}

export function AgentTaskSimulator({
  slug,
  className = "",
  autoPlay = true,
}: AgentTaskSimulatorProps) {
  const config = getSimulationForSlug(slug);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-advance loop every 3.8s when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % config.steps.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying, config.steps.length]);

  const currentStep: SimulationStep = config.steps[activeStepIndex];

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white shadow-xl shadow-charcoal/5 ${className}`}
    >
      {/* Top HUD Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-charcoal/10 bg-vaultAmber/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="hidden font-mono text-xs font-semibold text-charcoal/40 sm:inline">
            /
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-charcoal">
              {config.agentName}
            </span>
            <span className="hidden rounded-full bg-charcoal/5 px-2 py-0.5 text-[10px] font-medium text-charcoal/70 sm:inline">
              {config.agentRole}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-charcoal/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Speed: {config.runtimeSpeed}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded border border-charcoal/15 bg-white px-2 py-0.5 font-mono text-[10px] font-medium text-charcoal transition-colors hover:border-charcoal hover:bg-vaultAmber"
            title={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? "PAUSE ❚❚" : "PLAY ▶"}
          </button>
        </div>
      </div>

      {/* Stepper Progress Tabs */}
      <div className="grid grid-cols-4 border-b border-charcoal/10 bg-obsidian text-left">
        {config.steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => {
                setActiveStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`group relative flex flex-col justify-between p-2.5 text-left transition-all duration-300 sm:p-4 ${
                isActive
                  ? "bg-white font-medium text-charcoal"
                  : "text-charcoal/50 hover:bg-vaultAmber/30 hover:text-charcoal/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-neonCyan sm:text-xs">
                  0{idx + 1}
                </span>
                {isPassed && (
                  <span className="text-[10px] font-bold text-emerald-600">✓</span>
                )}
              </div>
              <span className="mt-1 line-clamp-1 text-[11px] sm:text-xs">
                {step.label}
              </span>

              {/* Active animated bottom indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-charcoal"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative flex min-h-[300px] flex-col justify-between p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Step header & badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-vaultAmber/50 px-3 py-1 font-mono text-[11px] font-bold text-charcoal">
                {currentStep.badge}
              </span>
              <span className="font-mono text-xs text-charcoal/50">
                Phase {activeStepIndex + 1} of 4: {currentStep.type.toUpperCase()}
              </span>
            </div>

            {/* Step narrative description */}
            <p className="text-base font-normal leading-relaxed text-charcoal sm:text-lg">
              {currentStep.detail}
            </p>

            {/* Concrete Data Inspector Grid */}
            {currentStep.dataSnippet && (
              <div className="relative overflow-hidden rounded-xl border border-charcoal/10 bg-obsidian p-4 font-mono text-xs text-charcoal/90 sm:p-5">
                {/* Laser scan line effect during reasoning / intake */}
                {(currentStep.type === "reasoning" || currentStep.type === "intake") && (
                  <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "linear",
                    }}
                    className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neonCyan/40 to-transparent shadow-[0_0_12px_rgba(102,102,102,0.3)]"
                  />
                )}

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {Object.entries(currentStep.dataSnippet).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex flex-col rounded-lg border border-charcoal/5 bg-white/80 p-2.5 shadow-sm"
                    >
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="mt-0.5 font-semibold text-charcoal">
                        {typeof val === "boolean" ? (val ? "TRUE ✓" : "FALSE ✗") : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Guardrail & Verification Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/10 pt-4 font-mono text-[11px] text-charcoal/60">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-charcoal" />
            <span>Safety Guard: {config.guardrail}</span>
          </div>

          <div className="flex items-center gap-1.5 text-charcoal">
            <span>Verified by Laxvish Brakes</span>
            <span className="font-bold text-emerald-600">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
