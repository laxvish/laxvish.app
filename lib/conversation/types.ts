/**
 * Core Domain Types & Contracts for the Laxvish Conversation & Solution Synthesis Engine.
 */

export const CONVERSATION_ENGINE_VERSION = "2.0";

export type AttachmentCategory = "document" | "spreadsheet" | "text" | "image";

export type ProcessingStatus = "processed" | "partial" | "failed";

export interface RawAttachmentInput {
  name: string;
  size: number;
  type: string; // MIME type or extension
  content?: string; // UTF-8 text or Base64 encoded payload
  encoding?: "utf-8" | "base64";
}

export interface StructuredFact {
  key: string;
  value: string;
  confidence?: number;
  source?: string;
  category?: "metric" | "workflow" | "system" | "bottleneck" | "constraint" | "general";
}

export interface DocumentSummary {
  overview: string;
  recordCount?: number;
  keySections?: string[];
  operationalBottlenecks?: string[];
  anomalies?: string[];
}

export interface ProcessedAttachment {
  id: string;
  name: string;
  category: AttachmentCategory;
  mimeType: string;
  size: number;
  processing: {
    status: ProcessingStatus;
    method?: string;
    warning?: string;
  };
  summary?: DocumentSummary;
  facts: StructuredFact[];
  extractedExcerpt?: string;
}

export interface ConversationMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ConversationRequestPayload {
  messages: ConversationMessage[];
  attachments?: RawAttachmentInput[];
}

export interface ValidatedConversationInput {
  history: ConversationMessage[];
  currentDirective: string;
  attachments: RawAttachmentInput[];
}

export interface StructuredBlueprint {
  diagnosis: string;
  architecture: string[];
  workers: string[];
  brain: string[];
  brakes: string[];
  assumptions: string[];
  nextSteps: string[];
  rawText: string;
}

export type ConversationError =
  | "INVALID_REQUEST"
  | "RATE_LIMITED"
  | "PAYLOAD_TOO_LARGE"
  | "AI_TEMPORARILY_UNAVAILABLE";

export interface ConversationSuccessResponse {
  reply: string;
  blueprint?: StructuredBlueprint;
  attachments?: {
    id: string;
    name: string;
    category: AttachmentCategory;
    status: ProcessingStatus;
    factsCount: number;
    summary?: string;
    warning?: string;
  }[];
  telemetry?: {
    latencyMs: number;
    factsCount: number;
    contextChars: number;
  };
}

export interface UpstreamFailure {
  ok: false;
  failure: "network" | "timeout" | "http" | "malformed_json" | "malformed_response" | "empty_response";
  status?: number;
}

export interface UpstreamSuccess {
  ok: true;
  reply: string;
}

export function isProcessedAttachment(obj: unknown): obj is ProcessedAttachment {
  return typeof obj === "object" && obj !== null && "id" in obj && "facts" in obj;
}

