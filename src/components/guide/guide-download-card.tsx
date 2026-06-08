import { cn } from "@/lib/utils";

type GuideDownloadCardProps = {
  title: string;
  format: string;
  href?: string;
  className?: string;
};

export function GuideDownloadCard({ title, format, href, className }: GuideDownloadCardProps) {
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-heading">{title}</p>
        <span className="mt-1 inline-flex rounded-md bg-[#FFF3E8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
          {format}
        </span>
      </div>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F1D8C7] bg-white text-[#59682A]"
        aria-hidden
      >
        ↓
      </span>
    </>
  );

  const baseClass = cn(
    "flex min-h-[72px] items-center gap-3 rounded-xl border border-[#F1D8C7] bg-[#FFF8F1]/50 px-4 py-3 transition-colors hover:border-[#E8C4A8] hover:bg-white",
    className,
  );

  if (href) {
    return (
      <a href={href} download className={cn(baseClass, "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2")}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(baseClass, "w-full text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2")}
      aria-label={`Download ${title}`}
    >
      {inner}
    </button>
  );
}
