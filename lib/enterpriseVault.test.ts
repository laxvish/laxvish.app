import { beforeEach, describe, expect, it, vi } from "vitest";

describe("enterpriseVault", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("validates and normalizes a valid lead payload", async () => {
    const { validateLeadVaultInsert } = await import("./enterpriseVault");

    const result = validateLeadVaultInsert({
      name: "  Shubham  ",
      workEmail: " SALES@LAXVISH.APP ",
      company: " Laxvish ",
      useCase: "Automate multilingual agent workflows for customer support.",
      action: "pilot",
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data).toEqual({
      name: "Shubham",
      workEmail: "sales@laxvish.app",
      company: "Laxvish",
      useCase: "Automate multilingual agent workflows for customer support.",
      action: "pilot",
    });
  });

  it("rejects invalid lead payloads with useful errors", async () => {
    const { validateLeadVaultInsert } = await import("./enterpriseVault");

    const result = validateLeadVaultInsert({
      name: "A",
      workEmail: "not-an-email",
      company: "",
      useCase: "short",
      action: "invalid",
    });

    expect(result.success).toBe(false);
    if (result.success) {
      return;
    }

    expect(result.errors).toContain("Name must be between 2 and 80 characters.");
    expect(result.errors).toContain("Work email must be valid.");
    expect(result.errors).toContain("Company must be between 2 and 120 characters.");
    expect(result.errors).toContain("Use case must be between 10 and 1000 characters.");
    expect(result.errors).toContain("Action must be either 'pilot' or 'blueprint'.");
  });

  it("builds and persists a vault record", async () => {
    const { buildLeadVaultRecord, getLeadVaultCount, persistLeadVaultRecord } = await import(
      "./enterpriseVault"
    );

    const before = getLeadVaultCount();
    const record = buildLeadVaultRecord(
      {
        name: "Ops Lead",
        workEmail: "ops@laxvish.app",
        company: "Laxvish",
        useCase: "Scale AI operations across regulated enterprise workflows.",
        action: "blueprint",
      },
      "hash-123",
      "test-agent",
    );

    persistLeadVaultRecord(record);

    expect(record.source).toBe("website-terminal");
    expect(record.id).toBeTypeOf("string");
    expect(record.createdAt).toBeTypeOf("string");
    expect(getLeadVaultCount()).toBe(before + 1);
  });
});
