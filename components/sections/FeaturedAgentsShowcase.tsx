"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SalesScene } from "@/components/visuals/engine/scenes/SalesScene";
import { SupportScene } from "@/components/visuals/engine/scenes/SupportScene";
import { DocumentScene } from "@/components/visuals/engine/scenes/DocumentScene";
import { KnowledgeScene } from "@/components/visuals/engine/scenes/KnowledgeScene";
import { VoiceWhatsAppScene } from "@/components/visuals/engine/scenes/VoiceWhatsAppScene";

interface FeaturedAgent {
  num: string;
  category: string;
  title: string;
  tagline: string;
  story: string;
  metrics: { label: string; value: string }[];
  slug: string;
  renderScene: () => React.ReactNode;
}

const FEATURED_AGENTS: FeaturedAgent[] = [
  {
    num: "01",
    category: "Revenue & Sales",
    title: "AI Sales & Lead Engine",
    tagline: "Conversations quietly become enterprise opportunities.",
    story:
      "When an inbound lead arrives by phone or WhatsApp, this worker evaluates company fit, scores intent urgency, drafts a personalized reply, and schedules a meeting on your rep's calendar. Your team only speaks with buyers ready to close.",
    metrics: [
      { label: "Lead Response", value: "< 2 mins" },
      { label: "ICP Accuracy", value: "96.4%" },
      { label: "CRM Sync", value: "HubSpot / SF" },
    ],
    slug: "sales-automation",
    renderScene: () => <SalesScene />,
  },
  {
    num: "02",
    category: "Customer Frontline",
    title: "AI Customer Support Desk",
    tagline: "Chaos becomes clarity in seconds.",
    story:
      "Customer questions pile up across WhatsApp, email, and chat. This worker connects to your live ERP and warehouse dispatch logs, understands mixed Hinglish queries, and resolves tickets instantly without putting anyone on hold.",
    metrics: [
      { label: "Resolution Time", value: "1.4s" },
      { label: "Language", value: "Hinglish Native" },
      { label: "Escalation Rate", value: "0.0%" },
    ],
    slug: "customer-support",
    renderScene: () => <SupportScene />,
  },
  {
    num: "03",
    category: "Finance & Documents",
    title: "Intelligent Document Parser",
    tagline: "Animate understanding, not just optical character recognition.",
    story:
      "Invoices, contracts, and KYC documents float in with different formats. The Laxvish Thread scans the document, detaches essential semantic fields, cross-checks GSTIN validity, and commits an audit-grade 3-way match directly into SAP or Tally.",
    metrics: [
      { label: "Match Accuracy", value: "100%" },
      { label: "Tax Verification", value: "GST ITC Safe" },
      { label: "Audit State", value: "Passed ✓" },
    ],
    slug: "document-processing",
    renderScene: () => <DocumentScene />,
  },
  {
    num: "04",
    category: "Company Memory",
    title: "Internal Knowledge Assistant",
    tagline: "The company remembers.",
    story:
      "Instead of searching through 4,200 scattered documents across Notion, SharePoint, and Google Drive, your team asks in plain English. A single query pulse awakens the relevant policies, synthesizes the exact answer, and cites the original handbook clause.",
    metrics: [
      { label: "Search Index", value: "4,200+ Docs" },
      { label: "Retrieval Latency", value: "14ms" },
      { label: "Clearance", value: "RBAC Gated" },
    ],
    slug: "internal-knowledge",
    renderScene: () => <KnowledgeScene />,
  },
  {
    num: "05",
    category: "Telephony & Voice",
    title: "CallMe Voice & WhatsApp Receptionist",
    tagline: "An AI receptionist that never puts anyone on hold.",
    story:
      "A dual-stream conversational agent handling telephony calls on Indian PRI lines and WhatsApp chats simultaneously. It understands accents, reschedules appointments in your EMR, and redacts audio PII under strict DPDP compliance.",
    metrics: [
      { label: "Voice Latency", value: "240ms" },
      { label: "Channels", value: "SIP + WhatsApp" },
      { label: "Audio Privacy", value: "DPDP Redacted" },
    ],
    slug: "voice-whatsapp",
    renderScene: () => <VoiceWhatsAppScene />,
  },
];

