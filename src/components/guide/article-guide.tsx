import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { GuideReadAloud } from "@/components/guide/guide-read-aloud";
export function ArticleGuide({ article }: { article: AdviceArticle }) {
  const headings = article.sections.flatMap((s, i) =>
    s.type === "h2" ? [{ title: s.text, id: `section-${i}` }] : [],
  );
  const spoken = article.sections
    .map((s) =>
      "text" in s
        ? s.text
        : s.type === "ul"
          ? s.items.join(". ")
          : s.type === "callout"
            ? s.body
            : "",
    )
    .join(". ");
  return (
    <article className="mx-auto max-w-3xl space-y-7 px-4 py-10">
      <Link
        className="inline-flex min-h-11 items-center underline"
        href="/advice"
      >
        All guides
      </Link>
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-muted">
        Reviewed / updated {article.lastReviewed ?? article.updated} ·{" "}
        {Array.isArray(article.nations)
          ? article.nations.join(", ")
          : (article.nations ?? "Check jurisdiction in sources")}{" "}
        ·{" "}
        {article.readTimeMinutes ??
          Math.max(1, Math.ceil(spoken.split(/\s+/).length / 200))}{" "}
        min read
      </p>
      <GuideReadAloud text={`${article.title}. ${spoken}`} compact />
      {article.quickAnswer || article.excerpt ? (
        <section>
          <h2 className="text-xl font-semibold">At a glance</h2>
          <p className="mt-3">{article.quickAnswer ?? article.excerpt}</p>
        </section>
      ) : null}
      <nav
        aria-label="On this page"
        className="sticky top-20 z-20 rounded-xl border border-border bg-background p-3 lg:top-24"
      >
        <details>
          <summary className="min-h-11 cursor-pointer py-2 font-semibold">
            On this page
          </summary>
          <ul>
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  className="inline-flex min-h-11 items-center underline"
                  href={`#${h.id}`}
                >
                  {h.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </nav>
      {article.firstThreeActions?.length ? (
        <section>
          <h2 className="text-xl font-semibold">Start here</h2>
          <ol className="list-decimal space-y-2 pl-5">
            {article.firstThreeActions.slice(0, 3).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        </section>
      ) : null}
      {article.sections.map((s, i) => {
        if (s.type === "h2")
          return (
            <h2
              key={i}
              id={`section-${i}`}
              className="scroll-mt-44 text-2xl font-semibold"
            >
              {s.text}
            </h2>
          );
        if (s.type === "p")
          return (
            <p key={i} className="leading-7">
              {s.text}
            </p>
          );
        if (s.type === "ul")
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {s.items.map((v, j) => (
                <li key={j}>{v}</li>
              ))}
            </ul>
          );
        if (s.type === "pre")
          return (
            <pre
              key={i}
              className="whitespace-pre-wrap break-words rounded-xl bg-background-2 p-4 font-sans text-sm"
            >
              {s.text}
            </pre>
          );
        if (s.type === "links")
          return (
            <ul key={i}>
              {s.items.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          );
        return (
          <aside key={i} className="border-l-4 border-border pl-4">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-2">{s.body}</p>
          </aside>
        );
      })}
      <section className="border-t border-border pt-6">
        <h2 className="text-2xl font-semibold">Make this guide personal</h2>
        <p className="my-3">
          Tell Access Stamp what is happening and we’ll turn this guide into a
          practical plan for your situation.
        </p>
        <Link
          href={`/ask?guide=${article.slug}`}
          className="inline-flex min-h-11 items-center font-semibold underline"
        >
          Personalise this guide →
        </Link>
      </section>
    </article>
  );
}
