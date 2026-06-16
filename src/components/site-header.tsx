"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NAV_MORE_ITEMS, NAV_PRIMARY_ITEMS, PRIMARY_NAV_CTA } from "@/lib/site";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

function linkActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

function moreMenuActive(path: string) {
  return NAV_MORE_ITEMS.some((item) => linkActive(path, item.href));
}

const NAV_LINK = `relative rounded-full px-3 py-2 text-sm font-medium text-[#4A5263] transition-colors hover:text-[#20242E] xl:px-4 ${SITE_FOCUS}`;
const NAV_ACTIVE = "bg-[#FDE9DD] text-[#20242E] ring-1 ring-[#F6CFB8]";

function NavMoreDropdown({ onNavigate }: { onNavigate: () => void }) {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = moreMenuActive(path);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close();
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={cn(NAV_LINK, "inline-flex items-center gap-1.5", active && NAV_ACTIVE)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="nav-more-menu"
        onClick={() => setOpen((value) => !value)}
      >
        More
        <svg viewBox="0 0 20 20" className={cn("h-4 w-4 transition", open && "rotate-180")} aria-hidden>
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div
          id="nav-more-menu"
          role="menu"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-[#EFE5DA] bg-white p-2 shadow-lg"
        >
          <ul className="space-y-1">
            {NAV_MORE_ITEMS.map((item) => {
              const isActive = linkActive(path, item.href);
              return (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 transition-colors hover:bg-[#FAF4ED]",
                      isActive && "bg-[#FDE9DD] ring-1 ring-[#F6CFB8]",
                      SITE_FOCUS,
                    )}
                    onClick={() => {
                      close();
                      onNavigate();
                    }}
                  >
                    <span className="block text-sm font-semibold text-[#20242E]">{item.label}</span>
                    {item.description ? (
                      <span className="mt-0.5 block text-xs leading-5 text-[#4A5263]">{item.description}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

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
          {NAV_PRIMARY_ITEMS.map((item) => {
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
          <NavMoreDropdown onNavigate={closeMobileMenu} />
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
            {NAV_PRIMARY_ITEMS.map((item) => {
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

            <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#76808F]">More</p>
            {NAV_MORE_ITEMS.map((item) => {
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
