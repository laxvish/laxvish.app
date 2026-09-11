"use client";

import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/ui/FadeIn";

interface AgentCardItem {
  id: string;
  name: string;
  category: string;
  problem: string;
  execution: string;
  href: string;
  action: string;
}

const AGENTS: AgentCardItem[] = [
  {
    id: "AGENT 01",
    name: "CallMe — Voice AI Agent",
    category: "Voice AI & Telephony",
    problem:
      "Inbound callers wait on hold, while manual outbound follow-up calls are slow and inconsistent.",
    execution:
      "Conducts natural voice conversations in real time, qualifies intent, follows strict operational playbooks, and hands off to human staff with call logs.",
    href: "/callme",
    action: "Explore CallMe",
  },
  {
    id: "AGENT 02",
    name: "Sales & Lead Qualification Agent",
    category: "Sales & Growth",
    problem:
      "Inbound leads go cold from slow response times; sales reps waste hours on unqualified inquiries.",
    execution:
      "Reads inbound leads across web forms, email, and WhatsApp, evaluates fit against your ideal customer criteria, and books meetings directly on sales calendars.",
    href: "/solutions/sales-automation",
    action: "Explore agent",
  },
  {
    id: "AGENT 03",
    name: "Customer Support Agent",
    category: "Customer Operations",
    problem:
      "Repetitive tier-1 questions overwhelm support queues, causing long wait times and agent burnout.",
    execution:
      "Resolves common customer questions 24/7 across chat, email, and WhatsApp, checks order and policy records, and escalates complex issues with full context.",
    href: "/solutions/customer-support",
    action: "Explore agent",
  },
  {
    id: "AGENT 04",
    name: "Document & Extraction Agent",
    category: "Document Processing",
    problem:
      "Manual data entry from invoices, contracts, and KYC papers slows operations and introduces errors.",
    execution:
      "Extracts, normalizes, and verifies tabular data and clauses from complex PDFs and scans, detects discrepancies, and syncs verified records to your ERP.",
    href: "/solutions/document-processing",
    action: "Explore agent",
  },
  {
    id: "AGENT 05",
    name: "Internal Knowledge Agent",
    category: "Internal Operations",
    problem:
      "Employees lose hours digging through fragmented wikis, handbooks, and SOP documents for operational answers.",
    execution:
      "Answers employee questions in plain language grounded strictly in approved company documentation, operational guides, and policy repositories.",
    href: "/solutions/internal-knowledge",
    action: "Explore agent",
  },
  {
    id: "AGENT 06",
    name: "Finance & AP Reconciliation Agent",
    category: "Finance & Compliance",
    problem:
      "Three-way invoice matching and vendor reconciliation require days of tedious manual auditing.",
    execution:
      "Matches vendor invoices against purchase orders and goods receipts, flags pricing discrepancies, and prepares verified payment batches for approval.",
    href: "/solutions/finance-ap",
    action: "Explore agent",
  },
];

export function AgentWorkforceSection() {
  return (
    <section
      id="workforce"
      aria-label="Available AI Agents"
      className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28 border-b border-charcoal/10 bg-obsidian"
    >
      <div className="max-w-3xl space-y-3 sm:space-y-4">
        <FadeIn>
          <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-neonCyan uppercase">
            Available AI agents
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal font-space-grotesk">
            Meet your AI workforce
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-charcoal/70">
            Specialized AI agents built to handle real business work — from
            customer conversations and sales operations to research and
            repetitive workflows.
          </p>
        </FadeIn>
      </div>

      <FadeInStagger className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent) => (
          <FadeIn key={agent.id} className="h-full">
            <Link
              href={agent.href}
              className="group flex h-full flex-col justify-between border border-charcoal/20 bg-vaultAmber/30 p-6 sm:p-8 transition-colors duration-200 hover:border-charcoal/50 hover:bg-vaultAmber/50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              {/* Card Meta Header */}
              <div>
                <div className="flex items-center justify-between border-b border-charcoal/15 pb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-neonCyan">
                    {agent.category}
                  </span>
                  <span className="text-[10px] font-mono text-neonCyan tracking-widest uppercase">
                    {agent.id}
                  </span>
                </div>

                <h3 className="mt-3.5 text-xl sm:text-2xl font-normal tracking-tight text-charcoal font-space-grotesk">
                  {agent.name}
                </h3>

                <div className="mt-4 space-y-3.5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan">
                      The Bottleneck
                    </p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-charcoal/80">
                      {agent.problem}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-charcoal/10">
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neonCyan">
                      What It Does
                    </p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-charcoal/70">
                      {agent.execution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="mt-6 pt-4 border-t border-charcoal/15 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium tracking-wide text-charcoal underline decoration-charcoal/20 underline-offset-4 transition-colors group-hover:decoration-charcoal">
                  {agent.action}
                </span>
                <span
                  className="text-xs sm:text-sm text-charcoal font-mono transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </FadeInStagger>
    </section>
  );
}
