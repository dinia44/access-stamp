"use client";

import { FadeIn } from "@/components/fade-in";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import type { HelpCard } from "@/lib/help-cards";
import {
  HC_EYEBROW,
  HC_HERO_TITLE,
  HC_MUTED,
} from "@/components/help-cards/help-cards-theme";

export function HelpCardsHero({
  featured,
  onBrowse,
}: {
  featured: HelpCard;
  onBrowse?: () => void;
}) {
  return (
    <FadeIn>
      <section className="grid items-center gap-10 py-8 md:py-12 lg:grid-cols-[1fr_0.95fr]">
        <div className="max-w-2xl">
          <p className={HC_EYEBROW}>Pocket-sized support tools</p>
          <h1 className={`${HC_HERO_TITLE} mt-4`}>Help Cards</h1>
          <p className={`${HC_MUTED} mt-5 max-w-xl text-lg`}>
            Pocket-sized scripts for real-world access, rights and support situations.
          </p>
          <p className={`${HC_MUTED} mt-4 max-w-xl`}>
            Open a card before an appointment, interview, venue visit, police stop or difficult
            conversation. Show it, read it out, print it, save it to your phone, or tailor it with AI.
          </p>

          {onBrowse ? (
            <div className="mt-8">
              <button
                type="button"
                onClick={onBrowse}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ef5b2a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d94f24]"
              >
                Browse all cards
              </button>
            </div>
          ) : null}

          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#17212b]">
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ef5b2a]/15 text-[#ef5b2a]"
              aria-hidden
            >
              ✓
            </span>
            Source-backed cards for real conversations — not invented legal advice.
          </p>
        </div>

        <div className="hidden sm:block lg:pl-4">
          <div className="help-card-print-area">
            <HelpCardPreview card={featured} size="large" />
          </div>
          <div className="mt-6">
            <HelpCardActions card={featured} showHelper={false} />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
