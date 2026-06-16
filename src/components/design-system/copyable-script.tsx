"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CopyableScript({
  script,
  label = "Copy script",
  className,
}: {
  script: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <blockquote className="rounded-2xl border border-border bg-background-2 p-4 text-sm leading-7 text-heading">
        {script}
      </blockquote>
      <Button type="button" variant="secondary" onClick={() => void handleCopy()} className="min-h-11">
        {copied ? "Copied" : label}
      </Button>
      <p className="sr-only" aria-live="polite">
        {copied ? "Script copied to clipboard" : ""}
      </p>
    </div>
  );
}
