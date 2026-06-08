import { cn } from "@/lib/utils";

type GuideDownloadCardProps = {
  title: string;
  description?: string;
  format: string;
  href?: string;
  buttonLabel?: string;
  className?: string;
};

export function GuideDownloadCard({
  title,
  description,
  format,
  href,
  buttonLabel = "Download DOCX",
  className,
}: GuideDownloadCardProps) {
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-heading">{title}</p>
        {description ? <p className="mt-1 text-xs leading-5 text-muted">{description}</p> : null}
        <span className="mt-2 inline-flex rounded-md bg-[#FFF3E8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
          {format}
        </span>
      </div>
      <span className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-[#59682A] px-3 text-xs font-semibold text-white">
        {buttonLabel}
      </span>
    </>
  );

  const baseClass = cn(
    "flex min-h-[88px] items-center gap-3 rounded-xl border border-[#F1D8C7] bg-[#FFF8F1]/50 px-4 py-3 transition-colors hover:border-[#E8C4A8] hover:bg-white",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        download
        className={cn(
          baseClass,
          "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2",
        )}
        aria-label={`${buttonLabel}: ${title} (${format})`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        baseClass,
        "w-full text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2",
      )}
      aria-label={`${buttonLabel}: ${title} (${format})`}
    >
      {inner}
    </button>
  );
}
