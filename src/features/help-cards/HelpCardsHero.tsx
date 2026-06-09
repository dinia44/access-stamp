"use client";

import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import type { HelpCard } from "@/lib/help-cards";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { helpCardsHeroImageUrl } from "@/lib/cloudinary-url";
import {
  HC_BTN_PRIMARY,
  HC_EYEBROW,
  HC_HERO_TITLE,
  HC_MUTED,
} from "@/components/help-cards/help-cards-theme";

const HERO_PHOTO_SRC = helpCardsHeroImageUrl(CLOUDINARY_MEDIA.helpCardsHeroInterview);

const MINI_CARDS = [
  { label: "Interview Room", className: "hc-hero-float-a left-[2%] top-[6%] -rotate-6", delay: "" },
  {
    label: "Adjustments I Can Ask For",
    className: "hc-hero-float-b right-[0%] top-[38%] rotate-[5deg]",
    delay: "",
  },
  {
    label: "Access Evidence",
    className: "hc-hero-float-c bottom-[8%] left-[8%] -rotate-3",
    delay: "",
  },
] as const;

function HeroPhotoVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.75rem] sm:rounded-[3.25rem]"
        style={{
          clipPath: "ellipse(88% 92% at 58% 48%)",
        }}
      >
        <Image
          src={HERO_PHOTO_SRC}
          alt="A disabled person in a wheelchair having a professional interview-style conversation in a modern office"
          fill
          priority
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#fbf3ea]/15 via-[#fbf3ea]/45 to-[#fbf3ea]/92"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fbf3ea] via-[#fbf3ea]/35 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#fbf3ea]/60 via-transparent to-[#efc8b2]/20"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        {MINI_CARDS.map((card) => (
          <div
            key={card.label}
            className={`absolute max-w-[9.5rem] rounded-2xl border border-[#efc8b2]/90 bg-white/95 px-3 py-2.5 shadow-[0_12px_32px_rgba(53,30,12,0.10),0_0_0_1px_rgba(239,91,42,0.06)] ${card.className}`}
          >
            <p className="text-[10px] font-bold leading-tight text-[#17212b]">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HelpCardsHero({
  featured,
  onBrowse,
}: {
  featured: HelpCard;
  onBrowse?: () => void;
}) {
  return (
    <FadeIn>
      <section className="grid items-center gap-8 py-8 md:gap-10 md:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-6 xl:gap-10">
        <div className="order-1 max-w-2xl lg:max-w-none">
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
              <button type="button" onClick={onBrowse} className={HC_BTN_PRIMARY}>
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

        <div className="order-2 lg:px-2">
          <HeroPhotoVisual />
        </div>

        <div className="order-3 lg:pl-2">
          <div className="help-card-print-area">
            <HelpCardPreview card={featured} size="large" />
          </div>
          <div className="mt-5 sm:mt-6">
            <HelpCardActions card={featured} showHelper={false} />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
