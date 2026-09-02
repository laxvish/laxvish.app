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
    { id: "exec", name: "Executive", x: 50, y: 15, color: "#B6B09F" },
    { id: "mktg", name: "Marketing", x: 18, y: 35, color: "#D8CDB6" },
    { id: "fin", name: "Finance", x: 82, y: 35, color: "#C5A880" },
    { id: "sales", name: "Sales", x: 18, y: 65, color: "#B6B09F" },
    { id: "hr", name: "People & HR", x: 82, y: 65, color: "#EAE4D5" },
    { id: "supp", name: "Support", x: 32, y: 85, color: "#F2F2F2" },
    { id: "it", name: "IT Helpdesk", x: 68, y: 85, color: "#A39E8F" },
    { id: "know", name: "Knowledge", x: 50, y: 92, color: "#C2BCA8" },
  ];

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
      <div className="relative mx-auto w-full overflow-hidden rounded-[2.5rem] bg-[#07080B] p-6 text-charcoal sm:p-12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] border border-vaultAmber/20">
        {/* Deep Cosmic Ambient Lighting */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-vaultAmber/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-vaultAmber/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(182,176,159,0.15)_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
            <span className="h-2 w-2 rounded-full bg-vaultAmber shadow-[0_0_8px_#B6B09F] animate-pulse" />
            <span>THE OPERATING SYSTEM REVEAL</span>
          </div>
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
            ONE OPERATING SYSTEM.<br />
            THOUSANDS OF TASKS.<br />
            ONE INTELLIGENT FLOW.
          </h2>
          <p className="font-serif text-lg italic text-vaultAmber sm:text-2xl">
            &ldquo;The work gets done. You stay in control.&rdquo;
          </p>
        </div>

        {/* Architecture Switcher / Layer Selector */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-vaultAmber/15 py-4 font-mono text-xs">
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
                  ? "bg-charcoal text-obsidian font-bold shadow-md"
                  : "bg-white/5 border border-vaultAmber/20 text-charcoal hover:border-vaultAmber/50"
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
                  ? "bg-vaultAmber text-obsidian font-bold shadow-[0_0_12px_#B6B09F]"
                  : "bg-white/5 border border-vaultAmber/20 text-charcoal hover:border-vaultAmber/50"
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
                  ? "bg-vaultAmber text-obsidian font-bold shadow-[0_0_12px_#B6B09F]"
                  : "bg-white/5 border border-vaultAmber/20 text-charcoal hover:border-vaultAmber/50"
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
                  ? "bg-vaultAmber text-obsidian font-bold shadow-[0_0_12px_#B6B09F]"
                  : "bg-white/5 border border-vaultAmber/20 text-charcoal hover:border-vaultAmber/50"
              }`}
            >
              03 · Brakes (Verification & Safety)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className="rounded-full border border-vaultAmber/25 bg-white/5 px-3 py-1 font-mono text-[11px] text-charcoal hover:bg-white/15 transition-colors cursor-pointer"
          >
            {isSimulating ? "Pause Auto Reel" : "Resume Auto Reel"}
          </button>
        </div>

        {/* Grand Central Architectural Visual Stage */}
        <div className="relative z-10 my-10 flex min-h-[440px] w-full items-center justify-center rounded-3xl border border-vaultAmber/20 bg-voidSurface p-6 shadow-2xl backdrop-blur-xl sm:min-h-[500px]">
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
                filter={activeLayer === "brain" ? `drop-shadow(0 0 6px ${node.color})` : "none"}
              />
            ))}

            {/* Central Core Circle */}
            <circle cx="50" cy="50" r="4" fill="#B6B09F" />
            <motion.circle
              cx="50"
              cy="50"
              r="11"
              stroke="#B6B09F"
              strokeWidth="0.75"
              fill="none"
              animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          </svg>

          {/* Center Label */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-vaultAmber/30 bg-black px-4 py-1 font-mono text-[9px] font-bold text-vaultAmber shadow-[0_0_15px_rgba(182,176,159,0.3)] pointer-events-none z-20">
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
                      className="absolute -inset-3 rounded-full border border-vaultAmber shadow-[0_0_12px_#B6B09F] pointer-events-none"
                    />
                  )}

                  {/* Node Box */}
                  <div
                    className={`flex items-center gap-2 rounded-2xl border p-2.5 font-mono text-xs shadow-xl backdrop-blur-md transition-all ${
                      activeLayer === "workers"
                        ? "border-vaultAmber bg-voidSurface text-charcoal shadow-lg scale-105"
                        : activeLayer === "brakes"
                        ? "border-vaultAmber bg-voidSurface text-charcoal shadow-lg"
                        : "border-vaultAmber/20 bg-white/5 text-charcoal/80"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: node.color,
                        boxShadow: `0 0 6px ${node.color}`,
                      }}
                    />
                    <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap">
                      {node.name}
                    </span>
                  </div>

                  {/* Sub-label per layer */}
                  {activeLayer === "brakes" && (
                    <span className="mt-1 font-mono text-[8px] font-bold text-vaultAmber bg-black/90 rounded-full px-2 py-0.5 border border-vaultAmber/30">
                      BRAKES VERIFIED ✓
                    </span>
                  )}
                  {activeLayer === "workers" && (
                    <span className="mt-1 font-mono text-[8px] text-vaultAmber font-semibold">
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
                ? "border-vaultAmber/50 bg-voidSurface shadow-xl"
                : "border-vaultAmber/10 bg-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3">
              <span className="text-vaultAmber uppercase font-bold text-[10px]">LAYER 01 : WORKERS</span>
              <span className="font-bold text-neonCyan">THE HANDS</span>
            </div>
            <p className="mt-3 font-sans text-xs text-charcoal/80 leading-relaxed">
              Autonomous specialists trained on single workflows: qualifying leads, answering WhatsApp tickets, parsing complex multi-page invoices, and indexing policies.
            </p>
            <Link
              href="/workers"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan"
            >
              <span>Read Workers architecture</span>
              <span>→</span>
            </Link>
          </div>

          {/* Pillar 2: Brain */}
          <div
            className={`rounded-3xl border p-6 transition-all backdrop-blur-xl ${
              activeLayer === "brain" || activeLayer === "all"
                ? "border-vaultAmber/50 bg-voidSurface shadow-xl"
                : "border-vaultAmber/10 bg-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3">
              <span className="text-vaultAmber uppercase font-bold text-[10px]">LAYER 02 : BRAIN</span>
              <span className="font-bold text-neonCyan">THE NERVOUS SYSTEM</span>
            </div>
            <p className="mt-3 font-sans text-xs text-charcoal/80 leading-relaxed">
              The central orchestration layer routing the Thread between enterprise tools: synchronizing Salesforce, SAP, Tally, Slack, and Okta without data siloing.
            </p>
            <Link
              href="/brain"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan"
            >
              <span>Read Brain architecture</span>
              <span>→</span>
            </Link>
          </div>

          {/* Pillar 3: Brakes */}
          <div
            className={`rounded-3xl border p-6 transition-all backdrop-blur-xl ${
              activeLayer === "brakes" || activeLayer === "all"
                ? "border-vaultAmber/50 bg-voidSurface shadow-xl"
                : "border-vaultAmber/10 bg-white/5 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between border-b border-vaultAmber/15 pb-3">
              <span className="text-vaultAmber uppercase font-bold text-[10px]">LAYER 03 : BRAKES</span>
              <span className="font-bold text-neonCyan">THE VERIFICATION GATE</span>
            </div>
            <p className="mt-3 font-sans text-xs text-charcoal/80 leading-relaxed">
              The safety protocol pausing actions at high-stakes boundaries: calculating uncertainty, validating tax compliance, enforcing DPDP redactions, and logging audit trails.
            </p>
            <Link
              href="/brakes"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan"
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
