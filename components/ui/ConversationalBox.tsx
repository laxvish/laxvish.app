"use client";

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBookDemoUrl } from "@/lib/site-navigation";
import {
  ConversationMessage,
  ConversationSuccessResponse,
  RawAttachmentInput,
  StructuredBlueprint,
} from "@/lib/conversation/types";

interface AttachedClientDoc {
  name: string;
  sizeStr: string;
  sizeBytes: number;
  tag: "IMG" | "DOC" | "SHEET";
  type: string;
  rawText?: string;
  statusLabel?: string;
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

const CONVERSATION_UNAVAILABLE_MESSAGE =
  "Conversation is temporarily unavailable. Please try again.";

export function ConversationalBox({ className = "" }: { className?: string }) {
  const [directive, setDirective] = useState("");
  const [attachedDocs, setAttachedDocs] = useState<AttachedClientDoc[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fileAcceptType, setFileAcceptType] = useState(
    ".pdf,.xlsx,.csv,.docx,.txt,.png,.jpg,.jpeg,.webp"
  );
  const [engineState, setEngineState] = useState<"idle" | "reading" | "synthesizing" | "dossier">("idle");
  const [blueprint, setBlueprint] = useState<StructuredBlueprint | null>(null);
  const [turns, setTurns] = useState<ConversationMessage[]>([]);
  const [followUp, setFollowUp] = useState("");
  const [conversationError, setConversationError] = useState(false);
  const [activeDirectiveSummary, setActiveDirectiveSummary] = useState("");
  const requestSeqRef = useRef(0);

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
    if (["xlsx", "xls", "csv", "tsv"].includes(ext)) return "SHEET";
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

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setEngineState("reading");
    const files = Array.from(e.target.files);
    const newDocs: AttachedClientDoc[] = [];

    for (const file of files) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const tag = getFileTag(file.name);
      let textContent: string | undefined;

      // Extract text content for text-based formats
      if (
        file.name.endsWith(".csv") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".json") ||
        file.name.endsWith(".md") ||
        file.name.endsWith(".tsv") ||
        file.type.startsWith("text/")
      ) {
        try {
          textContent = await file.text();
        } catch {
          // Keep undefined on read error
        }
      }

