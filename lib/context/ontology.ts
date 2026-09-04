import type { 
  BehaviorModel, 
  DirectInputModel, 
  EnvironmentCategoryDensity,
  EnvironmentModel, 
  PredictedSolutionOpportunity,
  ProblemHypothesis, 
  SolutionCandidate, 
  SolutionOpportunityDefinition,
  TechnicalModel, 
  TemporalModel 
} from "./types.ts";

export interface ProblemDefinition {
  key: string;
  title: string;
  category: 'business' | 'operations' | 'healthcare' | 'education' | 'general';
  relevantEnvCategories: (keyof EnvironmentModel['categories'])[];
  relevantTopics: string[];
  recommendedSolution: SolutionCandidate;
}

export const LAXVISH_PROBLEM_TAXONOMY: ProblemDefinition[] = [
  {
    key: "workflow_fragmentation",
    title: "Cross-Functional Workflow Fragmentation",
    category: "operations",
    relevantEnvCategories: ["business", "industrial", "transport"],
    relevantTopics: ["automation", "workers", "operations", "orchestration"],
    recommendedSolution: {
      solutionKey: "autonomous_workflow_orchestrator",
      title: "Laxvish Autonomous Workflow Worker",
      capabilitySummary: "End-to-end multi-step task execution across enterprise ERPs, databases, and operational portals.",
      recommendedWorker: "Workers (Execution Engine)",
      ctaText: "Deploy Workflow Worker",
      ctaHref: "/workers",
    },
  },
  {
    key: "sales_lead_qualification_bottleneck",
    title: "High-Volume Voice & Inbound Lead Triage",
    category: "business",
    relevantEnvCategories: ["business", "finance", "retail"],
    relevantTopics: ["telephony", "callme", "sales", "qualification"],
    recommendedSolution: {
      solutionKey: "telephony_voice_agent",
      title: "Laxvish Realtime Telephony Voice Worker",
      capabilitySummary: "Ultra-low latency conversational AI that calls, qualifies, and schedules enterprise prospects in natural Indian English and Hindi.",
      recommendedWorker: "Voice AI Agent",
      ctaText: "Test Voice Worker",
      ctaHref: "/callme",
    },
  },
  {
    key: "documentation_extraction_burden",
    title: "Manual Document & Contract Extraction Overhead",
    category: "operations",
    relevantEnvCategories: ["healthcare", "education", "government", "finance"],
    relevantTopics: ["brain", "document", "extraction", "compliance"],
    recommendedSolution: {
      solutionKey: "document_intelligence_pipeline",
      title: "Laxvish Document Intelligence Core",
      capabilitySummary: "High-throughput extraction and validation of unstructured invoices, clinical records, and legal contracts with cryptographic audit trails.",
      recommendedWorker: "Brain (Reasoning Core)",
      ctaText: "Explore Brain Architecture",
      ctaHref: "/brain",
    },
  },
  {
    key: "compliance_governance_risk",
    title: "Uncontrolled AI Execution & DPDP Non-Conformance",
    category: "general",
    relevantEnvCategories: ["finance", "government", "healthcare"],
    relevantTopics: ["brakes", "security", "governance", "audit"],
    recommendedSolution: {
      solutionKey: "governance_safety_brakes",
      title: "Laxvish Deterministic Brakes & Guardrails",
      capabilitySummary: "Real-time policy enforcement and deterministic halts that guarantee full DPDP compliance and zero hallucination risk in production.",
      recommendedWorker: "Brakes (Safety Layer)",
      ctaText: "Inspect Safety Brakes",
      ctaHref: "/brakes",
    },
  },
  {
    key: "knowledge_fragmentation",
    title: "Enterprise Knowledge & Context Fragmentation",
    category: "business",
    relevantEnvCategories: ["business", "education", "industrial"],
    relevantTopics: ["brain", "workers", "knowledge", "search"],
    recommendedSolution: {
      solutionKey: "enterprise_context_graph",
      title: "Laxvish Enterprise Thinking Backbone",
      capabilitySummary: "Unified semantic index and neural context layer synchronizing distributed company memory across all functional tools.",
      recommendedWorker: "Laxvish Thread",
      ctaText: "Book Working Session",
      ctaHref: "/contact",
    },
  },
];

