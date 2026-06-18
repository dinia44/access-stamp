import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/contact";
import { sendTransactionalEmail } from "@/lib/email/send";

type ContactPayload = {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  website?: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.enquiryType === "string" &&
    b.enquiryType.trim().length > 0 &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    b.consent === true
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
      { error: "Name, email, enquiry type, message, and consent are required." },
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
    return NextResponse.json({ error: emailResult.error }, { status: 502 });
  }

  console.info(
    "[contact]",
    JSON.stringify({
      name: payload.name,
      email: payload.email,
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
