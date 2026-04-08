import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const ROUTE_URL = "http://localhost:3000/api/lead-capture";

interface RequestOverrides {
  handshake?: string;
  contentType?: string;
  requesterIp?: string;
}

function makeRequest(payload: unknown, overrides: RequestOverrides = {}): NextRequest {
  return new NextRequest(ROUTE_URL, {
    method: "POST",
    headers: {
      "content-type": overrides.contentType ?? "application/json",
      "x-laxvish-handshake": overrides.handshake ?? "vault-handshake-v1",
      "x-forwarded-for": overrides.requesterIp ?? "203.0.113.9",
    },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/lead-capture", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("rejects requests when secure handshake is missing or invalid", async () => {
    const { POST } = await import("./route");

    const response = await POST(makeRequest({}, { handshake: "wrong-token" }));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.ok).toBe(false);
    expect(body.message).toContain("Secure handshake failed");
  });

  it("captures a valid lead payload", async () => {
    const { POST } = await import("./route");

    const response = await POST(
      makeRequest({
        name: "Shubham",
        workEmail: "shubham@laxvish.app",
        company: "Laxvish",
        useCase: "Deploy compliant enterprise AI workers with verification controls.",
        action: "pilot",
        website: "",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.ok).toBe(true);
    expect(body.action).toBe("pilot");
    expect(body.referenceId).toBeTypeOf("string");
    expect(body.queueDepth).toBe(1);
  });

  it("returns validation errors for malformed payloads", async () => {
    const { POST } = await import("./route");

    const response = await POST(
      makeRequest({
        name: "X",
        workEmail: "invalid-email",
        company: "",
        useCase: "short",
        action: "unknown",
        website: "",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body.ok).toBe(false);
    expect(Array.isArray(body.errors)).toBe(true);
    expect(body.errors.length).toBeGreaterThan(0);
  });

  it("enforces request rate limiting per requester", async () => {
    const { POST } = await import("./route");

    const payload = {
      name: "Rate Test",
      workEmail: "ratetest@laxvish.app",
      company: "Laxvish",
      useCase: "Evaluate lead capture API throughput under repeated submissions.",
      action: "blueprint",
      website: "",
    };

    for (let i = 0; i < 6; i += 1) {
      const response = await POST(makeRequest(payload, { requesterIp: "198.51.100.24" }));
      expect(response.status).toBe(201);
    }

    const blocked = await POST(makeRequest(payload, { requesterIp: "198.51.100.24" }));
    const body = await blocked.json();

    expect(blocked.status).toBe(429);
    expect(body.ok).toBe(false);
    expect(body.message).toContain("Too many requests");
  });
});
