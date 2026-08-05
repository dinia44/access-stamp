"use client";

import { useId, useState } from "react";
import type { HelpCard, HelpCardVariant } from "@/data/help-cards/types";
import { getHelpCardPlainText } from "@/lib/help-cards/copy-text";

export function HelpCardDetailActions({ card, variant }: { card: HelpCard; variant: HelpCardVariant }) {
  const liveId = useId();
  const [saveState, setSaveState] = useState<"idle" | "saved" | "failed">("idle");

  function saveCard() {
    try {
      const blob = new Blob([getHelpCardPlainText(card, variant)], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${card.slug}.txt`;
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

  return (
    <div className="no-print space-y-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={saveCard}
          aria-label={`Save ${card.title} card as a text file on this device`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          {saveState === "saved" ? "Downloaded" : saveState === "failed" ? "Save failed" : "Save card"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          aria-label={`Print ${card.title} card`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Print card
        </button>
      </div>
      <p className="text-sm leading-6 text-[var(--color-text-muted)]">
        Save downloads a text file to this device. It is not stored in an Access Stamp account and may be
        visible to other people who use this browser profile.
      </p>
      <p id={liveId} className="sr-only" aria-live="polite">
        {saveState === "saved"
          ? `${card.title} card downloaded to this device`
          : saveState === "failed"
            ? `Could not save ${card.title} card`
            : ""}
      </p>
    </div>
  );
}
