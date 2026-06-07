"use client";

import Link from "next/link";
import { useChat } from "@/components/chat/provider";
import { HOME_BTN_GHOST, HOME_BTN_PRIMARY } from "@/components/home/home-theme";

const GUIDE_CHIPS = ["Rights", "Travel", "Care", "Equipment"] as const;

function MapPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export function HomeHeroGuidanceCta() {
  const { openChat } = useChat();

  return (
    <div className="relative mt-10 sm:mt-12">
      {/* Decorative map pins */}
      <MapPin
        className="pointer-events-none absolute -left-1 top-6 h-5 w-5 text-[#2563EB]/20"
        aria-hidden="true"
      />
      <MapPin
        className="pointer-events-none absolute right-8 top-2 h-4 w-4 text-[#0891B2]/25"
        aria-hidden="true"
      />
      <MapPin
        className="pointer-events-none absolute bottom-4 right-16 hidden h-4 w-4 text-[#2563EB]/15 sm:block"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-3xl border border-[#93C5FD]/50 bg-white/95 p-6 shadow-xl shadow-[#2563EB]/10 backdrop-blur-xl sm:p-8">
        {/* Dotted route line */}
        <svg
          className="pointer-events-none absolute -right-4 top-1/2 h-24 w-48 -translate-y-1/2 text-[#2563EB]/15"
          viewBox="0 0 200 80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 60 C 50 20, 100 70, 192 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <circle cx="8" cy="60" r="4" fill="currentColor" opacity="0.5" />
          <circle cx="192" cy="12" r="4" fill="currentColor" opacity="0.5" />
        </svg>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-[#0B1D3A] sm:text-2xl">
              Need practical guidance beyond venue search?
            </h2>
            <p className="mt-2 text-base leading-7 text-[#1E3A5F]">
              Get clear next steps on rights, travel, care, equipment, and daily access support.
            </p>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Guide topics covered">
              {GUIDE_CHIPS.map((chip) => (
                <li key={chip}>
                  <span className="inline-flex min-h-[32px] items-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 text-xs font-semibold text-[#1E3A5F]">
                    {chip}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/advice" className={`${HOME_BTN_PRIMARY} w-full sm:w-auto lg:min-w-[220px]`}>
              Explore disability guides
            </Link>
            <button
              type="button"
              onClick={() =>
                openChat({
                  prefill: "I need practical guidance on disability rights, travel, care, or equipment in the UK.",
                })
              }
              className={`${HOME_BTN_GHOST} w-full sm:w-auto lg:min-w-[220px]`}
            >
              Ask the AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
