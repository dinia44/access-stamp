import Link from "next/link";

const CATEGORIES = [
  {
    title: "Attractions",
    description: "Museums, galleries & more",
    href: "/venue-finder?q=attractions",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Food & drink",
    description: "Cafés, restaurants & pubs",
    href: "/venue-finder?q=food+drink",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M6 3v8a4 4 0 0 0 8 0V3M10 11v10M18 3v18" />
      </svg>
    ),
  },
  {
    title: "Entertainment",
    description: "Theatres, cinemas & events",
    href: "/venue-finder?q=entertainment",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    title: "Stays",
    description: "Hotels, B&Bs & more",
    href: "/venue-finder?q=hotels",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M3 10h18v11H3zM7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M7 15h.01M12 15h.01M17 15h.01" />
      </svg>
    ),
  },
  {
    title: "Outdoors",
    description: "Parks, gardens & trails",
    href: "/venue-finder?q=outdoors",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 22V12M8 22h8M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M12 6V2M9 4l3-2 3 2" />
      </svg>
    ),
  },
  {
    title: "Transport",
    description: "Getting around",
    href: "/advice/transport",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 11h18M7 16h.01M17 16h.01M6 6V4M18 6V4" />
      </svg>
    ),
  },
] as const;

export function CategoryShortcutRow() {
  return (
    <section aria-labelledby="category-shortcuts-heading" className="bg-white pb-10 pt-6 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="category-shortcuts-heading" className="sr-only">
          Browse by category
        </h2>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CATEGORIES.map(({ title, description, href, icon }) => (
            <li key={title}>
              <Link
                href={href}
                className="group flex h-full min-h-[88px] flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors group-hover:border-blue-200 group-hover:text-blue-700">
                  {icon}
                </span>
                <span className="mt-3 text-sm font-bold text-slate-900">{title}</span>
                <span className="mt-1 text-xs leading-5 text-slate-600">{description}</span>
                <span className="mt-auto pt-2 text-xs font-semibold text-blue-700 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Explore →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
