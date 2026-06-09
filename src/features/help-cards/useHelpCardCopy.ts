"use client";

import { useCallback, useState } from "react";

export function useHelpCardCopy() {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
      return true;
    } catch {
      setCopyState("idle");
      return false;
    }
  }, []);

  return { copyState, copyText, copied: copyState === "copied" };
}
