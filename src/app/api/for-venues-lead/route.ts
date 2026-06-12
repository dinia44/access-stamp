import { NextResponse } from "next/server";

export type ForVenuesLeadPayload = {
  venueName: string;
  contactName: string;
  email: string;
  phone?: string;
  venueType: string;
  town: string;
  notes?: string;
};

function isValidPayload(body: unknown): body is ForVenuesLeadPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.venueName === "string" &&
    b.venueName.trim().length > 0 &&
    typeof b.contactName === "string" &&
    b.contactName.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.venueType === "string" &&
    b.venueType.trim().length > 0 &&
    typeof b.town === "string" &&
    b.town.trim().length > 0
  );
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
      { error: "Venue name, contact name, email, venue type, and town are required." },
      { status: 400 },
    );
  }

  const payload: ForVenuesLeadPayload = {
    venueName: body.venueName.trim(),
    contactName: body.contactName.trim(),
    email: body.email.trim(),
    phone: typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : undefined,
    venueType: body.venueType.trim(),
    town: body.town.trim(),
    notes: typeof body.notes === "string" && body.notes.trim() ? body.notes.trim() : undefined,
  };

  // TODO: Persist leads to CRM / email workflow
  console.info("[for-venues-lead]", JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
