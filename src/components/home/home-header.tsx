"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { MORE_ITEMS, NAV_ITEMS, RESOURCE_GROUPS } from "@/lib/site";
import { cn } from "@/lib/utils";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

const PRIMARY_CTA = `inline-flex h-11 min-h-[44px] items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-[#E0F7FF] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-[#2563EB]/30 ${HOME_FOCUS}`;

const NAV_LINK = `rounded-full px-3 py-2 text-sm font-medium text-[#BAE6FD] transition-colors hover:text-[#E0F7FF] xl:px-4 ${HOME_FOCUS}`;

const NAV_ACTIVE = "bg-[#2563EB]/25 text-[#E0F7FF]";

export function HomeHeader() {
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

  return (
    <header className="sticky top-0 z-50 border-b border-[#22D3EE]/15 bg-[#0A2A52]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Access Stamp home"
            onClick={closeMenus}
          >
            <SiteLogo priority className="h-auto max-h-[40px] w-auto object-contain brightness-110" />
            <span className="hidden font-[var(--font-heading)] text-lg font-bold tracking-[-0.02em] text-[#E0F7FF] sm:inline">
              Access Stamp
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={cn(NAV_LINK, active && NAV_ACTIVE)}
                >
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
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#22D3EE]/20 bg-[#0D3568]/95 p-3 shadow-2xl shadow-[#030B1A]/40 backdrop-blur-xl"
                >
                  {RESOURCE_GROUPS.map((group, groupIndex) => (
                    <div
                      key={group.label}
                      className={groupIndex > 0 ? "mt-3 border-t border-[#2563EB]/25 pt-3" : undefined}
                    >
                      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#7DD3FC]">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          role="menuitem"
                          href={item.href}
                          className={`block rounded-xl px-3 py-2.5 text-sm font-medium text-[#BAE6FD] transition-colors hover:bg-[#2563EB]/20 hover:text-[#E0F7FF] ${HOME_FOCUS}`}
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
            <Link href="#platform-search" className={PRIMARY_CTA}>
              Search accessible places
            </Link>
          </div>

          <button
            type="button"
            className={`inline-flex min-h-[44px] items-center rounded-full border border-[#2563EB]/30 px-4 py-2 text-sm font-semibold text-[#BAE6FD] transition-colors hover:border-[#22D3EE]/40 hover:bg-[#2563EB]/20 hover:text-[#E0F7FF] lg:hidden ${HOME_FOCUS}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-[#22D3EE]/15 pb-4 pt-3 lg:hidden" aria-label="Mobile">
            <div className="grid gap-1 rounded-2xl border border-[#22D3EE]/15 bg-[#0D3568]/80 p-2 backdrop-blur-sm">
              {allMobile.map((item) => {
                const active = linkActive(path, item.href);
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={cn(
                      `rounded-xl px-3 py-2.5 text-sm font-medium text-[#BAE6FD] transition-colors hover:bg-[#2563EB]/20 hover:text-[#E0F7FF] ${HOME_FOCUS}`,
                      active && NAV_ACTIVE,
                    )}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="#platform-search" className={`${PRIMARY_CTA} mt-2 w-full`} onClick={closeMenus}>
                Search accessible places
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
