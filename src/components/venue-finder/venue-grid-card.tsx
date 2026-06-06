"use client";

import Link from "next/link";
import { useState } from "react";
import type { Venue } from "@/lib/mock-data";
import { computeAccessScore, getVenueDistanceLabel, getVenuePhoto } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import {
  formatVenueLocation,
  getVenueBadge,
  getVenueFeatureChips,
  themeForVenueIndex,
  type VenueCardTheme,
  type VenueFeatureChip,
} from "@/lib/venue-card-theme";

type Props = {
  venue: Venue;
  index?: number;
  theme?: VenueCardTheme;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

function FeatureIcon({ icon, color }: { icon: VenueFeatureChip["icon"]; color: string }) {
  const cls = "h-4 w-4 shrink-0";
  const stroke = color;
  if (icon === "step-free") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M10 18h5M12 6v6m-2 0h4" />
      </svg>
    );
  }
  if (icon === "toilet") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <path d="M8 3v3M16 3v3M5 8h14v12H5z" />
      </svg>
    );
  }
  if (icon === "parking") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8h3a2 2 0 0 1 0 4h-3V8Z" />
      </svg>
    );
  }
  if (icon === "lift") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M12 7v10M9 10l3-3 3 3M9 14l3 3 3-3" />
      </svg>
    );
  }
  if (icon === "hearing") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <path d="M6 10a6 6 0 0 1 12 0v2a3 3 0 0 1-3 3h-1" />
        <path d="M9 18h6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
      <path d="M4 10v4M20 10v4M7 8v8M12 6v12M17 8v8" />
    </svg>
  );
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-[52px] w-[52px] rounded-full bg-black/45 p-1 backdrop-blur-sm">
      <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] font-bold leading-none text-white">
        {score}%
      </span>
    </div>
  );
}

export function VenueGridCard({
  venue,
  index = 0,
  theme = themeForVenueIndex(index),
  userCenter,
  selected,
  onSelect,
}: Props) {
  const [saved, setSaved] = useState(false);
  const photo = getVenuePhoto(venue);
  const score = computeAccessScore(venue);
  const badge = getVenueBadge(venue, index);
  const features = getVenueFeatureChips(venue);
  const distance = getVenueDistanceLabel(venue, userCenter);
  const reportHref = `/venue/${venue.slug}`;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        selected ? "ring-2" : "border-slate-200"
      }`}
      style={selected ? { borderColor: theme.accent, boxShadow: `0 0 0 2px ${theme.accentRing}` } : undefined}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />

        <div
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-sm"
          style={{ backgroundColor: theme.accent }}
        >
          <span aria-hidden="true">{badge.emoji}</span>
          {badge.label}
        </div>

        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          aria-label={saved ? "Remove from saved venues" : "Save venue"}
          aria-pressed={saved}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10Z" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-3">
          <ScoreRing score={score} color={theme.accent} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-snug tracking-[-0.02em] text-slate-950">{venue.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke={theme.accent} strokeWidth="2" aria-hidden>
            <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <span>
            {formatVenueLocation(venue.location)}
            {userCenter ? ` · ${distance}` : ""}
          </span>
        </p>

        {features.length ? (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {features.map((feature) => (
              <li key={feature.label} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: theme.accent }}>
                <FeatureIcon icon={feature.icon} color={theme.accent} />
                {feature.label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-xs leading-5 text-slate-500">{venue.summary}</p>
        )}

        <div className="mt-auto flex gap-2 pt-5">
          <Link
            href={reportHref}
            aria-label={`View details for ${venue.name}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            View details
          </Link>
          <Link
            href={reportHref}
            aria-label={`View access info for ${venue.name}`}
            className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-3 text-sm font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${theme.buttonSolid}`}
          >
            View access info
          </Link>
        </div>

        {onSelect ? (
          <button
            type="button"
            onClick={onSelect}
            className="mt-2 min-h-11 text-sm font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
            style={{ color: theme.accent }}
          >
            {selected ? "Selected on map" : "Show on map"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
