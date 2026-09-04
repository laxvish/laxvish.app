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

interface OperationalPreset {
  id: string;
  label: string;
  domainName: string;
  companyName: string;
  directive: string;
  sampleDocName?: string;
  sampleDocSize?: string;
  solution: SolutionBlueprint;
}

const DOMAIN_PRESETS: OperationalPreset[] = [
  {
    id: "logistics",
    label: "Logistics & Fleet",
    domainName: "Freight Operations",
    companyName: "FreightX Fleet (500+ Trucks)",
    directive:
      "Our logistics operations team spends 5+ hours daily manually matching handwritten Proof of Deliveries (PODs) and GST E-Way bills with SAP transport receipts, causing delayed shipper settlement and dispute penalties.",
    sampleDocName: "eway_bills_batch_08.pdf",
    sampleDocSize: "2.4 MB",
    solution: {
      workers:
        "POD Vision Extraction Worker (auto-parses multi-page handwritten/scanned receipts, weighbridge slips, and toll logs).",
      brain:
        "Logistics Dispatch Mesh (reconciles trip logs against toll telemetry and pushes verified line-items directly into SAP/Tally).",
      brakes:
        "Consignee Tax & Weight Interlock (blocks invoice issuance if billed weight deviates from weighbridge telemetry).",
      howItHelpsGrow: [
        "Reconciliation cycle compressed from 7 days down to 45 minutes.",
        "Zero invoice rejections from enterprise shippers (Tata, Reliance, ITC).",
        "Saves 40+ hours per week of manual data entry per regional hub.",
      ],
      estimatedRoi: "₹24L annual operational savings + 3x faster shipper settlement",
      timeToDeploy: "14-day production deployment",
    },
  },
  {
    id: "ap_invoices",
    label: "Vendor AP & GST",
    domainName: "Finance & Accounts Payable",
    companyName: "Kavya Retail (Multi-Brand D2C)",
    directive:
      "We process 1,500+ vendor tax invoices monthly. 12% have GST-2B tax mismatches or missing PO line-item matches, causing blocked Input Tax Credits (ITC) and supplier payment delays.",
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
    label: "Clinical & Diagnostics",
    domainName: "Laboratory Operations",
    companyName: "Apex Diagnostics (24 Centers)",
    directive:
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
    label: "Telephony & Voice",
    domainName: "Customer Support & Lending",
    companyName: "FinEase NBFC (Micro-Loans)",
    directive:
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
  const [directive, setDirective] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [attachedDocs, setAttachedDocs] = useState<AttachedDoc[]>([]);
  const [activePreset, setActivePreset] = useState<OperationalPreset | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprintResult, setBlueprintResult] = useState<{
    directiveText: string;
    companyName: string;
    domainName: string;
    attachedDocs: AttachedDoc[];
    solution: SolutionBlueprint;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bookDemoUrl = getBookDemoUrl();

  const handleSelectPreset = (preset: OperationalPreset) => {
    setActivePreset(preset);
    setDirective(preset.directive);
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
    if (!directive.trim() && attachedDocs.length === 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      const matched =
        activePreset ||
        DOMAIN_PRESETS.find((p) =>
          directive.toLowerCase().includes(p.id) ||
          directive.toLowerCase().includes(p.label.toLowerCase())
        ) ||
        DOMAIN_PRESETS[0];

      setBlueprintResult({
        directiveText:
          directive.trim() ||
          `Analyze attached workflow documents (${attachedDocs.map((d) => d.name).join(", ")}) and construct enterprise Laxvish architecture.`,
        companyName: companyName.trim() || matched.companyName,
        domainName: matched.domainName,
        attachedDocs: [...attachedDocs],
        solution: matched.solution,
      });
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSynthesize();
    }
  };

  const handleReset = () => {
    setBlueprintResult(null);
    setDirective("");
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
        {!blueprintResult ? (
          /* ============================================================ */
          /* 1. OPERATIONAL INTELLIGENCE COMMAND SURFACE                   */
          /* ============================================================ */
          <motion.div
            key="operational-interface"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="rounded-xl border border-charcoal/20 bg-white shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] overflow-hidden transition-all focus-within:border-charcoal/50"
          >
            {/* LEVEL 1A: System Directive Header Bar */}
            <div className="flex items-center justify-between border-b border-charcoal/10 px-4 py-2 bg-vaultAmber/30">
              <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-neonCyan uppercase">
                OPERATIONAL DIRECTIVE
              </span>
              <span className="text-[10px] font-mono text-neonCyan tracking-wider">
                SYS-INTERFACE // LAXVISH-OS
              </span>
            </div>

            {/* LEVEL 1B: Primary Command Textarea */}
            <div className="p-4 space-y-3">
              <textarea
                ref={textareaRef}
                rows={3}
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Specify an enterprise operational workflow, manual bottleneck, or integration target (e.g. logistics POD matching, vendor AP invoices, pathology reporting)..."
                className="w-full resize-none bg-transparent text-sm sm:text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none leading-relaxed font-normal"
              />

              {/* Attached Documents Row (if present) */}
              {attachedDocs.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {attachedDocs.map((doc) => (
                    <div
                      key={doc.name}
                      className="inline-flex items-center gap-1.5 rounded-md border border-charcoal/15 bg-vaultAmber/50 px-2.5 py-1 text-xs text-charcoal font-mono"
                    >
                      <span className="text-neonCyan">⌕</span>
                      <span className="truncate max-w-[180px] sm:max-w-[280px]">
                        {doc.name}
                      </span>
                      <span className="text-[10px] text-neonCyan">({doc.size})</span>
                      <button
                        type="button"
                        onClick={() => removeDoc(doc.name)}
                        className="ml-1 text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer"
                        aria-label={`Remove ${doc.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LEVEL 2: Supporting Actions (Attach Document + Operational Domain Context) */}
            <div className="border-t border-charcoal/10 px-4 py-2.5 bg-obsidian/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Left utility: Attach document */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal/80 hover:text-charcoal transition-colors cursor-pointer py-1"
                title="Attach sample workflow documents, spreadsheets, or SOPs"
              >
                <span className="font-mono text-neonCyan">+</span>
                <span>Attach workflow document</span>
              </button>

              {/* Right segmented domain selector */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <span className="text-[10px] font-mono text-neonCyan uppercase mr-1 shrink-0">
                  CONTEXT:
                </span>
                {DOMAIN_PRESETS.map((preset) => {
                  const isSelected = activePreset?.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`shrink-0 text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                        isSelected
                          ? "bg-charcoal text-obsidian shadow-2xs"
                          : "text-charcoal/70 hover:text-charcoal hover:bg-vaultAmber/70"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LEVEL 3 & 4: Technical Telemetry Line + Primary Synthesis Action */}
            <div className="border-t border-charcoal/10 px-4 py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-vaultAmber/20">
              <div className="text-[10px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                LAXVISH THREAD // WORKERS · BRAIN · BRAKES · DPDP-READY
              </div>

              <button
                type="button"
                onClick={handleSynthesize}
                disabled={isGenerating || (!directive.trim() && attachedDocs.length === 0)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-charcoal px-5 py-2 text-xs font-medium text-obsidian shadow-2xs transition-colors hover:bg-neonCyan disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
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
                    <span>Synthesizing System...</span>
                  </>
                ) : (
                  <>
                    <span>Synthesize Architecture</span>
                    <span className="font-mono text-xs">→</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* ============================================================ */
          /* 2. SYNTHESIZED OPERATIONAL ARCHITECTURE DOSSIER               */
          /* ============================================================ */
          <motion.div
            key="architecture-dossier"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="rounded-xl border border-charcoal/20 bg-white shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] overflow-hidden space-y-0"
          >
            {/* Header Telemetry Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-charcoal/10 px-4 py-3 bg-vaultAmber/30">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-charcoal opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-charcoal"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.16em] text-neonCyan uppercase">
                  LAXVISH ARCHITECTURE BLUEPRINT // {blueprintResult.companyName}
                </span>
              </div>
              <span className="rounded bg-vaultAmber px-2.5 py-0.5 font-mono text-[10px] font-semibold text-charcoal border border-charcoal/10">
                DEPLOYMENT SLA: {blueprintResult.solution.timeToDeploy}
              </span>
            </div>

            {/* Directive Summary */}
            <div className="px-4 py-3 border-b border-charcoal/10 bg-obsidian/40 text-xs text-charcoal space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-neonCyan uppercase">
                <span>INPUT DIRECTIVE:</span>
                <span>DOMAIN: {blueprintResult.domainName}</span>
              </div>
              <p className="leading-relaxed text-charcoal/90">{blueprintResult.directiveText}</p>
              {blueprintResult.attachedDocs.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {blueprintResult.attachedDocs.map((doc) => (
                    <span
                      key={doc.name}
                      className="inline-flex items-center gap-1 rounded bg-vaultAmber/80 px-2 py-0.5 font-mono text-[10px] text-charcoal"
                    >
                      ⌕ {doc.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Section 1: Three-Pillar System Architecture */}
            <div className="p-4 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-neonCyan font-semibold block">
                ENGINEERING ARCHITECTURE SPECIFICATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {/* Workers */}
                <div className="rounded-lg border border-charcoal/15 bg-obsidian p-3 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold tracking-wider block">
                    01 // WORKERS
                  </span>
                  <p className="text-charcoal/85 leading-snug">
                    {blueprintResult.solution.workers}
                  </p>
                </div>

                {/* Brain */}
                <div className="rounded-lg border border-charcoal/15 bg-obsidian p-3 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold tracking-wider block">
                    02 // BRAIN
                  </span>
                  <p className="text-charcoal/85 leading-snug">
                    {blueprintResult.solution.brain}
                  </p>
                </div>

                {/* Brakes */}
                <div className="rounded-lg border border-charcoal/15 bg-obsidian p-3 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-neonCyan font-semibold tracking-wider block">
                    03 // BRAKES
                  </span>
                  <p className="text-charcoal/85 leading-snug">
                    {blueprintResult.solution.brakes}
                  </p>
                </div>
              </div>

              {/* Section 2: Quantified Operational Impact */}
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-semibold block">
                  QUANTIFIED OPERATIONAL IMPACT:
                </span>
                <ul className="space-y-1 text-xs text-charcoal">
                  {blueprintResult.solution.howItHelpsGrow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-charcoal font-mono font-bold mt-0.5">―</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ROI Highlight */}
              <div className="pt-2 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
                <span className="font-mono text-[10px] text-neonCyan uppercase">
                  PROJECTED BUSINESS ROI:
                </span>
                <span className="font-semibold text-charcoal">
                  {blueprintResult.solution.estimatedRoi}
                </span>
              </div>
            </div>

            {/* Action Footer Bar */}
            <div className="border-t border-charcoal/10 px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-vaultAmber/20">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1 text-xs font-medium text-charcoal underline hover:text-neonCyan transition-colors py-1 cursor-pointer"
              >
                <span>← Modify operational directive</span>
              </button>

              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-charcoal px-5 py-2 text-xs font-medium text-obsidian shadow-2xs transition-colors hover:bg-neonCyan text-center"
              >
                <span>Book Working Session with this Blueprint</span>
                <span className="font-mono text-xs">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