/**
 * Extensible Opportunity Ontology: 15+ high-value AI solutions Laxvish builds
 */
export const SOLUTION_OPPORTUNITY_REGISTRY: SolutionOpportunityDefinition[] = [
  {
    id: "ai_finance_platform",
    title: "AI for Finance",
    category: "finance",
    headline: "Autonomous Invoicing, Reconciliation & Cash Flow Intelligence",
    description: "We can help you scale your finance operations with AI — from repetitive reconciliations to instant decision-support.",
    rationale: "Tailored for high-volume enterprise financial operations and commercial corridors.",
    targetIndustries: ["Finance", "Banking", "Fintech", "Enterprise Corporate"],
    targetRoles: ["CFO", "Finance Controller", "Accounts Head", "Treasury Lead"],
    problemDomains: ["Invoice Reconciliation", "Ledger Auditing", "Cash Flow Forecasting", "Vendor Payouts"],
    relevantEnvCategories: ["finance", "business"],
    relevantTopics: ["finance", "invoicing", "reconciliation", "ledger", "accounting", "erp"],
    laxvishCapabilities: ["Workers", "Brain", "Brakes"],
    ctaText: "Explore Finance AI",
    ctaHref: "/workers",
    baseWeight: 0.50,
  },
  {
    id: "ai_education_platform",
    title: "AI for Education",
    category: "education",
    headline: "Institutional Administration & Intelligent Learning Support",
    description: "We can build an AI education platform that saves your institution time, automates administration, and improves the learning experience.",
    rationale: "Structured for educational institutions, academies, and university ecosystems.",
    targetIndustries: ["Higher Education", "K-12 Institutions", "EdTech", "Corporate Training"],
    targetRoles: ["Chancellor", "Dean", "School Director", "Academic Operations Head"],
    problemDomains: ["Admissions Triage", "Student Evaluation", "Curriculum Administration", "Parent Communication"],
    relevantEnvCategories: ["education", "cultural"],
    relevantTopics: ["education", "school", "university", "learning", "admissions", "students"],
    laxvishCapabilities: ["Brain", "Workers", "Telephony"],
    ctaText: "Explore Education AI",
    ctaHref: "/brain",
    baseWeight: 0.45,
  },
  {
    id: "ai_healthcare_operations",
    title: "AI for Healthcare",
    category: "healthcare",
    headline: "Clinical Documentation & Patient Flow Orchestration",
    description: "We can build intelligent systems that reduce administrative burdens and documentation overhead so your healthcare team can focus on patients.",
    rationale: "Engineered for clinical workflows, hospital networks, and diagnostic centres.",
    targetIndustries: ["Hospitals", "Clinics", "Diagnostics", "HealthTech", "Pharmaceuticals"],
    targetRoles: ["Medical Director", "Chief Medical Officer", "Hospital Administrator", "Operations Head"],
    problemDomains: ["Discharge Summaries", "EMR Extraction", "Appointment Scheduling", "Insurance Pre-Auth"],
    relevantEnvCategories: ["healthcare"],
    relevantTopics: ["healthcare", "clinical", "hospital", "patient", "medical", "records"],
    laxvishCapabilities: ["Brain", "Brakes", "Workers"],
    ctaText: "Explore Healthcare AI",
    ctaHref: "/brain",
    baseWeight: 0.45,
  },
  {
    id: "ai_sales_telephony_agent",
    title: "AI for Sales",
    category: "sales",
    headline: "Autonomous Voice Qualification & Inbound Triage",
    description: "We can build AI agents that qualify leads, handle customer conversations in natural Indian languages, and keep your sales pipeline moving.",
    rationale: "Optimized for fast-moving sales teams and high-volume inbound pipelines.",
    targetIndustries: ["B2B SaaS", "Real Estate", "Insurance", "Education Sales", "Consumer Services"],
    targetRoles: ["VP Sales", "Chief Commercial Officer", "Revenue Operations Head", "Growth Director"],
    problemDomains: ["Lead Response Time", "Inbound Call Qualification", "CRM Data Hygiene", "Meeting Booking"],
    relevantEnvCategories: ["retail", "business", "finance"],
    relevantTopics: ["sales", "telephony", "voice", "callme", "qualification", "leads"],
    laxvishCapabilities: ["Telephony", "Workers", "Brain"],
    ctaText: "Explore Sales AI",
    ctaHref: "/callme",
    baseWeight: 0.55,
  },
  {
    id: "ai_operations_automation",
    title: "AI for Operations",
    category: "operations",
    headline: "Autonomous Cross-System Enterprise Workflows",
    description: "We can turn repetitive business processes into autonomous AI workflows that operate safely across your existing software systems.",
    rationale: "Designed for multi-department enterprises with legacy databases and modern cloud ERPs.",
    targetIndustries: ["Manufacturing", "IT Services", "Logistics", "Conglomerates", "Retail"],
    targetRoles: ["Chief Operating Officer", "VP Operations", "Transformation Officer", "IT Operations Lead"],
    problemDomains: ["Cross-Tool Data Sync", "Manual Status Updates", "Workflow Bottlenecks", "Exception Handling"],
    relevantEnvCategories: ["business", "industrial", "transport"],
    relevantTopics: ["operations", "automation", "workers", "workflow", "orchestration"],
    laxvishCapabilities: ["Workers", "Brain", "Brakes"],
    ctaText: "Explore Operations AI",
    ctaHref: "/workers",
    baseWeight: 0.60,
  },
  {
    id: "ai_document_intelligence",
    title: "AI for Documents",
    category: "document",
    headline: "Deterministic Extraction for Invoices, Contracts & Records",
    description: "We can extract, validate, and verify unstructured enterprise documents with zero hallucination risk and cryptographic audit trails.",
    rationale: "Built for paperwork-heavy compliance, legal, and operational environments.",
    targetIndustries: ["Legal", "Logistics", "Banking", "Insurance", "Government Contracting"],
    targetRoles: ["Head of Shared Services", "Documentation Manager", "Compliance Lead", "Auditor"],
    problemDomains: ["Manual Data Entry", "KYC Verification", "Contract Clause Extraction", "Invoice Discrepancies"],
    relevantEnvCategories: ["finance", "government", "healthcare", "business"],
    relevantTopics: ["document", "extraction", "contracts", "invoices", "brain", "pdf"],
    laxvishCapabilities: ["Brain", "Brakes"],
    ctaText: "Explore Document AI",
    ctaHref: "/brain",
    baseWeight: 0.50,
  },
  {
    id: "ai_logistics_orchestrator",
    title: "AI for Logistics",
    category: "logistics",
    headline: "Supply Chain Visibility & Dispatch Coordination",
    description: "We can orchestrate shipment exceptions, carrier communications, and warehouse dispatch updates with real-time autonomous intelligence.",
    rationale: "Configured for freight corridors, manufacturing hubs, and distribution networks.",
    targetIndustries: ["Freight & Logistics", "3PL Providers", "E-Commerce Fulfillment", "Supply Chain"],
    targetRoles: ["VP Logistics", "Supply Chain Director", "Dispatch Head", "Fleet Operations Manager"],
    problemDomains: ["Carrier Delay Handling", "Bill of Lading Triage", "POD Verification", "Warehouse Scheduling"],
    relevantEnvCategories: ["transport", "industrial"],
    relevantTopics: ["logistics", "supply chain", "freight", "transport", "dispatch", "fleet"],
    laxvishCapabilities: ["Workers", "Telephony", "Brakes"],
    ctaText: "Explore Logistics AI",
    ctaHref: "/workers",
    baseWeight: 0.40,
  },
  {
    id: "ai_legal_intelligence",
    title: "AI for Legal",
    category: "legal",
    headline: "Contract Analysis & Regulatory Compliance Systems",
    description: "We can analyze complex enterprise agreements, flag regulatory risks, and ensure adherence to Indian statutory norms in seconds.",
    rationale: "Specialized for corporate legal departments, law firms, and statutory advisory teams.",
    targetIndustries: ["Corporate Legal", "Consulting", "Real Estate Legal", "Financial Compliance"],
    targetRoles: ["General Counsel", "Legal Operations Lead", "Compliance Officer", "Partner"],
    problemDomains: ["Contract Review Cycles", "Statutory Clause Auditing", "Risk Identification", "Policy Cross-Checking"],
    relevantEnvCategories: ["government", "finance", "business"],
    relevantTopics: ["legal", "compliance", "contracts", "regulatory", "dpdp", "audit"],
    laxvishCapabilities: ["Brain", "Brakes"],
    ctaText: "Explore Legal AI",
    ctaHref: "/brain",
    baseWeight: 0.40,
  },
  {
    id: "ai_hr_automation",
    title: "AI for HR",
    category: "hr",
    headline: "Talent Screening, Onboarding & Employee Operations",
    description: "We can streamline candidate screening, automate employee onboarding workflows, and handle internal policy inquiries instantly.",
    rationale: "Engineered for scaling enterprises managing distributed and high-volume workforces.",
    targetIndustries: ["IT Services", "BPO", "Hospitality", "Retail Chains", "Staffing Agencies"],
    targetRoles: ["Chief People Officer", "HR Director", "Talent Acquisition Head", "HR Operations Lead"],
    problemDomains: ["Resume Screening Backlog", "Onboarding Documentation", "Policy Q&A Fatigue", "Interview Scheduling"],
    relevantEnvCategories: ["business", "education"],
    relevantTopics: ["hr", "talent", "recruitment", "onboarding", "employees", "people"],
    laxvishCapabilities: ["Workers", "Brain"],
    ctaText: "Explore HR AI",
    ctaHref: "/workers",
    baseWeight: 0.40,
  },
  {
    id: "ai_customer_support_core",
    title: "AI for Customer Support",
    category: "support",
    headline: "24/7 Multilingual Omnichannel Support Agents",
    description: "We can build conversational support systems that resolve customer inquiries instantly across voice, chat, and email with human escalation safeguards.",
    rationale: "Designed for customer-centric brands handling high interaction volumes.",
    targetIndustries: ["Consumer Internet", "Banking", "Fintech", "Telecom", "Hospitality"],
    targetRoles: ["VP Customer Experience", "Support Operations Head", "Contact Centre Director", "CX Lead"],
    problemDomains: ["First Response Time", "Ticket Backlog", "Multilingual Support Coverage", "Repetitive Inquiries"],
    relevantEnvCategories: ["retail", "hospitality", "business"],
    relevantTopics: ["support", "customer", "chat", "voice", "telephony", "helpdesk"],
    laxvishCapabilities: ["Telephony", "Brain", "Brakes"],
    ctaText: "Explore Support AI",
    ctaHref: "/callme",
    baseWeight: 0.50,
  },
  {
    id: "ai_enterprise_brain",
    title: "AI for Enterprise Knowledge",
    category: "knowledge",
    headline: "Unified Semantic Memory & Internal AI Copilots",
    description: "We can connect your company's distributed documents, communications, and databases into a single searchable thinking backbone.",
    rationale: "Created for organizations seeking to eliminate internal knowledge silos.",
    targetIndustries: ["Enterprises", "Consulting", "Engineering Firms", "Research Organizations"],
    targetRoles: ["Chief Technology Officer", "Knowledge Manager", "Engineering VP", "Chief Information Officer"],
    problemDomains: ["Internal Silos", "Information Retrieval Delays", "Institutional Memory Loss", "Tool Fragmentation"],
    relevantEnvCategories: ["business", "education", "industrial"],
    relevantTopics: ["knowledge", "brain", "search", "rag", "copilot", "internal"],
    laxvishCapabilities: ["Brain", "Workers"],
    ctaText: "Explore Enterprise Brain",
    ctaHref: "/brain",
    baseWeight: 0.55,
  },
  {
    id: "ai_compliance_brakes",
    title: "AI for Compliance & Safety",
    category: "compliance",
    headline: "Deterministic Policy Enforcement & DPDP Brakes",
    description: "We can install deterministic safety guardrails that prevent unauthorized AI actions and guarantee full DPDP compliance across your stack.",
    rationale: "Essential for regulated industries requiring strict data sovereignty.",
    targetIndustries: ["Banking", "Insurance", "Healthcare", "Government", "Defense"],
    targetRoles: ["Chief Information Security Officer", "Data Protection Officer", "Risk Head", "Compliance VP"],
    problemDomains: ["AI Hallucination Liability", "DPDP Non-Conformance", "Data Leakage", "Unverified Automations"],
    relevantEnvCategories: ["government", "finance", "healthcare"],
    relevantTopics: ["brakes", "compliance", "security", "safety", "guardrails", "dpdp"],
    laxvishCapabilities: ["Brakes"],
    ctaText: "Inspect Safety Brakes",
    ctaHref: "/brakes",
    baseWeight: 0.45,
  },
  {
    id: "ai_procurement_intelligence",
    title: "AI for Procurement",
    category: "procurement",
    headline: "Vendor Evaluation & Purchase Order Automation",
    description: "We can automate vendor comparison, purchase requisition matching, and supplier invoice verification to prevent cost leakages.",
    rationale: "Tailored for enterprises managing extensive supplier and vendor networks.",
    targetIndustries: ["Manufacturing", "Infrastructure", "Hospitality", "Healthcare Systems"],
    targetRoles: ["Chief Procurement Officer", "Purchasing Head", "Supply Chain Lead", "Vendor Manager"],
    problemDomains: ["PO Matching Delays", "Vendor Overbilling", "Quotation Comparison", "Contract Compliance"],
    relevantEnvCategories: ["industrial", "business", "finance"],
    relevantTopics: ["procurement", "vendor", "purchase", "inventory", "supply"],
    laxvishCapabilities: ["Workers", "Brain"],
    ctaText: "Explore Procurement AI",
    ctaHref: "/workers",
    baseWeight: 0.35,
  },
  {
    id: "ai_real_estate_operations",
    title: "AI for Real Estate",
    category: "real_estate",
    headline: "Tenant Triage, Lease Analytics & Facility Automation",
    description: "We can automate property inquiries, streamline lease management, and coordinate facility maintenance requests with autonomous AI.",
    rationale: "Structured for property developers, co-working operators, and commercial asset managers.",
    targetIndustries: ["Commercial Real Estate", "Residential Developers", "Co-Working", "Facility Management"],
    targetRoles: ["Asset Manager", "Leasing Director", "Property Operations Head", "Facility VP"],
    problemDomains: ["Lead Scheduling", "Lease Document Audit", "Maintenance Ticket Routing", "Tenant Communication"],
    relevantEnvCategories: ["residential", "business"],
    relevantTopics: ["real estate", "property", "lease", "tenant", "facility"],
    laxvishCapabilities: ["Workers", "Telephony"],
    ctaText: "Explore Real Estate AI",
    ctaHref: "/workers",
    baseWeight: 0.35,
  },
  {
    id: "ai_retail_intelligence",
    title: "AI for Retail & Commerce",
    category: "retail",
    headline: "Inventory Forecasting & Omnichannel Order Operations",
    description: "We can synchronize catalog updates, forecast stock requirements, and automate order exception handling across your retail channels.",
    rationale: "Engineered for retail chains, distributors, and omnichannel consumer merchants.",
    targetIndustries: ["Retail Chains", "D2C Brands", "FMCG Distributors", "Wholesale Merchants"],
    targetRoles: ["Head of Retail", "E-Commerce Director", "Merchandising Lead", "Operations Head"],
    problemDomains: ["Stockouts", "Catalog Synchronization", "Return Processing", "Multichannel Pricing"],
    relevantEnvCategories: ["retail", "hospitality", "transport"],
    relevantTopics: ["retail", "commerce", "inventory", "orders", "merchants", "store"],
    laxvishCapabilities: ["Workers", "Brain", "Telephony"],
    ctaText: "Explore Retail AI",
    ctaHref: "/workers",
    baseWeight: 0.40,
  },
];

