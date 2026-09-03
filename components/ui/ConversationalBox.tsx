"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBookDemoUrl } from "@/lib/site-navigation";

interface CompanyPreset {
  id: string;
  tag: string;
  companyName: string;
  industry: string;
  challenge: string;
  sampleDocName: string;
  sampleDocSize: string;
  solution: {
    whatWeBuild: {
      workers: string;
      brain: string;
      brakes: string;
    };
    howItHelpsGrow: string[];
    estimatedRoi: string;
    timeToDeploy: string;
  };
}

const PRESETS: CompanyPreset[] = [
  {
    id: "logistics",
    tag: "Logistics & Fleet",
    companyName: "FreightX Logistics (500+ Trucks)",
    industry: "Supply Chain & Road Transport",
    challenge:
      "Our operations team spends 5+ hours daily manually verifying scanned Proof-of-Deliveries (PODs), matching GST E-Way bills, and re-keying transport receipts into ERP. We face payment delays from shippers and frequent invoice dispute penalties.",
    sampleDocName: "sample_freight_eway_bills_batch.pdf",
    sampleDocSize: "2.8 MB",
    solution: {
      whatWeBuild: {
        workers: "POD Vision Worker & E-Way Bill Extraction Agent (auto-parses multi-page handwritten & scanned receipts).",
        brain: "Logistics Dispatch Mesh (routes verified deliveries directly into SAP/Tally and alerts drivers on WhatsApp).",
        brakes: "Consignee Tax & Weight Interlock (flags discrepancy between billed weight vs toll weighbridge before billing).",
      },
      howItHelpsGrow: [
        "Cuts billing reconciliation cycle from 7 days down to 45 minutes.",
        "Zero freight invoice rejections from enterprise shippers (Tata, Reliance, ITC).",
        "Saves 40+ hours/week of manual data entry per regional hub.",
      ],
      estimatedRoi: "₹24L annual operational savings + 3x faster shipper settlement",
      timeToDeploy: "14-day production deployment",
    },
  },
  {
    id: "finance_ap",
    tag: "D2C & Retail AP",
    companyName: "Kavya Lifestyle (Multi-Brand D2C)",
    industry: "E-Commerce & Retail Supply",
    challenge:
      "We process 1,500+ vendor invoices monthly across 40 suppliers. 12% have GST-2B tax mismatches or missing PO line-item matches, causing Input Tax Credit (ITC) blockage and manual disputes with suppliers.",
    sampleDocName: "q3_vendor_invoices_gst2b.xlsx",
    sampleDocSize: "1.4 MB",
    solution: {
      whatWeBuild: {
        workers: "3-Way AP Match Worker (cross-references PO, Goods Receipt Note, and Vendor Tax Invoice).",
        brain: "Vendor Settlement Coordinator (triggers automated clarification requests to vendors for mismatches).",
        brakes: "ITC Lockout Brake (blocks payment release on unverified GSTINs to prevent tax department fines).",
      },
      howItHelpsGrow: [
        "Unlocks 100% of eligible Input Tax Credit (ITC) before monthly return deadlines.",
        "Reduces invoice processing cost by 78% while maintaining audit-grade ledgers.",
        "Eliminates vendor phone tag with automated WhatsApp clarification workflows.",
      ],
      estimatedRoi: "₹18L preserved tax credit + 4.2x faster supplier payouts",
      timeToDeploy: "10-day pilot deployment",
    },
  },
  {
    id: "healthcare",
    tag: "Healthcare & Labs",
    companyName: "Apex Diagnostics (24 Centers)",
    industry: "Diagnostics & Pathology Chain",
    challenge:
      "Doctors and lab technicians spend hours manually entering diagnostic reports, cross-checking test parameter ranges, and escalating critical abnormal values to consulting doctors across disparate centers.",
    sampleDocName: "diagnostic_pathology_sops.pdf",
    sampleDocSize: "3.2 MB",
    solution: {
      whatWeBuild: {
        workers: "Clinical Report Extraction Worker (digitizes analyzer outputs and validates test ranges).",
        brain: "Critical Alert Router (instantly dispatches abnormal telemetry to attending physician on priority channel).",
        brakes: "Zero-Hallucination Medical Policy Brake (strict schema constraint on all patient diagnostic records).",
      },
      howItHelpsGrow: [
        "Sub-second alert dispatch for panic/critical medical test values.",
        "DPDP & HIPAA-ready encrypted data handling with zero local leakage.",
        "Frees lab specialists to handle 2.5x more daily sample throughput.",
      ],
      estimatedRoi: "Zero reporting SLA breaches + 60% reduction in lab clerical load",
      timeToDeploy: "21-day HIPAA-compliant setup",
    },
  },
  {
    id: "support",
    tag: "Customer Telephony & Voice",
    companyName: "FinEase NBFC (Micro-Loans)",
    industry: "Fintech & Lending",
    challenge:
      "Our call center is overwhelmed with 10,000+ monthly calls in Hindi and English regarding loan application status, repayment schedules, and KYC verification. Human agent attrition is 35% and wait times exceed 6 minutes.",
    sampleDocName: "customer_kyc_telephony_logs.csv",
    sampleDocSize: "950 KB",
    solution: {
      whatWeBuild: {
        workers: "CallMe Realtime Voice AI Worker (handles natural bilingual Hindi/English conversations under 280ms latency).",
        brain: "Omnichannel Intent Dispatcher (resolves Tier-1 queries instantly, updates CRM, and schedules callbacks).",
        brakes: "RBI Fair Practices Compliance Brake (enforces strict script guardrails and call recording verification).",
      },
      howItHelpsGrow: [
        "Reduces customer wait time from 6 minutes to 0 seconds (24/7 instant pick-up).",
        "Resolves 68% of routine loan and KYC inquiries without human agent intervention.",
        "Lowers per-call support cost by 82% while increasing borrower satisfaction.",
      ],
      estimatedRoi: "₹32L annual support cost reduction + 99.4% SLA adherence",
      timeToDeploy: "7-day voice agent rollout",
    },
  },
];

