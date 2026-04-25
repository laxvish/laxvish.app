"use client";

import { animate } from "animejs";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Query,
  Vector,
  type Body as MatterBody,
  type IEventCollision,
} from "matter-js";
import { useEffect, useRef, useState } from "react";

interface BlobMeta {
  body: MatterBody;
  radius: number;
  sides: number;
  corner: number;
  glow: number;
  tint: [number, number, number];
  targetTint: [number, number, number];
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

const LAYER_DPR_CAP = 1.5;
const MOBILE_BLOB_COUNT = 8;
const DESKTOP_BLOB_COUNT = 12;
const RESTITUTION = 0.95;
const AIR_FRICTION = 0.006;
const BROWNIAN_FORCE = 0.00013;
const MAX_RIPPLES = 18;
const POINTER_BURST_COOLDOWN_MS = 120;
const COLLISION_ANIMATION_COOLDOWN_MS = 120;
const BLOB_PALETTE: Array<[number, number, number]> = [
  [226, 214, 242],
  [178, 212, 246],
  [236, 198, 206],
  [208, 227, 216],
  [230, 222, 194],
  [188, 220, 228],
  [232, 208, 240],
  [245, 209, 179],
  [198, 214, 247],
  [214, 237, 203],
  [241, 209, 223],
  [201, 233, 238],
];

function lerp(current: number, target: number, amount: number): number {
  return current + (target - current) * amount;
}

function blendTint(
  a: [number, number, number],
  b: [number, number, number],
  weight: number,
): [number, number, number] {
  return [
    lerp(a[0], b[0], weight),
    lerp(a[1], b[1], weight),
    lerp(a[2], b[2], weight),
  ];
}

function tintToRgba(tint: [number, number, number], alpha: number): string {
  return `rgba(${Math.round(tint[0])}, ${Math.round(tint[1])}, ${Math.round(tint[2])}, ${alpha})`;
}

function drawBlob(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  sides: number,
  corner: number,
  rotation: number,
): void {
  const sideCount = Math.max(3, Math.round(sides));
  const vertices: Array<{ x: number; y: number }> = [];
  for (let index = 0; index < sideCount; index += 1) {
    const angle = rotation + (Math.PI * 2 * index) / sideCount;
    vertices.push({
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius,
    });
  }

  context.beginPath();
  for (let index = 0; index < vertices.length; index += 1) {
    const prev = vertices[(index + vertices.length - 1) % vertices.length];
    const current = vertices[index];
    const next = vertices[(index + 1) % vertices.length];
    const inX = current.x + (prev.x - current.x) * corner;
    const inY = current.y + (prev.y - current.y) * corner;
    const outX = current.x + (next.x - current.x) * corner;
    const outY = current.y + (next.y - current.y) * corner;

    if (index === 0) {
      context.moveTo(inX, inY);
    } else {
      context.lineTo(inX, inY);
    }
    context.quadraticCurveTo(current.x, current.y, outX, outY);
  }
  context.closePath();
}

export function LivingPaintingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLCanvasElement>(null);
  const midRef = useRef<HTMLCanvasElement>(null);
  const foreRef = useRef<HTMLCanvasElement>(null);
  const filterRef = useRef<SVGFEDisplacementMapElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const farLayer = farRef.current;
    const midLayer = midRef.current;
    const foreLayer = foreRef.current;
    if (!container || !farLayer || !midLayer || !foreLayer) {
      return;
    }

