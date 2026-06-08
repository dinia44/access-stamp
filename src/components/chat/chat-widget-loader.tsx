"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useChat } from "@/components/chat/provider";

const ChatWidget = dynamic(() => import("@/components/chat-widget").then((m) => m.ChatWidget), {
  ssr: false,
  loading: () => null,
});

/**
 * Loads the full chat widget only after the user opens chat (or clicks the launcher).
 * Keeps ~1900 lines of chat UI off the initial homepage bundle.
 */
export function ChatWidgetLoader() {
  const { open, openChat } = useChat();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (open) setLoaded(true);
  }, [open]);

  if (!loaded) {
    return (
      <button
        type="button"
        className="fixed bottom-5 right-5 z-[60] inline-flex h-14 min-h-[44px] w-14 items-center justify-center rounded-full bg-[#F04A16] text-xl text-white shadow-lg shadow-[#F04A16]/25 transition-colors hover:bg-[#D93E10] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4 print:hidden"
        aria-label="Open AI assistant"
        onClick={() => {
          setLoaded(true);
          openChat();
        }}
      >
        <span aria-hidden>✦</span>
      </button>
    );
  }

  return <ChatWidget />;
}
