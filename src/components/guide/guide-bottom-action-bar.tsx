"use client";

import { cn } from "@/lib/utils";

type GuideBottomActionBarProps = {
  completedCount: number;
  totalSteps: number;
  primaryLabel: string;
  onPrimary?: () => void;
  className?: string;
};

export function GuideBottomActionBar({
  completedCount,
  totalSteps,
  primaryLabel,
  onPrimary,
  className,
}: GuideBottomActionBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-[#F1D8C7] bg-white px-4 py-4 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDF7ED] text-[#59682A]" aria-hidden>
          ◉
        </span>
        <div>
          <p className="text-sm font-bold text-heading">You&apos;re making progress</p>
          <p className="mt-0.5 text-sm text-muted">
            You&apos;ve completed {completedCount} of {totalSteps} steps in this guide.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") void navigator.clipboard?.writeText(window.location.href);
          }}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E8C4A8] bg-white px-4 text-sm font-semibold text-heading transition-colors hover:bg-[#FFF3E8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
        >
          <span aria-hidden>🔖</span> Bookmark this page
        </button>
        <button
          type="button"
          onClick={onPrimary}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#59682A] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#45521F] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
        >
          {primaryLabel} →
        </button>
      </div>
    </div>
  );
}
