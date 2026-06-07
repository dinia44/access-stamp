"use client";

import Link from "next/link";
import { useChat } from "@/components/chat/provider";
import { HOME_BTN_GHOST, HOME_BTN_PRIMARY, HOME_FOCUS } from "@/components/home/home-theme";

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HomeHeroGuidanceCta() {
  const { openChat } = useChat();

  return (
    <section className="relative z-20 -mt-4 px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="guidance-cta-heading">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0891B2] p-6 shadow-xl shadow-[#2563EB]/20 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden
            style={{
              background:
                "radial-gradient(600px 300px at 0% 50%, rgba(255,255,255,0.25), transparent 60%), radial-gradient(400px 200px at 100% 30%, rgba(255,255,255,0.15), transparent 55%)",
            }}
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex shrink-0 items-start gap-5">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/95 text-[#2563EB] shadow-lg">
                <BookIcon className="h-6 w-6" />
              </span>
              <div className="max-w-2xl pt-1">
                <h2 id="guidance-cta-heading" className="text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                  Need practical guidance beyond venue search?
                </h2>
                <p className="mt-2 text-base leading-7 text-blue-100">
                  Explore trusted disability advice and get clear, practical answers from our AI assistant — anytime.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:ml-auto">
              <Link
                href="/advice"
                className={`${HOME_BTN_PRIMARY} gap-2 bg-white text-[#2563EB] shadow-white/20 hover:bg-blue-50 hover:text-[#1D4ED8] hover:shadow-white/30`}
              >
                Explore disability guides
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() =>
                  openChat({
                    prefill: "I need practical guidance on disability rights, travel, care, or equipment in the UK.",
                  })
                }
                className={`${HOME_BTN_GHOST} gap-2 border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 hover:text-white ${HOME_FOCUS}`}
              >
                Ask the AI
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
