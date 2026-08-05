import type { HelpCard } from "@/data/help-cards/types";

const REVIEWED = "2026-07-25";

// Content reorganised from the previous Help Card packs and quick cards into the
// rights-and-rules model. Legal/driving/benefits wording is preserved, not strengthened.
// `checkedAt` / `reviewedAt` record when Access Stamp last reviewed the summary and confirmed
// the source links — they are not a guarantee of legal correctness.

export const HELP_CARDS: HelpCard[] = [
  {
    id: "section-88-driving-licence",
    slug: "section-88-driving-licence",
    title: "Driving while your DVLA application is being processed (Section 88)",
    category: "Driving and DVLA",
    categoryKey: "driving",
    summary:
      "Explains when Section 88 may let you keep driving while DVLA processes a licence application, and what to check first.",
    region: "Great Britain",
    highStakes: true,
    relatedGuideSlugs: ["cars"],
    disclaimer:
      "This is a practical summary, not a legal document, and does not prove you are entitled to drive. Check the official DVLA guidance before relying on it.",
    publicationState: "published",
    sources: [
      {
        id: "rta-1988-s88",
        title: "Road Traffic Act 1988, section 88",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "Great Britain",
        reference: "Section 88",
        url: "https://www.legislation.gov.uk/ukpga/1988/52/section/88",
        checkedAt: REVIEWED,
      },
      {
        id: "dvla-inf1886",
        title: "INF188/6 — Can I drive while my application is with DVLA?",
        authority: "DVLA",
        authorityType: "government-guidance",
        jurisdiction: "Great Britain",
        url: "https://www.gov.uk/government/publications/inf1886-can-i-drive-while-my-application-is-with-dvla",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "gb",
        contextLabel: "Great Britain (DVLA)",
        applicability: { jurisdiction: "Great Britain", regulator: "DVLA" },
        reviewedAt: REVIEWED,
        confirm: [
          "Whether your specific application and medical situation meet the Section 88 conditions.",
          "The current DVLA guidance, which can change and may affect your situation.",
        ],
        rules: [
          {
            id: "s88-continue-driving",
            section: "what-you-can-do",
            headline: "You may be able to keep driving while DVLA processes your application",
            plainEnglish:
              "Section 88 may allow you to continue driving while DVLA processes your application, but only if the required conditions are met.",
            status: "entitlement",
            applicability: "Great Britain, where the Section 88 conditions are met",
            atAGlance: true,
            ifChallenged:
              "Section 88 of the Road Traffic Act 1988 provides for driving while an application is being processed, subject to conditions. DVLA leaflet INF188/6 explains it.",
            suggestedWording:
              "I have submitted my DVLA application and I understand Section 88 may apply if the required conditions are met. I can show evidence of my application.",
            sourceIds: ["rta-1988-s88", "dvla-inf1886"],
          },
          {
            id: "s88-conditions",
            section: "conditions",
            headline: "Section 88 only applies if specific conditions are met",
            plainEnglish:
              "The concession depends on your circumstances. Check each condition against the official guidance before relying on it.",
            status: "condition",
            applicability: "Great Britain",
            atAGlance: true,
            conditions: [
              "You have submitted a valid application to DVLA.",
              "You previously held the relevant licence entitlement.",
              "You are not disqualified from driving.",
              "You meet any relevant medical standards.",
            ],
            exceptions: [
              "Different rules can apply to some medical conditions or licence types — check INF188/6.",
            ],
            sourceIds: ["dvla-inf1886", "rta-1988-s88"],
          },
          {
            id: "s88-evidence",
            section: "evidence",
            headline: "Carry evidence of your application",
            plainEnglish: "Keep proof that you have applied and any related documents available.",
            status: "condition",
            applicability: "Great Britain",
            evidenceToCarry: [
              "DVLA application confirmation or acknowledgement",
              "Previous licence details if available",
              "Relevant medical information if applicable",
              "Insurance confirmation if needed",
              "Any official DVLA correspondence",
            ],
            sourceIds: ["dvla-inf1886"],
          },
        ],
      },
    ],
  },
  {
    id: "blue-badge-issue",
    slug: "blue-badge-issue",
    title: "Explaining a Blue Badge parking issue",
    category: "Driving and parking",
    categoryKey: "driving",
    summary:
      "How to explain a Blue Badge or parking access issue calmly, and where the official scheme rules sit. Local council rules vary.",
    region: "England, Scotland and Wales",
    relatedGuideSlugs: ["cars", "transport"],
    disclaimer:
      "Blue Badge rules and enforcement vary by local council. This is a practical summary — check your council and the official scheme information.",
    publicationState: "published",
    sources: [
      {
        id: "gov-blue-badge",
        title: "Blue Badge scheme: information and how to apply",
        authority: "GOV.UK",
        authorityType: "government-guidance",
        jurisdiction: "England (Scotland and Wales run their own schemes)",
        url: "https://www.gov.uk/apply-blue-badge",
        checkedAt: REVIEWED,
      },
      {
        id: "gov-blue-badge-council",
        title: "Blue Badge scheme local council information",
        authority: "GOV.UK",
        authorityType: "government-guidance",
        jurisdiction: "England",
        url: "https://www.gov.uk/blue-badge-scheme-information-council",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "gb",
        contextLabel: "England, Scotland and Wales",
        applicability: { jurisdiction: "England, Scotland and Wales", note: "Local council rules vary" },
        reviewedAt: REVIEWED,
        confirm: [
          "Your local council's specific parking and enforcement rules.",
          "Whether the bay or restriction you are using is covered by the badge.",
        ],
        rules: [
          {
            id: "bb-explain",
            section: "what-you-can-do",
            headline: "Ask for time to show your badge and explain",
            plainEnglish:
              "You can calmly ask for time to show your Blue Badge and explain your access needs before the situation escalates.",
            status: "entitlement",
            applicability: "England, Scotland and Wales",
            atAGlance: true,
            suggestedWording:
              "I use a Blue Badge because I have access needs. Please give me time to show the badge and explain the situation clearly.",
            ifChallenged:
              "The Blue Badge scheme is run by councils under national guidance. Where you can park and any concessions depend on local rules.",
            sourceIds: ["gov-blue-badge", "gov-blue-badge-council"],
          },
          {
            id: "bb-local-rules",
            section: "conditions",
            headline: "Where you can park varies by council",
            plainEnglish:
              "Blue Badge concessions, eligible bays and enforcement differ between councils. Always check the local rules.",
            status: "provider-variable",
            applicability: "Varies by local council",
            atAGlance: true,
            sourceIds: ["gov-blue-badge-council"],
          },
          {
            id: "bb-evidence",
            section: "evidence",
            headline: "Keep evidence available if a parking issue is challenged",
            plainEnglish: "Having the badge and supporting details to hand can help resolve a dispute.",
            status: "condition",
            applicability: "England, Scotland and Wales",
            evidenceToCarry: [
              "Blue Badge",
              "Parking ticket or permit if relevant",
              "Photos of signage or bay markings",
              "Council correspondence if relevant",
              "Time and location notes",
            ],
            sourceIds: ["gov-blue-badge-council"],
          },
        ],
      },
    ],
  },
  {
    id: "job-interview-adjustments",
    slug: "job-interview-adjustments",
    title: "Asking for reasonable adjustments at a job interview",
    category: "Work and interviews",
    categoryKey: "work",
    summary:
      "What to ask for and how to request reasonable adjustments so you can take part in an interview fairly.",
    region: "England, Scotland and Wales",
    relatedGuideSlugs: ["workplace", "reasonable-adjustments-at-work"],
    disclaimer:
      "This is a practical summary. The Equality Act 2010 applies in England, Scotland and Wales; Northern Ireland has separate law. Check official sources for your situation.",
    publicationState: "published",
    sources: [
      {
        id: "ea-2010",
        title: "Equality Act 2010",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "England, Scotland and Wales",
        url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
        effectiveFrom: "2010-10-01",
        checkedAt: REVIEWED,
      },
      {
        id: "as-workplace-guide",
        title: "Access Stamp: reasonable adjustments at work",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/reasonable-adjustments-at-work",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "ew-s",
        contextLabel: "England, Scotland and Wales",
        applicability: { jurisdiction: "England, Scotland and Wales", law: "Equality Act 2010" },
        reviewedAt: REVIEWED,
        confirm: [
          "In Northern Ireland, separate disability discrimination law applies — check locally.",
          "What specific adjustments the employer can put in place for your interview.",
        ],
        rules: [
          {
            id: "jia-request",
            section: "what-you-can-do",
            headline: "You can ask for reasonable adjustments for the interview",
            plainEnglish:
              "Employers have a duty to consider reasonable adjustments so a disabled candidate is not put at a substantial disadvantage.",
            status: "entitlement",
            applicability: "England, Scotland and Wales (Equality Act 2010)",
            atAGlance: true,
            suggestedWording:
              "I'm asking for reasonable adjustments so I can take part in the interview fairly.",
            ifChallenged:
              "The Equality Act 2010 includes a duty to make reasonable adjustments so disabled people are not placed at a substantial disadvantage.",
            sourceIds: ["ea-2010", "as-workplace-guide"],
          },
          {
            id: "jia-what-to-ask",
            section: "what-you-can-do",
            headline: "Things you can ask about",
            plainEnglish: "Practical adjustments to raise with the employer, recruiter or organiser.",
            status: "entitlement",
            applicability: "England, Scotland and Wales",
            conditions: [
              "Ask whether the interview room is step-free.",
              "Ask whether an accessible toilet is nearby.",
              "Ask for extra time, breaks, remote options or communication support where needed.",
              "Ask for confirmation in writing.",
            ],
            sourceIds: ["as-workplace-guide"],
          },
          {
            id: "jia-evidence",
            section: "evidence",
            headline: "Useful information to prepare",
            plainEnglish: "Having a short summary ready can make the request easier.",
            status: "condition",
            applicability: "England, Scotland and Wales",
            evidenceToCarry: [
              "Short access-needs summary",
              "Previous adjustment examples",
              "Medical or access evidence if relevant",
              "Contact details for the interview organiser",
            ],
            sourceIds: ["as-workplace-guide"],
          },
        ],
      },
    ],
  },
  {
    id: "reasonable-adjustments-work",
    slug: "reasonable-adjustments-at-work",
    title: "Asking for reasonable adjustments at work",
    category: "Work and interviews",
    categoryKey: "work",
    summary:
      "How to raise reasonable adjustments when your current setup is creating barriers at work.",
    region: "England, Scotland and Wales",
    relatedGuideSlugs: ["reasonable-adjustments-at-work", "workplace"],
    disclaimer:
      "This is a practical summary. The Equality Act 2010 applies in England, Scotland and Wales; Northern Ireland has separate law.",
    publicationState: "published",
    sources: [
      {
        id: "ea-2010",
        title: "Equality Act 2010",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "England, Scotland and Wales",
        url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
        effectiveFrom: "2010-10-01",
        checkedAt: REVIEWED,
      },
      {
        id: "as-raw-guide",
        title: "Access Stamp: reasonable adjustments at work",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/reasonable-adjustments-at-work",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "ew-s",
        contextLabel: "England, Scotland and Wales",
        applicability: { jurisdiction: "England, Scotland and Wales", law: "Equality Act 2010" },
        reviewedAt: REVIEWED,
        confirm: [
          "What adjustments your employer can put in place for your role.",
          "In Northern Ireland, separate disability discrimination law applies.",
        ],
        rules: [
          {
            id: "raw-request",
            section: "what-you-can-do",
            headline: "You can request reasonable adjustments",
            plainEnglish:
              "Employers have a duty to consider reasonable adjustments where a disabled employee is placed at a substantial disadvantage.",
            status: "entitlement",
            applicability: "England, Scotland and Wales (Equality Act 2010)",
            atAGlance: true,
            suggestedWording:
              "I'm requesting reasonable adjustments because my current setup is creating barriers that affect my ability to work safely and effectively. I would like to discuss practical changes to reduce strain, prevent worsening symptoms, and allow me to continue working sustainably.",
            ifChallenged:
              "The Equality Act 2010 includes a duty to make reasonable adjustments so disabled people are not placed at a substantial disadvantage.",
            sourceIds: ["ea-2010", "as-raw-guide"],
          },
          {
            id: "raw-prepare",
            section: "what-you-can-do",
            headline: "What to set out in your request",
            plainEnglish: "Being specific makes it easier for your employer to respond.",
            status: "entitlement",
            applicability: "England, Scotland and Wales",
            conditions: [
              "What task is affected",
              "What barrier is causing the issue",
              "What adjustment would help",
              "What risk exists if nothing changes",
            ],
            sourceIds: ["as-raw-guide"],
          },
        ],
      },
    ],
  },
  {
    id: "gp-appointment-access",
    slug: "gp-appointment-access",
    title: "Explaining access needs for a GP appointment",
    category: "Healthcare and appointments",
    categoryKey: "healthcare",
    summary:
      "How to explain access and communication needs when booking, attending or following up a GP appointment.",
    region: "UK-wide (local practice procedures vary)",
    relatedGuideSlugs: ["rights"],
    disclaimer:
      "This is a practical summary. Individual GP practices set their own procedures — confirm arrangements with your practice.",
    publicationState: "published",
    sources: [
      {
        id: "as-rights-guide",
        title: "Access Stamp: your rights and access",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/rights",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "uk",
        contextLabel: "UK-wide",
        applicability: { jurisdiction: "UK", note: "Local practice procedures vary" },
        reviewedAt: REVIEWED,
        confirm: [
          "Your practice's specific booking and access procedures.",
          "Whether an accessible appointment format is available.",
        ],
        rules: [
          {
            id: "gp-ask",
            section: "what-you-can-do",
            headline: "Ask for an appointment format that works for you",
            plainEnglish:
              "You can ask reception or the booking team to arrange an appointment in a way you can attend safely.",
            status: "provider-variable",
            applicability: "Varies by practice",
            atAGlance: true,
            suggestedWording:
              "I need an appointment format that works with my access needs. Please help me arrange this in a way I can attend safely.",
            sourceIds: ["as-rights-guide"],
          },
          {
            id: "gp-prepare",
            section: "evidence",
            headline: "Prepare for the appointment",
            plainEnglish: "A short list of what matters can make the appointment more useful.",
            status: "condition",
            applicability: "UK-wide",
            evidenceToCarry: [
              "Main symptoms or problem",
              "How it affects daily life",
              "Medication list",
              "Access or communication needs",
              "Questions you want answered",
            ],
            sourceIds: ["as-rights-guide"],
          },
        ],
      },
    ],
  },
  {
    id: "social-care-assessment",
    slug: "social-care-assessment",
    title: "Preparing for a social care assessment",
    category: "Care and support",
    categoryKey: "care",
    summary:
      "How to explain daily needs, safety risks and carer impact during a social care needs assessment.",
    region: "England",
    relatedGuideSlugs: ["care"],
    disclaimer:
      "This is a practical summary. The Care Act 2014 applies in England; other UK nations have separate law. Check official sources for your area.",
    publicationState: "published",
    sources: [
      {
        id: "care-act-2014",
        title: "Care Act 2014",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "England",
        url: "https://www.legislation.gov.uk/ukpga/2014/23/contents",
        checkedAt: REVIEWED,
      },
      {
        id: "as-care-guide",
        title: "Access Stamp: care and support",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/care",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "england",
        contextLabel: "England (Care Act 2014)",
        applicability: { jurisdiction: "England", law: "Care Act 2014" },
        reviewedAt: REVIEWED,
        confirm: [
          "Procedures differ in Scotland, Wales and Northern Ireland — check your area.",
          "How your local authority runs its assessment.",
        ],
        rules: [
          {
            id: "sc-focus",
            section: "what-you-can-do",
            headline: "Keep the assessment focused on real daily needs",
            plainEnglish:
              "You can ask the assessment to look at what happens on a bad day and the support you need to stay safe.",
            status: "entitlement",
            applicability: "England (Care Act 2014)",
            atAGlance: true,
            suggestedWording:
              "I need this assessment to look at what happens on a bad day, the support I need to stay safe, and what would happen without that support.",
            ifChallenged:
              "The Care Act 2014 sets out how needs assessments and eligibility work in England.",
            sourceIds: ["care-act-2014", "as-care-guide"],
          },
          {
            id: "sc-prepare",
            section: "evidence",
            headline: "Prepare examples and evidence",
            plainEnglish: "Concrete examples help show the support you need.",
            status: "condition",
            applicability: "England",
            evidenceToCarry: [
              "Morning routine support needs",
              "Personal care support needs",
              "Transfers and mobility support",
              "Meal and hydration support",
              "Medication or health routines",
              "Risks if support is not provided",
              "Carer impact if relevant",
            ],
            sourceIds: ["as-care-guide"],
          },
        ],
      },
    ],
  },
  {
    id: "wheelchair-access-venue",
    slug: "wheelchair-access-venue",
    title: "Checking wheelchair access with a venue",
    category: "Venues and travel",
    categoryKey: "venues",
    summary:
      'What to ask when a venue says "wheelchair accessible" but gives no useful detail.',
    region: "England, Scotland and Wales",
    relatedGuideSlugs: ["transport", "travel"],
    disclaimer:
      "This is a practical summary. Service providers must consider reasonable adjustments under the Equality Act 2010 in England, Scotland and Wales.",
    publicationState: "published",
    sources: [
      {
        id: "ea-2010",
        title: "Equality Act 2010",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "England, Scotland and Wales",
        url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
        effectiveFrom: "2010-10-01",
        checkedAt: REVIEWED,
      },
      {
        id: "as-transport-guide",
        title: "Access Stamp: transport and getting around",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/transport",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "ew-s",
        contextLabel: "England, Scotland and Wales",
        applicability: { jurisdiction: "England, Scotland and Wales", law: "Equality Act 2010" },
        reviewedAt: REVIEWED,
        confirm: [
          "The specific access details for the venue you plan to visit.",
          "Whether staff can hold a clear route on the day.",
        ],
        rules: [
          {
            id: "wav-ask",
            section: "what-you-can-do",
            headline: "Ask for specific access details before booking",
            plainEnglish:
              'A venue saying "accessible" is not enough — ask for concrete details you can rely on.',
            status: "provider-variable",
            applicability: "Any venue",
            atAGlance: true,
            suggestedWording:
              "Hi, I'm planning to visit and need to check a few access details before booking. Could you confirm the step-free entrance location, narrowest doorway width, accessible toilet layout, and whether staff can keep a clear route to the table?",
            ifChallenged:
              "Service providers must consider reasonable adjustments for disabled people under the Equality Act 2010 in England, Scotland and Wales.",
            sourceIds: ["ea-2010", "as-transport-guide"],
          },
          {
            id: "wav-checklist",
            section: "evidence",
            headline: "Details worth confirming",
            plainEnglish: "Specific questions get more useful answers than a yes/no.",
            status: "condition",
            applicability: "Any venue",
            evidenceToCarry: [
              "Step-free entrance location",
              "Narrowest doorway width",
              "Accessible toilet layout",
              "Parking or drop-off arrangements",
            ],
            sourceIds: ["as-transport-guide"],
          },
        ],
      },
    ],
  },
  {
    id: "appointment-access",
    slug: "explain-access-before-appointment",
    title: "Explaining access needs before an appointment",
    category: "Healthcare and appointments",
    categoryKey: "healthcare",
    summary:
      "How to confirm access arrangements before a medical, council, Jobcentre, education or service appointment.",
    region: "England, Scotland and Wales",
    relatedGuideSlugs: ["rights"],
    disclaimer:
      "This is a practical summary. Service providers must consider reasonable adjustments under the Equality Act 2010 in England, Scotland and Wales.",
    publicationState: "published",
    sources: [
      {
        id: "ea-2010",
        title: "Equality Act 2010",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "England, Scotland and Wales",
        url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
        effectiveFrom: "2010-10-01",
        checkedAt: REVIEWED,
      },
      {
        id: "as-rights-guide",
        title: "Access Stamp: your rights and access",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/rights",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "ew-s",
        contextLabel: "England, Scotland and Wales",
        applicability: { jurisdiction: "England, Scotland and Wales", law: "Equality Act 2010" },
        reviewedAt: REVIEWED,
        confirm: [
          "The specific arrangements the service can put in place.",
          "Whether a support person can attend.",
        ],
        rules: [
          {
            id: "aa-confirm",
            section: "what-you-can-do",
            headline: "Confirm access arrangements ahead of time",
            plainEnglish:
              "You can set out what you need before the appointment so it can be arranged in advance.",
            status: "provider-variable",
            applicability: "Any service provider",
            atAGlance: true,
            suggestedWording:
              "Before my appointment, I need to confirm the access arrangements. I need step-free access, enough space for my wheelchair, a suitable waiting arrangement, and permission for a support person to attend if needed.",
            ifChallenged:
              "Service providers must consider reasonable adjustments for disabled people under the Equality Act 2010 in England, Scotland and Wales.",
            sourceIds: ["ea-2010", "as-rights-guide"],
          },
          {
            id: "aa-checklist",
            section: "evidence",
            headline: "What to confirm",
            plainEnglish: "A short list keeps the arrangements clear.",
            status: "condition",
            applicability: "Any service provider",
            evidenceToCarry: [
              "Step-free access",
              "Accessible toilet",
              "Waiting time",
              "Seating or positioning needs",
              "Support person attendance",
            ],
            sourceIds: ["as-rights-guide"],
          },
        ],
      },
    ],
  },
  {
    id: "inaccessible-information",
    slug: "report-inaccessible-information",
    title: "Requesting accessible information",
    category: "Accessible services",
    categoryKey: "information",
    summary:
      "How to ask for information in an accessible format when a website, document, form or service is hard to use.",
    region: "England, Scotland and Wales",
    relatedGuideSlugs: ["rights"],
    disclaimer:
      "This is a practical summary. Service providers must consider reasonable adjustments under the Equality Act 2010 in England, Scotland and Wales.",
    publicationState: "published",
    sources: [
      {
        id: "ea-2010",
        title: "Equality Act 2010",
        authority: "UK Parliament",
        authorityType: "law-or-regulation",
        jurisdiction: "England, Scotland and Wales",
        url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
        effectiveFrom: "2010-10-01",
        checkedAt: REVIEWED,
      },
      {
        id: "as-rights-guide",
        title: "Access Stamp: your rights and access",
        authority: "Access Stamp",
        authorityType: "access-stamp-practical",
        jurisdiction: "UK",
        url: "/advice/rights",
        checkedAt: REVIEWED,
      },
    ],
    variants: [
      {
        id: "ew-s",
        contextLabel: "England, Scotland and Wales",
        applicability: { jurisdiction: "England, Scotland and Wales", law: "Equality Act 2010" },
        reviewedAt: REVIEWED,
        confirm: [
          "Which accessible format the provider can supply.",
          "Any deadline that applies to your situation.",
        ],
        rules: [
          {
            id: "ii-request",
            section: "what-you-can-do",
            headline: "Ask for an accessible format",
            plainEnglish:
              "You can ask a provider to supply information in a format you can use, such as plain text, large print or a screen-reader-friendly document.",
            status: "provider-variable",
            applicability: "Any service provider",
            atAGlance: true,
            suggestedWording:
              "I'm unable to access this information in its current format. Please provide it in an accessible format, such as plain text, large print, a screen-reader-friendly PDF, or email text.",
            ifChallenged:
              "Service providers must consider reasonable adjustments for disabled people under the Equality Act 2010 in England, Scotland and Wales.",
            sourceIds: ["ea-2010", "as-rights-guide"],
          },
          {
            id: "ii-details",
            section: "evidence",
            headline: "Details to include",
            plainEnglish: "Being clear about what you need speeds up the response.",
            status: "condition",
            applicability: "Any service provider",
            evidenceToCarry: [
              "What format is inaccessible",
              "What you need instead",
              "Deadline or urgency",
              "Who needs to respond",
            ],
            sourceIds: ["as-rights-guide"],
          },
        ],
      },
    ],
  },
];

export function getHelpCard(slug: string): HelpCard | undefined {
  return HELP_CARDS.find((card) => card.slug === slug);
}

export function getPublishedHelpCards(): HelpCard[] {
  return HELP_CARDS.filter((card) => card.publicationState === "published");
}

export function getHelpCardTopics(card: HelpCard, variantId?: string): string[] {
  const variant = card.variants.find((item) => item.id === variantId) ?? card.variants[0];
  return variant ? variant.rules.map((rule) => rule.headline) : [];
}
