"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function KnowledgeScene() {
  const [phase, setPhase] = useState<"field" | "pulse" | "answer">("field");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pulse"), 1500);
    const t2 = setTimeout(() => setPhase("answer"), 3600);
    const t3 = setTimeout(() => setPhase("field"), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#FAF8F5] p-8 text-charcoal sm:p-12">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[11px] text-charcoal/40 uppercase tracking-widest border-b border-charcoal/10 pb-4">
        <span>Chapter 04 : Internal Knowledge Engine</span>
        <span>
          {phase === "field" && "4,200 Documents Suspended"}
          {phase === "pulse" && "Query Pulse Awakening Nodes"}
          {phase === "answer" && "The Company Remembers"}
        </span>
      </div>

      {/* Main Kinetic Stage */}
      <div className="relative my-auto flex w-full flex-col items-center justify-center py-6">
        {phase === "field" && (
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Suspended Field of Dots */}
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: (i % 5) * 0.2 }}
                  className="h-2 w-2 rounded-full bg-charcoal/30"
                />
              ))}
            </div>
            <p className="mt-2 font-mono text-xs text-charcoal/50">
              Information scattered across Notion, SharePoint, Drive, and PDFs.
            </p>
          </div>
        )}

        {phase === "pulse" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-charcoal/40">
              QUERY PULSE: &ldquo;Bangalore meal reimbursement limit?&rdquo;
            </span>
            <div className="flex gap-3">
              {["HR Handbook 2026.pdf §4.2", "Finance Travel SOP", "Board Policy 14"].map((node, i) => (
                <motion.div
                  key={node}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="rounded-full bg-charcoal px-4 py-2 font-mono text-xs font-medium text-white shadow-md"
                >
                  {node}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {phase === "answer" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-charcoal/15 bg-white p-6 shadow-xl text-left"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3 font-mono text-[10px] text-charcoal/40 uppercase">
              <span>Synthesized Policy Resolution</span>
              <span className="font-bold text-charcoal">Cited §4.2</span>
            </div>
            <p className="mt-4 font-serif text-sm leading-relaxed text-charcoal">
              For Tier-1 client visits in Bangalore, the daily meal reimbursement is capped at <strong className="text-charcoal underline">₹3,500 per person</strong>. All claims require an itemized GST invoice filed within 7 days.
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-3 font-mono text-[10px] text-charcoal/60">
              <span>Security Clearance: Level 1</span>
              <span className="font-bold text-emerald-700">Zero PII Leakage ✓</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Narrative Footer */}
      <div className="border-t border-charcoal/10 pt-4 font-serif text-xs italic text-charcoal/60">
        Not a giant chatbot. A single calm paragraph backed by the company&rsquo;s living memory.
      </div>
    </div>
  );
}
