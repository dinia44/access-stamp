"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { GlobalSearch } from "@/components/global-search";
import { SiteLogo } from "@/components/site-logo";
import { MORE_ITEMS, NAV_ITEMS, RESOURCE_GROUPS } from "@/lib/site";
import { SITE_BTN_PRIMARY, SITE_BTN_SECONDARY, SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

const NAV_LINK = `relative rounded-lg px-3 py-2 text-sm font-medium text-[#2A3836] transition-colors hover:text-[#13201F] xl:px-4 ${SITE_FOCUS}`;
const NAV_ACTIVE_HOME = "text-[#13201F] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-[#F04A16] xl:after:left-4 xl:after:right-4";
const NAV_ACTIVE_SITE = "bg-[#FFE2D3] text-[#13201F] rounded-full";

type PremiumHeaderProps = {
  variant?: "home" | "site";
  showSearchBand?: boolean;
};

export function PremiumHeader({ variant = "site", showSearchBand = variant === "site" }: PremiumHeaderProps) {
  const path = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement | null>(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setResourcesOpen(false);
  };

  useEffect(() => {
    if (!resourcesOpen) return;
    function onDocClick(e: PointerEvent) {
      if (!resourcesRef.current?.contains(e.target as Node)) setResourcesOpen(false);
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, [resourcesOpen]);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenus();
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const allMobile = useMemo(() => [...NAV_ITEMS, ...MORE_ITEMS], []);
  const primaryCta =
    variant === "home"
      ? { href: "#platform-search", label: "Search accessible places →" }
      : { href: "/venue-finder", label: "Start searching" };

  const navActiveClass = variant === "home" ? NAV_ACTIVE_HOME : NAV_ACTIVE_SITE;

  return (
    <header className="sticky top-0 z-50 border-b border-[#F1D8C7] bg-[#FFF8F1]/95 shadow-sm shadow-[#F04A16]/5 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "h-16 items-center gap-4 lg:h-[4.5rem]",
            variant === "home" ? "grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr]" : "flex justify-between",
          )}
        >
          <Link
            href="/"
            className={cn("flex shrink-0 items-center gap-3", variant === "home" && "lg:justify-self-start")}
            aria-label="Access Stamp home"
            onClick={closeMenus}
          >
            <SiteLogo priority className="h-auto max-h-[44px] w-auto object-contain sm:max-h-[48px]" />
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-1 lg:flex xl:gap-2",
              variant === "home" ? "justify-self-center" : undefined,
            )}
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link key={item.href} href={item.href} onClick={closeMenus} className={cn(NAV_LINK, active && navActiveClass)}>
                  {item.label}
                </Link>
              );
            })}

            <div className="relative" ref={resourcesRef}>
              <button
                type="button"
                className={cn(NAV_LINK, resourcesOpen && navActiveClass)}
                aria-haspopup="menu"
                aria-expanded={resourcesOpen}
                onClick={() => setResourcesOpen((v) => !v)}
              >
                Resources
              </button>
              {resourcesOpen ? (
                <div
                  role="menu"
                  aria-label="Resources"
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#F1D8C7] bg-white p-3 shadow-xl shadow-[#F04A16]/10"
                >
                  {RESOURCE_GROUPS.map((group, groupIndex) => (
                    <div
                      key={group.label}
                      className={groupIndex > 0 ? "mt-3 border-t border-[#F1D8C7] pt-3" : undefined}
                    >
                      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#5E6A66]">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          role="menuitem"
                          href={item.href}
                          className={`block rounded-xl px-3 py-2.5 text-sm font-medium text-[#2A3836] transition-colors hover:bg-[#FFF3E8] hover:text-[#13201F] ${SITE_FOCUS}`}
                          onClick={closeMenus}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className={cn("hidden shrink-0 lg:block", variant === "home" && "justify-self-end")}>
            <Link href={primaryCta.href} className={SITE_BTN_PRIMARY} onClick={closeMenus}>
              {primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            className={cn(`${SITE_BTN_SECONDARY} lg:hidden`, variant === "home" && "justify-self-end")}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {showSearchBand ? (
          <div
            role="search"
            aria-labelledby="site-search-label"
            className="border-t border-[#F1D8C7] py-3"
          >
            <div className="premium-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
              <p id="site-search-label" className="shrink-0 text-sm font-semibold text-[#13201F]">
                Search the site
              </p>
              <div className="min-w-0 flex-1" data-access-stamp="site-search">
                <GlobalSearch ariaLabelledBy="site-search-label" onSelect={closeMenus} />
              </div>
            </div>
          </div>
        ) : null}

        {mobileOpen ? (
          <nav className="border-t border-[#F1D8C7] pb-4 pt-3 lg:hidden" aria-label="Mobile">
            <div className="grid gap-1 rounded-2xl border border-[#F1D8C7] bg-white p-2 shadow-lg shadow-[#F04A16]/5">
              {allMobile.map((item) => {
                const active = linkActive(path, item.href);
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={cn(
                      `rounded-xl px-3 py-2.5 text-sm font-medium text-[#2A3836] transition-colors hover:bg-[#FFF3E8] hover:text-[#13201F] ${SITE_FOCUS}`,
                      active && navActiveClass,
                    )}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href={primaryCta.href} className={`${SITE_BTN_PRIMARY} mt-2 w-full`} onClick={closeMenus}>
                {primaryCta.label}
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