    const farContext = farLayer.getContext("2d", { alpha: true, desynchronized: true });
    const midContext = midLayer.getContext("2d", { alpha: true, desynchronized: true });
    const foreContext = foreLayer.getContext("2d", { alpha: true, desynchronized: true });
    if (!farContext || !midContext || !foreContext) {
      return;
    }

    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
      positionIterations: 8,
      velocityIterations: 7,
    });

    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let lastTime = 0;
    let isLoopRunning = false;
    let mousePosition: Vector | null = null;
    let lastPointerDown = 0;
    const flash = { value: 0 };
    const distortion = { value: 0 };
    const ripples: Ripple[] = [];
    const blobs: BlobMeta[] = [];
    const collisionCooldownByPair = new Map<string, number>();

    const syncFilter = () => {
      const filter = filterRef.current;
      if (!filter) {
        return;
      }
      filter.setAttribute("scale", distortion.value.toFixed(2));
    };

    const resizeLayers = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, LAYER_DPR_CAP);
      const canvases = [farLayer, midLayer, foreLayer];

      for (const canvas of canvases) {
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
      }
      farContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      midContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      foreContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedBodies = () => {
      const blobCount = width < 640 ? MOBILE_BLOB_COUNT : DESKTOP_BLOB_COUNT;
      const minDimension = Math.min(width, height);

      for (let index = 0; index < blobCount; index += 1) {
        const radius = minDimension * (0.045 + (index % 4) * 0.008 + Math.random() * 0.01);
        const orbit = (Math.PI * 2 * index) / blobCount;
        const x =
          width * 0.5 +
          Math.cos(orbit) * width * 0.26 +
          (Math.random() - 0.5) * width * 0.16;
        const y =
          height * 0.5 +
          Math.sin(orbit) * height * 0.24 +
          (Math.random() - 0.5) * height * 0.14;
        const body = Bodies.circle(
          Math.max(radius + 10, Math.min(width - radius - 10, x)),
          Math.max(radius + 10, Math.min(height - radius - 10, y)),
          radius,
          {
            restitution: RESTITUTION,
            frictionAir: AIR_FRICTION,
            friction: 0.001,
            frictionStatic: 0.001,
            slop: 0.02,
          },
        );
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 1.8,
          y: (Math.random() - 0.5) * 1.8,
        });
        Composite.add(engine.world, body);
        blobs.push({
          body,
          radius,
          sides: 3 + (index % 5),
          corner: 0.36,
          glow: 0.22,
          tint: BLOB_PALETTE[index % BLOB_PALETTE.length],
          targetTint: BLOB_PALETTE[index % BLOB_PALETTE.length],
        });
      }
    };

    const createRipple = (x: number, y: number, velocity: number) => {
      if (ripples.length >= MAX_RIPPLES) {
        ripples.shift();
      }
      const ripple: Ripple = { x, y, radius: 0, alpha: 0.5 };
      ripples.push(ripple);
      if (prefersReducedMotion) {
        ripple.radius = Math.min(width, height) * 0.18;
        ripple.alpha = 0.18;
        return;
      }
      animate(ripple, {
        radius: [0, Math.min(width, height) * 0.46 * Math.min(1.4, velocity / 4)],
        alpha: [0.5, 0],
        duration: 760,
        ease: "outCubic",
        onComplete: () => {
          const index = ripples.indexOf(ripple);
          if (index >= 0) {
            ripples.splice(index, 1);
          }
        },
      });
      animate(distortion, {
        value: [10, 0],
        duration: 680,
        ease: "outExpo",
        onUpdate: syncFilter,
      });
    };

    const onCollisionStart = (event: IEventCollision<Engine>) => {
      for (const pair of event.pairs) {
        const left = blobs.find((item) => item.body.id === pair.bodyA.id);
        const right = blobs.find((item) => item.body.id === pair.bodyB.id);
        if (!left || !right) {
          continue;
        }
        const now = performance.now();
        const pairKey =
          pair.bodyA.id < pair.bodyB.id
            ? `${pair.bodyA.id}:${pair.bodyB.id}`
            : `${pair.bodyB.id}:${pair.bodyA.id}`;
        const lastAnimatedAt = collisionCooldownByPair.get(pairKey) ?? 0;
        if (now - lastAnimatedAt < COLLISION_ANIMATION_COOLDOWN_MS) {
          continue;
        }
        collisionCooldownByPair.set(pairKey, now);
        if (collisionCooldownByPair.size > 220) {
          for (const [key, value] of collisionCooldownByPair) {
            if (now - value > 900) {
              collisionCooldownByPair.delete(key);
            }
          }
        }

        const impact = pair.collision.depth + pair.collision.penetration.x ** 2 + pair.collision.penetration.y ** 2;
        const speed = Math.max(
          pair.bodyA.speed,
          pair.bodyB.speed,
          Math.sqrt(Math.max(0, impact)) * 7,
        );
        const sharedTint = blendTint(left.tint, right.tint, 0.5);
        left.targetTint = blendTint(left.targetTint, right.tint, 0.56);
        right.targetTint = blendTint(right.targetTint, left.tint, 0.56);
        left.targetTint = blendTint(left.targetTint, sharedTint, 0.2);
        right.targetTint = blendTint(right.targetTint, sharedTint, 0.2);

        const impactCorner = Math.min(0.48, 0.22 + speed * 0.03);
        left.corner = impactCorner;
        right.corner = impactCorner;
        left.sides = speed > 5 ? 3 + Math.floor(Math.random() * 4) : left.sides;
        right.sides = speed > 5 ? 3 + Math.floor(Math.random() * 4) : right.sides;
        left.glow = Math.min(0.82, left.glow + 0.23);
        right.glow = Math.min(0.82, right.glow + 0.23);

        animate(left, { corner: [impactCorner, 0.34], duration: 700, ease: "outQuad" });
        animate(right, { corner: [impactCorner, 0.34], duration: 700, ease: "outQuad" });
        createRipple(pair.collision.supports[0].x, pair.collision.supports[0].y, speed);
      }
    };

    const applyBrownianMotion = () => {
      if (!isLoopRunning) {
        return;
      }
      for (const blob of blobs) {
        Body.applyForce(blob.body, blob.body.position, {
          x: (Math.random() - 0.5) * BROWNIAN_FORCE,
          y: (Math.random() - 0.5) * BROWNIAN_FORCE,
        });
      }
    };

    const applyMouseMagnet = () => {
      if (!mousePosition) {
        return;
      }

      for (const blob of blobs) {
        const direction = Vector.sub(mousePosition, blob.body.position);
        const distance = Math.max(14, Vector.magnitude(direction));
        const influence = Math.max(0, 1 - distance / 340);
        if (influence <= 0) {
          continue;
        }

        const normal = Vector.mult(Vector.normalise(direction), 0.000028 * influence);
        const tangent = Vector.create(-normal.y * 0.42, normal.x * 0.42);
        Body.applyForce(blob.body, blob.body.position, {
          x: normal.x + tangent.x,
          y: normal.y + tangent.y,
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosition = Vector.create(event.clientX - rect.left, event.clientY - rect.top);
    };

    const handlePointerLeave = () => {
      mousePosition = null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isTrusted) {
        return;
      }
      const now = performance.now();
      if (now - lastPointerDown < POINTER_BURST_COOLDOWN_MS) {
        return;
      }
      lastPointerDown = now;

      const rect = container.getBoundingClientRect();
      const center = Vector.create(event.clientX - rect.left, event.clientY - rect.top);
      const nearby = Query.region(
        Composite.allBodies(engine.world),
        {
          min: { x: center.x - 220, y: center.y - 220 },
          max: { x: center.x + 220, y: center.y + 220 },
        },
        false,
      );

      for (const body of nearby) {
        const ray = Vector.sub(body.position, center);
        const distance = Math.max(24, Vector.magnitude(ray));
        const burst = Vector.mult(Vector.normalise(ray), 0.00072 / (distance / 130));
        Body.applyForce(body, body.position, burst);
      }

      if (!prefersReducedMotion) {
        animate(flash, { value: [0.55, 0], duration: 420, ease: "outCubic" });
      }
      createRipple(center.x, center.y, 7.2);
    };

    const drawScene = () => {
      farContext.clearRect(0, 0, width, height);
      midContext.clearRect(0, 0, width, height);
      foreContext.clearRect(0, 0, width, height);

      farContext.filter = "blur(16px)";
      midContext.filter = "none";
      foreContext.filter = "none";

      for (const blob of blobs) {
        blob.tint = blendTint(blob.tint, blob.targetTint, prefersReducedMotion ? 0.01 : 0.017);
        blob.glow = lerp(blob.glow, 0.2, 0.03);
        const position = blob.body.position;
        const rotation = blob.body.angle;

        drawBlob(
          farContext,
          position.x,
          position.y,
          blob.radius * 1.17,
          blob.sides,
          blob.corner,
          rotation,
        );
        farContext.fillStyle = tintToRgba(blob.tint, 0.21);
        farContext.fill();

        drawBlob(
          midContext,
          position.x,
          position.y,
          blob.radius,
          blob.sides,
          blob.corner,
          rotation,
        );
        midContext.fillStyle = tintToRgba(blob.tint, 0.34);
        midContext.fill();
        midContext.strokeStyle = tintToRgba(blob.targetTint, 0.45);
        midContext.lineWidth = 1.2;
        midContext.stroke();

        foreContext.beginPath();
        foreContext.arc(position.x, position.y, blob.radius * (0.72 + blob.glow * 0.35), 0, Math.PI * 2);
        foreContext.fillStyle = tintToRgba(blob.tint, 0.09 + blob.glow * 0.08);
        foreContext.fill();
      }

      for (const ripple of ripples) {
        foreContext.beginPath();
        foreContext.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        foreContext.strokeStyle = `rgba(242, 242, 242, ${ripple.alpha})`;
        foreContext.lineWidth = 1.6;
        foreContext.stroke();
      }

      if (flash.value > 0.001) {
        foreContext.fillStyle = `rgba(242, 242, 242, ${flash.value * 0.6})`;
        foreContext.fillRect(0, 0, width, height);
      }
    };

    const render = (timestamp: number) => {
      const delta = Math.min(32, Math.max(12, timestamp - (lastTime || timestamp - 16)));
      lastTime = timestamp;
      Engine.update(engine, delta);
      applyMouseMagnet();
      drawScene();
      if (isLoopRunning) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const startLoop = () => {
      if (isLoopRunning || prefersReducedMotion) {
        return;
      }
      isLoopRunning = true;
      rafId = window.requestAnimationFrame(render);
    };

    resizeLayers();
    seedBodies();
    let brownianTimer: number | null = null;

    if (prefersReducedMotion) {
      drawScene();
    } else {
      Events.on(engine, "collisionStart", onCollisionStart);
      brownianTimer = window.setInterval(applyBrownianMotion, 1300);
      startLoop();
      container.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("pointerleave", handlePointerLeave);
      container.addEventListener("pointerdown", handlePointerDown);
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeLayers();
      if (prefersReducedMotion || !isLoopRunning) {
        drawScene();
      }
    });
    resizeObserver.observe(container);

    return () => {
      stopLoop();
      if (brownianTimer !== null) {
        window.clearInterval(brownianTimer);
      }
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointerdown", handlePointerDown);
      if (!prefersReducedMotion) {
        Events.off(engine, "collisionStart", onCollisionStart);
      }
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="hero-void absolute inset-0" aria-hidden>
      <svg className="absolute h-0 w-0">
        <filter id="living-paint-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={2} seed={12} result="noise" />
          <feDisplacementMap
            ref={filterRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div className="hero-void-mesh absolute inset-0" />
      <canvas ref={farRef} className="absolute inset-0 h-full w-full" style={{ filter: "url(#living-paint-distortion)" }} />
      <canvas ref={midRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={foreRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
