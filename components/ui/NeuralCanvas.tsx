"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  isAmber: boolean;
  depth: number;
}

type EffectTier = 0 | 1 | 2;

const PARTICLE_COUNT = 1800;
const MIN_ACTIVE_COUNT = 420;
const FRICTION = 0.965;
const FLOW_FORCE = 0.095;
const VORTEX_RADIUS = 180;
const TARGET_FRAME_MS = 1000 / 56;
const MAX_CANVAS_DPR = 1.6;
const GLOW_NODE_STEP = 7;
const ICE_BLUE_HEX = "#e6f2ff";
const SKY_BLUE_HEX = "#bcdcff";
const AZURE_BLUE_HEX = "#86b6ff";
const COBALT_BLUE_HEX = "#5f93f5";
const ICE_BLUE_RGB = "230, 242, 255";
const SKY_BLUE_RGB = "188, 220, 255";
const AZURE_BLUE_RGB = "134, 182, 255";
const COBALT_BLUE_RGB = "95, 147, 245";

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let mouseX: number | null = null;
    let mouseY: number | null = null;
    let activeCount = PARTICLE_COUNT;
    let amberCount = Math.floor(PARTICLE_COUNT * 0.05);
    let frameBudgetMs = TARGET_FRAME_MS;
    let glowNodeStep = GLOW_NODE_STEP;
    let shadowScale = 1;
    let effectTier: EffectTier = 2;
    let isInViewport = true;
    let lastFrameTime = 0;
    let hasInitialized = false;

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      (_, index) => {
        const x = Math.random();
        const y = Math.random();
        return {
          x,
          y,
          prevX: x,
          prevY: y,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          isAmber: index < PARTICLE_COUNT * 0.05,
          depth: Math.random(),
        };
      },
    );

    const applyQualityPreset = (nextTier: EffectTier, computedCount: number) => {
      effectTier = nextTier;
      if (nextTier === 0) {
        activeCount = Math.min(computedCount, 640);
        frameBudgetMs = 1000 / 42;
        glowNodeStep = Number.MAX_SAFE_INTEGER;
        shadowScale = 0.55;
      } else if (nextTier === 1) {
        activeCount = Math.min(computedCount, 1100);
        frameBudgetMs = 1000 / 52;
        glowNodeStep = 10;
        shadowScale = 0.8;
      } else {
        activeCount = computedCount;
        frameBudgetMs = TARGET_FRAME_MS;
        glowNodeStep = GLOW_NODE_STEP;
        shadowScale = 1;
      }
      amberCount = Math.max(1, Math.floor(activeCount * 0.05));
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const previousWidth = width;
      const previousHeight = height;
      const nativeDpr = window.devicePixelRatio || 1;
      const renderDpr = Math.min(nativeDpr, MAX_CANVAS_DPR);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * renderDpr));
      canvas.height = Math.max(1, Math.floor(height * renderDpr));
      context.setTransform(renderDpr, 0, 0, renderDpr, 0, 0);

      const pixelLoad = width * height * nativeDpr * nativeDpr;
      const nextTier: EffectTier =
        pixelLoad > 4_000_000 ? 0 : pixelLoad > 2_500_000 ? 1 : 2;

      const viewportRatio = Math.min(
        1,
        (Math.max(1, width) * Math.max(1, height)) / (1920 * 1080),
      );
      const densityPenalty = nativeDpr >= 2 ? 0.62 : nativeDpr >= 1.5 ? 0.75 : 1;
      const computedCount = Math.max(
        MIN_ACTIVE_COUNT,
        Math.min(
          PARTICLE_COUNT,
          Math.floor(PARTICLE_COUNT * viewportRatio * densityPenalty),
        ),
      );

      applyQualityPreset(nextTier, computedCount);

      if (!hasInitialized || previousWidth <= 0 || previousHeight <= 0) {
        for (let index = 0; index < particles.length; index += 1) {
          const particle = particles[index];
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.prevX = particle.x;
          particle.prevY = particle.y;
          particle.vx = (Math.random() - 0.5) * 0.45;
          particle.vy = (Math.random() - 0.5) * 0.45;
          particle.isAmber = index < amberCount;
          particle.depth = Math.random();
        }
        hasInitialized = true;
        return;
      }

      const ratioX = width / previousWidth;
      const ratioY = height / previousHeight;
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        particle.x *= ratioX;
        particle.y *= ratioY;
        particle.prevX *= ratioX;
        particle.prevY *= ratioY;
        particle.isAmber = index < amberCount;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.offsetX;
      mouseY = event.offsetY;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    const stopLoop = () => {
      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const animate = (timestamp: number) => {
      if (document.hidden || !isInViewport) {
        animationFrameId = 0;
        return;
      }

      const elapsedMs =
        lastFrameTime === 0 ? TARGET_FRAME_MS : timestamp - lastFrameTime;

      if (elapsedMs < frameBudgetMs) {
        animationFrameId = window.requestAnimationFrame(animate);
        return;
      }

      const deltaMs = Math.min(48, Math.max(12, elapsedMs));
      const deltaScale = deltaMs / TARGET_FRAME_MS;
      lastFrameTime = timestamp;
      const time = timestamp * 0.001;
      const pulse = 1 + Math.sin(time * 0.7) * 0.12;
      const useFarLayer = effectTier === 2;
      const useMidLayer = effectTier >= 1;
      const useGlowNodes = effectTier === 2;

      context.globalCompositeOperation = "destination-out";
      context.fillStyle =
        effectTier === 0
          ? "rgba(0, 0, 0, 0.10)"
          : effectTier === 1
            ? "rgba(0, 0, 0, 0.08)"
            : "rgba(0, 0, 0, 0.06)";
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "screen";
      context.lineCap = "round";

      const cyanNearPath = new Path2D();
      const amberNearPath = new Path2D();
      const cyanMidPath = useMidLayer ? new Path2D() : null;
      const amberMidPath = useMidLayer ? new Path2D() : null;
      const cyanFarPath = useFarLayer ? new Path2D() : null;
      const amberFarPath = useFarLayer ? new Path2D() : null;
      const cyanNodes = useGlowNodes ? new Path2D() : null;
      const amberNodes = useGlowNodes ? new Path2D() : null;

      for (let index = 0; index < activeCount; index += 1) {
        const particle = particles[index];
        particle.prevX = particle.x;
        particle.prevY = particle.y;

        const depthVelocity = effectTier === 0 ? 1 : 0.82 + particle.depth * 0.4;
        const angle =
          (Math.sin(particle.x * 0.005 + time) +
            Math.cos(particle.y * 0.005 + time)) *
          Math.PI *
          2;

        particle.vx += Math.cos(angle) * FLOW_FORCE * depthVelocity * deltaScale;
        particle.vy += Math.sin(angle) * FLOW_FORCE * depthVelocity * deltaScale;

        if (effectTier > 0) {
          particle.vx +=
            Math.sin(time * 0.5 + particle.y * 0.0025) * 0.012 * deltaScale;
          particle.vy +=
            Math.cos(time * 0.45 + particle.x * 0.0025) * 0.012 * deltaScale;
        }

        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.hypot(dx, dy);
          if (distance < VORTEX_RADIUS && distance > 0.0001) {
            const influence = (VORTEX_RADIUS - distance) / VORTEX_RADIUS;
            const tangentX = -dy / distance;
            const tangentY = dx / distance;
            particle.vx += tangentX * influence * 0.36 * deltaScale;
            particle.vy += tangentY * influence * 0.36 * deltaScale;
          }
        }

        const drag = Math.pow(FRICTION, deltaScale);
        particle.vx *= drag;
        particle.vy *= drag;
        particle.x += particle.vx * deltaScale;
        particle.y += particle.vy * deltaScale;

        if (particle.x < 0) {
          particle.x += width;
          particle.prevX = particle.x;
        } else if (particle.x > width) {
          particle.x -= width;
          particle.prevX = particle.x;
        }

        if (particle.y < 0) {
          particle.y += height;
          particle.prevY = particle.y;
        } else if (particle.y > height) {
          particle.y -= height;
          particle.prevY = particle.y;
        }

        if (particle.isAmber) {
          if (useFarLayer && particle.depth < 0.33 && amberFarPath) {
            amberFarPath.moveTo(particle.prevX, particle.prevY);
            amberFarPath.lineTo(particle.x, particle.y);
          } else if (useMidLayer && particle.depth < 0.67 && amberMidPath) {
            amberMidPath.moveTo(particle.prevX, particle.prevY);
            amberMidPath.lineTo(particle.x, particle.y);
          } else {
            amberNearPath.moveTo(particle.prevX, particle.prevY);
            amberNearPath.lineTo(particle.x, particle.y);
          }
          if (amberNodes && particle.depth > 0.62 && index % glowNodeStep === 0) {
            amberNodes.moveTo(particle.x + 1.7, particle.y);
            amberNodes.arc(particle.x, particle.y, 1.7, 0, Math.PI * 2);
          }
        } else {
          if (useFarLayer && particle.depth < 0.33 && cyanFarPath) {
            cyanFarPath.moveTo(particle.prevX, particle.prevY);
            cyanFarPath.lineTo(particle.x, particle.y);
          } else if (useMidLayer && particle.depth < 0.67 && cyanMidPath) {
            cyanMidPath.moveTo(particle.prevX, particle.prevY);
            cyanMidPath.lineTo(particle.x, particle.y);
          } else {
            cyanNearPath.moveTo(particle.prevX, particle.prevY);
            cyanNearPath.lineTo(particle.x, particle.y);
          }
          if (cyanNodes && particle.depth > 0.62 && index % glowNodeStep === 0) {
            cyanNodes.moveTo(particle.x + 1.45, particle.y);
            cyanNodes.arc(particle.x, particle.y, 1.45, 0, Math.PI * 2);
          }
        }
      }

      if (useFarLayer && cyanFarPath && amberFarPath) {
        context.shadowColor = ICE_BLUE_HEX;
        context.shadowBlur = 5 * shadowScale;
        context.strokeStyle = `rgba(${ICE_BLUE_RGB}, ${0.09 * pulse})`;
        context.lineWidth = 0.6 * shadowScale;
        context.stroke(cyanFarPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${SKY_BLUE_RGB}, ${0.16 * pulse})`;
        context.lineWidth = 0.46 * shadowScale;
        context.stroke(cyanFarPath);

        context.shadowColor = SKY_BLUE_HEX;
        context.shadowBlur = 7 * shadowScale;
        context.strokeStyle = `rgba(${SKY_BLUE_RGB}, ${0.18 * pulse})`;
        context.lineWidth = 0.72 * shadowScale;
        context.stroke(amberFarPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${AZURE_BLUE_RGB}, ${0.29 * pulse})`;
        context.lineWidth = 0.52 * shadowScale;
        context.stroke(amberFarPath);
      }

      if (useMidLayer && cyanMidPath && amberMidPath) {
        context.shadowColor = SKY_BLUE_HEX;
        context.shadowBlur = 7 * shadowScale;
        context.strokeStyle = `rgba(${SKY_BLUE_RGB}, ${0.11 * pulse})`;
        context.lineWidth = 0.78 * shadowScale;
        context.stroke(cyanMidPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${AZURE_BLUE_RGB}, ${0.19 * pulse})`;
        context.lineWidth = 0.58 * shadowScale;
        context.stroke(cyanMidPath);

        context.shadowColor = AZURE_BLUE_HEX;
        context.shadowBlur = 8 * shadowScale;
        context.strokeStyle = `rgba(${AZURE_BLUE_RGB}, ${0.23 * pulse})`;
        context.lineWidth = 0.96 * shadowScale;
        context.stroke(amberMidPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${COBALT_BLUE_RGB}, ${0.38 * pulse})`;
        context.lineWidth = 0.66 * shadowScale;
        context.stroke(amberMidPath);
      }

      if (effectTier === 0) {
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${AZURE_BLUE_RGB}, ${0.22 * pulse})`;
        context.lineWidth = 0.62 * shadowScale;
        context.stroke(cyanNearPath);
        context.strokeStyle = `rgba(${COBALT_BLUE_RGB}, ${0.42 * pulse})`;
        context.lineWidth = 0.68 * shadowScale;
        context.stroke(amberNearPath);
      } else {
        context.shadowColor = AZURE_BLUE_HEX;
        context.shadowBlur = 8 * shadowScale;
        context.strokeStyle = `rgba(${AZURE_BLUE_RGB}, ${0.16 * pulse})`;
        context.lineWidth = 1.15 * shadowScale;
        context.stroke(cyanNearPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${COBALT_BLUE_RGB}, ${0.27 * pulse})`;
        context.lineWidth = 0.75 * shadowScale;
        context.stroke(cyanNearPath);

        context.shadowColor = COBALT_BLUE_HEX;
        context.shadowBlur = 10 * shadowScale;
        context.strokeStyle = `rgba(${COBALT_BLUE_RGB}, ${0.31 * pulse})`;
        context.lineWidth = 1.24 * shadowScale;
        context.stroke(amberNearPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${ICE_BLUE_RGB}, ${0.44 * pulse})`;
        context.lineWidth = 0.74 * shadowScale;
        context.stroke(amberNearPath);

        if (cyanNodes && amberNodes) {
          context.shadowColor = SKY_BLUE_HEX;
          context.shadowBlur = 10 * shadowScale;
          context.fillStyle = `rgba(${SKY_BLUE_RGB}, ${0.26 * pulse})`;
          context.fill(cyanNodes);

          context.shadowColor = COBALT_BLUE_HEX;
          context.shadowBlur = 12 * shadowScale;
          context.fillStyle = `rgba(${AZURE_BLUE_RGB}, ${0.38 * pulse})`;
          context.fill(amberNodes);
        }
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (animationFrameId === 0 && !document.hidden && isInViewport) {
        lastFrameTime = 0;
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isInViewport = Boolean(entries[0]?.isIntersecting);
        if (isInViewport) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.06 },
    );
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (isInViewport && !document.hidden) {
        startLoop();
      }
    });

    resizeCanvas();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    startLoop();

    window.addEventListener("resize", resizeCanvas, { passive: true });
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopLoop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />;
}
