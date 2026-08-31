"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  MAIN_NAV_LINKS,
  PRIMARY_NAV_CTA,
  RESOURCE_NAV_GROUPS,
  navLinkActive,
  resourceNavItemActive,
  resourcesNavActive,
} from "@/lib/navigation";
import { track } from "@/lib/analytics";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const NAV_ACTIVE =
  "bg-[#FAF4ED] font-semibold text-[#20242E] underline decoration-[#EF5B25]/75 decoration-2 underline-offset-4";

type Props = {
  onNavigate: () => void;
};

export function MobileNavigation({ onNavigate }: Props) {
  const path = usePathname() || "/";
  const resourcesId = useId();
  const [resourcesOpen, setResourcesOpen] = useState(resourcesNavActive(path));

  return (
    <nav id="site-mobile-nav" className="border-t border-[#EFE5DA] px-4 pb-5 pt-4 lg:hidden" aria-label="Mobile navigation">
      <div className="grid gap-1">
        <button
          type="button"
          className={cn(
            "flex min-h-[44px] items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium text-[#4A5263] hover:bg-[#FAF4ED] hover:text-[#20242E]",
            (resourcesOpen || resourcesNavActive(path)) && NAV_ACTIVE,
            SITE_FOCUS,
          )}
          aria-expanded={resourcesOpen}
          aria-controls={resourcesId}
          onClick={() => {
            setResourcesOpen((open) => {
              const next = !open;
              if (next) track("resources_menu_opened", { source: "mobile" });
              return next;
            });
          }}
        >
          Resources
          <span aria-hidden className="text-xs">
            {resourcesOpen ? "−" : "+"}
          </span>
        </button>
        {resourcesOpen ? (
          <div id={resourcesId} className="mb-2 ml-2 border-l border-[#EFE5DA] pl-3">
            {RESOURCE_NAV_GROUPS.map((group) => (
              <div key={group.label} className="py-1">
                <p className="px-4 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                  {group.label}
                </p>
                <ul className="grid gap-1">
                  {group.items.map((item) => {
                    const active = resourceNavItemActive(path, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-base font-medium text-[#4A5263] hover:bg-[#FAF4ED] hover:text-[#20242E]",
                            active && NAV_ACTIVE,
                            SITE_FOCUS,
                          )}
                          onClick={() => {
                            track("homepage_resource_selected", {
                              source: "mobile",
                              category: item.label.toLowerCase().replace(/\s+/g, "_"),
                            });
                            onNavigate();
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

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
