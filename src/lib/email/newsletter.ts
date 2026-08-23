import { CONTACT_EMAIL } from "@/lib/contact";
import { sendTransactionalEmail } from "@/lib/email/send";
import { resendRequest } from "@/lib/email/resend";

export type NewsletterSubscribeResult =
  | { ok: true; stored: boolean; notified: boolean; alreadySubscribed?: boolean }
  | { ok: false; error: string };

/**
 * Adds a subscriber to the Resend Audience when RESEND_NEWSLETTER_AUDIENCE_ID is set,
 * and notifies the Access Stamp inbox. Without Resend config, logs only (no full email).
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeResult> {
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID?.trim();
  let stored = false;
  let alreadySubscribed = false;

  if (audienceId) {
    const result = await resendRequest<{ id: string }>(`/audiences/${audienceId}/contacts`, {
      body: { email, unsubscribed: false },
    });

    if (result.ok) {
      stored = true;
    } else if (result.status === 409 || /already exists/i.test(result.body)) {
      stored = true;
      alreadySubscribed = true;
    } else if (result.status === 0) {
      console.info("[newsletter-signup] audience skipped — no API key");
    } else {
      console.error("[newsletter-signup] audience error", result.status);
      return { ok: false, error: "Could not save your subscription. Please try again in a moment." };
    }
  } else {
    console.info("[newsletter-signup] received (audience not configured)");
  }

  if (alreadySubscribed) {
    return { ok: true, stored, notified: false, alreadySubscribed: true };
  }

  const notify = await sendTransactionalEmail({
    subject: "New Access Stamp newsletter signup",
    text: [
      `A new newsletter signup was received.`,
      ``,
      `Email: ${email}`,
      `Stored in Resend audience: ${stored ? "yes" : "no (audience not configured)"}`,
    ].join("\n"),
    replyTo: email,
  });

  if (!notify.ok) {
    if (stored) {
      return { ok: true, stored, notified: false };
    }
    return { ok: false, error: notify.error };
  }

  return { ok: true, stored, notified: !notify.skipped };
}

export function newsletterFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() ?? `Access Stamp <${CONTACT_EMAIL}>`;
}
