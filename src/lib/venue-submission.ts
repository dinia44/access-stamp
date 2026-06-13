export const CONTACT_EMAIL = "hello@accessstamp.com";

export function suggestVenueMailto(options?: { venueName?: string; subject?: string; body?: string }) {
  const subject = options?.subject ?? (options?.venueName ? `Suggest a venue: ${options.venueName}` : "Suggest a venue");
  const body =
    options?.body ??
    "Venue name:\nTown or postcode:\nWhat works well for access:\nAnything else we should know:\n";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
