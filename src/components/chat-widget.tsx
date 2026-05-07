"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/chat/provider";

type Msg = { role: "user" | "assistant"; text: string; time: string };
type StateSummary = {
  location: string;
  venueType: string;
  mustHaves: string[];
};

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

type VoiceChoice = {
  id: string;
  label: string;
  provider: "eleven";
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

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function IconSpeaker({ muted = false }: { muted?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {muted ? <path d="m17 9 4 6m0-6-4 6" /> : <path d="M16 9a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10" />}
    </svg>
  );
}

function IconDots() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconRobot() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4m-3 5h.01M15 13h.01M8 19v2m8-2v2" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function ChatWidget() {
  const { page, open, setOpen, draft, setDraft, voiceMode } = useChat();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);
  const [typing, setTyping] = useState(false);
  const [hoverReadEnabled, setHoverReadEnabled] = useState(false);
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [canStopResponse, setCanStopResponse] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [lastLinks, setLastLinks] = useState<Array<{ label: string; href: string }>>([]);
  const [lastVenues, setLastVenues] = useState<ApiVenue[]>([]);
  const [lastSummary, setLastSummary] = useState<StateSummary>({
    location: "",
    venueType: "Any",
    mustHaves: [],
  });
  const [voiceLabel, setVoiceLabel] = useState("Access Stamp Voice");
  const [selectedLanguage, setSelectedLanguage] = useState("en-GB");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hello, I'm ACCESS Stamp AI. How can I help you today? I can help you find accessible venues, explain equipment and benefits, and support you with disability-related questions. Ask me anything and I will guide you step by step.",
      time: nowLabel(),
    },
  ]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<{ stop?: () => void } | null>(null);
  const conversationModeRef = useRef(false);
  const lastHoverSpeechAtRef = useRef(0);
  const lastHoverTextRef = useRef("");
  const liveTranscriptRef = useRef("");

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [msgs, open, typing]);

  useEffect(() => {
    let cancelled = false;
    async function loadVoiceLabel() {
      try {
        const res = await fetch("/api/voice", { method: "GET", cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { voices?: VoiceChoice[] };
        if (cancelled) return;
        if (data.voices?.[0]?.label) setVoiceLabel(data.voices[0].label);
      } catch {
        // keep default label
      }
    }
    void loadVoiceLabel();
    return () => {
      cancelled = true;
    };
  }, []);

  const speechSupported = canUseSpeech();

  const defaultQuick = useMemo(() => {
    if (page.kind === "venue-finder")
      return ["Help me search", "What does step-free mean?", "Venues near me"];
    if (page.kind === "submit-venue")
      return ["Help me describe access features", "What should I include?", "Is this venue suitable?"];
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

  function normalizeForSpeech(text: string) {
    return text
      .replace(/\n+/g, ". ")
      .replace(/\s+/g, " ")
      .replace(/([a-zA-Z0-9])\s*([.?!])(?!\s)/g, "$1$2 ")
      .trim();
  }

  function toPlainLanguage(text: string) {
    return text
      .replace(/genuinely/gi, "really")
      .replace(/accessibility/gi, "access")
      .replace(/must-haves/gi, "key needs")
      .replace(/\butilise\b/gi, "use");
  }

  function parseStateSummary(text: string) {
    const lower = text.toLowerCase();
    const location =
      text.match(/\bin\s+([a-z][a-z\s-]{1,30})/i)?.[1]?.trim() ??
      text.match(/\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/i)?.[0] ??
      "";
    const venueType =
      /(restaurant|cafe|café|hotel|shopping|leisure|arts|pub|bar)/i.exec(text)?.[1] ?? lastSummary.venueType;
    const mustHaves = [
      "step-free",
      "accessible toilet",
      "parking",
      "blue badge",
      "turning space",
      "quiet",
      "lift",
      "automatic doors",
    ].filter((token) => lower.includes(token));
    return {
      location: location || lastSummary.location,
      venueType: venueType ? venueType[0].toUpperCase() + venueType.slice(1) : "Any",
      mustHaves: mustHaves.length ? mustHaves : lastSummary.mustHaves,
    };
  }

  function stopAllSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  async function speakReply(reply: string) {
    const text = normalizeForSpeech(reply);
    if (!voiceEnabled || !text) return;
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = url;
          await audioRef.current.play();
        }
        return;
      }
    } catch {
      // do not fallback to browser voice
    }
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setMsgs((m) => [...m, { role: "user", text: t, time: nowLabel() }]);
    setLastSummary(parseStateSummary(t));
    setDraft("");
    setTyping(true);
    setCanStopResponse(true);
    setErrorText("");

    let data: ApiResponse | null = null;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          message: t,
          page,
          voiceMode: voiceMode || listening,
        }),
      });
      if (res.ok) data = (await res.json()) as ApiResponse;
      else setErrorText("I could not reach the assistant right now.");
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setTyping(false);
        setCanStopResponse(false);
        setMsgs((m) => [...m, { role: "assistant", text: "Stopped. Ask again when you're ready.", time: nowLabel() }]);
        return;
      }
      setErrorText("Connection problem. Try again, or use Venue Finder/Browse advice below.");
    }
    setCanStopResponse(false);

    const rawReply =
      data?.reply ??
      "Got it. Quick check: what city/town or postcode area are you in, and which access features matter most (step-free, toilet, parking, quiet, etc.)?";
    const reply = plainLanguage ? toPlainLanguage(rawReply) : rawReply;

    if (data?.quickActions?.length)
      setQuickOverride({ kind: page.kind, actions: data.quickActions });
    setLastLinks(data?.links ?? []);
    setLastVenues(data?.venues?.slice(0, 3) ?? []);
    setMsgs((m) => [...m, { role: "assistant", text: reply, time: nowLabel() }]);
    setTyping(false);

    await speakReply(reply);

    if (conversationModeRef.current && !listening) {
      window.setTimeout(() => startListening(true), 240);
    }

  }

  function stopResponse() {
    abortRef.current?.abort();
    abortRef.current = null;
    setTyping(false);
    setCanStopResponse(false);
  }

  function collapseChat() {
    endConversation();
    setOpen(false);
  }

  function endConversation() {
    conversationModeRef.current = false;
    setConversationMode(false);
    stopResponse();
    stopAllSpeech();
    try {
      recognitionRef.current?.stop?.();
    } catch {
      // ignore
    }
    recognitionRef.current = null;
    setListening(false);
  }

  function startConversationMode() {
    conversationModeRef.current = true;
    setConversationMode(true);
    setVoiceEnabled(true);
    if (!typing && !listening) {
      startListening(true);
    }
  }

  async function copySummary() {
    const summary = `Location: ${lastSummary.location || "Not set"}\nType: ${lastSummary.venueType}\nMust-haves: ${
      lastSummary.mustHaves.join(", ") || "Not set"
    }`;
    try {
      await navigator.clipboard.writeText(summary);
      setMsgs((m) => [...m, { role: "assistant", text: "Summary copied for sharing.", time: nowLabel() }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Could not copy summary on this browser.", time: nowLabel() }]);
    }
  }

  function startListening(fromConversation = false) {
    if (!canUseSpeech()) return;
    if (typing) return;
    if (recognitionRef.current) return;
    const Rec = getWebkitSpeechRecognition();
    if (!Rec) return;
    const rec = new Rec();
    recognitionRef.current = rec;
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = selectedLanguage;
    setListening(true);
    liveTranscriptRef.current = "";

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
      const cleaned = transcript.trim();
      liveTranscriptRef.current = cleaned;
      setDraft(cleaned);
    };
    rec.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      const finalText = liveTranscriptRef.current.trim();
      if (finalText) {
        setDraft(finalText);
        void send(finalText);
        liveTranscriptRef.current = "";
        return;
      }
      if ((fromConversation || conversationModeRef.current) && !typing) {
        window.setTimeout(() => startListening(true), 240);
      }
    };
    rec.start();
  }

  useEffect(() => {
    if (!hoverReadEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const now = Date.now();
      if (now - lastHoverSpeechAtRef.current < 700) return;
      const raw =
        target.getAttribute("aria-label") ??
        target.getAttribute("title") ??
        target.textContent ??
        "";
      const text = raw.replace(/\s+/g, " ").trim().slice(0, 120);
      if (!text || text === lastHoverTextRef.current) return;
      lastHoverSpeechAtRef.current = now;
      lastHoverTextRef.current = text;
      stopAllSpeech();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    };
    window.addEventListener("mouseover", handler);
    return () => window.removeEventListener("mouseover", handler);
  }, [hoverReadEnabled]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] print:hidden">
      {!open ? (
        <button
          type="button"
          className="relative grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-blue text-white shadow-[var(--shadow)] transition-transform hover:scale-[1.03] cursor-pointer"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          <span className="text-2xl" aria-hidden>
            💬
          </span>
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber shadow" aria-hidden />
        </button>
      ) : (
        <div className="flex h-[min(640px,calc(100vh-18px))] w-[min(440px,calc(100vw-12px))] flex-col overflow-hidden rounded-[14px] border border-[#d8dfea] bg-white shadow-[0_18px_48px_-20px_rgba(12,29,52,0.3)]">
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-white"
            style={{
              background: "linear-gradient(90deg, #0d4bb3 0%, #0b3f9f 100%)",
            }}
          >
            <div className="min-w-0">
              <div className="text-2sm font-semibold">Ask Access Stamp AI</div>
              <div className="text-xs text-blue-100">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
                  Online · Ready to help
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 cursor-pointer" onClick={() => setVoiceEnabled((v) => !v)} aria-label="Toggle voice"><IconSpeaker muted={!voiceEnabled} /></button>
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 cursor-pointer" aria-haspopup="menu" aria-expanded={settingsOpen} onClick={() => setSettingsOpen((v) => !v)} aria-label="Open chat settings"><IconDots /></button>
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 cursor-pointer" onClick={collapseChat} aria-label="Collapse chat"><IconChevronDown /></button>
              {settingsOpen ? (
                <div className="absolute right-4 top-12 z-10 w-56 rounded-[var(--radius-card)] border border-white/30 bg-[#142138] p-2 text-white shadow-[var(--shadow)]">
                  <div className="mb-2 rounded-[var(--radius-ui)] bg-white/10 px-2 py-2 text-xs font-semibold text-white">
                    Voice style: {voiceLabel}
                  </div>
                  <label className="mb-2 grid gap-1 text-xs font-semibold">
                    Language
                    <select
                      className="rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      aria-label="Select language"
                    >
                      <option value="en-GB" className="text-heading">English (UK)</option>
                      <option value="en-US" className="text-heading">English (US)</option>
                      <option value="es-ES" className="text-heading">Spanish (ES)</option>
                      <option value="fr-FR" className="text-heading">French (FR)</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className={cn(
                      "mb-2 w-full rounded-[var(--radius-ui)] px-2 py-1 text-left text-xs font-semibold cursor-pointer",
                      hoverReadEnabled ? "bg-white/20" : "bg-white/5 text-[#c0d0e2]",
                    )}
                    onClick={() => setHoverReadEnabled((v) => !v)}
                    aria-pressed={hoverReadEnabled}
                  >
                    {hoverReadEnabled ? "Hover read: on" : "Hover read: off"}
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "w-full rounded-[var(--radius-ui)] px-2 py-1 text-left text-xs font-semibold cursor-pointer",
                      voiceEnabled ? "bg-white/20" : "bg-white/5 text-[#c0d0e2]",
                    )}
                    onClick={() => setVoiceEnabled((v) => !v)}
                    aria-pressed={voiceEnabled}
                  >
                    {voiceEnabled ? "Voice playback: on" : "Voice playback: off"}
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "mt-2 w-full rounded-[var(--radius-ui)] px-2 py-1 text-left text-xs font-semibold cursor-pointer",
                      plainLanguage ? "bg-white/20" : "bg-white/5 text-[#c0d0e2]",
                    )}
                    onClick={() => setPlainLanguage((v) => !v)}
                    aria-pressed={plainLanguage}
                  >
                    {plainLanguage ? "Plain language: on" : "Plain language: off"}
                  </button>
                  <button
                    type="button"
                    className="mt-2 w-full rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-left text-xs font-semibold cursor-pointer hover:bg-white/20"
                    onClick={copySummary}
                  >
                    Copy state summary
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div
            ref={scroller}
            className="min-h-0 flex-1 overflow-auto bg-[#f8fafc] px-5 py-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Chat transcript"
          >
            <div className="grid gap-2">
              {msgs.map((m, i) => (
                <div key={i} className={cn("flex items-end gap-2", m.role === "user" && "justify-end")}>
                  {m.role === "assistant" ? (
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0d4bb3] text-white text-xs"><IconRobot /></div>
                  ) : null}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-[14px] border px-4 py-3 text-sm",
                      m.role === "assistant"
                        ? "border-[#e3e8ef] bg-[#f3f6fa] text-heading"
                        : "border-[#d3e2ff] bg-[#e8f0ff] text-heading",
                    )}
                  >
                    {m.text.split("\n").map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                    <div className="mt-1 text-[11px] text-muted">{m.time}</div>
                  </div>
                  {m.role === "user" ? (
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0d4bb3] text-white text-xs"><IconUser /></div>
                  ) : null}
                </div>
              ))}
              {typing ? (
                <div className="max-w-[90%] justify-self-start rounded-[14px] border border-[#e3ded6] bg-white px-3 py-2 text-sm text-muted">
                  Typing…
                </div>
              ) : null}
              {lastVenues.length ? (
                <div className="mt-1 grid gap-2">
                  {lastVenues.map((v) => (
                    <div key={v.slug} className="rounded-[var(--radius-ui)] border border-[#e3ded6] bg-white p-2 shadow-[0_1px_3px_rgba(12,29,52,0.06)]">
                      <div className="text-sm font-semibold text-heading">{v.name}</div>
                      <div className="text-xs text-muted">{v.location}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">Confidence: Medium</span>
                        <span className="rounded-full bg-background-2 px-2 py-0.5 text-muted">Distance: TBC</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {v.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-blue-pale px-2 py-0.5 text-[11px] font-semibold text-blue">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/venue/${v.slug}`} className="mt-2 inline-block text-xs font-semibold text-blue cursor-pointer">
                        View listing →
                      </Link>
                    </div>
                  ))}
                </div>
              ) : null}
              {lastLinks.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {lastLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[var(--radius-ui)] border border-border bg-white px-3 py-1 text-xs font-semibold text-blue"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              {errorText ? (
                <div className="rounded-[var(--radius-ui)] border border-[#fecaca] bg-[#fef2f2] p-2 text-xs text-[#991b1b]">
                  {errorText}
                  <div className="mt-2 flex gap-2">
                    <Link href="/venue-finder" className="font-semibold underline">
                      Use Venue Finder
                    </Link>
                    <Link href="/advice" className="font-semibold underline">
                      Browse advice
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t border-[#dde4ef] bg-white px-4 pb-3 pt-3">
            <audio ref={audioRef} className="hidden" />
            <div className="mb-3 flex min-h-8 gap-2 overflow-auto pb-1">
              {quick.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors",
                    "border border-[#d8e1ef] bg-white text-[#184080] hover:bg-[#f5f8ff]",
                  )}
                  onClick={() => {
                    setDraft(t);
                    void send(t);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_auto_auto] items-end gap-2">
              <div className="min-w-0">
                <label className="sr-only" htmlFor="chat-input">
                  Chat message
                </label>
                <input
                  id="chat-input"
                  aria-label="Chat message"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about a venue or accessibility feature..."
                  className="h-12 w-full rounded-[12px] border border-[#d8e1ef] bg-white px-4 text-sm text-heading"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send(draft);
                  }}
                />
              </div>
              <button
                type="button"
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-[12px] border border-[#d8e1ef] bg-white text-[#0d4bb3] cursor-pointer transition-colors hover:bg-[#f5f8ff]",
                  listening && "border-amber bg-amber-pale",
                    !speechSupported && "cursor-not-allowed border-[#e6ebf3] bg-[#f6f8fb] text-muted hover:bg-[#f6f8fb]",
                )}
                  aria-label={listening ? "Stop voice input" : "Start voice input"}
                onClick={() => {
                  if (listening) {
                    try {
                      recognitionRef.current?.stop?.();
                    } catch {
                      // ignore
                    }
                    return;
                  }
                  startListening();
                }}
                  disabled={!speechSupported}
                title={listening ? "Listening now" : "Tap to speak"}
              >
                {listening ? <span className="h-2 w-2 rounded-full bg-amber-600" aria-hidden /> : <IconMic />}
              </button>
              <button
                type="button"
                  className={cn(
                    "grid h-12 min-w-12 place-items-center rounded-[12px] bg-[#0d4bb3] px-3 text-white cursor-pointer transition-colors hover:bg-[#0a3f97]",
                    canStopResponse && "bg-[#b45309] hover:bg-[#92400e]",
                  )}
                  aria-label={canStopResponse ? "Stop response" : "Send message"}
                  onClick={() => {
                    if (canStopResponse) {
                      stopResponse();
                      return;
                    }
                    void send(draft);
                  }}
              >
                  {canStopResponse ? "Stop" : <IconSend />}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-[#0d4bb3]">
              <span className="font-semibold">Voice input</span>
              <select
                className="rounded-[8px] border border-[#d8e1ef] bg-white px-2 py-1 text-xs text-heading"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Voice input language"
              >
                <option value="en-GB">English (UK)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish (ES)</option>
                <option value="fr-FR">French (FR)</option>
              </select>
              <button
                type="button"
                className={cn(
                  "ml-auto rounded border px-2 py-1 text-xs cursor-pointer",
                  conversationMode
                    ? "border-[#f59e0b] bg-[#fff7ed] text-[#92400e]"
                    : "border-[#d8e1ef] text-heading hover:bg-[#f5f8ff]",
                )}
                onClick={() => {
                  if (conversationMode) {
                    endConversation();
                    return;
                  }
                  startConversationMode();
                }}
              >
                {conversationMode ? "End conversation" : "Start conversation"}
              </button>
              <button type="button" className="rounded border border-[#d8e1ef] px-2 py-1 text-xs text-heading cursor-pointer hover:bg-[#f5f8ff]" onClick={stopAllSpeech}>
                Stop talking
              </button>
              <button type="button" className={cn("rounded border px-2 py-1 text-xs cursor-pointer", canStopResponse ? "border-[#d8e1ef] text-heading hover:bg-[#f5f8ff]" : "border-[#e6ebf3] text-muted")} disabled={!canStopResponse} onClick={stopResponse}>
                Stop response
              </button>
            </div>
            {!speechSupported ? (
              <p className="mt-2 text-[11px] text-muted">Voice not supported in this browser.</p>
            ) : null}
            <div className="mt-3 border-t border-[#edf1f7] pt-3">
              <div className="text-xs font-semibold text-muted">Popular accessibility guides</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link href="/advice/new-to-disability" className="rounded-full border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-[#184080] hover:bg-[#f5f8ff]">Visiting a venue</Link>
                <Link href="/advice/sport" className="rounded-full border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-[#184080] hover:bg-[#f5f8ff]">Attending an event</Link>
                <Link href="/advice/transport" className="rounded-full border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-[#184080] hover:bg-[#f5f8ff]">Travel and transport</Link>
                <Link href="/advice/care" className="rounded-full border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-[#184080] hover:bg-[#f5f8ff]">Using public toilets</Link>
                <Link href="/advice" className="rounded-full border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-[#184080] hover:bg-[#f5f8ff]">View all guides</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
