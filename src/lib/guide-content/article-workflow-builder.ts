import type { AdviceArticle, AdviceSection } from "@/lib/content/types";
import { getGuideAiPrompts } from "@/lib/guide-content/guide-ai-prompts";
import {
  GUIDE_OFFICIAL_LINKS_BY_SLUG,
  GUIDE_RELATED_LINKS_BY_SLUG,
} from "@/lib/guide-content/guide-official-links-by-slug";
import type { GuideCopyableTemplate, GuideStep, PracticalGuideWorkflow } from "@/lib/guide-content/types";

const SECTION = {
  who: "Who this applies to",
  available: "What you can ask for or what may be available",
  evidence: "What evidence helps",
  steps: "Step-by-step process",
  mistakes: "Common mistakes to avoid",
  refused: "If you are refused, delayed, or ignored",
  official: "Useful official links",
  related: "Related guides on Access Stamp",
} as const;

type ParsedGuideContent = {
  summary: string;
  who: string[];
  available: string[];
  evidence: string[];
  steps: string[];
  mistakes: string[];
  escalation: string[];
  templates: GuideCopyableTemplate[];
  officialLinks: Array<{ label: string; href: string }>;
  relatedGuides: Array<{ label: string; href: string }>;
  deadlineHint: string | null;
};

function findSectionIndex(sections: AdviceSection[], h2Title: string): number {
  return sections.findIndex((s) => s.type === "h2" && s.text === h2Title);
}

function paragraphAfterH2(sections: AdviceSection[], h2Title: string): string {
  const start = findSectionIndex(sections, h2Title);
  if (start === -1) return "";

  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "p" && section.text.trim()) return section.text.trim();
  }
  return "";
}

function itemsAfterH2(sections: AdviceSection[], h2Title: string): string[] {
  const start = findSectionIndex(sections, h2Title);
  if (start === -1) return [];

  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "ul") return section.items;
    if (section.type === "callout" && h2Title === SECTION.steps) {
      return parseNumberedSteps(section.body);
    }
  }
  return [];
}

function parseNumberedSteps(body: string): string[] {
  return body
    .split(/\n+/)
    .map((line) => line.replace(/^\d+\)\s*/, "").trim())
    .filter(Boolean);
}

function calloutByTitle(sections: AdviceSection[], title: string): string | null {
  const callout = sections.find((s) => s.type === "callout" && s.title === title);
  return callout?.type === "callout" ? callout.body : null;
}

function paragraphAfterDisclaimer(sections: AdviceSection[]): string {
  const disclaimerIdx = sections.findIndex((s) => s.type === "callout" && s.tone === "warning");
  const start = disclaimerIdx === -1 ? 0 : disclaimerIdx + 1;
  for (let i = start; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "p" && section.text.trim()) return section.text.trim();
  }
  return "";
}

function findDeadlineHint(sections: AdviceSection[], summary: string): string | null {
  const haystack = [
    summary,
    ...sections.flatMap((s) => {
      if (s.type === "p" || s.type === "pre") return [s.text];
      if (s.type === "callout") return [s.body];
      if (s.type === "ul") return s.items;
      return [];
    }),
  ]
    .join(" ")
    .toLowerCase();

  if (/deadline|one month|within \d+ days|time limit|must reply|payments? (can |may )?stop/.test(haystack)) {
    return "Deadlines in official letters are usually strict. Note the date immediately and ask for more time in writing if you need it.";
  }
  if (/999|emergency|crisis|unsafe|immediate (danger|risk)/.test(haystack)) {
    return "If you or someone else is in immediate danger, use emergency services first — then come back to this process.";
  }
  return null;
}

