import { NextResponse } from "next/server";
import type { PageContext } from "@/components/chat/provider";
import { ADVICE_ARTICLES, SAMPLE_VENUES } from "@/lib/mock-data";
import { ACCESS_STAMP_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { HELP_CARDS } from "@/lib/help-cards";

type Req = {
  message: string;
  page?: PageContext;
  voiceMode?: boolean;
  mode?: "hands-free" | "text";
  history?: Array<{ role: "user" | "assistant"; text: string }>;
};
type LlmShape = {
  reply: string;
  quickActions?: string[];
  links?: Array<{ label: string; href: string }>;
};

const MUST_HAVE_TOKENS = [
  "step-free",
  "accessible toilet",
  "accessible toilets",
  "changing places",
  "changing place",
  "toilet",
  "toilets",
  "parking",
  "blue badge",
  "turning space",
  "quiet",
  "lift",
  "automatic doors",
] as const;

function extractLocation(t: string) {
  const fromIn = t.match(/\bin\s+([A-Za-z][A-Za-z0-9\s,'-]{1,40})/)?.[1]?.trim();
  if (fromIn) return fromIn.replace(/[.,]+$/, "");
  const near = t.match(/\bnear\s+([A-Za-z][A-Za-z0-9\s,'-]{1,40})/i)?.[1]?.trim();
  if (near) return near.replace(/[.,]+$/, "");
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

/** Wrong slug sometimes emitted by models; Venue Finder lives at `/venue-finder`. */
function normalizeVenueHref(href: string) {
  return href.replace(/^\/venues(?=$|[/?#])/i, "/venue-finder");
}

function normalizeAssistantReply(reply: string) {
  let out = reply.replace(/\]\(\/venues([^)]*)\)/gi, "](/venue-finder$1)");
  // Never imply navigation happened when we only provide a link.
  out = out.replace(/\bI(?:'|’)?ve\s+opened\s+the\s+venue\s+finder\s+for\s+you\b\.?/gi, "Here’s a link to Venue Finder:");
  out = out.replace(/\bI\s+opened\s+the\s+venue\s+finder\b\.?/gi, "Open Venue Finder here:");
  out = out.replace(/\bI(?:'|’)?ve\s+opened\s+it\s+for\s+you\b\.?/gi, "You can open it here:");
  return out;
}

function normalizeVenueActionLabel(label: string) {
  if (/venue\s*finder/i.test(label)) return "Open Venue Finder";
  if (/(find|search|more).*(venue|venues)/i.test(label)) return "Open Venue Finder";
  if (/(venue|venues).*(find|search|more)/i.test(label)) return "Open Venue Finder";
  return label;
}

function normalizeQuickActions(actions?: string[]) {
  if (!actions?.length) return undefined;
  return actions.map((a) => normalizeVenueActionLabel(a));
}

function normalizeAssistantLinks(links?: Array<{ label: string; href: string }>) {
  if (!links?.length) return [];
  return links.map((l) => {
    const href = normalizeVenueHref(l.href);
    return {
      ...l,
      label: href.startsWith("/venue-finder") ? "Open Venue Finder" : l.label,
      href,
    };
  });
}

function pageSummary(page: PageContext) {
  if (page.kind === "venue-finder") return "User is on venue finder page.";
  if (page.kind === "submit-venue") return "User is on submit venue page.";
  if (page.kind === "venue") return `User is on venue page for: ${page.name}.`;
  if (page.kind === "advice-article") return `User is reading article: ${page.title}.`;
  return "No specific page context.";
}

function buildLlmUserPrompt(
  message: string,
  page: PageContext,
  history?: Req["history"],
  voiceMode?: boolean,
) {
  const venues = SAMPLE_VENUES.slice(0, 8)
    .map((v) => `${v.name} (${v.location}) — ${v.tags.join(", ")}`)
    .join("\n");
  const advice = ADVICE_ARTICLES.slice(0, 10).map((a) => `${a.title} (/advice/${a.slug})`).join("\n");
  const cards = HELP_CARDS.slice(0, 14).map((c) => `${c.title} (/help-cards?concern=${encodeURIComponent(c.tags[0] ?? c.title)})`).join("\n");
  const historyText =
    history?.length
      ? history
          .slice(-8)
          .map((h) => `${h.role === "user" ? "User" : "Assistant"}: ${h.text}`)
          .join("\n")
      : "No prior turns.";
  return [
    `User message: ${message}`,
    `Page context: ${pageSummary(page)}`,
    "Sample venue data:",
    venues,
    "Sample advice guides:",
    advice,
    "Sample help cards:",
    cards,
    "Recent conversation:",
    historyText,
    [
      "Accessibility scope is identical in text and voice: answer disability and access questions for as many people and situations as possible — mobility, sensory, neurodivergence, chronic illness, mental health navigation (signpost only), communication, benefits, rights, housing, care, education, work, travel, digital access, and more. Lead with what helps their situation; avoid generic three-bullet templates unless they asked for a list.",
      voiceMode
        ? "Hands-free (voice) mode: keep replies short (easy to hear), conversational, one follow-up question at a time — same substance as text, tighter wording."
        : "Text mode: concise and practical; you may use a little more structure than voice when it helps scanning.",
    ].join("\n"),
    "Answer the user's question directly first.",
    "Only suggest help cards when the user explicitly asks for a card/template/checklist/download.",
    "If the user is off-topic for Access Stamp (for example recipes), refuse briefly and redirect to Access Stamp topics.",
    'Return STRICT JSON only: {"reply":"string","quickActions":["string"],"links":[{"label":"string","href":"string"}]}',
    "Limit quickActions to max 4 short suggestions.",
    "Use Markdown in reply sparingly: **bold** for emphasis, bullet lists when listing steps. Never output raw broken Markdown.",
    "For more venues, link only to `/venue-finder` (never `/venues`). Match quick-action wording to link labels (e.g. both say Open Venue Finder).",
  ].join("\n\n");
}

async function callLlm(
  message: string,
  page: PageContext,
  history?: Req["history"],
  voiceMode?: boolean,
): Promise<LlmShape | null> {
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
          { role: "user", content: buildLlmUserPrompt(message, page, history, voiceMode) },
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
      reply: normalizeAssistantReply(parsed.reply),
      quickActions: normalizeQuickActions(
        Array.isArray(parsed.quickActions) ? parsed.quickActions.slice(0, 4) : undefined,
      ),
      links: normalizeAssistantLinks(Array.isArray(parsed.links) ? parsed.links.slice(0, 3) : undefined),
    };
  } catch {
    return null;
  }
}

function matchHelpCards(message: string) {
  const low = message.toLowerCase();
  const scored = HELP_CARDS.map((card) => {
    const hay = `${card.title} ${card.summary} ${card.tags.join(" ")} ${card.checklist.join(" ")}`.toLowerCase();
    const score = low.split(/\s+/).reduce((acc, token) => (token && hay.includes(token) ? acc + 1 : acc), 0);
    return { card, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return scored.map((x) => ({
    label: x.card.title,
    href: `/help-cards?concern=${encodeURIComponent(x.card.tags[0] ?? x.card.title)}`,
  }));
}

function isTransferQuestion(t: string) {
  return /(transfer|hoist|slide\s*sheet|move\s+my|lift\s+my|pivot\s+transfer)/i.test(t);
}

function isVenueQuestion(t: string) {
  return /(restaurant|cafe|café|hotel|pub|bar|cinema|museum|near me|nearby|postcode|wheelchair|toilet|toilets|loo|changing places|accessible toilet|venue finder|find (?:a |an )?place)/i.test(
    t,
  );
}

function isPipQuestion(t: string) {
  return /\bpip\b|personal independence payment/i.test(t);
}

function isHelpCardIntent(t: string) {
  return /(help card|access card|flashcard|flash card|download.*card|print.*card|template card|checklist card)/i.test(t);
}

function isOutOfScope(t: string) {
  const low = t.toLowerCase();
  const domainSignal =
    /(access|accessible|disab|wheelchair|pip|benefit|reasonable adjustment|care plan|mobility|venue|toilet|blue badge|transport|school|send|workplace|equality act|adjustment|carer|equipment|rights)/i.test(
      t,
    );
  if (domainSignal) return false;
  return /(recipe|cook|cooking|meal plan|football score|crypto|stock tip|horoscope|movie review|gaming build|dating advice)/i.test(low);
}

function crisisSignal(t: string) {
  return /(suicide|kill myself|self-harm|end my life|can't go on)/i.test(t);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Req;
  const msg = (body.message ?? "").trim();
  const page = body.page ?? { kind: "none" };
  const voice = Boolean(body.voiceMode || body.mode === "hands-free");

  if (!msg) {
    return NextResponse.json({ reply: "What would you like help with?" });
  }

  if (crisisSignal(msg)) {
    const reply =
      "I’m really sorry you’re feeling this way. If you’re in immediate danger, call 999 now. If you can, call Samaritans on 116 123 (free, 24/7) or text SHOUT to 85258. If you tell me what’s happening right now and where you are in the UK, I can help you find the safest next step.";
    return NextResponse.json({ reply: voice ? short(reply) : reply });
  }

  if (isOutOfScope(msg)) {
    const reply =
      "I can only help with Access Stamp topics like disability access, venues, support, benefits, rights, transport, education, work adjustments, and care planning. Ask me one of those and I’ll give you a direct answer.";
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      quickActions: ["Open Venue Finder", "Explain PIP simply", "Reasonable adjustments at work"],
    });
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

  const matchedCards = matchHelpCards(msg);
  if (matchedCards.length && isHelpCardIntent(msg)) {
    const reply =
      "I found help cards that match what you asked for. Open one and use 'Tailor with AI' if you want it adapted to your situation.";
    return NextResponse.json({
      reply: voice ? short(reply) : reply,
      links: matchedCards,
      quickActions: ["Tailor this for my case", "Give me a meeting script", "What should I ask first?"],
    });
  }

  const llm = await callLlm(msg, page, body.history, voice);
  if (llm) {
    return NextResponse.json({
      reply: voice ? short(llm.reply) : llm.reply,
      quickActions: llm.quickActions,
      links: normalizeAssistantLinks(llm.links),
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
      links: [{ label: "Open Venue Finder", href: "/venue-finder" }],
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

