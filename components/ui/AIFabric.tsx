"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useScroll } from "framer-motion";
import { MouseEvent, useEffect } from "react";

interface AIFabricProps {
  /**
   * 1 (Hero): Full motion, scroll evolution, full lighting.
   * 2 (Standard): 20-30% motion, subtle continuous movement, no scroll mapping.
   * 3 (Focus): Minimal/static, faint visual presence.
   */
  intensity?: 1 | 2 | 3;
  variant?: "default" | "workers" | "brain" | "brakes" | "solutions";
  transitionPhase?: "idle" | "pre" | "warp" | "morph" | "release";
  theme?: "dark" | "light";
}

export function AIFabric({ 
  intensity = 1, 
  variant = "default", 
  transitionPhase = "idle",
  theme = "dark"
}: AIFabricProps) {
  // Config multipliers based on intensity & variant
  const isHero = intensity === 1;
  const isFocus = intensity === 3;

  // Honour the OS-level "reduce motion" preference: the field holds a static
  // frame instead of running its scroll/rotate loops. WCAG 2.3.3.
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  let speedMultiplier = intensity === 1 ? 1 : intensity === 2 ? 0.3 : 0.05;
  const baseOpacity = intensity === 1 ? 1 : intensity === 2 ? 0.6 : 0.2;

  // Page-specific variants
  if (variant === "workers") speedMultiplier *= 1.3;
  if (variant === "brakes") speedMultiplier *= 0.5;
  
  // Global Scroll Driver (Only active on Level 1 Hero)
  const { scrollY } = useScroll();
  // Storyboard Keyframes (assuming 1000px typical hero height for mapping)
  // 0% (0), 25% (250), 50% (500), 75% (750), 100% (1000)
  const scrollBreakpoints = [0, 250, 500, 750, 1000];

  // Mouse & Interaction Springs
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isInteracting = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  
  // Transition Phase (Field Continuity Warp)
  const warpScale = useSpring(0, { stiffness: 60, damping: 20 });
  const warpLight = useSpring(0, { stiffness: 60, damping: 20 });
  const transitionPanY = useSpring(0, { stiffness: 50, damping: 25 });
  
  useEffect(() => {
    if (transitionPhase === "pre") {
      warpScale.set(-0.02); // Pre: slight tension inward
      warpLight.set(0.02);  // Pre: slight lighting focus
      transitionPanY.set(-5);
    } else if (transitionPhase === "warp") {
      warpScale.set(-0.08); // Warp: compress field
      warpLight.set(0.08);  // Warp: intense energy flash
      transitionPanY.set(-15);
    } else if (transitionPhase === "morph") {
      warpScale.set(0.04);  // Morph: reorganize (slight expand)
      warpLight.set(0.04);  // Morph: energy begins to settle
      transitionPanY.set(5);
    } else {
      // Release & Idle: relax back to ambient state
      warpScale.set(0);
      warpLight.set(0);
      transitionPanY.set(0);
    }
  }, [transitionPhase, warpScale, warpLight, transitionPanY]);

  // In Level 1, scroll reduces interaction to 30-40%
  // In Level 2/3, interaction is always reduced or minimal
  const hoverMultiplier = useTransform(scrollY, [0, 250, 500], [isHero ? 1 : 0.4, isHero ? 0.8 : 0.4, isHero ? 0.3 : 0.1]);
  const dampedInteraction = useMotionValue(0);
  useEffect(() => {
    return isInteracting.on("change", (latest) => {
      const mult = hoverMultiplier.get();
      dampedInteraction.set(latest * mult);
    });
  }, [isInteracting, hoverMultiplier, dampedInteraction]);
  const smoothInteraction = useSpring(dampedInteraction, { stiffness: 50, damping: 15 });

  // Camera System
  const cameraRotateX = useTransform(smoothMouseY, [0, 1], ["2deg", "-2deg"]);
  const cameraRotateY = useTransform(smoothMouseX, [0, 1], ["-2deg", "2deg"]);
  
  // Hero Scroll Camera: Calm (1) -> Disturbance (1.01) -> Formation (1.03) -> Peak (1.06) -> Dissolve (1)
  const cameraScrollScale = useTransform(scrollY, scrollBreakpoints, [1, 1.01, 1.03, 1.06, 1]);
  const interactionScale = useTransform(smoothInteraction, [0, 1], [0, 0.02]);
  
  // Both camera scales are computed unconditionally so the hook count never
  // depends on `intensity`. Selecting between them happens after the hooks.
  const cameraScaleHero = useTransform(
    [cameraScrollScale, interactionScale, warpScale],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (([s, i, ws]: number[]) => s + i + ws) as any,
  );
  const cameraScaleAmbient = useTransform(
    [interactionScale, warpScale],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (([i, ws]: number[]) => 1 + i + ws) as any,
  );
  const finalCameraScale = isHero ? cameraScaleHero : cameraScaleAmbient;

  // NOTE: The former "Dynamic Lighting System" derived lightX / lightY /
  // scrollLightIntensity / interactionLightBoost and a final intensity, but no
  // element ever consumed them — the whole chain was inert and was removed
  // rather than wired up, so this edit changes no pixels. `warpLight` is kept
  // because the transition effect below still drives it.

  // Structural Alignment mapped to Scroll (5-State Progression)
  
  // Layer 1
  const l1Calm = "40% 60% 70% 30% / 40% 50% 60% 50%";
  const l1Disturb = "42% 58% 60% 40% / 42% 52% 58% 48%";
  const l1Form = "45% 55% 45% 55% / 55% 45% 55% 45%";
  const l1Peak = "30% 70% 30% 70% / 50% 50% 50% 50%";
  const radiusL1 = useTransform(scrollY, scrollBreakpoints, [l1Calm, l1Disturb, l1Form, l1Peak, l1Calm]);

  // Layer 2
  const l2Calm = "50% 50% 40% 60% / 60% 40% 70% 30%";
  const l2Disturb = "52% 48% 42% 58% / 55% 45% 65% 35%";
  const l2Form = "55% 45% 55% 45% / 45% 55% 45% 55%";
  const l2Peak = "50% 50% 30% 70% / 40% 60% 40% 60%";
  const radiusL2 = useTransform(scrollY, scrollBreakpoints, [l2Calm, l2Disturb, l2Form, l2Peak, l2Calm]);

  // Layer 3
  const l3Calm = "70% 30% 50% 50% / 30% 70% 50% 50%";
  const l3Disturb = "65% 35% 55% 45% / 35% 65% 45% 55%";
  const l3Form = "60% 40% 60% 40% / 40% 60% 40% 60%";
  const l3Peak = "40% 60% 40% 60% / 50% 50% 50% 50%";
  const radiusL3 = useTransform(scrollY, scrollBreakpoints, [l3Calm, l3Disturb, l3Form, l3Peak, l3Calm]);

  // If not Hero, default to their base shapes (or brain variant)
  const finalRadius1 = isHero ? radiusL1 : (variant === "brain" ? l1Form : l1Calm);
  const finalRadius2 = isHero ? radiusL2 : l2Calm;
  const finalRadius3 = isHero ? radiusL3 : l3Calm;

  // Parallax tracking
  const zOffsetLayer1 = useTransform(smoothMouseX, [0, 1], [0, 40]);
  const zOffsetLayer2 = useTransform(smoothMouseY, [0, 1], [-15, 15]);
  const zOffsetLayer3 = useTransform(smoothMouseX, [0, 1], [25, -25]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isFocus) return; // Disable heavy mouse tracking on focus pages to reduce overhead
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      className={`absolute inset-0 z-0 overflow-hidden [perspective:1200px] transition-colors duration-700 ${
        theme === "light" ? "bg-vaultAmber" : "bg-obsidian"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isFocus && isInteracting.set(1)}
      onMouseLeave={() => !isFocus && isInteracting.set(0)}
    >
<div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ opacity: baseOpacity }}>
      {/* Dynamic Cinematic Lighting System */}
      <motion.div 
        className={`absolute inset-0 pointer-events-none z-30 ${theme === "light" ? "mix-blend-multiply" : "mix-blend-screen"}`}
        style={{
          background: "rgba(255,255,255,0.03)"
        }}
      />
      
      {/* AMBIENT LIGHTING OVERLAY */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay"
        animate={motionEnabled ? { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] } : { backgroundPosition: "0% 0%" }}
        transition={motionEnabled ? { duration: 20 / speedMultiplier, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        style={{
          backgroundImage: theme === "light"
            ? "radial-gradient(ellipse at top left, rgba(17,17,17,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse at top left, rgba(102,102,102,0.14) 0%, transparent 70%)",
          backgroundSize: "200% 200%"
        }}
      />

      {/* CAMERA SYSTEM */}
      <motion.div 
        className="w-full h-full relative flex items-center justify-end transform-gpu pr-[10vw] overflow-hidden"
        style={{ 
          rotateX: cameraRotateX, 
          rotateY: cameraRotateY, 
          scale: finalCameraScale,
          y: transitionPanY,
          transformStyle: "preserve-3d" 
        }}
        animate={motionEnabled && !isFocus ? {
          x: ["-1%", "1%", "-1%"],
          y: ["-1%", "1%", "-1%"],
        } : {}}
        transition={motionEnabled ? {
          x: { duration: 15 / speedMultiplier, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 18 / speedMultiplier, repeat: Infinity, ease: "easeInOut" },
        } : { duration: 0 }}
      >
        {/* LAYER 1: Deep Background Field */}
        <motion.div
          className={`absolute right-0 w-[120vw] h-[140vh] opacity-[0.15] filter blur-[40px] ${
            theme === "light" ? "mix-blend-multiply bg-black/10" : "mix-blend-screen bg-vaultAmber"
          }`}
          style={{ translateZ: zOffsetLayer1, borderRadius: finalRadius1 }}
          animate={motionEnabled ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={motionEnabled ? { duration: 50 / speedMultiplier, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        />

        {/* LAYER 2: Midground Fabric — matte surface with a hairline edge.
            Glass and drop-shadow treatments were removed here per AGENTS.md §4.3/§4.5. */}
        <motion.div
          className={`absolute right-[-10vw] w-[80vw] h-[90vh] border-[1px] transition-colors duration-700 ${
            theme === "light" ? "mix-blend-multiply bg-black/5 border-black/10" : "mix-blend-screen bg-charcoal/5 border-vaultAmber/20"
          }`}
          style={{ translateZ: zOffsetLayer2, borderRadius: finalRadius2 }}
          animate={motionEnabled ? { rotate: [0, -360] } : { rotate: 0 }}
          transition={motionEnabled ? { duration: 45 / speedMultiplier, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        >
          <div className="absolute inset-0 rounded-[inherit] border border-t-vaultAmber/20 border-l-vaultAmber/10 border-b-transparent border-r-transparent mix-blend-overlay" />
        </motion.div>

        {/* LAYER 3: Foreground Structured Flow */}
        <motion.div
          className={`absolute right-[5vw] w-[60vw] h-[70vh] border-[1px] transition-colors duration-700 ${
            theme === "light" ? "mix-blend-normal bg-white/40 border-black/10" : "mix-blend-screen bg-obsidian/40 border-neonCyan/20"
          }`}
          style={{ translateZ: zOffsetLayer3, borderRadius: finalRadius3 }}
          animate={motionEnabled ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={motionEnabled ? { duration: 35 / speedMultiplier, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        >
           <div className={`absolute inset-0 mix-blend-overlay rounded-[inherit] ${
             theme === "light" ? "bg-black/5" : "bg-vaultAmber/10"
           }`} />
        </motion.div>

      </motion.div>
      </div>
    </div>
  );
}
