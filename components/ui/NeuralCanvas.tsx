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

const PARTICLE_COUNT = 800;
const MIN_ACTIVE_COUNT = 180;
const FRICTION = 0.95;
const FLOW_FORCE = 0.05;
const VORTEX_RADIUS = 180;
const TARGET_FRAME_MS = 1000 / 48;
const MAX_CANVAS_DPR = 1.6;
const GLOW_NODE_STEP = 7;

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
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          isAmber: index < PARTICLE_COUNT * 0.05,
          depth: Math.random(),
        };
      },
    );

    const applyQualityPreset = (nextTier: EffectTier, computedCount: number) => {
      effectTier = nextTier;
      if (nextTier === 0) {
        activeCount = Math.min(computedCount, 320);
        frameBudgetMs = 1000 / 32;
        glowNodeStep = Number.MAX_SAFE_INTEGER;
        shadowScale = 0.55;
      } else if (nextTier === 1) {
        activeCount = Math.min(computedCount, 520);
        frameBudgetMs = 1000 / 42;
        glowNodeStep = 18;
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

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.prevX = particle.x;
        particle.prevY = particle.y;
        particle.vx = 0;
        particle.vy = 0;
        particle.isAmber = index < amberCount;
        particle.depth = Math.random();
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

      if (timestamp - lastFrameTime < frameBudgetMs) {
        animationFrameId = window.requestAnimationFrame(animate);
        return;
      }

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

        particle.vx += Math.cos(angle) * FLOW_FORCE * depthVelocity;
        particle.vy += Math.sin(angle) * FLOW_FORCE * depthVelocity;

        if (effectTier > 0) {
          particle.vx += Math.sin(time * 0.5 + particle.y * 0.0025) * 0.01;
          particle.vy += Math.cos(time * 0.45 + particle.x * 0.0025) * 0.01;
        }

        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.hypot(dx, dy);
          if (distance < VORTEX_RADIUS && distance > 0.0001) {
            const influence = (VORTEX_RADIUS - distance) / VORTEX_RADIUS;
            const tangentX = -dy / distance;
            const tangentY = dx / distance;
            particle.vx += tangentX * influence * 0.32;
            particle.vy += tangentY * influence * 0.32;
          }
        }

        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;

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
            amberNodes.moveTo(particle.x + 1.2, particle.y);
            amberNodes.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2);
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
            cyanNodes.moveTo(particle.x + 1.05, particle.y);
            cyanNodes.arc(particle.x, particle.y, 1.05, 0, Math.PI * 2);
          }
        }
      }

      if (useFarLayer && cyanFarPath && amberFarPath) {
        context.shadowColor = "#00F0FF";
        context.shadowBlur = 5 * shadowScale;
        context.strokeStyle = `rgba(0, 240, 255, ${0.06 * pulse})`;
        context.lineWidth = 0.45 * shadowScale;
        context.stroke(cyanFarPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(0, 240, 255, ${0.11 * pulse})`;
        context.lineWidth = 0.34 * shadowScale;
        context.stroke(cyanFarPath);

        context.shadowColor = "#FFB800";
        context.shadowBlur = 7 * shadowScale;
        context.strokeStyle = `rgba(255, 184, 0, ${0.14 * pulse})`;
        context.lineWidth = 0.54 * shadowScale;
        context.stroke(amberFarPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(255, 184, 0, ${0.24 * pulse})`;
        context.lineWidth = 0.38 * shadowScale;
        context.stroke(amberFarPath);
      }

      if (useMidLayer && cyanMidPath && amberMidPath) {
        context.shadowColor = "#00F0FF";
        context.shadowBlur = 7 * shadowScale;
        context.strokeStyle = `rgba(0, 240, 255, ${0.08 * pulse})`;
        context.lineWidth = 0.62 * shadowScale;
        context.stroke(cyanMidPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(0, 240, 255, ${0.14 * pulse})`;
        context.lineWidth = 0.45 * shadowScale;
        context.stroke(cyanMidPath);

        context.shadowColor = "#FFB800";
        context.shadowBlur = 8 * shadowScale;
        context.strokeStyle = `rgba(255, 184, 0, ${0.18 * pulse})`;
        context.lineWidth = 0.82 * shadowScale;
        context.stroke(amberMidPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(255, 184, 0, ${0.32 * pulse})`;
        context.lineWidth = 0.5 * shadowScale;
        context.stroke(amberMidPath);
      }

      if (effectTier === 0) {
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(0, 240, 255, ${0.16 * pulse})`;
        context.lineWidth = 0.48 * shadowScale;
        context.stroke(cyanNearPath);
        context.strokeStyle = `rgba(255, 184, 0, ${0.34 * pulse})`;
        context.lineWidth = 0.52 * shadowScale;
        context.stroke(amberNearPath);
      } else {
        context.shadowColor = "#00F0FF";
        context.shadowBlur = 8 * shadowScale;
        context.strokeStyle = `rgba(0, 240, 255, ${0.11 * pulse})`;
        context.lineWidth = 0.92 * shadowScale;
        context.stroke(cyanNearPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(0, 240, 255, ${0.2 * pulse})`;
        context.lineWidth = 0.6 * shadowScale;
        context.stroke(cyanNearPath);

        context.shadowColor = "#FFB800";
        context.shadowBlur = 10 * shadowScale;
        context.strokeStyle = `rgba(255, 184, 0, ${0.24 * pulse})`;
        context.lineWidth = 1.02 * shadowScale;
        context.stroke(amberNearPath);
        context.shadowBlur = 0;
        context.strokeStyle = `rgba(255, 184, 0, ${0.44 * pulse})`;
        context.lineWidth = 0.6 * shadowScale;
        context.stroke(amberNearPath);

        if (cyanNodes && amberNodes) {
          context.shadowColor = "#00F0FF";
          context.shadowBlur = 10 * shadowScale;
          context.fillStyle = `rgba(0, 240, 255, ${0.2 * pulse})`;
          context.fill(cyanNodes);

          context.shadowColor = "#FFB800";
          context.shadowBlur = 12 * shadowScale;
          context.fillStyle = `rgba(255, 184, 0, ${0.3 * pulse})`;
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
