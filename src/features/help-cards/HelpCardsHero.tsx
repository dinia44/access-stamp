"use client";

import { HelpCardIcon } from "@/features/help-cards/help-card-icons";
import {
  HC_BTN_PRIMARY,
  HC_BTN_SECONDARY,
  HC_EYEBROW,
  HC_HERO_TITLE,
  HC_MUTED,
} from "@/components/help-cards/help-cards-theme";

const FLOATING_TAGS = ["Save", "Print", "Tailor with AI", "Copy line"] as const;

const STACK_CARDS = [
  {
    title: "Access evidence",
    lines: ["Medical letters", "Adjustment history"],
    rotate: "-rotate-[6deg]",
    offset: "left-[4%] top-[8%] z-10 scale-[0.92] opacity-80",
    active: false,
  },
  {
    title: "Helpful ask",
    lines: ["Is the room step-free?", "Can I have extra time?"],
    rotate: "rotate-[4deg]",
    offset: "right-[2%] top-[18%] z-20 scale-[0.96] opacity-90",
    active: false,
  },
  {
    title: "Job interview adjustment card",
    lines: [
      "I'm asking for reasonable adjustments so I can take part fairly.",
      "Work & interviews",
    ],
    rotate: "-rotate-[2deg]",
    offset: "left-[8%] top-[32%] z-30",
    active: true,
  },
] as const;

function CardStackVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FFE8D6]/40 via-transparent to-[#FFF7EF]/60" />

      {STACK_CARDS.map((card) => (
        <div
          key={card.title}
          className={`absolute w-[78%] rounded-3xl border border-[#EAD7C5] bg-[rgba(255,255,255,0.92)] p-5 shadow-[0_24px_64px_rgba(19,32,51,0.12)] ${card.rotate} ${card.offset}`}
        >
          {card.active ? (
            <>
              <div className="flex items-start justify-between gap-3 border-b border-[#EAD7C5]/80 pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F97316]">
                    Access Stamp
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#5B6472]">Work & interviews</p>
                </div>
                <span className="rounded-full border border-[#EAD7C5] bg-[#FFF7EF] px-2.5 py-1 text-[10px] font-bold uppercase text-[#5B6472]">
                  Help card
                </span>
              </div>
              <p className="mt-3 text-sm font-extrabold leading-snug text-[#132033]">{card.title}</p>
              <p className="mt-2 text-xs leading-5 text-[#5B6472]">{card.lines[0]}</p>
              <div className="mt-4 rounded-2xl border border-[#F97316]/20 bg-[#FFF7EF] px-3 py-2.5">
                <p className="text-[11px] font-semibold leading-5 text-[#132033]">
                  &ldquo;I&apos;m asking for reasonable adjustments so I can take part in the interview
                  fairly.&rdquo;
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-wide text-[#F97316]">{card.title}</p>
              {card.lines.map((line) => (
                <p key={line} className="mt-2 text-xs leading-5 text-[#5B6472]">
                  {line}
                </p>
              ))}
            </>
          )}
        </div>
      ))}

      <ul className="absolute bottom-[6%] left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
        {FLOATING_TAGS.map((tag) => (
          <li key={tag}>
            <span className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-[#EAD7C5] bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#132033] shadow-[0_8px_24px_rgba(19,32,51,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" aria-hidden />
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HelpCardsHero({
  onBrowse,
  onBuildPack,
}: {
  onBrowse?: () => void;
  onBuildPack?: () => void;
}) {
  return (
    <section
      aria-labelledby="help-cards-hero-title"
      className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-24 xl:py-[120px]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="max-w-xl">
          <p className={HC_EYEBROW}>Pocket-sized support tools</p>
          <h1 id="help-cards-hero-title" className={`${HC_HERO_TITLE} mt-4 text-[#132033]`}>
            Know what to say when access fails.
          </h1>
          <p className={`${HC_MUTED} mt-5 max-w-lg text-lg leading-8 text-[#5B6472]`}>
            Save practical disability access cards for interviews, appointments, travel, care reviews
            and difficult conversations.
          </p>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#5B6472]">
            Pick a situation. Save the card. Show it, read it, print it, or tailor it with AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {onBuildPack ? (
              <button type="button" onClick={onBuildPack} className={HC_BTN_PRIMARY}>
                Build my card pack
              </button>
            ) : (
              <a href="#card-packs" className={HC_BTN_PRIMARY}>
                Build my card pack
              </a>
            )}
            {onBrowse ? (
              <button type="button" onClick={onBrowse} className={HC_BTN_SECONDARY}>
                Browse all cards
              </button>
            ) : (
              <a href="#browse-cards" className={HC_BTN_SECONDARY}>
                Browse all cards
              </a>
            )}
          </div>

          <p className="mt-6 inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#EAD7C5] bg-[rgba(255,255,255,0.78)] px-4 py-2 text-sm font-semibold text-[#132033]">
            <span
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F97316]/12 text-[#F97316]"
              aria-hidden
            >
              <HelpCardIcon name="shield-check" className="h-3.5 w-3.5" />
            </span>
            Source-backed prompts — not invented legal advice.
          </p>
        </div>

        <div className="relative lg:pl-4">
          <CardStackVisual />
        </div>
      </div>
    </section>
  );
}
