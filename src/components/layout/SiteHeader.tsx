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
      className={`sticky top-0 z-50 ${
        isHome
          ? "border-b border-transparent bg-[var(--background)]/80 backdrop-blur-md"
          : "border-b border-[#EFE5DA] bg-[#FDFBF8]/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex min-h-[5.5rem] max-w-7xl items-center gap-4 px-4 py-2.5 sm:min-h-[6.25rem] sm:px-6 sm:py-3 lg:min-h-[8.75rem] lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5B25]/40"
          aria-label="Access Stamp — home"
          onClick={closeMobileMenu}
        >
          <SiteLogo priority className="h-auto w-[5.25rem] object-contain sm:w-24 lg:w-28" />
        </Link>

        <MainNavigation onNavigate={closeMobileMenu} />

        <div className="hidden shrink-0 lg:block">
          <ButtonLink href={PRIMARY_NAV_CTA.href} className="rounded-full px-5" onClick={closeMobileMenu}>
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
