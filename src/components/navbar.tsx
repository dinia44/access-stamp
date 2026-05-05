"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { MORE_ITEMS, NAV_ITEMS } from "@/lib/site";

export function Navbar() {
  const path = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!moreRef.current) return;
      if (!moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const allMobile = useMemo(() => [...NAV_ITEMS, ...MORE_ITEMS], []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Access Stamp" width={140} height={36} priority />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2",
                    active && "bg-blue-pale text-blue",
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
                  "rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2",
                  moreOpen && "bg-background-2",
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
                  className="absolute right-0 mt-2 w-56 rounded-[var(--radius-card)] border border-border bg-card p-2 shadow-[var(--shadow)]"
                >
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      role="menuitem"
                      href={item.href}
                      className="block rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2"
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href="/venue-finder">Start Searching</Button>
          </div>

          <button
            type="button"
            className="md:hidden rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <nav className="md:hidden pb-4" aria-label="Mobile">
            <div className="grid gap-2 rounded-[var(--radius-card)] border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
              {allMobile.map((item) => {
                const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2",
                      active && "bg-blue-pale text-blue",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button href="/venue-finder" className="w-full justify-center">
                Start Searching
              </Button>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
