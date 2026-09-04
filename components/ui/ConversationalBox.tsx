"use client";

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
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

interface AttachedDoc {
  name: string;
  size: string;
  tag: "IMG" | "DOC" | "SHEET";
}

const ATTACHMENT_OPTIONS = [
  {
    id: "images",
    label: "Images",
    ext: "PNG, JPG, WEBP",
    accept: ".png,.jpg,.jpeg,.webp,image/*",
  },
  {
    id: "docs",
    label: "Documents",
    ext: "PDF, DOCX, TXT",
    accept: ".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain",
  },
  {
    id: "sheets",
    label: "Sheets",
    ext: "XLSX, CSV",
    accept: ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv",
  },
];

const DEFAULT_BLUEPRINTS: Record<string, SolutionBlueprint> = {
  logistics: {
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
  finance: {
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
  general: {
    workers:
      "Autonomous Enterprise Task Workers (extract unstructured data, execute high-volume multi-system transactions).",
    brain:
      "Unified Process Mesh (coordinates real-time state across databases, ERPs, CRMs, and messaging channels).",
    brakes:
      "Policy & Deterministic Safety Brakes (enforces strict schema contracts, DPDP compliance, and financial authorization limits).",
    howItHelpsGrow: [
      "Up to 80% reduction in end-to-end process latency and operational overhead.",
      "Zero data entry errors across connected operational systems.",
      "Frees human teams to focus on revenue-generating exceptions and relationships.",
    ],
    estimatedRoi: "75% to 80% operational cost compression + instant SLA delivery",
    timeToDeploy: "14-day turnkey enterprise setup",
  },
};

export function ConversationalBox({ className = "" }: { className?: string }) {
  const [directive, setDirective] = useState("");
  const [attachedDocs, setAttachedDocs] = useState<AttachedDoc[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileAcceptType, setFileAcceptType] = useState(
    ".pdf,.xlsx,.csv,.docx,.txt,.png,.jpg,.jpeg,.webp"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprintResult, setBlueprintResult] = useState<{
    directiveText: string;
    attachedDocs: AttachedDoc[];
    solution: SolutionBlueprint;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bookDemoUrl = getBookDemoUrl();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFileTag = (fileName: string): "IMG" | "DOC" | "SHEET" => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "IMG";
    if (["xlsx", "xls", "csv"].includes(ext)) return "SHEET";
    return "DOC";
  };

  const handleOpenAttachMenu = (acceptType: string) => {
    setFileAcceptType(acceptType);
    setIsDropdownOpen(false);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.accept = acceptType;
        fileInputRef.current.click();
      }
    }, 50);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: AttachedDoc[] = Array.from(e.target.files).map((file) => {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        return {
          name: file.name,
          size: `${sizeMb} MB`,
          tag: getFileTag(file.name),
        };
      });

      setAttachedDocs((prev) => [
        ...prev.filter((d) => !newFiles.some((nf) => nf.name === d.name)),
        ...newFiles,
      ]);
    }
    // Reset file input value so re-uploading same file works
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeDoc = (name: string) => {
    setAttachedDocs((prev) => prev.filter((d) => d.name !== name));
  };

  const handleSynthesize = () => {
    if (!directive.trim() && attachedDocs.length === 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      const lower = directive.toLowerCase();
      let matchedSolution = DEFAULT_BLUEPRINTS.general;
      if (
        lower.includes("logistics") ||
        lower.includes("pod") ||
        lower.includes("fleet") ||
        lower.includes("truck") ||
        lower.includes("freight")
      ) {
        matchedSolution = DEFAULT_BLUEPRINTS.logistics;
      } else if (
        lower.includes("invoice") ||
        lower.includes("gst") ||
        lower.includes("vendor") ||
        lower.includes("ap") ||
        lower.includes("tax")
      ) {
        matchedSolution = DEFAULT_BLUEPRINTS.finance;
      }

      setBlueprintResult({
        directiveText:
          directive.trim() ||
          `Analyze attached files (${attachedDocs.map((d) => d.name).join(", ")}) and synthesize enterprise Laxvish architecture.`,
        attachedDocs: [...attachedDocs],
        solution: matchedSolution,
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
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={fileAcceptType}
        onChange={handleFileUpload}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!blueprintResult ? (
          /* ============================================================ */
          /* 1. MINIMAL AI SOLUTIONS OPERATIONAL SURFACE                  */
          /* ============================================================ */
          <motion.div
            key="operational-interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-[2px] border border-charcoal/15 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-visible transition-colors focus-within:border-charcoal/35"
          >
            {/* LEVEL 1: TOP LABEL : Restrained 10px mono, wide tracking */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-charcoal/10">
              <span className="text-[10px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                AI SOLUTIONS
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-neonCyan/70 uppercase">
                LAXVISH / 01
              </span>
            </div>

            {/* LEVEL 2: INPUT : Primary Element with Generous Whitespace */}
            <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3">
              <textarea
                ref={textareaRef}
                rows={3}
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share your problem details. We help business run faster and Save money and time by upto 80 percent..."
                className="w-full resize-none bg-transparent font-sans text-sm sm:text-base text-charcoal placeholder:text-neonCyan/40 focus:outline-none leading-relaxed"
              />
            </div>

            {/* LEVEL 3: ATTACHMENT SECTION : Clean '+' dropdown button for Images, Files, Sheets */}
            <div className="border-t border-charcoal/10 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
              <div className="relative inline-block" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neonCyan hover:text-charcoal transition-colors cursor-pointer py-1"
                  title="Attach images, documents, or spreadsheets"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="font-mono text-sm leading-none font-semibold">+</span>
                  <span>Attach</span>
                </button>

                {/* Dropdown Menu for Images, Files, Sheets */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 bottom-full mb-2 w-52 sm:w-56 max-w-[calc(100vw-32px)] rounded-[2px] border border-charcoal/15 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] py-1 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 border-b border-charcoal/10 text-[9px] font-mono tracking-[0.16em] text-neonCyan/70 uppercase">
                        SELECT ATTACHMENT
                      </div>
                      {ATTACHMENT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleOpenAttachMenu(opt.accept)}
                          className="w-full text-left px-3 py-2 text-xs font-mono text-charcoal hover:bg-vaultAmber/60 flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span className="font-medium">{opt.label}</span>
                          <span className="text-[10px] text-neonCyan/80 font-normal">
                            {opt.ext}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Display Attached Files (Images, Docs, Sheets) */}
              {attachedDocs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {attachedDocs.map((doc) => (
                    <div
                      key={doc.name}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal/85 bg-vaultAmber/40 px-2 py-0.5 rounded-[2px] border border-charcoal/10"
                    >
                      <span className="text-neonCyan text-[10px] font-semibold">
                        [{doc.tag}]
                      </span>
                      <span className="truncate max-w-[110px] xs:max-w-[150px] sm:max-w-[240px]">
                        {doc.name}
                      </span>
                      <span className="text-[10px] text-neonCyan/70">
                        ({doc.size})
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDoc(doc.name)}
                        className="text-neonCyan hover:text-charcoal transition-colors cursor-pointer text-xs leading-none ml-0.5"
                        aria-label={`Remove ${doc.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LEVEL 4: FOOTER & CTA : Subtle system footer + Sharp rectangular CTA */}
            <div className="border-t border-charcoal/10 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.16em] sm:tracking-[0.2em] text-neonCyan uppercase">
                LAXVISH THREAD · WORKERS · BRAIN · BRAKES · DPDP-READY
              </div>

              <button
                type="button"
                onClick={handleSynthesize}
                disabled={isGenerating || (!directive.trim() && attachedDocs.length === 0)}
                className="rounded-[2px] bg-charcoal text-obsidian hover:bg-neonCyan transition-colors px-4 py-2.5 text-xs font-mono tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto text-center"
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 px-4 sm:px-6 py-2.5 border-b border-charcoal/10">
              <span className="text-[10px] font-mono tracking-[0.2em] text-neonCyan uppercase">
                SYSTEM ARCHITECTURE DOSSIER
              </span>
              <span className="text-[10px] font-mono tracking-wider text-neonCyan uppercase">
                LAXVISH BLUEPRINT · {blueprintResult.solution.timeToDeploy}
              </span>
            </div>

            {/* Problem Directive Summary */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-charcoal/10 text-xs text-charcoal space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-neonCyan uppercase tracking-wider">
                <span>PROBLEM DIRECTIVE</span>
                <span>STATUS: ANALYZED</span>
              </div>
              <p className="leading-relaxed text-charcoal/90">{blueprintResult.directiveText}</p>
              {blueprintResult.attachedDocs.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {blueprintResult.attachedDocs.map((doc) => (
                    <span
                      key={doc.name}
                      className="font-mono text-[10px] text-neonCyan"
                    >
                      [{doc.tag}: {doc.name}]
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Architectural Pillars: Workers · Brain · Brakes (Clean Divided Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-charcoal/10 border-b border-charcoal/10 text-xs">
              {/* Workers */}
              <div className="p-4 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  01 // WORKERS
                </span>
                <p className="text-charcoal/85 leading-relaxed">
                  {blueprintResult.solution.workers}
                </p>
              </div>

              {/* Brain */}
              <div className="p-4 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  02 // BRAIN
                </span>
                <p className="text-charcoal/85 leading-relaxed">
                  {blueprintResult.solution.brain}
                </p>
              </div>

              {/* Brakes */}
              <div className="p-4 sm:p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                  03 // BRAKES
                </span>
                <p className="text-charcoal/85 leading-relaxed">
                  {blueprintResult.solution.brakes}
                </p>
              </div>
            </div>

            {/* Operational Impact & ROI */}
            <div className="px-4 sm:px-6 py-4 space-y-3">
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
            <div className="border-t border-charcoal/10 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-neonCyan hover:text-charcoal transition-colors cursor-pointer text-left py-1"
              >
                ← Edit details
              </button>

              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] bg-charcoal text-obsidian hover:bg-neonCyan transition-colors px-4 py-2.5 text-xs font-mono tracking-wider text-center"
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
