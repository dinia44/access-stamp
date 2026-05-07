"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Card } from "@/components/ui";
import { HELP_CARDS, HELP_CARD_CONCERNS, type HelpCard } from "@/lib/help-cards";
import { useChat } from "@/components/chat/provider";

function slugifyFile(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function HelpCardsHub({ initialConcern = "" }: { initialConcern?: string }) {
  const { openChat } = useChat();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [concern, setConcern] = useState(initialConcern);

  const filtered = useMemo(() => {
    const order = ["Work", "Education", "Driving", "Travel", "Care", "Rights", "Emergency"];
    const q = query.trim().toLowerCase();
    return HELP_CARDS.filter((card) => {
      if (category !== "All" && card.category !== category) return false;
      if (
        concern &&
        !`${card.title} ${card.summary} ${card.tags.join(" ")} ${card.checklist.join(" ")}`.toLowerCase().includes(concern.toLowerCase())
      ) {
        return false;
      }
      if (!q) return true;
      return (
        card.title.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        card.checklist.some((item) => item.toLowerCase().includes(q))
      );
    }).sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  }, [query, category, concern]);

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function drawBullets(
    ctx: CanvasRenderingContext2D,
    items: string[],
    x: number,
    y: number,
    width: number,
    lineHeight: number,
  ) {
    let cursor = y;
    for (const item of items) {
      const lines = wrapText(ctx, `• ${item}`, width);
      for (const line of lines) {
        ctx.fillText(line, x, cursor);
        cursor += lineHeight;
      }
      cursor += 4;
    }
    return cursor;
  }

  function downloadCard(card: HelpCard) {
    const canvas = document.createElement("canvas");
    const width = 1400;
    const height = 1900;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f3f8ff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(60, 60, width - 120, height - 120);
    ctx.strokeStyle = "#dbe3ef";
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    let y = 130;
    ctx.fillStyle = "#2478d0";
    ctx.font = "700 30px Arial, sans-serif";
    ctx.fillText(`Access Stamp Help Card • ${card.category}`, 100, y);

    y += 65;
    ctx.fillStyle = "#0c1d34";
    ctx.font = "700 48px Arial, sans-serif";
    for (const line of wrapText(ctx, card.title, width - 200)) {
      ctx.fillText(line, 100, y);
      y += 58;
    }

    y += 8;
    ctx.fillStyle = "#2c3e54";
    ctx.font = "400 30px Arial, sans-serif";
    for (const line of wrapText(ctx, card.summary, width - 200)) {
      ctx.fillText(line, 100, y);
      y += 40;
    }

    y += 20;
    ctx.fillStyle = "#0c1d34";
    ctx.font = "700 34px Arial, sans-serif";
    ctx.fillText("Must ask", 100, y);
    y += 46;
    ctx.fillStyle = "#2c3e54";
    ctx.font = "400 27px Arial, sans-serif";
    y = drawBullets(ctx, card.mustAsk, 100, y, width - 200, 36);

    y += 12;
    ctx.fillStyle = "#0c1d34";
    ctx.font = "700 34px Arial, sans-serif";
    ctx.fillText("Checklist", 100, y);
    y += 46;
    ctx.fillStyle = "#2c3e54";
    ctx.font = "400 27px Arial, sans-serif";
    y = drawBullets(ctx, card.checklist, 100, y, width - 200, 36);

    y += 12;
    ctx.fillStyle = "#0c1d34";
    ctx.font = "700 34px Arial, sans-serif";
    ctx.fillText("Key line", 100, y);
    y += 46;
    ctx.fillStyle = "#1f4d84";
    ctx.font = "700 28px Arial, sans-serif";
    for (const line of wrapText(ctx, card.keyLine, width - 200)) {
      ctx.fillText(line, 100, y);
      y += 38;
    }

    ctx.fillStyle = "#5a6e82";
    ctx.font = "400 22px Arial, sans-serif";
    ctx.fillText("access-stamp.vercel.app/help-cards", 100, height - 110);

    const href = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = href;
    a.download = `${slugifyFile(card.title)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
              {card.checklist.slice(0, 6).map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">Must ask</div>
            <ul className="mt-2 grid gap-1 text-sm text-text">
              {card.mustAsk.map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
            <details className="mt-3 rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-heading">
                Documents and escalation
              </summary>
              <div className="mt-2 text-sm text-text">
                <div className="font-semibold text-heading">Carry:</div>
                <ul className="mt-1 grid gap-1">
                  {card.documentsToCarry.map((line) => (
                    <li key={line}>- {line}</li>
                  ))}
                </ul>
                <div className="mt-2 font-semibold text-heading">Escalate if:</div>
                <ul className="mt-1 grid gap-1">
                  {card.escalateIf.map((line) => (
                    <li key={line}>- {line}</li>
                  ))}
                </ul>
              </div>
            </details>
            <div className="mt-4 rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-sm text-heading">
              <span className="font-semibold">Key line:</span> {card.keyLine}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => downloadCard(card)}>Download PNG</Button>
              <Button variant="ghost" onClick={() => window.print()}>
                Print
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  openChat({
                    prefill: `Tailor this help card for me: ${card.title}. My situation is: `,
                  })
                }
              >
                Tailor with AI
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
