export interface DetailItem {
  title: string;
  description: string;
}

export interface OutcomeItem {
  metric: string;
  value: string;
}

export interface DepthPageContent {
  eyebrow: string;
  title: string;
  summary: string;
  details: DetailItem[];
  outcomes: OutcomeItem[];
}

export const PAGE_CONTENT: Record<string, DepthPageContent> = {
  solutions: {
    eyebrow: "Enterprise Solutions",
    title: "Deploy AI programs with measurable business impact.",
    summary:
      "Laxvish aligns AI adoption with process outcomes, not disconnected experiments.",
    details: [
      {
        title: "Revenue workflows",
        description:
          "AI workers handle qualification, follow-up intelligence, and conversion prep.",
      },
      {
        title: "Operations workflows",
        description:
          "Automate repetitive operations while preserving approval checkpoints.",
      },
      {
        title: "Risk-aware scaling",
        description:
          "Orchestration and verification remain active as adoption grows.",
      },
    ],
    outcomes: [
      { metric: "Cycle time", value: "Reduced via orchestration pipelines" },
      { metric: "Adoption", value: "Higher trust with verification-first controls" },
      { metric: "Visibility", value: "Centralized insight across AI workflows" },
    ],
  },
  workers: {
    eyebrow: "AI Agents",
    title: "Specialized workers built for domain execution.",
    summary:
      "Workers are role-focused AI units designed for repeatable, production-grade tasks.",
    details: [
      {
        title: "Role-specialized design",
        description:
          "Each worker is scoped to a business function for predictable behavior.",
      },
      {
        title: "Composable activation",
        description:
          "Workers can be combined into larger operational pipelines through Brain.",
      },
      {
        title: "Operational controls",
        description:
          "Critical decisions can be gated before final actions are executed.",
      },
    ],
    outcomes: [
      { metric: "Consistency", value: "Stable output across recurring tasks" },
      { metric: "Coverage", value: "Cross-function worker portfolios" },
      { metric: "Speed", value: "Faster handoff between AI and teams" },
    ],
  },
  brain: {
    eyebrow: "AI Orchestration",
    title: "Coordinate workers with centralized intelligence.",
    summary:
      "Brain routes decisions, sequences tasks, and governs flow between workers and humans.",
    details: [
      {
        title: "Flow orchestration",
        description:
          "Define workflow pathways and escalation branches in one control layer.",
      },
      {
        title: "Policy-aware routing",
        description:
          "Actions are routed based on business rules, risk profile, and confidence.",
      },
      {
        title: "Observability built-in",
        description:
          "Track bottlenecks, retries, and completion behavior for each workflow.",
      },
    ],
    outcomes: [
      { metric: "Governance", value: "Unified controls across multi-agent chains" },
      { metric: "Throughput", value: "Parallelized execution with fewer bottlenecks" },
      { metric: "Reliability", value: "Structured fallbacks with human checkpoints" },
    ],
  },
  brakes: {
    eyebrow: "AI Verification",
    title: "Ship AI with brakes, not blind trust.",
    summary:
      "Brakes enforce verification, confidence checks, and policy controls before execution.",
    details: [
      {
        title: "Pre-action verification",
        description:
          "Validate AI outputs before they touch customer-facing or regulated systems.",
      },
      {
        title: "Risk-triggered controls",
        description:
          "Escalate uncertain outcomes to human review when thresholds are crossed.",
      },
      {
        title: "Audit-grade traces",
        description:
          "Preserve explainable execution paths for governance and compliance reviews.",
      },
    ],
    outcomes: [
      { metric: "Trust", value: "Confidence in production AI behavior" },
      { metric: "Compliance", value: "Verification-first discipline by default" },
      { metric: "Quality", value: "Lower error propagation into business systems" },
    ],
  },
  "security-trust": {
    eyebrow: "Security & Trust",
    title: "DPDP-first controls for enterprise confidence.",
    summary:
      "Security posture is integrated into execution design, not bolted on later.",
    details: [
      {
        title: "Data minimization",
        description:
          "Collect only workflow-critical data and reduce unnecessary exposure.",
      },
      {
        title: "Boundary controls",
        description:
          "Protect sensitive process segments with explicit policy constraints.",
      },
      {
        title: "Operational hygiene",
        description:
          "Apply secure defaults, transparent logging, and controlled access paths.",
      },
    ],
    outcomes: [
      { metric: "Readiness", value: "Enterprise procurement confidence" },
      { metric: "Control", value: "Traceable trust posture across workflows" },
      { metric: "Resilience", value: "Safer AI operations under change" },
    ],
  },
  about: {
    eyebrow: "About Laxvish",
    title: "We build the operating layer for enterprise AI execution.",
    summary:
      "Laxvish helps teams move from AI experimentation to reliable operational systems.",
    details: [
      {
        title: "Mission",
        description:
          "Enable enterprises to deploy AI workflows with speed, trust, and measurable outcomes.",
      },
      {
        title: "Philosophy",
        description:
          "Workers do the work, Brain coordinates intelligence, Brakes protect quality.",
      },
      {
        title: "Operating principle",
        description:
          "Execution quality matters more than demo quality in enterprise AI.",
      },
    ],
    outcomes: [
      { metric: "Focus", value: "Execution-first product strategy" },
      { metric: "Value", value: "Outcome-oriented product decisions" },
      { metric: "Clarity", value: "Simple narrative for complex AI systems" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Partner with Laxvish on enterprise AI delivery.",
    summary:
      "Share your workflow goals and we will propose a practical path to production.",
    details: [
      {
        title: "Discovery",
        description:
          "Map high-value workflows where AI can improve speed and consistency.",
      },
      {
        title: "Pilot",
        description:
          "Deploy a bounded pilot with measurable success criteria and controls.",
      },
      {
        title: "Scale",
        description:
          "Expand through orchestration and verification standards that hold under growth.",
      },
    ],
    outcomes: [
      { metric: "Clarity", value: "Aligned roadmap from first conversation" },
      { metric: "Speed", value: "Faster pilot-to-production path" },
      { metric: "Control", value: "Governance included from day one" },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy by design for website and workflow interactions.",
    summary:
      "We prioritize minimal collection and responsible handling of submitted information.",
    details: [
      {
        title: "Data collection",
        description:
          "Only required business contact details are collected for lead responses.",
      },
      {
        title: "Purpose limitation",
        description:
          "Information is used to evaluate and respond to partnership or demo requests.",
      },
      {
        title: "Retention posture",
        description:
          "Data handling is aligned to operational need and legal obligations.",
      },
    ],
    outcomes: [
      { metric: "Transparency", value: "Clear intent for collected data" },
      { metric: "Scope", value: "No unnecessary PII by default" },
      { metric: "Trust", value: "Predictable privacy behavior" },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Guidelines for use of Laxvish website resources.",
    summary:
      "These terms govern informational use, communication requests, and service discussions.",
    details: [
      {
        title: "Use of content",
        description:
          "Website materials are for business evaluation and informational purposes.",
      },
      {
        title: "Service discussions",
        description:
          "Commercial terms and implementation scope are finalized in signed agreements.",
      },
      {
        title: "Liability boundaries",
        description:
          "Operational commitments are governed by formal contracts, not marketing pages.",
      },
    ],
    outcomes: [
      { metric: "Clarity", value: "Clear expectation-setting for evaluation" },
      { metric: "Fairness", value: "Defined boundaries for website usage" },
      { metric: "Readiness", value: "Smooth transition into formal engagements" },
    ],
  },
};
