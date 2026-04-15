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

function toCsvValue(value: string): string {
  if (!value.includes(",") && !value.includes("\"") && !value.includes("\n")) {
    return value;
  }
  return `"${value.replaceAll("\"", "\"\"")}"`;
}

function toCsv(rows: LeadExportRow[]): string {
  const header = [
    "id",
    "name",
    "workEmail",
    "company",
    "useCase",
    "action",
    "status",
    "source",
    "metadata",
    "createdAt",
    "updatedAt",
  ].join(",");

  const lines = rows.map((row) =>
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
      .join(","),
  );

  return [header, ...lines].join("\n");
}

export async function GET(request: NextRequest): Promise<NextResponse> {
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
