"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/chat/provider";

type Msg = { role: "user" | "assistant"; text: string };

type ApiVenue = {
  slug: string;
  name: string;
  location: string;
  tags: string[];
};
type ApiResponse = {
  reply: string;
  quickActions?: string[];
  venues?: ApiVenue[];
  links?: Array<{ label: string; href: string }>;
};

type WebkitSpeechRecognitionCtor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: unknown) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

function canUseSpeech() {
  return typeof window !== "undefined" && "webkitSpeechRecognition" in window;
}

function getWebkitSpeechRecognition(): WebkitSpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { webkitSpeechRecognition?: WebkitSpeechRecognitionCtor };
  return w.webkitSpeechRecognition ?? null;
}

export function ChatWidget() {
  const { page, open, setOpen, draft, setDraft, voiceMode } = useChat();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi, I’m Access Stamp AI. Tell me your location and your access needs, or ask about rights, equipment, or care.",
    },
  ]);
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [msgs, open, typing]);

  const defaultQuick = useMemo(() => {
    if (page.kind === "venue-finder")
      return ["Help me search", "What does step-free mean?", "Venues near me"];
    if (page.kind === "advice-article")
      return ["Summarise this article", "What should I do next?", "Related topics"];
    return ["Find accessible venues", "Explain PIP", "Wheelchair services near me", "I’m new to disability"];
  }, [page.kind]);

  const [quickOverride, setQuickOverride] = useState<{
    kind: string;
    actions: string[];
  } | null>(null);
  const quick =
    quickOverride && quickOverride.kind === page.kind
      ? quickOverride.actions
      : defaultQuick;

  async function send(text: string) {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setDraft("");
    setTyping(true);

    let data: ApiResponse | null = null;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: t,
          page,
          voiceMode: voiceMode || listening,
        }),
      });
      if (res.ok) data = (await res.json()) as ApiResponse;
    } catch {
      // ignore
    }

    const reply =
      data?.reply ??
      "Got it. Quick check: what city/town or postcode area are you in, and which access features matter most (step-free, toilet, parking, quiet, etc.)?";

    if (data?.quickActions?.length)
      setQuickOverride({ kind: page.kind, actions: data.quickActions });
    setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    setTyping(false);

    if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(reply);
        u.rate = 1;
        window.speechSynthesis.speak(u);
      } catch {
        // ignore
      }
    }

    if (data?.venues?.length) {
      // Render as a short follow-up message with links.
      const venueLines = data.venues
        .slice(0, 3)
        .map((v) => `• ${v.name} (${v.location})`)
        .join("\n");
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: `Here are a few matches:\n${venueLines}\n\nOpen a venue page for the full breakdown.`,
        },
      ]);
    }
  }

  function startListening() {
    if (!canUseSpeech()) return;
    const Rec = getWebkitSpeechRecognition();
    if (!Rec) return;
    const rec = new Rec();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-GB";
    setListening(true);

    rec.onresult = (e: unknown) => {
      const ev = e as {
        resultIndex?: number;
        results?: ArrayLike<{ 0?: { transcript?: string } }>;
      };
      const results = ev.results;
      if (!results || typeof results.length !== "number") return;
      const start = typeof ev.resultIndex === "number" ? ev.resultIndex : 0;

      let transcript = "";
      for (let i = start; i < results.length; i++) {
        transcript += results[i]?.[0]?.transcript ?? "";
      }
      setDraft(transcript.trim());
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {!open ? (
        <button
          type="button"
          className="relative grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-blue text-white shadow-[var(--shadow)] transition-transform hover:scale-[1.03]"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          <span className="text-2xl" aria-hidden>
            💬
          </span>
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber shadow" aria-hidden />
        </button>
      ) : (
        <div className="h-[500px] w-[min(370px,calc(100vw-32px))] overflow-hidden rounded-[20px] border border-border bg-card shadow-[var(--shadow)]">
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-white"
            style={{
              background: "linear-gradient(135deg, #0f1a2b 0%, #1a2740 100%)",
            }}
          >
            <div>
              <div className="text-sm font-semibold">Access Stamp AI</div>
              <div className="text-xs text-[#a0998f]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
                  Online · Voice enabled
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn(
                  "rounded-[var(--radius-ui)] px-2 py-1 text-xs font-semibold",
                  voiceEnabled ? "bg-white/10" : "bg-white/5 text-[#c0d0e2]",
                )}
                onClick={() => setVoiceEnabled((v) => !v)}
                aria-pressed={voiceEnabled}
              >
                {voiceEnabled ? "Voice: on" : "Voice: off"}
              </button>
              <button
                type="button"
                className="rounded-[var(--radius-ui)] px-2 py-1 text-sm font-semibold hover:bg-white/10"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div ref={scroller} className="h-[360px] overflow-auto bg-background p-4">
            <div className="grid gap-2">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[90%] rounded-[var(--radius-card)] border px-3 py-2 text-sm",
                    m.role === "assistant"
                      ? "justify-self-start border-border bg-white"
                      : "justify-self-end border-blue/20 bg-blue text-white",
                  )}
                >
                  {m.text.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              ))}
              {typing ? (
                <div className="max-w-[90%] justify-self-start rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm text-muted">
                  Typing…
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t border-border bg-white px-3 py-3">
            <div className="mb-2 flex gap-2 overflow-auto pb-1">
              {quick.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="rounded-full bg-amber-pale px-3 py-1 text-xs font-semibold text-amber hover:bg-[#f8e8c5]"
                  onClick={() => send(t)}
                >
                  {t}
                </button>
              ))}
              {page.kind === "venue" ? (
                <span className="ml-auto text-[11px] font-semibold text-muted">
                  Context: {page.name}
                </span>
              ) : null}
            </div>

            <div className="flex items-end gap-2">
              <button
                type="button"
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-[var(--radius-ui)] border border-border bg-white text-heading",
                  listening && "border-amber bg-amber-pale",
                )}
                aria-label={listening ? "Listening" : "Voice input"}
                onClick={() => startListening()}
                disabled={!canUseSpeech()}
              >
                {listening ? "●" : "🎤"}
              </button>
              <div className="flex-1">
                <label className="sr-only" htmlFor="chat-input">
                  Ask Access Stamp AI
                </label>
                <input
                  id="chat-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask me anything…"
                  className="h-10 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-sm text-heading"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send(draft);
                  }}
                />
                {listening ? (
                  <div className="mt-1 text-xs text-muted">Listening…</div>
                ) : null}
              </div>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-[var(--radius-ui)] bg-blue text-white"
                aria-label="Send"
                onClick={() => send(draft)}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
