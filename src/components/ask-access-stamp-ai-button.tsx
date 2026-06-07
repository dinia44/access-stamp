"use client";

import { useChat } from "@/components/chat/provider";

type Props = {
  prefill?: string;
  variant?: "hero" | "compact";
  className?: string;
};

export function AskAccessStampAiButton({ prefill, variant = "compact", className = "" }: Props) {
  const { openChat } = useChat();

  const defaultPrefill = "Help me find an accessible venue and understand what access features I should look for.";

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={() => openChat({ prefill: prefill || defaultPrefill })}
        className={`mt-3 grid min-h-11 w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-[#E8C4A8] bg-[#FFF3E8] px-3 py-2 text-left transition-colors hover:border-[#F04A16]/40 hover:bg-[#FFE2D3] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#59682A] focus-visible:outline-offset-4 ${className}`}
        aria-label="Ask the AI Access Assistant"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-[#FFE2D3] text-sm text-[#59682A]"
          aria-hidden="true"
        >
          ✦
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#13201F]">Ask the AI Access Assistant</span>
            <span className="rounded-full border border-[#F1D8C7] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#59682A]">
              Beta
            </span>
          </div>
          <p className="truncate text-xs text-[#5E6A66]">
            Get help finding venues, understanding access features, and planning your visit.
          </p>
        </div>
        <span className="text-[#F04A16]" aria-hidden="true">
          ›
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openChat({ prefill: prefill || defaultPrefill })}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#E8C4A8] bg-white px-4 text-sm font-semibold text-[#2A3836] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F04A16]/40 hover:bg-[#FFF3E8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFE2D3] focus-visible:ring-offset-2 ${className}`}
      aria-label="Ask Access Stamp AI"
    >
      <span className="text-[#D93E10]" aria-hidden="true">
        ✦
      </span>
      Ask Access Stamp AI
    </button>
  );
}
