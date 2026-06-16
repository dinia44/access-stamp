"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/contact";
import { VENUE_TYPE_OPTIONS } from "@/lib/for-venues-config";

type FormState = {
  venueName: string;
  contactName: string;
  email: string;
  phone: string;
  venueType: string;
  town: string;
  notes: string;
};

const INITIAL: FormState = {
  venueName: "",
  contactName: "",
  email: "",
  phone: "",
  venueType: "",
  town: "",
  notes: "",
};

export function ForVenuesLeadForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.venueName.trim() || !form.contactName.trim() || !form.email.trim() || !form.venueType || !form.town.trim()) {
      setError("Please fill in venue name, your name, email, venue type, and town.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/for-venues-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueName: form.venueName.trim(),
          contactName: form.contactName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          venueType: form.venueType,
          town: form.town.trim(),
          notes: form.notes.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError(`Could not send your enquiry. Please try again or email ${CONTACT_EMAIL}.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-[24px] border border-[#EFE5DA] bg-white p-8 text-center shadow-[0_12px_32px_-20px_rgba(122,80,48,0.14)]">
        <p className="text-lg font-semibold text-[#20242E]">Thanks — we&apos;ll be in touch within two working days.</p>
      </div>
    );
  }

  return (
    <div
      id="book-audit"
      className="scroll-mt-28 rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.14)] sm:p-8"
    >
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-[#20242E]">Book an audit</h2>
      <p className="mt-2 text-sm leading-6 text-[#4A5263]">
        Tell us about your venue and we will arrange a call to scope your audit.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E] sm:col-span-2">
          Venue name
          <input
            type="text"
            value={form.venueName}
            onChange={(e) => update("venueName", e.target.value)}
            className="form-input h-11 px-3 font-normal"
            autoComplete="organization"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E]">
          Your name
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            className="form-input h-11 px-3 font-normal"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E]">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="form-input h-11 px-3 font-normal"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E]">
          Phone <span className="font-normal text-[#76808F]">(optional)</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="form-input h-11 px-3 font-normal"
            autoComplete="tel"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E]">
          Venue type
          <select
            value={form.venueType}
            onChange={(e) => update("venueType", e.target.value)}
            className="form-input h-11 px-3 font-normal"
          >
            <option value="">Select type</option>
            {VENUE_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E] sm:col-span-2">
          Town
          <input
            type="text"
            value={form.town}
            onChange={(e) => update("town", e.target.value)}
            className="form-input h-11 px-3 font-normal"
            autoComplete="address-level2"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-[#20242E] sm:col-span-2">
          Anything we should know?
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={4}
            className="form-input px-3 py-2.5 font-normal"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm font-medium text-[#B0512E]" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="button"
        className="mt-6 rounded-full"
        isLoading={submitting}
        onClick={handleSubmit}
      >
        Send enquiry
      </Button>
    </div>
  );
}
