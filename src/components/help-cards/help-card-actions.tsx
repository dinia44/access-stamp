"use client";

import type { HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng, printHelpCard } from "@/lib/help-card-png";
import { useChat } from "@/components/chat/provider";
import { cn } from "@/lib/utils";
import { SITE_BTN_PRIMARY, SITE_BTN_SECONDARY, SITE_FOCUS } from "@/lib/site-design";

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
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={SITE_BTN_PRIMARY}
          onClick={() => void downloadHelpCardAsPng(card)}
        >
          Save to phone
        </button>
        <button type="button" className={SITE_BTN_SECONDARY} onClick={() => void printHelpCard(card)}>
          Print
        </button>
        <button
          type="button"
          className={SITE_BTN_SECONDARY}
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
          className={cn(
            "inline-flex min-h-[44px] items-center rounded-2xl px-3 text-sm font-semibold text-[#F04A16] underline-offset-4 hover:underline",
            SITE_FOCUS,
          )}
          onClick={() => copyKeyLine(card.keyLine)}
        >
          Copy key line
        </button>
      </div>
      {showHelper ? (
        <p className="text-sm text-[#5E6A66]">Downloads as a PNG image you can save to your phone or share.</p>
      ) : null}
    </div>
  );
}
