/**
 * Centralized page content for Laxvish.
 *
 * Voice rules:
 * - Plain English. A non-technical business owner should be able to read it.
 * - We name the architecture (Workers, Brain, Brakes) but always explain it in context.
 * - No "orchestration", "verification", "governance" without a plain-language explanation.
 */

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
    eyebrow: "Workers",
    title: "Your AI team. Hired once, working 24/7.",
    summary:
      "Workers are the AI assistants that actually do the work in your business. Each one is trained on a specific job — like answering customer questions, processing invoices, or qualifying sales leads — and runs the same way every time.",
    problemHeadline: "Most AI tools are too generic to be useful.",
    problemDescription:
      "General-purpose AI drifts outside its scope, gives different answers to the same question, and needs constant supervision. You end up spending more time fixing the AI than benefiting from it.",
    problemPoints: [
      "Generic AI gives different answers to the same question",
      "It drifts outside what you actually wanted it to do",
      "Your team spends more time reviewing AI output than using it",
      "There's no clear ownership of what the AI said or did",
    ],
    solutionHeadline: "AI workers trained on one specific job each.",
    solutionDescription:
      "Each Laxvish Worker is scoped to a specific business function — sales qualification, customer support, document processing, you name it. Because each Worker has a defined job, the behavior is consistent, the output is predictable, and you know exactly what it's responsible for.",
    details: [
      {
        title: "Each Worker has one job",
        description:
          "A Worker for sales qualification doesn't suddenly start answering support tickets. It's scoped, trained, and accountable for one thing.",
      },
      {
        title: "Workers connect into bigger workflows",
        description:
          "When you need a multi-step process, Workers can hand off to each other. One qualifies the lead, another books the meeting, another updates your CRM.",
      },
      {
        title: "You set the rules",
        description:
          "You decide what the Worker can do automatically and what needs your approval. Important decisions always wait for a human.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Pick the job",
        description:
          "Tell us what work you want to automate. We'll help you scope it to a Worker.",
      },
      {
        step: "02",
        title: "Train the Worker",
        description:
          "The Worker learns your business, your tone, and your rules. You review its answers before it goes live.",
      },
      {
        step: "03",
        title: "Put it to work",
        description:
          "The Worker starts handling real work. You see everything it does, and you can change the rules at any time.",
      },
    ],
    useCases: [
      {
        scenario: "Sales qualification",
        description:
          "Reads inbound leads, checks them against your ideal customer, and books meetings on your sales reps' calendars.",
      },
      {
        scenario: "Customer support",
        description:
          "Answers common questions across chat, email, and WhatsApp. Routes complex cases to a human with full context.",
      },
      {
        scenario: "Document processing",
        description:
          "Reads invoices, contracts, and KYC documents. Extracts the data, flags issues, sends the rest for review.",
      },
    ],
    differentiationHeadline: "Why Laxvish Workers are different.",
    differentiationPoints: [
      {
        point: "One job, done well",
        description:
          "Each Worker is scoped to a specific function. No drift, no surprises.",
      },
      {
        point: "Your business, your rules",
        description:
          "Workers learn from your data, your tone, and your policies. They sound like your team.",
      },
      {
        point: "You're always in control",
        description:
          "Every action is logged, every decision is reviewable, every Worker can be paused with one click.",
      },
    ],
    outcomes: [
      {
        metric: "Consistent output",
        value: "Same answer to the same question, every time",
      },
      {
        metric: "Faster turnaround",
        value: "Tasks that took hours now happen in minutes",
      },
      {
        metric: "Full visibility",
        value: "See every action and decision the Worker makes",
      },
    ],
    ctaHeadline: "See Workers in action on your kind of work.",
    ctaDescription:
      "Talk to our team. We'll show you a Worker running on a real workflow from your business.",
    internalLinks: [
      { label: "See how Brain coordinates Workers", href: "/brain" },
      { label: "Learn how Brakes keep Workers safe", href: "/brakes" },
      { label: "See all automations", href: "/solutions" },
    ],
  },
  brain: {
    eyebrow: "Brain",
    title: "The brain that keeps every AI worker on the same page.",
    summary:
      "When you have multiple AI workers, they need to coordinate. Brain is the layer that decides who does what, in what order, with what rules. It also keeps you in the loop on everything happening across your AI team.",
    problemHeadline: "Multiple AI tools create chaos, not progress.",
    problemDescription:
      "Running several AI tools without coordination leads to conflicting answers, duplicated work, and invisible bottlenecks. You don't know what your AI is doing or why.",
    problemPoints: [
      "No single view of what your AI is doing across the business",
      "Workers hand off work to each other in inconsistent ways",
      "Errors cascade silently when one Worker fails",
      "Hard to know which workflows are actually working",
    ],
    solutionHeadline: "One control layer for your whole AI team.",
    solutionDescription:
      "Brain connects your Workers into coordinated workflows. It decides who does what, in what order, and what to do when something unusual happens. You see the whole picture in one place.",
    details: [
      {
        title: "Workflow coordination",
        description:
          "Define the steps, the order, and the decision points. Brain makes sure each step gets done by the right Worker.",
      },
      {
        title: "Smart routing",
        description:
          "When something unusual comes up, Brain routes it to the right place automatically — a different Worker, a human, or a queue for review.",
      },
      {
        title: "One dashboard, full visibility",
        description:
          "See every workflow, every step, every decision. Know what's working and what needs attention.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Map your workflow",
        description:
          "Tell us the steps, the order, and who (or what) should handle each one.",
      },
      {
        step: "02",
        title: "Set the rules",
        description:
          "Decide which steps the AI can do automatically and which need a human in the loop.",
      },
      {
        step: "03",
        title: "Watch it run",
        description:
          "Brain runs the workflow. You see everything, change anything, and scale what works.",
      },
    ],
    useCases: [
      {
        scenario: "Multi-step customer onboarding",
        description:
          "Document verification, account setup, and welcome sequences — coordinated end to end.",
      },
      {
        scenario: "Sales pipeline",
        description:
          "Lead scoring, follow-ups, meeting booking, and CRM updates — without your sales team lifting a finger.",
      },
      {
        scenario: "Cross-team approvals",
        description:
          "Request goes to the right approver, with reminders, escalations, and a full audit trail.",
      },
    ],
    differentiationHeadline: "Why Brain is more than just automation.",
    differentiationPoints: [
      {
        point: "Built for AI, not just apps",
        description:
          "Brain coordinates AI Workers, not just data between tools. It understands AI's strengths and limits.",
      },
      {
        point: "Rules you can change anytime",
        description:
          "No code. Update the routing, the approvals, the fallbacks — in plain language.",
      },
      {
        point: "Plays well with verification",
        description:
          "Every step can be checked by Brakes before moving forward. Quality is built in.",
      },
    ],
    outcomes: [
      {
        metric: "Less manual handoff",
        value: "Workers pass work to each other automatically",
      },
      {
        metric: "Faster throughput",
        value: "Multiple workflows run in parallel, without bottlenecks",
      },
      {
        metric: "Always-on oversight",
        value: "You see what's happening, even when you're not in the room",
      },
    ],
    ctaHeadline: "See how Brain coordinates a real workflow.",
    ctaDescription:
      "Talk to our team. We'll walk you through a workflow from your business, step by step.",
    internalLinks: [
      { label: "See the Workers Brain coordinates", href: "/workers" },
      { label: "Learn how Brakes verify every step", href: "/brakes" },
      { label: "See all automations", href: "/solutions" },
    ],
  },
  brakes: {
    eyebrow: "Brakes",
    title: "Quality checks, compliance, and the audit trail your team needs.",
    summary:
      "Brakes is what makes AI safe to use in your business. It checks the AI's work before it goes live, escalates anything uncertain to a human, and keeps a full log of every decision for compliance and review.",
    problemHeadline: "AI without checks is a liability.",
    problemDescription:
      "Deploying AI without quality controls means errors reach customers, compliance gaps go unnoticed, and your team loses trust in the AI. That kills adoption.",
    problemPoints: [
      "AI output reaches customers without any quality check",
      "No record of what the AI decided or why",
      "Compliance teams can't sign off because there's nothing to review",
      "One bad AI output and your team stops trusting it",
    ],
    solutionHeadline: "Built-in quality checks for every AI decision.",
    solutionDescription:
      "Brakes checks the AI's work before it goes anywhere important. When the AI isn't sure, Brakes routes it to a human. When it's sure, Brakes still logs everything for review. You get the speed of AI with the safety your business needs.",
    details: [
      {
        title: "Check before it goes live",
        description:
          "Every AI output can be checked against your rules before it reaches a customer, a system, or a record.",
      },
      {
        title: "Auto-escalate to humans",
        description:
          "When the AI isn't confident — or the stakes are high — Brakes routes the decision to a human reviewer.",
      },
      {
        title: "Full audit trail",
        description:
          "Every AI decision is logged with the input, the reasoning, and the outcome. Your compliance team can review anything, anytime.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Set your rules",
        description:
          "Tell Brakes what 'good' looks like — and what should always go to a human.",
      },
      {
        step: "02",
        title: "Brakes checks everything",
        description:
          "Every AI output passes through Brakes before it goes anywhere important.",
      },
      {
        step: "03",
        title: "Review and improve",
        description:
          "See what Brakes caught, what it escalated, and where to tighten the rules.",
      },
    ],
    useCases: [
      {
        scenario: "Customer-facing responses",
        description:
          "Every reply the AI sends is checked for accuracy, tone, and policy compliance before it goes out.",
      },
      {
        scenario: "Financial decisions",
        description:
          "Invoices, payments, and approvals are double-checked. Anything unusual is flagged for review.",
      },
      {
        scenario: "Compliance reporting",
        description:
          "Every AI decision is logged and exportable. Your auditors get exactly what they need.",
      },
    ],
    differentiationHeadline: "Why Brakes aren't optional.",
    differentiationPoints: [
      {
        point: "Quality is the default",
        description:
          "Checks are built into the workflow, not something you have to remember to turn on.",
      },
      {
        point: "Humans stay in the loop",
        description:
          "When the AI isn't sure, or the stakes are high, a real person reviews it.",
      },
      {
        point: "Built for DPDP and beyond",
        description:
          "Data minimization, access controls, and audit logs are part of the design — not a bolt-on.",
      },
    ],
    outcomes: [
      {
        metric: "Confident deployment",
        value: "Your team trusts the AI because the checks are visible",
      },
      {
        metric: "Clean audit trail",
        value: "Every decision is logged and ready for review",
      },
      {
        metric: "Fewer errors",
        value: "Most issues are caught before they reach the customer",
      },
    ],
    ctaHeadline: "See Brakes in action on a real workflow.",
    ctaDescription:
      "Talk to our team. We'll show you how Brakes keeps AI safe in a business like yours.",
    internalLinks: [
      { label: "See the Workers Brakes verifies", href: "/workers" },
      { label: "Learn how Brain uses Brakes", href: "/brain" },
      { label: "See all automations", href: "/solutions" },
    ],
  },
  solutions: {
    eyebrow: "What we automate",
    title: "Pick the work you want to take off your team's plate.",
    summary:
      "Laxvish builds AI workers for the work your business does every day — sales, support, operations, finance, IT, and more. Each one is scoped, trained, and ready to go.",
    problemHeadline: "The repetitive work is slowing your team down.",
    problemDescription:
      "Your best people spend half their week on tasks that could be done by AI — if the AI was set up properly. Most AI tools are too generic. Laxvish builds AI workers trained on your business.",
    problemPoints: [
      "Repetitive work takes time your team could spend on real projects",
      "Generic AI tools give inconsistent answers and need constant supervision",
      "Building AI in-house takes months and a team you don't have",
      "Off-the-shelf tools don't fit how your business actually works",
    ],
    solutionHeadline: "AI workers trained on your kind of work.",
    solutionDescription:
      "Pick what you want to automate. We build an AI worker trained on your business, your tone, your rules. You stay in control. The work gets done.",
    details: [
      {
        title: "Pick from 13 ready-to-go automations",
        description:
          "Sales, support, document processing, finance, IT, and more. Each one is a proven AI worker you can deploy in weeks.",
      },
      {
        title: "We build it for you",
        description:
          "No AI team required. We handle the setup, the training, the integration, and the ongoing tuning.",
      },
      {
        title: "You stay in control",
        description:
          "Every AI decision is reviewable. Every action can be paused. Every rule is yours to change.",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Pick the work",
        description:
          "Choose the area you want to automate. We help you scope it into a concrete AI worker.",
      },
      {
        step: "02",
        title: "We build and train it",
        description:
          "The AI worker learns your business, your tone, your rules. You see it working before it goes live.",
      },
      {
        step: "03",
        title: "Run it, refine it, scale it",
        description:
          "The AI worker takes over the work. You see everything, refine the rules, and scale what works.",
      },
    ],
    useCases: [
      {
        scenario: "Sales & Growth",
        description:
          "AI for lead qualification, follow-ups, marketing ops, and executive reporting.",
      },
      {
        scenario: "Customer Operations",
        description:
          "AI for customer support, voice & WhatsApp, and customer operations.",
      },
      {
        scenario: "Internal Operations",
        description:
          "AI for internal knowledge, HR, and IT helpdesk.",
      },
      {
        scenario: "Finance & Compliance",
        description:
          "AI for document processing, finance/AP, contracts, procurement, and reporting.",
      },
    ],
    differentiationHeadline: "Why teams pick Laxvish over generic AI.",
    differentiationPoints: [
      {
        point: "Trained on your business",
        description:
          "Not a generic chatbot. A worker that knows your products, your tone, and your rules.",
      },
      {
        point: "Built to be safe",
        description:
          "Every action is checked. Every decision is logged. Built for DPDP from day one.",
      },
      {
        point: "You stay in control",
        description:
          "See everything. Change anything. Pause everything with one click.",
      },
    ],
    outcomes: [
      {
        metric: "Hours back every week",
        value: "Your team focuses on the work that needs them",
      },
      {
        metric: "Faster response times",
        value: "Customers and leads get answers in minutes, not days",
      },
      {
        metric: "Fewer errors",
        value: "Built-in quality checks catch issues before they become problems",
      },
    ],
    ctaHeadline: "See what Laxvish can automate for you.",
    ctaDescription:
      "Talk to our team. We'll show you a real walkthrough on your kind of work — 15 minutes, no pitch deck.",
    internalLinks: [
      { label: "See the Workers powering every automation", href: "/workers" },
      { label: "Learn how Brain coordinates the work", href: "/brain" },
      { label: "See how Brakes keep everything safe", href: "/brakes" },
    ],
  },
  "security-trust": {
    eyebrow: "Security & Trust",
    title: "Built for Indian enterprises. DPDP-ready from day one.",
    summary:
      "Laxvish is designed for the way Indian enterprises need to handle data — with clear controls, full audit trails, and the option to keep everything in India.",
    details: [
      {
        title: "DPDP-aligned by design",
        description:
          "Data minimization, purpose limitation, and clear consent flows. Built into the platform, not bolted on.",
      },
      {
        title: "Data residency in India",
        description:
          "Deploy in an Indian cloud region (Mumbai, Hyderabad). Your data stays in India unless you say otherwise.",
      },
      {
        title: "Full audit trail",
        description:
          "Every AI decision is logged with the input, the reasoning, and the outcome. Your compliance team can review anything, anytime.",
      },
    ],
    outcomes: [
      {
        metric: "Procurement-ready",
        value: "The security posture your CISO needs to sign off",
      },
      {
        metric: "Compliance-friendly",
        value: "Audit logs and access controls built in from day one",
      },
      {
        metric: "Always recoverable",
        value: "Backups, disaster recovery, and incident response plans in place",
      },
    ],
  },
  about: {
    eyebrow: "About Laxvish",
    title: "We build AI workers for Indian businesses.",
    summary:
      "Laxvish is a team building AI that does the work — safely, predictably, and in a way your business can actually use. We started because most AI tools are too generic, and most enterprises need something that fits how they actually work.",
    details: [
      {
        title: "What we believe",
        description:
          "AI should do the work, not just demo well. Your business has rules, and the AI should follow them.",
      },
      {
        title: "How we work",
        description:
          "We build with our customers, not for them. Every product decision starts with a real workflow from a real business.",
      },
      {
        title: "What we're building toward",
        description:
          "A world where every Indian business — from a 5-person startup to a 5,000-person enterprise — has AI workers that handle the repetitive work, so their people can focus on the work that matters.",
      },
    ],
    outcomes: [
      {
        metric: "Customer-driven",
        value: "Built from real workflows, not from hype",
      },
      {
        metric: "Outcomes-first",
        value: "We measure success by what the AI actually delivers",
      },
      {
        metric: "Plain-spoken",
        value: "No jargon. No buzzwords. Just AI that works.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your work.",
    summary:
      "Tell us what you want to automate. We'll show you how a Laxvish AI worker can take it off your team's plate — and what it would take to get there.",
    details: [
      {
        title: "How it usually goes",
        description:
          "1) A 15-minute call to understand your work. 2) A scoped pilot with clear success criteria. 3) A path to scale if it works.",
      },
      {
        title: "What to expect on the call",
        description:
          "No pitch deck. We'll ask about your work, show you what's possible, and tell you honestly if we're a fit.",
      },
      {
        title: "What we need from you",
        description:
          "Your name, your work email, your company, and a short note about what you want to automate. That's it.",
      },
    ],
    outcomes: [
      {
        metric: "Clarity",
        value: "You'll know within 15 minutes if Laxvish is a fit",
      },
      {
        metric: "A real next step",
        value: "Either a scoped pilot or an honest 'not yet'",
      },
      {
        metric: "No pressure",
        value: "Take the time you need. We'll follow up when you're ready.",
      },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Build AI workers that real businesses use.",
    summary:
      "Join a small team building AI that actually does the work — for real businesses, in real industries, with real consequences. We hire for ownership, curiosity, and care for the work.",
    details: [
      {
        title: "What you'd work on",
        description:
          "Product surfaces used for enterprise discovery, AI workers running in production, the platform that keeps everything safe.",
      },
      {
        title: "How we work",
        description:
          "Small team. Big ownership. Fast feedback. Real customers. We don't do AI hype — we ship things people use.",
      },
      {
        title: "What we look for",
        description:
          "Ownership of your work, curiosity about how things work, and care for the people who use what you build.",
      },
    ],
    outcomes: [
      {
        metric: "Real impact",
        value: "Your work ships to real customers, fast",
      },
      {
        metric: "Direct mentorship",
        value: "Work closely with the founders and the team",
      },
      {
        metric: "Steep growth",
        value: "Learn across product, AI, and engineering — not just one slice",
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "We collect only what we need, and we tell you why.",
    summary:
      "Laxvish is built for the way Indian enterprises handle data — with clear intent, minimal collection, and full transparency.",
    details: [
      {
        title: "What we collect",
        description:
          "Only the business contact details you give us (name, work email, company, what you want to automate).",
      },
      {
        title: "What we use it for",
        description:
          "To evaluate and respond to your request. Nothing else, unless you tell us otherwise.",
      },
      {
        title: "How long we keep it",
        description:
          "Only as long as needed for the conversation, or as required by law. You can ask us to delete it anytime.",
      },
    ],
    outcomes: [
      {
        metric: "Transparency",
        value: "You always know what we have and why",
      },
      {
        metric: "Minimal by default",
        value: "We don't collect data we don't need",
      },
      {
        metric: "Your control",
        value: "Ask us to update or delete your data anytime",
      },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "The simple rules for using this website.",
    summary:
      "These terms cover the Laxvish website. For commercial terms (pricing, SLAs, contracts), those are negotiated separately — never assume anything from a marketing page.",
    details: [
      {
        title: "Use of the website",
        description:
          "For business evaluation and information. Don't scrape it, mirror it, or use it to train someone else's AI.",
      },
      {
        title: "Service discussions",
        description:
          "Pricing, scope, and timelines are agreed in writing, not implied by anything on this site.",
      },
      {
        title: "Our responsibility",
        description:
          "We're careful with what we publish, but operational commitments live in signed contracts, not marketing pages.",
      },
    ],
    outcomes: [
      {
        metric: "Clarity",
        value: "You know what's a marketing claim vs. a commitment",
      },
      {
        metric: "Fairness",
        value: "The same rules apply to everyone",
      },
      {
        metric: "A real conversation",
        value: "When you're ready, we'll talk terms properly",
      },
    ],
  },
};
