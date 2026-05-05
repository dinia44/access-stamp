import { NextResponse } from "next/server";
import type { PageContext } from "@/components/chat/provider";
import { ADVICE_ARTICLES, SAMPLE_VENUES } from "@/lib/mock-data";

type Req = {
  message: string;
  page?: PageContext;
  voiceMode?: boolean;
};

function short(s: string) {
  return s.replace(/\s+/g, " ").trim();
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

  // Venue search mode (simple mock until database + real AI integration)
  if (page.kind === "venue-finder" || isVenueQuestion(msg)) {
    const reply =
      "I can help you find places that genuinely work, not just ones labelled ‘accessible’. What location are you searching (city/town or postcode area), and what are your must-haves (step-free entrance, accessible toilet, Blue Badge parking, turning space, quiet, etc.)?";
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
  const reply =
    "Tell me what you’re trying to do, and what would make it workable for you. If this is about venues, share a location and your access must-haves. If it’s about rights or care, tell me what happened and what outcome you need.";
  return NextResponse.json({
    reply: voice ? short(reply) : reply,
  });
}

