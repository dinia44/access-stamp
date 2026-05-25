"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ToolkitCopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "rounded-[var(--radius-ui)] border border-border bg-card px-3 py-1.5 text-xs font-semibold text-blue transition-colors hover:bg-blue-pale",
        className,
      )}
    >
      {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : label}
    </button>
  );
}
