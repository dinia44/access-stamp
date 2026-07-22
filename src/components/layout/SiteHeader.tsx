"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PRIMARY_NAV_CTA } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) closeMobileMenu();
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [mobileOpen, closeMobileMenu]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b ${
        isHome
          ? "border-[var(--color-border)]/60 bg-[var(--color-canvas)]/95 backdrop-blur-sm"
          : "border-[var(--color-border)] bg-[var(--color-canvas)]/97 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:h-[5.5rem] sm:gap-4 sm:px-6 lg:h-24 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-label="Access Stamp — home"
          onClick={closeMobileMenu}
        >
          <SiteLogo priority className="h-auto w-[4.25rem] object-contain sm:w-[4.75rem] lg:w-[5.25rem]" />
        </Link>

        <MainNavigation onNavigate={closeMobileMenu} />

        <div className="hidden shrink-0 lg:block">
          <ButtonLink href={PRIMARY_NAV_CTA.href} className="rounded-full px-4 text-sm" onClick={closeMobileMenu}>
            {PRIMARY_NAV_CTA.label}
          </ButtonLink>
        </div>

        <Button
          ref={menuButtonRef}
          type="button"
          variant="secondary"
          size="icon"
          className="ml-auto lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="site-mobile-nav"
          onClick={() => (mobileOpen ? closeMobileMenu() : setMobileOpen(true))}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </Button>
      </div>

      {mobileOpen ? <MobileNavigation onNavigate={closeMobileMenu} /> : null}
    </header>
  );
}
