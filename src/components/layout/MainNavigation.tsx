"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HOME_NAV_LINK, MAIN_NAV_GROUPS, navGroupActive, navLinkActive } from "@/lib/navigation";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const NAV_LINK = `relative rounded-full px-3 py-2 text-sm font-medium text-[#4A5263] transition-colors hover:text-[#20242E] xl:px-4 ${SITE_FOCUS}`;
const NAV_ACTIVE = "bg-[#FDE9DD] text-[#20242E] ring-1 ring-[#F6CFB8]";

type OpenMenu = string | null;

export function MainNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname() || "/";
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenus = useCallback(() => setOpenMenu(null), []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) closeMenus();
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenus();
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [closeMenus]);

  return (
    <nav ref={navRef} className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary navigation">
      <Link
        href={HOME_NAV_LINK.href}
        onClick={onNavigate}
        aria-current={navLinkActive(path, HOME_NAV_LINK.href) ? "page" : undefined}
        className={cn(NAV_LINK, navLinkActive(path, HOME_NAV_LINK.href) && NAV_ACTIVE)}
      >
        {HOME_NAV_LINK.label}
      </Link>
      {MAIN_NAV_GROUPS.map((group) => {
        const menuId = `nav-menu-${group.label.replace(/\s+/g, "-").toLowerCase()}`;
        const active = navGroupActive(path, group);
        const isOpen = openMenu === group.label;
        const singleItem = group.items.length === 1 && group.items[0]?.href === group.href;

        if (singleItem) {
          const item = group.items[0]!;
          return (
            <Link
              key={group.label}
              href={item.href}
              onClick={onNavigate}
              aria-current={navLinkActive(path, item.href) ? "page" : undefined}
              className={cn(NAV_LINK, active && NAV_ACTIVE)}
            >
              {group.label}
            </Link>
          );
        }

        return (
          <div key={group.label} className="relative">
            <button
              type="button"
              className={cn(NAV_LINK, "inline-flex items-center gap-1", active && NAV_ACTIVE)}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={menuId}
              onClick={() => setOpenMenu(isOpen ? null : group.label)}
            >
              {group.label}
              <svg viewBox="0 0 20 20" className="h-4 w-4 opacity-70" aria-hidden fill="currentColor">
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" />
              </svg>
            </button>

            {isOpen ? (
              <div
                id={menuId}
                className="absolute left-0 top-[calc(100%+0.35rem)] z-50 min-w-[15rem] rounded-2xl border border-[#EFE5DA] bg-white p-2 shadow-lg"
                role="menu"
              >
                {group.items.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    role="menuitem"
                    onClick={() => {
                      closeMenus();
                      onNavigate?.();
                    }}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-[#FAF4ED]",
                      navLinkActive(path, item.href) ? "bg-[#FDE9DD] font-semibold text-[#20242E]" : "text-[#4A5263]",
                      SITE_FOCUS,
                    )}
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.description ? (
                      <span className="mt-0.5 block text-xs leading-5 text-[#76808F]">{item.description}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
