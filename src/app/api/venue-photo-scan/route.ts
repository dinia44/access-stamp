import { NextResponse } from "next/server";
import type { QuickScanMeasurement, QuickScanResult } from "@/lib/venue-quick-scan";

const MAX_BASE64_LENGTH = 6_000_000;

type ScanResponse = QuickScanResult;

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((s) => s.trim());
}

function parseScanResponse(parsed: Record<string, unknown>): ScanResponse | null {
  if (typeof parsed.features !== "string" || !parsed.features.trim()) return null;

  const measurements: QuickScanMeasurement[] | undefined = Array.isArray(parsed.measurements)
    ? parsed.measurements
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const row = item as Record<string, unknown>;
          if (typeof row.label !== "string" || typeof row.value !== "string") return null;
          const confidence: QuickScanMeasurement["confidence"] =
            row.confidence === "unclear" ? "unclear" : "estimate";
          return { label: row.label.trim(), value: row.value.trim(), confidence };
        })
        .filter((item): item is QuickScanMeasurement => item !== null)
    : undefined;

  return {
    features: parsed.features.trim(),
    alreadyAccessible: asStringArray(parsed.alreadyAccessible),
    needsImprovement: asStringArray(parsed.needsImprovement),
    smallSteps: asStringArray(parsed.smallSteps),
    measurements: measurements?.length ? measurements : undefined,
    notes: typeof parsed.notes === "string" ? parsed.notes.trim() : undefined,
  };
}

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
        error: "Quick Scan is not available yet. Describe access features in the form for now.",
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
                  "You help UK venues submit honest accessibility information to Access Stamp.",
                  "Look at this venue photo and assess observable access features and barriers.",
                  "Cover entrances, steps, ramps, doors, routes, toilets, parking, signage, lighting, seating, clutter, and turning space.",
                  "Do not invent exact measurements — only give approximate values when clearly visible, otherwise mark confidence as unclear.",
                  "Split findings into what already looks accessible, what may need improvement, and small practical next steps a venue could take.",
                  "Keep language plain, specific, and actionable for venue staff.",
                  'Return STRICT JSON only with this shape:',
                  '{"features":"bullet-style plain text for a listing form","alreadyAccessible":["…"],"needsImprovement":["…"],"smallSteps":["…"],"measurements":[{"label":"…","value":"…","confidence":"estimate|unclear"}],"notes":"optional short caveat"}',
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

    const parsed = JSON.parse(content) as Record<string, unknown>;
    const scan = parseScanResponse(parsed);
    if (!scan) {
      return NextResponse.json({ error: "Scan result was unclear. Try another photo or describe access in text." }, { status: 502 });
    }

    console.info("[venue-photo-scan] quick scan completed for listing draft");
    return NextResponse.json({ ok: true, ...scan });
  } catch (err) {
    console.error("[venue-photo-scan] failed", err);
    return NextResponse.json({ error: "We could not scan that photo. Try again or describe access in text." }, { status: 502 });
  }
}
