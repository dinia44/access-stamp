"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MAIN_NAV_LINKS, PRIMARY_NAV_CTA, navLinkActive } from "@/lib/navigation";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const NAV_ACTIVE =
  "bg-[#FAF4ED] font-semibold text-[#20242E] underline decoration-[#EF5B25]/75 decoration-2 underline-offset-4";

type Props = {
  onNavigate: () => void;
};

export function MobileNavigation({ onNavigate }: Props) {
  const path = usePathname() || "/";

  return (
    <nav id="site-mobile-nav" className="border-t border-[#EFE5DA] px-4 pb-5 pt-4 lg:hidden" aria-label="Mobile navigation">
      <div className="grid gap-1">
        {MAIN_NAV_LINKS.map((link) => {
          const active = navLinkActive(path, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-3.5 text-base font-medium text-[#4A5263] transition-colors hover:bg-[#FAF4ED] hover:text-[#20242E]",
                active && NAV_ACTIVE,
                SITE_FOCUS,
              )}
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          );
        })}
        <ButtonLink href={PRIMARY_NAV_CTA.href} className="mt-4 w-full rounded-full py-3.5" onClick={onNavigate}>
          {PRIMARY_NAV_CTA.label}
        </ButtonLink>
      </div>
    </nav>
  );
}
