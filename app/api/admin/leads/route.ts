import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/prisma";
import { safeTokenCompare } from "@/lib/security";

interface LeadExportRow {
  id: string;
  name: string;
  workEmail: string;
  company: string;
  useCase: string;
  action: string;
  status: string;
  source: string;
  metadata: string;
  createdAt: string;
  updatedAt: string;
}

const CSV_FORMULA_RE = /^[=+\-@]/;
const CSV_NEEDS_QUOTE_RE = /[",\n]/;

function toCsvValue(value: string): string {
  if (!value) return "";
  const sanitized = CSV_FORMULA_RE.test(value) ? `'${value}` : value;
  if (!CSV_NEEDS_QUOTE_RE.test(sanitized)) return sanitized;
  return `"${sanitized.replaceAll('"', '""')}"`;
}

const CSV_HEADER =
  "id,name,workEmail,company,useCase,action,status,source,metadata,createdAt,updatedAt";

function toCsvLine(row: LeadExportRow): string {
  return (
    [
      row.id,
      row.name,
      row.workEmail,
      row.company,
      row.useCase,
      row.action,
      row.status,
      row.source,
      row.metadata,
      row.createdAt,
      row.updatedAt,
    ]
      .map(toCsvValue)
      .join(",")
  );
}

function toCsv(rows: LeadExportRow[]): string {
  if (rows.length === 0) return CSV_HEADER;
  // Preallocate: header + rows joined — single allocation vs map+join intermediate
  return `${CSV_HEADER}\n${rows.map(toCsvLine).join("\n")}`;
}

/** Streaming CSV for large exports — yields header then one line per row without buffering full string */
function streamCsv(rows: LeadExportRow[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let index = -1; // -1 = header not yet yielded
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index === -1) {
        controller.enqueue(encoder.encode(`${CSV_HEADER}\n`));
        index = 0;
        return;
      }
      if (index >= rows.length) {
        controller.close();
        return;
      }
      // Batch 64 rows per pull to amortize enqueue overhead
      const end = Math.min(index + 64, rows.length);
      let chunk = "";
      for (; index < end; index++) chunk += `${toCsvLine(rows[index])}\n`;
      // Trim trailing newline on last batch
      if (end === rows.length) chunk = chunk.slice(0, -1);
      controller.enqueue(encoder.encode(chunk));
      if (end === rows.length) controller.close();
    },
  });
}

export async function GET(request: NextRequest): Promise<Response> {
  const adminApiKey = process.env.ADMIN_API_KEY;
  if (!adminApiKey) {
    return NextResponse.json(
      { ok: false, message: "Admin API key is not configured." },
      { status: 503 },
    );
  }

  const providedKey = request.headers.get("x-admin-api-key");
  if (!safeTokenCompare(providedKey, adminApiKey)) {
    return NextResponse.json({ ok: false, message: "Unauthorized request." }, { status: 401 });
  }

  const prisma = getPrismaClient();
  if (!prisma) {
    return NextResponse.json(
      { ok: false, message: "Database connection is not configured." },
      { status: 503 },
    );
  }

  const format = request.nextUrl.searchParams.get("format") === "csv" ? "csv" : "json";
  const requestedLimit = Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "100", 10);
  const take = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 500)
    : 100;

  const leads = await prisma.lead.findMany({
    take,
    orderBy: { createdAt: "desc" },
  });

  const rows: LeadExportRow[] = leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    workEmail: lead.workEmail,
    company: lead.company,
    useCase: lead.useCase,
    action: lead.action,
    status: lead.status,
    source: lead.source,
    metadata: lead.metadata,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  }));

  if (format === "csv") {
    // Stream to avoid buffering the full CSV string for large exports
    if (rows.length > 200) {
      return new Response(streamCsv(rows), {
        status: 200,
        headers: {
          "content-type": "text/csv; charset=utf-8",
          "content-disposition": `attachment; filename="leads-export-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }
    return new NextResponse(toCsv(rows), {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="leads-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ ok: true, count: rows.length, leads: rows }, { status: 200 });
}
