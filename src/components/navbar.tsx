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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-[0_1px_0_rgba(15,26,43,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-background/88">
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

        <div
          role="search"
          aria-labelledby="site-search-label"
          className="relative z-[70] -mx-4 border-t border-border px-4 py-3 sm:-mx-6 sm:px-6"
          style={{
            background: "linear-gradient(105deg, var(--blue-pale) 0%, var(--background-2) 45%, var(--amber-pale) 100%)",
          }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p
              id="site-search-label"
              className="shrink-0 text-sm font-semibold tracking-tight text-navy"
            >
              Search the site
            </p>
            <div className="min-w-0 flex-1" data-access-stamp="site-search">
              <GlobalSearch ariaLabelledBy="site-search-label" onSelect={() => setMobileOpen(false)} />
            </div>
          </div>
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
