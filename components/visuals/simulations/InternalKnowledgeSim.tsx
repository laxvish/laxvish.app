"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function InternalKnowledgeSim() {
  const [selectedDoc, setSelectedDoc] = useState("handbook");

  return (
    <div className="group relative rounded-[2rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0D0F12] p-6 text-white sm:p-8">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[80px]" />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90">
              Internal Knowledge • Vector Radar (4,200 Indexed Docs)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              RBAC: <strong className="text-violet-400">Strict Tokenized</strong>
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
              RAG: <strong className="text-emerald-400">14ms</strong>
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Spotlight Search Input */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] p-4 shadow-inner backdrop-blur-md">
            <span className="font-mono text-sm font-bold text-violet-400">⌘K</span>
            <span className="text-sm font-medium text-white">
              &ldquo;What is our travel reimbursement cap for Bangalore client dinners?&rdquo;
            </span>
            <span className="ml-auto rounded-lg bg-white/10 px-2.5 py-1 font-mono text-[10px] text-white/70">
              ENTER ↵
            </span>
          </div>

          {/* Repository Source Nodes */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase text-white/40">Searched Nodes:</span>
            {[
              { id: "handbook", label: "Employee Handbook 2026.pdf", match: "96.4%" },
              { id: "notion", label: "Notion / Engineering Wiki", match: "84.1%" },
              { id: "sharepoint", label: "SharePoint / Finance Policies", match: "91.8%" },
            ].map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelectedDoc(doc.id)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
                  selectedDoc === doc.id
                    ? "border-violet-400/50 bg-violet-500/20 text-white shadow-sm"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
                }`}
              >
                <span>{doc.label}</span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] text-violet-300">
                  {doc.match}
                </span>
              </button>
            ))}
          </div>

          {/* Synthesized Answer Card with Citation */}
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md lg:col-span-8">
              <span className="font-mono text-[10px] uppercase tracking-wider text-violet-300">
                EXPLAINABLE SYNTHESIS (WITH DIRECT SOURCE CITATION)
              </span>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                For Tier-1 cities (including <mark className="rounded bg-violet-500/30 px-1.5 py-0.5 text-white">Bangalore</mark>), the daily client meal allowance is capped at <mark className="rounded bg-violet-500/30 px-1.5 py-0.5 text-white font-semibold">₹3,500 per person</mark>. All expense claims must include an itemized GST invoice uploaded within 7 days.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-xs text-white/60 border-t border-white/10 pt-3">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>Cited directly from: HR-EXP-2026 §4.2 (Page 7)</span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md lg:col-span-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-white/40 uppercase">SECURITY CLEARANCE</span>
                <p className="mt-1 font-semibold text-white">Level-1 Employee Clearance</p>
                <p className="mt-2 text-emerald-400 text-[11px]">Zero PII Leakage Flagged</p>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-white/10 py-2 text-center text-xs font-medium text-white hover:bg-white hover:text-black transition-colors"
              >
                Open Original Source ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
