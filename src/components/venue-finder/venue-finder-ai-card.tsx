"use client";

import { useChat } from "@/components/chat/provider";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";

type Props = {
  prefill?: string;
};

export function VenueFinderAiCard({ prefill }: Props) {
  const { openChat } = useChat();
  const defaultPrefill =
    "I need step-free access, an accessible toilet and quiet seating for my visit this weekend.";

  return (
    <aside
      aria-labelledby="vf-ai-heading"
      className="rounded-[2rem] border border-border bg-background-2 p-5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <h2 id="vf-ai-heading" className="text-xl font-semibold tracking-[-0.03em] text-heading">
          Ask Access Stamp AI
        </h2>
        <span className="rounded-full bg-verified-pale px-2 py-1 text-xs font-bold text-[var(--color-secondary)]">
          BETA
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">
        Describe your access needs and get personalised venue suggestions.
      </p>

      <div className="mt-4 rounded-2xl bg-card p-4 text-sm leading-6 text-muted">
        {defaultPrefill}
      </div>

      <button
        type="button"
        onClick={() => openChat({ prefill: prefill || defaultPrefill })}
        className={`mt-4 w-full ${VF_BTN_PRIMARY}`}
      >
        Plan my visit with AI
      </button>
    </aside>
  );
}
