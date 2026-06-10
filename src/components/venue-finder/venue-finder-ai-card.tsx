"use client";

import { useChat } from "@/components/chat/provider";

type Props = {
  prefill?: string;
};

export function VenueFinderAiCard({ prefill }: Props) {
  const { openChat } = useChat();
  const defaultPrefill =
    "I need step-free access, nearby parking, and somewhere quieter to sit. Help me plan my visit.";

  return (
    <aside
      aria-labelledby="vf-ai-heading"
      className="rounded-[1.5rem] border border-[#D8CBB8] bg-[#FFF9EF] p-5 shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Access Stamp AI</p>
      <h2 id="vf-ai-heading" className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#17201C]">
        Not sure what to filter?
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#5A625C]">
        Describe your access needs in plain language and get help planning your visit.
      </p>
      <div className="mt-4 rounded-2xl bg-white/70 p-3 text-sm text-stone-600">
        “I need step-free access, nearby parking, and somewhere quieter to sit.”
      </div>
      <button
        type="button"
        onClick={() => openChat({ prefill: prefill || defaultPrefill })}
        className="mt-5 w-full rounded-full bg-[#17201C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#26312B] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:ring-offset-2"
      >
        Plan my visit
      </button>
    </aside>
  );
}
