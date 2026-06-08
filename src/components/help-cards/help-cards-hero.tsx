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
    <div className="relative mx-auto h-[360px] w-full max-w-md px-4 sm:h-[400px] sm:max-w-lg" aria-hidden>
      <span className="absolute left-[4%] top-[8%] rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#17212b] shadow-[0_8px_24px_rgba(53,30,12,0.08)]">
        Save
      </span>
      <span className="absolute right-[6%] top-[14%] rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#17212b] shadow-[0_8px_24px_rgba(53,30,12,0.08)]">
        Print
      </span>
      <span className="absolute bottom-[12%] right-[8%] rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#17212b] shadow-[0_8px_24px_rgba(53,30,12,0.08)]">
        Tailor
      </span>

      <div className="absolute left-[2%] top-[24%] w-[54%] rotate-[-7deg] rounded-[1.35rem] border border-[#ead2bf]/60 bg-[#fffaf4] p-5 shadow-[0_24px_60px_rgba(53,30,12,0.08)]">
        <div className="h-1.5 w-14 rounded-full bg-[#ead2bf]" />
        <div className="mt-5 space-y-2.5">
          <div className="h-2.5 w-4/5 rounded bg-[#17212b]/10" />
          <div className="h-2.5 w-3/5 rounded bg-[#17212b]/8" />
        </div>
      </div>

      <div className="absolute right-0 top-[34%] w-[50%] rotate-[5deg] rounded-[1.35rem] border border-[#efc8b2]/80 bg-white p-5 shadow-[0_28px_70px_rgba(53,30,12,0.10)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ef5b2a]">Access Stamp</p>
        <p className="mt-1 text-sm font-bold text-[#17212b]">Care review card</p>
      </div>

      <div className="absolute left-[14%] top-[4%] w-[72%] rotate-[-1.5deg] rounded-[1.75rem] border border-[#efc8b2] bg-white p-5 shadow-[0_32px_80px_rgba(53,30,12,0.12)] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ef5b2a]">Access Stamp</p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#5f6b76]">Work / Interview</p>
          </div>
          <span className="rounded-full bg-[#fffaf4] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#5f6b76]">
            Help Card
          </span>
        </div>
        <p className="mt-4 text-lg font-extrabold leading-tight text-[#17212b]">Job interview access card</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl bg-[#fffaf7] p-3">
            <p className="text-[9px] font-bold uppercase text-[#ef5b2a]">Check once</p>
            <p className="mt-1.5 text-[10px] leading-5 text-[#5f6b76]">Step-free route confirmed</p>
          </div>
          <div className="rounded-2xl bg-[#fffaf7] p-3">
            <p className="text-[9px] font-bold uppercase text-[#ef5b2a]">Key line</p>
            <p className="mt-1.5 text-[10px] leading-5 text-[#5f6b76]">Reasonable adjustments…</p>
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
      <section className="grid items-center gap-10 py-8 md:py-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-2xl">
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

          <p className={`${HC_BODY} mt-6 flex items-center gap-2 text-sm font-semibold text-[#17212b]`}>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ef5b2a]/15 text-[#ef5b2a]" aria-hidden>
              ✓
            </span>
            Built for real conversations, not legal jargon.
          </p>
        </div>

        <div className="hidden sm:block lg:pl-4">
          <StackedCardsGraphic />
        </div>
      </section>
    </FadeIn>
  );
}
