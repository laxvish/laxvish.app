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

  return (
    <section className="mx-auto w-full max-w-4xl border-y border-rule-hair px-6 py-16 sm:px-12 lg:py-20">
      <div className="border-t border-deepink/30 pt-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-mark">
          Apply to Build
        </p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-deepink sm:text-4xl">
          Apply to build enterprise AI with us
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-deepink/75">
          Choose a track and share only the details we need to evaluate your
          application.
        </p>
        <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-deepink/55 uppercase">
          Fields marked * are required
        </p>

        <form className="mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-8" onSubmit={onSubmit} noValidate>
          <div>
            <label
              htmlFor="career-name"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Full name <span aria-hidden="true">*</span>
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
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
            />
            {errors.name ? (
              <p id="career-name-error" className="mt-1 text-sm text-[#C46B4E]">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="career-workEmail"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Email <span aria-hidden="true">*</span>
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
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
            />
            {errors.workEmail ? (
              <p id="career-workEmail-error" className="mt-1 font-mono text-[10px] tracking-[0.18em] text-deepink/70 uppercase">
                {errors.workEmail}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="career-phone"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Phone <span aria-hidden="true">*</span>
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
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
            />
            {errors.phone ? (
              <p id="career-phone-error" className="mt-1 text-sm text-[#C46B4E]">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="career-roleTrack"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Role track <span aria-hidden="true">*</span>
            </label>
            <select
              id="career-roleTrack"
              value={formData.roleTrack}
              onChange={updateField("roleTrack")}
              aria-required="true"
              aria-invalid={Boolean(errors.roleTrack)}
              aria-describedby={errors.roleTrack ? "career-roleTrack-error" : undefined}
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark"
            >
              <option value="internship">Internship</option>
              <option value="full-time">Full-time job</option>
            </select>
            {errors.roleTrack ? (
              <p id="career-roleTrack-error" className="mt-1 font-mono text-[10px] tracking-[0.18em] text-deepink/70 uppercase">
                {errors.roleTrack}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="career-portfolioUrl"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Portfolio or LinkedIn URL <span aria-hidden="true">*</span>
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
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
            />
            {errors.portfolioUrl ? (
              <p id="career-portfolioUrl-error" className="mt-1 text-sm text-[#C46B4E]">
                {errors.portfolioUrl}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="career-resumeUrl"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Resume URL <span aria-hidden="true">*</span>
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
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
            />
            {errors.resumeUrl ? (
              <p id="career-resumeUrl-error" className="mt-1 font-mono text-[10px] tracking-[0.18em] text-deepink/70 uppercase">
                {errors.resumeUrl}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="career-whyJoin"
              className="block font-mono text-[10px] font-medium tracking-[0.18em] text-deepink/65 uppercase"
            >
              Why do you want to join Laxvish? <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="career-whyJoin"
              value={formData.whyJoin}
              onChange={updateField("whyJoin")}
              rows={5}
              aria-required="true"
              aria-invalid={Boolean(errors.whyJoin)}
              aria-describedby={errors.whyJoin ? "career-whyJoin-error" : undefined}
              className="mt-2 w-full border-b border-deepink/30 bg-transparent py-2 text-sm text-deepink outline-none transition-colors duration-200 focus:border-mark placeholder:text-deepink/30"
            />
            {errors.whyJoin ? (
              <p id="career-whyJoin-error" className="mt-1 text-sm text-[#C46B4E]">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 cursor-pointer border border-mark bg-mark px-6 py-2.5 font-mono text-xs font-medium tracking-[0.18em] text-cream uppercase transition-colors duration-200 hover:bg-deepink hover:border-deepink disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
          >
            {isSubmitting ? "Submitting..." : "Submit application"}
          </button>
        </form>

        <p className="mt-12 max-w-xl border-t border-rule-hair pt-5 font-mono text-[10px] tracking-[0.18em] text-deepink/65 uppercase">
          We review applications based on skills and role fit. Please avoid
          sharing sensitive personal data beyond what this form requests.
        </p>

        {feedback.status !== "idle" ? (
          <p
            className={`mt-4 font-mono text-sm tracking-wide ${ feedback.status === "success" ? "text-mark" : "text-deepink" }`}
            role="status"
            aria-live="polite"
          >
            {feedback.message}
            {feedback.referenceId ? ` Reference: ${feedback.referenceId}` : ""}
          </p>
        ) : null}
      </div>
    </section>
  );
}
