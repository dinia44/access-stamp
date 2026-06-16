export type CoreHelpCard = {
  id: string;
  title: string;
  situation: string;
  checklist: string[];
  script: string;
  guideHref?: string;
};

export const CORE_HELP_CARDS: CoreHelpCard[] = [
  {
    id: "wheelchair-access-venue",
    title: "Ask a venue about wheelchair access",
    situation: 'Use this when a venue says "wheelchair accessible" but gives no useful detail.',
    checklist: [
      "Step-free entrance location",
      "Narrowest doorway width",
      "Accessible toilet layout",
      "Parking or drop-off arrangements",
    ],
    script:
      "Hi, I'm planning to visit and need to check a few access details before booking. Could you confirm the step-free entrance location, narrowest doorway width, accessible toilet layout, and whether staff can keep a clear route to the table?",
    guideHref: "/advice/transport",
  },
  {
    id: "reasonable-adjustments-work",
    title: "Ask for reasonable adjustments at work",
    situation: "Use this when work is becoming difficult, unsafe, or inaccessible.",
    checklist: [
      "What task is affected",
      "What barrier is causing the issue",
      "What adjustment would help",
      "What risk exists if nothing changes",
    ],
    script:
      "I'm requesting reasonable adjustments because my current setup is creating barriers that affect my ability to work safely and effectively. I would like to discuss practical changes to reduce strain, prevent worsening symptoms, and allow me to continue working sustainably.",
    guideHref: "/advice/reasonable-adjustments-at-work",
  },
  {
    id: "appointment-access",
    title: "Explain access needs before an appointment",
    situation: "Use this before a medical, council, Jobcentre, education, or service appointment.",
    checklist: [
      "Step-free access",
      "Accessible toilet",
      "Waiting time",
      "Seating or positioning needs",
      "Support person attendance",
    ],
    script:
      "Before my appointment, I need to confirm the access arrangements. I need step-free access, enough space for my wheelchair, a suitable waiting arrangement, and permission for a support person to attend if needed.",
    guideHref: "/advice/rights",
  },
  {
    id: "inaccessible-information",
    title: "Report inaccessible information",
    situation: "Use this when a website, document, form, or service is difficult to use.",
    checklist: [
      "What format is inaccessible",
      "What you need instead",
      "Deadline or urgency",
      "Who needs to respond",
    ],
    script:
      "I'm unable to access this information in its current format. Please provide it in an accessible format, such as plain text, large print, a screen-reader-friendly PDF, or email text.",
    guideHref: "/advice/rights",
  },
];
