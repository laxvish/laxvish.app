import { NextRequest, NextResponse } from "next/server";
import { syncLeadRecordToDatabase, validateLeadSyncPayload } from "@/lib/leadSync";
import { safeTokenCompare } from "@/lib/security";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const webhookSecret = process.env.LEAD_SYNC_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { ok: false, message: "Webhook secret is not configured." },
      { status: 503 },
    );
  }

  const token = request.headers.get("x-lead-sync-secret");
  if (!safeTokenCompare(token, webhookSecret)) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized webhook request." },
      { status: 401 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Unsupported content type." },
      { status: 415 },
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

  const parsed = validateLeadSyncPayload(payload);
  if (!parsed) {
    const payloadKeys =
      payload && typeof payload === "object" ? Object.keys(payload as Record<string, unknown>) : [];
    console.error("Lead sync payload validation failed.", {
      contentType,
      payloadKeys,
    });
    return NextResponse.json(
      { ok: false, message: "Invalid lead sync payload." },
      { status: 422 },
    );
  }

  try {
    await syncLeadRecordToDatabase(parsed.record);
    return NextResponse.json({ ok: true, message: "Lead synced to database." }, { status: 202 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Lead sync failed.";
    return NextResponse.json({ ok: false, message }, { status: 503 });
  }
}
