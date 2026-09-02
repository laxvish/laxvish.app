"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import type { LeadCaptureAction } from "@/lib/enterpriseVault";
import { PaperPanel } from "@/components/ui/SystemPanel";
import { EditorialReveal } from "@/components/ui/FadeIn";

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
        headers: { "content-type": "application/json" },
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
        setFeedback({ status: "error", message });
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
      className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-12 lg:py-32"
    >
      <EditorialReveal>
        <PaperPanel className="border border-rule-hair bg-cream p-8 sm:p-14">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-mark uppercase">
            Contact
          </p>
          <h2 className="mt-4 text-4xl font-normal leading-[1.05] tracking-tight text-deepink sm:text-5xl">
            Let&rsquo;s talk about your work.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-deepink/75 sm:text-lg">
            Tell us what you want to automate. We&rsquo;ll show you what&rsquo;s
            possible — honestly, in plain language.
          </p>

          <fieldset className="mt-12">
            <legend className="font-mono text-xs font-medium tracking-[0.18em] text-deepink/60 uppercase">
              What are you here for?
            </legend>
            <div className="mt-4 grid gap-px bg-rule-hair sm:grid-cols-2">
              <motion.button
                type="button"
                onClick={() => setAction("pilot")}
                whileTap={{ scale: 0.985 }}
                className={`cursor-pointer text-left p-6 transition-colors duration-200 ${ action === "pilot" ? "bg-mist text-deepink" : "bg-cream text-deepink/75 hover:bg-parchment" }`}
              >
                <span className="block font-mono text-xs tracking-[0.18em] text-mark uppercase">
                  Pilot
                </span>
                <span className="mt-3 block text-xl font-normal leading-tight tracking-tight">
                  I want to try it on my work
                </span>
                <span className="mt-2 block text-sm text-deepink/65">
                  A 4-week pilot with clear success criteria.
                </span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setAction("blueprint")}
                whileTap={{ scale: 0.985 }}
                className={`cursor-pointer text-left p-6 transition-colors duration-200 ${ action === "blueprint" ? "bg-mist text-deepink" : "bg-cream text-deepink/75 hover:bg-parchment" }`}
              >
                <span className="block font-mono text-xs tracking-[0.18em] text-mark uppercase">
                  Blueprint
                </span>
                <span className="mt-3 block text-xl font-normal leading-tight tracking-tight">
                  Show me how it would fit
                </span>
                <span className="mt-2 block text-sm text-deepink/65">
                  An architecture review for your business.
                </span>
              </motion.button>
            </div>
          </fieldset>

          <form className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2" onSubmit={onSubmit}>
            <label className="block">
              <span className="block font-mono text-xs tracking-[0.18em] text-deepink/60 uppercase">
                Name
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={updateField("name")}
                required
                className="mt-2 w-full border-b border-rule-hair-ink bg-transparent py-2 text-base text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
              />
            </label>
            <label className="block">
              <span className="block font-mono text-xs tracking-[0.18em] text-deepink/60 uppercase">
                Work email
              </span>
              <input
                type="email"
                value={formData.workEmail}
                onChange={updateField("workEmail")}
                required
                className="mt-2 w-full border-b border-rule-hair-ink bg-transparent py-2 text-base text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
              />
            </label>
            <label className="block">
              <span className="block font-mono text-xs tracking-[0.18em] text-deepink/60 uppercase">
                Company
              </span>
              <input
                type="text"
                value={formData.company}
                onChange={updateField("company")}
                required
                className="mt-2 w-full border-b border-rule-hair-ink bg-transparent py-2 text-base text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
              />
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={updateField("website")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <label className="block sm:col-span-2">
              <span className="block font-mono text-xs tracking-[0.18em] text-deepink/60 uppercase">
                What work do you want to automate?
              </span>
              <textarea
                value={formData.useCase}
                onChange={updateField("useCase")}
                required
                rows={4}
                className="mt-2 w-full border-b border-rule-hair-ink bg-transparent py-2 text-base text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
              />
            </label>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.985 }}
              className="mt-2 inline-flex w-fit items-center justify-center bg-mark px-7 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-deepink disabled:opacity-50 sm:col-span-2 cursor-pointer"
            >
              {isSubmitting ? "Capturing..." : actionLabels[action]}
            </motion.button>
          </form>

          {feedback.status !== "idle" ? (
            <p
              className={`mt-6 font-mono text-sm tracking-wide ${ feedback.status === "success" ? "text-mark" : "text-red-700" }`}
            >
              {feedback.message}
              {feedback.referenceId ? ` Reference: ${feedback.referenceId}` : ""}
            </p>
          ) : null}
        </PaperPanel>
      </EditorialReveal>
    </section>
  );
}
