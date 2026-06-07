"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { GLOSSARY } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";

export default function GlossaryPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = term
      ? GLOSSARY.filter(
          (t) =>
            t.term.toLowerCase().includes(term) || t.meaning.toLowerCase().includes(term),
        )
      : GLOSSARY;
    return [...list].sort((a, b) => a.term.localeCompare(b.term));
  }, [q]);

  return (
    <div className="premium-section-hero">
      <SetChatContext page={{ kind: "glossary" }} />
      <Container className="py-12 md:py-16">
        <div className="space-y-8">
          <div className="page-hero-panel max-w-3xl space-y-4">
            <Badge tone="blue">Glossary</Badge>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-heading sm:text-5xl">Jargon buster</h1>
            <p className="max-w-[65ch] text-base leading-7 text-muted">
              Plain-language definitions for common disability-related terms and acronyms.
            </p>
          </div>

          <Card className="p-5">
            <label className="text-sm font-semibold text-muted">
              Search
              <input
                className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
                placeholder="Search terms…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
          </Card>

          <div className="grid gap-3">
            {filtered.map((t) => (
              <Card key={t.term} className="p-5">
                <div className="text-sm font-semibold text-heading">{t.term}</div>
                <div className="mt-2 text-sm text-muted">{t.meaning}</div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
