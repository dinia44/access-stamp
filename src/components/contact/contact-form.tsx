"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "@/components/forms/ErrorSummary";
import { CONTACT_EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = [
  "General enquiry",
  "Venue support",
  "Partnership or media",
  "Accessibility feedback",
  "Other",
] as const;

type FormState = {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  website: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  enquiryType: "",
  message: "",
  consent: false,
  website: "",
};

type FieldError = { id: string; message: string };

function validateForm(form: FormState): FieldError[] {
  const errors: FieldError[] = [];
  if (!form.name.trim()) errors.push({ id: "contact-name", message: "Enter your name" });
  if (!form.email.trim()) errors.push({ id: "contact-email", message: "Enter your email address" });
  else if (!form.email.includes("@")) errors.push({ id: "contact-email", message: "Enter a valid email address" });
  if (!form.enquiryType) errors.push({ id: "contact-enquiry-type", message: "Select an enquiry type" });
  if (!form.message.trim()) errors.push({ id: "contact-message", message: "Enter your message" });
  if (!form.consent) errors.push({ id: "contact-consent", message: "Confirm you agree to be contacted" });
  return errors;
}

export function ContactForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => prev.filter((error) => error.id !== `contact-${field === "enquiryType" ? "enquiry-type" : field}`));
  };

  function fieldError(id: string) {
    return fieldErrors.find((error) => error.id === id)?.message;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitError("");

    const errors = validateForm(form);
    if (errors.length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors([]);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          enquiryType: form.enquiryType,
          message: form.message.trim(),
          consent: form.consent,
          website: form.website,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setSubmitError(`Could not send your enquiry. Please email ${CONTACT_EMAIL} instead.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        className={cn(
          "rounded-[24px] border border-[#EFE5DA] bg-white p-8 text-center shadow-[0_12px_32px_-20px_rgba(122,80,48,0.14)]",
          className,
        )}
        role="status"
      >
        <p className="text-lg font-semibold text-[#20242E]">Thanks — we received your message.</p>
        <p className="mt-2 text-sm leading-6 text-[#4A5263]">
          Access Stamp is currently growing, so response times may vary.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className={cn("space-y-5", className)} noValidate>
      <ErrorSummary errors={fieldErrors} />
      {submitError ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {submitError}
        </div>
      ) : null}

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-[#20242E]">
          Name <span className="text-[#C8430F]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(fieldError("contact-name"))}
          aria-describedby={fieldError("contact-name") ? "contact-name-error" : undefined}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-[#EFE5DA] bg-white px-4 text-base text-[#20242E] focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15"
        />
        {fieldError("contact-name") ? (
          <p id="contact-name-error" className="mt-1 text-sm text-red-700" role="alert">
            {fieldError("contact-name")}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-[#20242E]">
          Email <span className="text-[#C8430F]">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(fieldError("contact-email"))}
          aria-describedby={fieldError("contact-email") ? "contact-email-error" : undefined}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-[#EFE5DA] bg-white px-4 text-base text-[#20242E] focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15"
        />
        {fieldError("contact-email") ? (
          <p id="contact-email-error" className="mt-1 text-sm text-red-700" role="alert">
            {fieldError("contact-email")}
          </p>
        ) : null}
      </div>

      <fieldset id="contact-enquiry-type">
        <legend className="block text-sm font-semibold text-[#20242E]">
          Enquiry type <span className="text-[#C8430F]">*</span>
        </legend>
        <div className="mt-3 space-y-2">
          {ENQUIRY_TYPES.map((type) => (
            <label key={type} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-[#4A5263]">
              <input
                type="radio"
                name="enquiryType"
                value={type}
                checked={form.enquiryType === type}
                onChange={() => update("enquiryType", type)}
                className="h-4 w-4 accent-[#F04A16]"
              />
              {type}
            </label>
          ))}
        </div>
        {fieldError("contact-enquiry-type") ? (
          <p id="contact-enquiry-type-error" className="mt-1 text-sm text-red-700" role="alert">
            {fieldError("contact-enquiry-type")}
          </p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-[#20242E]">
          Message <span className="text-[#C8430F]">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          aria-invalid={Boolean(fieldError("contact-message"))}
          aria-describedby={fieldError("contact-message") ? "contact-message-error" : undefined}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-2 w-full rounded-2xl border border-[#EFE5DA] bg-white px-4 py-3 text-base text-[#20242E] focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15"
        />
        {fieldError("contact-message") ? (
          <p id="contact-message-error" className="mt-1 text-sm text-red-700" role="alert">
            {fieldError("contact-message")}
          </p>
        ) : null}
      </div>

      <label id="contact-consent" className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-[#4A5263]">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          aria-invalid={Boolean(fieldError("contact-consent"))}
          aria-describedby={fieldError("contact-consent") ? "contact-consent-error" : undefined}
          className="mt-1 h-4 w-4 accent-[#F04A16]"
        />
        <span>
          I agree that Access Stamp may contact me about this enquiry. See our{" "}
          <Link href="/legal/privacy" className="font-semibold text-[#C8430F] underline-offset-2 hover:underline">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {fieldError("contact-consent") ? (
        <p id="contact-consent-error" className="text-sm text-red-700" role="alert">
          {fieldError("contact-consent")}
        </p>
      ) : null}

      <Button type="submit" isLoading={submitting} className="w-full sm:w-auto">
        Send enquiry
      </Button>
    </form>
  );
}
