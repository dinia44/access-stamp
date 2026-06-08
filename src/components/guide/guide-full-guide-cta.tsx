import Link from "next/link";
import type { GuideResourcePack } from "@/lib/guide-resources";
import { cn } from "@/lib/utils";

type GuideFullGuideCtaProps = {
  resources: GuideResourcePack;
  onListen?: () => void;
  className?: string;
};

export function GuideFullGuideCta({ resources, onListen, className }: GuideFullGuideCtaProps) {
  const { fullGuideCta } = resources;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6",
        className,
      )}
      aria-labelledby="full-guide-cta-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFE2D3] text-lg"
              aria-hidden
            >
              📖
            </span>
            <h2 id="full-guide-cta-heading" className="text-lg font-bold text-heading">
              {fullGuideCta.heading}
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted">{fullGuideCta.text}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href={fullGuideCta.primaryHref}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#F04A16] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#D93E10] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
        >
          {fullGuideCta.primaryLabel}
        </Link>
        {onListen ? (
          <button
            type="button"
            onClick={onListen}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E8C4A8] bg-white px-5 text-sm font-semibold text-[#59682A] transition-colors hover:bg-[#EDF7ED] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
          >
            {fullGuideCta.secondaryLabel}
          </button>
        ) : (
          <Link
            href={`${fullGuideCta.primaryHref}#read-aloud`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#E8C4A8] bg-white px-5 text-sm font-semibold text-[#59682A] transition-colors hover:bg-[#EDF7ED] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
          >
            {fullGuideCta.secondaryLabel}
          </Link>
        )}
        <a
          href={fullGuideCta.templateHref}
          download
          className="inline-flex min-h-[44px] items-center justify-center px-2 text-sm font-semibold text-[#59682A] underline-offset-2 hover:text-[#F04A16] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
        >
          {fullGuideCta.tertiaryLabel} (DOCX)
        </a>
      </div>
    </section>
  );
}
