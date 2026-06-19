"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_LINKS, navLinkActive } from "@/lib/navigation";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const NAV_LINK = `relative px-1 py-2 text-sm font-medium text-[#4A5263] transition-colors hover:text-[#20242E] ${SITE_FOCUS}`;
const NAV_ACTIVE =
  "font-semibold text-[#20242E] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-[#EF5B25]/75";

export function MainNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname() || "/";

  return (
    <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-7" aria-label="Primary navigation">
      {MAIN_NAV_LINKS.map((link) => {
        const active = navLinkActive(path, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(NAV_LINK, active && NAV_ACTIVE)}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
