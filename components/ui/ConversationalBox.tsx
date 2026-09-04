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
        "POD Vision Extraction Worker (auto-parses multi-page handwritten and scanned receipts, weighbridge slips, and toll logs).",
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
    label: "Vendor AP / GST",
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
        "DPDP and HIPAA-ready encrypted data handling with zero local leakage.",
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
    if (activePreset?.id === preset.id) {
      // Toggle off if already selected
      setActivePreset(null);
      setDirective("");
      setCompanyName("");
      setAttachedDocs([]);
      return;
    }

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
    }, 850);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSynthesize();
    }
  };

  const handleReset = () => {
    setBlueprintResult(null);
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
          /* 1. MINIMAL OPERATIONAL DIRECTIVE SURFACE                     */
          /* ============================================================ */
          <motion.div
            key="operational-interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-[2px] border border-charcoal/15 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden transition-colors focus-within:border-charcoal/35"
          >
            {/* LEVEL 1: TOP LABEL : Restrained, small uppercase, wide letter-spacing */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-2.5 border-b border-charcoal/10">
              <span className="text-[10px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                OPERATIONAL DIRECTIVE
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-neonCyan/70 uppercase">
                LAXVISH / 01
              </span>
            </div>

            {/* LEVEL 2: INPUT : The Primary Element with Generous Whitespace */}
            <div className="px-5 sm:px-6 pt-5 pb-3">
              <textarea
                ref={textareaRef}
                rows={3}
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Specify an enterprise workflow, manual bottleneck, or integration target..."
                className="w-full resize-none bg-transparent font-sans text-sm sm:text-base text-charcoal placeholder:text-neonCyan/40 focus:outline-none leading-relaxed"
              />

              {/* Minimal Document Metadata Row (if present) */}
              {attachedDocs.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {attachedDocs.map((doc) => (
                    <div
                      key={doc.name}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal/80"
                    >
                      <span className="text-neonCyan/70 text-[10px]">[DOC]</span>
                      <span className="truncate max-w-[220px] sm:max-w-[320px]">
                        {doc.name}
                      </span>
                      <span className="text-[10px] text-neonCyan/70">
                        ({doc.size})
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDoc(doc.name)}
                        className="text-neonCyan hover:text-charcoal transition-colors cursor-pointer text-xs leading-none"
                        aria-label={`Remove ${doc.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LEVEL 3: CONTEXT & ATTACHMENT CONTROLS : Minimal, quiet metadata controls */}
            <div className="border-t border-charcoal/10 px-5 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
              {/* Left: Quiet Attachment Text Control */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neonCyan hover:text-charcoal transition-colors cursor-pointer text-left"
                title="Attach sample workflow documents, spreadsheets, or SOPs"
              >
                <span className="font-mono text-xs">+</span>
                <span>Attach workflow document</span>
              </button>

              {/* Right: Subtle Context Metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span className="text-[10px] font-mono tracking-wider text-neonCyan/60 uppercase mr-1">
                  CONTEXT
                </span>
                {DOMAIN_PRESETS.map((preset, index) => {
                  const isSelected = activePreset?.id === preset.id;
                  return (
                    <div key={preset.id} className="inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? "text-charcoal font-medium underline underline-offset-4 decoration-charcoal/40"
                            : "text-neonCyan hover:text-charcoal"
                        }`}
                      >
                        {preset.label}
                      </button>
                      {index < DOMAIN_PRESETS.length - 1 && (
                        <span className="text-neonCyan/40 mx-1.5 select-none">·</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LEVEL 4: FOOTER & CTA : Very quiet footer metadata + Single quiet rectangular action */}
            <div className="border-t border-charcoal/10 px-5 sm:px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[10px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                LAXVISH THREAD · WORKERS · BRAIN · BRAKES · DPDP-READY
              </div>

              <button
                type="button"
                onClick={handleSynthesize}
                disabled={isGenerating || (!directive.trim() && attachedDocs.length === 0)}
                className="rounded-[2px] bg-charcoal text-obsidian hover:bg-neonCyan transition-colors px-4 py-2 text-xs font-mono tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span>Synthesizing...</span>
                ) : (
                  <>
                    <span>Synthesize Architecture</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* ============================================================ */
          /* 2. SYNTHESIZED SYSTEM ARCHITECTURE DOSSIER                   */
          /* ============================================================ */
          <motion.div
            key="architecture-dossier"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-[2px] border border-charcoal/15 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden"
          >
            {/* Top Bar: Restrained Architectural Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-5 sm:px-6 py-2.5 border-b border-charcoal/10">
              <span className="text-[10px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                SYSTEM ARCHITECTURE DOSSIER
              </span>
              <span className="text-[10px] font-mono tracking-wider text-neonCyan uppercase">
                {blueprintResult.companyName} · {blueprintResult.solution.timeToDeploy}
              </span>
            </div>

            {/* Problem Directive Summary */}
            <div className="px-5 sm:px-6 py-3.5 border-b border-charcoal/10 text-xs text-charcoal space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-neonCyan uppercase tracking-wider">
                <span>DIRECTIVE</span>
                <span>DOMAIN: {blueprintResult.domainName}</span>
              </div>
              <p className="leading-relaxed text-charcoal/90">{blueprintResult.directiveText}</p>
              {blueprintResult.attachedDocs.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {blueprintResult.attachedDocs.map((doc) => (
                    <span
                      key={doc.name}
                      className="font-mono text-[10px] text-neonCyan"
                    >
                      [DOC: {doc.name}]
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Architectural Pillars: Workers · Brain · Brakes (Clean Divided Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-charcoal/10 border-b border-charcoal/10 text-xs">
              {/* Workers */}
              <div className="p-5 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  01 // WORKERS
                </span>
                <p className="text-charcoal/85 leading-relaxed">
                  {blueprintResult.solution.workers}
                </p>
              </div>

              {/* Brain */}
              <div className="p-5 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  02 // BRAIN
                </span>
                <p className="text-charcoal/85 leading-relaxed">
                  {blueprintResult.solution.brain}
                </p>
              </div>

              {/* Brakes */}
              <div className="p-5 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  03 // BRAKES
                </span>
                <p className="text-charcoal/85 leading-relaxed">
                  {blueprintResult.solution.brakes}
                </p>
              </div>
            </div>

            {/* Operational Impact & ROI */}
            <div className="px-5 sm:px-6 py-4 space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  QUANTIFIED OPERATIONAL IMPACT
                </span>
                <ul className="space-y-1 text-xs text-charcoal">
                  {blueprintResult.solution.howItHelpsGrow.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-neonCyan font-mono">·</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
                <span className="font-mono text-[10px] text-neonCyan uppercase tracking-wider">
                  PROJECTED RETURN ON INVESTMENT:
                </span>
                <span className="font-medium text-charcoal">
                  {blueprintResult.solution.estimatedRoi}
                </span>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="border-t border-charcoal/10 px-5 sm:px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-neonCyan hover:text-charcoal transition-colors cursor-pointer text-left"
              >
                ← Edit directive
              </button>

              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] bg-charcoal text-obsidian hover:bg-neonCyan transition-colors px-4 py-2 text-xs font-mono tracking-wider text-center"
              >
                Book Working Session with this Blueprint →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
