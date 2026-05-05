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
    <div className="bg-background">
      <SetChatContext page={{ kind: "glossary" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="amber">Glossary</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Jargon buster</h1>
            <p className="max-w-[85ch] text-muted">
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
