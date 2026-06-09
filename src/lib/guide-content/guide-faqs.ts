import type { AdviceArticle } from "@/lib/content/types";
import type { GuideFaq } from "@/lib/guide-content/types";

export const REASONABLE_ADJUSTMENTS_FAQS: GuideFaq[] = [
  {
    id: "diagnosis-required",
    question: "Do I need a formal diagnosis to ask for adjustments?",
    explanation:
      "No. You do not need a formal diagnosis to request reasonable adjustments. What matters is that you face a substantial disadvantage at work because of a long-term condition, mental health need, neurodivergence, sensory difference, pain, fatigue, or mobility barrier.",
    whatToDoNext: [
      "Describe the barrier in plain language — what task or environment is difficult.",
      "Explain the impact on your ability to do your job on equal terms.",
      "Propose one or two practical adjustments that would reduce the disadvantage.",
      "Ask for a meeting and follow up in writing with the same points.",
    ],
    exampleWording:
      "Because of how noise and interruptions affect my concentration, I cannot complete focused work reliably in an open-plan area. A quieter workspace or agreed focus blocks would reduce the disadvantage I face compared with colleagues.",
    evidenceChecklist: [
      "Short written summary of barriers and impact",
      "Occupational health report if your employer offers one",
      "GP or specialist letter describing functional impact at work (optional)",
    ],
    relatedHelpCardHref: "/help-cards?concern=Disability%20discrimination%20at%20work",
    relatedHelpCardLabel: "Disability discrimination at work help card",
  },
  {
    id: "employer-refusal",
    question: "What if my employer refuses or delays?",
    explanation:
      "Employers must consider requests seriously. A delay without a timeline, or a blanket refusal without reasons, is not the end of the process. Ask for written reasons and keep records of meetings, emails, and what was agreed.",
    whatToDoNext: [
      "Send a polite follow-up email summarising your request and asking for a decision date.",
      "Ask which adjustment was considered unreasonable and why.",
      "Request an alternative if the first option is not possible.",
      "Raise a formal grievance if internal discussion fails — check your employer policy.",
      "Contact ACAS early conciliation if you are considering an employment tribunal — time limits are strict.",
    ],
    exampleWording:
      "I am following up on my adjustment request sent on [date]. Could you confirm the decision, any alternative being considered, and a date for implementation? If the request is refused, please share the reasons in writing so I can understand the employer's position.",
    evidenceChecklist: [
      "Copy of original request email",
      "Meeting notes or calendar invites",
      "Follow-up emails with dates",
      "Diary of impact at work after refusal",
    ],
    relatedHelpCardHref: "/help-cards?concern=Making%20a%20formal%20complaint",
    relatedHelpCardLabel: "Making a formal complaint help card",
  },
  {
    id: "what-counts-reasonable",
    question: "What counts as a reasonable adjustment?",
    explanation:
      "Reasonable adjustments remove or reduce disadvantage. They can change policies, practices, physical environments, or provide auxiliary aids. Examples include flexible hours, hybrid working, quieter workspace, equipment, meeting adjustments, or changed communication formats.",
    whatToDoNext: [
      "Link each barrier to a specific work task.",
      "Suggest adjustments that are practical for your role.",
      "Offer alternatives if your first choice is not feasible.",
      "Review after 4–6 weeks and say what is working.",
    ],
    exampleWording:
      "Barrier: I cannot attend back-to-back meetings without recovery time. Adjustment: 10-minute gaps between meetings and agendas sent 24 hours in advance.",
    evidenceChecklist: [
      "List of tasks affected",
      "Examples of good days and bad days",
      "Quotes for equipment if relevant",
    ],
  },
  {
    id: "access-to-work-vs-employer",
    question: "Is Access to Work the same as reasonable adjustments?",
    explanation:
      "No. Access to Work may fund extra disability-related work costs, but it does not replace your employer's duty to make reasonable adjustments. Many people use both — employer adjustments for workplace changes, Access to Work for funded support where eligible.",
    whatToDoNext: [
      "Raise reasonable adjustments with your employer first.",
      "Check GOV.UK Access to Work eligibility if costs are a barrier.",
      "Keep employer requests separate from AtW applications — both should describe work barriers clearly.",
    ],
    relatedHelpCardHref: "/help-cards?concern=Access%20to%20Work",
    relatedHelpCardLabel: "Access to Work help card",
  },
  {
    id: "how-much-to-share",
    question: "How much medical detail should I share?",
    explanation:
      "Share enough to explain the barrier and disadvantage — not your full medical history. Focus on functional impact: what you cannot do reliably, safely, or without extra recovery time. Occupational health may ask for more detail with your consent.",
    whatToDoNext: [
      "Prepare a one-page barrier summary before meetings.",
      "Use functional language instead of clinical labels alone.",
      "Ask what information HR or OH actually needs for their decision.",
    ],
    exampleWording:
      "I experience unpredictable fatigue that limits how long I can work at a screen without breaks. This affects deadline reliability, not my skills or commitment.",
    evidenceChecklist: [
      "Functional impact summary (one page)",
      "Consent decisions for OH reports",
      "List of tasks and environments affected",
    ],
    relatedHelpCardHref: "/help-cards?concern=Job%20interview%20adjustments",
    relatedHelpCardLabel: "Job interview adjustments help card",
  },
];

