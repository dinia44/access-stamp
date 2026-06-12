"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NAV_ITEMS, PRIMARY_NAV_CTA } from "@/lib/site";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

const NAV_LINK = `relative rounded-full px-3 py-2 text-sm font-medium text-[#4A5263] transition-colors hover:text-[#20242E] xl:px-4 ${SITE_FOCUS}`;
const NAV_ACTIVE = "bg-[#FDE9DD] text-[#20242E] ring-1 ring-[#F6CFB8]";

export function SiteHeader() {
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

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const active = linkActive(path, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                aria-current={active ? "page" : undefined}
                className={cn(NAV_LINK, active && NAV_ACTIVE)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

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

      {mobileOpen ? (
        <nav
          id="site-mobile-nav"
          className="border-t border-[#EFE5DA] px-4 pb-4 pt-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-1 rounded-2xl border border-[#EFE5DA] bg-white p-2 shadow-lg">
            {NAV_ITEMS.map((item) => {
              const active = linkActive(path, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A5263] transition-colors hover:bg-[#FAF4ED] hover:text-[#20242E]",
                    active && NAV_ACTIVE,
                    SITE_FOCUS,
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink href={PRIMARY_NAV_CTA.href} className="mt-2 w-full rounded-full" onClick={closeMobileMenu}>
              {PRIMARY_NAV_CTA.label}
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
