"use client";

import { SalesAutomationSim } from "./SalesAutomationSim";
import { CustomerSupportSim } from "./CustomerSupportSim";
import { DocumentProcessingSim } from "./DocumentProcessingSim";
import { InternalKnowledgeSim } from "./InternalKnowledgeSim";
import { VoiceWhatsAppSim } from "./VoiceWhatsAppSim";
import { FinanceApSim } from "./FinanceApSim";
import { ContractAutomationSim } from "./ContractAutomationSim";
import { ItHelpdeskSim } from "./ItHelpdeskSim";
import { ExecutiveIntelligenceSim } from "./ExecutiveIntelligenceSim";
import { MarketingOpsSim } from "./MarketingOpsSim";
import { ProcurementSim } from "./ProcurementSim";
import { HrOperationsSim } from "./HrOperationsSim";
import { ReportingAnalyticsSim } from "./ReportingAnalyticsSim";

interface AgentTaskSimulatorProps {
  slug: string;
  className?: string;
}

export function AgentTaskSimulator({
  slug,
  className = "",
}: AgentTaskSimulatorProps) {
  switch (slug) {
    case "sales-automation":
      return <SalesAutomationSim />;
    case "customer-support":
      return <CustomerSupportSim />;
    case "document-processing":
      return <DocumentProcessingSim />;
    case "internal-knowledge":
      return <InternalKnowledgeSim />;
    case "voice-whatsapp":
      return <VoiceWhatsAppSim />;
    case "finance-ap":
      return <FinanceApSim />;
    case "contract-automation":
      return <ContractAutomationSim />;
    case "it-helpdesk":
      return <ItHelpdeskSim />;
    case "executive-intelligence":
      return <ExecutiveIntelligenceSim />;
    case "marketing-operations":
      return <MarketingOpsSim />;
    case "procurement":
      return <ProcurementSim />;
    case "hr-operations":
      return <HrOperationsSim />;
    case "reporting-analytics":
      return <ReportingAnalyticsSim />;
    default:
      return <SalesAutomationSim />;
  }
}
