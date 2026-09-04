"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";

type RoleTrack = "internship" | "full-time";

interface CareerFormData {
  name: string;
  workEmail: string;
  phone: string;
  roleTrack: RoleTrack;
  portfolioUrl: string;
  resumeUrl: string;
  whyJoin: string;
  website: string;
}

type CareerFormField = keyof CareerFormData;

interface SubmitFeedback {
  status: "idle" | "success" | "error";
  message: string;
  referenceId?: string;
}

const initialFormData: CareerFormData = {
  name: "",
  workEmail: "",
  phone: "",
  roleTrack: "internship",
  portfolioUrl: "",
  resumeUrl: "",
  whyJoin: "",
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-.\s0-9]{7,24}$/;
const orderedFields: CareerFormField[] = [
  "name",
  "workEmail",
  "phone",
  "roleTrack",
  "portfolioUrl",
  "resumeUrl",
  "whyJoin",
];

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function CareersApplicationPanel() {
  const [formData, setFormData] = useState<CareerFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<CareerFormField, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<SubmitFeedback>({
    status: "idle",
    message: "",
  });

  const updateField =
    (field: CareerFormField) =>
    (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>,
    ) => {
      const value = event.target.value;
      setFormData((current) => ({ ...current, [field]: value }));
      setErrors((current) => {
        if (!current[field]) {
          return current;
        }
        return { ...current, [field]: undefined };
      });
    };

  const validate = useMemo(
    () => (data: CareerFormData): Partial<Record<CareerFormField, string>> => {
      const nextErrors: Partial<Record<CareerFormField, string>> = {};
      if (data.name.trim().length < 2) {
        nextErrors.name = "Enter your full name.";
      }
      if (!emailPattern.test(data.workEmail.trim())) {
        nextErrors.workEmail = "Enter a valid email address.";
      }
      if (!phonePattern.test(data.phone.trim())) {
        nextErrors.phone = "Enter a valid phone number.";
      }
      if (data.roleTrack !== "internship" && data.roleTrack !== "full-time") {
        nextErrors.roleTrack = "Select internship or full-time.";
      }
      if (!isValidHttpUrl(data.portfolioUrl.trim())) {
        nextErrors.portfolioUrl = "Enter a valid portfolio or LinkedIn URL.";
      }
      if (!isValidHttpUrl(data.resumeUrl.trim())) {
        nextErrors.resumeUrl = "Enter a valid resume URL.";
      }
      if (data.whyJoin.trim().length < 20) {
        nextErrors.whyJoin = "Tell us why you want to join in at least 20 characters.";
      }
      return nextErrors;
    },
    [],
  );

  const focusFirstError = (fieldErrors: Partial<Record<CareerFormField, string>>) => {
    const firstField = orderedFields.find((field) => fieldErrors[field]);
    if (!firstField) {
      return;
    }
    const target = document.getElementById(`career-${firstField}`);
    target?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback({
        status: "error",
        message: "Please fix the highlighted fields and submit again.",
      });
      focusFirstError(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFeedback({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          workEmail: formData.workEmail.trim(),
          phone: formData.phone.trim(),
          roleTrack: formData.roleTrack,
          portfolioUrl: formData.portfolioUrl.trim(),
          resumeUrl: formData.resumeUrl.trim(),
          whyJoin: formData.whyJoin.trim(),
          submissionType: "career",
          action: `career-${formData.roleTrack}`,
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
          payload.errors?.join(" ") || payload.message || "Application submission failed.";
        setFeedback({ status: "error", message });
        setIsSubmitting(false);
        return;
      }

      setFeedback({
        status: "success",
        message:
          "Application received. Our team will review your profile and reach out if there is a fit.",
        referenceId: payload.referenceId,
      });
      setFormData(initialFormData);
      setErrors({});
      setIsSubmitting(false);
    } catch {
      setFeedback({
        status: "error",
        message: "Network error while sending application. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  const INPUT_CLASS =
    "w-full rounded-[2px] border border-charcoal/20 bg-obsidian px-3.5 py-2.5 text-base text-charcoal focus-visible:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-1";

  const LABEL_CLASS =
    "mb-1.5 block text-xs font-mono font-medium tracking-wide uppercase text-charcoal";

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-10 sm:py-16 lg:py-20">
      <div className="border border-charcoal/20 bg-vaultAmber/40 p-6 sm:p-10 lg:p-12">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neonCyan uppercase mb-2 sm:mb-3">
          Careers at Laxvish
        </p>
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal">
          Apply to build enterprise AI with us
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-charcoal/70">
          Choose a track and share only the details we need to evaluate your application.
        </p>

        <form className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor="career-name" className={LABEL_CLASS}>
              Full name *
            </label>
            <input
              id="career-name"
              type="text"
              value={formData.name}
              onChange={updateField("name")}
              autoComplete="name"
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "career-name-error" : undefined}
              className={INPUT_CLASS}
            />
            {errors.name ? (
              <p id="career-name-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-workEmail" className={LABEL_CLASS}>
              Email *
            </label>
            <input
              id="career-workEmail"
              type="email"
              value={formData.workEmail}
              onChange={updateField("workEmail")}
              autoComplete="email"
              aria-required="true"
              aria-invalid={Boolean(errors.workEmail)}
              aria-describedby={errors.workEmail ? "career-workEmail-error" : undefined}
              className={INPUT_CLASS}
            />
            {errors.workEmail ? (
              <p id="career-workEmail-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.workEmail}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-phone" className={LABEL_CLASS}>
              Phone *
            </label>
            <input
              id="career-phone"
              type="tel"
              value={formData.phone}
              onChange={updateField("phone")}
              autoComplete="tel"
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "career-phone-error" : undefined}
              className={INPUT_CLASS}
            />
            {errors.phone ? (
              <p id="career-phone-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-roleTrack" className={LABEL_CLASS}>
              Role track *
            </label>
            <select
              id="career-roleTrack"
              value={formData.roleTrack}
              onChange={updateField("roleTrack")}
              aria-required="true"
              aria-invalid={Boolean(errors.roleTrack)}
              aria-describedby={errors.roleTrack ? "career-roleTrack-error" : undefined}
              className={INPUT_CLASS}
            >
              <option value="internship">Internship</option>
              <option value="full-time">Full-time job</option>
            </select>
            {errors.roleTrack ? (
              <p id="career-roleTrack-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.roleTrack}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-portfolioUrl" className={LABEL_CLASS}>
              Portfolio or LinkedIn URL *
            </label>
            <input
              id="career-portfolioUrl"
              type="url"
              value={formData.portfolioUrl}
              onChange={updateField("portfolioUrl")}
              placeholder="https://"
              aria-required="true"
              aria-invalid={Boolean(errors.portfolioUrl)}
              aria-describedby={errors.portfolioUrl ? "career-portfolioUrl-error" : undefined}
              className={INPUT_CLASS}
            />
            {errors.portfolioUrl ? (
              <p id="career-portfolioUrl-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.portfolioUrl}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="career-resumeUrl" className={LABEL_CLASS}>
              Resume URL *
            </label>
            <input
              id="career-resumeUrl"
              type="url"
              value={formData.resumeUrl}
              onChange={updateField("resumeUrl")}
              placeholder="https://"
              aria-required="true"
              aria-invalid={Boolean(errors.resumeUrl)}
              aria-describedby={errors.resumeUrl ? "career-resumeUrl-error" : undefined}
              className={INPUT_CLASS}
            />
            {errors.resumeUrl ? (
              <p id="career-resumeUrl-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.resumeUrl}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="career-whyJoin" className={LABEL_CLASS}>
              Why do you want to join Laxvish? *
            </label>
            <textarea
              id="career-whyJoin"
              value={formData.whyJoin}
              onChange={updateField("whyJoin")}
              rows={4}
              aria-required="true"
              aria-invalid={Boolean(errors.whyJoin)}
              aria-describedby={errors.whyJoin ? "career-whyJoin-error" : undefined}
              className={INPUT_CLASS}
            />
            {errors.whyJoin ? (
              <p id="career-whyJoin-error" className="mt-1 text-xs font-medium text-charcoal">
                {errors.whyJoin}
              </p>
            ) : null}
          </div>

          <input
            id="career-website"
            type="text"
            value={formData.website}
            onChange={updateField("website")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="sm:col-span-2 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full sm:w-auto items-center justify-center bg-charcoal px-8 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-obsidian transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 hover:bg-neonCyan disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit application"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-xs text-charcoal/70">
          We review applications based on skills and role fit. Please avoid sharing sensitive personal data beyond what this form requests.
        </p>

        {feedback.status !== "idle" ? (
          <p
            className="mt-4 text-xs sm:text-sm font-medium tracking-wide text-charcoal"
            role="status"
            aria-live="polite"
          >
            <span className="uppercase font-mono tracking-[0.2em] text-neonCyan">
              {feedback.status === "success" ? "Received: " : "Not sent: "}
            </span>
            {feedback.message}
            {feedback.referenceId ? ` Reference: ${feedback.referenceId}` : ""}
          </p>
        ) : null}
      </div>
    </section>
  );
}
