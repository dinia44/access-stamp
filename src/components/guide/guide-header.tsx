import Link from "next/link";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

type GuideHeaderProps = {
  title: string;
  subtitle: string;
  updated: string;
  readTimeMinutes?: number;
  inProgress?: boolean;
  bestOption?: boolean;
  className?: string;
};

export function GuideHeader({
  title,
  subtitle,
  updated,
  readTimeMinutes,
  inProgress = true,
  bestOption = true,
  className,
}: GuideHeaderProps) {
  return (
    <header className={cn("space-y-5", className)}>
      <Link
        href="/advice"
        className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#59682A] transition-colors hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
      >
        ← Back to guides
      </Link>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-heading sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="text-base leading-7 text-muted sm:text-lg">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span>Last updated {updated}</span>
            {readTimeMinutes ? (
              <>
                <span aria-hidden className="text-[#E8C4A8]">
                  •
                </span>
                <span>{readTimeMinutes} min read</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:shrink-0 lg:pt-2">
          {inProgress ? (
            <span className="inline-flex min-h-[32px] items-center gap-2 rounded-full border border-[#F1D8C7] bg-white px-3 py-1.5 text-xs font-semibold text-heading shadow-[var(--shadow-soft)]">
              <span className="h-2 w-2 rounded-full bg-[#F04A16]" aria-hidden />
              In progress
            </span>
          ) : null}
          {bestOption ? (
            <Badge tone="verified" className="min-h-[32px] px-3 py-1.5">
              <span aria-hidden>✦</span> Best option
            </Badge>
          ) : null}
        </div>
      </div>
    </header>
  );
}
