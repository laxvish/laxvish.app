"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkflowPreset {
  id: string;
  tag: string;
  workerType: string;
  prompt: string;
  metrics: { label: string; value: string }[];
  pills: string[];
  governance: string;
}

const PRESETS: WorkflowPreset[] = [
  {
    id: "finance",
    tag: "Finance & AP",
    workerType: "Laxvish Thread: Finance Worker",
    prompt:
      "Reconcile 1,420 vendor invoices against GST-2B filings for Q3. Flag 14 tax mismatch discrepancies exceeding ₹50,000, trigger automated vendor clarification queries via WhatsApp, and prepare the verified settlement ledger for Finance Controller sign-off.",
    metrics: [
      { label: "Processed", value: "1,420 docs" },
      { label: "Mismatches", value: "14 flagged" },
      { label: "Audit State", value: "Locked" },
    ],
    pills: ["GST-2B Interlock", "SAP ERP Connector", "Brakes: Controller Sign-Off"],
    governance: "Human-in-the-loop sign-off required above ₹50,000",
  },
  {
    id: "documents",
    tag: "Document Extraction",
    workerType: "Laxvish Thread: Doc Parser v3",
    prompt:
      "Extract 450 multi-page scanned logistics bills of lading and e-way bills. Validate consignee GSTINs, parse line-item tax rates, and push reconciled batches into SAP ERP with zero human re-keying and full cryptographic audit trails.",
    metrics: [
      { label: "Bills Parsed", value: "450 / 450" },
      { label: "Accuracy", value: "99.8%" },
      { label: "ERP Sync", value: "Verified" },
    ],
    pills: ["E-Way Validation", "Tax Rate Parser", "Brakes: Zero-Data-Leak"],
    governance: "Encrypted payload · DPDP compliance policy enforced",
  },
  {
    id: "support",
    tag: "Customer Voice & WhatsApp",
    workerType: "Laxvish Thread: CallMe Agent",
    prompt:
      "Triage 3,800 omnichannel customer queries across Hindi and English. Execute Tier-1 automated resolutions via WhatsApp API, escalate SLA breaches to senior operations managers, and enforce zero-hallucination compliance brakes.",
    metrics: [
      { label: "Tickets", value: "3,800 queued" },
      { label: "Voice SLA", value: "< 280ms" },
      { label: "Escalations", value: "4.2%" },
    ],
    pills: ["Hindi + English NLP", "WhatsApp Business API", "Brakes: Hallucination Guard"],
    governance: "All voice interactions logged with biometric-free telemetry",
  },
];

interface ConversationalBoxProps {
  className?: string;
}

/**
 * ConversationalBox — Control Surface Prompt Interface.
 *
 * Implements the structural composition from the reference:
 * - Top: High-density prompt area with real enterprise workflow instructions.
 * - Bottom: Layer selector, capability pills, and primary execution controls.
 * - Adheres strictly to the Laxvish monochrome design system:
 *   #FAFAFA base, #111111 ink, #EAEAEA elevated surface, #666666 metadata.
 */
export function ConversationalBox({ className = "" }: ConversationalBoxProps) {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const activePreset = PRESETS[activePresetIndex];

  const handleCopy = () => {
    navigator.clipboard?.writeText(activePreset.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 2400);
  };

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-2xl border border-charcoal/20 bg-obsidian p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-charcoal/40 ${className}`}
    >
      {/* ——— Top System Bar: Status & Scenario Switcher ——— */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-charcoal opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-charcoal"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.16em] text-neonCyan uppercase">
            CONTROL SURFACE // WORKFLOW DISPATCH
          </span>
        </div>

        {/* Workflow scenario tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {PRESETS.map((preset, idx) => {
            const isActive = idx === activePresetIndex;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActivePresetIndex(idx)}
                className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-obsidian shadow-sm"
                    : "text-charcoal/60 hover:text-charcoal hover:bg-vaultAmber/60"
                }`}
              >
                {preset.tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* ——— Main Conversational Prompt Area ——— */}
      <div className="py-5 sm:py-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePreset.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-3"
          >
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed tracking-tight text-charcoal select-text">
              &ldquo;{activePreset.prompt}&rdquo;
            </p>

            {/* Micro Telemetry Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-neonCyan font-mono">
              {activePreset.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-charcoal/40 uppercase">{m.label}:</span>
                  <span className="font-semibold text-charcoal">{m.value}</span>
                </div>
              ))}
              <span className="hidden sm:inline text-charcoal/20">|</span>
              <span className="text-[10px] text-neonCyan/80 truncate">
                {activePreset.governance}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ——— Bottom Control Bar (IA Reference Layout) ——— */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-charcoal/10 pt-4 sm:pt-5">
        {/* Left Side: Agent/Layer Selector + Capability Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Layer / Worker Trigger */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-charcoal/25 bg-vaultAmber/40 px-3 py-1.5 text-xs font-medium text-charcoal shadow-2xs">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-charcoal text-[9px] font-bold text-obsidian">
              L
            </span>
            <span className="truncate max-w-[150px] sm:max-w-none">
              {activePreset.workerType}
            </span>
            <svg
              className="h-3 w-3 text-neonCyan shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Capability Tags / Rules */}
          <div className="hidden md:flex items-center gap-1.5">
            {activePreset.pills.map((pill, i) => (
              <span
                key={i}
                className="text-[10px] font-medium tracking-wide uppercase px-2 py-1 rounded bg-obsidian border border-charcoal/15 text-charcoal/75"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Secondary Export & Primary Run CTA */}
        <div className="flex items-center justify-end gap-2.5 shrink-0">
          {/* Copy Prompt / Export Ledger Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy prompt payload"
            aria-label="Copy prompt payload to clipboard"
            className="inline-flex items-center justify-center rounded-lg border border-charcoal/20 bg-obsidian p-2 text-charcoal transition-colors hover:border-charcoal hover:bg-vaultAmber"
          >
            {isCopied ? (
              <svg className="h-4 w-4 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          {/* Primary Action Button (Execute) */}
          <button
            type="button"
            onClick={handleExecute}
            disabled={isExecuting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-charcoal px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-obsidian transition-colors hover:bg-neonCyan disabled:opacity-75 shadow-sm"
          >
            {isExecuting ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-obsidian" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Dispatching...</span>
              </>
            ) : (
              <>
                <span>Run System</span>
                <svg className="h-3.5 w-3.5 text-obsidian" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
