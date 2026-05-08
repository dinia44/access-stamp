"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/chat/provider";
import { ChatMessageContent } from "@/components/chat/chat-message-content";

type Msg = { role: "user" | "assistant"; text: string; sentAt: number };

function clockLabel(sentAt: number) {
  return new Date(sentAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function normalizeVenueHref(href: string) {
  return href.replace(/^\/venues(?=$|[/?#])/i, "/venue-finder");
}
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

type HandsFreeState = "idle" | "listening" | "processing" | "speaking" | "error";


type BrowserSpeechRecognitionCtor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: unknown) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function canUseSpeech() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as {
    webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
    SpeechRecognition?: BrowserSpeechRecognitionCtor;
  };
  return Boolean(w.webkitSpeechRecognition || w.SpeechRecognition);
}

function getSpeechRecognitionCtor(): BrowserSpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
    SpeechRecognition?: BrowserSpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
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

function VoiceOrb({
  state,
}: {
  state: "idle" | "listening" | "speaking" | "thinking";
}) {
  const base =
    state === "listening"
      ? "from-emerald-300/70 via-cyan-300/60 to-blue-300/70"
      : state === "speaking"
        ? "from-amber-300/75 via-orange-300/70 to-rose-300/70"
        : state === "thinking"
          ? "from-violet-300/70 via-indigo-300/65 to-blue-300/70"
          : "from-blue-200/55 via-sky-200/50 to-indigo-200/55";

  return (
    <div className="relative grid h-[184px] w-[184px] place-items-center">
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-sm",
          "bg-[conic-gradient(from_0deg,var(--tw-gradient-stops))]",
          base,
          state === "idle" ? "animate-pulse" : "animate-spin",
        )}
        style={{ animationDuration: state === "idle" ? "2.2s" : "3.6s" }}
      />
      <div
        className={cn(
          "absolute inset-[14px] rounded-full opacity-85",
          "bg-[conic-gradient(from_180deg,var(--tw-gradient-stops))]",
          base,
          "animate-spin",
        )}
        style={{ animationDuration: "5.2s", animationDirection: "reverse" }}
      />
      <div className="absolute inset-[32px] rounded-full bg-[#0e1f3a]/92 backdrop-blur-[1px]" />
      <div className="relative z-10 text-center text-white">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
          {state === "listening" ? "Listening" : state === "speaking" ? "Speaking" : state === "thinking" ? "Thinking" : "Ready"}
        </div>
        <div className="mt-1 text-[11px] text-blue-100/90">Access Stamp Voice</div>
      </div>
    </div>
  );
}

export function ChatWidget() {
  const { page, open, setOpen, draft, setDraft, voiceMode } = useChat();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [typing, setTyping] = useState(false);
  const [handsFreeState, setHandsFreeState] = useState<HandsFreeState>("idle");
  const [hoverReadEnabled, setHoverReadEnabled] = useState(false);
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showCaptions, setShowCaptions] = useState(false);
  const [audioRate, setAudioRate] = useState(1);
  const [audioPaused, setAudioPaused] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const [lastLinks, setLastLinks] = useState<Array<{ label: string; href: string }>>([]);
  const [lastVenues, setLastVenues] = useState<ApiVenue[]>([]);
  const [lastSummary, setLastSummary] = useState<StateSummary>({
    location: "",
    venueType: "Any",
    mustHaves: [],
  });
  const [voiceLabel, setVoiceLabel] = useState("Access Stamp Voice");
  const [selectedVoiceId, setSelectedVoiceId] = useState("");
  const [elevenAvailable, setElevenAvailable] = useState(false);
  const [awaitingVoiceUnlock, setAwaitingVoiceUnlock] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-GB");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi, I'm Access Stamp AI. How can I help you today?",
      sentAt: Date.now(),
    },
  ]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<{ stop?: () => void } | null>(null);
  const recognitionFinalRef = useRef("");
  const recognitionSentRef = useRef(false);
  const recognitionSilenceTimerRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micRafRef = useRef<number | null>(null);
  const lastVADTriggerRef = useRef(0);
  const lastBargeTriggerRef = useRef(0);
  const conversationModeRef = useRef(false);
  const handsFreeRef = useRef(false);
  const speakingRef = useRef(false);
  const lastHoverSpeechAtRef = useRef(0);
  const lastHoverTextRef = useRef("");
  const liveTranscriptRef = useRef("");
  const lastOutboundRef = useRef("");
  const userStoppedRef = useRef(false);
  const typingRef = useRef(false);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [msgs, open, typing]);

  useEffect(() => {
    if (!typing) return;
    const id = window.setTimeout(() => {
      abortRef.current?.abort();
    }, 45000);
    return () => window.clearTimeout(id);
  }, [typing]);

  useEffect(() => {
    typingRef.current = typing;
  }, [typing]);

  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);

  useEffect(() => {
    speakingRef.current = speaking;
  }, [speaking]);

  useEffect(() => {
    let cancelled = false;
    async function loadVoiceLabel() {
      try {
        const res = await fetch("/api/voice", { method: "GET", cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { voices?: VoiceChoice[] };
        if (cancelled) return;
        if (data.voices?.[0]?.label) {
          setVoiceLabel(data.voices[0].label);
          setSelectedVoiceId(data.voices[0].id);
          setElevenAvailable(true);
        } else {
          setElevenAvailable(false);
        }
      } catch {
        setElevenAvailable(false);
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
    return ["Open Venue Finder", "Explain PIP", "Wheelchair services near me", "I’m new to disability"];
  }, [page.kind]);

  const [quickOverride, setQuickOverride] = useState<{
    kind: string;
    actions: string[];
  } | null>(null);
  const quick =
    quickOverride && quickOverride.kind === page.kind
      ? quickOverride.actions
      : defaultQuick;

  const hasUserMessage = useMemo(() => msgs.some((m) => m.role === "user"), [msgs]);
  const lastAssistantSpokenText = useMemo(
    () => [...msgs].reverse().find((m) => m.role === "assistant")?.text ?? "",
    [msgs],
  );

  function summaryChipText() {
    const loc = lastSummary.location.trim();
    const needs = lastSummary.mustHaves.length ? lastSummary.mustHaves.join(", ") : "";
    const type = lastSummary.venueType !== "Any" ? lastSummary.venueType : "";
    const parts: string[] = [];
    if (loc) parts.push(`Location: ${loc}`);
    if (needs) parts.push(`Needs: ${needs}`);
    if (type) parts.push(`Type: ${type}`);
    return parts.join(" · ");
  }

  function normalizeForSpeech(text: string) {
    const plain = text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`+/g, "");
    return plain
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
    if (playbackAudioRef.current) {
      playbackAudioRef.current.pause();
      playbackAudioRef.current.currentTime = 0;
      playbackAudioRef.current.src = "";
      playbackAudioRef.current.onended = null;
      playbackAudioRef.current.onpause = null;
      playbackAudioRef.current.onerror = null;
      playbackAudioRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
      audioRef.current.onended = null;
      audioRef.current.onpause = null;
      audioRef.current.onerror = null;
    }
    setAudioPaused(false);
    speakingRef.current = false;
    setSpeaking(false);
    if (conversationModeRef.current && !typingRef.current) setHandsFreeState("idle");
  }

  function stopRecognitionOnly() {
    try {
      recognitionRef.current?.stop?.();
    } catch {
      // ignore
    }
    recognitionRef.current = null;
    setListening(false);
    if (recognitionSilenceTimerRef.current) {
      window.clearTimeout(recognitionSilenceTimerRef.current);
      recognitionSilenceTimerRef.current = null;
    }
    if (conversationModeRef.current && !typingRef.current && !speakingRef.current) {
      setHandsFreeState("idle");
    }
  }

  function scheduleHandsFreeListen() {
    if (!conversationModeRef.current || !handsFreeRef.current) return;
    window.setTimeout(() => {
      if (!conversationModeRef.current || !handsFreeRef.current) return;
      if (typingRef.current || speakingRef.current || recognitionRef.current) return;
      startListening(true);
    }, 320);
  }

  async function primeAudioPlaybackFromUserGesture() {
    if (!audioRef.current || typeof window === "undefined") return false;
    try {
      audioRef.current.muted = true;
      audioRef.current.volume = 0;
      audioRef.current.src =
        "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA" +
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      await audioRef.current.play();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
      return true;
    } catch {
      return false;
    }
  }

  async function speakWithBrowserFallback(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    await new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.rate = audioRate;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
    return true;
  }

  async function speakReply(reply: string, opts?: { force?: boolean }) {
    stopRecognitionOnly();

    const text = normalizeForSpeech(reply);
    // Voice output is exclusively routed through hands-free mode.
    const shouldSpeak = Boolean(opts?.force || (conversationModeRef.current && handsFreeRef.current && voiceEnabled));
    if (!shouldSpeak || !text) {
      scheduleHandsFreeListen();
      return;
    }

    setVoiceError("");
    setAwaitingVoiceUnlock(false);
    speakingRef.current = true;
    setSpeaking(true);
    if (conversationModeRef.current) setHandsFreeState("speaking");
    try {
      const voiceAbort = new AbortController();
      const timeout = window.setTimeout(() => voiceAbort.abort(), 7000);
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: voiceAbort.signal,
        body: JSON.stringify({
          text,
          voiceId: selectedVoiceId || undefined,
        }),
      });
      window.clearTimeout(timeout);
      if (res.ok) {
        const blob = await res.blob();
        if (!blob.size || !(blob.type || "").includes("audio")) {
          setVoiceError("Voice response was empty or invalid audio.");
          if (conversationModeRef.current) setHandsFreeState("error");
          return;
        }
        const url = URL.createObjectURL(blob);
        try {
          playbackAudioRef.current?.pause();
          const playbackAudio = new Audio(url);
          playbackAudio.setAttribute("playsinline", "true");
          playbackAudio.preload = "auto";
          playbackAudio.muted = false;
          playbackAudio.volume = 1;
          playbackAudio.playbackRate = audioRate;
          playbackAudioRef.current = playbackAudio;
          try {
            await playbackAudio.play();
          } catch {
            const fellBack = await speakWithBrowserFallback(text);
            if (fellBack) {
              setVoiceError("Audio playback blocked for ElevenLabs; using browser voice fallback.");
            } else {
              setVoiceError("Audio playback blocked by browser. Tap 'Enable voice playback' below.");
              setAwaitingVoiceUnlock(true);
              if (conversationModeRef.current) setHandsFreeState("error");
              return;
            }
          }
          await new Promise<void>((resolve) => {
            playbackAudio.onended = () => resolve();
            playbackAudio.onpause = () => resolve();
            playbackAudio.onerror = () => resolve();
          });
        } finally {
          URL.revokeObjectURL(url);
          if (playbackAudioRef.current) {
            playbackAudioRef.current.onended = null;
            playbackAudioRef.current.onpause = null;
            playbackAudioRef.current.onerror = null;
          }
        }
        return;
      }
      let detail = "";
      try {
        const err = (await res.json()) as { error?: string };
        detail = err?.error ? ` (${err.error})` : "";
      } catch {
        // ignore JSON parse errors
      }
      setVoiceError(`ElevenLabs voice unavailable right now.${detail}`);
      if (conversationModeRef.current) {
        const fellBack = await speakWithBrowserFallback(text);
        if (fellBack) {
          setVoiceError("ElevenLabs unavailable; using browser voice fallback.");
          setHandsFreeState("speaking");
        } else {
          setHandsFreeState("error");
        }
      }
    } catch {
      if (conversationModeRef.current) {
        const fellBack = await speakWithBrowserFallback(text);
        if (fellBack) {
          setVoiceError("Voice service unavailable; using browser voice fallback.");
          setHandsFreeState("speaking");
        } else {
          setVoiceError("ElevenLabs voice unavailable right now.");
          setHandsFreeState("error");
        }
      } else {
        setVoiceError("ElevenLabs voice unavailable right now.");
      }
    } finally {
      speakingRef.current = false;
      setSpeaking(false);
      scheduleHandsFreeListen();
    }
  }

  async function startMicMonitor() {
    if (typeof window === "undefined") return;
    if (!handsFreeRef.current || !conversationModeRef.current) return;
    if (mediaStreamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);

      const loop = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(data);
        let sumSq = 0;
        for (let i = 0; i < data.length; i++) {
          const n = (data[i] - 128) / 128;
          sumSq += n * n;
        }
        const rms = Math.sqrt(sumSq / data.length);
        const level = Math.min(1, rms * 6.5);
        setMicLevel((prev) => prev * 0.6 + level * 0.4);

        const now = Date.now();
        if (
          handsFreeRef.current &&
          conversationModeRef.current &&
          !speakingRef.current &&
          !typingRef.current &&
          !recognitionRef.current &&
          level > 0.09 &&
          now - lastVADTriggerRef.current > 900
        ) {
          lastVADTriggerRef.current = now;
          startListening(true);
        } else if (
          handsFreeRef.current &&
          conversationModeRef.current &&
          speakingRef.current &&
          level > 0.12 &&
          now - lastBargeTriggerRef.current > 1000
        ) {
          // Auto-barge-in disabled to avoid assistant audio being mistaken
          // for user speech on speakers/open mics.
          lastBargeTriggerRef.current = now;
        }

        micRafRef.current = window.requestAnimationFrame(loop);
      };
      micRafRef.current = window.requestAnimationFrame(loop);
    } catch {
      setVoiceError("Microphone permission denied or unavailable.");
      setHandsFreeState("error");
    }
  }

  function stopMicMonitor() {
    if (micRafRef.current) {
      window.cancelAnimationFrame(micRafRef.current);
      micRafRef.current = null;
    }
    if (analyserRef.current) analyserRef.current.disconnect();
    analyserRef.current = null;
    if (audioCtxRef.current) {
      void audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    setMicLevel(0);
  }

  async function unlockVoicePlayback() {
    const unlocked = await primeAudioPlaybackFromUserGesture();
    if (!unlocked) {
      setVoiceError("Still blocked. Check browser site sound/autoplay permissions, then try again.");
      return;
    }
    setAwaitingVoiceUnlock(false);
    setVoiceError("");
    if (handsFreeRef.current) {
      if (!conversationModeRef.current) {
        startConversationMode(false);
      }
      startHandsFreeGreeting();
      void startMicMonitor();
    }
  }

  function togglePauseSpeaking() {
    if (!playbackAudioRef.current) return;
    if (playbackAudioRef.current.paused) {
      void playbackAudioRef.current.play();
      setAudioPaused(false);
      setHandsFreeState("speaking");
    } else {
      playbackAudioRef.current.pause();
      setAudioPaused(true);
      setHandsFreeState("idle");
    }
  }

  function runVoicePlaybackTest() {
    void speakReply("Hello from Access Stamp. Voice playback test successful.", { force: true });
  }

  async function send(
    text: string,
    opts?: { skipUserEcho?: boolean; forceHandsFree?: boolean },
  ) {
    const t = text.trim();
    if (!t) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    userStoppedRef.current = false;
    lastOutboundRef.current = t;
    const handsFreeTurn = Boolean(opts?.forceHandsFree || (conversationModeRef.current && handsFreeRef.current));
    const voiceTurnContext = handsFreeTurn || conversationModeRef.current || listening;
    stopRecognitionOnly();
    const sentNow = Date.now();
    if (!opts?.skipUserEcho) {
      setMsgs((m) => [...m, { role: "user", text: t, sentAt: sentNow }]);
      setLastSummary(parseStateSummary(t));
    }
    setDraft("");
    setTyping(true);
    if (handsFreeTurn) setHandsFreeState("processing");
    setErrorText("");
    const history = [...msgs, { role: "user" as const, text: t, sentAt: sentNow }]
      .slice(-10)
      .map((m) => ({ role: m.role, text: m.text }));

    let data: ApiResponse | null = null;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          message: t,
          page,
          voiceMode: voiceMode || voiceTurnContext,
          mode: handsFreeTurn ? "hands-free" : "text",
          history,
        }),
      });
      if (res.ok) data = (await res.json()) as ApiResponse;
      else setErrorText("I could not reach the assistant right now.");
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setTyping(false);
        if (userStoppedRef.current) {
          userStoppedRef.current = false;
          setMsgs((m) => [
            ...m,
            { role: "assistant", text: "Stopped. Ask again when you're ready.", sentAt: Date.now() },
          ]);
        } else {
          setErrorText("Something went wrong or the request timed out. Please try again.");
        }
        return;
      }
      setErrorText("Connection problem. Try again, or use Venue Finder/Browse advice below.");
    }

    const rawReply =
      data?.reply ??
      "Got it. Quick check: what city/town or postcode area are you in, and which access features matter most (step-free, toilet, parking, quiet, etc.)?";
    const reply = plainLanguage ? toPlainLanguage(rawReply) : rawReply;

    if (data?.quickActions?.length)
      setQuickOverride({ kind: page.kind, actions: data.quickActions });
    setLastLinks((data?.links ?? []).map((l) => ({ ...l, href: normalizeVenueHref(l.href) })));
    setLastVenues(data?.venues?.slice(0, 3) ?? []);
    setMsgs((m) => [...m, { role: "assistant", text: reply, sentAt: Date.now() }]);
    setTyping(false);

    await speakReply(reply, { force: handsFreeTurn });

  }

  async function sendHandsFree(text: string, opts?: { skipUserEcho?: boolean }) {
    await send(text, { ...opts, forceHandsFree: true });
  }

  function stopResponse() {
    userStoppedRef.current = true;
    abortRef.current?.abort();
    abortRef.current = null;
    setTyping(false);
    if (conversationModeRef.current) setHandsFreeState("idle");
  }

  function collapseChat() {
    endConversation();
    setOpen(false);
  }

  function endConversation() {
    conversationModeRef.current = false;
    setConversationMode(false);
    setHandsFree(false);
    stopResponse();
    stopAllSpeech();
    try {
      recognitionRef.current?.stop?.();
    } catch {
      // ignore
    }
    recognitionRef.current = null;
    setListening(false);
    setSpeaking(false);
    stopMicMonitor();
    setHandsFreeState("idle");
  }

  function startConversationMode(autoListen = true) {
    conversationModeRef.current = true;
    setConversationMode(true);
    setHandsFree(true);
    setVoiceEnabled(true);
    setHandsFreeState("idle");
    void primeAudioPlaybackFromUserGesture();
    if (autoListen && !typingRef.current && !speakingRef.current && !recognitionRef.current) {
      // Entering voice mode should immediately start listening.
      window.setTimeout(() => startListening(true), 220);
    }
  }

  function startHandsFreeGreeting() {
    const greeting = "Hi, I'm here. What would you like help with today?";
    // Speak a stable greeting without appending a transcript bubble.
    void speakReply(greeting, { force: true });
  }

  async function setHandsFreeMode(next: boolean) {
    if (!next) {
      setHandsFree(false);
      conversationModeRef.current = false;
      setConversationMode(false);
      stopRecognitionOnly();
      stopAllSpeech();
      stopMicMonitor();
      setAwaitingVoiceUnlock(false);
      setHandsFreeState("idle");
      return;
    }
    setHandsFree(true);
    const unlocked = await primeAudioPlaybackFromUserGesture();
    if (!unlocked) {
      setVoiceError("Sound is blocked. Tap 'Enable voice playback' to continue hands-free mode.");
      setAwaitingVoiceUnlock(true);
      setHandsFreeState("error");
      return;
    }
    setAwaitingVoiceUnlock(false);
    setVoiceError("");
    // Voice-first default: keep text hidden during live hands-free turns.
    setShowCaptions(false);

    if (!conversationModeRef.current) {
      startConversationMode(false);
      startHandsFreeGreeting();
      void startMicMonitor();
      return;
    }

    startHandsFreeGreeting();
    void startMicMonitor();
  }

  function interruptAndListen() {
    stopResponse();
    stopAllSpeech();
    window.setTimeout(() => {
      if (!conversationModeRef.current || speakingRef.current || typingRef.current) return;
      startListening(true);
    }, 120);
  }

  async function copySummary() {
    const summary = `Location: ${lastSummary.location || "Not set"}\nType: ${lastSummary.venueType}\nMust-haves: ${
      lastSummary.mustHaves.join(", ") || "Not set"
    }`;
    try {
      await navigator.clipboard.writeText(summary);
      setMsgs((m) => [...m, { role: "assistant", text: "Summary copied for sharing.", sentAt: Date.now() }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Could not copy summary on this browser.", sentAt: Date.now() }]);
    }
  }

  function startListening(fromConversation = false) {
    if (!canUseSpeech()) {
      if (fromConversation || conversationModeRef.current) {
        setVoiceError("Microphone unavailable in this browser.");
        setHandsFreeState("error");
      }
      return;
    }
    if (typingRef.current) return;
    if (speakingRef.current) return;
    if (recognitionRef.current) return;
    const Rec = getSpeechRecognitionCtor();
    if (!Rec) return;
    const rec = new Rec();
    recognitionRef.current = rec;
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = selectedLanguage;
    setListening(true);
    if (fromConversation || conversationModeRef.current) setHandsFreeState("listening");
    liveTranscriptRef.current = "";
    recognitionFinalRef.current = "";
    recognitionSentRef.current = false;

    rec.onresult = (e: unknown) => {
      const ev = e as {
        resultIndex?: number;
        results?: ArrayLike<{ 0?: { transcript?: string }; isFinal?: boolean }>;
      };
      const results = ev.results;
      if (!results || typeof results.length !== "number") return;
      const start = typeof ev.resultIndex === "number" ? ev.resultIndex : 0;

      let interimTranscript = "";
      for (let i = start; i < results.length; i++) {
        const part = results[i]?.[0]?.transcript ?? "";
        if (results[i]?.isFinal) recognitionFinalRef.current += part;
        else interimTranscript += part;
      }
      const cleaned = (recognitionFinalRef.current || interimTranscript).trim();
      liveTranscriptRef.current = cleaned;
      setDraft(cleaned);
      if (recognitionSilenceTimerRef.current) window.clearTimeout(recognitionSilenceTimerRef.current);
      recognitionSilenceTimerRef.current = window.setTimeout(() => {
        try {
          recognitionRef.current?.stop?.();
        } catch {
          // ignore
        }
      }, 900);
    };
    rec.onerror = (err: unknown) => {
      setListening(false);
      recognitionRef.current = null;
      if (recognitionSilenceTimerRef.current) {
        window.clearTimeout(recognitionSilenceTimerRef.current);
        recognitionSilenceTimerRef.current = null;
      }
      const code = String((err as { error?: string })?.error ?? "");
      if (fromConversation || conversationModeRef.current) {
        setVoiceError(code === "not-allowed" ? "Microphone permission denied." : "Microphone unavailable.");
        setHandsFreeState("error");
      }
    };
    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      if (recognitionSilenceTimerRef.current) {
        window.clearTimeout(recognitionSilenceTimerRef.current);
        recognitionSilenceTimerRef.current = null;
      }
      const finalText = recognitionFinalRef.current.trim() || liveTranscriptRef.current.trim();
      if (finalText && !recognitionSentRef.current) {
        recognitionSentRef.current = true;
        setDraft(finalText);
        void sendHandsFree(finalText);
        liveTranscriptRef.current = "";
        recognitionFinalRef.current = "";
        return;
      }
      if (handsFreeRef.current && conversationModeRef.current && !typingRef.current) {
        window.setTimeout(() => startListening(true), 240);
      } else if (conversationModeRef.current && !typingRef.current && !speakingRef.current) {
        setHandsFreeState("idle");
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

  useEffect(() => {
    if (!open && conversationModeRef.current) endConversation();
    return () => {
      stopResponse();
      stopAllSpeech();
      try {
        recognitionRef.current?.stop?.();
      } catch {
        // ignore
      }
      if (recognitionSilenceTimerRef.current) window.clearTimeout(recognitionSilenceTimerRef.current);
      recognitionRef.current = null;
      stopMicMonitor();
    };
  }, [open]);

  useEffect(() => {
    if (!conversationModeRef.current) return;
    endConversation();
  }, [page.kind]);

  useEffect(() => {
    if (handsFree && conversationMode) {
      void startMicMonitor();
    } else {
      stopMicMonitor();
    }
  }, [handsFree, conversationMode]);

  const statusLabel =
    handsFreeState === "listening"
      ? "Listening..."
      : handsFreeState === "processing"
        ? "Thinking..."
        : handsFreeState === "speaking"
          ? "Speaking..."
          : handsFreeState === "error"
            ? voiceError || "Voice unavailable"
            : "Ready";

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
        conversationMode ? (
          <div className="fixed inset-0 z-[70] bg-[#071224]/75 p-3 backdrop-blur-[2px]">
            <div className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-[18px] border border-[#d8dfea] bg-white shadow-[0_24px_60px_-20px_rgba(12,29,52,0.45)]">
              <div className="flex flex-col gap-3 border-b border-[#dde4ef] bg-[#0d4bb3] px-4 py-3 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">Hands-free mode</div>
                    <div className="text-xs text-blue-100" aria-live="polite">
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-2 py-0.5 font-semibold",
                          handsFreeState === "listening"
                            ? "bg-emerald-500/25 text-emerald-100"
                            : handsFreeState === "processing"
                              ? "bg-violet-500/25 text-violet-100"
                              : handsFreeState === "speaking"
                                ? "bg-amber-500/25 text-amber-100"
                                : handsFreeState === "error"
                                  ? "bg-rose-500/25 text-rose-100"
                                  : "bg-white/15 text-blue-100",
                        )}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="rounded border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10"
                      onClick={interruptAndListen}
                    >
                      Interrupt
                    </button>
                    <button
                      type="button"
                      className="rounded border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10"
                      onClick={endConversation}
                    >
                      Exit voice mode
                    </button>
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-xs leading-snug">
                  <input
                    type="checkbox"
                    checked={handsFree}
                    onChange={(e) => {
                      void setHandsFreeMode(e.target.checked);
                    }}
                    className="h-4 w-4 shrink-0 rounded border-white/40"
                  />
                  <span>
                    <span className="font-semibold">Speak naturally with the assistant.</span> It will listen,
                    reply, and talk back. After each reply, listening restarts automatically.
                  </span>
                </label>
              </div>
              <div ref={scroller} className="min-h-0 flex-1 overflow-auto bg-[#f8fafc] px-5 py-4">
                {handsFree ? (
                  <div className="mb-4 rounded-[14px] border border-[#d5e2f5] bg-[#f2f7ff] p-5">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Hands-free voice
                      </div>
                      <div className="rounded-full border border-[#dbe4f2] bg-white px-3 py-1 text-xs font-semibold text-heading">
                        Voice: {voiceLabel}
                      </div>
                      <div
                        className="flex h-10 items-end gap-1 rounded-[12px] border border-[#dbe4f2] bg-white px-2 py-1"
                        role="img"
                        aria-label={`Microphone level ${Math.round(micLevel * 100)} percent`}
                      >
                        {Array.from({ length: 16 }).map((_, i) => {
                          const h = Math.max(12, Math.round((Math.min(1, micLevel * 1.4) * (i % 5 === 0 ? 32 : 24))));
                          return (
                            <span
                              key={i}
                              className="w-[4px] rounded-full bg-blue/60 transition-all"
                              style={{ height: `${h}px`, opacity: 0.35 + Math.min(0.65, micLevel) }}
                            />
                          );
                        })}
                      </div>
                      <div className="flex justify-center">
                        <VoiceOrb
                          state={
                            handsFreeState === "listening"
                              ? "listening"
                              : handsFreeState === "speaking"
                                ? "speaking"
                                : handsFreeState === "processing"
                                  ? "thinking"
                                  : "idle"
                          }
                        />
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {!listening ? (
                          <button
                            id="handsfree-start-listening"
                            type="button"
                            className="rounded-[10px] border border-[#d8e1ef] bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                            onClick={() => startListening(true)}
                            aria-label="Start listening"
                          >
                            Start listening
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="rounded-[10px] border border-[#d8e1ef] bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                          onClick={runVoicePlaybackTest}
                          aria-label="Test voice playback"
                        >
                          Test voice
                        </button>
                      </div>
                      <div className="w-full max-w-xl space-y-2 text-left">
                        {showCaptions ? (
                          <>
                            <div className="rounded-[12px] border border-[#dbe4f2] bg-white px-3 py-2 text-sm text-heading">
                              <span className="font-semibold">You:</span>{" "}
                              {draft.trim() || (listening ? "Speak now…" : "Waiting for your voice input…")}
                            </div>
                            <div className="rounded-[12px] border border-[#dbe4f2] bg-white px-3 py-2 text-sm text-heading">
                              <span className="font-semibold">Assistant:</span>{" "}
                              {typing ? "Thinking…" : lastAssistantSpokenText || "I will speak back here once we start."}
                            </div>
                          </>
                        ) : null}
                      </div>
                      <p className="max-w-xl text-xs text-muted">
                        Keep talking naturally. After each reply, the mic turns back on automatically.
                        Transcript is still saved and visible after voice mode ends.
                      </p>
                    </div>
                  </div>
                ) : null}
                {handsFree ? null : (
                  <>
                    <div className="mb-3 rounded-[12px] border border-[#dbe4f2] bg-white px-3 py-2 text-sm text-heading">
                      <span className="font-semibold">Live input:</span>{" "}
                      {draft.trim() || (listening ? "Speak now…" : "Waiting for your voice or pasted text…")}
                    </div>
                    <div className="grid gap-2">
                      {msgs.slice(-6).map((m, i) => (
                        <div
                          key={`${m.sentAt}-${i}`}
                          className={cn(
                            "rounded-[12px] border px-3 py-2 text-sm",
                            m.role === "assistant" ? "border-[#e3e8ef] bg-white" : "border-[#d3e2ff] bg-[#e8f0ff]",
                          )}
                        >
                          <ChatMessageContent text={m.text} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {voiceError ? (
                  <div className="mt-3 rounded-[12px] border border-amber bg-amber-pale px-3 py-2 text-xs text-[#7c5b16]">
                    {voiceError}
                  </div>
                ) : null}
                {awaitingVoiceUnlock ? (
                  <button
                    type="button"
                    className="mt-2 rounded-[10px] border border-[#d8e1ef] bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                    onClick={() => void unlockVoicePlayback()}
                    aria-label="Enable voice playback"
                  >
                    Enable voice playback
                  </button>
                ) : null}
                
              </div>

              <div className="border-t border-[#dde4ef] bg-white px-4 py-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className={cn(
                      "rounded border px-3 py-1 text-xs font-semibold",
                      listening ? "border-amber bg-amber-pale text-[#92400e]" : "border-[#d8e1ef] text-heading hover:bg-[#f5f8ff]",
                      (speaking || typing) && "cursor-not-allowed opacity-60",
                    )}
                    disabled={speaking || typing}
                    title={
                      speaking
                        ? "Wait for speech to finish, or tap Interrupt"
                        : typing
                          ? "Wait for the reply"
                        : "Push-to-talk — tap Start listening"
                    }
                    onClick={() => {
                      if (speaking || typing) return;
                      if (listening) {
                        try {
                          recognitionRef.current?.stop?.();
                        } catch {
                          // ignore
                        }
                      } else {
                        startListening(true);
                      }
                    }}
                  >
                    {listening ? "Stop listening" : "Start listening"}
                  </button>
                  <button type="button" className="rounded border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-heading hover:bg-[#f5f8ff]" onClick={stopAllSpeech}>
                    Stop speaking
                  </button>
                  <button
                    type="button"
                    className="rounded border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                    aria-pressed={!voiceEnabled}
                    onClick={() => setVoiceEnabled((v) => !v)}
                  >
                    {voiceEnabled ? "Mute voice replies" : "Unmute voice replies"}
                  </button>
                  {speaking ? (
                    <button
                      type="button"
                      className="rounded border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                      onClick={togglePauseSpeaking}
                    >
                      {audioPaused ? "Resume speaking" : "Pause speaking"}
                    </button>
                  ) : null}
                  <label className="inline-flex items-center gap-2 rounded border border-[#d8e1ef] px-2 py-1 text-xs font-semibold text-heading">
                    Speed
                    <select
                      aria-label="Voice playback speed"
                      className="rounded border border-[#d8e1ef] bg-white px-1 py-0.5 text-xs"
                      value={audioRate}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setAudioRate(next);
                        if (audioRef.current) audioRef.current.playbackRate = next;
                      }}
                    >
                      <option value={0.9}>0.9x</option>
                      <option value={1}>1.0x</option>
                      <option value={1.1}>1.1x</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className="rounded border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                    aria-pressed={showCaptions}
                    onClick={() => setShowCaptions((v) => !v)}
                  >
                    {showCaptions ? "Captions: on" : "Captions: off"}
                  </button>
                  {typing ? (
                    <button
                      type="button"
                      className="rounded border border-[#d8e1ef] px-3 py-1 text-xs font-semibold text-heading hover:bg-[#f5f8ff]"
                      onClick={stopResponse}
                    >
                      Stop response
                    </button>
                  ) : null}
                </div>
                <div className="flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={2}
                    placeholder="Paste text (e.g. email) and press Send…"
                    className="min-h-11 flex-1 resize-y rounded-[12px] border border-[#d8e1ef] bg-white px-3 py-2 text-sm text-heading"
                  />
                  <button
                    type="button"
                    className="rounded-[12px] bg-[#0d4bb3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a3f97]"
                    onClick={() => void send(draft)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
        <div className="flex h-[min(640px,calc(100vh-18px))] w-[min(440px,calc(100vw-12px))] flex-col overflow-hidden rounded-[16px] border border-[#d8dfea] bg-white shadow-[0_24px_54px_-26px_rgba(12,29,52,0.35)]">
          <div
            className="relative flex items-center justify-between gap-3 border-b border-white/15 px-4 py-3 text-white"
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
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                title="Turn spoken replies on or off"
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 cursor-pointer"
                onClick={() => setVoiceEnabled((v) => !v)}
                aria-label="Toggle voice playback"
              >
                <IconSpeaker muted={!voiceEnabled} />
              </button>
              <button
                type="button"
                title="Language, voice style, and accessibility options"
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={settingsOpen}
                onClick={() => setSettingsOpen((v) => !v)}
                aria-label="Open chat settings"
              >
                <IconDots />
              </button>
              <button
                type="button"
                title="Minimize chat"
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 cursor-pointer"
                onClick={collapseChat}
                aria-label="Collapse chat"
              >
                <IconChevronDown />
              </button>
              {settingsOpen ? (
                <div className="absolute right-4 top-12 z-10 w-56 rounded-[var(--radius-card)] border border-white/30 bg-[#142138] p-2 text-white shadow-[var(--shadow)]">
                  <div className="mb-2 rounded-[var(--radius-ui)] bg-white/10 px-2 py-2 text-xs font-semibold text-white">
                    Voice style: {voiceLabel}
                  </div>
                  <label className="mb-2 grid gap-1 text-xs font-semibold">
                    Voice input language
                    <select
                      className="rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      aria-label="Voice input language"
                    >
                      <option value="en-GB" className="text-heading">English (UK)</option>
                      <option value="en-US" className="text-heading">English (US)</option>
                      <option value="es-ES" className="text-heading">Spanish (ES)</option>
                      <option value="fr-FR" className="text-heading">French (FR)</option>
                    </select>
                  </label>
                  <div className="mb-2 border-t border-white/10 pt-2">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#8eb4dc]">Conversation</div>
                    <button
                      type="button"
                      className={cn(
                        "mb-1 w-full rounded-[var(--radius-ui)] px-2 py-1 text-left text-xs font-semibold cursor-pointer",
                        conversationMode ? "bg-white/20 text-white" : "bg-white/5 text-[#c0d0e2]",
                      )}
                      onClick={() => {
                        if (conversationMode) endConversation();
                        else void setHandsFreeMode(true);
                      }}
                    >
                      {conversationMode ? "End hands-free mode" : "Start hands-free mode"}
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "mb-1 w-full rounded-[var(--radius-ui)] px-2 py-1 text-left text-xs font-semibold cursor-pointer",
                        handsFree ? "bg-emerald-500/25 text-emerald-100" : "bg-white/5 text-[#c0d0e2]",
                      )}
                      aria-pressed={handsFree}
                      title={handsFree ? "Turn off hands-free mode" : "Turn on hands-free mode"}
                      onClick={() => {
                        void setHandsFreeMode(!handsFree);
                      }}
                    >
                      {handsFree ? "Turn off hands-free mode" : "Turn on hands-free mode"}
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-left text-xs font-semibold cursor-pointer hover:bg-white/20"
                      onClick={() => stopAllSpeech()}
                    >
                      Stop talking (playback)
                    </button>
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "mb-2 w-full rounded-[var(--radius-ui)] px-2 py-1 text-left text-xs font-semibold cursor-pointer",
                      hoverReadEnabled ? "bg-white/20" : "bg-white/5 text-[#c0d0e2]",
                    )}
                    onClick={() => setHoverReadEnabled((v) => !v)}
                    aria-pressed={hoverReadEnabled}
                  >
                    {hoverReadEnabled ? "Read text on hover: on" : "Read text on hover: off"}
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
                    {voiceEnabled ? "Hands-free voice: on" : "Hands-free voice: muted"}
                  </button>
                  <p className="mt-2 text-[10px] text-[#c0d0e2]">
                    Hands-free mode always speaks replies and uses ElevenLabs first.
                  </p>
                  <button
                    type="button"
                    className="mt-2 w-full rounded-[var(--radius-ui)] bg-white/10 px-2 py-1 text-left text-xs font-semibold cursor-pointer hover:bg-white/20"
                    onClick={runVoicePlaybackTest}
                  >
                    Test voice now
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
            className="min-h-0 flex-1 overflow-auto bg-[#f7faff] px-5 py-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Chat transcript"
          >
            <p className="mb-3 rounded-[12px] border border-[#dbe4f2] bg-white px-3 py-2 text-xs text-muted">
              Ask about venues, equipment, benefits, rights, travel, school, work, or care support.
            </p>
            <div className="grid gap-2">
              {msgs.map((m, i) => {
                const prev = msgs[i - 1];
                const showTime =
                  i === 0 ||
                  Math.floor(m.sentAt / 60000) !== Math.floor((prev?.sentAt ?? 0) / 60000);
                return (
                  <div key={`${m.sentAt}-${i}`} className={cn("flex items-end gap-2", m.role === "user" && "justify-end")}>
                    {m.role === "assistant" ? (
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0d4bb3] text-white text-xs">
                        <IconRobot />
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        "max-w-[78%] rounded-[16px] border px-4 py-3 shadow-[0_8px_18px_-16px_rgba(12,29,52,0.28)]",
                        m.role === "assistant"
                          ? "border-[#e3e8ef] bg-white text-heading"
                          : "border-[#d3e2ff] bg-[#e8f0ff] text-heading",
                      )}
                    >
                      <ChatMessageContent text={m.text} />
                      {showTime ? (
                        <div className="mt-2 border-t border-[#e8ecf3] pt-2 text-[11px] text-muted">{clockLabel(m.sentAt)}</div>
                      ) : null}
                    </div>
                    {m.role === "user" ? (
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0d4bb3] text-white text-xs">
                        <IconUser />
                      </div>
                    ) : null}
                  </div>
                );
              })}
              {typing ? (
                <div className="max-w-[90%] justify-self-start rounded-[14px] border border-[#e3ded6] bg-white px-3 py-2 text-sm text-muted">
                  <span aria-busy="true">Typing…</span>
                  <span className="mt-1 block text-[11px] text-muted">If this hangs, you can stop and retry.</span>
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
                      key={`${link.label}-${link.href}`}
                      href={normalizeVenueHref(link.href)}
                      className="rounded-[var(--radius-ui)] border border-border bg-white px-3 py-1 text-xs font-semibold text-blue"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              {errorText ? (
                <div className="rounded-[var(--radius-ui)] border border-[#fecaca] bg-[#fef2f2] p-3 text-xs text-[#991b1b]">
                  <p>{errorText}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-[var(--radius-ui)] bg-[#991b1b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#7f1d1d]"
                      onClick={() => {
                        const retry = lastOutboundRef.current.trim();
                        if (!retry) return;
                        setErrorText("");
                        void send(retry, { skipUserEcho: true });
                      }}
                    >
                      Retry
                    </button>
                    <Link href="/venue-finder" className="inline-flex items-center rounded-[var(--radius-ui)] border border-[#fecaca] px-3 py-1.5 text-xs font-semibold hover:bg-white">
                      Open Venue Finder
                    </Link>
                    <Link href="/advice" className="inline-flex items-center rounded-[var(--radius-ui)] border border-[#fecaca] px-3 py-1.5 text-xs font-semibold hover:bg-white">
                      Browse advice
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t border-[#dde4ef] bg-white px-4 pb-3 pt-3">
            <audio ref={audioRef} className="hidden" playsInline preload="auto" />
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

            {hasUserMessage && summaryChipText() ? (
              <div className="mb-2 flex flex-wrap items-center gap-2 rounded-[12px] border border-[#dbe4f2] bg-[#f4f8ff] px-3 py-2 text-[11px] text-heading">
                <span className="font-semibold text-muted">Search context</span>
                <span className="min-w-0 flex-1 font-medium">{summaryChipText()}</span>
                <Link href="/venue-finder" className="shrink-0 font-semibold text-blue underline-offset-2 hover:underline">
                  Change
                </Link>
              </div>
            ) : null}

            <div className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2">
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
                  className="h-12 w-full rounded-[12px] border border-[#d8e1ef] bg-white px-4 text-sm text-heading shadow-[inset_0_1px_2px_rgba(12,29,52,0.04)]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send(draft);
                  }}
                />
              </div>
              <button
                type="button"
                className={cn(
                  "h-12 rounded-[12px] border px-3 text-xs font-semibold transition-colors",
                  handsFree
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-[#d8e1ef] bg-white text-heading hover:bg-[#f5f8ff]",
                  !speechSupported && "cursor-not-allowed border-[#e6ebf3] bg-[#f6f8fb] text-muted hover:bg-[#f6f8fb]",
                )}
                aria-label={handsFree ? "Turn off hands-free mode" : "Turn on hands-free mode"}
                title={
                  handsFree
                    ? "Turn off hands-free mode"
                    : "Turn on hands-free mode"
                }
                onClick={() => {
                  if (!speechSupported) return;
                  void setHandsFreeMode(!handsFree);
                }}
                disabled={!speechSupported}
              >
                {handsFree ? "HF on" : "Hands-free"}
              </button>
              <button
                type="button"
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-[12px] border border-[#d8e1ef] bg-white text-[#0d4bb3] cursor-pointer transition-colors hover:bg-[#f5f8ff]",
                  listening && "border-amber bg-amber-pale",
                  (!speechSupported || speaking || typing) && "cursor-not-allowed border-[#e6ebf3] bg-[#f6f8fb] text-muted hover:bg-[#f6f8fb]",
                )}
                aria-label={listening ? "Stop voice input" : "Start voice input"}
                onClick={() => {
                  if (speaking || typing) return;
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
                disabled={!speechSupported || speaking || typing}
                title={
                  speaking
                    ? "Wait for speech to finish"
                    : typing
                      ? "Wait for the reply"
                      : listening
                        ? "Listening now"
                        : "Tap to speak"
                }
              >
                {listening ? <span className="h-2 w-2 rounded-full bg-amber-600" aria-hidden /> : <IconMic />}
              </button>
              <button
                type="button"
                className={cn(
                  "grid h-12 min-w-12 place-items-center rounded-[12px] bg-[#0d4bb3] px-3 text-white cursor-pointer transition-colors hover:bg-[#0a3f97]",
                  typing && "bg-[#b45309] hover:bg-[#92400e]",
                )}
                aria-label={typing ? "Stop response" : "Send message"}
                title={typing ? "Stop the current reply" : "Send message"}
                onClick={() => {
                  if (typing) {
                    stopResponse();
                    return;
                  }
                  void send(draft);
                }}
              >
                {typing ? "Stop" : <IconSend />}
              </button>
            </div>
            {!speechSupported ? (
              <p className="mt-2 text-[11px] text-muted">Voice input is not supported in this browser. You can still type messages.</p>
            ) : null}
          </div>
        </div>
        )
      )}
    </div>
  );
}
