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
  customKeyLine,
  onCustomKeyLineChange,
}: {
  card: HelpCard;
  className?: string;
  showHelper?: boolean;
  onOpen?: () => void;
  customKeyLine?: string;
  onCustomKeyLineChange?: (line: string) => void;
}) {
  const { openChat } = useChat();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [tailoring, setTailoring] = useState(false);
  const [editing, setEditing] = useState(false);

  const lineToCopy = customKeyLine?.trim() || card.quickLine || card.keyLine;

  async function copyKeyLine() {
    try {
      await navigator.clipboard.writeText(lineToCopy);
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
        ? "Saved to phone"
        : saveState === "error"
          ? "Save failed"
          : "Save as image";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-2">
        {onOpen ? (
          <Button variant="primary" onClick={onOpen} aria-label={`Open ${card.title}`}>
            Open card
          </Button>
        ) : null}

        <Button
          variant="secondary"
          isLoading={saveState === "saving"}
          onClick={() => void saveCard()}
          aria-label={`Save ${card.title} as image`}
          className="min-h-11 rounded-full"
        >
          {saveLabel}
        </Button>

        <Button
          variant="secondary"
          onClick={() => void handlePrint()}
          aria-label={`Save ${card.title} as PDF`}
          className="min-h-11 rounded-full"
        >
          Save as PDF
        </Button>

        <Button
          variant="secondary"
          isLoading={tailoring}
          onClick={handleTailor}
          aria-label={`Tailor ${card.title} with AI`}
          className="min-h-11 rounded-full"
        >
          {tailoring ? "Opening AI…" : "Tailor with AI"}
        </Button>

        <Button
          variant="ghost"
          onClick={() => void copyKeyLine()}
          aria-label={`Copy quick line from ${card.title}`}
          className="min-h-11 rounded-full"
        >
          {copyState === "copied" ? "Copied" : card.quickLine ? "Copy quick line" : "Copy key line"}
        </Button>

        {onCustomKeyLineChange ? (
          <Button
            variant="ghost"
            onClick={() => setEditing((current) => !current)}
            className="min-h-11 rounded-full"
          >
            {editing ? "Hide editor" : "Edit wording"}
          </Button>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {copyState === "copied" ? "Quick line copied to clipboard." : ""}
        {saveState === "saved" ? "Help card saved as image." : ""}
        {saveState === "error" ? "Could not save help card image." : ""}
      </p>

      {editing && onCustomKeyLineChange ? (
        <label className="block text-sm">
          <span className="font-semibold text-heading">Edit quick line for this card</span>
          <textarea
            value={customKeyLine ?? lineToCopy}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-border bg-white px-3 py-2 text-sm"
            onChange={(event) => onCustomKeyLineChange(event.target.value)}
          />
        </label>
      ) : null}

      {showHelper ? (
        <p className="text-sm leading-relaxed text-[#5f6b76]">
          Save as image for your phone, or use Save as PDF for printing. Edit the quick line before exporting if you
          need different wording.
        </p>
      ) : null}
    </div>
  );
}
