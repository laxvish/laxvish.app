"use client";

import Link from "next/link";
import { AIFabric } from "@/components/ui/AIFabric";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Hero() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <section className="relative isolate overflow-hidden border-b border-charcoal/10 bg-obsidian">
      {/* Immersive Intelligence Field Background */}
      <AIFabric />
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[900px] w-full max-w-[1440px] flex-col justify-center px-6 pt-32 pb-20 sm:px-12 sm:pt-40 lg:px-16 pointer-events-none">
        
        {/* Left-aligned typography to leave the right side of the fabric visible */}
        <div className="max-w-3xl space-y-10 lg:pr-12 pointer-events-auto">
          <FadeIn delay={0.1} yOffset={10}>
            <p className="text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
              The Enterprise AI Operating System
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2} yOffset={20}>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-charcoal">
              Deploy AI that executes.<br />
              <span className="text-neonCyan">Control how it operates.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3} yOffset={20}>
            <p className="max-w-xl text-base leading-relaxed tracking-wide text-charcoal/70 sm:text-lg">
              Laxvish is the enterprise AI operating system that combines domain AI agents,
              workflow orchestration, and verification controls into one production-ready
              AI workflow platform. Move from experiments to real operations.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} yOffset={20}>
            <div className="flex flex-wrap items-center gap-6 pt-8">
              <MagneticButton
                as="a"
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={BOOK_NOW_BUTTON_CLASS}
              >
                <span>Book a Demo</span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                href="/solutions"
                className={SECONDARY_HERO_CTA_CLASS}
              >
                Explore Solutions
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
