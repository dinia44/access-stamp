"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SAMPLE_VENUE_PHOTOS } from "@/lib/venue-finder-images";

const CHECKLIST = ["Step-free access", "Accessible toilet", "Blue Badge parking"] as const;

const HOME_BTN_PRIMARY =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1D4ED8] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]";

function HomeHeroFloatCards() {
  const venuePhoto = SAMPLE_VENUE_PHOTOS["harbour-kitchen-liverpool"];

  return (
    <div className="relative mx-auto hidden h-[340px] w-full max-w-[420px] lg:block" aria-hidden="true">
      <div className="absolute inset-0 rounded-[28px] bg-[#67E8F9]/10 blur-2xl" />

      <div className="absolute left-0 top-2 w-[210px] rotate-[-4deg] overflow-hidden rounded-2xl border border-white/15 bg-[#0A2447] shadow-2xl">
        <div className="relative h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={venuePhoto.src} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Venue preview
          </span>
        </div>
        <div className="p-3">
          <p className="text-sm font-semibold text-white">Harbour Kitchen</p>
          <p className="text-xs text-slate-300">Liverpool · Restaurant</p>
        </div>
      </div>

      <div className="absolute right-0 top-10 w-[188px] rotate-[3deg] rounded-2xl border border-white/15 bg-white p-4 shadow-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Access report</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-4xl font-bold leading-none text-slate-900">92</span>
          <span className="pb-1 text-sm font-semibold text-emerald-700">Access score</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[92%] rounded-full bg-emerald-600" />
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600">Verified features from a real visit report.</p>
      </div>

      <div className="absolute bottom-0 left-8 w-[196px] rotate-[-1deg] rounded-2xl border border-white/15 bg-[#0A2447] p-4 shadow-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#67E8F9]">Quick checklist</p>
        <ul className="mt-2 space-y-1.5">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-slate-200">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-300">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PremiumHomeHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(params.toString() ? `/venue-finder?${params.toString()}` : "/venue-finder");
  };

  return (
    <section className="relative overflow-hidden bg-[#061A3A] pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(720px 420px at 15% 20%, rgba(103,232,249,0.12), transparent 60%), radial-gradient(640px 380px at 85% 10%, rgba(29,78,216,0.18), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              UK accessibility platform
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.035em] leading-[1.05] text-white sm:text-5xl lg:text-[3.25rem]">
              Find accessible places.{" "}
              <span className="text-[#67E8F9]">Travel with confidence.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Real access reports, practical accessibility scores, and UK guidance — so you know what to expect before
              you leave home.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Search step-free routes, toilets, parking, hearing loops, and more from verified and community-reported
              visits.
            </p>
          </div>

          <HomeHeroFloatCards />
        </div>

        <div className="relative z-10 mx-auto mt-10 max-w-5xl translate-y-6 sm:translate-y-8">
          <div className="rounded-3xl border border-white/10 bg-[#071E3D]/95 p-4 shadow-2xl backdrop-blur sm:p-5">
            <form
              className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_auto] lg:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-slate-400">
                  Search
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Venue, place, or access need"
                  className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-slate-400">
                  Location
                </span>
                <input
                  type="search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, town or postcode"
                  className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <button type="submit" className={`${HOME_BTN_PRIMARY} w-full lg:min-w-[180px]`}>
                Search venues
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
