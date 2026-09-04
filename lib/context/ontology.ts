import type { 
  BehaviorModel, 
  DirectInputModel, 
  EnvironmentModel, 
  ProblemHypothesis, 
  SolutionCandidate, 
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
 * Deterministic multi-signal problem hypothesis scorer
 * Priority weights: Direct Input (1.0) > Repeated Behavior (0.85) > Topic Dwell (0.75) > Env (0.55) > Temporal (0.30) > Technical (0.15)
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

    // Bound confidence between 0.0 and 0.98
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

  // Sort descending by confidence
  scoredList.sort((a, b) => b.confidence - a.confidence);

  const topHypothesis = scoredList[0];
  const matchedProbDef = LAXVISH_PROBLEM_TAXONOMY.find((p) => p.key === topHypothesis?.problemKey);
  const topSolution = matchedProbDef?.recommendedSolution;

  return {
    hypotheses: scoredList,
    topSolution,
  };
}
