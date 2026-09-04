"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
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
 * Hero — Two-Phase Responsive Scroll Architecture with Post-Completion Hold.
 *
 * Responsive Track Height:
 * - Mobile: ~360vh (fluid touch scroll)
 * - Tablet: ~420vh
 * - Desktop: ~480vh
 *
 * PHASE 1 — Cinematic Transformation (0% -> 76% of track):
 * - animationProgress: 0.0 -> 1.0
 * - Hero copy dissolves upward gracefully.
 * - Monochrome Moon glides to horizontal center and scales up responsively.
 * - Internal disorganized chromatic dispersion swirls and develops into full iridescent rainbow spectrum.
 * - Minimal AI Solutions operational interface emerges directly beneath the Moon.
 * - By animationProgress = 1.0 (at section progress 0.76), transformation reaches 100%.
 *
 * PHASE 2 — Final State Hold (76% -> 100% of track):
 * - animationProgress stays clamped at 1.0.
 * - Moon remains centered, at final scale, and fully colored.
 * - Moon's internal surface autonomously rotates 360 degrees around its own axis in place.
 * - Background and UI remain completely stable.
 * - The user physically scrolls through the dedicated hold distance before the hero unpins and next section enters.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;
  const bookDemoUrl = getBookDemoUrl();
  const [deviceTier, setDeviceTier] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [isShortHeight, setIsShortHeight] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsShortHeight(height < 500);

      if (width >= 1024) {
        setDeviceTier("desktop");
      } else if (width >= 768) {
        setDeviceTier("tablet");
      } else {
        setDeviceTier("mobile");
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // 1. Normalized scroll progress across the responsive track (0.0 -> 1.0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calm, high-inertia spring smoothing across the track
  const smoothSectionProgress = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 24,
    mass: 0.85,
  });

  // 2. PHASE 1: Cinematic Animation Progress (0.0 -> 1.0 during section progress 0.0 -> 0.76)
  const rawAnimationProgress = useTransform(
    smoothSectionProgress,
    [0.0, 0.76],
    [0.0, 1.0],
    { clamp: true }
  );
  const animationProgress = motionEnabled
    ? rawAnimationProgress
    : useTransform(scrollYProgress, () => 1.0);

  // ——— Hero Copy Transforms (Mapped strictly to animationProgress) ———
  const rawHeroOpacity = useTransform(animationProgress, [0.04, 0.30], [1, 0]);
  const rawHeroY = useTransform(animationProgress, [0.04, 0.30], [0, -32]);
  const heroOpacity = motionEnabled ? rawHeroOpacity : 1;
  const heroY = motionEnabled ? rawHeroY : 0;
  const heroPointerEvents = useTransform(animationProgress, (v) =>
    v > 0.30 ? "none" : "auto"
  );

  // ——— The Moon Trajectory & Scale Transforms (0.0 -> 1.0) ———
  // Desktop: Glides from right-column (+26vw) to center (0vw).
  // Tablet: Glides from right (+16vw) to center (0vw).
  // Mobile: Centered (0vw).
  const initialMoonShiftX =
    deviceTier === "desktop" ? "26vw" : deviceTier === "tablet" ? "16vw" : "0vw";

  const rawMoonShiftX = useTransform(
    animationProgress,
    [0.10, 0.85],
    [initialMoonShiftX, "0vw"]
  );

  const initialMoonScale = deviceTier === "mobile" ? 0.80 : 1.0;
  const finalMoonScale = deviceTier === "mobile" ? 1.10 : 1.30;

  const rawMoonScale = useTransform(
    animationProgress,
    [0.10, 0.85],
    [initialMoonScale, finalMoonScale]
  );

  const rawMoonShiftY = useTransform(
    animationProgress,
    [0.10, 0.85],
    [0, deviceTier === "mobile" ? -8 : -12]
  );

  const moonShiftX = motionEnabled ? rawMoonShiftX : "0vw";
  const moonShiftY = motionEnabled ? rawMoonShiftY : 0;
  const moonScale = motionEnabled ? rawMoonScale : (deviceTier === "mobile" ? 1.0 : 1.2);

  // ——— Conversational Chatbox Emergence (0.0 -> 1.0) ———
  const rawBoxOpacity = useTransform(animationProgress, [0.48, 0.86], [0, 1]);
  const rawBoxY = useTransform(animationProgress, [0.48, 0.86], [28, 0]);
  const rawBoxScale = useTransform(animationProgress, [0.48, 0.86], [0.96, 1.0]);

  const boxOpacity = motionEnabled ? rawBoxOpacity : 1;
  const boxY = motionEnabled ? rawBoxY : 0;
  const boxScale = motionEnabled ? rawBoxScale : 1;
  const boxPointerEvents = useTransform(animationProgress, (v) =>
    v > 0.52 ? "auto" : "none"
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate border-b border-charcoal/10 bg-obsidian"
      style={{
        minHeight: motionEnabled
          ? deviceTier === "mobile"
            ? "360vh"
            : deviceTier === "tablet"
            ? "420vh"
            : "480vh"
          : "auto",
      }}
    >
      {/* Sticky Viewport Stage: Pinned during both Transformation & Hold Phases */}
      <div
        className={
          motionEnabled
            ? "sticky top-0 h-[100dvh] min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center"
            : "relative w-full py-16 sm:py-24"
        }
      >
        {/* Immersive Intelligence Field Background */}
        <AIFabric />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] h-full px-5 sm:px-8 lg:px-12 flex items-center justify-center">
          
          {/* ============================================================ */}
          {/* LAYER 1: HERO COPY (Visible at Scroll 0, Dissolves on Scroll)*/}
          {/* ============================================================ */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
              pointerEvents: motionEnabled ? heroPointerEvents : "auto",
            }}
            className={`w-full max-w-2xl lg:absolute lg:left-8 xl:left-16 lg:top-1/2 lg:-translate-y-1/2 z-10 will-change-transform ${
              isShortHeight
                ? "pt-12 pb-2"
                : "pt-16 sm:pt-20 lg:pt-0"
            }`}
          >
            <FadeIn delay={0.1} yOffset={10}>
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase">
                An AI company · AI systems for Indian enterprise
              </p>
            </FadeIn>

            <FadeIn delay={0.2} yOffset={14}>
              <h1 className="mt-2.5 sm:mt-5 text-[clamp(1.75rem,4.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
                We build AI systems that do the real work.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} yOffset={14}>
              <p className="mt-2.5 sm:mt-4 max-w-xl text-xs sm:text-base lg:text-lg leading-relaxed tracking-wide text-charcoal/70">
                Workers execute. Brain coordinates. Brakes verify. Laxvish
                engineers the systems, runs them on your rules, and hands you
                finished work: you stay in control of every decision.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} yOffset={14}>
              <div className="mt-4 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                <MagneticButton
                  as="a"
                  href={bookDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${BOOK_NOW_BUTTON_CLASS} w-full sm:w-auto text-center justify-center py-2.5 sm:py-3.5 text-xs sm:text-sm`}
                >
                  <span>Book a working session</span>
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  href="/solutions"
                  className={`${SECONDARY_HERO_CTA_CLASS} w-full sm:w-auto text-center justify-center py-2.5 sm:py-3.5 text-xs sm:text-sm`}
                >
                  See what we automate
                </MagneticButton>
              </div>
            </FadeIn>

            {/* Provenance line */}
            <FadeIn delay={0.5} yOffset={10}>
              <p className="mt-4 sm:mt-7 border-t border-charcoal/20 pt-2.5 sm:pt-4 text-[9px] sm:text-xs font-medium tracking-[0.16em] sm:tracking-[0.18em] text-neonCyan uppercase">
                Made in India&ensp;·&ensp;DPDP-ready&ensp;·&ensp;You stay in
                control
              </p>
            </FadeIn>
          </motion.div>

          {/* ============================================================ */}
          {/* LAYER 2: CELESTIAL STAGE (Moon + Minimal Solution Chatbox)   */}
          {/* ============================================================ */}
          <div className="w-full flex flex-col items-center justify-center z-20 pointer-events-none absolute inset-0 pt-16 sm:pt-20 pb-4 px-4 sm:px-8">
            
            {/* ——— The Moon: Floats directly above the chatbox ——— */}
            <motion.div
              style={{
                x: motionEnabled ? moonShiftX : 0,
                y: motionEnabled ? moonShiftY : 0,
                scale: motionEnabled ? moonScale : 1,
              }}
              className={`w-full mx-auto will-change-transform z-30 ${
                isShortHeight
                  ? "max-w-[95px] max-h-[110px]"
                  : "max-w-[130px] xs:max-w-[160px] sm:max-w-[200px] lg:max-w-[250px]"
              }`}
            >
              <TheMoon
                progress={motionEnabled ? animationProgress : undefined}
                disableOuterTransform={true}
              />
            </motion.div>

            {/* ——— Minimal Gemini/ChatGPT-Style Chatbox Surface ——— */}
            <motion.div
              style={{
                opacity: boxOpacity,
                y: boxY,
                scale: boxScale,
                pointerEvents: motionEnabled ? boxPointerEvents : "auto",
              }}
              className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl -mt-2 sm:-mt-4 lg:-mt-6 will-change-transform z-40 px-2 sm:px-0"
            >
              <ConversationalBox />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
