"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PRIMARY_NAV_CTA } from "@/lib/navigation";

export function SiteHeader() {
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
    <header className="sticky top-0 z-50 border-b border-[#EFE5DA] bg-[#FDFBF8]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Access Stamp home"
          onClick={closeMobileMenu}
        >
          <SiteLogo priority className="h-auto max-h-[52px] w-auto object-contain sm:max-h-[56px]" />
        </Link>

        <MainNavigation onNavigate={closeMobileMenu} />

        <div className="hidden shrink-0 lg:block">
          <ButtonLink href={PRIMARY_NAV_CTA.href} className="rounded-full" onClick={closeMobileMenu}>
            {PRIMARY_NAV_CTA.label}
          </ButtonLink>
        </div>

        <Button
          ref={menuButtonRef}
          type="button"
          variant="secondary"
          size="icon"
          className="lg:hidden"
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
