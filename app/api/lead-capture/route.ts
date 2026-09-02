import { NextRequest, NextResponse } from "next/server";
import {
  buildLeadVaultRecord,
  getLeadVaultCount,
  persistLeadVaultRecord,
  validateLeadVaultInsert,
} from "@/lib/enterpriseVault";
import { sendLeadSyncWebhook } from "@/lib/leadSync";
import { getRateLimitStore, getRequesterKey } from "@/lib/rate-limit";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_IP_WINDOW = 6;
const MAX_REQUESTS_PER_IDENTITY_WINDOW = 3;
/**
 * Callers behind a proxy that forwards no address at all share one bucket. It
 * is deliberately generous: misidentifying a visitor must never become a
 * denial of service on the lead form.
 */
const MAX_REQUESTS_PER_UNIDENTIFIED_WINDOW = 60;

function tooManyRequests(retryAfterSeconds: number, scope: string): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      message:
        scope === "identity"
          ? "Too many requests for this identity. Please retry shortly."
          : "Too many requests. Please retry shortly.",
    },
    {
      status: 429,
      headers: { "retry-after": String(Math.max(1, retryAfterSeconds)) },
    },
  );
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

  const store = getRateLimitStore();
  const { key: requesterKey, identified } = getRequesterKey(request.headers);
  const ipLimit = identified
    ? MAX_REQUESTS_PER_IP_WINDOW
    : MAX_REQUESTS_PER_UNIDENTIFIED_WINDOW;

  const ipDecision = await store.hit(
    `ip:${requesterKey}`,
    ipLimit,
    RATE_LIMIT_WINDOW_SECONDS,
  );
  if (!ipDecision.allowed) {
    return tooManyRequests(ipDecision.retryAfterSeconds, "ip");
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

  // Hashed before it becomes a cache key: the raw work email must never be
  // written into shared rate-limit storage.
  const identityRateKey = await toSha256(
    `${validation.data.workEmail.toLowerCase()}|${validation.data.action}`,
  );
  const identityDecision = await store.hit(
    `id:${identityRateKey}`,
    MAX_REQUESTS_PER_IDENTITY_WINDOW,
    RATE_LIMIT_WINDOW_SECONDS,
  );
  if (!identityDecision.allowed) {
    return tooManyRequests(identityDecision.retryAfterSeconds, "identity");
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
