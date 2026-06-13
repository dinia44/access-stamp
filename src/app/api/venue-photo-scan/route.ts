import { NextResponse } from "next/server";

const MAX_BASE64_LENGTH = 6_000_000;

type ScanResponse = {
  features: string;
  notes?: string;
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const imageBase64 =
    body && typeof body === "object" && typeof (body as { imageBase64?: string }).imageBase64 === "string"
      ? (body as { imageBase64: string }).imageBase64.trim()
      : "";
  const mimeType =
    body && typeof body === "object" && typeof (body as { mimeType?: string }).mimeType === "string"
      ? (body as { mimeType: string }).mimeType.trim()
      : "image/jpeg";

  if (!imageBase64 || imageBase64.length > MAX_BASE64_LENGTH) {
    return NextResponse.json({ error: "Please upload a photo under 4 MB." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Photo scanning is not available yet. Describe access features in the form for now.",
      },
      { status: 503 },
    );
  }

  const model = process.env.OPENAI_VISION_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: [
                  "You help build honest UK venue accessibility listings.",
                  "Look at this venue photo and describe observable access features and possible barriers in plain English.",
                  "Cover what you can see: step-free entry, ramps, doors, toilets, parking, signage, lighting, seating, clutter, and turning space.",
                  "If something is unclear, say so — do not invent measurements.",
                  'Return STRICT JSON only: {"features":"bullet-style plain text for a listing form","notes":"optional short caveat"}',
                ].join("\n"),
              },
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${imageBase64}` },
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[venue-photo-scan] OpenAI error", res.status);
      return NextResponse.json({ error: "We could not scan that photo. Try another image or describe access in text." }, { status: 502 });
    }

    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const raw = json.choices?.[0]?.message?.content?.trim();
    const content = raw?.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
    if (!content) {
      return NextResponse.json({ error: "No scan result returned. Try again or describe access in text." }, { status: 502 });
    }

    const parsed = JSON.parse(content) as ScanResponse;
    if (!parsed.features || typeof parsed.features !== "string") {
      return NextResponse.json({ error: "Scan result was unclear. Try another photo or describe access in text." }, { status: 502 });
    }

    console.info("[venue-photo-scan] scanned photo for listing draft");
    return NextResponse.json({
      ok: true,
      features: parsed.features.trim(),
      notes: typeof parsed.notes === "string" ? parsed.notes.trim() : undefined,
    });
  } catch (err) {
    console.error("[venue-photo-scan] failed", err);
    return NextResponse.json({ error: "We could not scan that photo. Try again or describe access in text." }, { status: 502 });
  }
}
