"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AIFabric } from "@/components/ui/AIFabric";
import { ConversationalBox } from "@/components/ui/ConversationalBox";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TheMoon } from "@/components/ui/TheMoon";
import {
  BOOK_NOW_BUTTON_CLASS,
  SECONDARY_HERO_CTA_CLASS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

/**
 * Hero — Scroll-Driven Narrative Establishing Shot & Control Surface Interface.
 *
 * Narrative Scroll Architecture:
 * 1. Rest State (Scroll Progress 0%):
 *    - Left: High-contrast display headline, overlines, and primary CTAs.
 *    - Right: Serene monochrome moon at rest (scale 1.00).
 * 2. Gliding Metamorphosis (Scroll Progress 18% -> 65%):
 *    - Hero copy gently dissolves and drifts upward.
 *    - The existing Moon slowly glides from the right column to the horizontal center.
 *    - Moon scales up by 30% (scale 1.00 -> 1.30) synchronized with its trajectory.
 *    - Fluid center-originating chromatic rainbow wave awakens inside the celestial sphere.
 * 3. Conversational Interface Emergence (Scroll Progress 55% -> 85%):
 *    - The large Laxvish Thread Control Surface prompt box emerges smoothly below the centered moon.
 *    - Settles into a calm, stable final composition (85% -> 100%).
 * 4. Accessibility & Reduced Motion:
 *    - Gracefully degrades to static sequential layout without sticky scroll pinning.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;
  const bookDemoUrl = getBookDemoUrl();

  // Normalized scroll progress across the 240vh narrative track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calm, cinematic spring smoothing (no snapping, no bounce, high inertia)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 24,
    mass: 0.85,
  });

  // ——— 1. Hero Copy Transforms ———
  const rawHeroOpacity = useTransform(smoothProgress, [0.12, 0.38], [1, 0]);
  const rawHeroY = useTransform(smoothProgress, [0.12, 0.38], [0, -35]);
  const heroOpacity = motionEnabled ? rawHeroOpacity : 1;
  const heroY = motionEnabled ? rawHeroY : 0;
  const heroPointerEvents = useTransform(smoothProgress, (v) =>
    v > 0.35 ? "none" : "auto"
  );

  // ——— 2. The Moon Trajectory & Scale (1.00 -> 1.30) ———
  // Desktop: Glides horizontally from right column to viewport center
  const rawMoonShiftX = useTransform(
    smoothProgress,
    [0.18, 0.65],
    ["0vw", "-27.15vw"]
  );
  // Vertical alignment: shifts into top-center celestial anchor position
  const rawMoonShiftY = useTransform(
    smoothProgress,
    [0.18, 0.65],
    [0, -45]
  );
  // Scale increases gradually by exactly 30% from 1.00 to 1.30
  const rawMoonScale = useTransform(
    smoothProgress,
    [0.18, 0.65],
    [1.0, 1.30]
  );

  const moonShiftX = motionEnabled ? rawMoonShiftX : "0vw";
  const moonShiftY = motionEnabled ? rawMoonShiftY : 0;
  const moonScale = motionEnabled ? rawMoonScale : 1.0;

  // ——— 3. Conversational Text Box Emergence ———
  const rawBoxOpacity = useTransform(smoothProgress, [0.55, 0.82], [0, 1]);
  const rawBoxY = useTransform(smoothProgress, [0.55, 0.82], [45, 0]);
  const rawBoxScale = useTransform(smoothProgress, [0.55, 0.82], [0.97, 1.0]);

  const boxOpacity = motionEnabled ? rawBoxOpacity : 1;
  const boxY = motionEnabled ? rawBoxY : 0;
  const boxScale = motionEnabled ? rawBoxScale : 1;
  const boxPointerEvents = useTransform(smoothProgress, (v) =>
    v > 0.55 ? "auto" : "none"
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate border-b border-charcoal/10 bg-obsidian"
      style={{
        minHeight: motionEnabled ? "240vh" : "auto",
      }}
    >
      {/* Sticky Viewport Stage */}
      <div
        className={
          motionEnabled
            ? "sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center"
            : "relative w-full py-16 sm:py-24"
        }
      >
        {/* Immersive Intelligence Field Background */}
        <AIFabric />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16 flex flex-col justify-center">
          {/* Main Grid: Split on Hero Rest State */}
          <div className="grid w-full items-center gap-10 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 pt-12 sm:pt-16 lg:pt-0">
            {/* ——— Left Column: Hero Copy ——— */}
            <motion.div
              style={{
                opacity: heroOpacity,
                y: heroY,
                pointerEvents: motionEnabled ? heroPointerEvents : "auto",
              }}
              className="max-w-2xl will-change-transform"
            >
              <FadeIn delay={0.1} yOffset={10}>
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
                  An AI company — AI systems for Indian enterprise
                </p>
              </FadeIn>

              <FadeIn delay={0.2} yOffset={20}>
                <h1 className="mt-5 sm:mt-7 text-[clamp(2.15rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                  We build AI systems that do the real work.
                </h1>
              </FadeIn>

              <FadeIn delay={0.3} yOffset={20}>
                <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed tracking-wide text-charcoal/70">
                  Workers execute. Brain coordinates. Brakes verify. Laxvish
                  engineers the systems, runs them on your rules, and hands you
                  finished work — you stay in control of every decision.
                </p>
              </FadeIn>

              <FadeIn delay={0.4} yOffset={20}>
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
                  <MagneticButton
                    as="a"
                    href={bookDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${BOOK_NOW_BUTTON_CLASS} w-full sm:w-auto text-center justify-center`}
                  >
                    <span>Book a working session</span>
                  </MagneticButton>
                  <MagneticButton
                    as={Link}
                    href="/solutions"
                    className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto text-center justify-center`}
                  >
                    See what we automate
                  </MagneticButton>
                </div>
              </FadeIn>

              {/* Provenance line */}
              <FadeIn delay={0.5} yOffset={10}>
                <p className="mt-8 sm:mt-12 border-t border-charcoal/20 pt-4 sm:pt-5 text-[10px] sm:text-xs font-medium tracking-[0.18em] text-neonCyan uppercase">
                  Made in India&ensp;·&ensp;DPDP-ready&ensp;·&ensp;You stay in
                  control
                </p>
              </FadeIn>
            </motion.div>

            {/* ——— Right Column: The Celestial Moon ——— */}
            <motion.div
              style={{
                x: motionEnabled ? moonShiftX : 0,
                y: motionEnabled ? moonShiftY : 0,
                scale: motionEnabled ? moonScale : 1,
              }}
              className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[420px] mx-auto will-change-transform z-20"
            >
              <TheMoon
                progress={motionEnabled ? smoothProgress : undefined}
                disableOuterTransform={true}
              />
            </motion.div>
          </div>

          {/* ——— Conversational Control Surface (Emerges beneath centered moon) ——— */}
          <motion.div
            style={{
              opacity: boxOpacity,
              y: boxY,
              scale: boxScale,
              pointerEvents: motionEnabled ? boxPointerEvents : "auto",
            }}
            className="w-full mt-4 sm:mt-6 will-change-transform z-30"
          >
            <ConversationalBox />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
