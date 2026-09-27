import assert from "node:assert/strict";
import test from "node:test";
import type { AdviceArticle } from "./content/types";
import { guideExtractPlan, retrieveAskSources, validAskPlan } from "./ask";

const article: AdviceArticle = {
  slug: "work-adjustments",
  title: "Reasonable adjustments at work",
  categorySlug: "workplace",
  updated: "2026-06-18",
  lastReviewed: "June 2026",
  nations: ["England"],
  tags: ["work", "desk"],
  editorialStatus: "published",
  excerpt: "Describe the barrier at your desk.",
  firstThreeActions: [
    "Write down the barrier.",
    "Ask your employer about adjustments.",
  ],
  sections: [
    { type: "p", text: "Discuss desk adjustments with your employer." },
  ],
};

test("retrieval respects nation and editorial state, including pinned guides", () => {
  const articles = [
    article,
    { ...article, slug: "draft", editorialStatus: "draft" as const },
    {
      ...article,
      slug: "outdated",
      editorialStatus: "update_required" as const,
    },
  ];
  assert.deepEqual(
    retrieveAskSources(articles, "desk adjustments", "England").map(
      (s) => s.slug,
    ),
    [article.slug],
  );
  assert.deepEqual(
    retrieveAskSources(articles, "desk adjustments", "Wales", article.slug),
    [],
  );
  assert.deepEqual(
    retrieveAskSources(articles, "desk adjustments", "England", "draft").map(
      (s) => s.slug,
    ),
    [article.slug],
  );
});

test("unrelated requests return no invented steps", () => {
  const sources = retrieveAskSources(
    [article],
    "volcanic basalt mineralogy",
    "England",
  );
  assert.deepEqual(sources, []);
  assert.deepEqual(guideExtractPlan(sources).steps, []);
});

test("fallback retains exact guide actions and source provenance", () => {
  const sources = retrieveAskSources([article], "desk adjustments", "England");
  const plan = guideExtractPlan(sources);
  assert.deepEqual(
    plan.steps.map((s) => s.text),
    article.firstThreeActions,
  );
  assert.ok(plan.steps.every((s) => s.sourceSlug === article.slug));
  assert.equal(sources[0].reviewed, "June 2026");
  assert.equal(validAskPlan(plan, sources), true);
});

test("generated plans reject invented citations, blank content and malformed values", () => {
  const sources = retrieveAskSources([article], "desk adjustments", "England");
  const plan = guideExtractPlan(sources);
  for (const invalid of [
    null,
    {},
    { ...plan, summary: " " },
    { ...plan, steps: [] },
    { ...plan, steps: [{ text: "Ask", sourceSlug: "invented" }] },
    { ...plan, steps: [{ text: " ", sourceSlug: article.slug }] },
    { ...plan, unknowns: [null] },
  ]) {
    assert.equal(validAskPlan(invalid, sources), false);
  }
});
