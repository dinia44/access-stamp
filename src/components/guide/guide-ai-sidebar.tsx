"use client";

import { useState } from "react";
import { useChat } from "@/components/chat/provider";
import { cn } from "@/lib/utils";

type GuideAiSidebarProps = {
  suggestions: string[];
  demoQuestion: string;
  demoAnswer: string[];
  guideTitle: string;
  className?: string;
  onClose?: () => void;
};

export function GuideAiSidebar({
  suggestions,
  demoQuestion,
  demoAnswer,
  guideTitle,
  className,
  onClose,
}: GuideAiSidebarProps) {
  const { openChat } = useChat();
  const [followUp, setFollowUp] = useState("");
  const [showMore, setShowMore] = useState(false);

  const visibleSuggestions = showMore ? suggestions : suggestions.slice(0, 3);

  function askAi(prompt: string) {
    openChat({
      prefill: `I'm reading the guide "${guideTitle}". ${prompt}`,
    });
  }

  function onSubmitFollowUp(e: React.FormEvent) {
    e.preventDefault();
    const q = followUp.trim();
    if (!q) return;
    askAi(q);
    setFollowUp("");
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white shadow-[var(--shadow-soft)] lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]",
        className,
      )}
      aria-label="Access Stamp AI assistant"
    >
      <div className="flex items-center justify-between border-b border-[#F1D8C7] px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-heading">Access Stamp AI</h2>
          <span className="rounded-full bg-[#FFE2D3] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#D93E10]">
            Beta
          </span>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-[#FFF3E8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2 lg:hidden"
            aria-label="Close AI panel"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <p className="text-sm leading-6 text-muted">
          Ask me anything about this guide or your situation.
        </p>

        <div className="space-y-2">
          {visibleSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => askAi(s)}
              className="w-full rounded-xl border border-[#F1D8C7] bg-[#FFF8F1] px-3 py-3 text-left text-xs font-semibold leading-5 text-heading transition-colors hover:border-[#E8C4A8] hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            >
              {s}
            </button>
          ))}
          {suggestions.length > 3 && !showMore ? (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="text-xs font-semibold text-[#59682A] hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            >
              See more suggestions
            </button>
          ) : null}
        </div>

        <div className="space-y-3 pt-2">
          <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-[#FFE2D3] px-3 py-2.5 text-xs font-medium leading-5 text-heading">
            {demoQuestion}
          </div>
          <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-[#F1D8C7] bg-[#FFF8F1] px-3 py-3">
            <p className="text-xs leading-5 text-text">Here are some adjustments that often help:</p>
            <ul className="mt-2 space-y-1">
              {demoAnswer.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-text">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#59682A]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F1D8C7] p-4">
        <form onSubmit={onSubmitFollowUp} className="flex gap-2">
          <label className="sr-only" htmlFor="guide-ai-follow-up">
            Ask a follow-up
          </label>
          <input
            id="guide-ai-follow-up"
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Ask a follow-up…"
            className="min-h-[44px] flex-1 rounded-xl border border-[#F1D8C7] bg-[#FFF8F1] px-3 text-sm text-heading placeholder:text-muted focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
          />
          <button
            type="submit"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F04A16] text-white transition-colors hover:bg-[#D93E10] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            aria-label="Send message"
          >
            →
          </button>
        </form>
        <p className="mt-2 text-[10px] leading-4 text-muted">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </aside>
  );
}
