import { NextRequest, NextResponse } from "next/server";
import {
  buildLeadVaultRecord,
  getLeadVaultCount,
  persistLeadVaultRecord,
  validateLeadVaultInsert,
} from "@/lib/enterpriseVault";
import { sendLeadSyncWebhook } from "@/lib/leadSync";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_IP_WINDOW = 6;
const MAX_REQUESTS_PER_IDENTITY_WINDOW = 3;

interface RateWindow {
  count: number;
  startTime: number;
}

const rateWindows = new Map<string, RateWindow>();
const identityRateWindows = new Map<string, RateWindow>();

function cleanupRateWindows(timestamp: number, windows: Map<string, RateWindow>): void {
  for (const [key, value] of windows.entries()) {
    if (timestamp - value.startTime > RATE_LIMIT_WINDOW_MS) {
      windows.delete(key);
    }
  }
}

function getRequesterKey(request: NextRequest): string {
  const platformIp =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("cf-connecting-ip");
  return platformIp?.trim() || "anonymous";
}

function isRateLimited(
  key: string,
  timestamp: number,
  windows: Map<string, RateWindow>,
  maxRequests: number,
): boolean {
  cleanupRateWindows(timestamp, windows);
  const currentWindow = windows.get(key);
  if (!currentWindow || timestamp - currentWindow.startTime > RATE_LIMIT_WINDOW_MS) {
    windows.set(key, { count: 1, startTime: timestamp });
    return false;
  }

  if (currentWindow.count >= maxRequests) {
    return true;
  }

  currentWindow.count += 1;
  return false;
}

async function toSha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Unsupported content type." },
      { status: 415 },
    );
  }

  const now = Date.now();
  const requesterKey = getRequesterKey(request);
  const ipWindowLimit =
    requesterKey === "anonymous" ? MAX_REQUESTS_PER_IP_WINDOW * 5 : MAX_REQUESTS_PER_IP_WINDOW;
  if (isRateLimited(requesterKey, now, rateWindows, ipWindowLimit)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please retry shortly." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed JSON payload." },
      { status: 400 },
    );
  }

  const parsedPayload = payload as Record<string, unknown>;
  const honeypot = typeof parsedPayload.website === "string" ? parsedPayload.website : "";
  if (honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const validation = validateLeadVaultInsert(payload);
  if (!validation.success) {
    console.error("Lead payload validation failed:", validation.errors);
    return NextResponse.json(
      {
        ok: false,
        message: "Lead payload validation failed.",
        errors: validation.errors,
      },
      { status: 422 },
    );
  }

  const identityRateKey = `${validation.data.workEmail}|${validation.data.action}`;
  if (
    isRateLimited(
      identityRateKey,
      now,
      identityRateWindows,
      MAX_REQUESTS_PER_IDENTITY_WINDOW,
    )
  ) {
    return NextResponse.json(
      { ok: false, message: "Too many requests for this identity. Please retry shortly." },
      { status: 429 },
    );
  }

  const identityHash = await toSha256(
    `${validation.data.workEmail}|${validation.data.company}|${requesterKey}`,
  );
  const record = buildLeadVaultRecord(
    validation.data,
    identityHash,
    request.headers.get("user-agent"),
  );
  const syncMode = process.env.LEAD_SYNC_MODE === "webhook" ? "webhook" : "direct";

  if (syncMode === "webhook") {
    const syncQueued = await sendLeadSyncWebhook(record);
    if (!syncQueued) {
      return NextResponse.json(
        {
          ok: false,
          message: "Lead sync webhook delivery failed.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Lead accepted and queued for sync.",
        referenceId: record.id,
        action: record.action,
        sync: "queued",
      },
      { status: 202 },
    );
  }

  try {
    await persistLeadVaultRecord(record);
    const queueDepth = process.env.DATABASE_URL ? null : await getLeadVaultCount();

    return NextResponse.json(
      {
        ok: true,
        message: "Lead captured in enterprise vault.",
        referenceId: record.id,
        action: record.action,
        ...(queueDepth !== null ? { queueDepth } : {}),
        sync: "disabled",
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Lead storage failure.", {
      hasDatabase: Boolean(process.env.DATABASE_URL),
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        ok: false,
        message: "Lead storage is temporarily unavailable.",
        sync: "disabled",
      },
      { status: 503 },
    );
  }
}
