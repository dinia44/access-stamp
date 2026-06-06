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
        className={`mt-3 grid min-h-11 w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/15 bg-[#0A2447] px-3 py-2 text-left transition-colors hover:border-white/25 hover:bg-[#0B2A52] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071E3D] ${className}`}
        aria-label="Ask Access Stamp AI"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-[#67E8F9]/15 text-sm text-[#67E8F9]"
          aria-hidden="true"
        >
          ✦
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-white">Ask Access Stamp AI</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-200">
              Beta
            </span>
          </div>
          <p className="truncate text-xs text-slate-400">
            Get help finding venues, understanding access features, and planning your visit.
          </p>
        </div>
        <span className="text-[#67E8F9]" aria-hidden="true">
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
