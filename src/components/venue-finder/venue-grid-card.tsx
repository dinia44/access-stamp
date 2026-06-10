"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Venue } from "@/lib/mock-data";
import { readSavedVenueSlugs, subscribeSavedVenues, toggleSavedVenueSlug } from "@/lib/saved-venues";
import { getAccessConfidence } from "@/lib/venue-access-snapshot";
import { getVenueDistanceLabel, getVenuePhoto } from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { formatVenueLocation } from "@/lib/venue-card-theme";
import { getAccessScorePresentation, VF_BTN_SECONDARY } from "@/lib/venue-finder-cro";
import { SITE_FOCUS } from "@/lib/site-design";

const ACCESS_FEATURE_ICONS = [
  { key: "Step-free entrance", label: "Step-free entrance listed", symbol: "↗" },
  { key: "Accessible toilet", label: "Toilet listed", symbol: "T" },
  { key: "Nearby Blue Badge parking", label: "Parking listed", symbol: "P" },
  { key: "Quiet environment", label: "Quiet space listed", symbol: "Q" },
] as const;

type Props = {
  venue: Venue;
  userCenter?: VenueCoordinates | null;
  selected?: boolean;
  onSelect?: () => void;
};

export function VenueGridCard({ venue, userCenter, selected, onSelect }: Props) {
  const photo = getVenuePhoto(venue);
  const confidence = getAccessConfidence(venue);
  const scoreStyle = getAccessScorePresentation(confidence.score);
  const distance = getVenueDistanceLabel(venue, userCenter);
  const reportHref = `/venue/${venue.slug}`;

  const saved = useSyncExternalStore(
    subscribeSavedVenues,
    () => readSavedVenueSlugs().includes(venue.slug),
    () => false,
  );

  const accessIcons = [
    ...ACCESS_FEATURE_ICONS.filter(
      (item) =>
        venue.features[item.key] === "yes" ||
        venue.tags.some((tag) => tag.toLowerCase().includes(item.key.toLowerCase().split(" ")[0])),
    ),
    ...(venue.tags.some((tag) => /hearing\s*loop/i.test(tag))
      ? [{ key: "__hearing_loop" as const, label: "Hearing loop listed", symbol: "H" as const }]
      : []),
  ].slice(0, 4);

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        selected ? "ring-2 ring-[var(--color-primary)]" : ""
      }`}
    >
      <div className="relative aspect-[1.1/0.82] overflow-hidden bg-background-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        <button
          type="button"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card text-heading shadow-md transition hover:scale-105 ${SITE_FOCUS}`}
          aria-label={saved ? `Remove ${venue.name} from saved venues` : `Save ${venue.name}`}
          aria-pressed={saved}
          onClick={() => toggleSavedVenueSlug(venue.slug)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden
          >
            <path d="M12 21s-6.7-4.4-9.2-8.6C1.1 9.2 2.6 5.5 6.2 5.1c1.9-.2 3.7.8 4.6 2.4.9-1.6 2.7-2.6 4.6-2.4 3.6.4 5.1 4.1 3.4 7.3C18.7 16.6 12 21 12 21z" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-card/95 px-3 py-1.5 shadow-md ring-1 ring-border">
          <span className={`rounded-full px-2 py-1 text-xs font-bold ${scoreStyle.badgeClass}`}>
            {confidence.score}
          </span>
          <span className="text-xs font-semibold text-[var(--color-secondary)]">{scoreStyle.label}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted">{venue.type}</p>
        <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-heading">{venue.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {formatVenueLocation(venue.location)}
          {userCenter ? ` · ${distance}` : ""}
        </p>

        {accessIcons.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2 text-[var(--color-secondary)]" aria-label="Access features listed">
            {accessIcons.map((item) => (
              <span
                key={item.key}
                title={item.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-verified-pale text-xs font-bold"
              >
                <span aria-hidden="true">{item.symbol}</span>
                <span className="sr-only">{item.label}</span>
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 grid gap-2">
          <Link
            href={reportHref}
            className={`flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-heading transition hover:border-[var(--color-border-mid)] hover:bg-background-2 ${SITE_FOCUS}`}
          >
            View access report
            <span aria-hidden="true">→</span>
          </Link>
          {onSelect ? (
            <button type="button" onClick={onSelect} className={`${VF_BTN_SECONDARY} w-full text-sm`}>
              {selected ? "Selected on map" : "Show on map"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