export const ACCESS_TO_WORK_FAQS: GuideFaq[] = [
  {
    id: "atw-vs-adjustments",
    question: "Does Access to Work replace reasonable adjustments?",
    explanation:
      "No. Your employer still has a duty to make reasonable adjustments. Access to Work can help with extra costs that may not be reasonable for the employer to cover alone, such as specialist equipment, travel, or support workers.",
    whatToDoNext: [
      "Document workplace barriers with your employer in parallel.",
      "Apply for Access to Work with work-linked examples and quotes.",
      "Do not buy equipment before approval unless GOV.UK guidance confirms you can.",
    ],
    relatedHelpCardHref: "/help-cards?concern=Access%20to%20Work",
    relatedHelpCardLabel: "Access to Work help card",
  },
  {
    id: "atw-eligibility",
    question: "Who can apply for Access to Work?",
    explanation:
      "Employed and self-employed people whose health condition or disability affects their ability to do their job may be eligible. Rules change — always confirm current eligibility on GOV.UK before applying. You usually apply yourself, not through your employer.",
    whatToDoNext: [
      "Check GOV.UK eligibility for your employment status.",
      "List barriers by work task before starting the application.",
      "Gather quotes for equipment or support where possible.",
    ],
    evidenceChecklist: [
      "Job description and typical tasks",
      "Barrier → support table with costs",
      "Employer contact for role confirmation (if needed)",
    ],
  },
  {
    id: "atw-refused",
    question: "What if Access to Work refuses or offers too little?",
    explanation:
      "Ask for written reasons and whether a different support option could be funded. You may be able to request a review through the published dispute route. Keep pursuing reasonable adjustments with your employer regardless.",
    whatToDoNext: [
      "Request clarification in writing within the timeframe on your decision letter.",
      "Ask if a cheaper alternative would be approved.",
      "Reapply if your job or barriers change materially.",
    ],
    exampleWording:
      "I am requesting clarification of the decision dated [date]. Could you confirm which barrier was not accepted and whether [alternative support] could be considered instead?",
  },
];

const FAQ_OVERRIDES: Record<string, GuideFaq[]> = {
  "reasonable-adjustments-at-work": REASONABLE_ADJUSTMENTS_FAQS,
  "access-to-work": ACCESS_TO_WORK_FAQS,
};

function extractSectionItems(article: AdviceArticle, h2Title: string): string[] {
  const sections = article.sections;
  const start = sections.findIndex((s) => s.type === "h2" && "text" in s && s.text === h2Title);
  if (start === -1) return [];

  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "ul") return section.items;
  }
  return [];
}

function extractParagraphAfterH2(article: AdviceArticle, h2Title: string): string | undefined {
  const sections = article.sections;
  const start = sections.findIndex((s) => s.type === "h2" && "text" in s && s.text === h2Title);
  if (start === -1) return undefined;

  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "p" && "text" in section && section.text.trim()) return section.text.trim();
  }
  return undefined;
}

export function buildDefaultGuideFaqs(article: AdviceArticle): GuideFaq[] {
  const who = extractSectionItems(article, "Who this applies to");
  const mistakes = extractSectionItems(article, "Common mistakes to avoid");
  const ifRefused = extractSectionItems(article, "If you are refused, delayed, or ignored");
  const summary = article.excerpt ?? article.sections.find((s) => s.type === "p" && "text" in s)?.text ?? "";

  const faqs: GuideFaq[] = [];

  if (who.length) {
    faqs.push({
      id: "who-applies",
      question: "Who does this guide apply to?",
      explanation: summary,
      whatToDoNext: who.slice(0, 4),
    });
  }

  if (mistakes.length) {
    faqs.push({
      id: "common-mistakes",
      question: "What mistakes should I avoid?",
      explanation: "These are the errors that most often slow people down or weaken their case.",
      whatToDoNext: mistakes.slice(0, 5),
    });
  }

  if (ifRefused.length) {
    faqs.push({
      id: "if-refused",
      question: "What if I am refused, delayed, or ignored?",
      explanation:
        extractParagraphAfterH2(article, "If you are refused, delayed, or ignored") ??
        "Keep written records and use the escalation routes below.",
      whatToDoNext: ifRefused.slice(0, 5),
    });
  }

  const steps = extractSectionItems(article, "Step-by-step process");
  if (steps.length) {
    faqs.push({
      id: "first-steps",
      question: "What should I do first?",
      explanation: "Work through these steps in order. You can return to earlier steps if your situation changes.",
      whatToDoNext: steps.slice(0, 5),
    });
  }

  return faqs.slice(0, 5);
}

export function getGuideFaqs(article: AdviceArticle): GuideFaq[] {
  const override = FAQ_OVERRIDES[article.slug];
  if (override?.length) return override;
  return buildDefaultGuideFaqs(article);
}
