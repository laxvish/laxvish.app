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
    <section
      id="contact"
      className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="rounded-2xl border border-charcoal/20 bg-[#0d0d0d] p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-4xl">
          Start with one clear next step
        </h2>
        <p className="mt-3 text-sm text-charcoal/80">
          Pick your path. We only ask for essential business details.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setAction("pilot")}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 ${
              action === "pilot"
                ? "border-vaultAmber/70 bg-vaultAmber/10 text-vaultAmber"
                : "border-charcoal/20 bg-transparent text-charcoal/88 hover:border-charcoal/45"
            }`}
          >
            <span className="block font-semibold">Request pilot</span>
          </button>
          <button
            type="button"
            onClick={() => setAction("blueprint")}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 ${
              action === "blueprint"
                ? "border-neonCyan/70 bg-neonCyan/10 text-neonCyan"
                : "border-charcoal/20 bg-transparent text-charcoal/88 hover:border-charcoal/45"
            }`}
          >
            <span className="block font-semibold">Get integration blueprint</span>
          </button>
        </div>

        <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={updateField("name")}
            placeholder="Name"
            required
            className="rounded-lg border border-charcoal/20 bg-black/30 px-4 py-3 text-sm text-neonCyan placeholder:text-charcoal/45 focus:border-vaultAmber/55 focus:outline-none"
          />
          <input
            type="email"
            value={formData.workEmail}
            onChange={updateField("workEmail")}
            placeholder="Work Email"
            required
            className="rounded-lg border border-charcoal/20 bg-black/30 px-4 py-3 text-sm text-neonCyan placeholder:text-charcoal/45 focus:border-vaultAmber/55 focus:outline-none"
          />
          <input
            type="text"
            value={formData.company}
            onChange={updateField("company")}
            placeholder="Company"
            required
            className="rounded-lg border border-charcoal/20 bg-black/30 px-4 py-3 text-sm text-neonCyan placeholder:text-charcoal/45 focus:border-vaultAmber/55 focus:outline-none"
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
            className="rounded-lg border border-charcoal/20 bg-black/30 px-4 py-3 text-sm text-neonCyan placeholder:text-charcoal/45 focus:border-vaultAmber/55 focus:outline-none sm:col-span-2"
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
              feedback.status === "success"
                ? "text-neonCyan"
                : "text-vaultAmber"
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
