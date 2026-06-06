import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { buildAccessSummary } from "@/lib/venue-finder";
import {
  computeAccessScore,
  getVenuePhoto,
  mockVenueDistanceKm,
} from "@/lib/venue-access-score";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";
import { VenueFinderVerificationBadge } from "./venue-finder-badges";

type Props = {
  venue: Venue;
};

export function VenueResultCard({ venue }: Props) {
  const summary = buildAccessSummary(venue);
  const reportHref = `/venue/${venue.slug}`;
  const photo = getVenuePhoto(venue);
  const score = computeAccessScore(venue);
  const distance = mockVenueDistanceKm(venue.slug);

  return (
    <li>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-44 lg:w-52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              {venue.type}
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold tracking-[-0.015em] leading-7 text-slate-900">
                  {venue.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {venue.location} · {distance} away
                </p>
                <div className="mt-3">
                  <VenueFinderVerificationBadge status={venue.verification} />
                </div>
                {venue.tags.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {venue.tags.slice(0, 4).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Access score
                  </p>
                  <p className="mt-1 text-3xl font-bold leading-none text-slate-900">{score}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">Out of 100</p>
                </div>
                <Link href={reportHref} className={`${VF_BTN_PRIMARY} w-full min-w-[168px] sm:w-auto`}>
                  View access report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
