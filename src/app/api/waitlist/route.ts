import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function notifyWebhook(email: string) {
  const url = process.env.WAITLIST_WEBHOOK_URL?.trim() || process.env.SUBMISSION_WEBHOOK_URL?.trim();
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "waitlist_signup",
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

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  console.info("[waitlist]", email);

  try {
    await notifyWebhook(email);
  } catch (err) {
    console.error("[waitlist] webhook failed", err);
    return NextResponse.json(
      { error: "We could not save your email right now. Please try again later." },
      { status: 502 },
    );
  }

  const delivered = Boolean(
    process.env.WAITLIST_WEBHOOK_URL?.trim() || process.env.SUBMISSION_WEBHOOK_URL?.trim(),
  );

  return NextResponse.json({
    ok: true,
    delivered,
    message: delivered
      ? "You are on the waitlist — we will email you when there is news."
      : "Thanks — we noted your interest. Full waitlist delivery is coming soon.",
  });
}
