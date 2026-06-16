"use client";

import Link from "next/link";
import { CopyableScript } from "@/components/design-system/copyable-script";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { CoreHelpCard } from "@/data/core-help-cards";
import { cn } from "@/lib/utils";

export function HelpCardItem({ card, className }: { card: CoreHelpCard; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]",
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-[#20242E]">{card.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#4A5263]">
        <span className="font-medium text-[#20242E]">Situation: </span>
        {card.situation}
      </p>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[#20242E]">Checklist</h3>
        <ul className="mt-2 space-y-1.5">
          {card.checklist.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#4A5263]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8430F]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex-1">
        <h3 className="text-sm font-semibold text-[#20242E]">Script</h3>
        <CopyableScript script={card.script} className="mt-2" />
      </div>

      {card.guideHref ? (
        <div className="mt-4">
          <ButtonLink href={card.guideHref} variant="ghost" className="min-h-11 px-0">
            Open related guide
          </ButtonLink>
        </div>
      ) : null}
    </article>
  );
}

export function CoreHelpCardsGrid({ cards }: { cards: CoreHelpCard[] }) {
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {cards.map((card) => (
        <li key={card.id}>
          <HelpCardItem card={card} />
        </li>
      ))}
    </ul>
  );
}
