"use client";

import { useChat } from "@/components/chat/provider";

type Props = {
  prefill?: string;
};

export function VenueFinderAiCard({ prefill }: Props) {
  const { openChat } = useChat();

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Need help?</p>
      <h2 className="mt-2 text-lg font-semibold tracking-[-0.015em] leading-7 text-slate-900">
        Ask Access Stamp AI
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Describe your access needs in plain language and get help planning your visit.
      </p>
      <button
        type="button"
        onClick={() => openChat({ prefill: prefill || "Help me find an accessible venue near me." })}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
      >
        Open AI assistant
      </button>
    </aside>
  );
}
