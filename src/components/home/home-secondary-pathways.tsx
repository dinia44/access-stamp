"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { track } from "@/lib/analytics";

const PATHWAYS = [
  {
    title: "Guides",
    body: "Understand rights, access, and available support.",
    cta: "Browse guides",
    href: "/advice",
    category: "guides",
  },
  {
    title: "Help cards",
    body: "Prepare wording and checklists for important conversations.",
    cta: "Open help cards",
    href: "/help-cards",
    category: "help_cards",
  },
  {
    title: "Planning tools",
    body: "Work through a practical access situation, including optional drafting support.",
    cta: "Open planning tools",
    href: "/ai-toolkit",
    category: "planning_tools",
  },
] as const;

export function HomeSecondaryPathways() {
  return (
    <section
      id="more-help"
      className="scroll-mt-28 border-t border-[var(--color-border)] bg-[var(--color-canvas)] py-12 sm:py-14"
      aria-labelledby="secondary-pathways-heading"
    >
      <PageContainer>
        <div className="max-w-2xl">
          <h2
            id="secondary-pathways-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl"
          >
            More help when you need it
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
            After checking a venue, use practical guidance, ready-to-use wording, and planning tools for what happens
            next.
          </p>
        </div>

        <ul className="mt-6 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {PATHWAYS.map((pathway) => (
            <li key={pathway.title} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-ink)]">{pathway.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">{pathway.body}</p>
              </div>
              <Link
                href={pathway.href}
                onClick={() => track("homepage_resource_selected", { source: "homepage", category: pathway.category })}
                className={`inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}
              >
                {pathway.cta}
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
