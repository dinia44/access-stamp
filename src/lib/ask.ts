import type { AdviceArticle, AdviceNation } from "@/lib/content/types";

export type AskSource = {
  slug: string;
  title: string;
  href: string;
  reviewed: string;
  excerpt: string;
  actions: string[];
  sections: string[];
  officialLinks: { label: string; href: string }[];
};
export type AskPlan = {
  summary: string;
  steps: { text: string; sourceSlug: string }[];
  unknowns: string[];
};
export type AskResult = {
  plan: AskPlan;
  sources: AskSource[];
  mode: "personalised" | "guide-extracts";
  tools: { label: string; href: string }[];
};
const STOP = new Set(
  "i am a an the and or my me for to of with in is it can how what need help please have has do that this want about would should could".split(
    " ",
  ),
);
export const ASK_NATIONS: AdviceNation[] = [
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
];

export function retrieveAskSources(
  articles: AdviceArticle[],
  situation: string,
  nation: AdviceNation,
  guideSlug?: string,
): AskSource[] {
  const tokens = [
    ...new Set(situation.toLowerCase().match(/[a-z0-9]+/g) ?? []),
  ].filter((t) => t.length > 2 && !STOP.has(t));
  return articles
    .filter(
      (a) =>
        (!a.editorialStatus || a.editorialStatus === "published") &&
        Boolean(a.lastReviewed || a.updated) &&
        (!a.nations || a.nations === "UK-wide" || a.nations.includes(nation)),
    )
    .map((a) => {
      const title =
        `${a.title} ${a.tags.join(" ")} ${a.categorySlug}`.toLowerCase();
      const body = JSON.stringify(a.sections).toLowerCase();
      const score =
        tokens.reduce(
          (n, t) => n + (title.includes(t) ? 3 : body.includes(t) ? 1 : 0),
          0,
        ) + (a.slug === guideSlug ? 100 : 0);
      return { a, score };
    })
    .filter((x) => x.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ a }) => ({
      slug: a.slug,
      title: a.title,
      href: `/advice/${a.slug}`,
      reviewed: a.lastReviewed ?? a.updated,
      excerpt: a.quickAnswer ?? a.excerpt ?? a.title,
      actions: a.firstThreeActions?.slice(0, 3) ?? [],
      sections: a.sections
        .map((s) =>
          "text" in s
            ? s.text
            : s.type === "ul"
              ? s.items.join("; ")
              : s.type === "callout"
                ? `${s.title}: ${s.body}`
                : "",
        )
        .filter(Boolean)
        .slice(0, 16),
      officialLinks: a.sections
        .flatMap((s) => (s.type === "links" ? s.items : []))
        .filter((l) => /^https:\/\//.test(l.href)),
    }));
}

export function guideExtractPlan(sources: AskSource[]): AskPlan {
  return {
    summary: sources.length
      ? "These guide extracts are a starting point. Check which steps apply to your situation."
      : "We could not find a sufficiently relevant guide for this request. Try naming the decision, service or access problem.",
    steps: sources
      .flatMap((s) =>
        (s.actions.length ? s.actions : [s.excerpt]).map((text) => ({
          text,
          sourceSlug: s.slug,
        })),
      )
      .slice(0, 6),
    unknowns: [
      "We have not checked your documents, eligibility or any deadline. Confirm those details with the official source.",
      "Information may differ across UK nations and individual circumstances.",
    ],
  };
}

export function validAskPlan(
  value: unknown,
  sources: AskSource[],
): value is AskPlan {
  if (!value || typeof value !== "object") return false;
  const p = value as AskPlan;
  return (
    typeof p.summary === "string" &&
    p.summary.trim().length > 0 &&
    p.summary.length < 3000 &&
    Array.isArray(p.steps) &&
    p.steps.length > 0 &&
    p.steps.length <= 8 &&
    p.steps.every(
      (s) =>
        s &&
        typeof s.text === "string" &&
        s.text.trim().length > 0 &&
        s.text.length < 3000 &&
        sources.some((source) => source.slug === s.sourceSlug),
    ) &&
    Array.isArray(p.unknowns) &&
    p.unknowns.length <= 8 &&
    p.unknowns.every((x) => typeof x === "string" && x.length < 2000)
  );
}
