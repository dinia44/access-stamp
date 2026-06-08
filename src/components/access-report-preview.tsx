import Image from "next/image";
import Link from "next/link";
import { AS_BTN_PRIMARY, AS_CARD } from "@/lib/design-system";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { heroCollageImageUrl } from "@/lib/cloudinary-url";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

const ACCESS_FEATURES = [
  { label: "Step-free entrance", value: "Yes" },
  { label: "Accessible toilet", value: "Yes" },
  { label: "Accessible parking", value: "Yes" },
  { label: "Door width", value: "920mm" },
  { label: "Hearing support", value: "Induction loop" },
] as const;

function ScoreRing({ score = 92 }: { score?: number }) {
  const dash = (score / 100) * 213.6;
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center sm:h-[88px] sm:w-[88px]">
        <svg viewBox="0 0 84 84" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="42" cy="42" r="34" fill="none" stroke="#E8F0FE" strokeWidth="7" />
          <circle
            cx="42"
            cy="42"
            r="34"
            fill="none"
            stroke="#168A5B"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} 213.6`}
          />
        </svg>
        <span className="relative text-xl font-bold tracking-tight text-[#102033] sm:text-2xl">{score}%</span>
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#168A5B]">Access score</span>
    </div>
  );
}

type AccessReportPreviewProps = {
  variant?: "compact" | "featured";
  showCollage?: boolean;
  showCta?: boolean;
  className?: string;
};

export function AccessReportPreview({
  variant = "compact",
  showCollage = true,
  showCta = true,
  className = "",
}: AccessReportPreviewProps) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={`grid items-start gap-6 ${showCollage ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""} ${className}`}
    >
      <article className={`${AS_CARD} ${isFeatured ? "p-6 sm:p-8" : ""}`}>
        <div className="flex items-start gap-4 sm:gap-5">
          <ScoreRing />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#E8F5EF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#168A5B]">
                Verified report
              </span>
              <span className="rounded-full border border-[rgba(16,32,51,0.12)] px-2.5 py-0.5 text-[10px] font-semibold text-[#617080]">
                Community checked
              </span>
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]">Access report</p>
            <h3 className={`mt-1 font-bold tracking-[-0.02em] text-[#102033] ${isFeatured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
              The Riverside Café
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#617080]">12 River Street, Manchester M4 5AB</p>
          </div>
        </div>

        <ul className="mt-5 divide-y divide-[rgba(16,32,51,0.08)] border-y border-[rgba(16,32,51,0.08)] sm:mt-6">
          {ACCESS_FEATURES.map(({ label, value }) => (
            <li key={label} className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
              <span className="flex min-w-0 items-center gap-2.5 text-sm text-[#102033]">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F5EF] text-[#168A5B]">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {label}
              </span>
              <span className="shrink-0 text-sm font-semibold text-[#102033]">{value}</span>
            </li>
          ))}
        </ul>

        {showCta ? (
          <Link href="/venue-finder" className={`${AS_BTN_PRIMARY} mt-5 w-full sm:mt-6`}>
            View full access report
            <span aria-hidden>→</span>
          </Link>
        ) : null}
      </article>

      {showCollage ? (
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px]" aria-hidden>
          <div className="absolute left-0 top-0 z-10 h-[52%] w-full overflow-hidden rounded-2xl border-4 border-white bg-[#F8F5EE] shadow-lg">
            <Image src={heroCollageImageUrl(CLOUDINARY_MEDIA.homepageVenueExterior)} alt="" fill sizes="260px" className="object-cover" />
          </div>
          <div className="absolute bottom-[8%] right-0 z-20 h-[44%] w-[72%] overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <Image src={heroCollageImageUrl(CLOUDINARY_MEDIA.homepageVenueInterior)} alt="" fill sizes="200px" className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 z-30 h-[30%] w-[54%] overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <Image src={heroCollageImageUrl(CLOUDINARY_MEDIA.homepageMapPreview)} alt="" fill sizes="160px" className="object-cover" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
