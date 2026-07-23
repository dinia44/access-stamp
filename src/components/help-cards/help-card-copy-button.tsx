"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  label: string;
  accessibleName: string;
  className?: string;
  variant?: "primary" | "quiet" | "onDark";
};

export function HelpCardCopyButton({
  text,
  label,
  accessibleName,
  className,
  variant = "primary",
}: CopyButtonProps) {
  const liveId = useId();
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [fallbackOpen, setFallbackOpen] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setFallbackOpen(false);
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("failed");
      setFallbackOpen(true);
    }
  }

  const styles =
    variant === "primary"
      ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]"
      : variant === "onDark"
        ? "border-white/30 bg-white/10 text-white hover:bg-white/16"
        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-brand)]";

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        onClick={() => void handleCopy()}
        aria-label={accessibleName}
        aria-describedby={liveId}
        className={cn(
          "inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
          styles,
        )}
      >
        {status === "copied" ? "Copied" : label}
      </button>
      <p id={liveId} className="sr-only" aria-live="polite">
        {status === "copied" ? `${accessibleName.replace(/^Copy\s+/i, "Copied ")}` : status === "failed" ? "Copy failed. Text is selectable below." : ""}
      </p>
      {fallbackOpen ? (
        <div className="rounded-[var(--radius-md)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] p-3">
          <p className="text-sm font-semibold text-[var(--color-ink)]">Copy failed — select and copy this text:</p>
          <textarea
            readOnly
            value={text}
            rows={Math.min(8, Math.max(3, text.split("\n").length))}
            className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-sm leading-6 text-[var(--color-ink)]"
          />
        </div>
      ) : null}
    </div>
  );
}
