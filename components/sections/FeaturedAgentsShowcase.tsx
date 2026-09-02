"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { GenesisPrologue } from "@/components/visuals/engine/GenesisPrologue";
import { SalesScene } from "@/components/visuals/engine/scenes/SalesScene";
import { SupportScene } from "@/components/visuals/engine/scenes/SupportScene";
import { DocumentScene } from "@/components/visuals/engine/scenes/DocumentScene";
import { KnowledgeScene } from "@/components/visuals/engine/scenes/KnowledgeScene";
import { VoiceWhatsAppScene } from "@/components/visuals/engine/scenes/VoiceWhatsAppScene";
import { LivingNetworkStage } from "@/components/visuals/engine/LivingNetworkStage";

export function FeaturedAgentsShowcase() {
  return (
    <section id="the-machine" className="relative z-10 border-y border-vaultAmber/15 bg-obsidian">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
        {/* Section Manifesto */}
        <FadeIn>
          <div className="max-w-3xl space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-vaultAmber">
              The Workforce, Reimagined
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              Work enters. Intelligence moves. Work comes back finished.
            </h2>
            <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
              You are not browsing a feature list. You are observing an intelligent enterprise operating system at work. Watch the Laxvish Thread enter messy real-world tasks, extract meaning, coordinate systems, verify decisions, and deliver finished commitments.
            </p>
          </div>
        </FadeIn>

        {/* 1. Genesis Stage: The Universe Coming Alive */}
        <div className="mt-16 sm:mt-20">
          <FadeIn>
            <GenesisPrologue />
          </FadeIn>
        </div>

        {/* 2. Five Flagship Cinematic Chapters with Alternating Compositions */}
        <div className="mt-32 space-y-36">
          {/* Chapter 01: Sales & Lead Engine (Text Left, Animation Right) */}
          <div className="relative">
            <FadeIn>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                {/* Left: Narrative Column */}
                <div className="space-y-6 lg:col-span-5">
                  <div className="flex items-center gap-3 font-mono text-xs text-vaultAmber/60">
                    <span className="font-bold text-vaultAmber">01</span>
                    <span>/</span>
                    <span className="uppercase tracking-wider">REVENUE & GROWTH</span>
                  </div>

                  <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
                    Sales & Lead Engine
                  </h3>

                  <p className="font-serif text-lg italic text-charcoal/80">
                    &ldquo;Conversations quietly become enterprise opportunities.&rdquo;
                  </p>

                  <p className="text-sm leading-relaxed text-charcoal/70 sm:text-base">
                    When an inbound inquiry arrives by voice call or WhatsApp, the Thread enters the audio stream. It extracts fleet scale, timeline, and budget parameters, crystallizes a qualified enterprise opportunity, and syncs directly with your CRM and rep calendar.
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3 border-y border-vaultAmber/15 py-4 font-mono text-xs">
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Response</span>
                      <span className="font-bold text-charcoal mt-0.5 block">&lt; 2 mins</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">ICP Fit</span>
                      <span className="font-bold text-vaultAmber mt-0.5 block">96.4% Tier-1</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">CRM Sync</span>
                      <span className="font-bold text-neonCyan mt-0.5 block">HubSpot / SF</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/solutions/sales-automation"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan transition-colors cursor-pointer"
                    >
                      <span>Explore Sales Engine specification</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Right: Cinematic Visual */}
                <div className="lg:col-span-7">
                  <div className="group relative rounded-[2.5rem] p-2 bg-voidSurface/60 ring-1 ring-vaultAmber/20 shadow-2xl transition-all duration-700">
                    <SalesScene />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Chapter 02: Customer Support Desk (Animation Left, Text Right) */}
          <div className="relative">
            <FadeIn>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                {/* Left: Cinematic Visual */}
                <div className="lg:col-span-7 lg:order-1 order-2">
                  <div className="group relative rounded-[2.5rem] p-2 bg-voidSurface/60 ring-1 ring-vaultAmber/20 shadow-2xl transition-all duration-700">
                    <SupportScene />
                  </div>
                </div>

                {/* Right: Narrative Column */}
                <div className="space-y-6 lg:col-span-5 lg:order-2 order-1">
                  <div className="flex items-center gap-3 font-mono text-xs text-vaultAmber/60">
                    <span className="font-bold text-vaultAmber">02</span>
                    <span>/</span>
                    <span className="uppercase tracking-wider">CUSTOMER OPERATIONS</span>
                  </div>

                  <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
                    Customer Support Desk
                  </h3>

                  <p className="font-serif text-lg italic text-charcoal/80">
                    &ldquo;Chaos becomes clarity in seconds.&rdquo;
                  </p>

                  <p className="text-sm leading-relaxed text-charcoal/70 sm:text-base">
                    Panicked customer messages across WhatsApp, email, and live chat create noisy backlogs. The Thread sweeps through the tickets, isolates root causes, verifies identity against SAML SSO, and restores executive access with zero wait time.
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3 border-y border-vaultAmber/15 py-4 font-mono text-xs">
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Resolution</span>
                      <span className="font-bold text-charcoal mt-0.5 block">1.4s Live</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Language</span>
                      <span className="font-bold text-vaultAmber mt-0.5 block">Hinglish / Multi</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Verification</span>
                      <span className="font-bold text-neonCyan mt-0.5 block">Brakes Gated</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/solutions/customer-support"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan transition-colors cursor-pointer"
                    >
                      <span>Explore Support Desk specification</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Chapter 03: Document Intelligence (Full-Width Immersive Stage) */}
          <div className="relative">
            <FadeIn>
              <div className="space-y-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div className="max-w-2xl space-y-2">
                    <div className="flex items-center gap-3 font-mono text-xs text-vaultAmber/60">
                      <span className="font-bold text-vaultAmber">03</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">FINANCE & LEDGER</span>
                    </div>
                    <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
                      Intelligent Document Parser
                    </h3>
                    <p className="font-serif text-lg italic text-charcoal/80">
                      &ldquo;Animate understanding, not just optical character recognition.&rdquo;
                    </p>
                  </div>

                  <Link
                    href="/solutions/document-processing"
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan transition-colors cursor-pointer"
                  >
                    <span>Explore Document Parser specification</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Full Width Cinematic Container */}
                <div className="group relative rounded-[2.5rem] p-2 bg-voidSurface/60 ring-1 ring-vaultAmber/20 shadow-2xl transition-all duration-700">
                  <DocumentScene />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Chapter 04: Internal Knowledge (Expansive Memory Field) */}
          <div className="relative">
            <FadeIn>
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                {/* Left: Narrative Column */}
                <div className="space-y-6 lg:col-span-5">
                  <div className="flex items-center gap-3 font-mono text-xs text-vaultAmber/60">
                    <span className="font-bold text-vaultAmber">04</span>
                    <span>/</span>
                    <span className="uppercase tracking-wider">ORGANIZATIONAL MEMORY</span>
                  </div>

                  <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
                    Internal Knowledge Assistant
                  </h3>

                  <p className="font-serif text-lg italic text-charcoal/80">
                    &ldquo;The company remembers.&rdquo;
                  </p>

                  <p className="text-sm leading-relaxed text-charcoal/70 sm:text-base">
                    Instead of searching across 4,200 scattered documents in Notion, SharePoint, Google Drive, and PDFs, your team asks in plain language. A radiant query pulse awakens only the relevant policy nodes and presents one calm, citation-verified answer.
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3 border-y border-vaultAmber/15 py-4 font-mono text-xs">
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Memory Index</span>
                      <span className="font-bold text-charcoal mt-0.5 block">4,200+ Docs</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Query Speed</span>
                      <span className="font-bold text-vaultAmber mt-0.5 block">14ms Latency</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-charcoal/40 uppercase">Governance</span>
                      <span className="font-bold text-neonCyan mt-0.5 block">RBAC Gated</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/solutions/internal-knowledge"
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan transition-colors cursor-pointer"
                    >
                      <span>Explore Knowledge Assistant specification</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Right: Expansive Memory Visual */}
                <div className="lg:col-span-7">
                  <div className="group relative rounded-[2.5rem] p-2 bg-voidSurface/60 ring-1 ring-vaultAmber/20 shadow-2xl transition-all duration-700">
                    <KnowledgeScene />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Chapter 05: Voice & WhatsApp Convergence (Symmetrical Sided Stage) */}
          <div className="relative">
            <FadeIn>
              <div className="space-y-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div className="max-w-2xl space-y-2">
                    <div className="flex items-center gap-3 font-mono text-xs text-vaultAmber/60">
                      <span className="font-bold text-vaultAmber">05</span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">TELEPHONY & MESSAGING</span>
                    </div>
                    <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
                      CallMe Voice & WhatsApp Receptionist
                    </h3>
                    <p className="font-serif text-lg italic text-charcoal/80">
                      &ldquo;Two separate streams becoming one customer truth.&rdquo;
                    </p>
                  </div>

                  <Link
                    href="/solutions/voice-whatsapp"
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-vaultAmber underline underline-offset-4 hover:text-neonCyan transition-colors cursor-pointer"
                  >
                    <span>Explore Voice & WhatsApp specification</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Symmetrical Dual-Stream Container */}
                <div className="group relative rounded-[2.5rem] p-2 bg-voidSurface/60 ring-1 ring-vaultAmber/20 shadow-2xl transition-all duration-700">
                  <VoiceWhatsAppScene />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 3. The Living Extended Intelligence Network Stage */}
        <div className="mt-36">
          <FadeIn>
            <LivingNetworkStage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
