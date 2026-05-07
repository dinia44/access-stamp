import { NextResponse } from "next/server";
import type { PageContext } from "@/components/chat/provider";
import { ADVICE_ARTICLES, SAMPLE_VENUES } from "@/lib/mock-data";
import { ACCESS_STAMP_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

type Req = {
  message: string;
  page?: PageContext;
  voiceMode?: boolean;
};
type LlmShape = {
  reply: string;
  quickActions?: string[];
};

const MUST_HAVE_TOKENS = [
  "step-free",
  "accessible toilet",
  "parking",
  "blue badge",
  "turning space",
  "quiet",
  "lift",
  "automatic doors",
] as const;

function extractLocation(t: string) {
  const fromIn = t.match(/\bin\s+([a-z][a-z\s-]{1,30})/i)?.[1]?.trim();
  if (fromIn) return fromIn;
  const postcode = t.match(/\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/i)?.[0];
  if (postcode) return postcode.toUpperCase();
  return "";
}

function extractMustHaves(t: string) {
  const low = t.toLowerCase();
  return MUST_HAVE_TOKENS.filter((token) => low.includes(token));
}

function short(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function pageSummary(page: PageContext) {
  if (page.kind === "venue-finder") return "User is on venue finder page.";
  if (page.kind === "submit-venue") return "User is on submit venue page.";
  if (page.kind === "venue") return `User is on venue page for: ${page.name}.`;
  if (page.kind === "advice-article") return `User is reading article: ${page.title}.`;
  return "No specific page context.";
}

function buildLlmUserPrompt(message: string, page: PageContext) {
  const venues = SAMPLE_VENUES.slice(0, 8)
    .map((v) => `${v.name} (${v.location}) — ${v.tags.join(", ")}`)
    .join("\n");
  const advice = ADVICE_ARTICLES.slice(0, 10).map((a) => `${a.title} (/advice/${a.slug})`).join("\n");
  return [
    `User message: ${message}`,
    `Page context: ${pageSummary(page)}`,
    "Sample venue data:",
    venues,
    "Sample advice guides:",
    advice,
    'Return STRICT JSON only: {"reply":"string","quickActions":["string"]}',
    "Limit quickActions to max 4 short suggestions.",
  ].join("\n\n");
}

async function callLlm(message: string, page: PageContext): Promise<LlmShape | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: [
          { role: "system", content: ACCESS_STAMP_SYSTEM_PROMPT },
          { role: "user", content: buildLlmUserPrompt(message, page) },
        ],
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = json.choices?.[0]?.message?.content?.trim();
    const content = raw?.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
    if (!content) return null;
    const parsed = JSON.parse(content) as LlmShape;
    if (!parsed.reply || typeof parsed.reply !== "string") return null;
    return {
      reply: parsed.reply,
      quickActions: Array.isArray(parsed.quickActions) ? parsed.quickActions.slice(0, 4) : undefined,
    };
  } catch {
    return null;
  }
}

function isTransferQuestion(t: string) {
  return /(transfer|hoist|slide\s*sheet|move\s+my|lift\s+my|pivot\s+transfer)/i.test(t);
}

function isVenueQuestion(t: string) {
  return /(restaurant|cafe|café|hotel|pub|bar|cinema|museum|near me|nearby|postcode|wheelchair)/i.test(t);
}

function isPipQuestion(t: string) {
  return /\bpip\b|personal independence payment/i.test(t);
}

