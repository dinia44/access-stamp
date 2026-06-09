"use client";

import { useState } from "react";
import type { HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng, printHelpCard } from "@/lib/help-card-png";
import { useChat } from "@/components/chat/provider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied";
type SaveState = "idle" | "saving" | "saved" | "error";

export function HelpCardActions({
  card,
  className,
  showHelper = true,
  onOpen,
}: {
  card: HelpCard;
  className?: string;
  showHelper?: boolean;
  onOpen?: () => void;
}) {
  const { openChat } = useChat();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [tailoring, setTailoring] = useState(false);

  async function copyKeyLine() {
    try {
      await navigator.clipboard.writeText(card.keyLine);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("idle");
    }
  }

  async function saveCard() {
    setSaveState("saving");
    try {
      await downloadHelpCardAsPng(card);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 2000);
    } catch {
      setSaveState("error");
      window.setTimeout(() => setSaveState("idle"), 3000);
    }
  }

  async function handlePrint() {
    await printHelpCard(card);
  }

  function handleTailor() {
    setTailoring(true);
    openChat({
      prefill: `Tailor this help card for me: ${card.title}. My situation is: `,
    });
    window.setTimeout(() => setTailoring(false), 1200);
  }

  const saveLabel =
    saveState === "saving"
      ? "Saving…"
      : saveState === "saved"
        ? "Saved"
        : saveState === "error"
          ? "Save failed"
          : "Save to phone";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-2">
        {onOpen ? (
          <Button
            variant="primary"
            onClick={onOpen}
            aria-label={`Open ${card.title}`}
          >
            Open card
          </Button>
        ) : null}

        <Button
          variant="secondary"
          isLoading={saveState === "saving"}
          onClick={() => void saveCard()}
          aria-label={`Save ${card.title} to phone`}
        >
          {saveLabel}
        </Button>

        <Button
          variant="secondary"
          onClick={() => void handlePrint()}
          aria-label={`Print ${card.title}`}
        >
          Print
        </Button>

        <Button
          variant="secondary"
          isLoading={tailoring}
          onClick={handleTailor}
          aria-label={`Tailor ${card.title} with AI`}
        >
          {tailoring ? "Opening AI…" : "Tailor with AI"}
        </Button>

        <Button
          variant="ghost"
          onClick={() => void copyKeyLine()}
          aria-label={`Copy key line from ${card.title}`}
        >
          {copyState === "copied" ? "Copied" : "Copy key line"}
        </Button>
      </div>

      {showHelper ? (
        <p className="text-sm leading-relaxed text-[#5f6b76]">
          Downloads as a PNG image you can save to your phone or share.
        </p>
      ) : null}
    </div>
  );
}
