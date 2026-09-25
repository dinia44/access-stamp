"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { useChat } from "@/components/chat/provider";

const CAPABILITIES = [
  { icon: "📍", title: "Venue questions", desc: "Turn your access needs into questions to ask a venue. Current demonstration listings are not verified travel information." },
  { icon: "📏", title: "Doorway comparisons", desc: "Compare chair width with each listed opening and a planning allowance. Missing measurements remain unknown; a width comparison cannot prove overall access." },
  { icon: "📝", title: "Drafting support", desc: "Prepare an access request, letter or checklist, then review the details before using it." },
  { icon: "📚", title: "UK guidance", desc: "Explore practical guides and source links. Check current requirements with the relevant organisation before making decisions." },
] as const;

export default function AiPage() {
  const { openChat } = useChat();

  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <Badge tone="blue">AI Assistant</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">
              Access Stamp AI
            </h1>
            <p className="max-w-[85ch] text-base text-muted">
              Ask questions, prepare wording and organise your next steps. The assistant can make mistakes.
              Venue coverage currently includes demonstration listings, which must not be treated as verified access evidence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <Card key={c.title} className="p-5">
                <div className="mb-2 text-2xl" aria-hidden>{c.icon}</div>
                <div className="text-sm font-semibold text-heading">{c.title}</div>
                <p className="mt-1 text-sm text-muted">{c.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="space-y-4 p-6">
            <h2 className="text-lg font-semibold text-heading">Check the evidence before acting</h2>
            <p className="text-sm text-text">AI does not verify a venue or establish eligibility for support. Review the listing’s evidence status, check source dates, and confirm important details directly. Demonstration measurements are examples only.</p>
            <Link href="/methodology" className="inline-flex min-h-11 items-center font-semibold text-blue underline">How our evidence labels work</Link>
          </Card>

          <Card className="space-y-3 border-blue/20 bg-blue-pale/40 p-5">
            <h2 className="text-lg font-semibold text-heading">AI Toolkit — structured outputs</h2>
            <p className="text-sm text-muted">
              Need a letter, evidence checklist, or action plan? Use guided tools that return structured cards — not a
              blank chat.
            </p>
            <Link
              href="/ai-toolkit"
              className="inline-flex rounded-[var(--radius-ui)] bg-blue px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:brightness-110"
            >
              Open AI Toolkit
            </Link>
          </Card>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openChat()}
              className="rounded-[var(--radius-ui)] bg-blue px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:brightness-110 cursor-pointer"
            >
              Open AI assistant
            </button>
            <Link
              href="/advice/equipment"
              className="rounded-[var(--radius-ui)] border border-border bg-card px-5 py-3 text-sm font-semibold text-heading shadow-[var(--shadow-soft)] transition-colors hover:bg-blue-pale"
            >
              Equipment funding advisor
            </Link>
            <Link
              href="/venue-finder"
              className="rounded-[var(--radius-ui)] border border-border bg-card px-5 py-3 text-sm font-semibold text-heading shadow-[var(--shadow-soft)] transition-colors hover:bg-blue-pale"
            >
              Find a venue
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
