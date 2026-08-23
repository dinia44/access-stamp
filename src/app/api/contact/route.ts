import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/contact";
import { CONTACT_ENQUIRY_TYPES } from "@/lib/contact-form";
import { sendTransactionalEmail } from "@/lib/email/send";

type ContactPayload = {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ENQUIRY = new Set<string>(CONTACT_ENQUIRY_TYPES);

/** Coarse rate limit: max requests per IP window (in-memory; soft-launch). */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_RE.test(b.email.trim()) &&
    typeof b.enquiryType === "string" &&
    ALLOWED_ENQUIRY.has(b.enquiryType) &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    b.consent === true
  );
}

export async function POST(req: Request) {
  if (isRateLimited(clientKey(req))) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a moment and try again.",
        errorCategory: "rate_limit",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body.", errorCategory: "validation" },
      { status: 400 },
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      {
        error: "Name, email, enquiry type, message, and consent are required.",
        errorCategory: "validation",
      },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const payload: ContactPayload = {
    name: body.name.trim(),
    email: body.email.trim(),
    enquiryType: body.enquiryType.trim(),
    message: body.message.trim(),
    consent: true,
  };

  const emailResult = await sendTransactionalEmail({
    subject: `Access Stamp contact — ${payload.enquiryType}`,
    replyTo: payload.email,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Enquiry type: ${payload.enquiryType}`,
      `Consent: yes (${new Date().toISOString()})`,
      "",
      payload.message,
    ].join("\n"),
  });

  if (!emailResult.ok) {
    return NextResponse.json(
      { error: emailResult.error, errorCategory: "provider" },
      { status: 502 },
    );
  }

  // Do not log full email addresses.
  console.info(
    "[contact]",
    JSON.stringify({
      enquiryType: payload.enquiryType,
      consent: true,
      receivedAt: new Date().toISOString(),
      emailed: !emailResult.skipped,
    }),
  );

  return NextResponse.json({
    ok: true,
    delivered: !emailResult.skipped,
    fallbackEmail: emailResult.skipped ? CONTACT_EMAIL : undefined,
  });
}
