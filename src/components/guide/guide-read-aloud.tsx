"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ReadAloudState = "idle" | "playing" | "paused";

type GuideReadAloudProps = {
  text: string;
  className?: string;
  compact?: boolean;
};

function supportsSpeechSynthesis() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function GuideReadAloud({ text, className, compact = false }: GuideReadAloudProps) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [supported, setSupported] = useState(true);
  const [state, setState] = useState<ReadAloudState>("idle");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setSupported(supportsSpeechSynthesis());
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setState("idle");
    setStatus("Read aloud stopped.");
  }, []);

  useEffect(() => () => stop(), [stop]);

  const start = useCallback(() => {
    if (!supportsSpeechSynthesis() || !text.trim()) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    utterance.onstart = () => {
      setState("playing");
      setStatus("Reading guide aloud.");
    };
    utterance.onend = () => {
      setState("idle");
      setStatus("Finished reading.");
    };
    utterance.onerror = () => {
      setState("idle");
      setStatus("Read aloud stopped.");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text]);

  const togglePause = useCallback(() => {
    if (!supportsSpeechSynthesis()) return;
    if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
      setStatus("Read aloud paused.");
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      setStatus("Reading guide aloud.");
    }
  }, [state]);

  if (!supported) {
    return (
      <p className={cn("text-sm leading-6 text-muted", className)}>
        Your browser does not support built-in read aloud. You can still use your device screen reader or browser read
        aloud tools.
      </p>
    );
  }

  const btn =
    "inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2";

  return (
    <div className={cn("space-y-2", className)}>
      <div className={cn("flex flex-wrap gap-2", compact && "gap-2")}>
        {state === "idle" ? (
          <button type="button" onClick={start} className={cn(btn, "bg-[#59682A] text-white hover:bg-[#45521F]")}>
            Listen
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={togglePause}
              className={cn(btn, "border border-[#E8C4A8] bg-white text-heading hover:bg-[#FFF3E8]")}
            >
              {state === "paused" ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              onClick={stop}
              className={cn(btn, "border border-[#E8C4A8] bg-white text-heading hover:bg-[#FFF3E8]")}
            >
              Stop
            </button>
          </>
        )}
      </div>
      <p className="text-xs text-muted" aria-live="polite" role="status">
        {status}
      </p>
    </div>
  );
}
