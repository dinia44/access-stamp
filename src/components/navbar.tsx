"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/container";
import { GlobalSearch } from "@/components/global-search";
import { SiteLogo } from "@/components/site-logo";
import { MORE_ITEMS, NAV_ITEMS, SUGGEST_VENUE_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

const CTA_CLASS =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2";

export function Navbar() {
  const path = usePathname() || "/";
  const isHome = path === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenus = () => setMobileOpen(false);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const allMobile = useMemo(() => [...NAV_ITEMS, ...MORE_ITEMS], []);

  const navLinkClass = (active: boolean) =>
    cn(
      "rounded-lg px-1 py-2 text-sm font-semibold transition-colors [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
      isHome
        ? cn("text-white/90 hover:text-white", active && "text-white underline decoration-cyan-300 decoration-2 underline-offset-4")
        : cn(
            "text-heading hover:bg-background-2 lg:px-3",
            active && "bg-blue-pale text-blue ring-1 ring-blue/15",
          ),
    );

  const headerClass = cn(
    "z-50",
    isHome ? "absolute inset-x-0 top-0 z-40" : "nav-header sticky top-0 backdrop-blur-md",
  );

  const inner = (
    <>
      <div className={cn("flex items-center justify-between gap-3", isHome ? "py-5" : "h-16")}>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Access Stamp home"
          onClick={closeMenus}
        >
          <SiteLogo
            priority
            className={cn("h-auto w-auto max-h-[40px] object-contain", isHome && "brightness-0 invert")}
          />
          {isHome ? <span className="text-xl font-bold text-white">Access Stamp</span> : null}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = linkActive(path, item.href);
            return (
              <Link key={item.href} href={item.href} onClick={closeMenus} className={navLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link href={SUGGEST_VENUE_HREF} onClick={closeMenus} className={CTA_CLASS}>
            Suggest a venue
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "shrink-0 rounded-lg px-3 py-2 text-sm font-semibold [touch-action:manipulation] md:hidden",
            isHome ? "text-white hover:bg-white/10" : "text-heading hover:bg-background-2",
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {!isHome ? (
        <div
          role="search"
          aria-labelledby="site-search-label"
          className="relative z-0 -mx-4 border-t border-border px-4 py-3 sm:-mx-6 sm:px-6"
          style={{
            background: "linear-gradient(105deg, var(--blue-pale) 0%, var(--background-2) 45%, var(--amber-pale) 100%)",
          }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p id="site-search-label" className="shrink-0 text-sm font-semibold tracking-tight text-navy">
              Search the site
            </p>
            <div className="min-w-0 flex-1" data-access-stamp="site-search">
              <GlobalSearch ariaLabelledBy="site-search-label" onSelect={closeMenus} />
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <nav className="pb-4 md:hidden" aria-label="Mobile">
          <div
            className={cn(
              "grid gap-2 rounded-2xl border p-3 shadow-lg",
              isHome ? "border-white/15 bg-[#071E3D]/95 backdrop-blur" : "border-border bg-card shadow-[var(--shadow-soft)]",
            )}
          >
            {allMobile.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className={cn(
                    "min-h-11 rounded-lg px-3 py-2 text-sm font-semibold [touch-action:manipulation]",
                    isHome
                      ? cn("text-white/90 hover:bg-white/10", active && "bg-white/10 text-white")
                      : cn(
                          "text-heading hover:bg-background-2",
                          active && "bg-blue-pale text-blue ring-1 ring-blue/15",
                        ),
                  )}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={SUGGEST_VENUE_HREF} onClick={closeMenus} className={cn(CTA_CLASS, "w-full justify-center")}>
              Suggest a venue
            </Link>
          </div>
        </nav>
      ) : null}
    </>
  );

  if (isHome) {
    return (
      <header className={headerClass}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{inner}</div>
      </header>
    );
  }

  return (
    <header className={headerClass}>
      <Container>{inner}</Container>
    </header>
  );
}
