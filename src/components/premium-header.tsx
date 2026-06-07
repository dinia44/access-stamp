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

const NAV_LINK = `rounded-full px-3 py-2 text-sm font-medium text-[#1E3A5F] transition-colors hover:text-[#0B1D3A] xl:px-4 ${SITE_FOCUS}`;
const NAV_ACTIVE = "bg-[#DBEAFE] text-[#0B1D3A]";

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
      ? { href: "#platform-search", label: "Search accessible places" }
      : { href: "/venue-finder", label: "Start searching" };

  return (
    <header className="nav-header sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Access Stamp home"
            onClick={closeMenus}
          >
            <SiteLogo priority className="h-auto max-h-[40px] w-auto object-contain" />
            <span className="hidden text-lg font-bold tracking-[-0.02em] text-[#0B1D3A] sm:inline">Access Stamp</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link key={item.href} href={item.href} onClick={closeMenus} className={cn(NAV_LINK, active && NAV_ACTIVE)}>
                  {item.label}
                </Link>
              );
            })}

            <div className="relative" ref={resourcesRef}>
              <button
                type="button"
                className={cn(NAV_LINK, resourcesOpen && NAV_ACTIVE)}
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
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#BFDBFE] bg-white p-3 shadow-xl shadow-[#2563EB]/10"
                >
                  {RESOURCE_GROUPS.map((group, groupIndex) => (
                    <div
                      key={group.label}
                      className={groupIndex > 0 ? "mt-3 border-t border-[#DBEAFE] pt-3" : undefined}
                    >
                      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#3B6B9A]">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          role="menuitem"
                          href={item.href}
                          className={`block rounded-xl px-3 py-2.5 text-sm font-medium text-[#1E3A5F] transition-colors hover:bg-[#EFF6FF] hover:text-[#0B1D3A] ${SITE_FOCUS}`}
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

          <div className="hidden shrink-0 lg:block">
            <Link href={primaryCta.href} className={SITE_BTN_PRIMARY} onClick={closeMenus}>
              {primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            className={`${SITE_BTN_SECONDARY} lg:hidden`}
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
            className="border-t border-[#BFDBFE] py-3"
          >
            <div className="premium-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
              <p id="site-search-label" className="shrink-0 text-sm font-semibold text-[#0B1D3A]">
                Search the site
              </p>
              <div className="min-w-0 flex-1" data-access-stamp="site-search">
                <GlobalSearch ariaLabelledBy="site-search-label" onSelect={closeMenus} />
              </div>
            </div>
          </div>
        ) : null}

        {mobileOpen ? (
          <nav className="border-t border-[#BFDBFE] pb-4 pt-3 lg:hidden" aria-label="Mobile">
            <div className="grid gap-1 rounded-2xl border border-[#BFDBFE] bg-white p-2 shadow-lg shadow-[#2563EB]/5">
              {allMobile.map((item) => {
                const active = linkActive(path, item.href);
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={cn(
                      `rounded-xl px-3 py-2.5 text-sm font-medium text-[#1E3A5F] transition-colors hover:bg-[#EFF6FF] hover:text-[#0B1D3A] ${SITE_FOCUS}`,
                      active && NAV_ACTIVE,
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
