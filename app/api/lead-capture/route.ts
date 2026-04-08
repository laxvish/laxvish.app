import { NextRequest, NextResponse } from "next/server";
import {
  buildLeadVaultRecord,
  getLeadVaultCount,
  persistLeadVaultRecord,
  validateLeadVaultInsert,
} from "@/lib/enterpriseVault";

const HANDSHAKE_TOKEN = "vault-handshake-v1";
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 6;

interface RateWindow {
  count: number;
  startTime: number;
}

const rateWindows = new Map<string, RateWindow>();

function getRequesterKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();
  return firstForwarded || request.headers.get("x-real-ip") || "anonymous";
}

function isRateLimited(key: string, timestamp: number): boolean {
  const currentWindow = rateWindows.get(key);
  if (!currentWindow || timestamp - currentWindow.startTime > RATE_LIMIT_WINDOW_MS) {
    rateWindows.set(key, { count: 1, startTime: timestamp });
    return false;
  }

  if (currentWindow.count >= MAX_REQUESTS_PER_WINDOW) {
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

  const handshake = request.headers.get("x-laxvish-handshake");
  if (handshake !== HANDSHAKE_TOKEN) {
    return NextResponse.json(
      { ok: false, message: "Secure handshake failed." },
      { status: 401 },
    );
  }

  const now = Date.now();
  const requesterKey = getRequesterKey(request);
  if (isRateLimited(requesterKey, now)) {
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
    return NextResponse.json(
      {
        ok: false,
        message: "Lead payload validation failed.",
        errors: validation.errors,
      },
      { status: 422 },
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

  try {
    await persistLeadVaultRecord(record);
    const queueDepth = await getLeadVaultCount();

    return NextResponse.json(
      {
        ok: true,
        message: "Lead captured in enterprise vault.",
        referenceId: record.id,
        action: record.action,
        queueDepth,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Lead storage is temporarily unavailable.",
      },
      { status: 503 },
    );
  }
}
