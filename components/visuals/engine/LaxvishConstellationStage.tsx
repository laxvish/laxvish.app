"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SalesScene } from "./scenes/SalesScene";
import { SupportScene } from "./scenes/SupportScene";
import { DocumentScene } from "./scenes/DocumentScene";
import { KnowledgeScene } from "./scenes/KnowledgeScene";
import { VoiceWhatsAppScene } from "./scenes/VoiceWhatsAppScene";
import { FinanceApScene } from "./scenes/FinanceApScene";
import { ContractScene } from "./scenes/ContractScene";
import { ItHelpdeskScene } from "./scenes/ItHelpdeskScene";
import { ExecutiveScene } from "./scenes/ExecutiveScene";
import { MarketingScene } from "./scenes/MarketingScene";
import { ProcurementScene } from "./scenes/ProcurementScene";
import { HrOperationsScene } from "./scenes/HrOperationsScene";
import { ReportingAnalyticsScene } from "./scenes/ReportingAnalyticsScene";

export interface Chapter {
  slug: string;
  name: string;
  category: string;
}

export const CHAPTERS: Chapter[] = [
  { slug: "sales-automation", name: "Sales & Leads", category: "Revenue" },
  { slug: "customer-support", name: "Support Desk", category: "Customer" },
  { slug: "document-processing", name: "Document Parser", category: "Finance" },
  { slug: "internal-knowledge", name: "Internal Knowledge", category: "Operations" },
  { slug: "voice-whatsapp", name: "Voice & WhatsApp", category: "Customer" },
  { slug: "finance-ap", name: "Finance & AP", category: "Finance" },
  { slug: "contract-automation", name: "Contracts", category: "Legal" },
  { slug: "it-helpdesk", name: "IT Helpdesk", category: "Security" },
  { slug: "executive-intelligence", name: "Executive Intel", category: "Leadership" },
  { slug: "marketing-operations", name: "Marketing Ops", category: "Revenue" },
  { slug: "procurement", name: "Procurement", category: "Operations" },
  { slug: "hr-operations", name: "People & HR", category: "Operations" },
  { slug: "reporting-analytics", name: "Narrative Analytics", category: "Finance" },
];

interface LaxvishConstellationStageProps {
  initialSlug?: string;
  className?: string;
  showConstellationNav?: boolean;
}

export function LaxvishConstellationStage({
  initialSlug = "sales-automation",
  className = "",
  showConstellationNav = true,
}: LaxvishConstellationStageProps) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  const renderScene = () => {
    switch (activeSlug) {
      case "sales-automation":
        return <SalesScene />;
      case "customer-support":
        return <SupportScene />;
      case "document-processing":
        return <DocumentScene />;
      case "internal-knowledge":
        return <KnowledgeScene />;
      case "voice-whatsapp":
        return <VoiceWhatsAppScene />;
      case "finance-ap":
        return <FinanceApScene />;
      case "contract-automation":
        return <ContractScene />;
      case "it-helpdesk":
        return <ItHelpdeskScene />;
      case "executive-intelligence":
        return <ExecutiveScene />;
      case "marketing-operations":
        return <MarketingScene />;
      case "procurement":
        return <ProcurementScene />;
      case "hr-operations":
        return <HrOperationsScene />;
      case "reporting-analytics":
        return <ReportingAnalyticsScene />;
      default:
        return <SalesScene />;
    }
  };

  return (
    <div className={`relative flex flex-col space-y-6 ${className}`}>
      {/* Living Constellation Orbit Navigation */}
      {showConstellationNav && (
        <div className="flex flex-wrap items-center justify-start gap-2 overflow-x-auto pb-2">
          {CHAPTERS.map((ch) => {
            const isActive = ch.slug === activeSlug;
            return (
              <button
                key={ch.slug}
                type="button"
                onClick={() => setActiveSlug(ch.slug)}
                className={`rounded-full px-4 py-2 font-mono text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-charcoal text-white shadow-md font-semibold"
                    : "border border-charcoal/10 bg-white/80 text-charcoal/60 hover:border-charcoal/30 hover:text-charcoal"
                }`}
              >
                {ch.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Cinematic Stage Wrapper with Double-Bezel Architecture */}
      <div className="group relative rounded-[2.5rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
