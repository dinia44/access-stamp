import type { Guide } from "@/lib/guide-schema";
import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { step } from "@/lib/guide-content/types";

export const PIP_RENEWAL_GUIDE: Guide = {
  slug: "pip-renewal-form-what-to-write",
  title: "PIP renewal: completing the form clearly",
  summary:
    "Understand what the renewal form is asking, how to describe day-to-day difficulties using the reliability rules, and what evidence may support your answers.",
  jurisdiction: ["England", "Wales"],
  audience: ["Existing PIP claimants", "Supporters helping with consent", "Carers preparing evidence"],
  reviewedAt: "2026-06-01",
  nextReviewAt: "2026-12-01",
  editorialStatus: "published",
  keyFacts: [
    { label: "Form focus", value: "How your condition affects daily living and mobility now — not diagnosis alone." },
    { label: "Deadline", value: "Usually one month from the date on your renewal letter — confirm on your pack." },
    { label: "Reliability test", value: "Can you do the activity safely, repeatedly, in reasonable time, and to an acceptable standard?" },
  ],
  steps: [],
  evidenceChecklist: [
    { label: "Renewal letter with deadline date", hint: "Photograph or scan the date line." },
    { label: "Previous PIP decision letter", hint: "Shows what DWP already accepted or disputed." },
    { label: "2–4 week impact diary", hint: "Sleep, pain, fatigue, falls, care needs, medication effects." },
    { label: "Functional support letters", hint: "GP, nurse, OT, or social worker describing what happens in daily tasks." },
    { label: "Aid and appliance list", hint: "Splints, commode, perching stool, mobility equipment linked to tasks." },
  ],
  templates: [
    {
      title: "Preparing food — example wording",
      useWhen: "When an activity question asks how you manage cooking or meal preparation.",
      body: `On most days I cannot prepare a simple hot meal safely without help. Pain and fatigue limit standing at the hob to a few minutes. I use a stool and microwave meals, but lifting pans and chopping are unsafe when my hands are weak. On bad days I skip meals or rely on a carer. Without support I risk burns, dropped items, or not eating — which worsens other symptoms.`,
    },
  ],
  commonMistakes: [
    { mistake: "Writing only your diagnosis", whyItMatters: "DWP scores functional impact, not medical labels." },
    { mistake: "Describing your best day", whyItMatters: "Assessors must consider variability and reliability over time." },
    { mistake: "Answering “no change” without checking", whyItMatters: "Your needs may have worsened or changed character even if the diagnosis is the same." },
  ],
  escalation: [
    {
      situation: "Payments stop or reduce after renewal",
      actions: [
        "Read the decision letter and note the decision date.",
        "Request mandatory reconsideration within one month if you disagree.",
        "Contact Citizens Advice or a welfare rights service before the deadline.",
      ],
    },
  ],
  officialSources: [
    { label: "GOV.UK — PIP when your claim is reviewed", href: "https://www.gov.uk/pip/when-your-pip-claim-is-reviewed" },
    { label: "PIP2 form and information booklet (PDF)", href: "https://assets.publishing.service.gov.uk/media/6602af72f1d3a09b1f32ac81/pip2-form-and-information-booklet__1_.pdf" },
  ],
  relatedGuideSlugs: ["pip-in-plain-english", "pip-mandatory-reconsideration"],
  relatedToolSlugs: ["evidence-checklist", "letter-builder", "article-companion"],
};

