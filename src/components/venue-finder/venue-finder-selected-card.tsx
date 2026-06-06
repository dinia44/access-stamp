import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import {
  computeAccessScore,
  getVenueDistanceLabel,
  getVenuePhoto,
} from "@/lib/venue-access-score";
import type { VenueCoordinates } from "@/lib/venue-coordinates";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";

type Props = {
  venue: Venue;
  userCenter?: VenueCoordinates | null;
  onClose?: () => void;
};

export function VenueFinderSelectedCard({ venue, userCenter, onClose }: Props) {
  const photo = getVenuePhoto(venue);
  const score = computeAccessScore(venue);
  const distance = getVenueDistanceLabel(venue, userCenter);

  return (
    <article className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
      <div className="flex gap-3 p-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-slate-950">{venue.name}</h3>
              <p className="mt-0.5 text-xs text-slate-600">
                {venue.location} · {distance}
              </p>
            </div>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                aria-label="Close selected venue"
              >
                ×
              </button>
            ) : null}
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{venue.summary}</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-800">
              Access score {score}
            </span>
            <Link href={`/venue/${venue.slug}`} className={`${VF_BTN_PRIMARY} !min-h-9 !px-3 !py-2 !text-xs`}>
              View report
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