const OTHER_AGENTS = [
  { name: "Finance & AP Reconciler", slug: "finance-ap", category: "Finance" },
  { name: "Contract Risk Analyzer", slug: "contract-automation", category: "Legal" },
  { name: "IT Helpdesk & Access Terminal", slug: "it-helpdesk", category: "Security" },
  { name: "Executive Intelligence Radar", slug: "executive-intelligence", category: "Leadership" },
  { name: "Marketing Campaign Orchestrator", slug: "marketing-operations", category: "Revenue" },
  { name: "Autonomous Procurement Engine", slug: "procurement", category: "Operations" },
  { name: "People & HR Lifecycle Assistant", slug: "hr-operations", category: "People" },
  { name: "Narrative Analytics & WBR Studio", slug: "reporting-analytics", category: "Finance" },
];

export function FeaturedAgentsShowcase() {
  return (
    <section id="featured-workforce" className="relative z-10 border-y border-charcoal/10 bg-obsidian">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        {/* Section Manifesto */}
        <FadeIn>
          <div className="max-w-3xl space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
              The Workforce, Reimagined
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              Work enters. Intelligence moves. Work comes back finished.
            </h2>
            <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
              Explore 5 flagship AI workers running production operations across Indian enterprises. Each worker handles real business tasks with predictability, human oversight, and verifiable audit trails.
            </p>
          </div>
        </FadeIn>

        {/* 5 Deep Featured Agent Sections */}
        <div className="mt-24 space-y-32">
          {FEATURED_AGENTS.map((agent, index) => (
            <div key={agent.slug} className="relative">
              <FadeIn>
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                  {/* Left: About This Agent Narrative */}
                  <div className={`space-y-6 lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-3 font-mono text-xs text-charcoal/50">
                      <span className="font-bold text-charcoal">{agent.num}</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">{agent.category}</span>
                    </div>

                    <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
                      {agent.title}
                    </h3>

                    <p className="font-serif text-lg italic text-charcoal/80">
                      &ldquo;{agent.tagline}&rdquo;
                    </p>

                    <p className="text-sm leading-relaxed text-charcoal/70 sm:text-base">
                      {agent.story}
                    </p>

                    {/* Key Metric Tags */}
                    <div className="grid grid-cols-3 gap-3 border-y border-charcoal/10 py-4 font-mono text-xs">
                      {agent.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="block text-[10px] text-charcoal/40 uppercase">{m.label}</span>
                          <span className="font-bold text-charcoal mt-0.5 block">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Link to Dedicated Page */}
                    <div>
                      <Link
                        href={`/solutions/${agent.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-charcoal underline underline-offset-4 hover:text-neonCyan transition-colors"
                      >
                        <span>View dedicated {agent.title} briefing</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: The Bespoke Cinematic Scene Visual */}
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="group relative rounded-[2.5rem] p-2 bg-charcoal/5 ring-1 ring-charcoal/10 shadow-2xl transition-all duration-700">
                      {agent.renderScene()}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>

        {/* Other 8 Automations Directory Link */}
        <FadeIn>
          <div className="mt-32 rounded-3xl border border-charcoal/15 bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-charcoal/10 pb-6">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neonCyan">
                  Extended Intelligence Layer
                </p>
                <h3 className="mt-2 text-2xl font-normal tracking-tight text-charcoal sm:text-3xl">
                  More specialized AI workers available on dedicated pages
                </h3>
              </div>
              <Link
                href="/solutions"
                className="font-mono text-xs font-semibold text-charcoal underline underline-offset-4 hover:text-neonCyan"
              >
                View all 13 automations catalog →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {OTHER_AGENTS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/solutions/${item.slug}`}
                  className="group block rounded-2xl border border-charcoal/10 bg-obsidian p-4 transition-all hover:border-charcoal hover:bg-vaultAmber/30"
                >
                  <span className="font-mono text-[10px] uppercase text-charcoal/40">
                    {item.category}
                  </span>
                  <p className="mt-2 text-sm font-medium text-charcoal group-hover:text-neonCyan transition-colors">
                    {item.name}
                  </p>
                  <span className="mt-3 block font-mono text-[11px] text-charcoal/50 group-hover:text-charcoal">
                    Explore page →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
