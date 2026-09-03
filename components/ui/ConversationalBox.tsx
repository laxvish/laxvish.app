"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBookDemoUrl } from "@/lib/site-navigation";

interface SolutionBlueprint {
  workers: string;
  brain: string;
  brakes: string;
  howItHelpsGrow: string[];
  estimatedRoi: string;
  timeToDeploy: string;
}

interface PromptPreset {
  id: string;
  label: string;
  companyName: string;
  prompt: string;
  sampleDocName?: string;
  sampleDocSize?: string;
  solution: SolutionBlueprint;
}

const PRESETS: PromptPreset[] = [
  {
    id: "logistics",
    label: "Logistics PODs & Tolls",
    companyName: "FreightX Fleet (500+ Trucks)",
    prompt:
      "Our logistics ops team spends 5+ hours daily manually matching handwritten Proof of Deliveries (PODs) and GST E-Way bills with SAP entries, causing shipper invoice disputes and delayed settlements.",
    sampleDocName: "eway_bills_batch_08.pdf",
    sampleDocSize: "2.4 MB",
    solution: {
      workers:
        "POD Vision Worker & E-Way Bill Extraction Agent (auto-parses multi-page handwritten/scanned receipts).",
      brain:
        "Logistics Dispatch Mesh (reconciles trip logs against toll weighbridge data and syncs directly into SAP/Tally).",
      brakes:
        "Consignee Tax & Weight Interlock (blocks billing dispatch if billed weight deviates from weighbridge telemetry).",
      howItHelpsGrow: [
        "Reconciliation cycle compressed from 7 days down to 45 minutes.",
        "Zero invoice rejections from enterprise shippers (Tata, Reliance, ITC).",
        "Saves 40+ hours per week of manual data entry per regional logistics hub.",
      ],
      estimatedRoi: "₹24L annual operational savings + 3x faster shipper settlement",
      timeToDeploy: "14-day production deployment",
    },
  },
  {
    id: "ap_invoices",
    label: "Vendor AP & GST-2B",
    companyName: "Kavya Retail (Multi-Brand D2C)",
    prompt:
      "We process 1,500+ vendor tax invoices monthly. 12% have GST-2B mismatches or missing PO line-item matches, causing blocked Input Tax Credits and supplier friction.",
    sampleDocName: "q3_vendor_invoices_gst2b.xlsx",
    sampleDocSize: "1.2 MB",
    solution: {
      workers:
        "3-Way AP Match Worker (cross-references purchase orders, goods receipts, and vendor tax invoices in real time).",
      brain:
        "Vendor Settlement Coordinator (triggers automated clarification requests on WhatsApp for detected discrepancies).",
      brakes:
        "ITC Lockout Brake (freezes payment disbursement on unverified GSTINs to eliminate tax compliance penalties).",
      howItHelpsGrow: [
        "Unlocks 100% of eligible Input Tax Credit (ITC) before monthly return deadlines.",
        "Reduces invoice processing cost by 78% while maintaining audit-grade ledgers.",
        "Automated resolution of vendor line-item disputes without phone tag.",
      ],
      estimatedRoi: "₹18L preserved tax credit + 4.2x faster supplier payouts",
      timeToDeploy: "10-day pilot deployment",
    },
  },
  {
    id: "healthcare",
    label: "Clinical Labs & Diagnostics",
    companyName: "Apex Diagnostics (24 Centers)",
    prompt:
      "Lab technicians spend hours manually entering diagnostic reports and cross-checking abnormal test parameter ranges, risking delay in critical doctor alerts.",
    sampleDocName: "diagnostic_pathology_sops.pdf",
    sampleDocSize: "3.1 MB",
    solution: {
      workers:
        "Clinical Analyzer Extraction Worker (digitizes analyzer telemetry and normalizes multi-center reference ranges).",
      brain:
        "Critical Alert Router (dispatches abnormal test values to attending physicians on priority channels within seconds).",
      brakes:
        "Zero-Hallucination Medical Policy Brake (enforces strict deterministic schema constraints on diagnostic records).",
      howItHelpsGrow: [
        "Sub-second alert dispatch for panic/critical medical test thresholds.",
        "DPDP & HIPAA-ready encrypted data handling with zero local leakage.",
        "Frees lab specialists to handle 2.5x more daily diagnostic sample throughput.",
      ],
      estimatedRoi: "Zero reporting SLA breaches + 60% reduction in lab clerical load",
      timeToDeploy: "21-day HIPAA-compliant setup",
    },
  },
  {
    id: "voice_telephony",
    label: "Telephony & KYC",
    companyName: "FinEase NBFC (Micro-Loans)",
    prompt:
      "Our call center is overwhelmed with 10,000+ monthly calls in Hindi and English for loan application status, repayment schedules, and KYC verification.",
    sampleDocName: "telephony_kyc_logs.csv",
    sampleDocSize: "820 KB",
    solution: {
      workers:
        "CallMe Realtime Voice AI Worker (handles bilingual Hindi/English conversations with sub-280ms latency).",
      brain:
        "Omnichannel Intent Dispatcher (resolves Tier-1 inquiries instantly, updates CRM, and schedules callbacks).",
      brakes:
        "RBI Fair Practices Compliance Brake (enforces strict conversational guardrails and verifies call recordings).",
      howItHelpsGrow: [
        "Eliminates borrower wait times from 6 minutes down to 0 seconds (24/7 instant pick-up).",
        "Resolves 68% of routine loan and KYC inquiries without human agent intervention.",
        "Lowers per-call support cost by 82% while boosting borrower satisfaction scores.",
      ],
      estimatedRoi: "₹32L annual support cost reduction + 99.4% SLA adherence",
      timeToDeploy: "7-day voice agent rollout",
    },
  },
];

