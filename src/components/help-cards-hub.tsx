"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Card } from "@/components/ui";
import { HELP_CARDS, HELP_CARD_CONCERNS, type HelpCard } from "@/lib/help-cards";

function toDownloadText(card: HelpCard) {
  return [
    card.title,
    "",
    `Category: ${card.category}`,
    `Summary: ${card.summary}`,
    "",
    "When to use:",
    ...card.whenToUse.map((item) => `- ${item}`),
    "",
    "Checklist:",
    ...card.checklist.map((item) => `- ${item}`),
    "",
    "Key line to use:",
    card.keyLine,
    "",
    "Created by Access Stamp Help Cards.",
  ].join("\n");
}

function slugifyFile(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function HelpCardsHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [concern, setConcern] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HELP_CARDS.filter((card) => {
      if (category !== "All" && card.category !== category) return false;
      if (concern && !card.tags.join(" ").toLowerCase().includes(concern.toLowerCase())) return false;
      if (!q) return true;
      return (
        card.title.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, category, concern]);

  function downloadCard(card: HelpCard) {
    const blob = new Blob([toDownloadText(card)], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${slugifyFile(card.title)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="space-y-5">
      <Card className="p-5 sm:p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm font-semibold text-muted">
            Search cards
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Section 88, interview, school, wheelchair damage..."
              className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
            />
          </label>
          <label className="text-sm font-semibold text-muted">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
            >
              {["All", "Driving", "Work", "Education", "Travel", "Care", "Rights", "Emergency"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-muted">
            I am worried about...
            <select
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="mt-1 h-11 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
            >
              <option value="">Choose a concern</option>
              {HELP_CARD_CONCERNS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      <div className="text-sm font-semibold text-heading">Cards available: {filtered.length}</div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((card) => (
          <Card key={card.slug} className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">{card.category}</Badge>
              {card.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} tone="amber" className="text-[11px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-heading">{card.title}</h3>
            <p className="mt-2 text-sm text-muted">{card.summary}</p>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">Checklist</div>
            <ul className="mt-2 grid gap-1 text-sm text-text">
              {card.checklist.slice(0, 4).map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
            <div className="mt-4 rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-sm text-heading">
              <span className="font-semibold">Key line:</span> {card.keyLine}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => downloadCard(card)}>Download card</Button>
              <Button variant="ghost" onClick={() => window.print()}>
                Print
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
