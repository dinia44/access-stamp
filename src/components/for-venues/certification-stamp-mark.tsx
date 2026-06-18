import type { ReviewTier } from "@/lib/for-venues-config";

const STAMP_STYLES: Record<
  ReviewTier["stampTone"],
  { ring: string; fill: string; text: string; label: string }
> = {
  snapshot: {
    ring: "border-[#B87333]",
    fill: "bg-gradient-to-br from-[#E8C9A0] via-[#C98A4A] to-[#8B5A2B]",
    text: "text-[#4A2F14]",
    label: "SNAPSHOT",
  },
  measured: {
    ring: "border-[#9CA3AF]",
    fill: "bg-gradient-to-br from-[#F3F4F6] via-[#D1D5DB] to-[#9CA3AF]",
    text: "text-[#374151]",
    label: "MEASURED",
  },
  full: {
    ring: "border-[#C9A227]",
    fill: "bg-gradient-to-br from-[#FDE68A] via-[#EAB308] to-[#A16207]",
    text: "text-[#713F12]",
    label: "FULL",
  },
};

/** Venue review tier stamp mark — distinct from the olive access-score ring. */
export function CertificationStampMark({ tone }: { tone: ReviewTier["stampTone"] }) {
  const style = STAMP_STYLES[tone];
  return (
    <div
      className={`relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-dashed shadow-inner ${style.ring} ${style.fill}`}
      aria-hidden
    >
      <div className="text-center">
        <p className={`text-[9px] font-bold tracking-[0.2em] ${style.text}`}>ACCESS</p>
        <p className={`text-[11px] font-bold tracking-[0.14em] ${style.text}`}>{style.label}</p>
        <p className={`text-[8px] font-semibold tracking-[0.12em] ${style.text}`}>STAMP</p>
      </div>
    </div>
  );
}
