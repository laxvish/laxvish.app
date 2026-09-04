import type { ProcessedAttachment, StructuredFact, DocumentSummary } from "../types.ts";

/**
 * Spreadsheet & Tabular Data Preprocessor (CSV, TSV, Spreadsheet extracts).
 * Transforms raw grid data into compact operational aggregates, metrics, and facts.
 */
export function processSpreadsheetData(
  id: string,
  name: string,
  mimeType: string,
  size: number,
  rawContent: string
): ProcessedAttachment {
  const text = rawContent.trim();
  if (!text) {
    return {
      id,
      name,
      category: "spreadsheet",
      mimeType,
      size,
      processing: {
        status: "failed",
        warning: "Empty spreadsheet content.",
      },
      facts: [],
    };
  }

  // Detect delimiter: comma, tab, or semicolon
  const firstLine = text.split(/\r?\n/)[0] || "";
  const delimiter = firstLine.includes("\t")
    ? "\t"
    : firstLine.includes(";")
    ? ";"
    : ",";

  const rows = parseCsvRows(text, delimiter);
  if (rows.length < 1) {
    return {
      id,
      name,
      category: "spreadsheet",
      mimeType,
      size,
      processing: {
        status: "partial",
        warning: "Could not parse table structure.",
      },
      facts: [],
    };
  }

  const headers = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1).filter((r) => r.some((cell) => cell.trim().length > 0));
  const rowCount = dataRows.length;
  const colCount = headers.length;

  const facts: StructuredFact[] = [
    {
      key: "Total Records",
      value: `${rowCount.toLocaleString()} rows`,
      category: "metric",
      confidence: 1.0,
      source: name,
    },
    {
      key: "Column Headers",
      value: headers.slice(0, 12).join(", ") + (headers.length > 12 ? ` (+${headers.length - 12} more)` : ""),
      category: "system",
      confidence: 1.0,
      source: name,
    },
  ];

  // Column Analysis: Detect Status / Status Distributions / Bottlenecks
  const statusColIdx = headers.findIndex((h) =>
    /status|state|outcome|stage|result|condition/i.test(h)
  );

  const anomalies: string[] = [];
  const bottlenecks: string[] = [];

  if (statusColIdx !== -1 && rowCount > 0) {
    const statusCounts: Record<string, number> = {};
    dataRows.forEach((r) => {
      const val = (r[statusColIdx] || "").trim() || "Empty/Missing";
      statusCounts[val] = (statusCounts[val] || 0) + 1;
    });

    const statusSummary = Object.entries(statusCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([st, cnt]) => `${st}: ${Math.round((cnt / rowCount) * 100)}% (${cnt})`)
      .join("; ");

    facts.push({
      key: `Distribution (${headers[statusColIdx]})`,
      value: statusSummary,
      category: "workflow",
      confidence: 0.95,
      source: name,
    });

    // Check for failure/unresolved spikes
    const failureKeywords = /fail|error|pending|stuck|blocked|delayed|unresolved|reject/i;
    const unresolvedEntries = Object.entries(statusCounts).filter(([st]) =>
      failureKeywords.test(st)
    );
    const totalUnresolved = unresolvedEntries.reduce((sum, [, c]) => sum + c, 0);
    if (totalUnresolved > 0) {
      const pct = Math.round((totalUnresolved / rowCount) * 100);
      bottlenecks.push(`Found ${totalUnresolved} unresolved/delayed records (${pct}% of total dataset).`);
      facts.push({
        key: "Unresolved / Error Volume",
        value: `${totalUnresolved} items (${pct}%)`,
        category: "bottleneck",
        confidence: 0.95,
        source: name,
      });
    }
  }

  // Numerical column summary (Sum, Average, Min, Max)
  headers.forEach((h, colIdx) => {
    if (colIdx === statusColIdx) return;
    const sampleValues = dataRows.slice(0, 100).map((r) => r[colIdx]);
    const numValues = sampleValues
      .map((v) => parseFloat((v || "").replace(/[$,]/g, "")))
      .filter((n) => !isNaN(n));

    if (numValues.length > sampleValues.length * 0.7 && numValues.length > 5) {
      const min = Math.min(...numValues);
      const max = Math.max(...numValues);
      const avg = Math.round(numValues.reduce((a, b) => a + b, 0) / numValues.length);
      if (facts.length < 12) {
        facts.push({
          key: `Metric (${h})`,
          value: `Avg: ${avg.toLocaleString()}, Range: [${min.toLocaleString()} - ${max.toLocaleString()}]`,
          category: "metric",
          confidence: 0.85,
          source: name,
        });
      }
    }
  });

  // Sample data snippet (first 3 representative rows formatted as key-value pairs)
  const sampleSnippet = dataRows
    .slice(0, 3)
    .map((row, idx) => {
      const rowRepr = headers
        .map((h, i) => `${h}: ${row[i] || "N/A"}`)
        .slice(0, 6)
        .join(" | ");
      return `Row ${idx + 1}: ${rowRepr}`;
    })
    .join("\n");

  const summary: DocumentSummary = {
    overview: `Spreadsheet dataset containing ${rowCount.toLocaleString()} records across ${colCount} columns.`,
    recordCount: rowCount,
    keySections: headers.slice(0, 10),
    operationalBottlenecks: bottlenecks.length > 0 ? bottlenecks : undefined,
    anomalies: anomalies.length > 0 ? anomalies : undefined,
  };

  return {
    id,
    name,
    category: "spreadsheet",
    mimeType: mimeType || "text/csv",
    size,
    processing: {
      status: "processed",
      method: "Deterministic Tabular Aggregator & Frequency Analyzer",
    },
    summary,
    facts,
    extractedExcerpt: `Headers: ${headers.join(", ")}\n\nSample Excerpt:\n${sampleSnippet}`,
  };
}

/**
 * Basic CSV tokenizer handling quotes and escaped commas.
 */
function parseCsvRows(text: string, delimiter: string): string[][] {
  const lines = text.split(/\r?\n/);
  const rows: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const row: string[] = [];
    let insideQuote = false;
    let currentCell = "";

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        insideQuote = !insideQuote;
      } else if (char === delimiter && !insideQuote) {
        row.push(currentCell.trim());
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
    row.push(currentCell.trim());
    rows.push(row);
  }

  return rows;
}
