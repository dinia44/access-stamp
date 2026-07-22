"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useChat } from "@/components/chat/provider";

const ChatWidget = dynamic(() => import("@/components/chat-widget").then((m) => m.ChatWidget), {
  ssr: false,
  loading: () => null,
});

type Props = {
  /** When true, render as a labelled dock button instead of a floating sparkle FAB. */
  docked?: boolean;
};

/**
 * Loads the full chat widget only after the user opens chat (or clicks the launcher).
 * Keeps ~1900 lines of chat UI off the initial homepage bundle.
 */
export function ChatWidgetLoader({ docked = false }: Props) {
  const { open, openChat } = useChat();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (open) setLoaded(true);
  }, [open]);

  if (!loaded) {
    if (docked) {
      return (
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--color-brand)] px-3 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
          aria-label="Open AI assistant"
          onClick={() => {
            setLoaded(true);
            openChat();
          }}
        >
          AI assistant
        </button>
      );
    }

    return (
      <button
        type="button"
        className="fixed bottom-5 right-5 z-[60] inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--color-brand)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-[var(--color-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] focus-visible:outline-offset-4 print:hidden"
        aria-label="Open AI assistant"
        onClick={() => {
          setLoaded(true);
          openChat();
        }}
      >
        AI assistant
      </button>
    );
  }

  return <ChatWidget />;
}