interface AttachedFile {
  name: string;
  size: string;
}

export function ConversationalBox({ className = "" }: { className?: string }) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("logistics");
  const [companyInput, setCompanyInput] = useState<string>(PRESETS[0].challenge);
  const [companyName, setCompanyName] = useState<string>(PRESETS[0].companyName);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([
    { name: PRESETS[0].sampleDocName, size: PRESETS[0].sampleDocSize },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [activeTab, setActiveTab] = useState<"input" | "blueprint">("input");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleSelectPreset = (preset: CompanyPreset) => {
    setSelectedPresetId(preset.id);
    setCompanyName(preset.companyName);
    setCompanyInput(preset.challenge);
    setAttachedFiles([{ name: preset.sampleDocName, size: preset.sampleDocSize }]);
    setShowBlueprint(false);
    setActiveTab("input");
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const newFile: AttachedFile = {
        name: file.name,
        size: `${sizeMb} MB`,
      };
      setAttachedFiles((prev) => [...prev.filter((f) => f.name !== file.name), newFile]);
    }
  };

  const removeFile = (fileName: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleGenerateBlueprint = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowBlueprint(true);
      setActiveTab("blueprint");
    }, 1200);
  };

  const bookDemoUrl = getBookDemoUrl();

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-2xl border border-charcoal/20 bg-obsidian p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-charcoal/40 ${className}`}
    >
      {/* ——— Top Bar: System ID & Mobile-Friendly Mode Selector ——— */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-charcoal/10 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-charcoal opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-charcoal"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.16em] text-neonCyan uppercase">
            LAXVISH // ENTERPRISE SOLUTION ARCHITECT
          </span>
        </div>

        {/* View Toggle Tabs (Input Challenge vs Generated Blueprint) */}
        <div className="flex items-center gap-1 w-full sm:w-auto bg-vaultAmber/60 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("input")}
            className={`flex-1 sm:flex-initial text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
              activeTab === "input"
                ? "bg-obsidian text-charcoal shadow-2xs font-semibold"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            1. Your Challenge & Docs
          </button>
          <button
            type="button"
            onClick={() => {
              setShowBlueprint(true);
              setActiveTab("blueprint");
            }}
            className={`flex-1 sm:flex-initial text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "blueprint"
                ? "bg-obsidian text-charcoal shadow-2xs font-semibold"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            <span>2. Laxvish Blueprint</span>
            {showBlueprint && (
              <span className="h-1.5 w-1.5 rounded-full bg-charcoal"></span>
            )}
          </button>
        </div>
      </div>

      {/* ——— Quick Industry Archetype Presets ——— */}
      <div className="pt-3 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-neonCyan uppercase shrink-0">
          Try Example:
        </span>
        {PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-md border transition-all ${
                isSelected
                  ? "bg-charcoal text-obsidian border-charcoal"
                  : "bg-vaultAmber/30 text-charcoal/70 border-charcoal/15 hover:border-charcoal/30 hover:bg-vaultAmber/70"
              }`}
            >
              {preset.tag}
            </button>
          );
        })}
      </div>

      {/* ——— TAB 1: User Company Input & Document Upload Zone ——— */}
      {activeTab === "input" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="py-3 sm:py-4 space-y-3.5"
        >
          {/* Company Name / Descriptor */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neonCyan block">
              Company / Business Unit:
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Logistics, Reliance Retail AP Team..."
              className="w-full rounded-lg border border-charcoal/20 bg-white/70 px-3 py-2 text-sm text-charcoal font-medium placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal transition-all"
            />
          </div>

          {/* Operational Bottleneck Textarea */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neonCyan block">
              What operational issues or bottlenecks is your company facing?
            </label>
            <textarea
              rows={3}
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              placeholder="Describe what your team manually does, where delays happen, or what software/ERP you need to automate..."
              className="w-full rounded-xl border border-charcoal/20 bg-white/70 p-3 sm:p-3.5 text-sm sm:text-base text-charcoal font-normal leading-relaxed placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal transition-all resize-none"
            />
          </div>

          {/* Document Upload & Attached Files Area ("put docs inside") */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono uppercase tracking-wider text-neonCyan">
                Attached Documents / Sample Workflows:
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-medium text-charcoal underline hover:text-neonCyan flex items-center gap-1"
              >
                <span>+ Upload docs (PDF, XLSX, CSV, SOP)</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.xlsx,.csv,.docx,.txt"
            />

            {/* Attached Chips */}
            <div className="flex flex-wrap gap-2">
              {attachedFiles.length > 0 ? (
                attachedFiles.map((file) => (
                  <div
                    key={file.name}
                    className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 bg-vaultAmber/50 px-3 py-1.5 text-xs text-charcoal font-mono"
                  >
                    <svg
                      className="h-3.5 w-3.5 text-neonCyan"
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
                    <span className="truncate max-w-[180px] sm:max-w-[280px]">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-neonCyan">({file.size})</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="text-charcoal/40 hover:text-charcoal text-xs ml-1"
                      aria-label={`Remove ${file.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-charcoal/30 rounded-lg p-3 text-center cursor-pointer hover:bg-vaultAmber/30 transition-colors"
                >
                  <p className="text-xs text-neonCyan font-mono">
                    Click to attach invoices, spreadsheets, or SOP documents for automated AI analysis
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-charcoal/10">
            <span className="text-[10px] sm:text-xs text-neonCyan font-mono">
              DPDP-compliant · Zero data retention on public sandbox
            </span>

            <button
              type="button"
              onClick={handleGenerateBlueprint}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-charcoal px-5 py-2.5 text-xs sm:text-sm font-medium text-obsidian transition-colors hover:bg-neonCyan disabled:opacity-75 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-obsidian"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Synthesizing Laxvish Architecture...</span>
                </>
              ) : (
                <>
                  <span>Analyze & Generate Solution Blueprint</span>
                  <svg
                    className="h-3.5 w-3.5 text-obsidian"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* ——— TAB 2: Generated Laxvish AI Blueprint (What We Build + How It Helps Grow) ——— */}
      {activeTab === "blueprint" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="py-3 sm:py-4 space-y-4"
        >
          {/* Header Summary */}
          <div className="rounded-xl border border-charcoal/15 bg-white/80 p-3.5 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-charcoal/10 pb-2.5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neonCyan">
                  Tailored System Blueprint For:
                </span>
                <h4 className="text-base sm:text-lg font-normal text-charcoal">
                  {companyName}
                </h4>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-neonCyan">
                <span className="rounded bg-vaultAmber px-2 py-0.5 font-semibold text-charcoal">
                  {currentPreset.solution.timeToDeploy}
                </span>
              </div>
            </div>

            {/* Part 1: What Laxvish Will Build For You */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal font-semibold block">
                1. What Laxvish Will Build For You:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg border border-charcoal/10 bg-obsidian p-2.5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold block">
                    ● Custom Workers
                  </span>
                  <p className="text-charcoal/80 leading-snug">
                    {currentPreset.solution.whatWeBuild.workers}
                  </p>
                </div>
                <div className="rounded-lg border border-charcoal/10 bg-obsidian p-2.5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold block">
                    ● Laxvish Brain
                  </span>
                  <p className="text-charcoal/80 leading-snug">
                    {currentPreset.solution.whatWeBuild.brain}
                  </p>
                </div>
                <div className="rounded-lg border border-charcoal/10 bg-obsidian p-2.5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold block">
                    ● Governance Brakes
                  </span>
                  <p className="text-charcoal/80 leading-snug">
                    {currentPreset.solution.whatWeBuild.brakes}
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: How Laxvish Helps You Grow */}
            <div className="pt-3.5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal font-semibold block">
                2. How Laxvish Helps You Grow:
              </span>
              <ul className="space-y-1.5 text-xs text-charcoal/90">
                {currentPreset.solution.howItHelpsGrow.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-charcoal font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projected ROI Highlight */}
            <div className="mt-3.5 pt-3 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="font-mono text-neonCyan">ESTIMATED BUSINESS IMPACT:</span>
              <span className="font-semibold text-charcoal">
                {currentPreset.solution.estimatedRoi}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-charcoal/10 pt-3">
            <button
              type="button"
              onClick={() => setActiveTab("input")}
              className="text-xs font-medium text-charcoal underline hover:text-neonCyan text-center sm:text-left"
            >
              ← Edit challenge or attach more docs
            </button>

            <a
              href={bookDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-charcoal px-5 py-2.5 text-xs sm:text-sm font-medium text-obsidian transition-colors hover:bg-neonCyan shadow-sm text-center"
            >
              <span>Book Working Session with this Blueprint</span>
              <svg className="h-3.5 w-3.5 text-obsidian" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
