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
        className={`mt-3 grid min-h-11 w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] px-3 py-2 text-left transition-colors hover:border-[#2563EB]/40 hover:bg-[#DBEAFE] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4 ${className}`}
        aria-label="Ask the AI Access Assistant"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-[#DBEAFE] text-sm text-[#0891B2]"
          aria-hidden="true"
        >
          ✦
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#0B1D3A]">Ask the AI Access Assistant</span>
            <span className="rounded-full border border-[#BFDBFE] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0891B2]">
              Beta
            </span>
          </div>
          <p className="truncate text-xs text-[#3B6B9A]">
            Get help finding venues, understanding access features, and planning your visit.
          </p>
        </div>
        <span className="text-[#2563EB]" aria-hidden="true">
          ›
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openChat({ prefill: prefill || defaultPrefill })}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 ${className}`}
      aria-label="Ask Access Stamp AI"
    >
      <span className="text-[#1D4ED8]" aria-hidden="true">
        ✦
      </span>
      Ask Access Stamp AI
    </button>
  );
}
