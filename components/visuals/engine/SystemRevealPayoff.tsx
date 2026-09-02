"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export function SystemRevealPayoff() {
  const [activeLayer, setActiveLayer] = useState<"all" | "workers" | "brain" | "brakes">("all");
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Auto-cycle through the 3 layers
  useEffect(() => {
    if (!isSimulating) return;
    const timers = [
      setTimeout(() => setActiveLayer("workers"), 1600),
      setTimeout(() => setActiveLayer("brain"), 4200),
      setTimeout(() => setActiveLayer("brakes"), 6800),
      setTimeout(() => setActiveLayer("all"), 9400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [activeLayer, isSimulating]);

  const nodes = [
    { id: "exec", name: "Executive", x: 50, y: 15, color: "#F59E0B" },
    { id: "mktg", name: "Marketing", x: 18, y: 35, color: "#EC4899" },
    { id: "fin", name: "Finance", x: 82, y: 35, color: "#10B981" },
    { id: "sales", name: "Sales", x: 18, y: 65, color: "#F59E0B" },
    { id: "hr", name: "People & HR", x: 82, y: 65, color: "#8B5CF6" },
    { id: "supp", name: "Support", x: 32, y: 85, color: "#06B6D4" },
    { id: "it", name: "IT Helpdesk", x: 68, y: 85, color: "#3B82F6" },
    { id: "know", name: "Knowledge", x: 50, y: 92, color: "#8B5CF6" },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
      <div className="relative mx-auto w-full overflow-hidden rounded-[2.5rem] bg-[#07090E] p-6 text-white sm:p-12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border border-white/15">
        {/* Deep Cosmic Ambient Lighting */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04]" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span>THE OPERATING SYSTEM REVEAL</span>
          </div>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] tracking-tight text-white">
            ONE OPERATING SYSTEM.<br />
            THOUSANDS OF TASKS.<br />
            ONE INTELLIGENT FLOW.
          </h2>
          <p className="font-serif text-lg italic text-cyan-100/80 sm:text-2xl">
            &ldquo;The work gets done. You stay in control.&rdquo;
          </p>
        </div>

        {/* Architecture Switcher / Layer Selector */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/40 text-[10px] uppercase font-bold mr-1">Select Lens:</span>
            <button
              type="button"
              onClick={() => {
                setIsSimulating(false);
                setActiveLayer("all");
              }}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeLayer === "all"
                  ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 border border-white/15 text-white hover:border-white/40"
              }`}
            >
              00 · Unified Organism
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSimulating(false);
                setActiveLayer("workers");
              }}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeLayer === "workers"
                  ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_#f59e0b]"
                  : "bg-white/5 border border-white/15 text-white hover:border-white/40"
              }`}
            >
              01 · Workers (Execution Hands)
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSimulating(false);
                setActiveLayer("brain");
              }}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeLayer === "brain"
                  ? "bg-cyan-400 text-black font-bold shadow-[0_0_15px_#22d3ee]"
                  : "bg-white/5 border border-white/15 text-white hover:border-white/40"
              }`}
            >
              02 · Brain (Nervous System)
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSimulating(false);
                setActiveLayer("brakes");
              }}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeLayer === "brakes"
                  ? "bg-emerald-400 text-black font-bold shadow-[0_0_15px_#34d399]"
                  : "bg-white/5 border border-white/15 text-white hover:border-white/40"
              }`}
            >
              03 · Brakes (Verification & Safety)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            {isSimulating ? "Pause Auto Tour" : "Resume Auto Tour"}
          </button>
        </div>

        {/* Grand Central Architectural Visual Stage */}
        <div className="relative z-10 my-10 flex min-h-[440px] w-full items-center justify-center rounded-3xl border border-white/15 bg-black/60 p-6 shadow-2xl backdrop-blur-xl sm:min-h-[500px]">
          {/* Background Vector Lines */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
            {nodes.map((node) => (
              <motion.line
                key={`reveal-line-${node.id}`}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke={node.color}
                strokeOpacity={
                  activeLayer === "brain" || activeLayer === "all" ? 0.7 : 0.15
                }
                strokeWidth={activeLayer === "brain" ? "1.75" : "0.75"}
                strokeDasharray={activeLayer === "brain" ? "3 3" : "none"}
                filter={activeLayer === "brain" ? `drop-shadow(0 0 8px ${node.color})` : "none"}
              />
            ))}

            {/* Central Core Circle */}
            <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
            <motion.circle
              cx="50"
              cy="50"
              r="12"
              stroke="#22D3EE"
              strokeWidth="0.75"
              fill="none"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          </svg>

          {/* Center Label */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-black px-4 py-1 font-mono text-[9px] font-bold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] pointer-events-none z-20">
            LAXVISH NUCLEUS
          </div>

          {/* Perimeter Nodes */}
          {nodes.map((node) => {
            return (
              <div
                key={node.id}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="relative flex flex-col items-center">
                  {/* Brakes Safety Ring */}
                  {(activeLayer === "brakes" || activeLayer === "all") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -inset-3 rounded-full border-2 border-emerald-400 shadow-[0_0_15px_#34d399] pointer-events-none"
                    />
                  )}

                  {/* Node Box */}
                  <div
                    className={`flex items-center gap-2 rounded-2xl border p-2.5 font-mono text-xs shadow-xl backdrop-blur-md transition-all ${
                      activeLayer === "workers"
                        ? "border-amber-400 bg-amber-950/80 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105"
                        : activeLayer === "brakes"
                        ? "border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                        : "border-white/20 bg-white/10 text-white"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: node.color,
                        boxShadow: `0 0 8px ${node.color}`,
                      }}
                    />
                    <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">
                      {node.name}
                    </span>
                  </div>

                  {/* Sub-label per layer */}
                  {activeLayer === "brakes" && (
                    <span className="mt-1 font-mono text-[8px] font-bold text-emerald-300 bg-emerald-950/90 rounded-full px-2 py-0.5 border border-emerald-400/40">
                      BRAKES VERIFIED ✓
                    </span>
                  )}
                  {activeLayer === "workers" && (
                    <span className="mt-1 font-mono text-[8px] text-amber-300 font-semibold">
                      HANDS EXECUTING
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Pillar Architectural Deep Cards */}
        <div className="relative z-10 grid gap-6 md:grid-cols-3 font-mono text-xs">
          {/* Pillar 1: Workers */}
          <div
            className={`rounded-3xl border p-6 transition-all backdrop-blur-xl ${
              activeLayer === "workers" || activeLayer === "all"
                ? "border-amber-400/60 bg-amber-950/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                : "border-white/10 bg-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-amber-400 uppercase font-bold text-[10px]">LAYER 01 : WORKERS</span>
              <span className="font-bold text-white">THE HANDS</span>
            </div>
            <p className="mt-3 font-sans text-xs text-white/80 leading-relaxed">
              Autonomous specialists trained on single workflows: qualifying leads, answering WhatsApp tickets, parsing complex multi-page invoices, and indexing policies.
            </p>
            <Link
              href="/workers"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-300 underline underline-offset-4 hover:text-amber-200"
            >
              <span>Read Workers architecture</span>
              <span>→</span>
            </Link>
          </div>

          {/* Pillar 2: Brain */}
          <div
            className={`rounded-3xl border p-6 transition-all backdrop-blur-xl ${
              activeLayer === "brain" || activeLayer === "all"
                ? "border-cyan-400/60 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                : "border-white/10 bg-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-cyan-400 uppercase font-bold text-[10px]">LAYER 02 : BRAIN</span>
              <span className="font-bold text-white">THE NERVOUS SYSTEM</span>
            </div>
            <p className="mt-3 font-sans text-xs text-white/80 leading-relaxed">
              The central orchestration layer routing the Thread between enterprise tools: synchronizing Salesforce, SAP, Tally, Slack, and Okta without data siloing.
            </p>
            <Link
              href="/brain"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
            >
              <span>Read Brain architecture</span>
              <span>→</span>
            </Link>
          </div>

          {/* Pillar 3: Brakes */}
          <div
            className={`rounded-3xl border p-6 transition-all backdrop-blur-xl ${
              activeLayer === "brakes" || activeLayer === "all"
                ? "border-emerald-400/60 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                : "border-white/10 bg-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-emerald-400 uppercase font-bold text-[10px]">LAYER 03 : BRAKES</span>
              <span className="font-bold text-emerald-300">THE VERIFICATION GATE</span>
            </div>
            <p className="mt-3 font-sans text-xs text-white/80 leading-relaxed">
              The safety protocol pausing actions at high-stakes boundaries: calculating uncertainty, validating tax compliance, enforcing DPDP redactions, and logging audit trails.
            </p>
            <Link
              href="/brakes"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
            >
              <span>Read Brakes architecture</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
