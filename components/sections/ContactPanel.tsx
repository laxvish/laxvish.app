"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import type { LeadCaptureAction } from "@/lib/enterpriseVault";

interface ContactFormData {
  name: string;
  workEmail: string;
  company: string;
  useCase: string;
  website: string;
}

interface SubmitFeedback {
  status: "idle" | "success" | "error";
  message: string;
  referenceId?: string;
}

const initialFormData: ContactFormData = {
  name: "",
  workEmail: "",
  company: "",
  useCase: "",
  website: "",
};

const actionLabels: Record<LeadCaptureAction, string> = {
  pilot: "Request Pilot",
  blueprint: "Get Integration Blueprint",
};

export function ContactPanel() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [action, setAction] = useState<LeadCaptureAction>("pilot");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<SubmitFeedback>({
    status: "idle",
    message: "",
  });

  const updateField =
    (field: keyof ContactFormData) =>
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ status: "idle", message: "" });
    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-laxvish-handshake": "vault-handshake-v1",
        },
        body: JSON.stringify({
          name: formData.name,
          workEmail: formData.workEmail,
          company: formData.company,
          useCase: formData.useCase,
          action,
          website: formData.website,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: string[];
        referenceId?: string;
      };

      if (!response.ok || !payload.ok) {
        const message =
          payload.errors?.join(" ") || payload.message || "Submission failed.";
        setFeedback({
          status: "error",
          message,
        });
        setIsSubmitting(false);
        return;
      }

      setFeedback({
        status: "success",
        message:
          action === "pilot"
            ? "Pilot request captured. We will contact you with next steps."
            : "Blueprint request captured. We will share architecture details shortly.",
        referenceId: payload.referenceId,
      });
      setFormData(initialFormData);
      setIsSubmitting(false);
    } catch {
      setFeedback({
        status: "error",
        message: "Network error while sending request. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:max-w-5xl lg:py-24">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-white [font-family:var(--font-space-grotesk)] sm:text-4xl">
          Dual-Action Lead Terminal
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          Choose your activation path. We capture only business contact details.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setAction("pilot")}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 ${
              action === "pilot"
                ? "border-vaultAmber bg-vaultAmber/10 text-vaultAmber"
                : "border-white/15 bg-black/20 text-gray-300 hover:border-vaultAmber/40"
            }`}
          >
            <span className="block text-xs uppercase tracking-[0.14em] text-gray-400">
              Action 01
            </span>
            <span className="mt-1 block font-semibold">Pilot Activation</span>
          </button>
          <button
            type="button"
            onClick={() => setAction("blueprint")}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 ${
              action === "blueprint"
                ? "border-neonCyan bg-neonCyan/10 text-neonCyan"
                : "border-white/15 bg-black/20 text-gray-300 hover:border-neonCyan/40"
            }`}
          >
            <span className="block text-xs uppercase tracking-[0.14em] text-gray-400">
              Action 02
            </span>
            <span className="mt-1 block font-semibold">Blueprint Request</span>
          </button>
        </div>

        <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={updateField("name")}
            placeholder="Name"
            required
            className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-gray-500"
          />
          <input
            type="email"
            value={formData.workEmail}
            onChange={updateField("workEmail")}
            placeholder="Work Email"
            required
            className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-gray-500"
          />
          <input
            type="text"
            value={formData.company}
            onChange={updateField("company")}
            placeholder="Company"
            required
            className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-gray-500"
          />
          <input
            type="text"
            value={formData.website}
            onChange={updateField("website")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <textarea
            value={formData.useCase}
            onChange={updateField("useCase")}
            placeholder="Use Case"
            required
            rows={4}
            className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-gray-500 sm:col-span-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-vaultAmber px-6 py-3 text-sm font-semibold text-black transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
          >
            {isSubmitting ? "Capturing..." : actionLabels[action]}
          </button>
        </form>

        {feedback.status !== "idle" ? (
          <p
            className={`mt-4 text-sm ${
              feedback.status === "success" ? "text-neonCyan" : "text-vaultAmber"
            }`}
          >
            {feedback.message}
            {feedback.referenceId ? ` Reference: ${feedback.referenceId}` : ""}
          </p>
        ) : null}
      </div>
    </section>
  );
}
