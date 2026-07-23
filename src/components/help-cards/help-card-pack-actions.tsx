"use client";

import { useId, useState } from "react";
import type { HelpCardPack } from "@/data/helpCardPacks";
import { getPackCardCopyText } from "@/lib/help-cards/copy-text";
import { formatPrintDate } from "@/lib/help-cards/format";
import { cn } from "@/lib/utils";

function packPlainText(pack: HelpCardPack): string {
  const parts = [
    `Access Stamp — ${pack.title}`,
    pack.jurisdiction ? `Jurisdiction: ${pack.jurisdiction}` : null,
    pack.lastReviewed ? `Last reviewed: ${pack.lastReviewed}` : "Last reviewed: unavailable — check official sources",
    "",
    pack.description,
    "",
    `Use this when: ${pack.useWhen}`,
    "",
  ];

  for (const card of pack.cards) {
    parts.push(`## ${card.title}`);
    parts.push(card.shortDescription);
    parts.push(getPackCardCopyText(card));
    if (card.disclaimer) parts.push(card.disclaimer);
    if (card.sources?.length) {
      parts.push("Sources:");
      for (const source of card.sources) {
        parts.push(`- ${source.label}${source.href ? ` (${source.href})` : ""}`);
      }
    }
    parts.push("");
  }

  parts.push(
    "Important: Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal or financial advice. Always check the official source before relying on a card.",
  );

  return parts.filter((line) => line !== null).join("\n");
}

export function HelpCardPackActionBar({ pack }: { pack: HelpCardPack }) {
  const liveId = useId();
  const [saveState, setSaveState] = useState<"idle" | "saved" | "failed">("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function savePack() {
    try {
      const blob = new Blob([packPlainText(pack)], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${pack.slug}.txt`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("failed");
      window.setTimeout(() => setSaveState("idle"), 3500);
    }
  }

  function printPack() {
    document.body.dataset.helpCardPrintScope = "pack";
    window.print();
    window.setTimeout(() => {
      delete document.body.dataset.helpCardPrintScope;
    }, 500);
  }

  async function copyQuickLine() {
    const firstScript = pack.cards.find((card) => card.keyLine)?.keyLine;
    if (!firstScript) {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2500);
      return;
    }
    try {
      await navigator.clipboard.writeText(firstScript);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2500);
    }
  }

  return (
    <div className="no-print space-y-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void savePack()}
          aria-label={`Save ${pack.title} pack as a text file on this device`}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
          )}
        >
          {saveState === "saved" ? "Downloaded" : saveState === "failed" ? "Save failed" : "Save pack"}
        </button>
        <button
          type="button"
          onClick={printPack}
          aria-label={`Print ${pack.title} pack`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Print pack
        </button>
        {pack.cards.some((card) => card.keyLine) ? (
          <button
            type="button"
            onClick={() => void copyQuickLine()}
            aria-label={`Copy quick line from ${pack.title}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-transparent bg-transparent px-3 text-sm font-semibold text-[var(--color-brand)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            {copyState === "copied" ? "Copied quick line" : "Copy quick line"}
          </button>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-[var(--color-text-muted)]">
        Save downloads a text file to this device. It is not stored in an Access Stamp account and may be
        visible to other people who use this browser profile. Printed on {formatPrintDate()} when you print.
      </p>
      <p id={liveId} className="sr-only" aria-live="polite">
        {saveState === "saved"
          ? `${pack.title} pack downloaded to this device`
          : saveState === "failed"
            ? `Could not save ${pack.title} pack`
            : copyState === "copied"
              ? `Copied quick line from ${pack.title}`
              : copyState === "failed"
                ? `Could not copy quick line from ${pack.title}`
                : ""}
      </p>
    </div>
  );
}
