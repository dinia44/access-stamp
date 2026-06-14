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
  template: GuideCopyableTemplate | null;
  officialLinks: Array<{ label: string; href: string }>;
  relatedGuides: Array<{ label: string; href: string }>;
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

function templateFromSections(sections: AdviceSection[]): GuideCopyableTemplate | null {
  const mistakesIdx = findSectionIndex(sections, SECTION.mistakes);
  if (mistakesIdx !== -1) {
    for (let i = mistakesIdx + 1; i < sections.length; i += 1) {
      const section = sections[i];
      if (section.type === "h2" && section.text === SECTION.refused) break;
      if (section.type === "h2") {
        const title = section.text;
        const next = sections[i + 1];
        if (next?.type === "pre") {
          return {
            title,
            useWhen: "When you need wording you can copy and adapt for email, letter, or conversation.",
            body: next.text,
          };
        }
      }
    }
  }

  const oneSentence = calloutByTitle(sections, "One sentence you can use");
  if (oneSentence) {
    return {
      title: "Example wording you can adapt",
      useWhen: "When contacting a service, council, employer, or provider in writing.",
      body: oneSentence,
    };
  }

  const tip = calloutByTitle(sections, "Access Stamp tip");
  if (tip) {
    return {
      title: "How to describe your barrier clearly",
      useWhen: "Before you call, email, or attend an assessment or meeting.",
      body: tip,
    };
  }

  return null;
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
  return {
    summary: paragraphAfterDisclaimer(sections),
    who: itemsAfterH2(sections, SECTION.who),
    available: itemsAfterH2(sections, SECTION.available),
    evidence: itemsAfterH2(sections, SECTION.evidence),
    steps: itemsAfterH2(sections, SECTION.steps),
    mistakes: itemsAfterH2(sections, SECTION.mistakes),
    escalation: itemsAfterH2(sections, SECTION.refused),
    template: templateFromSections(sections),
    officialLinks: officialLinksFromSections(sections),
    relatedGuides: relatedGuidesFromSections(sections),
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
    template: templateFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
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
    template: templateFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
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
    mistakes: items.length ? items : [],
    escalation: [
      "Keep notes and ask for decisions in writing.",
      "Use the related detailed guide when you are ready for the next step.",
    ],
    template: templateFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
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
    template: templateFromSections(sections),
    officialLinks: [],
    relatedGuides: [],
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

function stepTitle(text: string): string {
  const colonSplit = text.split(/[:—–-]\s+/);
  if (colonSplit.length > 1 && colonSplit[0].length <= 48) {
    return colonSplit[0].trim();
  }
  if (text.length <= 56) return text;
  const words = text.split(/\s+/).slice(0, 8).join(" ");
  return words.endsWith(",") ? words.slice(0, -1) : `${words}…`;
}

function buildStepActions(stepText: string, evidence: string[], index: number, total: number): string[] {
  const actions = [stepText];
  if (index === 0 && evidence[0]) actions.push(`Prepare: ${evidence[0]}`);
  if (index === total - 1) actions.push("Keep proof of what you sent and when.");
  else if (evidence[index % evidence.length]) {
    actions.push(`Check: ${evidence[index % evidence.length]}`);
  }
  return actions.slice(0, 4);
}

function buildGuideSteps(
  article: AdviceArticle,
  stepTexts: string[],
  evidence: string[],
  template: GuideCopyableTemplate | null,
): GuideStep[] {
  const excerpt = article.excerpt ?? "Practical guidance for your situation.";

  return stepTexts.map((stepText, i) => {
    const title = stepTitle(stepText);
    const isLast = i === stepTexts.length - 1;
    const example =
      isLast && template
        ? template.body
        : i === 0
          ? excerpt || stepText
          : stepText;

    return {
      id: `step-${i + 1}`,
      number: i + 1,
      title,
      preview: stepText,
      outcome: `Done: ${title.toLowerCase()}`,
      statusLabel: i === 0 ? "Start here" : "To do",
      status: (i === 0 ? "active" : "upcoming") as GuideStep["status"],
      content: {
        intro: stepText,
        whatThisMeans: buildStepActions(stepText, evidence, i, stepTexts.length).slice(1),
        checklist: buildStepActions(stepText, evidence, i, stepTexts.length),
        example,
        exampleLabel: isLast && template ? template.title : "Example approach",
        aiPrompt: `Help me with step ${i + 1} (${title}) for ${article.title}`,
        ...(i === 1 && evidence.length
          ? { extraSections: [{ title: "Evidence to keep ready", items: evidence.slice(0, 4) }] }
          : {}),
      },
    };
  });
}

function deriveFirstThreeActions(article: AdviceArticle, steps: string[]): string[] {
  if (article.firstThreeActions?.length) return article.firstThreeActions.slice(0, 3);
  return steps.slice(0, 3);
}

function deriveQuickAnswer(article: AdviceArticle, summary: string): string {
  return article.quickAnswer ?? summary;
}

function deriveAtAGlance(available: string[], evidence: string[]): string[] {
  const items = [...available.slice(0, 4), ...evidence.slice(0, 2)];
  return items.length ? items : ["Written in plain language — not legal jargon", "UK-focused guidance you can act on"];
}

function deriveSummary(steps: string[]): string[] {
  if (steps.length >= 4) return steps.slice(0, 4);
  return steps.length ? steps : ["Prepare evidence and wording", "Take the next practical action", "Know what to do if things stall"];
}

export function buildWorkflowFromArticle(article: AdviceArticle): PracticalGuideWorkflow {
  const parsed = parseArticleContent(article);
  const summaryText = parsed.summary || article.excerpt || "Practical guidance for your situation.";
  const template = parsed.template;
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

  const guideSteps = buildGuideSteps(article, steps, parsed.evidence, template);
  const firstThreeActions = deriveFirstThreeActions(article, steps);
  const copyableTemplates = template ? [template] : [];

  return {
    subtitle: article.excerpt ?? summaryText,
    quickAnswer: deriveQuickAnswer(article, summaryText),
    whoThisIsFor: parsed.who,
    firstThreeActions,
    warningBox: {
      title: "Practical information only",
      text: "Reviewed against official guidance where linked. This is not legal, medical, or financial advice.",
    },
    currentStep: 1,
    totalSteps: guideSteps.length,
    completedCount: 0,
    steps: guideSteps,
    summary: deriveSummary(steps),
    atAGlance: deriveAtAGlance(parsed.available, parsed.evidence),
    evidenceChecklist: parsed.evidence,
    copyableTemplates,
    commonMistakes: parsed.mistakes,
    escalation: parsed.escalation,
    relatedGuides: parsed.relatedGuides,
    templates: copyableTemplates.map((t) => ({
      title: t.title,
      format: "Copy text",
      description: t.useWhen,
      body: t.body,
    })),
    officialLinks: parsed.officialLinks,
    aiIntro: `Need help applying "${article.title}" to your situation? Ask about any step, evidence, or wording below.`,
    aiSuggestions: aiPrompts.suggestions,
    aiDemoQuestion: aiPrompts.demoQuestion,
    aiDemoIntro: aiPrompts.demoIntro,
    aiDemoAnswer: aiPrompts.demoAnswer,
    aiDisclaimer:
      "AI can make mistakes. Use this as practical guidance, not legal advice. Check important information with official sources or an adviser.",
    primaryCta: { label: "I'm ready to take the next step" },
    learnMoreHref: `/advice/${article.categorySlug}`,
  };
}
