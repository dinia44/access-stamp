/** Standard public contact email for Access Stamp */
export const CONTACT_EMAIL = "hello@accessstamp.co.uk";

export function contactMailto(options?: { subject?: string; body?: string }) {
  const subject = options?.subject ?? "Access Stamp enquiry";
  const body = options?.body ?? "";
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ""}`;
}
