"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { RESOURCE_NAV_GROUPS, resourceNavItemActive, resourcesNavActive } from "@/lib/navigation";
import { track } from "@/lib/analytics";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const TRIGGER =
  `relative px-1 py-2 text-sm font-medium text-[#4A5263] transition-colors hover:text-[#20242E] ${SITE_FOCUS}`;
const TRIGGER_ACTIVE =
  "font-semibold text-[#20242E] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-[#EF5B25]/75";

export function ResourcesMenu() {
  const path = usePathname() || "/";
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const active = resourcesNavActive(path);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  function toggle() {
    setOpen((current) => {
      const next = !current;
      if (next) track("resources_menu_opened", { source: "header" });
      return next;
    });
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={cn(TRIGGER, (open || active) && TRIGGER_ACTIVE)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={toggle}
      >
        Resources
      </button>
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-label="Resources"
          className="absolute left-1/2 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-[#EFE5DA] bg-[var(--color-canvas)] p-4 shadow-[0_16px_40px_-24px_rgba(19,32,31,0.35)]"
        >
          <div className="grid gap-5">
            {RESOURCE_NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                  {group.label}
                </p>
                {group.description ? (
                  <p className="mt-1 text-xs leading-5 text-[#5E6A66]">{group.description}</p>
                ) : null}
                <ul className="mt-2 grid gap-1">
                  {group.items.map((item) => {
                    const itemActive = resourceNavItemActive(path, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-label={item.label}
                          aria-current={itemActive ? "page" : undefined}
                          onClick={() => {
                            track("homepage_resource_selected", {
                              source: "header",
                              category: item.label.toLowerCase().replace(/\s+/g, "_"),
                            });
                            setOpen(false);
                          }}
                          className={cn(
                            "block rounded-xl px-3 py-2.5 text-sm text-[#20242E] transition hover:bg-[#FAF4ED]",
                            itemActive && "bg-[#FAF4ED] font-semibold",
                            SITE_FOCUS,
                          )}
                        >
                          <span className="font-medium">{item.label}</span>
                          {item.description ? (
                            <span className="mt-0.5 block text-xs font-normal leading-5 text-[#5E6A66]">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
