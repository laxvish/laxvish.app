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
      className="mx-auto w-full max-w-4xl px-6 py-24 sm:px-12 lg:py-32"
    >
      <SystemPanel className="border border-vaultAmber/25 bg-voidSurface p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
        <h2 className="text-4xl font-normal tracking-tight text-charcoal sm:text-5xl">
          Let&rsquo;s talk about your work.
        </h2>
        <p className="mt-4 text-base text-charcoal/70 sm:text-lg">
          Tell us what you want to automate. We&rsquo;ll show you what&rsquo;s possible — honestly.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <motion.button
            type="button"
            onClick={() => setAction("pilot")}
            whileHover={{ scale: 1.02, transition: { duration: ExecutionPhase.duration.micro, ease: ExecutionPhase.ease } }}
            whileTap={{ scale: 0.96, transition: { duration: ValidationPhase.duration.standard, ease: ValidationPhase.ease } }}
            className={`rounded-2xl border p-5 text-left text-sm font-medium tracking-wide transition-all cursor-pointer ${
              action === "pilot"
                ? "border-vaultAmber bg-white/10 text-charcoal shadow-lg"
                : "border-vaultAmber/20 bg-voidSurface/60 text-charcoal/70 hover:border-vaultAmber/50"
            }`}
          >
            <span className="block font-bold text-neonCyan">I want to try it on my work</span>
            <span className="mt-1 block text-xs font-normal text-charcoal/60">
              A 4-week pilot with clear success criteria
            </span>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setAction("blueprint")}
            whileHover={{ scale: 1.02, transition: { duration: ExecutionPhase.duration.micro, ease: ExecutionPhase.ease } }}
            whileTap={{ scale: 0.96, transition: { duration: ValidationPhase.duration.standard, ease: ValidationPhase.ease } }}
            className={`rounded-2xl border p-5 text-left text-sm font-medium tracking-wide transition-all cursor-pointer ${
              action === "blueprint"
                ? "border-vaultAmber bg-white/10 text-charcoal shadow-lg"
                : "border-vaultAmber/20 bg-voidSurface/60 text-charcoal/70 hover:border-vaultAmber/50"
            }`}
          >
            <span className="block font-bold text-neonCyan">Show me how it would fit</span>
            <span className="mt-1 block text-xs font-normal text-charcoal/60">
              An architecture review for your business
            </span>
          </motion.button>
        </div>

        <form className="mt-8 grid gap-6 sm:grid-cols-2" onSubmit={onSubmit}>
          <input
            type="text"
            value={formData.name}
            onChange={updateField("name")}
            placeholder="Name"
            required
            className="border-b border-vaultAmber/30 bg-transparent px-2 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-vaultAmber focus:outline-none"
          />
          <input
            type="email"
            value={formData.workEmail}
            onChange={updateField("workEmail")}
            placeholder="Work Email"
            required
            className="border-b border-vaultAmber/30 bg-transparent px-2 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-vaultAmber focus:outline-none"
          />
          <input
            type="text"
            value={formData.company}
            onChange={updateField("company")}
            placeholder="Company"
            required
            className="border-b border-vaultAmber/30 bg-transparent px-2 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-vaultAmber focus:outline-none"
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
            placeholder="What work do you want to automate?"
            required
            rows={4}
            className="border-b border-vaultAmber/30 bg-transparent px-2 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-vaultAmber focus:outline-none sm:col-span-2"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02, transition: { duration: ExecutionPhase.duration.micro, ease: ExecutionPhase.ease } }}
            whileTap={{ scale: 0.96, transition: { duration: ValidationPhase.duration.standard, ease: ValidationPhase.ease } }}
            className="mt-6 inline-flex items-center justify-center bg-charcoal px-8 py-4 text-sm font-semibold tracking-wide text-obsidian transition-colors duration-300 disabled:opacity-50 hover:bg-vaultAmber sm:col-span-2 sm:w-auto sm:justify-start rounded-full cursor-pointer"
          >
            {isSubmitting ? "Capturing..." : actionLabels[action]}
          </motion.button>
        </form>

        {feedback.status !== "idle" ? (
          <p
            className={`mt-6 text-sm font-medium tracking-wide ${
              feedback.status === "success"
                ? "text-vaultAmber"
                : "text-red-400"
            }`}
          >
            {feedback.message}
            {feedback.referenceId ? ` Reference: ${feedback.referenceId}` : ""}
          </p>
        ) : null}
      </SystemPanel>
    </section>
  );
}
