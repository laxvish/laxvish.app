import { getPrismaClient } from "@/lib/prisma";
import type { LeadVaultRecord } from "@/lib/enterpriseVault";

interface LeadSyncPayload {
  record: LeadVaultRecord;
}

function isLeadVaultRecord(value: unknown): value is LeadVaultRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    candidate.source === "website-terminal" &&
    typeof candidate.identityHash === "string" &&
    typeof candidate.userAgent === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.workEmail === "string" &&
    typeof candidate.company === "string" &&
    typeof candidate.useCase === "string" &&
    typeof candidate.action === "string" &&
    candidate.action.trim().length > 0
  );
}

export function validateLeadSyncPayload(payload: unknown): LeadSyncPayload | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidate = payload as Record<string, unknown>;
  if (!isLeadVaultRecord(candidate.record)) {
    return null;
  }

  return { record: candidate.record };
}

export async function syncLeadRecordToDatabase(record: LeadVaultRecord): Promise<void> {
  const prisma = getPrismaClient();
  if (!prisma) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const metadata = JSON.stringify({
    action: record.action,
    source: record.source,
    userAgent: record.userAgent,
  });

  await prisma.lead.upsert({
    where: { id: record.id },
    create: {
      id: record.id,
      name: record.name,
      workEmail: record.workEmail,
      company: record.company,
      useCase: record.useCase,
      action: record.action,
      status: "pending",
      identity: record.identityHash,
      source: "website",
      metadata,
      createdAt: new Date(record.createdAt),
    },
    update: {
      name: record.name,
      workEmail: record.workEmail,
      company: record.company,
      useCase: record.useCase,
      action: record.action,
      identity: record.identityHash,
      source: "website",
      metadata,
    },
  });
}

function resolveWebhookUrl(): string | null {
  return process.env.LEAD_SYNC_WEBHOOK_URL ?? null;
}

export async function sendLeadSyncWebhook(record: LeadVaultRecord): Promise<boolean> {
  const secret = process.env.LEAD_SYNC_SECRET;
  const url = resolveWebhookUrl();

  if (!secret || !url) {
    return false;
  }

  const body = JSON.stringify({ record });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-lead-sync-secret": secret,
      },
      body,
    });

    if (!response.ok) {
      console.error(`Lead sync webhook failed with status ${response.status}.`);
      return false;
    }

    return true;
  } catch (error: unknown) {
    console.error("Lead sync webhook request failed.", error);
    return false;
  }
}
