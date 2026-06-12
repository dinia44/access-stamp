import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function notifyWebhook(email: string) {
  const url = process.env.PIP_CHECKLIST_WEBHOOK_URL?.trim() || process.env.SUBMISSION_WEBHOOK_URL?.trim();
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "pip_checklist_lead",
      email,
      receivedAt: new Date().toISOString(),
    }),
  });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    body && typeof body === "object" && typeof (body as { email?: string }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";
  const consent = Boolean(body && typeof body === "object" && (body as { consent?: boolean }).consent);

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json({ error: "Consent is required before we can email you." }, { status: 400 });
  }

  // TODO: connect email provider (e.g. Resend, Mailchimp) for automated PDF delivery.
  console.info("[pip-checklist-lead]", email);

  try {
    await notifyWebhook(email);
  } catch (err) {
    console.error("[pip-checklist-lead] webhook failed", err);
    return NextResponse.json(
      { error: "We could not save your email right now. Please try again later." },
      { status: 502 },
    );
  }

  const delivered = Boolean(
    process.env.PIP_CHECKLIST_WEBHOOK_URL?.trim() || process.env.SUBMISSION_WEBHOOK_URL?.trim(),
  );

  return NextResponse.json({
    ok: true,
    delivered,
    message: delivered
      ? "Thanks — we will email the PIP renewal checklist shortly."
      : "Thanks — we noted your request. Automated PDF delivery is coming soon.",
  });
}
