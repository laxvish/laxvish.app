"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ExecutionPhase, ValidationPhase } from "@/lib/motion-system";
import type { LeadCaptureAction } from "@/lib/enterpriseVault";
import { SystemPanel } from "@/components/ui/SystemPanel";

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

// Visible label styling: uppercase overline, per AGENTS.md §2.
const LABEL_CLASS =
  "mb-2 block text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-neonCyan";

// Underline field with a crisp, colour-free focus indicator (WCAG 2.4.7) and 16px minimum text to prevent iOS zoom.
const FIELD_CLASS =
  "border-b border-charcoal/40 bg-transparent px-2 py-2.5 text-base text-charcoal placeholder:text-neonCyan/70 focus-visible:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-vaultAmber";

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
      className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-10 sm:py-20 lg:py-28"
    >
      <SystemPanel className="border border-charcoal bg-vaultAmber p-6 sm:p-10 lg:p-12">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase mb-2 sm:mb-3">
          Direct engagement
        </p>
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
          Let’s talk about your work.
        </h2>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-charcoal/70">
          Tell us what you want to automate. We’ll show you what’s possible: honestly, in plain language.
        </p>

        <div className="mt-6 sm:mt-10 grid gap-3 sm:grid-cols-2">
          <motion.button
            type="button"
            onClick={() => setAction("pilot")}
            whileHover={{ scale: 1.01, transition: { duration: ExecutionPhase.duration.micro, ease: ExecutionPhase.ease } }}
            whileTap={{ scale: 0.98, transition: { duration: ValidationPhase.duration.standard, ease: ValidationPhase.ease } }}
            className={`border px-5 py-3.5 text-left text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
              action === "pilot"
                ? "border-charcoal bg-charcoal text-obsidian"
                : "border-charcoal/20 bg-transparent text-charcoal hover:border-charcoal"
            }`}
          >
            Request pilot
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setAction("blueprint")}
            whileHover={{ scale: 1.01, transition: { duration: ExecutionPhase.duration.micro, ease: ExecutionPhase.ease } }}
            whileTap={{ scale: 0.98, transition: { duration: ValidationPhase.duration.standard, ease: ValidationPhase.ease } }}
            className={`border px-5 py-3.5 text-left text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer ${
              action === "blueprint"
                ? "border-charcoal bg-charcoal text-obsidian"
                : "border-charcoal/20 bg-transparent text-charcoal hover:border-charcoal"
            }`}
          >
            Get integration blueprint
          </motion.button>
        </div>

        <form className="mt-6 sm:mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} aria-describedby="lead-feedback">
          <div>
            <label htmlFor="lead-name" className={LABEL_CLASS}>
              Name
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={updateField("name")}
              required
              className={`w-full ${FIELD_CLASS}`}
            />
          </div>
          <div>
            <label htmlFor="lead-work-email" className={LABEL_CLASS}>
              Work Email
            </label>
            <input
              id="lead-work-email"
              name="workEmail"
              type="email"
              autoComplete="email"
              value={formData.workEmail}
              onChange={updateField("workEmail")}
              required
              className={`w-full ${FIELD_CLASS}`}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="lead-company" className={LABEL_CLASS}>
              Company
            </label>
            <input
              id="lead-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={updateField("company")}
              required
              className={`w-full ${FIELD_CLASS}`}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="lead-use-case" className={LABEL_CLASS}>
              Use Case
            </label>
            <textarea
              id="lead-use-case"
              name="useCase"
              rows={3}
              value={formData.useCase}
              onChange={updateField("useCase")}
              required
              placeholder="Describe what tasks or workflows you want to automate..."
              className={`w-full ${FIELD_CLASS}`}
            />
          </div>
          {/* Honeypot anti-spam field */}
          <label htmlFor="lead-website" className="hidden" aria-hidden="true">
            Website
          </label>
          <input
            id="lead-website"
            type="text"
            value={formData.website}
            onChange={updateField("website")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="sm:col-span-2 mt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01, transition: { duration: ExecutionPhase.duration.micro, ease: ExecutionPhase.ease } }}
              whileTap={{ scale: 0.98, transition: { duration: ValidationPhase.duration.standard, ease: ValidationPhase.ease } }}
              className="inline-flex w-full sm:w-auto items-center justify-center bg-charcoal px-8 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-obsidian transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-vaultAmber disabled:opacity-50 hover:bg-neonCyan cursor-pointer"
            >
              {isSubmitting ? "Capturing..." : actionLabels[action]}
            </motion.button>
          </div>
        </form>

        {feedback.status !== "idle" ? (
          <p
            id="lead-feedback"
            role="status"
            aria-live="polite"
            className="mt-6 text-xs sm:text-sm font-medium tracking-wide text-charcoal"
          >
            <span className="uppercase font-mono tracking-[0.2em] text-neonCyan">
              {feedback.status === "success" ? "Received: " : "Not sent: "}
            </span>
            {feedback.message}
            {feedback.referenceId ? ` Reference: ${feedback.referenceId}` : ""}
          </p>
        ) : null}
      </SystemPanel>
    </section>
  );
}
