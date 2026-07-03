import Link from "next/link";
import { HOME_FOCUS } from "@/components/home/home-theme";

const POPULAR_SEARCHES = [
  {
    label: "Step-free cafés in Liverpool",
    href: "/venue-finder?q=cafe&location=liverpool&filters=Step-free+entrance",
  },
  {
    label: "Restaurants with toilets in Manchester",
    href: "/venue-finder?q=restaurant&location=manchester&filters=Accessible+toilet",
  },
  {
    label: "Galleries with parking in Leeds",
    href: "/venue-finder?q=gallery&location=leeds&filters=Nearby+Blue+Badge+parking",
  },
] as const;

export function HeroPopularSearches() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-7">
      {POPULAR_SEARCHES.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`inline-flex min-h-[44px] items-center rounded-full border border-[var(--color-border)] bg-white/90 px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-border-mid)] hover:bg-[var(--color-surface-warm)] ${HOME_FOCUS}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
