import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_FOCUS } from "@/components/home/home-theme";

const PATHWAYS = [
  {
    title: "Guides",
    body: "Plain-English disability guidance on rights, access, support and adjustments.",
    cta: "Browse guides",
    href: "/advice",
  },
  {
    title: "Help cards",
    body: "Ready-to-use wording, checklists and cards for conversations that matter.",
    cta: "Open help cards",
    href: "/help-cards",
  },
  {
    title: "Tools",
    body: "Planning aids and AI-assisted drafts that support evidence — never replace it.",
    cta: "Use tools",
    href: "/ai-toolkit",
  },
] as const;

/** Consolidated secondary pathways — Guides, Help cards, Tools. */
export function HomeSecondaryPathways() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-canvas)] py-14 sm:py-16" aria-labelledby="secondary-pathways-heading">
      <PageContainer>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Also on Access Stamp</p>
          <h2
            id="secondary-pathways-heading"
            className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl"
          >
            Guides, help cards and tools
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
            After checking a venue, use these quieter pathways for advice, wording and planning support.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {PATHWAYS.map((pathway) => (
            <li key={pathway.title}>
              <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <h3 className="text-lg font-semibold text-[var(--color-ink)]">{pathway.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[var(--color-text-muted)]">{pathway.body}</p>
                <Link
                  href={pathway.href}
                  className={`mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}
                >
                  {pathway.cta}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
