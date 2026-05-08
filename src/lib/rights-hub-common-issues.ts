/**
 * Topics people most often need when disability-related rights feel unclear or blocked.
 * Grounded in common UK friction points (Equality Act duties, services, health, housing, benefits).
 */

export type RightsCommonIssue = {
  id: string;
  title: string;
  summary: string;
  /** Tailwind border/ring accent — must match existing palette classes */
  accent: "blue" | "amber" | "violet";
  icon: string;
  /** On-site guide: `/advice/{guideSlug}` */
  guideSlug?: string;
  /** Use when the best match is another hub or a guide outside the Rights category */
  articleHref?: string;
  /** Reputable UK sources for deeper reading */
  external?: { label: string; href: string }[];
};

export const RIGHTS_COMMON_ISSUES: RightsCommonIssue[] = [
  {
    id: "adjustments-ignored",
    title: "They won’t make reasonable adjustments",
    summary:
      "Employers, schools, universities, and businesses must remove barriers where it’s reasonable. Silence, long delays, or vague refusals without alternatives are a classic pain point.",
    accent: "blue",
    icon: "⚖️",
    guideSlug: "reasonable-adjustments",
    external: [
      { label: "Citizens Advice — reasonable adjustments", href: "https://www.citizensadvice.org.uk/law-and-courts/discrimination/check-what-type-of-discrimination-youve-experienced/duty-to-make-reasonable-adjustments-for-disabled-people/" },
      { label: "Acas — reasonable adjustments at work", href: "https://www.acas.org.uk/reasonable-adjustments" },
    ],
  },
  {
    id: "equality-act-basics",
    title: "You need the law in plain language",
    summary:
      "Understanding protected characteristics, discrimination types, and who the Equality Act covers helps you frame requests and complaints without getting lost in jargon.",
    accent: "violet",
    icon: "📘",
    guideSlug: "equality-act",
    external: [
      { label: "Citizens Advice — disability discrimination", href: "https://www.citizensadvice.org.uk/law-and-courts/discrimination/discrimination-because-of-disability/disability-discrimination/" },
      { label: "EHRC — disability guidance", href: "https://www.equalityhumanrights.com/en/advice-and-guidance/guidance-on-unlawful-discrimination" },
    ],
  },
  {
    id: "workplace-treatment",
    title: "Problems at work feel discriminatory",
    summary:
      "From interview access to ongoing treatment, many people get stuck between HR processes and worsening health. A clear timeline and written requests matter.",
    accent: "amber",
    icon: "💼",
    guideSlug: "equality-act",
    external: [
      { label: "Citizens Advice — asking for changes at work", href: "https://www.citizensadvice.org.uk/work/discrimination-at-work/discrimination-at-work/taking-action/asking-your-employer-for-changes-to-help-if-youre-disabled/" },
    ],
  },
  {
    id: "services-access",
    title: "Shops, venues, or online services block access",
    summary:
      "Inaccessible websites, refusal of assistance, or “computer says no” systems affect daily life. You can often ask for an alternative format or route at the point of use.",
    accent: "blue",
    icon: "🏪",
    guideSlug: "public-services",
    external: [
      { label: "Citizens Advice — services discrimination", href: "https://www.citizensadvice.org.uk/consumer/discrimination-in-the-provision-of-goods-and-services/discrimination-in-the-provision-of-goods-and-services1/" },
    ],
  },
  {
    id: "nhs-gp-trapped",
    title: "GP or NHS access isn’t working",
    summary:
      "Appointment systems, communication barriers, and long waits disproportionately hit disabled people. Know what to ask for and how to escalate within the NHS.",
    accent: "amber",
    icon: "🩺",
    guideSlug: "gp-access",
    external: [{ label: "NHS — how to complain", href: "https://www.england.nhs.uk/contact-us/complaint/" }],
  },
  {
    id: "nhs-complaint",
    title: "You need to complain about NHS care",
    summary:
      "Most people want resolution, not a fight. Local resolution, PALS, and the Parliamentary and Health Service Ombudsman exist for when care or communication breaks down.",
    accent: "violet",
    icon: "📋",
    guideSlug: "nhs-complaints",
    external: [{ label: "NHS complaints — overview", href: "https://www.nhs.uk/nhs-services/hospitals/how-to-complain-to-the-nhs/" }],
  },
  {
    id: "housing-barriers",
    title: "Housing or adaptations are refused or delayed",
    summary:
      "Waiting lists, unclear allocation rules, and landlord resistance to adaptations are common. Evidence of functional impact strengthens review and appeal routes.",
    accent: "blue",
    icon: "🏠",
    guideSlug: "council-housing-priority",
    external: [
      { label: "Citizens Advice — discrimination in housing", href: "https://www.citizensadvice.org.uk/housing/discrimination-in-housing/discrimination-in-housing-what-are-your-rights/" },
    ],
  },
  {
    id: "benefits-decisions",
    title: "Benefits assessments feel unfair",
    summary:
      "Poor communication, inaccessible forms, and rushed assessments show up repeatedly. Reasonable adjustment duties can apply to how assessments are delivered too.",
    accent: "amber",
    icon: "📬",
    guideSlug: "uc-lcwra",
    external: [
      { label: "Citizens Advice — PIP", href: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/" },
      { label: "Citizens Advice — Universal Credit if disabled", href: "https://www.citizensadvice.org.uk/benefits/universal-credit/universal-credit-and-disabled-people/" },
    ],
  },
  {
    id: "formal-escalation",
    title: "You’re ready to escalate formally",
    summary:
      "When informal chats fail, a structured complaint with dates, evidence, and a clear “ask” is easier for you and harder for organisations to ignore.",
    accent: "violet",
    icon: "✉️",
    guideSlug: "formal-complaints",
    external: [
      { label: "Citizens Advice — taking court action", href: "https://www.citizensadvice.org.uk/law-and-courts/legal-system/taking-legal-action/taking-legal-action-about-discrimination/" },
    ],
  },
  {
    id: "advocacy-support",
    title: "You need someone on your side",
    summary:
      "Independent advocacy can help in meetings, complaints, and care reviews — especially when you’re exhausted or outnumbered.",
    accent: "blue",
    icon: "🤝",
    guideSlug: "advocacy",
    external: [{ label: "NHS — find an advocate", href: "https://www.nhs.uk/nhs-services/hospitals/how-to-get-an-advocate/" }],
  },
  {
    id: "eass",
    title: "You want to check discrimination routes",
    summary:
      "The Equality Advisory and Support Service offers information on Equality Act issues and next steps before or alongside legal advice.",
    accent: "amber",
    icon: "☎️",
    guideSlug: "eass",
    external: [{ label: "EASS", href: "https://www.equalityadvisoryservice.com/" }],
  },
  {
    id: "mental-health-urgent",
    title: "Mental health crisis or unsafe care",
    summary:
      "If you or someone you support is at risk, rights and crisis pathways still apply. Prioritise immediate safety, then documentation and follow-up support.",
    accent: "violet",
    icon: "💚",
    guideSlug: "mental-health-crisis",
    external: [{ label: "NHS — urgent mental health help", href: "https://www.nhs.uk/nhs-services/mental-health-services/get-urgent-help-for-mental-health/" }],
  },
  {
    id: "pip-and-work-capability",
    title: "PIP, work capability, or benefit decisions feel wrong",
    summary:
      "Mandatory reconsideration, appeals, and “fit for work” disputes are among the most searched disability topics. Poor communication and inaccessible assessments are frequent complaints — adjustment duties can apply to how assessments are run too.",
    accent: "amber",
    icon: "📎",
    articleHref: "/advice/pip-in-plain-english",
    external: [
      { label: "Citizens Advice — challenging a benefit decision", href: "https://www.citizensadvice.org.uk/benefits/benefits-introduction/challenging-a-benefits-decision/" },
      { label: "Citizens Advice — disability discrimination and benefits", href: "https://www.citizensadvice.org.uk/benefits/benefits-introduction/problems-with-benefits-and-tax-credits/disability-discrimination-and-benefits/" },
    ],
  },
  {
    id: "transport-assistance",
    title: "Public transport, stations, or assistance go wrong",
    summary:
      "Refused ramp help, broken lifts, assistance not booked, or taxis that won’t take a wheelchair are everyday failures. Know how to complain on the day and afterwards.",
    accent: "blue",
    icon: "🚆",
    articleHref: "/advice/transport",
    external: [
      { label: "Citizens Advice — disability discrimination (includes services and transport)", href: "https://www.citizensadvice.org.uk/law-and-courts/discrimination/discrimination-because-of-disability/disability-discrimination/" },
    ],
  },
  {
    id: "education-adjustments",
    title: "School, college, or university won’t put support in place",
    summary:
      "EHCPs, SEND support, exam access arrangements, and university disability services all sit under disability and equality duties — but delays and “we’ll review next term” are common.",
    accent: "violet",
    icon: "🎓",
    articleHref: "/advice/education",
    external: [
      { label: "Citizens Advice — disability discrimination in education", href: "https://www.citizensadvice.org.uk/law-and-courts/discrimination/discrimination-because-of-disability/discrimination-in-education/" },
    ],
  },
  {
    id: "workplace-deep-dive",
    title: "You need workplace-specific tactics (not only the law)",
    summary:
      "Access to Work, occupational health, phased returns, and meeting scripts are where many people get stuck after the first adjustment email. This hub focuses on practical workplace steps.",
    accent: "amber",
    icon: "🧰",
    articleHref: "/advice/workplace",
    external: [{ label: "GOV.UK — reasonable adjustments at work", href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers" }],
  },
  {
    id: "chc-funding",
    title: "Continuing healthcare (CHC) or complex care funding disputes",
    summary:
      "Eligibility arguments and care package cuts generate repeated complaints. Clear evidence of needs, settings, and reviews matters for escalation.",
    accent: "violet",
    icon: "🏥",
    guideSlug: "continuing-healthcare-chc",
    external: [{ label: "NHS — continuing healthcare", href: "https://www.england.nhs.uk/ourwork/part-rel/cha/" }],
  },
  {
    id: "wheelchair-service-delays",
    title: "NHS wheelchair or equipment service delays",
    summary:
      "Long waits, unsuitable chairs, and poor repairs affect independence and safety. Combine clinical advocacy with complaints routes when the service standard breaks down.",
    accent: "blue",
    icon: "♿",
    guideSlug: "nhs-wheelchair-services",
    external: [{ label: "NHS — wheelchairs and mobility", href: "https://www.nhs.uk/nhs-services/prescriptions-and-pharmacies/wheelchairs-and-mobility-equipment/" }],
  },
  {
    id: "social-care-assessment",
    title: "Social care assessment, equipment, or direct payments stall",
    summary:
      "Missed assessments, unclear eligibility, and equipment delays sit at the intersection of care law and local process. Push for written plans, dates, and review triggers.",
    accent: "amber",
    icon: "📇",
    guideSlug: "equipment-through-social-services",
    external: [
      { label: "Citizens Advice — social care needs assessment", href: "https://www.citizensadvice.org.uk/social-care-and-support/assessment-and-care-planning/social-care-assessment/" },
    ],
  },
  {
    id: "home-adaptations-grants",
    title: "Home adaptations: grants, landlords, and unsafe housing",
    summary:
      "Disabled Facilities Grants, permissions in rented homes, and occupational therapy referrals are common friction points when the property itself is the barrier.",
    accent: "blue",
    icon: "🔧",
    articleHref: "/advice/dfg",
    external: [{ label: "GOV.UK — Disabled Facilities Grant", href: "https://www.gov.uk/disabled-facilities-grants" }],
  },
  {
    id: "rented-home-changes",
    title: "Your landlord resists changes to a rented home",
    summary:
      "Consent, reasonableness, and who pays are repeated questions. Evidence of medical or functional need strengthens negotiation and formal routes.",
    accent: "violet",
    icon: "🔑",
    guideSlug: "adapting-a-rented-property",
    external: [
      { label: "Citizens Advice — getting a disabled adaptation", href: "https://www.citizensadvice.org.uk/housing/renting-a-home/renting-from-a-private-landlord/getting-a-disabled-adaptation-to-your-home/" },
    ],
  },
  {
    id: "disabled-parents-unfair-treatment",
    title: "Disabled parents: services treat you unfairly",
    summary:
      "Assumptions about parenting capacity, inaccessible family services, and poor communication show up in reviews, healthcare, and education contexts.",
    accent: "blue",
    icon: "👪",
    guideSlug: "disabled-parents",
    external: [{ label: "EHRC — pregnancy and maternity", href: "https://www.equalityhumanrights.com/en/advice-and-guidance/your-rights-pregnancy-and-maternity" }],
  },
  {
    id: "digital-phone-barriers",
    title: "Apps, websites, or phone systems exclude you",
    summary:
      "Only-online booking, CAPTCHA-only flows, and telephone-only contact disproportionately block disabled people. You can request reasonable alternatives and record when they are refused.",
    accent: "amber",
    icon: "💻",
    guideSlug: "public-services",
    external: [
      { label: "Citizens Advice — asking for reasonable adjustments", href: "https://www.citizensadvice.org.uk/law-and-courts/discrimination/check-what-type-of-discrimination-youve-experienced/asking-for-reasonable-adjustments/" },
    ],
  },
  {
    id: "council-tax-reduction",
    title: "Council tax, prescriptions, or cost-of-living reliefs",
    summary:
      "Disability-related reductions and exemptions are easy to miss if nobody tells you. Check eligibility and ask the council or NHS for written confirmation.",
    accent: "violet",
    icon: "💷",
    guideSlug: "council-tax-disability-reduction",
    external: [{ label: "GOV.UK — council tax discounts", href: "https://www.gov.uk/apply-for-council-tax-discount" }],
  },
  {
    id: "travel-with-pa-or-carer",
    title: "Travel, appointments, or respite with a PA or carer",
    summary:
      "Planning care on the move touches benefits, employment of PAs, and service responsibilities. Clarity on who pays and who coordinates reduces last-minute failures.",
    accent: "blue",
    icon: "🧳",
    guideSlug: "traveling-with-care",
    external: [{ label: "NHS — carers’ rights", href: "https://www.nhs.uk/conditions/social-care-and-support-guide/support-and-benefits-for-carers/" }],
  },
];
