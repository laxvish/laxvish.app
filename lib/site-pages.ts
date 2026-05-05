export interface DetailItem {
  title: string;
  description: string;
}

export interface OutcomeItem {
  metric: string;
  value: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export interface UseCaseItem {
  scenario: string;
  description: string;
}

export interface DiffItem {
  point: string;
  description: string;
}

export interface InternalLink {
  label: string;
  href: string;
}

export interface DepthPageContent {
  eyebrow: string;
  title: string;
  summary: string;
  details: DetailItem[];
  outcomes: OutcomeItem[];
  // Extended content sections
  problemHeadline?: string;
  problemDescription?: string;
  problemPoints?: string[];
  solutionHeadline?: string;
  solutionDescription?: string;
  howItWorks?: StepItem[];
  useCases?: UseCaseItem[];
  differentiationHeadline?: string;
  differentiationPoints?: DiffItem[];
  ctaHeadline?: string;
  ctaDescription?: string;
  internalLinks?: InternalLink[];
}

export const PAGE_CONTENT: Record<string, DepthPageContent> = {
  workers: {
    eyebrow: "Enterprise AI Agents",
    title: "Enterprise AI agents built for domain execution.",
    summary:
      "Deploy enterprise AI agents scoped to specific business functions. Each worker handles repeatable, production-grade tasks with predictable behavior and measurable output.",
    problemHeadline: "General-purpose AI fails in production.",
    problemDescription:
      "Most AI tools are built for exploration, not execution. Teams deploy generic models that lack business context, produce inconsistent output, and require constant oversight.",
    problemPoints: [
      "Generic AI models drift outside their intended scope.",
      "No clear ownership of task output or error accountability.",
      "Teams spend more time fixing AI output than benefiting from it.",
    ],
    solutionHeadline: "Domain AI agents designed for real operations.",
    solutionDescription:
      "Laxvish Workers are role-specialized AI agents for operations. Each agent is scoped to a specific business function — from lead qualification to compliance review — delivering stable, repeatable results without scope drift.",
    details: [
      {
        title: "Role-specialized design",
        description:
          "Each enterprise AI agent is scoped to a defined business function for predictable, consistent behavior across every execution.",
      },
      {
        title: "Composable activation",
        description:
          "Domain AI agents combine into larger operational pipelines through Brain, enabling multi-step workflows without custom integration.",
      },
      {
        title: "Operational controls",
        description:
          "Critical decisions are gated before final actions execute, keeping AI agents for operations under human oversight where it matters.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Define the role",
        description: "Scope the worker to a specific business function with clear input-output boundaries.",
      },
      {
        step: "02",
        title: "Configure behavior",
        description: "Set policies, decision thresholds, and escalation rules for the domain AI agent.",
      },
      {
        step: "03",
        title: "Deploy to production",
        description: "Activate the worker within your existing workflow with verification controls enabled.",
      },
    ],
    useCases: [
      {
        scenario: "Sales qualification",
        description: "AI agents evaluate inbound leads against your ICP criteria, scoring and routing qualified prospects to your sales team.",
      },
      {
        scenario: "Operations processing",
        description: "Domain AI agents handle document review, data extraction, and compliance checks for recurring operational tasks.",
      },
      {
        scenario: "Customer support triage",
        description: "AI agents for operations classify incoming requests, draft responses, and escalate complex issues to human agents.",
      },
    ],
    differentiationHeadline: "Why Laxvish Workers outperform generic AI tools.",
    differentiationPoints: [
      {
        point: "Execution over experimentation",
        description: "Workers are built for production stability, not demo scenarios.",
      },
      {
        point: "Scoped accountability",
        description: "Every worker has defined boundaries, making failures traceable and fixable.",
      },
      {
        point: "Verification built in",
        description: "Brakes enforce quality checks before any worker output reaches downstream systems.",
      },
    ],
    outcomes: [
      { metric: "Consistency", value: "Stable output across recurring tasks" },
      { metric: "Coverage", value: "Cross-function worker portfolios" },
      { metric: "Speed", value: "Faster handoff between AI and teams" },
    ],
    ctaHeadline: "Deploy AI agents that actually execute.",
    ctaDescription:
      "Move from AI experiments to real operations. Book a demo to see enterprise AI agents running production workflows.",
    internalLinks: [
      { label: "See how Brain orchestrates workers", href: "/brain" },
      { label: "Learn how Brakes verify worker output", href: "/brakes" },
      { label: "Explore enterprise solutions", href: "/solutions" },
    ],
  },
  brain: {
    eyebrow: "AI Orchestration Platform",
    title: "Coordinate AI agents with centralized intelligence.",
    summary:
      "The Laxvish AI orchestration platform routes decisions, sequences tasks, and governs workflow execution between workers and human teams — all from one control layer.",
    problemHeadline: "Disconnected AI tools create operational chaos.",
    problemDescription:
      "Running multiple AI tools without coordination leads to conflicting outputs, duplicated effort, and invisible bottlenecks. Teams lose visibility into what AI is doing and why.",
    problemPoints: [
      "No unified view of AI activity across business functions.",
      "Manual handoffs between AI steps slow down critical workflows.",
      "Errors cascade silently through uncoordinated AI chains.",
    ],
    solutionHeadline: "Workflow orchestration AI that brings order to execution.",
    solutionDescription:
      "Brain is the AI coordination system that connects Workers into governed pipelines. It routes tasks based on business rules, manages dependencies, and ensures every workflow step completes with oversight.",
    details: [
      {
        title: "Flow orchestration",
        description:
          "Define workflow pathways, branching logic, and escalation rules in one AI orchestration platform.",
      },
      {
        title: "Policy-aware routing",
        description:
          "Actions route based on business rules, risk profile, and confidence — part of a workflow orchestration AI that respects operational boundaries.",
      },
      {
        title: "Observability built in",
        description:
          "Track bottlenecks, retries, and completion behavior for each workflow through the AI coordination system dashboard.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Map your workflow",
        description: "Define the sequence of worker tasks, decision points, and human checkpoints.",
      },
      {
        step: "02",
        title: "Set routing policies",
        description: "Configure rules for task assignment, escalation triggers, and fallback behavior.",
      },
      {
        step: "03",
        title: "Monitor and optimize",
        description: "Track execution in real time, identify bottlenecks, and adjust orchestration logic.",
      },
    ],
    useCases: [
      {
        scenario: "Multi-step onboarding",
        description: "Orchestrate document verification, account setup, and welcome sequences across multiple workers.",
      },
      {
        scenario: "Revenue pipeline management",
        description: "Coordinate lead scoring, outreach scheduling, and follow-up intelligence through a unified workflow.",
      },
      {
        scenario: "Cross-department approvals",
        description: "Route approval requests through the right stakeholders with automated reminders and escalation paths.",
      },
    ],
    differentiationHeadline: "Why Brain is different from workflow automation tools.",
    differentiationPoints: [
      {
        point: "AI-native coordination",
        description: "Built specifically for orchestrating AI agents, not just moving data between apps.",
      },
      {
        point: "Policy-first design",
        description: "Business rules govern every routing decision, not just simple if-then logic.",
      },
      {
        point: "Unified with verification",
        description: "Every orchestrated step can be verified by Brakes before proceeding.",
      },
    ],
    outcomes: [
      { metric: "Governance", value: "Unified controls across multi-agent chains" },
      { metric: "Throughput", value: "Parallelized execution with fewer bottlenecks" },
      { metric: "Reliability", value: "Structured fallbacks with human checkpoints" },
    ],
    ctaHeadline: "Bring coordination to your AI operations.",
    ctaDescription:
      "Control how AI executes in production. Book a demo to see the AI orchestration platform managing real enterprise workflows.",
    internalLinks: [
      { label: "See the Workers that Brain coordinates", href: "/workers" },
      { label: "Learn how Brakes verify orchestrated flows", href: "/brakes" },
      { label: "Explore CallMe voice automation", href: "/callme" },
    ],
  },
  brakes: {
    eyebrow: "AI Governance and Verification",
    title: "Ship AI with verification, not blind trust.",
    summary:
      "Brakes enforce AI governance and verification controls before any AI output reaches production. Confidence checks, policy enforcement, and audit-grade traces — built into every execution.",
    problemHeadline: "Unverified AI creates enterprise risk.",
    problemDescription:
      "Deploying AI without verification controls is a liability. Errors reach customers, compliance gaps go unnoticed, and teams lose confidence in AI-driven decisions.",
    problemPoints: [
      "AI outputs reach customer-facing systems without quality checks.",
      "No audit trail for AI-driven decisions in regulated workflows.",
      "Teams reject AI adoption because they cannot trust the output.",
    ],
    solutionHeadline: "An AI validation system that protects every decision.",
    solutionDescription:
      "Brakes is the AI compliance tools layer that validates outputs before execution, escalates uncertain results to human review, and preserves explainable audit trails for governance requirements.",
    details: [
      {
        title: "Pre-action verification",
        description:
          "Validate AI outputs before they touch customer-facing or regulated systems through built-in AI governance and verification checks.",
      },
      {
        title: "Risk-triggered controls",
        description:
          "Escalate uncertain outcomes to human review when confidence thresholds are crossed — a core feature of the AI validation system.",
      },
      {
        title: "Audit-grade traces",
        description:
          "Preserve explainable execution paths for governance and compliance reviews with AI compliance tools that meet enterprise standards.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Set verification rules",
        description: "Define confidence thresholds, policy constraints, and escalation criteria for each workflow.",
      },
      {
        step: "02",
        title: "Verify before execution",
        description: "Every AI output passes through Brakes validation before reaching downstream systems.",
      },
      {
        step: "03",
        title: "Audit and improve",
        description: "Review verification logs, identify patterns, and refine rules based on real execution data.",
      },
    ],
    useCases: [
      {
        scenario: "Regulated industries",
        description: "Enforce compliance checks on AI-generated reports, recommendations, and customer communications.",
      },
      {
        scenario: "Financial operations",
        description: "Verify AI-driven pricing decisions, risk assessments, and transaction approvals before execution.",
      },
      {
        scenario: "Content and communications",
        description: "Review AI-generated content for brand consistency, accuracy, and policy compliance before publication.",
      },
    ],
    differentiationHeadline: "Why Brakes are essential for enterprise AI.",
    differentiationPoints: [
      {
        point: "Verification-first discipline",
        description: "Quality checks are mandatory, not optional — built into the execution pipeline.",
      },
      {
        point: "Human-in-the-loop by design",
        description: "Escalation paths ensure humans review high-risk or low-confidence outputs.",
      },
      {
        point: "Compliance-ready from day one",
        description: "Audit trails and explainable execution paths satisfy regulatory requirements.",
      },
    ],
    outcomes: [
      { metric: "Trust", value: "Confidence in production AI behavior" },
      { metric: "Compliance", value: "Verification-first discipline by default" },
      { metric: "Quality", value: "Lower error propagation into business systems" },
    ],
    ctaHeadline: "Deploy AI with confidence.",
    ctaDescription:
      "Stop choosing between speed and safety. Book a demo to see AI governance and verification protecting real enterprise workflows.",
    internalLinks: [
      { label: "See the Workers that Brakes verify", href: "/workers" },
      { label: "Learn how Brain orchestrates verified flows", href: "/brain" },
      { label: "Explore enterprise solutions", href: "/solutions" },
    ],
  },
  solutions: {
    eyebrow: "AI Workflow Automation",
    title: "Deploy AI workflow automation with measurable business impact.",
    summary:
      "Laxvish aligns AI workflow automation with real process outcomes. Move from disconnected experiments to enterprise automation AI that delivers results across revenue, operations, and compliance.",
    problemHeadline: "AI experiments do not become business outcomes.",
    problemDescription:
      "Most enterprise AI initiatives stall after the proof-of-concept phase. Teams build demos that impress stakeholders but fail to deliver sustained operational value.",
    problemPoints: [
      "Pilot programs that never scale beyond a single use case.",
      "No clear path from AI experiment to production workflow system.",
      "Teams measure AI activity instead of business outcomes.",
    ],
    solutionHeadline: "An AI workflow system built for production results.",
    solutionDescription:
      "Laxvish combines Workers, Brain, and Brakes into one enterprise automation AI platform. Each component is designed to move AI from experiment to execution with governance and measurability built in.",
    details: [
      {
        title: "Revenue workflows",
        description:
          "AI workflow automation handles lead qualification, follow-up intelligence, and conversion preparation across your sales pipeline.",
      },
      {
        title: "Operations workflows",
        description:
          "Automate repetitive operational processes while preserving approval checkpoints through enterprise automation AI.",
      },
      {
        title: "Risk-aware scaling",
        description:
          "The AI workflow system maintains orchestration and verification controls as adoption grows across teams and departments.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Map high-value workflows",
        description: "Identify processes where AI automation delivers the highest operational leverage.",
      },
      {
        step: "02",
        title: "Deploy Workers with controls",
        description: "Activate AI agents within verified workflows using Brain orchestration and Brakes governance.",
      },
      {
        step: "03",
        title: "Measure and scale",
        description: "Track outcomes, optimize workflows, and expand AI automation across the organization.",
      },
    ],
    useCases: [
      {
        scenario: "Sales acceleration",
        description: "Automate lead scoring, prospect research, and outreach sequencing to reduce sales cycle time.",
      },
      {
        scenario: "Operations efficiency",
        description: "Streamline document processing, data reconciliation, and approval workflows with AI agents.",
      },
      {
        scenario: "Customer experience",
        description: "Deploy AI-powered voice agents, support triage, and proactive engagement across customer touchpoints.",
      },
    ],
    differentiationHeadline: "Why Laxvish delivers where other AI platforms stall.",
    differentiationPoints: [
      {
        point: "Execution, not experimentation",
        description: "Every feature is designed for production use, not demo environments.",
      },
      {
        point: "Three layers, one system",
        description: "Workers execute, Brain coordinates, Brakes verify — integrated, not bolted on.",
      },
      {
        point: "Outcome-oriented design",
        description: "Measure business impact, not AI activity metrics.",
      },
    ],
    outcomes: [
      { metric: "Cycle time", value: "Reduced via orchestration pipelines" },
      { metric: "Adoption", value: "Higher trust with verification-first controls" },
      { metric: "Visibility", value: "Centralized insight across AI workflows" },
    ],
    ctaHeadline: "Move from AI experiments to real operations.",
    ctaDescription:
      "See how AI workflow automation drives measurable results. Book a demo to explore enterprise solutions built for production.",
    internalLinks: [
      { label: "Explore Workers for domain execution", href: "/workers" },
      { label: "See Brain orchestration in action", href: "/brain" },
      { label: "Deploy CallMe voice agents", href: "/callme" },
    ],
  },
  callme: {
    eyebrow: "Enterprise AI Voice Agent",
    title: "Enterprise AI voice agents for real conversations.",
    summary:
      "Deploy an enterprise AI voice agent that handles calls with natural conversation flow, compliance-grade controls, and seamless integration into your existing workflows. AI voice automation built for production.",
    problemHeadline: "Voice support does not scale without AI.",
    problemDescription:
      "Scaling human call teams is expensive and inconsistent. Customers wait on hold, agents burn out, and quality varies across every interaction.",
    problemPoints: [
      "Rising costs to maintain 24/7 voice support coverage.",
      "Inconsistent call quality across agents, shifts, and locations.",
      "No structured data capture from voice conversations for downstream analysis.",
    ],
    solutionHeadline: "A conversational AI system built for enterprise voice.",
    solutionDescription:
      "CallMe is an enterprise AI voice agent with real-time speech recognition, policy enforcement, and workflow integration. It handles routine calls with human-like fluency while routing complex requests to your team.",
    details: [
      {
        title: "Realtime voice",
        description:
          "Natural speech recognition and generation for fluid, human-like conversations — the core of this enterprise AI voice agent.",
      },
      {
        title: "Enterprise controls",
        description:
          "Call recording, compliance logging, escalation paths, and policy enforcement built into every AI voice automation conversation.",
      },
      {
        title: "Workflow integration",
        description:
          "Trigger actions, update records, and hand off to human agents seamlessly through the conversational AI system.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Configure voice flows",
        description: "Define conversation scripts, escalation triggers, and compliance rules for your use case.",
      },
      {
        step: "02",
        title: "Deploy the voice agent",
        description: "Activate the enterprise AI voice agent on your phone lines with CRM and workflow integration.",
      },
      {
        step: "03",
        title: "Monitor and optimize",
        description: "Review call logs, measure resolution rates, and refine conversation flows based on real data.",
      },
    ],
    useCases: [
      {
        scenario: "Inbound support",
        description: "Handle routine inquiries, troubleshoot common issues, and route complex cases to human agents.",
      },
      {
        scenario: "Outbound engagement",
        description: "Conduct follow-up calls, appointment confirmations, and satisfaction surveys at scale.",
      },
      {
        scenario: "Lead qualification",
        description: "Screen inbound calls, capture prospect details, and route qualified leads to sales teams.",
      },
    ],
    differentiationHeadline: "Why CallMe outperforms basic IVR and chatbots.",
    differentiationPoints: [
      {
        point: "Natural conversation, not menus",
        description: "Callers speak naturally instead of pressing buttons or repeating commands.",
      },
      {
        point: "Enterprise compliance built in",
        description: "Recording, logging, and policy enforcement are default, not afterthoughts.",
      },
      {
        point: "Part of the Laxvish system",
        description: "CallMe connects to Workers and Brain for end-to-end workflow execution.",
      },
    ],
    outcomes: [
      { metric: "Availability", value: "24/7 voice support without scaling human teams" },
      { metric: "Consistency", value: "Uniform call quality and compliance across every conversation" },
      { metric: "Efficiency", value: "Reduced handle time with AI-powered conversation flows" },
    ],
    ctaHeadline: "Put an AI voice agent on your front line.",
    ctaDescription:
      "See how enterprise AI voice agents handle real calls. Book a demo to hear CallMe in action.",
    internalLinks: [
      { label: "Explore Workers powering CallMe", href: "/workers" },
      { label: "See how Brain orchestrates voice workflows", href: "/brain" },
      { label: "Explore enterprise solutions", href: "/solutions" },
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
  careers: {
    eyebrow: "Careers",
    title: "Build enterprise AI systems with Laxvish.",
    summary:
      "Apply for internship or full-time roles and help teams ship trustworthy AI workers, orchestration, and verification controls.",
    details: [
      {
        title: "Product-first work",
        description:
          "Contribute to real website and product surfaces used for enterprise discovery and delivery.",
      },
      {
        title: "AI execution mindset",
        description:
          "Work on practical outcomes where reliability, speed, and governance matter together.",
      },
      {
        title: "Ownership and learning",
        description:
          "Take ownership of scoped problems, collaborate closely, and grow through fast feedback loops.",
      },
    ],
    outcomes: [
      { metric: "Impact", value: "Hands-on contribution to production-ready AI experiences" },
      { metric: "Mentorship", value: "Direct collaboration with product and engineering leads" },
      { metric: "Growth", value: "Continuous learning across frontend, AI UX, and systems thinking" },
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
