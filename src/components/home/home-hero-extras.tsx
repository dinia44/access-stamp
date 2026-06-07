import Link from "next/link";

const CATEGORIES = [
  { label: "Step-free access", filter: "Step-free entrance" },
  { label: "Accessible toilet", filter: "Accessible toilet" },
  { label: "Blue Badge parking", filter: "Nearby Blue Badge parking" },
  { label: "Hearing loop", filter: "Staff disability awareness" },
  { label: "Lift access", filter: "Lift access" },
  { label: "Large print menu", filter: "Wide doorways (80cm+)" },
] as const;

export function HomeAccessCategories() {
  return (
    <section aria-labelledby="home-access-categories" className="border-b border-border bg-white pb-10 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Browse by access need</p>
            <h2 id="home-access-categories" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-heading">
              Start with what matters most
            </h2>
          </div>
          <Link
            href="/venue-finder"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[#D93E10] hover:text-[#45521F] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFE2D3] focus-visible:ring-offset-2"
          >
            View all categories →
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ label, filter }) => (
            <li key={label}>
              <Link
                href={`/venue-finder?filters=${encodeURIComponent(filter)}`}
                className="group flex min-h-[72px] items-center rounded-2xl border border-border bg-background-2 px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#E8C4A8] hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFE2D3] focus-visible:ring-offset-2"
              >
                <span className="mr-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted">
                  <span className="text-xs font-bold">{label.slice(0, 2).toUpperCase()}</span>
                </span>
                <span className="text-sm font-semibold text-text group-hover:text-heading">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
