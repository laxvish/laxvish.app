export type LeadCaptureAction = "pilot" | "blueprint";

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
    action: "enum(pilot|blueprint)",
  },
} as const;

const MAX_NAME_LENGTH = 80;
const MAX_COMPANY_LENGTH = 120;
const MAX_USE_CASE_LENGTH = 1000;
const MAX_USER_AGENT_LENGTH = 256;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAction(value: unknown): value is LeadCaptureAction {
  return value === "pilot" || value === "blueprint";
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
  const action = candidate.action;

  const errors: string[] = [];

  if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
    errors.push("Name must be between 2 and 80 characters.");
  }
  if (!emailPattern.test(workEmail)) {
    errors.push("Work email must be valid.");
  }
  if (company.length < 2 || company.length > MAX_COMPANY_LENGTH) {
    errors.push("Company must be between 2 and 120 characters.");
  }
  if (useCase.length < 10 || useCase.length > MAX_USE_CASE_LENGTH) {
    errors.push("Use case must be between 10 and 1000 characters.");
  }
  if (!isAction(action)) {
    errors.push("Action must be either 'pilot' or 'blueprint'.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const safeAction = action as LeadCaptureAction;

  return {
    success: true,
    data: {
      name,
      workEmail,
      company,
      useCase,
      action: safeAction,
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

const vaultRecords: LeadVaultRecord[] = [];

export function persistLeadVaultRecord(record: LeadVaultRecord): void {
  vaultRecords.push(record);
}

export function getLeadVaultCount(): number {
  return vaultRecords.length;
}
