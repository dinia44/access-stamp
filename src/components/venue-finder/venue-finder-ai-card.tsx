"use client";

import { AskAccessStampAiButton } from "@/components/ask-access-stamp-ai-button";

type Props = {
  prefill?: string;
};

export function VenueFinderAiCard({ prefill }: Props) {
  return (
    <aside className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Need help?</p>
      <h2 className="mt-2 text-lg font-semibold tracking-[-0.015em] leading-7 text-heading">
        Ask Access Stamp AI
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Describe your access needs in plain language and get help planning your visit.
      </p>
      <AskAccessStampAiButton
        className="mt-4 w-full"
        prefill={prefill || "Help me find an accessible venue near me."}
      />
    </aside>
  );
}