/** Collect every copyable template in the article (PIP guides often have one or more). */
function templatesFromSections(sections: AdviceSection[]): GuideCopyableTemplate[] {
  const templates: GuideCopyableTemplate[] = [];

  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") {
      const next = sections[i + 1];
      if (next?.type === "pre" && next.text.trim()) {
        templates.push({
          title: section.text,
          useWhen: "When you need wording you can copy and adapt for email, letter, or conversation.",
          body: next.text.trim(),
        });
      }
    }
  }

  const oneSentence = calloutByTitle(sections, "One sentence you can use");
  if (oneSentence && !templates.some((t) => t.body === oneSentence)) {
    templates.push({
      title: "Example wording you can adapt",
      useWhen: "When contacting a service, council, employer, or provider in writing.",
      body: oneSentence,
    });
  }

  const tip = calloutByTitle(sections, "Access Stamp tip");
  if (tip && !templates.some((t) => t.body === tip)) {
    templates.push({
      title: "How to describe your barrier clearly",
      useWhen: "Before you call, email, or attend an assessment or meeting.",
      body: tip,
    });
  }

  return templates;
}

function officialLinksFromSections(sections: AdviceSection[]) {
  const start = findSectionIndex(sections, SECTION.official);
  if (start === -1) return [];
  const next = sections[start + 1];
  if (next?.type === "links") {
    return next.items.map((item) => ({ label: item.label, href: item.href }));
  }
  return [];
}

function relatedGuidesFromSections(sections: AdviceSection[]) {
  const start = findSectionIndex(sections, SECTION.related);
  if (start === -1) return [];
  const next = sections[start + 1];
  if (next?.type === "links") return next.items;
  return [];
}

function parseBuildGuideFormat(sections: AdviceSection[]): ParsedGuideContent {
  const summary = paragraphAfterDisclaimer(sections);
  return {
    summary,
    who: itemsAfterH2(sections, SECTION.who),
    available: itemsAfterH2(sections, SECTION.available),
    evidence: itemsAfterH2(sections, SECTION.evidence),
    steps: itemsAfterH2(sections, SECTION.steps),
    mistakes: itemsAfterH2(sections, SECTION.mistakes),
    escalation: itemsAfterH2(sections, SECTION.refused),
    templates: templatesFromSections(sections),
    officialLinks: officialLinksFromSections(sections),
    relatedGuides: relatedGuidesFromSections(sections),
    deadlineHint: findDeadlineHint(sections, summary),
  };
}

function parseRightsFormat(sections: AdviceSection[]): ParsedGuideContent {
  const intro = paragraphAfterH2(sections, "What this means in real life");
  const checks = itemsAfterH2(sections, "What to check before you act");
  const actions = itemsAfterH2(sections, "What to do next (without overwhelm)");
  const warning = calloutByTitle(sections, "Important");

  return {
    summary: intro,
    who: [],
    available: checks,
    evidence: checks,
    steps: actions.length >= 3 ? actions : [...checks.slice(0, 2), ...actions],
    mistakes: warning ? [`Do not ignore deadlines or safety risks: ${warning}`] : [],
    escalation:
      actions.length >= 2
        ? actions.slice(-2)
        : ["Ask for written reasons and the correct next step.", "Keep a dated timeline of what was promised and what happened."],
    templates: templatesFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
    deadlineHint: findDeadlineHint(sections, intro) ?? (warning?.toLowerCase().includes("deadline") ? warning : null),
  };
}

function parseSeedFormat(sections: AdviceSection[]): ParsedGuideContent {
  const intro = paragraphAfterH2(sections, "What this covers");
  const steps = itemsAfterH2(sections, "Practical next steps");
  const warning = calloutByTitle(sections, "Important");

  return {
    summary: intro,
    who: [],
    available: steps.slice(0, 3),
    evidence: steps.slice(0, 4),
    steps,
    mistakes: warning ? [warning] : [],
    escalation:
      steps.length >= 2
        ? steps.slice(-2)
        : ["Document what happened and ask for a written response.", "Use official complaint routes if safety or access is at risk."],
    templates: templatesFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
    deadlineHint: findDeadlineHint(sections, intro),
  };
}

