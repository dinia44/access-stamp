import type { HelpCardTaskCategoryId } from "@/lib/help-cards/categories";

export type HelpCardType =
  | "quick-script"
  | "adjustment-request"
  | "evidence-summary"
  | "carry-with"
  | "emergency"
  | "follow-up";

export type HelpCard = {
  id: string;
  type: HelpCardType;
  title: string;
  label: string;
  shortDescription: string;
  body?: string;
  keyLine?: string;
  keyPoints?: string[];
  checklist?: string[];
  sources?: {
    label: string;
    href?: string;
  }[];
  /** ISO date YYYY-MM-DD. Never use placeholders. */
  lastChecked?: string;
  disclaimer?: string;
};

export type HelpCardPack = {
  slug: string;
  title: string;
  category: string;
  categoryKey: Exclude<HelpCardTaskCategoryId, "all">;
  description: string;
  useWhen: string;
  urgency: "low" | "medium" | "high";
  jurisdiction?: string;
  /** ISO date YYYY-MM-DD. Omit when unavailable — never invent or use placeholders. */
  lastReviewed?: string;
  highStakes?: boolean;
  cards: HelpCard[];
};

export const helpCardPacks: HelpCardPack[] = [
  {
    slug: "section-88-driving-licence",
    title: "Section 88 driving licence pack",
    category: "Driving / DVLA",
    categoryKey: "driving",
    description:
      "Cards for explaining a DVLA application situation clearly, carrying the right evidence, and checking official sources.",
    useWhen:
      "Use this when someone needs to explain that they have applied to DVLA and need clear wording about their position.",
    urgency: "high",
    highStakes: true,
    jurisdiction: "UK-wide",
    cards: [
      {
        id: "section-88-quick-script",
        type: "quick-script",
        title: "Quick explanation card",
        label: "What to say",
        shortDescription: "A short line for explaining the situation clearly.",
        keyLine:
          "I have submitted my DVLA application and I understand Section 88 may apply if the required conditions are met. I can show evidence of my application.",
        body:
          "Use this as a calm explanation when you need to explain the situation quickly. This is not legal advice and should be checked against official DVLA guidance.",
      },
      {
        id: "section-88-evidence-summary",
        type: "evidence-summary",
        title: "Section 88 evidence summary",
        label: "What to show",
        shortDescription:
          "A formal source-backed summary card for when a clearer explanation is needed.",
        body:
          "Section 88 may allow a person to continue driving while DVLA processes an application, if the required conditions are met. The person should check the official DVLA guidance before relying on this.",
        keyPoints: [
          "The person should have submitted a valid application to DVLA.",
          "The person should have previously held the relevant licence entitlement.",
          "The person must not be disqualified from driving.",
          "Evidence of the DVLA application or acknowledgement should be carried.",
          "The official DVLA guidance should be checked before relying on this card.",
        ],
        sources: [
          {
            label: "DVLA INF188/6 — Can I drive while my application is with DVLA?",
            href: "https://www.gov.uk/government/publications/inf1886-can-i-drive-while-my-application-is-with-dvla",
          },
          {
            label: "Road Traffic Act 1988, section 88",
            href: "https://www.legislation.gov.uk/ukpga/1988/52/section/88",
          },
        ],
        disclaimer:
          "This is a practical summary, not a legal document. Check official sources before relying on it.",
      },
      {
        id: "section-88-carry-with",
        type: "carry-with",
        title: "Carry-with checklist",
        label: "What to bring",
        shortDescription:
          "A simple checklist of documents or evidence to keep available.",
        checklist: [
          "DVLA application confirmation or acknowledgement",
          "Previous licence details if available",
          "Relevant medical information if applicable",
          "Insurance confirmation if needed",
          "Any official DVLA correspondence",
        ],
      },
      {
        id: "section-88-emergency",
        type: "emergency",
        title: "High-pressure explanation",
        label: "Urgent wording",
        shortDescription:
          "A short, readable card for stressful or time-sensitive conversations.",
        keyLine:
          "I need time to show my DVLA application evidence and check the official guidance before answering further.",
      },
    ],
  },
  {
    slug: "job-interview-adjustments",
    title: "Job interview adjustment pack",
    category: "Work & interviews",
    categoryKey: "work",
    description:
      "Cards for asking for interview adjustments, explaining access needs and following up in writing.",
    useWhen:
      "Use this before or during a job interview process where reasonable adjustments may be needed.",
    urgency: "medium",
    jurisdiction: "UK-wide",
    cards: [
      {
        id: "job-interview-quick-script",
        type: "quick-script",
        title: "Interview adjustment request",
        label: "What to say",
        shortDescription: "A short line for requesting interview adjustments.",
        keyLine:
          "I'm asking for reasonable adjustments so I can take part in the interview fairly.",
        body:
          "Use this when contacting the employer, recruiter, or interview organiser before the interview.",
      },
      {
        id: "job-interview-adjustment-card",
        type: "adjustment-request",
        title: "Adjustment request card",
        label: "What to ask for",
        shortDescription:
          "A structured card for asking about room access, timing, breaks, remote options and support.",
        keyPoints: [
          "Ask whether the interview room is step-free.",
          "Ask whether an accessible toilet is nearby.",
          "Ask for extra time, breaks, remote options or communication support where needed.",
          "Ask for confirmation in writing.",
        ],
      },
      {
        id: "job-interview-carry-with",
        type: "carry-with",
        title: "Interview evidence checklist",
        label: "What to bring",
        shortDescription:
          "A simple checklist of access information that may help before an interview.",
        checklist: [
          "Short access-needs summary",
          "Previous adjustment examples",
          "Medical or access evidence if relevant",
          "Contact details for the interview organiser",
        ],
      },
    ],
  },
  {
    slug: "blue-badge-issue",
    title: "Blue Badge issue pack",
    category: "Parking / Travel",
    categoryKey: "driving",
    description:
      "Cards for explaining Blue Badge access issues, parking disputes, and evidence to keep available.",
    useWhen:
      "Use this when there is confusion, challenge or dispute around Blue Badge parking access.",
    urgency: "high",
    highStakes: true,
    jurisdiction: "England, Scotland and Wales (local rules vary)",
    cards: [
      {
        id: "blue-badge-quick-script",
        type: "quick-script",
        title: "Blue Badge explanation card",
        label: "What to say",
        shortDescription:
          "A calm line for explaining a Blue Badge or parking access issue.",
        keyLine:
          "I use a Blue Badge because I have access needs. Please give me time to show the badge and explain the situation clearly.",
      },
      {
        id: "blue-badge-carry-with",
        type: "carry-with",
        title: "Blue Badge checklist",
        label: "What to bring",
        shortDescription:
          "Documents and details that may help if a parking issue is challenged.",
        checklist: [
          "Blue Badge",
          "Parking ticket or permit if relevant",
          "Photos of signage or bay markings",
          "Council correspondence if relevant",
          "Time and location notes",
        ],
      },
    ],
  },
  {
    slug: "gp-appointment-access",
    title: "GP appointment access pack",
    category: "Healthcare",
    categoryKey: "healthcare",
    description:
      "Cards for explaining access needs, communication needs, symptoms, and practical support before or during a GP appointment.",
    useWhen:
      "Use this when booking, attending, or following up after a GP appointment.",
    urgency: "medium",
    jurisdiction: "UK-wide (local practice procedures vary)",
    cards: [
      {
        id: "gp-reception-script",
        type: "quick-script",
        title: "Reception script",
        label: "What to say",
        shortDescription: "A short script for reception or appointment booking.",
        keyLine:
          "I need an appointment format that works with my access needs. Please help me arrange this in a way I can attend safely.",
      },
      {
        id: "gp-access-checklist",
        type: "carry-with",
        title: "Appointment checklist",
        label: "What to bring",
        shortDescription:
          "A checklist to help prepare for the appointment.",
        checklist: [
          "Main symptoms or problem",
          "How it affects daily life",
          "Medication list",
          "Access or communication needs",
          "Questions you want answered",
        ],
      },
    ],
  },
  {
    slug: "social-care-assessment",
    title: "Social care assessment pack",
    category: "Care / Support",
    categoryKey: "care",
    description:
      "Cards for explaining daily needs, safety risks, carer impact and support needs during a care assessment.",
    useWhen:
      "Use this before or during a social care assessment or review.",
    urgency: "medium",
    jurisdiction: "England (procedures differ across the UK)",
    cards: [
      {
        id: "social-care-quick-script",
        type: "quick-script",
        title: "Assessment opening card",
        label: "What to say",
        shortDescription:
          "A short opening line for keeping the assessment focused on real daily needs.",
        keyLine:
          "I need this assessment to look at what happens on a bad day, the support I need to stay safe, and what would happen without that support.",
      },
      {
        id: "social-care-checklist",
        type: "carry-with",
        title: "Daily needs checklist",
        label: "What to prepare",
        shortDescription:
          "A practical checklist for preparing evidence and examples.",
        checklist: [
          "Morning routine support needs",
          "Personal care support needs",
          "Transfers and mobility support",
          "Meal and hydration support",
          "Medication or health routines",
          "Risks if support is not provided",
          "Carer impact if relevant",
        ],
      },
    ],
  },
];

export function getHelpCardPack(slug: string): HelpCardPack | undefined {
  return helpCardPacks.find((pack) => pack.slug === slug);
}

export function getPackCardTypes(pack: HelpCardPack): string[] {
  return Array.from(new Set(pack.cards.map((card) => card.label)));
}
