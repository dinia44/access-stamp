"use client";

export type VenueSubmission = {
  id: string;
  name: string;
  location: string;
  type: string;
  features: string;
  notes: string;
  moderationStatus: "pending" | "needs-review";
  submittedAt: string;
};

const STORAGE_KEY = "access-stamp-venue-submissions";

export function readSubmissions(): VenueSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VenueSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSubmission(input: Omit<VenueSubmission, "id" | "moderationStatus" | "submittedAt">) {
  if (typeof window === "undefined") return;
  const next: VenueSubmission = {
    ...input,
    id: crypto.randomUUID(),
    moderationStatus: "pending",
    submittedAt: new Date().toISOString(),
  };
  const existing = readSubmissions();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([next, ...existing]));
}
