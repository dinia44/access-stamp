import { NextResponse } from "next/server";

export type VenueSubmissionPayload = {
  name: string;
  location: string;
  type: string;
  features?: string;
  notes?: string;
  contactEmail?: string;
};

function isValidPayload(body: unknown): body is VenueSubmissionPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.location === "string" &&
    b.location.trim().length > 0 &&
    typeof b.type === "string" &&
    b.type.trim().length > 0
  );
}

async function notifyWebhook(payload: VenueSubmissionPayload) {
  const url = process.env.SUBMISSION_WEBHOOK_URL?.trim();
  if (!url) return;

  const response = await fetch(url, {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      event: "venue_submission",
      receivedAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error("Submission delivery failed");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Venue name, location, and type are required." },
      { status: 400 },
    );
  }

  const payload: VenueSubmissionPayload = {
    name: body.name.trim(),
    location: body.location.trim(),
    type: body.type.trim(),
    features:
      typeof body.features === "string" ? body.features.trim() : undefined,
    notes: typeof body.notes === "string" ? body.notes.trim() : undefined,
    contactEmail:
      typeof body.contactEmail === "string" && body.contactEmail.includes("@")
        ? body.contactEmail.trim()
        : undefined,
  };

  if (!process.env.SUBMISSION_WEBHOOK_URL?.trim()) {
    return NextResponse.json(
      {
        error:
          "Online delivery is unavailable. Please email hello@accessstamp.co.uk. Your details remain in the form.",
      },
      { status: 503 },
    );
  }

  try {
    await notifyWebhook(payload);
  } catch (err) {
    console.error("[venue-submission] webhook failed", err);
    return NextResponse.json(
      {
        error: "We could not deliver your submission. Please try again later.",
      },
      { status: 502 },
    );
  }

  const delivered = Boolean(process.env.SUBMISSION_WEBHOOK_URL?.trim());

  return NextResponse.json({
    ok: true,
    delivered,
    message: delivered
      ? "Thanks — your venue listing was sent to the Access Stamp team."
      : "Thanks — we received your venue listing.",
  });
}
