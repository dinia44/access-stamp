export type LawGuidanceLink = {
  title: string;
  href: string;
  helpsWith: string;
  audience: "Work" | "Education" | "Travel" | "Services" | "Housing" | "General";
};

export const LAWS_GUIDANCE_LINKS: LawGuidanceLink[] = [
  {
    title: "Equality Act 2010 (legislation.gov.uk)",
    href: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
    helpsWith: "Core legal rights, discrimination definitions, and duty to make reasonable adjustments.",
    audience: "General",
  },
  {
    title: "EHRC: Employment Statutory Code of Practice",
    href: "https://www.equalityhumanrights.com/guidance/employment-code-practice",
    helpsWith: "How workplace discrimination and adjustments are interpreted in practice.",
    audience: "Work",
  },
  {
    title: "Acas: Reasonable adjustments at work",
    href: "https://www.acas.org.uk/reasonable-adjustments",
    helpsWith: "Practical workplace adjustment examples and employer process guidance.",
    audience: "Work",
  },
  {
    title: "Access to Work guidance (GOV.UK)",
    href: "https://www.gov.uk/access-to-work",
    helpsWith: "Funding for support workers, specialist kit, travel support, and coaching.",
    audience: "Work",
  },
  {
    title: "EASS (Equality Advisory and Support Service)",
    href: "https://www.equalityadvisoryservice.com/",
    helpsWith: "Free support on discrimination rights and complaint routes.",
    audience: "General",
  },
  {
    title: "SEND Code of Practice",
    href: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
    helpsWith: "How schools/colleges should support children and young people with SEND.",
    audience: "Education",
  },
  {
    title: "Disabled Students' Allowance (DSA)",
    href: "https://www.gov.uk/disabled-students-allowance-dsa",
    helpsWith: "Higher education funding for disability-related study support.",
    audience: "Education",
  },
  {
    title: "Civil Aviation Authority: Accessible air travel",
    href: "https://www.caa.co.uk/passengers/reduced-mobility/",
    helpsWith: "Airport and airline assistance standards and complaint pathways.",
    audience: "Travel",
  },
  {
    title: "US DOT rules for disabled air travellers",
    href: "https://www.transportation.gov/individuals/aviation-consumer-protection/passengers-disabilities",
    helpsWith: "Useful references when flights involve US routes/carriers and wheelchair damage disputes.",
    audience: "Travel",
  },
  {
    title: "Housing Ombudsman",
    href: "https://www.housing-ombudsman.org.uk/",
    helpsWith: "Escalation for unresolved social/landlord housing complaints.",
    audience: "Housing",
  },
  {
    title: "Disabled Facilities Grant (DFG)",
    href: "https://www.gov.uk/disabled-facilities-grants",
    helpsWith: "Funding route for home adaptations in England.",
    audience: "Housing",
  },
  {
    title: "Transport Focus complaints guidance",
    href: "https://www.transportfocus.org.uk/advice-and-complaints/",
    helpsWith: "Escalating unresolved rail and transport complaint issues.",
    audience: "Services",
  },
];
