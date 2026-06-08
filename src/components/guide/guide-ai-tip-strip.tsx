"use client";

import { cn } from "@/lib/utils";

type GuideAiTipStripProps = {
  text: string;
  onAskAi?: () => void;
  className?: string;
};

export function GuideAiTipStrip({ text, onAskAi, className }: GuideAiTipStripProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-[#F5E6B8] bg-[#FFFBEB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-sm" aria-hidden>
          ✦
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#92400E]">AI tip</p>
          <p className="mt-0.5 text-sm leading-6 text-[#78350F]">{text}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onAskAi}
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl border border-[#E8C4A8] bg-white px-4 text-sm font-semibold text-[#59682A] transition-colors hover:border-[#59682A]/40 hover:bg-[#EDF7ED] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
      >
        Ask the AI for ideas →
      </button>
    </div>
  );
}