function parseIntroGuideFormat(sections: AdviceSection[]): ParsedGuideContent | null {
  const introHeading = sections.find((s) => s.type === "h2")?.text;
  if (!introHeading) return null;

  const summary = paragraphAfterH2(sections, introHeading);
  const checklistItems = sections.find(
    (s, i) => i > 0 && s.type === "ul" && sections[i - 1]?.type === "h2",
  );
  const items = checklistItems?.type === "ul" ? checklistItems.items : [];

  let steps: string[] = [];
  const stepsCallout = sections.find((s) => s.type === "callout" && s.tone === "steps");
  if (stepsCallout?.type === "callout") {
    steps = parseNumberedSteps(stepsCallout.body);
  }

  if (!steps.length && items.length >= 3) {
    steps = items;
  }

  if (!summary && !steps.length) return null;

  return {
    summary,
    who: [],
    available: items.slice(0, 3),
    evidence: items.length ? items : steps.slice(0, 3),
    steps: steps.length >= 3 ? steps : steps.length ? steps : items,
    mistakes: items.length ? items.slice(0, 3) : [],
    escalation: [
      "Keep notes and ask for decisions in writing.",
      "Use the related detailed guide when you are ready for the next step.",
    ],
    templates: templatesFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
    deadlineHint: findDeadlineHint(sections, summary),
  };
}

function parseFreeformFormat(sections: AdviceSection[]): ParsedGuideContent {
  const h2Indices = sections
    .map((s, i) => (s.type === "h2" ? i : -1))
    .filter((i) => i !== -1);

  const steps: string[] = [];
  const evidence: string[] = [];

  for (const idx of h2Indices) {
    const heading = (sections[idx] as { type: "h2"; text: string }).text;
    if (/important|disclaimer|funding routes/i.test(heading)) continue;

    const next = sections[idx + 1];
    if (next?.type === "p") {
      steps.push(`${heading}: ${next.text.slice(0, 160)}${next.text.length > 160 ? "…" : ""}`);
    } else if (next?.type === "ul") {
      steps.push(heading);
      evidence.push(...next.items.slice(0, 2));
    } else {
      steps.push(heading);
    }
  }

  const summary = paragraphAfterDisclaimer(sections) || (steps[0] ?? "");

  return {
    summary,
    who: [],
    available: steps.slice(0, 3),
    evidence: evidence.length ? evidence : steps.slice(0, 4),
    steps: steps.length >= 3 ? steps : steps.length ? steps : [],
    mistakes: [],
    escalation: [
      "Ask for written confirmation of decisions and next steps.",
      "Escalate if equipment, access, or safety needs are not met within agreed timescales.",
    ],
    templates: templatesFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
    deadlineHint: findDeadlineHint(sections, summary),
  };
}

function parseArticleContent(article: AdviceArticle): ParsedGuideContent {
  const { sections } = article;

  let parsed: ParsedGuideContent;
  if (findSectionIndex(sections, SECTION.who) !== -1) {
    parsed = parseBuildGuideFormat(sections);
  } else if (findSectionIndex(sections, "What this means in real life") !== -1) {
    parsed = parseRightsFormat(sections);
  } else if (findSectionIndex(sections, "What this covers") !== -1) {
    parsed = parseSeedFormat(sections);
  } else {
    parsed = parseIntroGuideFormat(sections) ?? parseFreeformFormat(sections);
  }

  if (!parsed.officialLinks.length) {
    parsed.officialLinks = GUIDE_OFFICIAL_LINKS_BY_SLUG[article.slug] ?? [];
  }
  if (!parsed.relatedGuides.length) {
    parsed.relatedGuides = GUIDE_RELATED_LINKS_BY_SLUG[article.slug] ?? [];
  }
  if (article.canonicalGuideHref) {
    parsed.relatedGuides = [
      { label: "Read the full guide", href: article.canonicalGuideHref },
      ...parsed.relatedGuides,
    ];
  }

  return parsed;
}

