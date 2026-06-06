import Link from "next/link";

export function HomeForVenues() {
  return (
    <section className="border-b border-slate-200 bg-white py-16" aria-labelledby="for-venues-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-[#061A3A] text-white shadow-xl">
          <div className="grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan-300">For venues</p>
              <h2 id="for-venues-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                Help visitors know what to expect
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                Share clearer access information, suggest a venue for listing, or work with Access Stamp to improve how
                your venue describes step-free routes, toilets, parking and staff support.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/submit-venue"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]"
              >
                Suggest a venue
              </Link>
              <Link
                href="/ai-toolkit/venue-questions"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A3A]"
              >
                Venue access checklist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
