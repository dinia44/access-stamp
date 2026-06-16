"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
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
};

const INITIAL: FormState = {
  name: "",
  email: "",
  enquiryType: "",
  message: "",
  consent: false,
};

export function ContactForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.enquiryType || !form.message.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.consent) {
      setError("Please confirm you agree to be contacted about this enquiry.");
      return;
    }

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
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError(`Could not send your enquiry. Please email ${CONTACT_EMAIL} instead.`);
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
      {error ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-[#20242E]">
          Name <span className="text-[#C8430F]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-[#EFE5DA] bg-white px-4 text-base text-[#20242E] focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15"
        />
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
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-[#EFE5DA] bg-white px-4 text-base text-[#20242E] focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15"
        />
      </div>

      <fieldset>
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
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-[#20242E]">
          Message <span className="text-[#C8430F]">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-2 w-full rounded-2xl border border-[#EFE5DA] bg-white px-4 py-3 text-base text-[#20242E] focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15"
        />
      </div>

      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-[#4A5263]">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
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

      <Button type="submit" isLoading={submitting} className="w-full sm:w-auto">
        Send enquiry
      </Button>
    </form>
  );
}
