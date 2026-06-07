import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { getVenuePhoto } from "@/lib/venue-access-score";
import { getVenueFeatureChips, themeForVenueIndex } from "@/lib/venue-card-theme";

type Props = {
  venue: Venue;
  displayName: string;
  city: string;
  scoreOverride: number;
  distance: string;
  index?: number;
};

function FeatureIcon({ icon, color }: { icon: ReturnType<typeof getVenueFeatureChips>[number]["icon"]; color: string }) {
  const cls = "h-3.5 w-3.5 shrink-0";
  if (icon === "step-free") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={color} strokeWidth="2" aria-hidden>
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M10 18h5M12 6v6m-2 0h4" />
      </svg>
    );
  }
  if (icon === "toilet") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={color} strokeWidth="2" aria-hidden>
        <path d="M8 3v3M16 3v3M5 8h14v12H5z" />
      </svg>
    );
  }
  if (icon === "parking") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={color} strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8h3a2 2 0 0 1 0 4h-3V8Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={color} strokeWidth="2" aria-hidden>
      <path d="M4 10v4M20 10v4M7 8v8M12 6v12M17 8v8" />
    </svg>
  );
}

export function HomeFeaturedVenueCard({ venue, displayName, city, scoreOverride, distance, index = 0 }: Props) {
  const photo = getVenuePhoto(venue);
  const theme = themeForVenueIndex(index);
  const features = getVenueFeatureChips(venue).slice(0, 4);
  const href = `/venue/${venue.slug}`;

  return (
    <li className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-lg shadow-[#2563EB]/[0.06] transition-all duration-200 hover:-translate-y-1 hover:border-[#93C5FD] hover:shadow-xl hover:shadow-[#2563EB]/12 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 inline-flex min-h-[28px] items-center rounded-full bg-[#059669] px-2.5 text-xs font-bold text-white shadow-sm">
            {scoreOverride}%
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold text-[#0B1D3A] group-hover:text-[#2563EB]">{displayName}</h3>
          <p className="mt-0.5 text-sm text-[#3B6B9A]">{city}</p>

          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Access features">
            {features.map((feature) => (
              <li
                key={feature.label}
                className="inline-flex items-center gap-1 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-1 text-[10px] font-semibold text-[#1E3A5F]"
                title={feature.label}
              >
                <FeatureIcon icon={feature.icon} color={theme.accent} />
                <span className="sr-only">{feature.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-3 text-xs font-medium text-[#3B6B9A]">{distance}</p>
        </div>
      </Link>
    </li>
  );
}