interface AttachedDoc {
  name: string;
  size: string;
}

export function ConversationalBox({ className = "" }: { className?: string }) {
  const [prompt, setPrompt] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [attachedDocs, setAttachedDocs] = useState<AttachedDoc[]>([]);
  const [activePreset, setActivePreset] = useState<PromptPreset | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{
    userPrompt: string;
    companyName: string;
    attachedDocs: AttachedDoc[];
    solution: SolutionBlueprint;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bookDemoUrl = getBookDemoUrl();

  const handleSelectPreset = (preset: PromptPreset) => {
    setActivePreset(preset);
    setPrompt(preset.prompt);
    setCompanyName(preset.companyName);
    if (preset.sampleDocName && preset.sampleDocSize) {
      setAttachedDocs([
        { name: preset.sampleDocName, size: preset.sampleDocSize },
      ]);
    } else {
      setAttachedDocs([]);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const newDoc: AttachedDoc = {
        name: file.name,
        size: `${sizeMb} MB`,
      };
      setAttachedDocs((prev) => [
        ...prev.filter((d) => d.name !== file.name),
        newDoc,
      ]);
    }
  };

  const removeDoc = (name: string) => {
    setAttachedDocs((prev) => prev.filter((d) => d.name !== name));
  };

  const handleSynthesize = () => {
    if (!prompt.trim() && attachedDocs.length === 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      // Match closest preset or generate fallback architecture
      const matched =
        activePreset ||
        PRESETS.find((p) =>
          prompt.toLowerCase().includes(p.id) ||
          prompt.toLowerCase().includes(p.label.toLowerCase())
        ) ||
        PRESETS[0];

      setConversationHistory({
        userPrompt:
          prompt.trim() ||
          `Analyze attached workflow documents (${attachedDocs.map((d) => d.name).join(", ")}) and construct enterprise Laxvish architecture.`,
        companyName: companyName.trim() || matched.companyName,
        attachedDocs: [...attachedDocs],
        solution: matched.solution,
      });
    }, 1100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSynthesize();
    }
  };

  const handleResetConversation = () => {
    setConversationHistory(null);
    setPrompt("");
    setAttachedDocs([]);
    setActivePreset(null);
  };

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto transition-all duration-300 ${className}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.xlsx,.csv,.docx,.txt"
      />

      <AnimatePresence mode="wait">
        {!conversationHistory ? (
          /* ============================================================ */
          /* 1. MINIMAL GEMINI / CHATGPT PROMPT INPUT CANVAS               */
          /* ============================================================ */
          <motion.div
            key="prompt-box"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl sm:rounded-3xl border border-charcoal/15 bg-white/90 p-3 sm:p-4 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.07)] backdrop-blur-xs transition-all focus-within:border-charcoal/40 focus-within:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)]"
          >
            {/* Attached Documents Bubble Stack (Like ChatGPT / Claude) */}
            {attachedDocs.length > 0 && (
              <div className="mb-2.5 flex flex-wrap gap-2 px-1">
                {attachedDocs.map((doc) => (
                  <div
                    key={doc.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal/15 bg-vaultAmber/60 px-2.5 py-1 text-xs text-charcoal font-mono"
                  >
                    <svg
                      className="h-3.5 w-3.5 text-charcoal/70 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="truncate max-w-[160px] sm:max-w-[240px]">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-neonCyan">({doc.size})</span>
                    <button
                      type="button"
                      onClick={() => removeDoc(doc.name)}
                      className="ml-0.5 text-charcoal/40 hover:text-charcoal transition-colors"
                      aria-label={`Remove ${doc.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Seamless Minimal Textarea */}
            <div className="relative px-1">
              <textarea
                ref={textareaRef}
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Laxvish or describe your company's operational bottlenecks (e.g. logistics POD matching, vendor invoice AP, diagnostic reporting)..."
                className="w-full resize-none bg-transparent text-sm sm:text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Bottom Toolbar: Attach Button + Quick Chips + Send Button */}
            <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-charcoal/5">
              
              {/* Left Action Cluster: Upload Icon & Preset Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-charcoal/15 bg-vaultAmber/40 px-2.5 py-1 text-[11px] font-medium text-charcoal transition-colors hover:border-charcoal/30 hover:bg-vaultAmber"
                  title="Attach sample documents, PDFs, invoices, or spreadsheets"
                >
                  <svg
                    className="h-3.5 w-3.5 text-charcoal/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span>Attach doc</span>
                </button>

                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                      activePreset?.id === preset.id
                        ? "bg-charcoal text-obsidian font-semibold"
                        : "bg-vaultAmber/30 text-charcoal/70 border border-charcoal/10 hover:border-charcoal/20 hover:text-charcoal"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Right Action: Send / Synthesize Button */}
              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSynthesize}
                  disabled={isGenerating || (!prompt.trim() && attachedDocs.length === 0)}
                  className="inline-flex h-8 sm:h-9 items-center justify-center gap-1.5 rounded-full bg-charcoal px-3.5 sm:px-4 text-xs font-medium text-obsidian shadow-2xs transition-all hover:bg-neonCyan disabled:opacity-40 disabled:hover:bg-charcoal cursor-pointer disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin h-3.5 w-3.5 text-obsidian"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <span>Synthesize</span>
                      <svg
                        className="h-3 w-3 text-obsidian"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Micro Caption */}
            <div className="mt-2 text-center text-[10px] font-mono text-neonCyan">
              Laxvish Thread AI · Workers · Brain · Brakes · DPDP-ready & Enterprise-verified
            </div>
          </motion.div>
        ) : (
          /* ============================================================ */
          /* 2. CHATGPT / GEMINI STYLE CONVERSATIONAL BLUEPRINT RESULT     */
          /* ============================================================ */
          <motion.div
            key="conversation-result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl sm:rounded-3xl border border-charcoal/15 bg-white/90 p-4 sm:p-5 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xs space-y-4"
          >
            {/* User Prompt Bubble */}
            <div className="flex items-start justify-end gap-2">
              <div className="max-w-xl rounded-2xl rounded-tr-xs bg-vaultAmber/80 px-3.5 py-2.5 text-xs sm:text-sm text-charcoal space-y-1">
                <p className="leading-relaxed">{conversationHistory.userPrompt}</p>
                {conversationHistory.attachedDocs.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1">
                    {conversationHistory.attachedDocs.map((doc) => (
                      <span
                        key={doc.name}
                        className="inline-flex items-center gap-1 rounded bg-charcoal/10 px-1.5 py-0.5 font-mono text-[10px] text-charcoal"
                      >
                        📎 {doc.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Laxvish AI System Response Bubble */}
            <div className="space-y-3 rounded-2xl border border-charcoal/10 bg-obsidian p-3.5 sm:p-4">
              {/* Header Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 border-b border-charcoal/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-charcoal opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-charcoal"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.14em] text-neonCyan uppercase">
                    LAXVISH BLUEPRINT // {conversationHistory.companyName}
                  </span>
                </div>
                <span className="rounded bg-vaultAmber px-2 py-0.5 font-mono text-[10px] font-semibold text-charcoal">
                  {conversationHistory.solution.timeToDeploy}
                </span>
              </div>

              {/* What Laxvish Builds (Workers, Brain, Brakes) */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal font-semibold block">
                  1. What Laxvish Will Build For You:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="rounded-xl border border-charcoal/10 bg-white/70 p-2.5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold block">
                      ⚡ Workers
                    </span>
                    <p className="text-charcoal/80 leading-snug">
                      {conversationHistory.solution.workers}
                    </p>
                  </div>
                  <div className="rounded-xl border border-charcoal/10 bg-white/70 p-2.5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold block">
                      🧠 Brain
                    </span>
                    <p className="text-charcoal/80 leading-snug">
                      {conversationHistory.solution.brain}
                    </p>
                  </div>
                  <div className="rounded-xl border border-charcoal/10 bg-white/70 p-2.5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold block">
                      🛑 Brakes
                    </span>
                    <p className="text-charcoal/80 leading-snug">
                      {conversationHistory.solution.brakes}
                    </p>
                  </div>
                </div>
              </div>

              {/* How Laxvish Helps You Grow */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal font-semibold block">
                  2. How Laxvish Helps You Grow:
                </span>
                <ul className="space-y-1 text-xs text-charcoal/90">
                  {conversationHistory.solution.howItHelpsGrow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-charcoal font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Estimated Impact */}
              <div className="pt-2 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
                <span className="font-mono text-[10px] text-neonCyan uppercase">
                  Projected ROI:
                </span>
                <span className="font-semibold text-charcoal">
                  {conversationHistory.solution.estimatedRoi}
                </span>
              </div>
            </div>

            {/* Conversation Action Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleResetConversation}
                className="inline-flex items-center justify-center gap-1 text-xs font-medium text-charcoal underline hover:text-neonCyan transition-colors py-1.5"
              >
                <span>← Ask another question or change workflow</span>
              </button>

              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-2 text-xs font-medium text-obsidian shadow-2xs transition-all hover:bg-neonCyan text-center"
              >
                <span>Book Working Session with this Blueprint</span>
                <svg
                  className="h-3.5 w-3.5 text-obsidian"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
