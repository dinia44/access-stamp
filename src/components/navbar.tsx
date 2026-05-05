"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import { GlobalSearch } from "@/components/global-search";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/site";

export function Navbar() {
  const path = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const allMobile = useMemo(() => [...NAV_ITEMS], []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src="/logo.svg" alt="Access Stamp" width={140} height={36} priority />
          </Link>

          <nav className="hidden min-w-0 items-center gap-1 lg:flex" aria-label="Primary">
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
          </nav>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <Button href="/venue-finder">Search venues</Button>
          </div>

          <button
            type="button"
            className="shrink-0 lg:hidden rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div className="border-t border-border/60 pb-3 pt-3">
          <GlobalSearch onSelect={() => setMobileOpen(false)} />
        </div>

        {mobileOpen ? (
          <nav className="pb-4 md:hidden" aria-label="Mobile">
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
              <Link
                href="/directory"
                className="rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2"
                onClick={() => setMobileOpen(false)}
              >
                Directory
              </Link>
              <Link
                href="/glossary"
                className="rounded-[var(--radius-ui)] px-3 py-2 text-sm font-semibold text-heading hover:bg-background-2"
                onClick={() => setMobileOpen(false)}
              >
                Glossary
              </Link>
              <Button href="/venue-finder" className="w-full justify-center">
                Search venues
              </Button>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