function crisisSignal(t: string) {
  return /(suicide|kill myself|self-harm|end my life|can't go on)/i.test(t);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Req;
  const msg = (body.message ?? "").trim();
  const page = body.page ?? { kind: "none" };
  const voice = Boolean(body.voiceMode);

  if (!msg) {
    return NextResponse.json({ reply: "What would you like help with?" });
  }

  if (crisisSignal(msg)) {
    const reply =
      "I’m really sorry you’re feeling this way. If you’re in immediate danger, call 999 now. If you can, call Samaritans on 116 123 (free, 24/7) or text SHOUT to 85258. If you tell me what’s happening right now and where you are in the UK, I can help you find the safest next step.";
    return NextResponse.json({ reply: voice ? short(reply) : reply });
  }

  if (isTransferQuestion(msg)) {
    const disclaimer =
      "Physical transfers should always align with the individual’s professional care plan. If you haven’t had manual handling training, please arrange this before attempting transfers. Improper technique can cause serious injury to both the person being moved and the handler.";

    const questions =
      "A couple of quick questions so I don’t give unsafe advice: do they have a care plan with transfer instructions, and is this a one-person or two-person transfer? Also, do you have any equipment (slide sheet, transfer board, hoist)?";

    const reply = `${disclaimer}\n\n${questions}`;
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      quickActions: ["We have a slide sheet", "We have a hoist", "It’s one-person", "It’s two-person"],
    });
  }

  if (isPipQuestion(msg)) {
    const a = ADVICE_ARTICLES.find((x) => x.slug === "pip-in-plain-english");
    const reply =
      "Personal Independence Payment (PIP) is a UK benefit to help with extra costs of disability. It’s based on how your condition affects you day to day, not your diagnosis. If you tell me what you struggle with (walking, fatigue, pain, cooking, washing, dressing, communication), I can help you map that to practical evidence to write down.";
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      links: a ? [{ label: "Read: PIP in plain English", href: `/advice/${a.slug}` }] : [],
      quickActions: ["What evidence should I collect?", "Help me write examples", "Explain PIP descriptors"],
    });
  }

  if (page.kind === "submit-venue") {
    const reply =
      "You’re on the suggest-a-venue form. Tell me the venue name, town or postcode, and anything you know about access — step-free entry, toilets, parking, turning space, noise. I can help you phrase it clearly before you submit.";
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      quickActions: ["It’s step-free with a good toilet", "I’m not sure what to write", "Parking & Blue Badge"],
    });
  }

  const llm = await callLlm(msg, page);
  if (llm) {
    return NextResponse.json({
      reply: voice ? short(llm.reply) : llm.reply,
      quickActions: llm.quickActions,
    });
  }

  // Venue search mode (simple mock until database + real AI integration)
  if (page.kind === "venue-finder" || isVenueQuestion(msg)) {
    const location = extractLocation(msg);
    const mustHaves = extractMustHaves(msg);
    const missingLocation = !location;
    const missingMustHaves = mustHaves.length === 0;
    const reply = missingLocation || missingMustHaves
      ? `I can help you find places that genuinely work. ${missingLocation ? "Share your town/postcode area." : ""} ${missingMustHaves ? "Tell me your must-haves (like step-free, toilet, parking, quiet)." : ""}`.trim()
      : `Great, I’ll use ${location} with must-haves: ${mustHaves.join(", ")}. Here are a few places to start.`;
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      venues: SAMPLE_VENUES.map((v) => ({
        slug: v.slug,
        name: v.name,
        location: v.location,
        tags: v.tags,
      })),
      quickActions: [
        "Step-free + accessible toilet",
        "Blue Badge parking",
        "Powered wheelchair space",
        "Quiet environment",
      ],
    });
  }

  // If on a specific venue page, respond in venue-context.
  if (page.kind === "venue") {
    const reply =
      `You’re looking at ${page.name}. Tell me what matters most for you (toilet, door width, parking, seating, noise), and I’ll help you work out whether this venue is likely to be usable, and what to ask before you go.`;
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      quickActions: ["Is the toilet usable?", "Is the entrance step-free?", "What should I ask the venue?"],
    });
  }

  // Default
  let reply =
    "Tell me what you’re trying to do, and what would make it workable for you. If this is about venues, share a location and your access must-haves. If it’s about rights or care, tell me what happened and what outcome you need.";
  if (page.kind === "advice-article") {
    reply = `You’re reading “${page.title}”. ${reply}`;
  }

  return NextResponse.json({
    reply: voice ? short(reply) : reply,
    quickActions:
      page.kind === "advice-article"
        ? ["Summarise this article", "Explain jargon", "What should I do next?"]
        : undefined,
  });
}

