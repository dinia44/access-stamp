"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { MORE_ITEMS, NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

const PRIMARY_CTA =
  "inline-flex h-11 min-h-[44px] items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/25";

export function HomeHeader() {
  const path = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setMoreOpen(false);
  };

  useEffect(() => {
    if (!moreOpen) return;
    function onDocClick(e: PointerEvent) {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, [moreOpen]);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenus();
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const allMobile = useMemo(() => [...NAV_ITEMS, ...MORE_ITEMS], []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061A3A]/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Access Stamp home"
            onClick={closeMenus}
          >
            <SiteLogo priority className="h-auto max-h-[44px] w-auto object-contain brightness-110" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/20 xl:px-4",
                    active && "bg-white/10 text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/20 xl:px-4",
                  moreOpen && "bg-white/10 text-white",
                )}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((v) => !v)}
              >
                More
              </button>
              {moreOpen ? (
                <div
                  role="menu"
                  aria-label="More"
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#04122B]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      role="menuitem"
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link href="#platform-search" className={PRIMARY_CTA}>
              Search Access Stamp
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/20 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-white/10 pb-4 pt-3 lg:hidden" aria-label="Mobile">
            <div className="grid gap-1 rounded-2xl border border-white/10 bg-slate-950/60 p-2 backdrop-blur-sm">
              {allMobile.map((item) => {
                const active = linkActive(path, item.href);
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white",
                      active && "bg-white/10 text-white",
                    )}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="#platform-search" className={`${PRIMARY_CTA} mt-2 w-full`} onClick={closeMenus}>
                Search Access Stamp
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
