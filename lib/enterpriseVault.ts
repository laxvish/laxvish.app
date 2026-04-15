import { getPrismaClient } from "@/lib/prisma";

export type LeadCaptureAction = string;

export interface LeadVaultInsert {
  name: string;
  workEmail: string;
  company: string;
  useCase: string;
  action: LeadCaptureAction;
}

export interface LeadVaultRecord extends LeadVaultInsert {
  id: string;
  createdAt: string;
  source: "website-terminal";
  identityHash: string;
  userAgent: string;
}

interface ValidationSuccess {
  success: true;
  data: LeadVaultInsert;
}

interface ValidationFailure {
  success: false;
  errors: string[];
}

export type LeadVaultValidationResult = ValidationSuccess | ValidationFailure;

export const ENTERPRISE_VAULT_SCHEMA = {
  table: "enterprise_lead_vault",
  version: "2026-04-v1",
  fields: {
    id: "uuid",
    createdAt: "iso-datetime",
    source: "enum(website-terminal)",
    identityHash: "sha-256",
    userAgent: "string(<=256)",
    name: "string(2-80)",
    workEmail: "email",
    company: "string(2-120)",
    useCase: "string(10-1000)",
    action: "string(1-64)",
  },
} as const;

const MAX_NAME_LENGTH = 80;
const MAX_COMPANY_LENGTH = 120;
const MAX_USE_CASE_LENGTH = 1000;
const MAX_ACTION_LENGTH = 64;
const MAX_USER_AGENT_LENGTH = 256;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

declare global {
  var leadVaultMemory: LeadVaultRecord[] | undefined;
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateLeadVaultInsert(payload: unknown): LeadVaultValidationResult {
  if (!payload || typeof payload !== "object") {
    return {
      success: false,
      errors: ["Payload must be a JSON object."],
    };
  }

  const candidate = payload as Record<string, unknown>;
  const name = normalizeText(candidate.name);
  const workEmail = normalizeText(candidate.workEmail).toLowerCase();
  const company = normalizeText(candidate.company);
  const useCase = normalizeText(candidate.useCase);
  const action = normalizeText(candidate.action);
  const website = candidate.website;

  const errors: string[] = [];

  if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
    errors.push("name is required and must be <= 80 characters.");
  }
  if (!emailPattern.test(workEmail)) {
    errors.push("workEmail must be a valid email.");
  }
  if (company.length === 0 || company.length > MAX_COMPANY_LENGTH) {
    errors.push("company is required and must be <= 120 characters.");
  }
  if (useCase.length === 0 || useCase.length > MAX_USE_CASE_LENGTH) {
    errors.push("useCase is required and must be <= 1000 characters.");
  }
  if (action.length === 0 || action.length > MAX_ACTION_LENGTH) {
    errors.push("action is required and must be <= 64 characters.");
  }
  if (website !== undefined && (typeof website !== "string" || website.trim().length > 0)) {
    errors.push("website must be empty when provided.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      workEmail,
      company,
      useCase,
      action,
    },
  };
}

export function buildLeadVaultRecord(
  data: LeadVaultInsert,
  identityHash: string,
  userAgent: string | null,
): LeadVaultRecord {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: "website-terminal",
    identityHash,
    userAgent: (userAgent ?? "unknown").slice(0, MAX_USER_AGENT_LENGTH),
    ...data,
  };
}

function getLeadVaultMemory(): LeadVaultRecord[] {
  if (!globalThis.leadVaultMemory) {
    globalThis.leadVaultMemory = [];
  }
  return globalThis.leadVaultMemory;
}

export async function persistLeadVaultRecord(record: LeadVaultRecord): Promise<void> {
  const prisma = getPrismaClient();
  if (!prisma) {
    getLeadVaultMemory().push(record);
    return;
  }

  await prisma.lead.create({
    data: {
      id: record.id,
      name: record.name,
      workEmail: record.workEmail,
      company: record.company,
      useCase: record.useCase,
      action: record.action,
      status: "pending",
      identity: record.identityHash,
      source: "website",
      metadata: JSON.stringify({
        source: record.source,
        userAgent: record.userAgent,
      }),
      createdAt: new Date(record.createdAt),
    },
  });
}

export async function getLeadVaultCount(): Promise<number> {
  const prisma = getPrismaClient();
  if (!prisma) {
    return getLeadVaultMemory().length;
  }

  return prisma.lead.count();
}
