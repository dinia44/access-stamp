"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { VenuePhotoScan } from "@/components/venue-photo-scan";
import { saveSubmission } from "@/lib/submission-store";
import { formatQuickScanForSubmission, type QuickScanResult } from "@/lib/venue-quick-scan";

export function SubmitVenueForm({ defaultVenueName }: { defaultVenueName?: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [deliveredToTeam, setDeliveredToTeam] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [features, setFeatures] = useState("");
  const [scanSummaries, setScanSummaries] = useState<string[]>([]);

  function onScanComplete(result: QuickScanResult) {
    setFeatures((current) => (current.trim() ? `${current.trim()}\n\n${result.features}` : result.features));
    setScanSummaries((current) => [...current, formatQuickScanForSubmission(result)]);
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
    let apiDelivered = false;

    const combinedNotes = [notes, scanBlock].filter(Boolean).join("\n\n");

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
      const data = (await res.json()) as { ok?: boolean; delivered?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not send your listing. Please try again.");
        setSubmitting(false);
        return;
      }
      apiDelivered = Boolean(data.delivered);
    } catch {
      saveSubmission({ name, location, type, features: featuresValue, notes: combinedNotes });
      setDeliveredToTeam(false);
      setSent(true);
      setSubmitting(false);
      return;
    } finally {
      setSubmitting(false);
    }

    saveSubmission({ name, location, type, features: featuresValue, notes: combinedNotes });
    setDeliveredToTeam(apiDelivered);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-3 text-center">
        <p className="form-success-text text-base">Thanks — we&apos;ve received your venue listing.</p>
        <p className="text-sm text-muted">
          {deliveredToTeam
            ? "It was sent to the Access Stamp team for review. We aim to triage beta submissions within 3 working days."
            : `It is saved on this device and logged on our server for review. Email hello@accessstamp.co.uk with the venue name if you need a faster response.`}
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div id="quick-scan">
        <VenuePhotoScan onScanComplete={onScanComplete} disabled={submitting} />
      </div>

      <div className="rounded-xl border border-[#EFE5DA] bg-white p-4">
        <h3 className="text-sm font-semibold text-heading">Venue details</h3>
        <p className="mt-1 text-sm text-muted">
          Add your venue information after scanning. You can scan more areas first, then submit once you&apos;re ready.
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
        <select name="type" className="form-input h-11 px-3 font-normal" defaultValue="" required>
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
          placeholder="Filled in from Quick Scan — edit anything that needs correcting before you submit."
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
        Your email (optional)
        <input
          name="contactEmail"
          type="email"
          autoComplete="email"
          className="form-input h-11 px-3 font-normal"
          placeholder="So we can ask a quick follow-up"
        />
      </label>

      {error ? (
        <p className="form-error-text text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit">{submitting ? "Sending…" : "Submit your venue (beta)"}</Button>
    </form>
  );
}
