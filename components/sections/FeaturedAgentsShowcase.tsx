"use client";

import Link from "next/link";
import { EditorialReveal } from "@/components/ui/FadeIn";
import { GenesisPrologue } from "@/components/visuals/engine/GenesisPrologue";
import { SalesScene } from "@/components/visuals/engine/scenes/SalesScene";
import { SupportScene } from "@/components/visuals/engine/scenes/SupportScene";
import { DocumentScene } from "@/components/visuals/engine/scenes/DocumentScene";
import { KnowledgeScene } from "@/components/visuals/engine/scenes/KnowledgeScene";
import { VoiceWhatsAppScene } from "@/components/visuals/engine/scenes/VoiceWhatsAppScene";
import { LivingNetworkStage } from "@/components/visuals/engine/LivingNetworkStage";

interface Chapter {
  number: string;
  category: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  metrics: { label: string; value: string }[];
  scene: React.ReactNode;
  visualSide: "left" | "right" | "full";
}

const chapters: Chapter[] = [
  {
    number: "01",
    category: "Revenue & Growth",
    title: "Sales & Lead Engine",
    body: "An inbound inquiry arrives by voice call or WhatsApp. The Thread enters the audio stream, extracts fleet scale and timeline, crystallizes a qualified enterprise opportunity, and syncs directly with your CRM and rep calendar.",
    href: "/solutions/sales-automation",
    linkLabel: "Explore Sales Engine",
    metrics: [
      { label: "Response", value: "< 2 min" },
      { label: "ICP fit", value: "96.4% Tier-1" },
      { label: "CRM sync", value: "HubSpot · SF" },
    ],
    scene: <SalesScene />,
    visualSide: "right",
  },
  {
    number: "02",
    category: "Customer Operations",
    title: "Customer Support Desk",
    body: "Panicked customer messages across WhatsApp, email, and live chat create noisy backlogs. The Thread sweeps through, isolates root causes, verifies identity against SAML SSO, and restores executive access with zero wait time.",
    href: "/solutions/customer-support",
    linkLabel: "Explore Support Desk",
    metrics: [
      { label: "Resolution", value: "1.4s live" },
      { label: "Language", value: "Hinglish · multi" },
      { label: "Verification", value: "Brakes-gated" },
    ],
    scene: <SupportScene />,
    visualSide: "left",
  },
  {
    number: "03",
    category: "Finance & Ledger",
    title: "Intelligent Document Parser",
    body: "An invoice arrives as a PDF. The Thread separates the three layers of truth — header, line items, totals — and issues an embossed 3-way match token that your accounts payable team can verify in one glance.",
    href: "/solutions/document-processing",
    linkLabel: "Explore Document Parser",
    metrics: [
      { label: "Accuracy", value: "99.4%" },
      { label: "Layers", value: "Header · items · total" },
      { label: "Tokens", value: "3-way match" },
    ],
    scene: <DocumentScene />,
    visualSide: "full",
  },
  {
    number: "04",
    category: "Organizational Memory",
    title: "Internal Knowledge Assistant",
    body: "Instead of searching across 4,200 scattered documents in Notion, SharePoint, Google Drive, and PDFs, your team asks in plain language. A query pulse awakens only the relevant policy nodes and presents one calm, citation-verified answer.",
    href: "/solutions/internal-knowledge",
    linkLabel: "Explore Knowledge Assistant",
    metrics: [
      { label: "Memory index", value: "4,200+ docs" },
      { label: "Query speed", value: "14 ms latency" },
      { label: "Governance", value: "RBAC gated" },
    ],
    scene: <KnowledgeScene />,
    visualSide: "right",
  },
  {
    number: "05",
    category: "Telephony & Messaging",
    title: "Voice & WhatsApp Receptionist",
    body: "Two separate streams — a live phone call and a WhatsApp thread — converge into one customer truth. The Thread keeps the voice channel and the message channel in lockstep, with full context handoff to a human when needed.",
    href: "/solutions/voice-whatsapp",
    linkLabel: "Explore Voice & WhatsApp",
    metrics: [
      { label: "Channels", value: "Voice + WhatsApp" },
      { label: "Truth core", value: "Single record" },
      { label: "Handoff", value: "Context-rich" },
    ],
    scene: <VoiceWhatsAppScene />,
    visualSide: "full",
  },
];

function ChapterBlock({ chapter }: { chapter: Chapter }) {
  const narrative = (
    <div className="space-y-6">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
          {chapter.number}
        </span>
        <span className="font-mono text-xs tracking-[0.18em] text-deepink/60 uppercase">
          {chapter.category}
        </span>
      </div>
      <h3 className="text-3xl font-normal leading-[1.05] tracking-tight text-deepink sm:text-4xl">
        {chapter.title}
      </h3>
      <p className="max-w-md text-base leading-relaxed text-deepink/75 sm:text-lg">
        {chapter.body}
      </p>
      <dl className="grid grid-cols-3 gap-x-4 border-y border-rule-hair py-5 font-mono text-xs">
        {chapter.metrics.map((m) => (
          <div key={m.label}>
            <dt className="text-[10px] tracking-[0.18em] text-deepink/50 uppercase">
              {m.label}
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-deepink">{m.value}</dd>
          </div>
        ))}
      </dl>
      <Link
        href={chapter.href}
        className="group inline-flex items-center gap-2 border-b border-mark pb-1 font-mono text-xs font-medium tracking-[0.16em] text-mark uppercase transition-colors duration-200 hover:text-deepink hover:border-deepink cursor-pointer"
      >
        <span>{chapter.linkLabel}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );

  if (chapter.visualSide === "full") {
    return (
      <div className="space-y-10">
        {narrative}
        <div className="border border-rule-hair bg-cream p-3">
          {chapter.scene}
        </div>
      </div>
    );
  }

  const visual = (
    <div className="border border-rule-hair bg-cream p-3">{chapter.scene}</div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
      {chapter.visualSide === "left" ? (
        <>
          <div className="lg:col-span-7">{visual}</div>
          <div className="lg:col-span-5 lg:pt-12">{narrative}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-5 lg:pt-12">{narrative}</div>
          <div className="lg:col-span-7">{visual}</div>
        </>
      )}
    </div>
  );
}

export function FeaturedAgentsShowcase() {
  return (
    <section
      id="the-machine"
      className="relative z-10 border-y border-rule-hair bg-parchment"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        {/* Section manifesto — single column, not card grid */}
        <div className="max-w-3xl space-y-5">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-mark uppercase">
            The Workforce, Reimagined
          </p>
          <h2 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.05] tracking-tight text-deepink">
            Work enters. Intelligence moves. Work comes back finished.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-deepink/75 sm:text-lg">
            You are not browsing a feature list. You are observing an
            intelligent enterprise operating system at work. Watch the Laxvish
            Thread enter messy real-world tasks, extract meaning, coordinate
            systems, verify decisions, and deliver finished commitments.
          </p>
        </div>

        {/* 1. Genesis Prologue — the opening scene */}
        <div className="mt-20">
          <GenesisPrologue />
        </div>

        {/* 2. Five Flagship Chapters — single column, varied visual positions */}
        <div className="mt-32 space-y-32">
          {chapters.map((chapter) => (
            <EditorialReveal key={chapter.number}>
              <ChapterBlock chapter={chapter} />
            </EditorialReveal>
          ))}
        </div>

        {/* 3. The Living Network — the extended field */}
        <div className="mt-36">
          <EditorialReveal>
            <LivingNetworkStage />
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
