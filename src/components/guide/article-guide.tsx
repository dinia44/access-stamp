import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { GuideOverview } from "@/components/guide/guide-overview";

export function ArticleGuide({ article }: { article: AdviceArticle }) {
  const headings = article.sections.flatMap((section, index) =>
    section.type === "h2" ? [{ title: section.text, id: `section-${index}` }] : [],
  );
  const spoken = article.sections
    .map((section) =>
      "text" in section
        ? section.text
        : section.type === "ul"
          ? section.items.join(". ")
          : section.type === "callout"
            ? section.body
            : "",
    )
    .join(". ");
  const summary = article.quickAnswer
    ? [article.quickAnswer]
    : article.excerpt
      ? [article.excerpt]
      : [];

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <GuideOverview
        article={article}
        title={article.title}
        subtitle={article.excerpt}
        summary={summary}
        actions={article.firstThreeActions ?? []}
        readText={`${article.title}. ${spoken}`}
      />

      {headings.length ? (
        <nav
          aria-label="On this page"
          className="sticky top-20 z-20 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur lg:top-24"
        >
          <details>
            <summary className="min-h-11 cursor-pointer py-2 font-semibold text-[var(--color-ink)]">
              On this page
            </summary>
            <ul className="border-t border-[var(--color-border)] pt-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
                    href={`#${heading.id}`}
                  >
                    {heading.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      ) : null}

      <div className="space-y-7 text-[var(--color-ink)]">
        {article.sections.map((section, index) => {
          if (section.type === "h2") {
            return (
              <h2
                key={index}
                id={`section-${index}`}
                className="scroll-mt-44 pt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] sm:text-3xl"
              >
                {section.text}
              </h2>
            );
          }
          if (section.type === "p") {
            return (
              <p key={index} className="text-base leading-8 text-[var(--color-text)]">
                {section.text}
              </p>
            );
          }
          if (section.type === "ul") {
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 text-base leading-7 text-[var(--color-text)] marker:text-[var(--color-brand)]">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          }
          if (section.type === "pre") {
            return (
              <pre
                key={index}
                className="whitespace-pre-wrap break-words rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 font-sans text-sm leading-7"
              >
                {section.text}
              </pre>
            );
          }
          if (section.type === "links") {
            return (
              <section key={index} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--color-ink)]">Official sources and useful links</h2>
                <ul className="mt-3 space-y-1">
                  {section.items.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-11 items-center font-semibold text-[var(--color-brand)] hover:underline"
                      >
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }
          return (
            <aside
              key={index}
              className="rounded-r-[var(--radius-lg)] border-l-4 border-[var(--color-brand)] bg-[var(--color-brand-soft)] px-5 py-4"
            >
              <h3 className="font-semibold text-[var(--color-ink)]">{section.title}</h3>
              <p className="mt-2 leading-7 text-[var(--color-text)]">{section.body}</p>
            </aside>
          );
        })}
      </div>

      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Personal support</p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">
            Make this guide relevant to you
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
            Tell Access Stamp what is happening and get the relevant next steps without rereading the whole guide.
          </p>
        </div>
        <Link
          href={`/ask?guide=${encodeURIComponent(article.slug)}`}
          className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] sm:mt-0"
        >
          Make this relevant to me →
        </Link>
      </section>
    </article>
  );
}
