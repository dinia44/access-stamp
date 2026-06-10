"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { SITE_BTN_PRIMARY, SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Add Venue", href: "/submit-venue" },
  { label: "For Venues", href: "/submit-venue" },
  { label: "About Us", href: "/about" },
] as const;

const NAV_LINK = `relative rounded-lg px-3 py-2 text-sm font-medium text-text transition-colors hover:text-heading xl:px-4 ${SITE_FOCUS}`;
const NAV_ACTIVE = "bg-[#FFE2D3] text-heading rounded-full";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function VenueFinderHeader() {
  const path = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) closeMobileMenu();
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [mobileOpen, closeMobileMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm shadow-[#F04A16]/5 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Access Stamp home"
          onClick={closeMobileMenu}
        >
          <SiteLogo priority className="h-auto max-h-[48px] w-auto object-contain sm:max-h-[52px]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const active = linkActive(path, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(NAV_LINK, active && NAV_ACTIVE)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#saved-venues"
            className={cn("text-sm font-medium text-text transition-colors hover:text-heading", SITE_FOCUS)}
          >
            Saved
          </Link>
          <Link href="/ai-toolkit" className={SITE_BTN_PRIMARY}>
            Log in
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-heading lg:hidden",
            SITE_FOCUS,
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="vf-mobile-nav"
          onClick={() => (mobileOpen ? closeMobileMenu() : setMobileOpen(true))}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id="vf-mobile-nav"
          className="border-t border-border px-4 pb-4 pt-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-1 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-[#F04A16]/5">
            {NAV_ITEMS.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium text-text transition-colors hover:bg-background-2 hover:text-heading",
                    active && NAV_ACTIVE,
                    SITE_FOCUS,
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="#saved-venues"
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium text-text hover:bg-background-2 hover:text-heading",
                SITE_FOCUS,
              )}
              onClick={closeMobileMenu}
            >
              Saved
            </Link>
            <Link href="/ai-toolkit" className={cn("mt-2 w-full text-center", SITE_BTN_PRIMARY)} onClick={closeMobileMenu}>
              Log in
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
