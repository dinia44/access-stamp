"use client";

import Link from "next/link";
import { useChat } from "@/components/chat/provider";
import {
  AS_BTN_PRIMARY,
  AS_CONTAINER,
  AS_EYEBROW,
  AS_PANEL,
  AS_SECTION,
  AS_SECTION_H2,
  AS_BODY,
} from "@/lib/design-system";

const PROMPTS = [
  "Find step-free restaurants near me",
  "What should I check before visiting a new venue?",
  "Help me plan a wheelchair-accessible day out",
  "Explain reasonable adjustments at work",
] as const;

const DARK_CHIP =
  "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#071826] px-4 text-sm font-medium text-[#E2E8F0] transition-all duration-200 hover:border-[#2563EB]/40 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2563EB] focus-visible:outline-offset-4";

export function HomeAiToolsPreview() {
  const { openChat } = useChat();

  return (
    <section className={`${AS_SECTION} bg-[#071826] text-white`} aria-labelledby="ai-tools-heading">
      <div className={AS_CONTAINER}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className={`${AS_EYEBROW} text-[#60A5FA]`}>Access Stamp AI</p>
            <h2 id="ai-tools-heading" className={`${AS_SECTION_H2} mt-3 text-white`}>
              Practical prompts, not generic chat
            </h2>
            <p className={`${AS_BODY} mt-4 text-[#CBD5E1]`}>
              Ask about venues, rights, travel, care, and equipment. Get next steps you can use in meetings, calls, and
              planning — grounded in UK accessibility guidance.
            </p>
            <Link href="/ai-toolkit" className="mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#93C5FD] underline-offset-4 hover:underline">
              Browse AI toolkit →
            </Link>
          </div>

          <div className={`${AS_PANEL} border-[rgba(255,255,255,0.08)] bg-[#0B2233] text-white`}>
            <div className="flex items-start gap-3 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-sm font-bold">
                AI
              </span>
              <div>
                <p className="font-semibold text-white">Access Stamp assistant</p>
                <p className="mt-1 text-sm text-[#94A3B8]">Ask a practical UK accessibility question</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => openChat({ prefill: prompt })}
                  className={DARK_CHIP}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openChat({ prefill: "Help me with a practical accessibility question for the UK." })}
              className={`${AS_BTN_PRIMARY} mt-5 w-full sm:w-auto`}
            >
              Start a conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
