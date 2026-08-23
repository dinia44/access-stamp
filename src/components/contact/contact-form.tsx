"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "@/components/forms/ErrorSummary";
import { track, trackContactFailure } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/contact";
import { CONTACT_ENQUIRY_TYPES, type ContactEnquiryType } from "@/lib/contact-form";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  enquiryType: ContactEnquiryType | "";
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

type SubmitBanner =
  | { kind: "idle" }
  | { kind: "rate_limit"; message: string }
  | { kind: "network"; message: string }
  | { kind: "provider"; message: string }
  | { kind: "retry"; message: string };

type SubmitErrorBanner = Exclude<SubmitBanner, { kind: "idle" }>;

function enquiryTypeId(type: ContactEnquiryType) {
  return `contact-enquiry-${type.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function validateForm(form: FormState): FieldError[] {
  const errors: FieldError[] = [];
  if (!form.name.trim()) errors.push({ id: "contact-name", message: "Enter your name" });
  if (!form.email.trim()) errors.push({ id: "contact-email", message: "Enter your email address" });
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.push({ id: "contact-email", message: "Enter a valid email address" });
  }
  if (!form.enquiryType) errors.push({ id: "contact-enquiry-type", message: "Select an enquiry type" });
  if (!form.message.trim()) errors.push({ id: "contact-message", message: "Enter your message" });
  if (!form.consent) errors.push({ id: "contact-consent", message: "Confirm you agree to be contacted" });
  return errors;
}

function bannerFromResponse(status: number, error?: string): SubmitErrorBanner {
  if (status === 429) {
    return {
      kind: "rate_limit",
      message: error ?? "Too many requests. Please wait a moment and try again.",
    };
  }
  if (status >= 500) {
    return {
      kind: "provider",
      message: error ?? `We could not send your message right now. Please email ${CONTACT_EMAIL} or try again.`,
    };
  }
  return {
    kind: "retry",
    message: error ?? "Something went wrong. Please check your details and try again.",
  };
}

export function ContactForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [banner, setBanner] = useState<SubmitBanner>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    const errorId =
      field === "enquiryType" ? "contact-enquiry-type" : (`contact-${String(field)}` as string);
    setFieldErrors((prev) => prev.filter((error) => error.id !== errorId));
    if (banner.kind !== "idle") setBanner({ kind: "idle" });
  };

  function fieldError(id: string) {
    return fieldErrors.find((error) => error.id === id)?.message;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBanner({ kind: "idle" });

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

      let data: { ok?: boolean; error?: string; errorCategory?: string } = {};
      try {
        data = (await res.json()) as { ok?: boolean; error?: string; errorCategory?: string };
      } catch {
        data = {};
      }

      if (!res.ok) {
        const next = bannerFromResponse(res.status, data.error);
        if (data.errorCategory === "rate_limit") {
          setBanner({
            kind: "rate_limit",
            message: data.error ?? next.message,
          });
          trackContactFailure("rate_limit");
        } else if (data.errorCategory === "provider" || next.kind === "provider") {
          setBanner({ kind: "provider", message: data.error ?? next.message });
          trackContactFailure("provider");
        } else {
          setBanner(next);
          trackContactFailure(data.errorCategory ?? next.kind);
        }
        return;
      }

      track("contact_success");
      setSent(true);
    } catch {
      setBanner({
        kind: "network",
        message: `Could not reach the server. Please check your connection or email ${CONTACT_EMAIL} instead.`,
      });
      trackContactFailure("network");
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

  const enquiryInvalid = Boolean(fieldError("contact-enquiry-type"));
  const consentInvalid = Boolean(fieldError("contact-consent"));

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className={cn("relative space-y-5", className)} noValidate>
      <ErrorSummary errors={fieldErrors} />

      {banner.kind !== "idle" ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p>{banner.message}</p>
          {banner.kind === "rate_limit" || banner.kind === "network" || banner.kind === "provider" ? (
            <button
              type="button"
              className="mt-2 font-semibold underline underline-offset-2"
              onClick={() => setBanner({ kind: "idle" })}
            >
              Dismiss and try again
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot: out of tab order and accessibility tree */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
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
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={fieldError("contact-name") ? true : undefined}
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
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={fieldError("contact-email") ? true : undefined}
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

      <fieldset
        id="contact-enquiry-type"
        aria-invalid={enquiryInvalid ? true : undefined}
        aria-describedby={enquiryInvalid ? "contact-enquiry-type-error" : undefined}
      >
        <legend className="block text-sm font-semibold text-[#20242E]">
          Enquiry type <span className="text-[#C8430F]">*</span>
        </legend>
        <div className="mt-3 space-y-2">
          {CONTACT_ENQUIRY_TYPES.map((type) => {
            const id = enquiryTypeId(type);
            return (
              <label key={type} htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-[#4A5263]">
                <input
                  id={id}
                  type="radio"
                  name="enquiryType"
                  value={type}
                  required
                  checked={form.enquiryType === type}
                  onChange={() => update("enquiryType", type)}
                  className="h-4 w-4 accent-[#F04A16]"
                />
                {type}
              </label>
            );
          })}
        </div>
        {enquiryInvalid ? (
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
          name="message"
          required
          rows={5}
          aria-invalid={fieldError("contact-message") ? true : undefined}
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

      <div>
        <label htmlFor="contact-consent" className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-[#4A5263]">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={consentInvalid ? true : undefined}
            aria-describedby={consentInvalid ? "contact-consent-error" : undefined}
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
        {consentInvalid ? (
          <p id="contact-consent-error" className="mt-1 text-sm text-red-700" role="alert">
            {fieldError("contact-consent")}
          </p>
        ) : null}
      </div>

      <Button type="submit" isLoading={submitting} className="w-full sm:w-auto">
        Send enquiry
      </Button>
    </form>
  );
}
