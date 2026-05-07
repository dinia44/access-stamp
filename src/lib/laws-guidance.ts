export type LawGuidanceLink = {
  title: string;
  href: string;
  helpsWith: string;
  audience: "Work" | "Education" | "Travel" | "Services" | "Housing" | "General";
  moreInfoHref: string;
};

export const LAWS_GUIDANCE_LINKS: LawGuidanceLink[] = [
  {
    title: "Equality Act 2010 (legislation.gov.uk)",
    href: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
    helpsWith: "Core legal rights, discrimination definitions, and duty to make reasonable adjustments.",
    audience: "General",
    moreInfoHref: "/help-cards?concern=Equality%20Act%20rights",
  },
  {
    title: "EHRC: Employment Statutory Code of Practice",
    href: "https://www.equalityhumanrights.com/guidance/employment-code-practice",
    helpsWith: "How workplace discrimination and adjustments are interpreted in practice.",
    audience: "Work",
    moreInfoHref: "/help-cards?concern=Disability%20discrimination%20at%20work",
  },
  {
    title: "Acas: Reasonable adjustments at work",
    href: "https://www.acas.org.uk/reasonable-adjustments",
    helpsWith: "Practical workplace adjustment examples and employer process guidance.",
    audience: "Work",
    moreInfoHref: "/advice/workplace",
  },
  {
    title: "Access to Work guidance (GOV.UK)",
    href: "https://www.gov.uk/access-to-work",
    helpsWith: "Funding for support workers, specialist kit, travel support, and coaching.",
    audience: "Work",
    moreInfoHref: "/help-cards?concern=Access%20to%20Work",
  },
  {
    title: "EASS (Equality Advisory and Support Service)",
    href: "https://www.equalityadvisoryservice.com/",
    helpsWith: "Free support on discrimination rights and complaint routes.",
    audience: "General",
    moreInfoHref: "/help-cards?concern=Making%20a%20formal%20complaint",
  },
  {
    title: "SEND Code of Practice",
    href: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
    helpsWith: "How schools/colleges should support children and young people with SEND.",
    audience: "Education",
    moreInfoHref: "/advice/education",
  },
  {
    title: "Disabled Students' Allowance (DSA)",
    href: "https://www.gov.uk/disabled-students-allowance-dsa",
    helpsWith: "Higher education funding for disability-related study support.",
    audience: "Education",
    moreInfoHref: "/advice/dsa-disabled-students-allowance",
  },
  {
    title: "Civil Aviation Authority: Accessible air travel",
    href: "https://www.caa.co.uk/passengers/reduced-mobility/",
    helpsWith: "Airport and airline assistance standards and complaint pathways.",
    audience: "Travel",
    moreInfoHref: "/help-cards?concern=Flying%20with%20a%20wheelchair",
  },
  {
    title: "US DOT rules for disabled air travellers",
    href: "https://www.transportation.gov/individuals/aviation-consumer-protection/passengers-disabilities",
    helpsWith: "Useful references when flights involve US routes/carriers and wheelchair damage disputes.",
    audience: "Travel",
    moreInfoHref: "/help-cards?concern=Wheelchair%20damaged%20by%20airline",
  },
  {
    title: "Housing Ombudsman",
    href: "https://www.housing-ombudsman.org.uk/",
    helpsWith: "Escalation for unresolved social/landlord housing complaints.",
    audience: "Housing",
    moreInfoHref: "/help-cards?concern=Housing%20accessibility%20refusal",
  },
  {
    title: "Disabled Facilities Grant (DFG)",
    href: "https://www.gov.uk/disabled-facilities-grants",
    helpsWith: "Funding route for home adaptations in England.",
    audience: "Housing",
    moreInfoHref: "/advice/care",
  },
  {
    title: "Transport Focus complaints guidance",
    href: "https://www.transportfocus.org.uk/advice-and-complaints/",
    helpsWith: "Escalating unresolved rail and transport complaint issues.",
    audience: "Services",
    moreInfoHref: "/help-cards?concern=Public%20transport%20refusal",
  },
];