/** Short action label for summary grids — matches PIP style. */
function shortLabel(text: string, maxWords = 8): string {
  const colonSplit = text.split(/[:—–]\s+/);
  if (colonSplit.length > 1 && colonSplit[0].trim().split(/\s+/).length <= maxWords) {
    return colonSplit[0].trim().replace(/\.$/, "");
  }
  const words = text.replace(/\.$/, "").split(/\s+/);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function stepTitle(text: string): string {
  return shortLabel(text, 10);
}

function statusLabelForStep(index: number, total: number, title: string): string {
  if (index === 0) return "Start here";
  if (index === total - 1) return "After you act";
  if (/evidence|proof|document|diary|letter/i.test(title)) return "Evidence";
  if (/wording|write|form|draft|template/i.test(title)) return "Wording";
  if (/escalat|refus|appeal|complaint|reconsider/i.test(title)) return "If stuck";
  if (index === 1) return "Core process";
  return "Next action";
}

function shortenAction(text: string): string {
  const cleaned = text.replace(/\.$/, "").trim();
  if (cleaned.length <= 110) return cleaned;
  return `${cleaned.slice(0, 107).replace(/\s+\S*$/, "")}…`;
}

function interpretMeanings(stepText: string, available: string[], evidence: string[], mistakes: string[], index: number): string[] {
  const meanings: string[] = [];
  const relatedAvailable = available[index] ?? available[index % Math.max(available.length, 1)];
  const relatedEvidence = evidence[index] ?? evidence[0];
  const relatedMistake = mistakes[index] ?? mistakes[0];

  if (relatedAvailable) meanings.push(relatedAvailable);
  if (relatedEvidence && relatedEvidence !== relatedAvailable) {
    meanings.push(`Evidence that helps: ${shortLabel(relatedEvidence, 12)}`);
  }
  if (relatedMistake && index === 0) {
    meanings.push(`Watch out: ${shortLabel(relatedMistake, 14)}`);
  }
  if (!meanings.length) {
    meanings.push("Focus on what actually happens for you — not only the diagnosis or label.");
    meanings.push("Write down dates, names, and what you asked for.");
  }
  if (meanings.length < 3) {
    meanings.push("Keep copies of anything you send and any reply you receive.");
  }
  return meanings.slice(0, 4);
}

function buildChecklist(stepText: string, evidence: string[], index: number, total: number): string[] {
  const items: string[] = [];
  const parts = stepText
    .split(/(?:;\s+|,\s+then\s+|,\s+and\s+)/i)
    .map((p) => p.trim())
    .filter((p) => p.length > 12);

  if (parts.length >= 2) {
    items.push(...parts.slice(0, 3).map((p) => (p.endsWith(".") ? p : `${p}.`)));
  } else {
    items.push(stepText.endsWith(".") ? stepText : `${stepText}.`);
  }

  if (evidence[index]) items.push(`Gather: ${evidence[index]}`);
  else if (evidence[0] && index === 0) items.push(`Prepare: ${evidence[0]}`);

  if (index === total - 1) {
    items.push("Keep proof of what you sent and when.");
  } else if (items.length < 3) {
    items.push("Note the date and who you contacted.");
  }

  return [...new Set(items)].slice(0, 4);
}

function buildIntro(stepText: string, title: string, index: number, summary: string): { intro: string; introExtra?: string[] } {
  const base =
    index === 0
      ? `${stepText.replace(/\.$/, "")}. Start here so the rest of the guide has a clear foundation.`
      : `${stepText.replace(/\.$/, "")}. Take this step carefully before moving on — it supports everything that follows.`;

  const introExtra =
    index === 0 && summary && summary.length > 40
      ? [summary.length > 220 ? `${summary.slice(0, 217).replace(/\s+\S*$/, "")}…` : summary]
      : undefined;

  return {
    intro: base.length > 320 ? `${title}: ${shortenAction(stepText)}` : base,
    introExtra,
  };
}

function buildExample(
  stepText: string,
  title: string,
  templates: GuideCopyableTemplate[],
  excerpt: string,
  index: number,
  total: number,
): { example: string; exampleLabel: string } {
  if (index === total - 1 && templates[0]) {
    return { example: templates[0].body, exampleLabel: templates[0].title };
  }
  if (index === Math.min(2, total - 1) && templates[0]) {
    const snippet = templates[0].body.slice(0, 280);
    return {
      example: snippet.length < templates[0].body.length ? `${snippet}…` : snippet,
      exampleLabel: "Example wording",
    };
  }
  if (index === 0 && excerpt) {
    return {
      example: excerpt,
      exampleLabel: "What good looks like",
    };
  }
  return {
    example: `Worked approach: ${shortenAction(stepText)} Then record what happened and what you still need.`,
    exampleLabel: `Example — ${shortLabel(title, 5)}`,
  };
}

function buildGuideSteps(
  article: AdviceArticle,
  stepTexts: string[],
  available: string[],
  evidence: string[],
  mistakes: string[],
  templates: GuideCopyableTemplate[],
  summary: string,
): GuideStep[] {
  const excerpt = article.excerpt ?? "Practical guidance for your situation.";
  const total = stepTexts.length;

  return stepTexts.map((stepText, i) => {
    const title = stepTitle(stepText);
    const { intro, introExtra } = buildIntro(stepText, title, i, summary);
    const { example, exampleLabel } = buildExample(stepText, title, templates, excerpt, i, total);
    const checklist = buildChecklist(stepText, evidence, i, total);

    return {
      id: `step-${i + 1}`,
      number: i + 1,
      title,
      preview: shortenAction(stepText),
      outcome: `Outcome: ${title.toLowerCase()}`,
      statusLabel: statusLabelForStep(i, total, title),
      status: (i === 0 ? "active" : "upcoming") as GuideStep["status"],
      content: {
        intro,
        ...(introExtra ? { introExtra } : {}),
        whatThisMeans: interpretMeanings(stepText, available, evidence, mistakes, i),
        checklist,
        example,
        exampleLabel,
        aiPrompt: `Help me with "${title}" for ${article.title}. Give plain-English wording and a short checklist.`,
        ...(i === 1 && evidence.length
          ? { extraSections: [{ title: "Evidence to keep ready", items: evidence.slice(0, 5) }] }
          : {}),
        ...(i === total - 2 && mistakes.length
          ? { extraSections: [{ title: "Common mistakes to avoid", items: mistakes.slice(0, 4) }] }
          : {}),
      },
    };
  });
}

function deriveFirstThreeActions(article: AdviceArticle, steps: string[]): string[] {
  if (article.firstThreeActions?.length) {
    return article.firstThreeActions.slice(0, 3).map(shortenAction);
  }
  return steps.slice(0, 3).map((s) => shortenAction(shortLabel(s, 14)));
}

function deriveQuickAnswer(article: AdviceArticle, summary: string): string {
  if (article.quickAnswer) return article.quickAnswer;
  if (summary.length <= 220) return summary;
  return `${summary.slice(0, 217).replace(/\s+\S*$/, "")}…`;
}

function deriveAtAGlance(
  summary: string,
  available: string[],
  evidence: string[],
  mistakes: string[],
  steps: string[],
): string[] {
  const items: string[] = [];
  if (summary) items.push(summary.length > 140 ? `${summary.slice(0, 137).replace(/\s+\S*$/, "")}…` : summary);
  for (const item of available.slice(0, 2)) items.push(item);
  if (evidence[0]) items.push(`Evidence that helps: ${shortLabel(evidence[0], 12)}`);
  if (mistakes[0]) items.push(`Avoid: ${shortLabel(mistakes[0], 12)}`);
  if (steps[0] && items.length < 4) items.push(`Start with: ${shortLabel(steps[0], 10)}`);
  if (items.length < 3) {
    items.push("Written in plain language — not legal jargon");
    items.push("UK-focused guidance you can act on today");
  }
  return [...new Set(items)].slice(0, 6);
}

function deriveSummary(steps: string[]): string[] {
  const labels = steps.map((s) => shortLabel(s, 8));
  if (labels.length >= 4) return labels.slice(0, 6);
  return labels.length
    ? labels
    : ["Prepare evidence and wording", "Take the next practical action", "Know what to do if things stall"];
}

function deriveWho(who: string[], article: AdviceArticle): string[] {
  if (who.length) return who.slice(0, 4);
  const tagAudience = article.tags.slice(0, 2).map((tag) => `People dealing with ${tag.toLowerCase()}.`);
  return tagAudience.length
    ? tagAudience
    : [
        "Disabled people and carers looking for a clear next step.",
        "Supporters helping someone prepare evidence or wording.",
      ];
}

function deriveWarningBox(deadlineHint: string | null): { title: string; text: string } {
  if (deadlineHint) {
    return {
      title: /danger|emergency|crisis|unsafe/i.test(deadlineHint) ? "Safety first" : "Important deadline",
      text: deadlineHint,
    };
  }
  return {
    title: "Practical information only",
    text: "Reviewed against official guidance where linked. This is not legal, medical, or financial advice — check GOV.UK or an adviser for your situation.",
  };
}

export function buildWorkflowFromArticle(article: AdviceArticle): PracticalGuideWorkflow {
  const parsed = parseArticleContent(article);
  const summaryText = parsed.summary || article.excerpt || "Practical guidance for your situation.";
  const templates = parsed.templates;
  const aiPrompts = getGuideAiPrompts(article.slug, article.title);

  const steps =
    parsed.steps.length >= 3
      ? parsed.steps
      : [
          "Name the barrier or task that is difficult",
          "Explain what happens without support",
          "Decide your next action and put it in writing",
          "Gather evidence that matches what you write",
          "Follow up if you are refused, delayed, or ignored",
        ];

  const guideSteps = buildGuideSteps(
    article,
    steps,
    parsed.available,
    parsed.evidence,
    parsed.mistakes,
    templates,
    summaryText,
  );
  const firstThreeActions = deriveFirstThreeActions(article, steps);
  const copyableTemplates = templates;

  return {
    displayTitle: article.title,
    subtitle: article.excerpt ?? summaryText,
    quickAnswer: deriveQuickAnswer(article, summaryText),
    whoThisIsFor: deriveWho(parsed.who, article),
    firstThreeActions,
    warningBox: deriveWarningBox(parsed.deadlineHint),
    currentStep: 1,
    totalSteps: guideSteps.length,
    completedCount: 0,
    steps: guideSteps,
    summary: deriveSummary(steps),
    atAGlance: deriveAtAGlance(summaryText, parsed.available, parsed.evidence, parsed.mistakes, steps),
    evidenceChecklist: parsed.evidence.length ? parsed.evidence : undefined,
    copyableTemplates: copyableTemplates.length ? copyableTemplates : undefined,
    commonMistakes: parsed.mistakes.length ? parsed.mistakes : undefined,
    escalation: parsed.escalation.length ? parsed.escalation : undefined,
    relatedGuides: parsed.relatedGuides.length ? parsed.relatedGuides : undefined,
    templates: copyableTemplates.length
      ? copyableTemplates.map((t) => ({
          title: t.title,
          format: "Copy text",
          description: t.useWhen,
          body: t.body,
        }))
      : [
          {
            title: "Use the step checklists",
            format: "Checklist",
            description: "Work through each step’s practical checklist, then copy wording from the examples.",
          },
        ],
    officialLinks: parsed.officialLinks.length ? parsed.officialLinks : undefined,
    aiIntro: `Need help applying "${article.title}" to your situation? Ask about any step, evidence, or wording — the same way you would with our detailed PIP and workplace guides.`,
    aiSuggestions: aiPrompts.suggestions,
    aiDemoQuestion: aiPrompts.demoQuestion,
    aiDemoIntro: aiPrompts.demoIntro,
    aiDemoAnswer: aiPrompts.demoAnswer,
    aiDisclaimer:
      "AI can make mistakes. Use this as practical guidance, not legal advice. Check important information with official sources or an adviser.",
    primaryCta: { label: firstThreeActions[0] ? `Start: ${shortLabel(firstThreeActions[0], 6)}` : "Start the guide" },
    learnMoreHref: `/advice/${article.categorySlug}`,
  };
}