/**
 * Deterministic multi-signal problem hypothesis scorer (Legacy compatibility)
 */
export function scoreProblemHypotheses(
  environment: EnvironmentModel,
  behavior: BehaviorModel,
  direct: DirectInputModel,
  temporal: TemporalModel,
  technical: TechnicalModel
): { hypotheses: ProblemHypothesis[]; topSolution?: SolutionCandidate } {
  const scoredList: ProblemHypothesis[] = [];

  for (const prob of LAXVISH_PROBLEM_TAXONOMY) {
    const evidence: string[] = [];
    let score = 0.2; // baseline prior

    // 1. Direct user input (Strongest: 1.0 weight)
    if (direct.promptQueries.length > 0 || direct.statedProblem) {
      const directText = `${direct.promptQueries.join(" ")} ${direct.statedProblem || ""}`.toLowerCase();
      if (
        directText.includes("call") ||
        directText.includes("voice") ||
        directText.includes("lead") ||
        directText.includes("sales")
      ) {
        if (prob.key === "sales_lead_qualification_bottleneck") {
          score += 0.80;
          evidence.push(`Direct inquiry on voice & lead qualification`);
        }
      } else if (
        directText.includes("document") ||
        directText.includes("invoice") ||
        directText.includes("paperwork") ||
        directText.includes("pdf")
      ) {
        if (prob.key === "documentation_extraction_burden") {
          score += 0.80;
          evidence.push(`Direct inquiry on document automation`);
        }
      } else if (
        directText.includes("workflow") ||
        directText.includes("automate") ||
        directText.includes("process") ||
        directText.includes("erp")
      ) {
        if (prob.key === "workflow_fragmentation") {
          score += 0.80;
          evidence.push(`Direct inquiry on automated workflow execution`);
        }
      }
    }

    // 2. Behavioral On-Site Telemetry (0.85 weight)
    for (const [topic, topicScore] of Object.entries(behavior.topicsOfInterest)) {
      if (prob.relevantTopics.includes(topic.toLowerCase())) {
        const delta = topicScore * 0.35;
        score += delta;
        evidence.push(`Dwell & interest in ${topic} (${(topicScore * 100).toFixed(0)}%)`);
      }
    }

    // 3. Environment Context (0.55 weight)
    for (const envCat of prob.relevantEnvCategories) {
      const density = environment.categories[envCat] || 0;
      if (density > 0.4) {
        score += density * 0.20;
        evidence.push(`Surrounding ${envCat} density (${(density * 100).toFixed(0)}%)`);
      }
    }

    // 4. Temporal Context (0.30 weight)
    if (temporal.localHour >= 18 || temporal.localHour < 6) {
      if (prob.key === "workflow_fragmentation" || prob.key === "sales_lead_qualification_bottleneck") {
        score += 0.05;
        evidence.push(`After-hours session (operational continuity need)`);
      }
    }

    // 5. Technical Signals (0.15 weight)
    if (technical.deviceClass === "mobile" && prob.key === "sales_lead_qualification_bottleneck") {
      score += 0.05;
      evidence.push(`Mobile interface interaction`);
    }

    const confidence = Math.min(0.98, Math.max(0.20, Number(score.toFixed(2))));

    scoredList.push({
      id: `hyp_${prob.key}`,
      problemKey: prob.key,
      title: prob.title,
      confidence,
      supportingEvidence: evidence.length > 0 ? evidence : ["General enterprise operational pattern"],
      status: confidence > 0.85 ? "confirmed" : "hypothesis",
    });
  }

  scoredList.sort((a, b) => b.confidence - a.confidence);

  const topHypothesis = scoredList[0];
  const matchedProbDef = LAXVISH_PROBLEM_TAXONOMY.find((p) => p.key === topHypothesis?.problemKey);
  const topSolution = matchedProbDef?.recommendedSolution;

  return {
    hypotheses: scoredList,
    topSolution,
  };
}

