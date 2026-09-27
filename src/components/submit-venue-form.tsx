"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { VenuePhotoScan } from "@/components/venue-photo-scan";
import { saveSubmission } from "@/lib/submission-store";
import {
  formatQuickScanForSubmission,
  type QuickScanResult,
} from "@/lib/venue-quick-scan";

export function SubmitVenueForm({
  defaultVenueName,
}: {
  defaultVenueName?: string;
}) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [features, setFeatures] = useState("");
  const [scanSummaries, setScanSummaries] = useState<string[]>([]);

  function onScanComplete(result: QuickScanResult) {
    setFeatures((current) =>
      current.trim()
        ? `${current.trim()}\n\n${result.features}`
        : result.features,
    );
    setScanSummaries((current) => [
      ...current,
      formatQuickScanForSubmission(result),
    ]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const type = String(form.get("type") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    const contactEmail = String(form.get("contactEmail") ?? "").trim();
    const featuresValue = features.trim();
    const scanBlock = scanSummaries.length ? scanSummaries.join("\n\n") : "";

    if (!name || !location || !type) {
      setError("Please fill in venue name, location, and venue type.");
      return;
    }

    setSubmitting(true);

    const combinedNotes = [
      `Submitter: ${form.get("relationship")}. Reason: ${form.get("reason")}`,
      notes,
      scanBlock,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/submit-venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location,
          type,
          features: featuresValue,
          notes: combinedNotes || undefined,
          contactEmail: contactEmail || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        delivered?: boolean;
        error?: string;
      };
      if (!res.ok || !data.delivered) {
        setError(
          data.error ?? "Could not send your listing. Please try again.",
        );
        setSubmitting(false);
        return;
      }
    } catch {
      setError(
        "We could not confirm delivery. Your details are still in the form; please try again.",
      );
      return;
    } finally {
      setSubmitting(false);
    }

    try {
      saveSubmission({
        name,
        location,
        type,
        features: featuresValue,
        notes: combinedNotes,
      });
    } catch {
      // Delivery succeeded even if this browser cannot save a local copy.
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-3 text-center">
        <p className="form-success-text text-base">
          Thanks — your submission was delivered.
        </p>
        <p className="text-sm text-muted">
          It was sent to the Access Stamp team for review. We aim to triage beta
          submissions within 3 working days.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="rounded-xl border border-[#EFE5DA] bg-white p-4">
        <h3 className="text-sm font-semibold text-heading">Venue details</h3>
        <p className="mt-1 text-sm text-muted">
          Tell us which venue to review. Photos and access details are optional.
        </p>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Venue name
        <input
          name="name"
          required
          defaultValue={defaultVenueName ?? ""}
          className="form-input h-11 px-3 font-normal"
          placeholder="e.g. Riverside Arts Centre"
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Location
        <input
          name="location"
          required
          className="form-input h-11 px-3 font-normal"
          placeholder="Town or postcode"
          autoComplete="address-level2"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Venue type
        <select
          name="type"
          className="form-input h-11 px-3 font-normal"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select type
          </option>
          <option>Restaurant</option>
          <option>Café</option>
          <option>Hotel</option>
          <option>Shopping</option>
          <option>Arts & Culture</option>
          <option>Leisure</option>
          <option>Pub & Bar</option>
          <option>Healthcare</option>
          <option>Entertainment</option>
          <option>Outdoor</option>
          <option>Sports & Fitness</option>
          <option>Other</option>
        </select>
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Access features for your listing
        <textarea
          name="features"
          rows={4}
          value={features}
          onChange={(event) => setFeatures(event.target.value)}
          className="form-input px-3 py-2 font-normal"
          placeholder="Optional: entrances, routes, toilets, parking, or other details you know."
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Do you own or manage this venue?
        <select
          name="relationship"
          required
          className="form-input min-h-11 px-3"
        >
          <option value="">Choose one</option>
          <option>Owner or manager</option>
          <option>Visitor or community member</option>
          <option>Staff member</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold text-heading">
        Why are you submitting it?
        <textarea
          name="reason"
          required
          maxLength={1500}
          rows={3}
          className="form-input p-3"
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-heading">
        Anything else?
        <textarea
          name="notes"
          rows={3}
          className="form-input px-3 py-2 font-normal"
          placeholder="Optional context, opening hours, or contact details for review"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Your email
        <input
          name="contactEmail"
          required
          type="email"
          autoComplete="email"
          className="form-input h-11 px-3 font-normal"
          placeholder="So we can ask a quick follow-up"
        />
      </label>

      <details id="quick-scan">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold">
          Optional: add photos with Quick Feature Scan
        </summary>
        <VenuePhotoScan onScanComplete={onScanComplete} disabled={submitting} />
      </details>

      {error ? (
        <p className="form-error-text text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Submit your venue (beta)"}
      </Button>
    </form>
  );
}