      newDocs.push({
        name: file.name,
        sizeStr: `${sizeMb} MB`,
        sizeBytes: file.size,
        tag,
        type: file.type || "application/octet-stream",
        rawText: textContent,
      });
    }

    setAttachedDocs((prev) => [
      ...prev.filter((d) => !newDocs.some((nf) => nf.name === d.name)),
      ...newDocs,
    ]);

    setEngineState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeDoc = (name: string) => {
    setAttachedDocs((prev) => prev.filter((d) => d.name !== name));
  };

  const postConversation = async (
    history: ConversationMessage[],
    docs: AttachedClientDoc[] = []
  ): Promise<boolean> => {
    const seq = requestSeqRef.current + 1;
    requestSeqRef.current = seq;
    setEngineState("synthesizing");
    setConversationError(false);

    const rawAttachments: RawAttachmentInput[] = docs.map((d) => ({
      name: d.name,
      size: d.sizeBytes,
      type: d.type,
      content: d.rawText,
      encoding: "utf-8",
    }));

    try {
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.slice(-20),
          attachments: rawAttachments,
        }),
      });

      const parsed = (await response.json().catch(() => null)) as ConversationSuccessResponse | null;

      if (!response.ok || !parsed || typeof parsed.reply !== "string" || !parsed.reply.trim()) {
        if (requestSeqRef.current === seq) {
          setConversationError(true);
          setEngineState("dossier");
        }
        return false;
      }

      if (requestSeqRef.current === seq) {
        const replyText = parsed.reply.trim();
        setTurns([...history, { role: "assistant", content: replyText }]);
        if (parsed.blueprint) {
          setBlueprint(parsed.blueprint);
        }

        // Update attachment status labels with extraction metadata if returned
        if (parsed.attachments && parsed.attachments.length > 0) {
          setAttachedDocs((prev) =>
            prev.map((doc) => {
              const matched = parsed.attachments?.find((a) => a.name === doc.name);
              if (matched) {
                const label = matched.factsCount > 0
                  ? `Extracted · ${matched.factsCount} facts`
                  : matched.status === "processed"
                  ? "Processed"
                  : "Referenced";
                return { ...doc, statusLabel: label };
              }
              return doc;
            })
          );
        }

        setEngineState("dossier");
      }
      return true;
    } catch {
      if (requestSeqRef.current === seq) {
        setConversationError(true);
        setEngineState("dossier");
      }
      return false;
    }
  };

  const handleSynthesize = () => {
    if (engineState === "synthesizing" || engineState === "reading") return;
    if (!directive.trim() && attachedDocs.length === 0) return;

    const openingText = directive.trim() || `Analyze the attached operational evidence and synthesize an enterprise architecture blueprint.`;
    setActiveDirectiveSummary(openingText);

    const history: ConversationMessage[] = [{ role: "user", content: openingText }];
    setTurns(history);
    void postConversation(history, attachedDocs);
  };

  const handleFollowUp = () => {
    if (engineState === "synthesizing" || !followUp.trim()) return;
    const history: ConversationMessage[] = [
      ...turns,
      { role: "user", content: followUp.trim() },
    ];
    setTurns(history);
    setFollowUp("");
    void postConversation(history, attachedDocs);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSynthesize();
    }
  };

  const handleFollowUpKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFollowUp();
    }
  };

  const handleReset = () => {
    requestSeqRef.current += 1;
    setEngineState("idle");
    setBlueprint(null);
    setTurns([]);
    setFollowUp("");
    setConversationError(false);
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
        {engineState === "idle" || engineState === "reading" ? (
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
                        ({doc.sizeStr})
                      </span>
                      {doc.statusLabel && (
                        <span className="text-[9px] text-neonCyan/80 border-l border-charcoal/10 pl-1.5 ml-0.5">
                          {doc.statusLabel}
                        </span>
                      )}
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
                disabled={engineState === "reading" || (!directive.trim() && attachedDocs.length === 0)}
                className="rounded-[2px] bg-charcoal text-obsidian hover:bg-neonCyan transition-colors px-4 py-2.5 text-xs font-mono tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto text-center"
              >
                {engineState === "reading" ? (
                  <span>Extracting File...</span>
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
                ARCHITECTURAL DOSSIER
              </span>
              <span className="text-[10px] font-mono tracking-wider text-neonCyan uppercase">
                LAXVISH SYNTHESIS · LIVE
              </span>
            </div>

            {/* Problem Directive Summary */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-charcoal/10 text-xs text-charcoal space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-neonCyan uppercase tracking-wider">
                <span>OPERATIONAL DIRECTIVE</span>
                <span>STATUS: GROUNDED & ANALYZED</span>
              </div>
              <p className="leading-relaxed text-charcoal/90">{activeDirectiveSummary}</p>
              {attachedDocs.length > 0 && (
                <div className="pt-1.5 flex flex-wrap gap-2">
                  {attachedDocs.map((doc) => (
                    <span
                      key={doc.name}
                      className="font-mono text-[10px] text-neonCyan border border-charcoal/15 px-2 py-0.5"
                    >
                      [{doc.tag}: {doc.name}] {doc.statusLabel ? `— ${doc.statusLabel}` : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Conversation Turns & Structured Response */}
            <div className="px-4 sm:px-6 py-4 space-y-4 border-b border-charcoal/10 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan font-medium block">
                LAXVISH ARCHITECTURAL BLUEPRINT
              </span>
              {engineState === "synthesizing" && (
                <p className="text-charcoal/85 leading-relaxed font-mono text-xs animate-pulse">
                  Reasoning over normalized evidence & synthesizing pipeline...
                </p>
              )}

              {/* Structured Pipeline Display (if parsed) */}
              {blueprint && blueprint.architecture.length > 0 && turns.length <= 2 && (
                <div className="bg-vaultAmber/30 border border-charcoal/15 p-3.5 space-y-2.5 rounded-[2px] font-mono">
                  <div className="text-[9px] text-neonCyan uppercase tracking-[0.18em]">
                    SYSTEM PIPELINE ARCHITECTURE
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {blueprint.architecture.slice(0, 3).map((stage, i) => (
                      <div key={i} className="border border-charcoal/10 bg-white/70 p-2 text-[11px] text-charcoal">
                        <span className="text-neonCyan text-[9px] block">0{i + 1} // STAGE</span>
                        {stage}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {turns
                .filter((t) => t.role === "assistant")
                .map((turn, idx) => (
                  <div key={idx} className="space-y-3">
                    <p className="text-charcoal/85 leading-relaxed whitespace-pre-line">
                      {turn.content}
                    </p>
                  </div>
                ))}
              {conversationError && (
                <div className="space-y-2">
                  <p className="text-charcoal/85 leading-relaxed">
                    {CONVERSATION_UNAVAILABLE_MESSAGE}
                  </p>
                  <button
                    type="button"
                    onClick={() => void postConversation(turns, attachedDocs)}
                    className="text-xs font-mono text-neonCyan hover:text-charcoal transition-colors cursor-pointer py-1"
                  >
                    Try again →
                  </button>
                </div>
              )}
            </div>

            {/* Follow-up: continue the same conversation */}
            <div className="px-4 sm:px-6 py-3 border-b border-charcoal/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <textarea
                rows={1}
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                onKeyDown={handleFollowUpKeyDown}
                placeholder="Refine requirements or ask a follow-up..."
                className="flex-1 resize-none bg-transparent font-sans text-xs sm:text-sm text-charcoal placeholder:text-neonCyan/40 focus:outline-none leading-relaxed"
              />
              <button
                type="button"
                onClick={handleFollowUp}
                disabled={engineState === "synthesizing" || !followUp.trim()}
                className="rounded-[2px] bg-charcoal text-obsidian hover:bg-neonCyan transition-colors px-4 py-2 text-xs font-mono tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto text-center"
              >
                <span>Send</span>
                <span>→</span>
              </button>
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
                Book Working Session →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
