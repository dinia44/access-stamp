"use client";

import { useState } from "react";
import type { HelpCard } from "@/data/help-cards/types";
import { useChat } from "@/components/chat/provider";

export function HelpCardAiPanel({ card }: { card: HelpCard }) {
  const { openChat } = useChat();
  const [opening, setOpening] = useState(false);

  function handleTailor() {
    setOpening(true);
    openChat({
      prefill: `Help me understand and apply the "${card.title}" Access Stamp help card for my situation. Keep the reviewed wording, rules and official sources unchanged. Do not invent or change any legal, medical, benefits or driving claims. My situation is: `,
    });
    window.setTimeout(() => setOpening(false), 1200);
  }

  return (
    <aside
      className="no-print rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5"
      aria-labelledby="help-card-ai-heading"
    >
      <h2 id="help-card-ai-heading" className="text-lg font-semibold text-[var(--color-ink)]">
        Optional: understand this with AI
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
        AI can help you understand or apply this card. It is not a legal or regulatory source and cannot verify
        the rules. It will not change any rule, number, condition, exception or source above. The reviewed card
        stays available without AI.
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
        Before you continue, avoid sending names, addresses, booking or reference numbers, or unnecessary health
        details. Only share what you are comfortable sending to the assistant.
      </p>
      <button
        type="button"
        onClick={handleTailor}
        aria-label={`Understand ${card.title} with AI`}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      >
        {opening ? "Opening AI…" : "Understand with AI"}
      </button>
    </aside>
  );
}
