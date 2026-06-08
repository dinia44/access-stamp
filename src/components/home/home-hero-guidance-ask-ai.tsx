"use client";

import { useChat } from "@/components/chat/provider";
import { HOME_BTN_GHOST, HOME_FOCUS } from "@/components/home/home-theme";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HomeHeroGuidanceAskAi() {
  const { openChat } = useChat();

  return (
    <button
      type="button"
      onClick={() =>
        openChat({
          prefill: "I need practical guidance on disability rights, travel, care, or equipment in the UK.",
        })
      }
      className={`${HOME_BTN_GHOST} gap-2 bg-white/80 hover:bg-white ${HOME_FOCUS}`}
    >
      Ask the AI
      <ArrowIcon className="h-4 w-4" />
    </button>
  );
}
