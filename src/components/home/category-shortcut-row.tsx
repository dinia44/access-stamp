import Link from "next/link";
import { HOME_PANEL } from "@/components/home/home-theme";

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
    <section aria-labelledby="category-shortcuts-heading" className="border-t border-[#F1D8C7] pb-12 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="category-shortcuts-heading" className="sr-only">
          Browse by category
        </h2>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CATEGORIES.map(({ title, description, href, icon }) => (
            <li key={title}>
              <Link
                href={href}
                className={`group flex h-full min-h-[96px] flex-col p-4 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#E8C4A8] hover:shadow-xl hover:shadow-[#F04A16]/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#59682A]/20 ${HOME_PANEL}`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F1D8C7] bg-[#FFF3E8] text-[#59682A] transition-colors group-hover:border-[#E8C4A8] group-hover:bg-[#FFE2D3]">
                  {icon}
                </span>
                <span className="mt-3 text-sm font-bold text-[#13201F]">{title}</span>
                <span className="mt-1 text-sm leading-5 text-[#5E6A66]">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