export const PIP_RENEWAL_WORKFLOW: PracticalGuideWorkflow = {
  displayTitle: "PIP renewal: completing the form clearly",
  subtitle:
    "How to answer the renewal form using real examples, the reliability rules, and evidence that matches what you write.",
  quickAnswer:
    "Describe what happens when you try each activity — safely, repeatedly, in reasonable time, and to an acceptable standard. Do not write only “no change” unless your earlier answers still fully describe today’s needs.",
  whoThisIsFor: [
    "People with an existing PIP award who receive a renewal pack from DWP.",
    "Claimants whose needs have worsened, improved, or fluctuate more than before.",
    "Supporters helping someone complete the form with the claimant’s consent.",
  ],
  firstThreeActions: [
    "Find the deadline on your renewal letter and note it in your calendar.",
    "List what has changed since your last decision — better, worse, or different on bad days.",
    "Draft one example per activity before filling the form boxes.",
  ],
  warningBox: {
    title: "Important deadline",
    text: "Missing the renewal deadline can stop payments. If you need more time, contact DWP as soon as possible — do not wait until the last day.",
  },
  currentStep: 1,
  totalSteps: 6,
  completedCount: 0,
  summary: [
    "Check deadline and what changed",
    "Use reliability rules on every activity",
    "Describe help, prompting, supervision and risk",
    "Match evidence to each answer",
    "Submit with proof and copies",
    "Plan if the award changes",
  ],
  atAGlance: [
    "Renewal asks how your condition affects you now — not just whether the diagnosis is the same.",
    "Use the reliability rules: safely, repeatedly, reasonable time, acceptable standard.",
    "Describe prompting, supervision, aids, and what happens on bad days.",
    "Evidence should match examples — diaries beat generic clinic letters.",
    "Keep copies of the form and proof of submission.",
    "If payments stop or reduce, check mandatory reconsideration deadlines immediately.",
  ],
  evidenceChecklist: PIP_RENEWAL_GUIDE.evidenceChecklist?.map((item) => item.label),
  commonMistakes: PIP_RENEWAL_GUIDE.commonMistakes?.map((m) => `${m.mistake} — ${m.whyItMatters}`),
  escalation: PIP_RENEWAL_GUIDE.escalation?.flatMap((route) => [route.situation, ...route.actions]),
  copyableTemplates: PIP_RENEWAL_GUIDE.templates?.map((template) => ({
    title: template.title,
    useWhen: template.useWhen ?? "Copy and adapt for your situation.",
    body: template.body,
  })),
  relatedGuides: [
    { label: "PIP in plain English", href: "/advice/pip-in-plain-english" },
    { label: "PIP mandatory reconsideration", href: "/advice/pip-mandatory-reconsideration" },
  ],
  officialLinks: PIP_RENEWAL_GUIDE.officialSources.map((source) => ({
    label: source.label,
    href: source.href,
  })),
  templates: [
    {
      title: "PIP impact diary (4 weeks)",
      format: "Checklist",
      description: "Track sleep, pain, fatigue, falls, and care needs against daily activities.",
    },
  ],
  aiIntro:
    "Need help applying this guide to your renewal? Ask how to describe an activity, what counts under reliability rules, or what evidence fits a specific question.",
  aiSuggestions: [
    "How do I describe preparing food on bad days?",
    "What does reliably mean for PIP?",
    "What evidence should I send with renewal?",
    "Help me explain prompting and supervision",
    "What if my needs are the same as last time?",
  ],
  aiDemoQuestion: "How should I describe needing prompting to take medication?",
  aiDemoIntro: "Strong PIP answers explain what happens without support:",
  aiDemoAnswer: [
    "State the activity (taking prescribed medication at the right time).",
    "Explain what goes wrong without prompting — missed doses, wrong time, safety risk.",
    "Say how often prompting is needed and who provides it.",
    "Link to reliability: you cannot do it safely or repeatedly without that support.",
  ],
  aiDisclaimer:
    "This guide is general information, not legal advice. Check GOV.UK and get welfare rights advice for your situation.",
  primaryCta: { label: "Start with my deadline" },
  learnMoreHref: "/advice/rights",
  steps: [
    step({
      id: "deadline-and-changes",
      number: 1,
      title: "Check your deadline and what has changed",
      preview: "Note the renewal date and compare your current needs with your last award.",
      outcome: "Outcome: deadline logged and change list",
      statusLabel: "Start here",
      status: "active",
      content: {
        intro:
          "Your renewal pack will include a deadline. Treat that date as fixed until DWP confirms an extension. Before you write answers, list what is different now compared with your last decision — even if the diagnosis is unchanged.",
        introExtra: [
          "Changes might include more fatigue, new falls, increased pain, different medication, reduced stamina, more care from a partner, or needing aids you did not use before.",
          "If nothing has changed, you still need to show the earlier impact continues — with fresh examples and dates.",
        ],
        whatThisMeans: [
          "DWP can stop payments if the form is late.",
          "“No change” is only safe if your functional impact is still described accurately.",
          "Worsening counts; so does needing more help on bad days.",
        ],
        checklist: [
          "Write down the deadline from your renewal letter.",
          "Find your last decision letter if you have it.",
          "List three ways daily living or mobility is harder, easier, or more variable now.",
          "Note any new aids, care, or hospital contacts since the last award.",
        ],
        example:
          "Since my last award I need prompting twice daily for medication where I previously managed alone. Fatigue now stops me cooking more than twice a week without help.",
        exampleLabel: "Example change note",
        aiPrompt: "Help me list what has changed since my last PIP decision",
      },
    }),
    step({
      id: "reliability-rules",
      number: 2,
      title: "Apply the reliability rules to every activity",
      preview: "Assessors score whether you can do activities safely, repeatedly, in reasonable time, and to an acceptable standard.",
      outcome: "Outcome: reliability checklist",
      statusLabel: "Core rules",
      status: "upcoming",
      content: {
        intro:
          "PIP activities are not about whether you can do something once on a good day. Decision-makers should consider whether you can do it reliably. Use these four tests for each activity question.",
        whatThisMeans: [
          "Safely — without harm to you or someone else.",
          "Repeatedly — as often as the activity is normally needed.",
          "Within a reasonable time — not taking much longer than someone without your condition.",
          "To an acceptable standard — the result is good enough for everyday life.",
        ],
        checklist: [
          "For each activity, ask: what happens if I do this daily?",
          "Note pain, fatigue, or recovery time after the task.",
          "Include what happens if you skip the task or leave it half-done.",
          "If you use an aid, say what still cannot be done even with the aid.",
        ],
        example:
          "I can walk 50 metres on a good day but cannot do so repeatedly or within a reasonable time because of breathlessness and knee pain — I need recovery time and cannot reliably repeat the walk later the same day.",
        exampleLabel: "Reliability example — mobility",
        aiPrompt: "Explain the PIP reliability rules using my mobility difficulties",
      },
    }),
    step({
      id: "help-prompting-risk",
      number: 3,
      title: "Describe help, prompting, supervision, and risk",
      preview: "Explain who helps, how often, and what happens if support is not available.",
      outcome: "Outcome: support descriptions drafted",
      statusLabel: "Support needs",
      status: "upcoming",
      content: {
        intro:
          "Many strong answers hinge on support that is easy to under-report: reminders, someone staying nearby, help part-way through a task, or needing supervision to prevent injury.",
        whatThisMeans: [
          "Prompting counts when you would forget or misunderstand without it.",
          "Supervision counts when you need someone present to prevent harm.",
          "Assistance includes physical help part-way through a task.",
          "Describe frequency — occasional is different from daily or several times a day.",
        ],
        checklist: [
          "List prompting needs (medication, meals, appointments, hygiene).",
          "State whether someone must stay nearby for safety.",
          "Explain risks if help is not available — falls, missed medication, dehydration, injury.",
          "Name who helps and whether support is informal (family) or paid.",
        ],
        example:
          "My partner prompts me each morning and evening to take medication. Without prompting I forget doses roughly four times a week, which affects pain control and increases fall risk.",
        exampleLabel: "Prompting example",
        aiPrompt: "Help me describe supervision and prompting for daily living activities",
      },
    }),
    step({
      id: "activity-answers",
      number: 4,
      title: "Answer each activity with specific examples",
      preview: "Use task → difficulty → help needed → risk for daily living and mobility questions.",
      outcome: "Outcome: activity drafts",
      statusLabel: "Form wording",
      status: "upcoming",
      content: {
        intro:
          "Work through the form activity by activity. Use the same structure each time so your answers stay consistent and easier for a decision-maker to follow.",
        introExtra: [
          "Daily living activities include preparing food, nutrition, managing therapy, washing, managing toilet needs, dressing, communicating, reading, engaging with others, making decisions, and budgeting.",
          "Mobility activities include planning and following journeys and moving around.",
        ],
        whatThisMeans: [
          "Use real tasks — not general statements.",
          "Mention aids and whether they fully solve the problem.",
          "Keep good-day / bad-day variation explicit.",
        ],
        checklist: [
          "Draft one paragraph per activity before typing into the form.",
          "Cross-check that cooking answers match fatigue answers elsewhere.",
          "Include timings (how long tasks take or how often you can do them).",
          "Ask someone who knows your routine to read for gaps only — not to change facts.",
        ],
        example:
          "Activity: Managing toilet needs — I can use the toilet independently on some days, but on bad days I need help with clothing and hygiene due to shoulder pain and balance. This happens several times a week and takes much longer than usual.",
        exampleLabel: "Activity answer pattern",
        aiPrompt: "Help me draft an answer for preparing food on my PIP renewal",
      },
    }),
    step({
      id: "evidence-checklist",
      number: 5,
      title: "Gather evidence that matches your answers",
      preview: "Send copies linked to activities — not an unorganised bundle of letters.",
      outcome: "Outcome: evidence pack",
      statusLabel: "Evidence",
      status: "upcoming",
      content: {
        intro:
          "Evidence supports what you write — it does not replace clear functional examples. The best renewal packs tie each document to an activity or risk you described.",
        whatThisMeans: [
          "Impact diaries are often more useful than generic diagnosis letters.",
          "Letters should describe function (what you cannot do) with dates.",
          "Photos of aids are helpful when linked to specific tasks.",
          "Send copies unless DWP asks for originals.",
        ],
        checklist: PIP_RENEWAL_GUIDE.evidenceChecklist?.map((item) => item.label) ?? [],
        example:
          "Attach a 4-week diary with dates matching examples in the form. Highlight entries that show bad days, recovery time, and help from others.",
        exampleLabel: "Evidence tip",
        aiPrompt: "What evidence should I include with my PIP renewal?",
      },
    }),
    step({
      id: "submit-and-next-steps",
      number: 6,
      title: "Submit, keep copies, and plan if the award changes",
      preview: "Record proof of submission and know your options if payments stop or reduce.",
      outcome: "Outcome: submission record and plan",
      statusLabel: "After submission",
      status: "upcoming",
      content: {
        intro:
          "After submission, keep proof and continue documenting impact if you are waiting for a decision. If the outcome is wrong for you, act quickly on mandatory reconsideration deadlines.",
        whatThisMeans: [
          "Online submissions should give a reference — save a screenshot.",
          "Posted forms should use recorded delivery if possible.",
          "Assessment answers should match what you wrote on the form.",
          "MR deadlines are usually strict — check your decision letter.",
        ],
        checklist: [
          "Keep a copy of the completed form and evidence index.",
          "Save proof of submission date and method.",
          "If invited to assessment, bring the same examples you wrote.",
          "If payments change, read the decision letter the same day and note appeal/MR dates.",
        ],
        example:
          "Decision received 12 August — MR deadline 11 September. Contact Citizens Advice within one week to review descriptors cited in the letter.",
        exampleLabel: "If the award changes",
        aiPrompt: "What should I do if my PIP renewal is refused or reduced?",
      },
    }),
  ],
};
