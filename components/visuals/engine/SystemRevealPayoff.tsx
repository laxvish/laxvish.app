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
      setTimeout(() => setActiveLayer("workers"), 1500),
      setTimeout(() => setActiveLayer("brain"), 4000),
      setTimeout(() => setActiveLayer("brakes"), 6500),
      setTimeout(() => setActiveLayer("all"), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [activeLayer, isSimulating]);

  const nodes = [
    { id: "exec", name: "Executive", x: 50, y: 15 },
    { id: "mktg", name: "Marketing", x: 18, y: 35 },
    { id: "fin", name: "Finance", x: 82, y: 35 },
    { id: "sales", name: "Sales", x: 18, y: 65 },
    { id: "hr", name: "People & HR", x: 82, y: 65 },
    { id: "supp", name: "Support", x: 32, y: 85 },
    { id: "it", name: "IT Helpdesk", x: 68, y: 85 },
    { id: "know", name: "Knowledge", x: 50, y: 92 },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
      <div className="relative mx-auto w-full overflow-hidden rounded-[2.5rem] bg-charcoal/5 p-2 ring-1 ring-charcoal/10 shadow-2xl">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[#FAF8F5] p-6 text-charcoal sm:p-12">
          {/* Background Matrix */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06]" />

          {/* Section Header */}
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>THE OPERATING SYSTEM REVEAL</span>
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              ONE OPERATING SYSTEM.<br />
              THOUSANDS OF TASKS.<br />
              ONE INTELLIGENT FLOW.
            </h2>
            <p className="font-serif text-lg italic text-charcoal/80 sm:text-xl">
              &ldquo;The work gets done. You stay in control.&rdquo;
            </p>
          </div>

          {/* Architecture Switcher / Layer Selector */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-charcoal/10 py-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-charcoal/40 text-[10px] uppercase font-bold mr-1">Select Lens:</span>
              <button
                type="button"
                onClick={() => {
                  setIsSimulating(false);
                  setActiveLayer("all");
                }}
                className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                  activeLayer === "all"
                    ? "bg-charcoal text-white font-bold shadow-xs"
                    : "bg-white border border-charcoal/15 text-charcoal hover:border-charcoal"
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
                    ? "bg-charcoal text-white font-bold shadow-xs"
                    : "bg-white border border-charcoal/15 text-charcoal hover:border-charcoal"
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
                    ? "bg-charcoal text-white font-bold shadow-xs"
                    : "bg-white border border-charcoal/15 text-charcoal hover:border-charcoal"
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
                    ? "bg-charcoal text-white font-bold shadow-xs"
                    : "bg-white border border-charcoal/15 text-charcoal hover:border-charcoal"
                }`}
              >
                03 · Brakes (Verification & Safety)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsSimulating(!isSimulating)}
              className="rounded-full border border-charcoal/20 bg-charcoal/5 px-3 py-1 font-mono text-[11px] text-charcoal hover:bg-charcoal hover:text-white transition-colors cursor-pointer"
            >
              {isSimulating ? "Pause Auto Tour" : "Resume Auto Tour"}
            </button>
          </div>

          {/* Grand Central Architectural Visual Stage */}
          <div className="relative z-10 my-8 flex min-h-[420px] w-full items-center justify-center rounded-2xl border border-charcoal/15 bg-white p-6 shadow-sm sm:min-h-[480px]">
            {/* Background Lines */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
              {nodes.map((node) => (
                <motion.line
                  key={`reveal-line-${node.id}`}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke="#111111"
                  strokeOpacity={
                    activeLayer === "brain" || activeLayer === "all" ? 0.6 : 0.1
                  }
                  strokeWidth={activeLayer === "brain" ? "1.5" : "0.75"}
                  strokeDasharray={activeLayer === "brain" ? "3 3" : "none"}
                />
              ))}

              {/* Central Core Circle */}
              <circle cx="50" cy="50" r="5" fill="#111111" />
              <motion.circle
                cx="50"
                cy="50"
                r="12"
                stroke="#111111"
                strokeWidth="0.75"
                fill="none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
            </svg>

            {/* Center Label */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-charcoal bg-[#FAF8F5] px-3.5 py-1 font-mono text-[9px] font-bold text-charcoal shadow-md pointer-events-none z-20">
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
                        animate={{ scale: 1 }}
                        className="absolute -inset-2 rounded-full border border-emerald-500/60 pointer-events-none"
                      />
                    )}

                    {/* Node Box */}
                    <div
                      className={`flex items-center gap-1.5 rounded-xl border p-2 font-mono text-xs shadow-xs transition-all ${
                        activeLayer === "workers"
                          ? "border-charcoal bg-charcoal text-white shadow-md scale-105"
                          : activeLayer === "brakes"
                          ? "border-emerald-700 bg-white text-charcoal ring-1 ring-emerald-500/30"
                          : "border-charcoal/20 bg-white text-charcoal"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          activeLayer === "brakes"
                            ? "bg-emerald-500"
                            : activeLayer === "workers"
                            ? "bg-white"
                            : "bg-charcoal"
                        }`}
                      />
                      <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">
                        {node.name}
                      </span>
                    </div>

                    {/* Sub-label per layer */}
                    {activeLayer === "brakes" && (
                      <span className="mt-1 font-mono text-[8px] font-bold text-emerald-800 bg-emerald-50 rounded px-1 border border-emerald-200">
                        AUDIT CHECKED ✓
                      </span>
                    )}
                    {activeLayer === "workers" && (
                      <span className="mt-1 font-mono text-[8px] text-charcoal/60">
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
              className={`rounded-2xl border p-5 transition-all ${
                activeLayer === "workers" || activeLayer === "all"
                  ? "border-charcoal bg-white shadow-md"
                  : "border-charcoal/10 bg-white/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2">
                <span className="text-neonCyan uppercase font-bold text-[10px]">LAYER 01 : WORKERS</span>
                <span className="font-bold text-charcoal">THE HANDS</span>
              </div>
              <p className="mt-3 font-sans text-xs text-charcoal/80 leading-relaxed">
                Autonomous specialists trained on single workflows: qualifying leads, answering WhatsApp tickets, parsing complex multi-page invoices, and indexing policies.
              </p>
              <Link
                href="/workers"
                className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-charcoal underline underline-offset-4 hover:text-neonCyan"
              >
                <span>Read Workers architecture</span>
                <span>→</span>
              </Link>
            </div>

            {/* Pillar 2: Brain */}
            <div
              className={`rounded-2xl border p-5 transition-all ${
                activeLayer === "brain" || activeLayer === "all"
                  ? "border-charcoal bg-white shadow-md"
                  : "border-charcoal/10 bg-white/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2">
                <span className="text-neonCyan uppercase font-bold text-[10px]">LAYER 02 : BRAIN</span>
                <span className="font-bold text-charcoal">THE NERVOUS SYSTEM</span>
              </div>
              <p className="mt-3 font-sans text-xs text-charcoal/80 leading-relaxed">
                The central orchestration layer routing the Thread between enterprise tools: synchronizing Salesforce, SAP, Tally, Slack, and Okta without data siloing.
              </p>
              <Link
                href="/brain"
                className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-charcoal underline underline-offset-4 hover:text-neonCyan"
              >
                <span>Read Brain architecture</span>
                <span>→</span>
              </Link>
            </div>

            {/* Pillar 3: Brakes */}
            <div
              className={`rounded-2xl border p-5 transition-all ${
                activeLayer === "brakes" || activeLayer === "all"
                  ? "border-charcoal bg-white shadow-md"
                  : "border-charcoal/10 bg-white/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-2">
                <span className="text-neonCyan uppercase font-bold text-[10px]">LAYER 03 : BRAKES</span>
                <span className="font-bold text-emerald-800">THE VERIFICATION GATE</span>
              </div>
              <p className="mt-3 font-sans text-xs text-charcoal/80 leading-relaxed">
                The safety protocol pausing actions at high-stakes boundaries: calculating uncertainty, validating tax compliance, enforcing DPDP redactions, and logging audit trails.
              </p>
              <Link
                href="/brakes"
                className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-charcoal underline underline-offset-4 hover:text-neonCyan"
              >
                <span>Read Brakes architecture</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
