import type { ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { GuideDownloadResource, GuideTocItem } from "@/lib/guide-resources";
import { slugifyHeading } from "@/lib/guide-resources";
import { cn } from "@/lib/utils";

type GuideFullGuideContentProps = {
  markdown: string;
  toc: GuideTocItem[];
  downloads: GuideDownloadResource[];
  backHref: string;
  readAloudSlot?: ReactNode;
  toolbarSlot?: ReactNode;
};

function headingId(text: string) {
  return slugifyHeading(text.replace(/\*\*/g, ""));
}

export function GuideFullGuideContent({
  markdown,
  toc,
  downloads,
  backHref,
  readAloudSlot,
  toolbarSlot,
}: GuideFullGuideContentProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href={backHref}
        className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#59682A] transition-colors hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
      >
        ← Back to step-by-step guide
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Table of contents" className="rounded-2xl border border-[#F1D8C7] bg-white p-4 shadow-[var(--shadow-soft)]">
            <h2 className="text-xs font-bold uppercase tracking-wide text-muted">Contents</h2>
            <ol className="mt-3 space-y-1.5 text-sm">
              {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-[44px] items-center font-semibold text-[#59682A] hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article lang="en-GB" className="min-w-0">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {toolbarSlot}
            {readAloudSlot ? (
              <div id="read-aloud" className="rounded-2xl border border-[#F1D8C7] bg-white p-4 shadow-[var(--shadow-soft)]">
                <h2 className="text-sm font-bold text-heading">Read aloud</h2>
                <div className="mt-3">{readAloudSlot}</div>
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "rounded-2xl border border-[#F1D8C7] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8",
              "prose prose-neutral max-w-none",
              "prose-headings:font-[var(--font-heading)] prose-headings:tracking-[-0.02em] prose-headings:text-heading",
              "prose-p:text-text prose-p:leading-7 prose-li:text-text",
              "prose-a:font-semibold prose-a:text-[#59682A] hover:prose-a:text-[#F04A16]",
              "prose-strong:text-heading",
              "prose-blockquote:border-[#F04A16] prose-blockquote:bg-[#FFF8F1] prose-blockquote:not-italic prose-blockquote:text-muted",
              "prose-table:text-sm",
            )}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => {
                  const text = String(children);
                  return (
                    <h1 id={headingId(text)} className="text-3xl font-bold sm:text-4xl">
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const text = String(children);
                  return (
                    <h2 id={headingId(text)} className="mt-10 scroll-mt-24 text-2xl font-bold first:mt-0">
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const text = String(children);
                  return (
                    <h3 id={headingId(text)} className="mt-8 scroll-mt-24 text-xl font-bold">
                      {children}
                    </h3>
                  );
                },
                a: ({ href, children }) => {
                  const external = href?.startsWith("http");
                  if (external) {
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    );
                  }
                  return <Link href={href ?? "#"}>{children}</Link>;
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>

          <section className="mt-8 rounded-2xl border border-[#F1D8C7] bg-white p-5 shadow-[var(--shadow-soft)]" aria-labelledby="downloads-heading">
            <h2 id="downloads-heading" className="text-sm font-bold text-heading">
              Download templates
            </h2>
            <ul className="mt-3 space-y-2">
              {downloads.map((d) => (
                <li key={d.id}>
                  <a
                    href={d.file}
                    download={d.filename}
                    className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#59682A] hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
                  >
                    Download {d.title} (DOCX) ↓
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-6 text-xs leading-5 text-muted">
            This guide is general information, not legal advice. Check official guidance or get specialist advice for
            your situation.
          </p>
        </article>
      </div>
    </div>
  );
}
