"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function InternalKnowledgeSim() {
  const [selectedDoc, setSelectedDoc] = useState("handbook");

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl shadow-charcoal/5 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold text-charcoal">
            Internal Brain • Semantic Vector Index (4,200 Docs)
          </span>
        </div>
        <span className="font-mono text-[11px] text-charcoal/50">
          RBAC: Role-Gated • RAG: 14ms
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {/* Spotlight Query Bar */}
        <div className="flex items-center gap-3 rounded-xl border border-charcoal/15 bg-obsidian p-3 shadow-inner">
          <span className="font-mono text-xs text-charcoal/40 font-bold">Q:</span>
          <span className="text-sm font-medium text-charcoal">
            &ldquo;What is our travel & meal reimbursement policy for Bangalore client visits?&rdquo;
          </span>
          <span className="ml-auto rounded bg-charcoal/5 px-2 py-0.5 font-mono text-[10px] text-charcoal/60">
            ENTER ↵
          </span>
        </div>

        {/* Source Nodes Pulse Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase text-charcoal/40">Queried Repositories:</span>
          {[
            { id: "handbook", label: "Employee Handbook 2026.pdf", match: "96.4%" },
            { id: "notion", label: "Notion / Engineering Wiki", match: "84.1%" },
            { id: "sharepoint", label: "SharePoint / Finance SOPs", match: "91.8%" },
          ].map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setSelectedDoc(doc.id)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                selectedDoc === doc.id
                  ? "border-charcoal bg-charcoal text-obsidian shadow-sm"
                  : "border-charcoal/10 bg-white text-charcoal/70 hover:border-charcoal/40"
              }`}
            >
              <span>{doc.label}</span>
              <span className="rounded bg-neonCyan/20 px-1 py-0.2 text-[9px]">
                {doc.match}
              </span>
            </button>
          ))}
        </div>

        {/* Highlighted Policy Excerpt & Citation */}
        <div className="grid gap-4 md:grid-cols-12">
          <div className="rounded-xl border border-charcoal/10 bg-vaultAmber/20 p-4 md:col-span-8">
            <span className="font-mono text-[10px] uppercase text-charcoal/50">
              SYNTHESIZED ANSWER (WITH DIRECT CITATION)
            </span>
            <p className="mt-2 text-sm leading-relaxed text-charcoal">
              For Tier-1 cities (including <mark className="bg-neonCyan/20 px-1 font-semibold text-charcoal">Bangalore</mark>), the daily client meal allowance is capped at <mark className="bg-neonCyan/20 px-1 font-semibold text-charcoal">₹3,500 per person</mark>. All claims must be accompanied by an itemized GST invoice uploaded within 7 days.
            </p>
            <div className="mt-3 flex items-center gap-2 font-mono text-xs text-charcoal/60">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-neonCyan" />
              <span>Cited from: HR-EXP-2026 §4.2 (Page 7)</span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-charcoal/10 bg-white p-4 md:col-span-4">
            <div>
              <span className="font-mono text-[10px] text-charcoal/40">ACCESS VERIFICATION</span>
              <p className="mt-1 text-xs font-medium text-charcoal">Employee: Level 1 Clearance</p>
              <p className="mt-2 text-[11px] text-emerald-700 font-mono">Zero PII Leakage Flagged</p>
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded bg-charcoal/5 py-1.5 font-mono text-xs font-medium text-charcoal hover:bg-charcoal hover:text-obsidian transition-colors"
            >
              Open Original Doc ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
