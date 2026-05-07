"use client";

import Image from "next/image";
import Link from "next/link";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import { useMemo, useState } from "react";
import type { AdviceArticle } from "@/lib/mock-data";
import { useChat } from "@/components/chat/provider";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { cn } from "@/lib/utils";
import "./education-guides-editorial.css";

const egDisplay = Newsreader({
  subsets: ["latin"],
  variable: "--font-eg-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const egMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-eg-mono",
  weight: ["400", "500"],
  display: "swap",
});

type ArticleLite = Pick<AdviceArticle, "slug" | "title" | "updated" | "tags" | "heroImage"> & {
  categorySlug: AdviceArticle["categorySlug"];
};

type ReadingTone = "default" | "warm" | "crisp";

const READING_TONES: Array<{ id: ReadingTone; label: string; hint: string }> = [
  { id: "default", label: "Default", hint: "Site colours" },
  { id: "warm", label: "Warm paper", hint: "More amber, prototype stone-clay feel" },
  { id: "crisp", label: "Crisp", hint: "Cooler band, stronger rules (oat-ink–style)" },
];

/** Featured picks — common entry points (matches earlier education hub). */
const FEATURED_SLUGS = [
  "dsa-disabled-students-allowance",
  "ehc-plan-basics",
  "reasonable-adjustments-at-school",
  "university-support-plan",
] as const;

const START_HERE = [
  "Write down what learning, travel, fatigue, pain, communication, or care barriers affect education.",
  "Ask what support is already recorded and who owns the plan.",
  "Get decisions in writing after meetings, even if you send the summary yourself.",
  "Separate urgent access needs from longer-term funding or assessment processes.",
] as const;

const OTHER_HUBS = [
  { href: "/advice/rights", label: "Rights & benefits" },
  { href: "/advice/workplace", label: "Workplace" },
  { href: "/advice/transport", label: "Transport" },
  { href: "/advice/new-to-disability", label: "New to disability" },
] as const;

const PATHWAYS: Array<{
  num: string;
  title: string;
  description: string;
  bullets: Array<{ label: string; slug: string; code: string }>;
}> = [
  {
    num: "01",
    title: "School & college",
    description:
      "EHC plans, reasonable adjustments, transport, and what to ask for in meetings — aligned with the guides we publish today.",
    bullets: [
      { label: "EHC plans: the basics for families", slug: "ehc-plan-basics", code: "EHCP" },
      { label: "Reasonable adjustments at school and college", slug: "reasonable-adjustments-at-school", code: "Adjustments" },
      { label: "Transport to school, college, or university", slug: "transport-to-education", code: "Transport" },
    ],
  },
  {
    num: "02",
    title: "University",
    description:
      "DSA, disability services support plans, and the bridge between funding and day-to-day arrangements on campus.",
    bullets: [
      { label: "Disabled Students' Allowance: what it can fund", slug: "dsa-disabled-students-allowance", code: "DSA" },
      { label: "University support plans: what to ask for", slug: "university-support-plan", code: "Support" },
      { label: "Transport to school, college, or university", slug: "transport-to-education", code: "Travel" },
    ],
  },
  {
    num: "03",
    title: "Exams & assessments",
    description:
      "Extra time, rest breaks, rooms, assistive tech, and evidence — framed around exam access arrangements.",
    bullets: [{ label: "Exam access arrangements", slug: "exam-access-arrangements", code: "Exams" }],
  },
];

function filterBullets(
  bullets: Array<{ label: string; slug: string; code: string }>,
  slugs: Set<string>,
) {
  return bullets.filter((b) => slugs.has(b.slug));
}

function uniqBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function Eyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.08em] text-muted"
      style={{ fontFamily: "var(--font-eg-mono), ui-monospace, monospace" }}
    >
      <span className="eg-eyebrow-dot" aria-hidden />
      <span className="font-medium text-[var(--eg-accent-deep)]">{num}</span>
      <span>{label}</span>
    </div>
  );
}

function AskEducationAiButton({ className }: { className?: string }) {
  const { openChat } = useChat();
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        openChat({
          prefill: "I need help with education support (school, college, or university). ",
        })
      }
    >
      Ask Access Stamp AI
    </button>
  );
}

