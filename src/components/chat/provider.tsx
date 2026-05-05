"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type PageContext =
  | { kind: "none" }
  | { kind: "home" }
  | { kind: "venue-finder" }
  | { kind: "submit-venue" }
  | { kind: "venue"; slug: string; name: string }
  | { kind: "advice" }
  | { kind: "advice-article"; slug: string; title: string; category?: string }
  | { kind: "directory" }
  | { kind: "glossary" };

type ChatCtx = {
  page: PageContext;
  setPage: (p: PageContext) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  draft: string;
  setDraft: (s: string) => void;
  voiceMode: boolean;
  openChat: (opts?: { prefill?: string; voiceMode?: boolean }) => void;
};

const C = createContext<ChatCtx | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<PageContext>({ kind: "none" });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [voiceMode, setVoiceMode] = useState(false);

  const value = useMemo<ChatCtx>(
    () => ({
      page,
      setPage,
      open,
      setOpen,
      draft,
      setDraft,
      voiceMode,
      openChat: (opts) => {
        setVoiceMode(Boolean(opts?.voiceMode));
        setDraft(opts?.prefill ?? "");
        setOpen(true);
      },
    }),
    [page, open, draft, voiceMode],
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useChat() {
  const ctx = useContext(C);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
