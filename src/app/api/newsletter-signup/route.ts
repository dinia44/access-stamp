import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // TODO: wire to email provider (e.g. Resend, Mailchimp, Buttondown).
  console.info("[newsletter-signup]", email);

  return NextResponse.json({
    ok: true,
    message: "Thanks — you're subscribed. We'll only email when there's something worth sharing.",
  });
}
