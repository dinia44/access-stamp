"use client";

import type { HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng, printHelpCard } from "@/lib/help-card-png";
import { useChat } from "@/components/chat/provider";
import { cn } from "@/lib/utils";
import {
  HC_BTN_GHOST,
  HC_BTN_PRIMARY,
  HC_BTN_SECONDARY,
} from "@/components/help-cards/help-cards-theme";

async function copyKeyLine(keyLine: string) {
  try {
    await navigator.clipboard.writeText(keyLine);
  } catch {
    /* clipboard may be unavailable */
  }
}

export function HelpCardActions({
  card,
  className,
  showHelper = true,
}: {
  card: HelpCard;
  className?: string;
  showHelper?: boolean;
}) {
  const { openChat } = useChat();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-3">
        <button type="button" className={HC_BTN_PRIMARY} onClick={() => void downloadHelpCardAsPng(card)}>
          Save to phone
        </button>
        <button type="button" className={HC_BTN_SECONDARY} onClick={() => void printHelpCard(card)}>
          Print
        </button>
        <button
          type="button"
          className={HC_BTN_SECONDARY}
          onClick={() =>
            openChat({
              prefill: `Tailor this help card for me: ${card.title}. My situation is: `,
            })
          }
        >
          Tailor with AI
        </button>
        <button
          type="button"
          className={cn(HC_BTN_GHOST, "text-[#ef5b2a] hover:text-[#d94d22]")}
          onClick={() => copyKeyLine(card.keyLine)}
        >
          Copy key line
        </button>
      </div>
      {showHelper ? (
        <p className="text-sm leading-relaxed text-[#5f6b76]">Downloads as a PNG image you can save to your phone or share.</p>
      ) : null}
    </div>
  );
}