export function EducationGuidesLanding({ articles }: { articles: ArticleLite[] }) {
  const [query, setQuery] = useState("");
  const [readingTone, setReadingTone] = useState<ReadingTone>("default");
  const slugSet = useMemo(() => new Set(articles.map((a) => a.slug)), [articles]);

  const featuredArticles = useMemo(() => {
    return FEATURED_SLUGS.map((slug) => articles.find((a) => a.slug === slug)).filter(
      (a): a is ArticleLite => Boolean(a),
    );
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [articles, query]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => (a.updated < b.updated ? 1 : -1)),
    [filtered],
  );

  const lastUpdated =
    articles.length > 0
      ? [...articles].sort((a, b) => (a.updated < b.updated ? 1 : -1))[0]!.updated
      : "";

  const fmtDate = (iso: string) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className={cn(egDisplay.variable, egMono.variable, "education-guides-editorial text-text")}
      {...(readingTone !== "default" ? { "data-education-tone": readingTone } : {})}
    >
      {/* Hero — matches Landing.html scale & plate */}
      <section
        className="pb-[clamp(3rem,7vw,5.5rem)] pt-[clamp(1.5rem,4vw,3rem)]"
        aria-labelledby="education-guides-heading"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
          <div>
            <Eyebrow num="03" label="Education" />
            <h1 id="education-guides-heading" className="eg-hero-title">
              Plain-English guides for <em>navigating school, college & university</em> when you&apos;re disabled.
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-[clamp(17px,1.4vw,19px)] leading-[1.55] text-text">
              Written for disabled students, parents, and advisors. No jargon, no run-around — just the steps, the people, and
              the phrases that work. Read what you need, skip what you don&apos;t.
            </p>

            {/* Reading comfort — palette-style control inspired by tweaks-app.jsx */}
            <div
              className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              role="radiogroup"
              aria-label="Reading comfort for this page"
            >
              <span
                className="text-[11px] uppercase tracking-[0.08em] text-muted"
                style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                id="education-tone-label"
              >
                Reading comfort
              </span>
              <div className="flex flex-wrap gap-2" aria-labelledby="education-tone-label">
                {READING_TONES.map((t) => {
                  const selected = readingTone === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      title={t.hint}
                      onClick={() => setReadingTone(t.id)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
                        selected
                          ? "border-amber bg-amber-pale text-[var(--eg-accent-deep)]"
                          : "border-border bg-background text-muted hover:border-heading hover:text-heading",
                      )}
                      style={{ fontFamily: "var(--font-body), sans-serif" }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#education-guide-index"
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-heading bg-heading px-[22px] text-[15px] font-medium text-background transition hover:border-[var(--eg-accent-deep)] hover:bg-[var(--eg-accent-deep)]"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                Browse the guides
                <span className="translate-y-px" aria-hidden>
                  →
                </span>
              </a>
              <a
                href="#education-pathways"
                className="inline-flex h-12 items-center rounded-full border border-heading bg-transparent px-[22px] text-[15px] font-medium text-heading transition hover:bg-heading hover:text-background"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                See the three pathways
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 border-t border-border pt-6 text-[13.5px] text-text">
              <div>
                <span
                  className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-muted"
                  style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                >
                  Volume
                </span>
                <strong className="font-semibold text-heading">Education</strong>
              </div>
              <div>
                <span
                  className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-muted"
                  style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                >
                  Guides in this section
                </span>
                <strong className="font-semibold text-heading">{articles.length} published</strong>
              </div>
              <div>
                <span
                  className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-muted"
                  style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                >
                  Tone
                </span>
                <strong className="font-semibold text-heading">Plain English · UK-focused</strong>
              </div>
              <div>
                <span
                  className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-muted"
                  style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                >
                  Last updated
                </span>
                <strong className="font-semibold text-heading">{lastUpdated ? fmtDate(lastUpdated) : "—"}</strong>
              </div>
            </div>
          </div>

          <aside aria-label="Section illustration" className="flex flex-col gap-7">
            <div className="eg-plate" role="img" aria-label="Education guides — editorial plate graphic">
              <span className="eg-plate-tag">Plate 01</span>
              <div className="eg-plate-cap">
                <span className="eg-plate-cap-l">/photography placeholder</span>
                <span className="eg-plate-cap-r hidden sm:inline">
                  edu.section.cover.jpg&nbsp;·&nbsp;1600×2000
                </span>
              </div>
            </div>
            <div
              className="flex flex-wrap gap-1.5 text-[13px] text-muted"
              style={{ fontFamily: "var(--font-eg-mono), monospace", letterSpacing: "0.04em" }}
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition hover:text-heading">
                Access Stamp
              </Link>
              <span className="text-border" aria-hidden>
                /
              </span>
              <Link href="/advice" className="transition hover:text-heading">
                Advice
              </Link>
              <span className="text-border" aria-hidden>
                /
              </span>
              <span className="text-heading">Education</span>
            </div>
          </aside>
        </div>
      </section>

      <hr className="border-0 border-t border-border" />

      {/* Featured + Start here — hybrid of your HTML index density + old Card strip */}
      <section className="py-10 md:py-12" aria-labelledby="education-featured-heading">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <h2
              id="education-featured-heading"
              className="text-[11px] uppercase tracking-[0.08em] text-muted"
              style={{ fontFamily: "var(--font-eg-mono), monospace" }}
            >
              Common starting points
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/advice/${a.slug}`}
                  className="inline-flex max-w-full items-center rounded-full border border-[var(--eg-rule)] bg-card px-3.5 py-2 text-[13px] font-medium text-heading transition hover:border-[var(--eg-accent-deep)] hover:text-[var(--eg-accent-deep)]"
                >
                  <span className="line-clamp-2">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-[var(--eg-rule)] bg-card/80 p-5 shadow-[var(--shadow-soft)]">
            <h3
              className="text-[11px] uppercase tracking-[0.08em] text-muted"
              style={{ fontFamily: "var(--font-eg-mono), monospace" }}
            >
              Start here
            </h3>
            <ol className="mt-4 space-y-3 text-[14.5px] leading-snug text-text">
              {START_HERE.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-0.5 shrink-0 font-medium tabular-nums text-[var(--eg-accent-deep)]"
                    style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                  >
                    {index + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <hr className="border-0 border-t border-border" />

      {/* Pathways — full-height columns, 1px gutters, prototype hover */}
      <section id="education-pathways" className="scroll-mt-24 py-[clamp(3.5rem,8vw,6.5rem)]">
        <div className="eg-section-head mb-[clamp(2.25rem,5vw,3.5rem)] grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div>
            <Eyebrow num="03.1" label="Pathways" />
            <h2>
              Start where <em>you are.</em>
            </h2>
          </div>
          <p className="m-0 max-w-[58ch] text-pretty text-[17px] leading-[1.55] text-text">
            Three rough stages of education, each with the questions that come up most. Pick the one that fits today — you
            can move between them whenever you need.
          </p>
        </div>

        <div className="grid gap-px border-y border-border bg-border md:grid-cols-3">
          {PATHWAYS.map((p) => {
            const bullets = uniqBySlug(filterBullets(p.bullets, slugSet));
            return (
              <article
                id={`education-pathway-${p.num}`}
                key={p.num}
                className="eg-path-cell group/path flex flex-col gap-[18px] bg-background px-5 py-6 pb-[clamp(1.75rem,3vw,2.5rem)] pt-6 md:px-8 md:pt-9"
              >
                <span
                  className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--eg-accent)]"
                  style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                >
                  Pathway {p.num}
                </span>
                <h3 className="eg-path-title">{p.title}</h3>
                <p className="m-0 max-w-[36ch] text-[15.5px] leading-relaxed text-text">{p.description}</p>
                <ul className="mt-1 flex list-none flex-col border-t border-[var(--eg-rule-soft)] p-0">
                  {bullets.map((b) => (
                    <li
                      key={b.slug}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--eg-rule-soft)] py-3 text-[14.5px] last:border-b-0"
                    >
                      <Link href={`/advice/${b.slug}`} className="font-medium text-heading underline-offset-2 hover:text-[var(--eg-accent-deep)] hover:underline">
                        {b.label}
                      </Link>
                      <span
                        className="shrink-0 text-[11px] uppercase tracking-[0.04em] text-muted"
                        style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                      >
                        {b.code}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#education-guide-index"
                  className="mt-3 inline-flex items-center gap-2 text-[14.5px] font-medium text-[var(--eg-accent-deep)] after:inline-block after:transition-transform after:duration-200 after:content-['→'] group-hover/path:after:translate-x-1"
                >
                  Open the full index
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Search / tools — editorial strip (not a generic card) */}
      <section
        className="border-y border-border bg-card px-4 py-5 sm:px-6"
        aria-label="Search and tools"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <label className="block min-w-0 flex-1">
            <span
              className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-muted"
              style={{ fontFamily: "var(--font-eg-mono), monospace" }}
            >
              Filter this section
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full max-w-xl rounded-sm border border-border bg-background px-3 text-[15px] text-heading shadow-none outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
              placeholder="Type a topic — DSA, EHC, exams, transport…"
              aria-describedby={query ? "education-filter-hint" : undefined}
            />
            {query ? (
              <p id="education-filter-hint" className="mt-2 text-[13px] text-muted">
                {sorted.length === 0 ? (
                  <>No guides match. Try another word or </>
                ) : (
                  <>
                    {sorted.length} result{sorted.length === 1 ? "" : "s"}.{" "}
                  </>
                )}
                <button
                  type="button"
                  className="font-semibold text-blue underline-offset-2 hover:underline"
                  onClick={() => setQuery("")}
                >
                  clear filter
                </button>
              </p>
            ) : null}
          </label>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <AskEducationAiButton className="inline-flex h-12 items-center justify-center rounded-sm border border-transparent bg-blue px-5 text-sm font-semibold text-white transition hover:bg-[#1a62ad]" />
            <Link
              href="/laws-guidance"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-heading px-5 text-sm font-medium text-heading transition hover:bg-heading hover:text-background"
            >
              Laws & guidance
            </Link>
          </div>
        </div>
      </section>

      {/* Index — warm band, table-like rows */}
      <section
        id="education-guide-index"
        className="eg-index-section scroll-mt-24 py-[clamp(3.5rem,8vw,6.5rem)]"
      >
        <div className="eg-section-head mb-[clamp(2.25rem,5vw,3.5rem)] grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div>
            <Eyebrow num="03.2" label="Index" />
            <h2>
              Every guide in <em>this section.</em>
            </h2>
          </div>
          <p className="m-0 max-w-[58ch] text-pretty text-[17px] leading-[1.55] text-text">
            Plain-language and recently reviewed. Tags show where each guide fits — jump in whether you have a meeting tomorrow
            or a decision months away.
          </p>
        </div>

        <div role="list">
          {sorted.length === 0 ? (
            <div
              className="rounded-sm border border-dashed border-border bg-background/80 px-6 py-14 text-center"
              role="status"
            >
              <p className="eg-path-title text-xl text-heading">No guides match &ldquo;{query.trim()}&rdquo;</p>
              <p className="mt-2 text-[15px] text-muted">Try a shorter word or browse the pathways above.</p>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-heading bg-heading px-5 py-2.5 text-sm font-medium text-background transition hover:bg-[var(--eg-accent-deep)]"
                onClick={() => setQuery("")}
              >
                Show all {articles.length} guides
              </button>
            </div>
          ) : null}
          {sorted.map((a, i) => {
            const thumb = getAdviceArticleCardImage(a);
            return (
            <Link key={a.slug} href={`/advice/${a.slug}`} className="eg-index-row group/row" role="listitem">
              <span
                className="eg-index-num text-xs tracking-[0.04em] text-muted"
                style={{ fontFamily: "var(--font-eg-mono), monospace" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="eg-index-title-wrap flex min-w-0 gap-3 sm:items-center">
                <span className="relative hidden h-14 w-[5.5rem] shrink-0 overflow-hidden rounded-sm bg-background-2 sm:block">
                  <Image
                    src={thumb.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="88px"
                  />
                </span>
                <span className="eg-index-title min-w-0 text-heading transition-colors duration-200">{a.title}</span>
              </span>
              <div className="eg-index-topics flex flex-wrap gap-1.5">
                {a.tags.slice(0, 4).map((tag, ti) => (
                  <span
                    key={tag}
                    className={cn(
                      "inline-flex h-6 items-center rounded-full border px-2.5 text-[11px] uppercase tracking-[0.04em]",
                      ti === 0 && "border-amber bg-background text-[var(--eg-accent-deep)]",
                      ti === 1 && "border-blue/35 bg-background text-blue",
                      ti > 1 && "border-border bg-background text-muted",
                    )}
                    style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="eg-index-updated whitespace-nowrap text-xs tracking-[0.02em] text-muted"
                style={{ fontFamily: "var(--font-eg-mono), monospace" }}
              >
                Updated {fmtDate(a.updated)}
              </span>
              <span
                className="eg-index-arrow text-right text-sm text-muted transition duration-200"
                style={{ fontFamily: "var(--font-eg-mono), monospace" }}
                aria-hidden
              >
                →
              </span>
            </Link>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-2 text-sm text-text">
          <span
            className="text-[12px] uppercase tracking-[0.06em] text-muted"
            style={{ fontFamily: "var(--font-eg-mono), monospace" }}
          >
            Showing {sorted.length} of {articles.length} guides
          </span>
          <Link
            href="/advice"
            className="inline-flex items-center gap-2 border-b border-heading pb-0.5 text-[15px] font-medium text-heading transition hover:border-[var(--eg-accent-deep)] hover:text-[var(--eg-accent-deep)]"
          >
            All advice categories <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Pull quote — Newsreader italic, narrow measure */}
      <section className="py-[clamp(4.5rem,9vw,7.5rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-[clamp(1.75rem,4vw,4rem)]">
          <div>
            <Eyebrow num="03.3" label="From a reader" />
            <p
              className="mt-5 text-[12px] uppercase tracking-[0.04em] text-muted"
              style={{ fontFamily: "var(--font-eg-mono), monospace" }}
            >
              Iris · 2nd year, History
            </p>
          </div>
          <p className="eg-quote m-0">
            I read three pages and finally knew what to ask for. The meeting actually went somewhere.
          </p>
        </div>
      </section>

      {/* Editorial footer strip — Landing.html-style lockup + columns (in-page only) */}
      <footer className="eg-editorial-footer" aria-labelledby="education-hub-footer-heading">
        <h2 id="education-hub-footer-heading" className="sr-only">
          More on Access Stamp
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="eg-footer-lockup">Access Stamp</p>
            <p className="eg-footer-blurb">
              Practical guidance for disabled people, carers, and families in the UK. Education is one section alongside
              rights, work, transport, and more.
            </p>
          </div>
          <div>
            <h3>Volumes</h3>
            <ul>
              <li>
                <span className="text-white" aria-current="page">
                  Education
                </span>
              </li>
              {OTHER_HUBS.map((hub) => (
                <li key={hub.href}>
                  <Link href={hub.href}>{hub.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Pathways</h3>
            <ul>
              <li>
                <a href="#education-pathway-01">School & college</a>
              </li>
              <li>
                <a href="#education-pathway-02">University</a>
              </li>
              <li>
                <a href="#education-pathway-03">Exams & assessments</a>
              </li>
              <li>
                <Link href="/advice">All advice categories</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>
              <li>
                <Link href="/about">About Access Stamp</Link>
              </li>
              <li>
                <Link href="/laws-guidance">Laws & guidance</Link>
              </li>
              <li>
                <Link href="/legal/privacy">Privacy</Link>
              </li>
              <li>
                <AskEducationAiButton className="text-left underline-offset-2 hover:underline" />
              </li>
            </ul>
          </div>
        </div>
        <div className="eg-editorial-footer-base">
          <span>© {new Date().getFullYear()} Access Stamp</span>
          <span>Plain English · UK-focused</span>
          <span>Made with disabled students &amp; families in mind</span>
        </div>
      </footer>
    </div>
  );
}
