"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HOME_NAV_LINK, MAIN_NAV_GROUPS, PRIMARY_NAV_CTA, navLinkActive } from "@/lib/navigation";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const NAV_ACTIVE = "bg-[#FDE9DD] text-[#20242E] ring-1 ring-[#F6CFB8]";

type Props = {
  onNavigate: () => void;
};

export function MobileNavigation({ onNavigate }: Props) {
  const path = usePathname() || "/";
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <nav id="site-mobile-nav" className="border-t border-[#EFE5DA] px-4 pb-4 pt-3 lg:hidden" aria-label="Mobile navigation">
      <div className="grid gap-1 rounded-2xl border border-[#EFE5DA] bg-white p-2 shadow-lg">
        <Link
          href={HOME_NAV_LINK.href}
          aria-current={navLinkActive(path, HOME_NAV_LINK.href) ? "page" : undefined}
          className={cn(
            "rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A5263] transition-colors hover:bg-[#FAF4ED] hover:text-[#20242E]",
            navLinkActive(path, HOME_NAV_LINK.href) && NAV_ACTIVE,
            SITE_FOCUS,
          )}
          onClick={onNavigate}
        >
          {HOME_NAV_LINK.label}
        </Link>
        {MAIN_NAV_GROUPS.map((group) => {
          const isExpanded = expanded === group.label;
          const singleItem = group.items.length === 1 && group.items[0]?.href === group.href;

          if (singleItem) {
            const item = group.items[0]!;
            return (
              <Link
                key={group.label}
                href={item.href}
                aria-current={navLinkActive(path, item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A5263] transition-colors hover:bg-[#FAF4ED] hover:text-[#20242E]",
                  navLinkActive(path, item.href) && NAV_ACTIVE,
                  SITE_FOCUS,
                )}
                onClick={onNavigate}
              >
                {group.label}
              </Link>
            );
          }

          return (
            <div key={group.label} className="rounded-xl border border-transparent">
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#4A5263] hover:bg-[#FAF4ED]",
                  SITE_FOCUS,
                )}
                aria-expanded={isExpanded}
                onClick={() => setExpanded(isExpanded ? null : group.label)}
              >
                {group.label}
                <span aria-hidden>{isExpanded ? "−" : "+"}</span>
              </button>
              {isExpanded ? (
                <ul className="grid gap-1 pb-2 pl-2 pt-1">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        aria-current={navLinkActive(path, item.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm text-[#4A5263] hover:bg-[#FAF4ED]",
                          navLinkActive(path, item.href) && "font-semibold text-[#20242E]",
                          SITE_FOCUS,
                        )}
                        onClick={onNavigate}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
        <ButtonLink href={PRIMARY_NAV_CTA.href} className="mt-2 w-full rounded-full" onClick={onNavigate}>
          {PRIMARY_NAV_CTA.label}
        </ButtonLink>
      </div>
    </nav>
  );
}
