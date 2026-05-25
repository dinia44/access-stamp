"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { useChat } from "@/components/chat/provider";

const CAPABILITIES = [
  {
    icon: "\uD83C\uDFE8",
    title: "Venue matching",
    desc: "Tell us your chair width, transfer ability, and sensory needs \u2014 we match against audited venue data ChatGPT can\u2019t access.",
  },
  {
    icon: "\uD83D\uDCCF",
    title: "\u2018Will it fit?\u2019 checks",
    desc: "Enter your wheelchair dimensions and we compare them against verified doorway and turning-circle measurements.",
  },
  {
    icon: "\uD83E\uDDBD",
    title: "Equipment funding advisor",
    desc: "Guided flow through Disabled Facilities Grants, Motability, NHS wheelchair services, charity grants, and VAT relief.",
  },
  {
    icon: "\u2696\uFE0F",
    title: "Rights advisor",
    desc: "Grounded in the Equality Act 2010 and European Accessibility Act, with anonymised examples from real audits.",
  },
  {
    icon: "\uD83C\uDF99\uFE0F",
    title: "Voice-first interaction",
    desc: "Full hands-free mode with live captions. Designed for users with limited dexterity \u2014 a UX moat over generic chat.",
  },
  {
    icon: "\uD83D\uDCDA",
    title: "UK-specific knowledge",
    desc: "PIP, Blue Badge, Access to Work, social care assessments, DSA \u2014 real eligibility logic, not generic summaries.",
  },
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
              Not another generic chatbot. Our AI is grounded in verified venue audits, UK disability
              law, real funding routes, and practical lived-experience knowledge that general AI
              doesn&rsquo;t have.
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

          <Card className="space-y-4 bg-gradient-to-br from-blue-pale to-background p-6">
            <h2 className="text-lg font-semibold text-heading">
              Why this beats general AI for accessibility
            </h2>
            <ul className="space-y-2 text-sm text-text">
              <li>
                <strong className="font-semibold text-heading">We have data ChatGPT doesn&rsquo;t.</strong>{" "}
                Audited door widths, turning circles, toilet layouts, and photo evidence for real UK venues.
              </li>
              <li>
                <strong className="font-semibold text-heading">We ask questions ChatGPT doesn&rsquo;t know to ask.</strong>{" "}
                Chair width, transfer method, sensory sensitivities, carer presence \u2014 the details that determine
                whether a visit actually works.
              </li>
              <li>
                <strong className="font-semibold text-heading">UK funding logic is built in.</strong>{" "}
                Not a generic summary of &ldquo;disability grants&rdquo; but current eligibility paths for DFG,
                Motability, NHS wheelchair services, Access to Work, and charity routes.
              </li>
              <li>
                <strong className="font-semibold text-heading">Voice-first, not voice-bolted-on.</strong>{" "}
                Hands-free mode with auto-listen, live captions, and interrupt support \u2014 built for people
                who find typing difficult.
              </li>
            </ul>
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
