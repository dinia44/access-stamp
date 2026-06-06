import Link from "next/link";
import type { Venue } from "@/lib/mock-data";
import { buildAccessSummary } from "@/lib/venue-finder";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";
import { VenueFinderVerificationBadge } from "./venue-finder-badges";

type Props = {
  venue: Venue;
};

export function VenueResultCard({ venue }: Props) {
  const summary = buildAccessSummary(venue);
  const reportHref = `/venue/${venue.slug}`;

  return (
    <li>
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">
          {venue.type} · {venue.location}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.015em] leading-7 text-slate-900">
          {venue.name}
        </h3>

        <div className="mt-3">
          <VenueFinderVerificationBadge status={venue.verification} />
        </div>

        <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{summary}</p>

        {venue.tags.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {venue.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link href={reportHref} className={`${VF_BTN_PRIMARY} w-full sm:flex-1`}>
            View access report
          </Link>
          <Link
            href={reportHref}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:shrink-0"
          >
            Details
          </Link>
        </div>
      </article>
    </li>
  );
}