/**
 * Predicts and ranks the top 5 diverse AI solution opportunities for a visitor
 * based on multi-signal context graph with strict diversity guarantees.
 */
export function scoreAndRankPredictedSolutions(
  environment: EnvironmentModel,
  behavior: BehaviorModel,
  direct: DirectInputModel,
  temporal: TemporalModel,
  technical: TechnicalModel
): PredictedSolutionOpportunity[] {
  const directText = `${direct.promptQueries.join(" ")} ${direct.statedProblem || ""}`.toLowerCase();

  const scoredCandidates: Array<{ def: SolutionOpportunityDefinition; score: number }> = [];

  for (const def of SOLUTION_OPPORTUNITY_REGISTRY) {
    let score = def.baseWeight || 0.35;

    // 1. Explicit Direct Query (Weight 1.0 - Dominant override)
    if (directText.length > 0) {
      const words = directText.split(/\W+/).filter((w) => w.length >= 3);
      let directScore = 0;

      for (const topic of def.relevantTopics) {
        const tLower = topic.toLowerCase();
        if (words.some((w) => w.includes(tLower) || tLower.includes(w))) {
          directScore += 1.8;
        }
      }
      for (const industry of def.targetIndustries) {
        const iLower = industry.toLowerCase();
        if (words.some((w) => w.includes(iLower) || iLower.includes(w))) {
          directScore += 2.2;
        }
      }
      if (words.some((w) => w.includes(def.category) || def.category.includes(w))) {
        directScore += 2.0;
      }
      for (const role of def.targetRoles) {
        const rLower = role.toLowerCase();
        if (words.some((w) => w.includes(rLower) || rLower.includes(w))) {
          directScore += 1.2;
        }
      }

      score += directScore;
    }

    // 2. Behavioral Telemetry & Topics Explored (Weight 0.85)
    for (const [topic, topicWeight] of Object.entries(behavior.topicsOfInterest)) {
      const lowerTopic = topic.toLowerCase();
      if (def.relevantTopics.some((t) => lowerTopic.includes(t) || t.includes(lowerTopic))) {
        score += topicWeight * 0.45;
      }
    }

    // 3. Environmental Density & Nearby Ecosystem (Weight 0.55)
    for (const envCat of def.relevantEnvCategories) {
      const density = environment.categories[envCat] || 0;
      if (density > 0.3) {
        score += density * 0.35;
      }
    }

    // Nearby representative places boost
    if (environment.nearestRepresentative?.length) {
      for (const place of environment.nearestRepresentative) {
        if (def.relevantEnvCategories.includes(place.category as keyof EnvironmentCategoryDensity)) {
          score += place.densityFactor * 0.20;
        }
      }
    }

    // 4. Temporal Context (Weight 0.30)
    if (temporal.localHour >= 18 || temporal.localHour < 6) {
      if (def.category === "support" || def.category === "sales" || def.category === "operations") {
        score += 0.08;
      }
    }

    // 5. Technical Context (Weight 0.15)
    if (technical.deviceClass === "mobile") {
      if (def.category === "sales" || def.category === "support") {
        score += 0.05;
      }
    }

    scoredCandidates.push({ def, score });
  }

  // Sort candidates by score descending
  scoredCandidates.sort((a, b) => b.score - a.score);

  // Diversity Enforcement: Select Top 5 ensuring distinct categories
  const selected: SolutionOpportunityDefinition[] = [];
  const seenCategories = new Set<string>();

  for (const item of scoredCandidates) {
    if (!seenCategories.has(item.def.category)) {
      selected.push(item.def);
      seenCategories.add(item.def.category);
    }
    if (selected.length === 5) break;
  }

  // If fewer than 5 unique categories, fill with remaining highest scoring items
  if (selected.length < 5) {
    for (const item of scoredCandidates) {
      if (!selected.some((s) => s.id === item.def.id)) {
        selected.push(item.def);
      }
      if (selected.length === 5) break;
    }
  }

  // Map to PredictedSolutionOpportunity contract
  return selected.slice(0, 5).map((def, index) => {
    // Confidence gracefully descends across ranks
    const baseConfidence = 0.94 - index * 0.04;
    const confidence = Math.max(0.70, Number(baseConfidence.toFixed(2)));

    return {
      id: def.id,
      rank: index + 1,
      title: def.title,
      category: def.category,
      headline: def.headline,
      description: def.description,
      rationale: def.rationale,
      targetIndustries: def.targetIndustries,
      targetRoles: def.targetRoles,
      problemDomains: def.problemDomains,
      laxvishCapabilities: def.laxvishCapabilities,
      ctaText: def.ctaText,
      ctaHref: def.ctaHref,
      confidence,
    };
  });
}
