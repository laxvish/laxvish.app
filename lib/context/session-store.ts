import { getPrismaClient } from "@/lib/prisma";
import type { LaxvishContextGraph, LaxvishEvent, NarrativeMoment } from "./types.ts";
import crypto from "crypto";

declare global {
  // In-memory hot cache for zero-latency lookups & offline fallback
  var contextSessionMemory: Map<string, LaxvishContextGraph> | undefined;
}

const sessionStore = globalThis.contextSessionMemory || new Map<string, LaxvishContextGraph>();
if (!globalThis.contextSessionMemory) {
  globalThis.contextSessionMemory = sessionStore;
}

export function getSessionFromMemory(sessionId: string): LaxvishContextGraph | undefined {
  return sessionStore.get(sessionId);
}

export function saveSessionToMemory(sessionId: string, graph: LaxvishContextGraph): void {
  // Simple LRU-style prune if store exceeds 5000 sessions
  if (sessionStore.size > 5000) {
    const firstKey = sessionStore.keys().next().value;
    if (firstKey) sessionStore.delete(firstKey);
  }
  sessionStore.set(sessionId, graph);
}

/**
 * Hash IP address with salt to respect DPDP privacy
 */
export function hashIpAddress(ip?: string): string | undefined {
  if (!ip || ip === "::1" || ip === "127.0.0.1") return undefined;
  const salt = process.env.SESSION_SECRET || "laxvish_salt_2026";
  return crypto.createHmac("sha256", salt).update(ip).digest("hex");
}

/**
 * Persist or update session to PostgreSQL via Prisma with graceful fallback
 */
export async function persistContextSession(graph: LaxvishContextGraph, clientIp?: string): Promise<void> {
  // 1. Hot memory save
  saveSessionToMemory(graph.sessionId, graph);

  // 2. Async Prisma DB save
  const prisma = getPrismaClient();
  if (!prisma) return;

  try {
    const ipHash = hashIpAddress(clientIp);

    await prisma.contextSession.upsert({
      where: { id: graph.sessionId },
      create: {
        id: graph.sessionId,
        anonymousVisitorId: graph.anonymousVisitorId,
        ipHash,
        isReturning: graph.isReturning,
        technicalJson: JSON.stringify(graph.technical),
        temporalJson: JSON.stringify(graph.temporal),
        environmentJson: JSON.stringify(graph.environment),
        behaviorJson: JSON.stringify(graph.behavior),
        directJson: JSON.stringify(graph.direct),
      },
      update: {
        isReturning: graph.isReturning,
        technicalJson: JSON.stringify(graph.technical),
        temporalJson: JSON.stringify(graph.temporal),
        environmentJson: JSON.stringify(graph.environment),
        behaviorJson: JSON.stringify(graph.behavior),
        directJson: JSON.stringify(graph.direct),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Context DB Persistence Error (Non-blocking)]", error);
  }
}

/**
 * Persists a batch of events to PostgreSQL
 */
export async function persistEvents(sessionId: string, events: LaxvishEvent[]): Promise<void> {
  const prisma = getPrismaClient();
  if (!prisma || events.length === 0) return;

  try {
    await prisma.sessionEvent.createMany({
      data: events.map((e) => ({
        id: e.id || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        sessionId,
        type: e.type,
        section: e.section || null,
        value: typeof e.value === "string" ? e.value : JSON.stringify(e.value),
        metadata: e.metadata ? JSON.stringify(e.metadata) : "{}",
        timestamp: new Date(e.timestamp || Date.now()),
      })),
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("[Events DB Persistence Error (Non-blocking)]", error);
  }
}

/**
 * Persists a generated narrative moment
 */
export async function persistNarrativeMoment(
  sessionId: string,
  moment: NarrativeMoment,
  modelTier: string = "poolside/laguna-xs-2.1",
  latencyMs: number = 0
): Promise<void> {
  const prisma = getPrismaClient();
  if (!prisma) return;

  try {
    await prisma.narrativeGeneration.create({
      data: {
        sessionId,
        stage: moment.stage,
        modelTier,
        promptVersion: "v1.0",
        narrativeText: moment.text,
        confidence: moment.confidence,
        evidenceJson: JSON.stringify(moment.evidenceUsed),
        isFallback: moment.isFallback,
        latencyMs,
      },
    });
  } catch (error) {
    console.error("[Narrative DB Persistence Error (Non-blocking)]", error);
  }
}
