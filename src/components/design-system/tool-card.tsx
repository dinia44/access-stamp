import Link from "next/link";
import { HOME_FOCUS } from "@/components/home/home-theme";

function DocumentIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#5F7444]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 3.5h5.5L15.5 7v9.5H6V3.5Z" />
      <path d="M11.5 3.5V7H15.5" />
      <path d="M8 10.5h4.5M8 13.5h4.5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#5F7444]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="10" cy="10" r="6.5" />
      <circle cx="10" cy="10" r="3" />
      <path d="M10 3.5V5M10 15v1.5M3.5 10H5M15 10h1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#5F7444]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 6.5V10l2.5 1.5" />
    </svg>
  );
}

const CHIP_TONES = [
  "border-[#F6CFB8] bg-[#FDE9DD] text-[#9A3A0F]",
  "border-[#D9E4C8] bg-[#EFF3E7] text-[#3F5330]",
] as const;

export function ToolCard({
  title,
  creates,
  bestFor,
  time,
  cta,
  href,
  badge,
  index = 0,
}: {
  title: string;
  creates: string;
  bestFor: string;
  time: string;
  cta: string;
  href: string;
  badge?: string;
  index?: number;
}) {
  const chipTone = CHIP_TONES[index % CHIP_TONES.length];

  return (
    <article className="group flex h-full flex-col rounded-[18px] border border-[#EFE5DA] bg-white p-5 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.18)] transition duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#F6CFB8] motion-safe:hover:shadow-[0_20px_48px_-24px_rgba(239,91,37,0.22)] sm:p-6">
      {badge ? (
        <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${chipTone}`}>
          {badge}
        </span>
      ) : null}

      <h2 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-medium leading-snug tracking-[-0.02em] text-[#20242E]">
        {title}
      </h2>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-start gap-2.5">
          <DocumentIcon />
          <div className="min-w-0">
            <dt className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#76808F]">Creates</dt>
            <dd className="mt-0.5 text-[#4A5263]">{creates}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <TargetIcon />
          <div className="min-w-0">
            <dt className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#76808F]">Best for</dt>
            <dd className="mt-0.5 text-[#4A5263]">{bestFor}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <ClockIcon />
          <div className="min-w-0">
            <dt className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#76808F]">Time</dt>
            <dd className="mt-0.5 text-[#4A5263]">{time}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <Link
          href={href}
          className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#EF5B25] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(239,91,37,0.45)] transition hover:bg-[#D93E10] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EF5B25]/35 focus-visible:ring-offset-2 ${HOME_FOCUS}`}
        >
          {cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
