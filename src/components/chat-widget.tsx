"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/chat/provider";

type Msg = { role: "user" | "assistant"; text: string };
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
  provider: "eleven" | "browser";
};

const ELEVEN_VOICE_ID = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID ?? "";
const ELEVEN_VOICE_ID_2 = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID_2 ?? "";
const VOICES: VoiceChoice[] = [
  ...(ELEVEN_VOICE_ID
    ? [{ id: ELEVEN_VOICE_ID, label: "Access Stamp Voice", provider: "eleven" as const }]
    : []),
  ...(ELEVEN_VOICE_ID_2
    ? [{ id: ELEVEN_VOICE_ID_2, label: "Access Stamp Voice 2", provider: "eleven" as const }]
    : []),
  { id: "browser-default", label: "Browser voice", provider: "browser" as const },
];

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
  const [selectedVoice, setSelectedVoice] = useState<string>(() => {
    if (typeof window === "undefined") return VOICES[0]?.id ?? "browser-default";
    const cached = window.localStorage.getItem("access-stamp-voice-id");
    return cached && VOICES.some((v) => v.id === cached) ? cached : VOICES[0]?.id ?? "browser-default";
  });
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Town + must-haves -> results. Tell me where you are and what access features you need first.",
    },
  ]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastHoverSpeechAtRef = useRef(0);
  const lastHoverTextRef = useRef("");
  const liveTranscriptRef = useRef("");

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [msgs, open, typing]);

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
    const selected = VOICES.find((v) => v.id === selectedVoice);

    if (selected?.provider === "eleven") {
      try {
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text, voiceId: selected.id }),
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
        // fall through to browser voice
      }
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        stopAllSpeech();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1;
        window.speechSynthesis.speak(u);
      } catch {
        // ignore
      }
    }
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setMsgs((m) => [...m, { role: "user", text: t }]);
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
        setMsgs((m) => [...m, { role: "assistant", text: "Stopped. Ask again when you're ready." }]);
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
    setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    setTyping(false);

    await speakReply(reply);

  }

  function stopResponse() {
    abortRef.current?.abort();
    abortRef.current = null;
    setTyping(false);
    setCanStopResponse(false);
  }

  function collapseChat() {
    stopResponse();
    stopAllSpeech();
    setOpen(false);
  }

  async function copySummary() {
    const summary = `Location: ${lastSummary.location || "Not set"}\nType: ${lastSummary.venueType}\nMust-haves: ${
      lastSummary.mustHaves.join(", ") || "Not set"
    }`;
    try {
      await navigator.clipboard.writeText(summary);
      setMsgs((m) => [...m, { role: "assistant", text: "Summary copied for sharing." }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Could not copy summary on this browser." }]);
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
    rec.onerror = () => setListening(false);
    rec.onend = () => {
      setListening(false);
      const finalText = liveTranscriptRef.current.trim();
      if (finalText) {
        setDraft(finalText);
        void send(finalText);
        liveTranscriptRef.current = "";
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
        <div className="flex h-[min(560px,calc(100vh-32px))] w-[min(390px,calc(100vw-20px))] flex-col overflow-hidden rounded-[20px] border border-border bg-card shadow-[var(--shadow)]">
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
                className="rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-xs font-semibold text-white hover:bg-white/20 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={settingsOpen}
                onClick={() => setSettingsOpen((v) => !v)}
              >
                Settings
              </button>
              {settingsOpen ? (
                <div className="absolute right-14 top-12 z-10 w-52 rounded-[var(--radius-card)] border border-white/30 bg-[#142138] p-2 text-white shadow-[var(--shadow)]">
                  <label className="mb-2 grid gap-1 text-xs font-semibold">
                    Voice
                    <select
                      className="rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                      value={selectedVoice}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSelectedVoice(v);
                        if (typeof window !== "undefined") window.localStorage.setItem("access-stamp-voice-id", v);
                      }}
                      aria-label="Select AI voice"
                    >
                      {VOICES.map((v) => (
                        <option key={v.id} value={v.id} className="text-heading">
                          {v.label}
                        </option>
                      ))}
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
                </div>
              ) : null}
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-white/10 text-base font-semibold text-white hover:bg-white/20"
                aria-label="Close chat"
                onClick={collapseChat}
                title="Close and collapse chat"
                style={{ backgroundColor: "rgba(220, 38, 38, 0.92)", borderColor: "rgba(254, 202, 202, 0.7)" }}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            ref={scroller}
            className="min-h-0 flex-1 overflow-auto bg-background p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Chat transcript"
          >
            {(lastSummary.location || lastSummary.mustHaves.length) ? (
              <div className="mb-3 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-heading">
                {(lastSummary.location || "Your area")} · {lastSummary.venueType || "Any"} · Must-haves:{" "}
                {lastSummary.mustHaves.join(", ") || "Not set yet"}
              </div>
            ) : null}
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
              {lastVenues.length ? (
                <div className="mt-1 grid gap-2">
                  {lastVenues.map((v) => (
                    <div key={v.slug} className="rounded-[var(--radius-ui)] border border-border bg-white p-2">
                      <div className="text-sm font-semibold text-heading">{v.name}</div>
                      <div className="text-xs text-muted">{v.location}</div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold">
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

          <div className="border-t border-border bg-white px-3 pb-4 pt-3">
            <audio ref={audioRef} className="hidden" />
            <div className="mb-2 flex min-h-8 gap-2 overflow-auto pb-1">
              {quick.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold cursor-pointer",
                    t === quick[0]
                      ? "bg-blue text-white hover:bg-[#1f66b0]"
                      : "bg-amber-pale text-amber hover:bg-[#f8e8c5]",
                  )}
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
                  "grid h-10 w-10 place-items-center rounded-[var(--radius-ui)] border border-border bg-white text-heading cursor-pointer",
                  listening && "border-amber bg-amber-pale",
                )}
                aria-label={listening ? "Listening" : "Voice input"}
                onClick={() => startListening()}
                disabled={!canUseSpeech()}
                title={listening ? "Listening now" : "Tap to speak"}
              >
                {listening ? "●" : "🎤"}
              </button>
              <button
                type="button"
                className="h-10 rounded-[var(--radius-ui)] border border-border bg-white px-2 text-xs font-semibold text-heading hover:bg-background-2 cursor-pointer"
                onClick={stopAllSpeech}
              >
                Stop talking
              </button>
              <button
                type="button"
                className={cn(
                  "h-10 rounded-[var(--radius-ui)] border px-2 text-xs font-semibold",
                  canStopResponse
                    ? "border-border bg-white text-heading hover:bg-background-2 cursor-pointer"
                    : "border-border bg-background-2 text-muted",
                )}
                onClick={stopResponse}
                disabled={!canStopResponse}
              >
                Stop response
              </button>
              <div className="flex-1">
                <label className="sr-only" htmlFor="chat-input">
                  Ask Access Stamp AI
                </label>
                <input
                  id="chat-input"
                  aria-label="Message Access Stamp AI"
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
                className="grid h-10 w-10 place-items-center rounded-[var(--radius-ui)] bg-blue text-white cursor-pointer"
                aria-label="Send message"
                onClick={() => send(draft)}
              >
                ➤
              </button>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-[var(--radius-ui)] border border-border bg-white text-heading hover:bg-background-2 cursor-pointer"
                aria-label="Close chat"
                onClick={collapseChat}
                title="Close and collapse chat"
                style={{ backgroundColor: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" }}
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-[11px] font-semibold text-muted">
              Type or use the mic to speak. Use Stop talking / Stop response any time, then close with ✕.
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="font-semibold text-muted">Was this helpful?</span>
              <button type="button" className="rounded border border-border px-2 py-0.5 text-heading cursor-pointer">
                Yes
              </button>
              <button type="button" className="rounded border border-border px-2 py-0.5 text-heading cursor-pointer">
                Not yet
              </button>
              <button type="button" className="ml-auto rounded border border-border px-2 py-0.5 text-heading cursor-pointer" onClick={copySummary}>
                Copy summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
