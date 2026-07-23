"use client";

import { useState } from "react";
import type { HelpCardPack } from "@/data/helpCardPacks";
import { useChat } from "@/components/chat/provider";

export function HelpCardAiPanel({ pack }: { pack: HelpCardPack }) {
  const { openChat } = useChat();
  const [opening, setOpening] = useState(false);

  function handleTailor() {
    setOpening(true);
    openChat({
      prefill: `Help me tailor the "${pack.title}" help card pack for my situation. Keep the official wording and sources unchanged. Do not invent legal, medical or eligibility claims. My situation is: `,
    });
    window.setTimeout(() => setOpening(false), 1200);
  }

  return (
    <aside
      className="no-print rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5"
      aria-labelledby="help-card-ai-heading"
    >
      <h2 id="help-card-ai-heading" className="text-lg font-semibold text-[var(--color-ink)]">
        Optional: tailor with AI
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
        AI can help rephrase a request for your situation. It cannot verify legal, medical, benefits or
        driving information. Always return to the reviewed wording and official sources on this page.
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
        Before you continue, avoid sending names, addresses, reference numbers or unnecessary medical
        details. Only share what you are comfortable sending to the assistant.
      </p>
      <button
        type="button"
        onClick={handleTailor}
        aria-label={`Tailor ${pack.title} with AI`}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      >
        {opening ? "Opening AI…" : "Tailor with AI"}
      </button>
    </aside>
  );
}
