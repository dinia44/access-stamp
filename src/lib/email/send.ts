import { CONTACT_EMAIL } from "@/lib/contact";

export type SendEmailInput = {
  to?: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
};

export type SendEmailResult = { ok: true; skipped?: boolean } | { ok: false; error: string };

/**
 * Sends email via Resend when RESEND_API_KEY is configured.
 * Falls back to server logging so forms still work in local/dev.
 */
export async function sendTransactionalEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = input.to ?? process.env.CONTACT_INBOX_EMAIL?.trim() ?? CONTACT_EMAIL;
  const recipients = Array.isArray(to) ? to : [to];

  if (!apiKey) {
    console.info(
      "[email]",
      JSON.stringify({
        to: recipients,
        subject: input.subject,
        replyTo: input.replyTo,
        preview: input.text.slice(0, 280),
        sentAt: new Date().toISOString(),
      }),
    );
    return { ok: true, skipped: true };
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ?? `Access Stamp <${CONTACT_EMAIL}>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: input.subject,
        text: input.text,
        reply_to: input.replyTo,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[email] Resend error", res.status, body);
      return { ok: false, error: "Email could not be sent. Please try again or contact us directly." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[email] Resend request failed", error);
    return { ok: false, error: "Email could not be sent. Please try again or contact us directly." };
  }
}
