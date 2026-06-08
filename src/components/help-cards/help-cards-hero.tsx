"use client";

import { FadeIn } from "@/components/fade-in";
import { HELP_CARDS } from "@/lib/help-cards";
import { downloadHelpCardAsPng, printHelpCard } from "@/lib/help-card-png";
import { useChat } from "@/components/chat/provider";
import {
  HC_BODY,
  HC_BTN_PRIMARY,
  HC_BTN_SECONDARY,
  HC_EYEBROW,
  HC_HERO_TITLE,
  HC_MUTED,
} from "@/components/help-cards/help-cards-theme";

const FEATURED_SLUG = "job-interview-adjustments-card";

function StackedCardsGraphic() {
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-lg sm:h-[380px]" aria-hidden>
      <span className="absolute left-[6%] top-[10%] rounded-full border border-[#ead2bf] bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17212b] shadow-md">
        Save
      </span>
      <span className="absolute right-[8%] top-[18%] rounded-full border border-[#ead2bf] bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17212b] shadow-md">
        Print
      </span>
      <span className="absolute bottom-[16%] right-[12%] rounded-full border border-[#ead2bf] bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17212b] shadow-md">
        Tailor
      </span>

      <div className="absolute left-[4%] top-[22%] w-[56%] rotate-[-7deg] rounded-[1.25rem] border border-[#ead2bf] bg-[#fffaf4] p-4 shadow-[0_20px_50px_rgba(53,30,12,0.1)]">
        <div className="h-1.5 w-14 rounded-full bg-[#ead2bf]" />
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-4/5 rounded bg-[#17212b]/10" />
          <div className="h-2.5 w-3/5 rounded bg-[#17212b]/8" />
        </div>
      </div>

      <div className="absolute right-[2%] top-[32%] w-[52%] rotate-[5deg] rounded-[1.25rem] border border-[#f0c9b2] bg-white p-4 shadow-[0_24px_60px_rgba(53,30,12,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ef5b2a]">Access Stamp</p>
        <p className="mt-1 text-sm font-bold text-[#17212b]">Care review card</p>
      </div>

      <div className="absolute left-[18%] top-[8%] w-[68%] rotate-[-1.5deg] rounded-[1.5rem] border border-[#f0c9b2] bg-white p-5 shadow-[0_28px_70px_rgba(53,30,12,0.14)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ef5b2a]">Access Stamp</p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#5f6b76]">Work / Interview</p>
          </div>
          <span className="rounded-full border border-[#ead2bf] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#5f6b76]">
            Help Card
          </span>
        </div>
        <p className="mt-4 text-lg font-extrabold leading-tight text-[#17212b]">Job interview access card</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[#ead2bf]/80 bg-[#fffaf4] p-2">
            <p className="text-[9px] font-bold uppercase text-[#ef5b2a]">Check once</p>
            <p className="mt-1 text-[10px] leading-snug text-[#5f6b76]">Step-free route confirmed</p>
          </div>
          <div className="rounded-lg border border-[#ead2bf]/80 bg-[#fffaf4] p-2">
            <p className="text-[9px] font-bold uppercase text-[#ef5b2a]">Key line</p>
            <p className="mt-1 text-[10px] leading-snug text-[#5f6b76]">Reasonable adjustments…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HelpCardsHero() {
  const { openChat } = useChat();
  const featured = HELP_CARDS.find((c) => c.slug === FEATURED_SLUG) ?? HELP_CARDS[0];

  return (
    <FadeIn>
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className={HC_EYEBROW}>Downloadable support tools</p>
          <h1 className={`${HC_HERO_TITLE} mt-4`}>Help cards you can save, print, and carry</h1>
          <p className={`${HC_MUTED} mt-5 max-w-xl`}>
            Pre-built cards for real-life access situations — work, travel, care, education, rights, and emergencies.
            Save them to your phone, print them, or tailor them with AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className={HC_BTN_PRIMARY} onClick={() => void downloadHelpCardAsPng(featured)}>
              Save to phone
            </button>
            <button type="button" className={HC_BTN_SECONDARY} onClick={() => void printHelpCard(featured)}>
              Print and carry
            </button>
            <button
              type="button"
              className={HC_BTN_SECONDARY}
              onClick={() =>
                openChat({
                  prefill: `Tailor this help card for me: ${featured.title}. My situation is: `,
                })
              }
            >
              Tailor with AI
            </button>
          </div>

          <p className={`${HC_BODY} mt-5 flex items-center gap-2 text-sm font-semibold text-[#17212b]`}>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ef5b2a]/15 text-[#ef5b2a]" aria-hidden>
              ✓
            </span>
            Built for real conversations, not legal jargon.
          </p>
        </div>

        <div className="hidden sm:block">
          <StackedCardsGraphic />
        </div>
      </section>
    </FadeIn>
  );
}
