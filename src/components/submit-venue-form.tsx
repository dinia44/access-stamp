"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { saveSubmission } from "@/lib/submission-store";

export function SubmitVenueForm({ defaultVenueName }: { defaultVenueName?: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [deliveredToTeam, setDeliveredToTeam] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const type = String(form.get("type") ?? "").trim();
    const features = String(form.get("features") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    const contactEmail = String(form.get("contactEmail") ?? "").trim();

    if (!name || !location || !type) {
      setError("Please fill in venue name, location, and venue type.");
      return;
    }

    setSubmitting(true);
    let apiDelivered = false;

    try {
      const res = await fetch("/api/submit-venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location,
          type,
          features,
          notes,
          contactEmail: contactEmail || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; delivered?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not send your suggestion. Please try again.");
        setSubmitting(false);
        return;
      }
      apiDelivered = Boolean(data.delivered);
    } catch {
      saveSubmission({ name, location, type, features, notes });
      setDeliveredToTeam(false);
      setSent(true);
      setSubmitting(false);
      return;
    } finally {
      setSubmitting(false);
    }

    saveSubmission({ name, location, type, features, notes });
    setDeliveredToTeam(apiDelivered);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-3 text-center">
        <p className="font-semibold text-heading">Thanks — we&apos;ve received your suggestion.</p>
        <p className="text-sm text-muted">
          {deliveredToTeam
            ? "It was sent to the Access Stamp team for review. We aim to triage within 3 working days."
            : "It is saved on this device and logged on our server for review. Email hello@accessstamp.co.uk with the venue name if you need a faster response."}
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <p className="text-sm text-muted">
        Submissions are reviewed before publishing. Optional email lets us follow up if we need
        clarification.
      </p>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Venue name
        <input
          name="name"
          required
          defaultValue={defaultVenueName ?? ""}
          className="h-11 rounded-[var(--radius-ui)] border border-border bg-card px-3 font-normal text-text"
          placeholder="e.g. Riverside Arts Centre"
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Location
        <input
          name="location"
          required
          className="h-11 rounded-[var(--radius-ui)] border border-border bg-card px-3 font-normal text-text"
          placeholder="Town or postcode"
          autoComplete="address-level2"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Venue type
        <select
          name="type"
          className="h-11 rounded-[var(--radius-ui)] border border-border bg-card px-3 font-normal text-text"
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
        Access features you know about
        <textarea
          name="features"
          rows={4}
          className="rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 font-normal text-text"
          placeholder="Step-free entry, accessible toilet, parking, turning space, hearing loop…"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Anything else?
        <textarea
          name="notes"
          rows={3}
          className="rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 font-normal text-text"
          placeholder="Optional context or sources"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Your email (optional)
        <input
          name="contactEmail"
          type="email"
          autoComplete="email"
          className="h-11 rounded-[var(--radius-ui)] border border-border bg-card px-3 font-normal text-text"
          placeholder="So we can ask a quick follow-up"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-heading">
        Photo (optional)
        <input
          name="photo"
          type="file"
          accept="image/*"
          className="text-sm text-muted file:mr-3 file:rounded-[var(--radius-ui)] file:border file:border-border file:bg-background-2 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-heading"
        />
        <span className="text-xs font-normal text-muted">Photo uploads are not wired yet — describe access in text for now.</span>
      </label>

      {error ? <p className="text-sm font-semibold text-amber" role="alert">{error}</p> : null}
      <Button type="submit">{submitting ? "Sending…" : "Submit suggestion"}</Button>
    </form>
  );
}
