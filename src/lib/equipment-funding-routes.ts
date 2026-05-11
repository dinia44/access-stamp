export type EquipmentCategory = "wheelchair" | "home" | "vehicle" | "tech" | "other";
export type FundingRoute = {
  name: string;
  summary: string;
  eligibility: string[];
  nextSteps: string[];
  links: Array<{ label: string; href: string }>;
  caveats: string;
};

const NHS_WHEELCHAIR: FundingRoute = {
  name: "NHS wheelchair services",
  summary:
    "Your local NHS wheelchair service can assess you for a manual or powered chair if you have a long-term mobility need. Equipment is provided on permanent loan.",
  eligibility: [
    "Long-term mobility need (not short-term injury recovery).",
    "GP or health professional referral — some services accept self-referral.",
    "Clinical assessment confirms the chair type is necessary and appropriate.",
  ],
  nextSteps: [
    "Ask your GP or physiotherapist for a referral to the local wheelchair service.",
    "Prepare a list of where and how you use (or would use) a chair daily.",
    "Expect a clinical assessment and potentially a home visit.",
    "Wait times vary widely by area — chase after 6 weeks if you haven't heard back.",
  ],
  links: [
    { label: "NHS wheelchair services overview", href: "https://www.nhs.uk/conditions/social-care-and-support-guide/care-services-equipment-and-care-homes/wheelchair-services/" },
  ],
  caveats:
    "The NHS typically supplies basic models. You can often top up (personal wheelchair budget) for a higher-spec chair, but availability and rules vary by trust.",
};

const MOTABILITY: FundingRoute = {
  name: "Motability scheme",
  summary:
    "Motability can exchange the higher-rate mobility component of PIP (or War Pensioners' Mobility Supplement) for a leased car, WAV, powered wheelchair, or scooter.",
  eligibility: [
    "Receive the enhanced mobility component of PIP with at least 12 months left on your award.",
    "Or receive the higher-rate mobility component of DLA (if still on DLA).",
    "Or receive War Pensioners' Mobility Supplement / Armed Forces Independence Payment.",
  ],
  nextSteps: [
    "Check your PIP award letter for the mobility component rate and remaining award length.",
    "Browse the Motability scheme website for vehicle/scooter/wheelchair options.",
    "Contact a Motability dealer — they handle the application.",
    "Your mobility benefit is redirected to Motability; you get a lease with insurance, servicing, and breakdown cover.",
  ],
  links: [
    { label: "Motability scheme", href: "https://www.motability.co.uk/" },
    { label: "GOV.UK — PIP", href: "https://www.gov.uk/pip" },
  ],
  caveats:
    "If your PIP award is reviewed and the mobility component is removed or reduced, the vehicle must be returned (usually within 7 weeks). Advance payments apply for some vehicles.",
};

const DFG: FundingRoute = {
  name: "Disabled Facilities Grant (DFG)",
  summary:
    "A council grant for major home adaptations: level-access showers, stairlifts, door widening, ramps, and more. Means-tested for adults in England; rules differ in Wales, Scotland, and Northern Ireland.",
  eligibility: [
    "You (or someone in your household) are disabled and need adaptations to your home.",
    "An occupational therapist confirms the work is necessary and appropriate.",
    "Means-tested for adults — not for children's adaptations in the same way.",
    "Capped by statute (currently up to £30,000 in England; varies elsewhere).",
  ],
  nextSteps: [
    "Contact your council's housing adaptations or environmental health team.",
    "Request an occupational therapy assessment (often via social services or your GP).",
    "Get quotes from approved contractors once the OT recommendation is in place.",
    "Apply through the council — expect the process to take months, not weeks.",
  ],
  links: [
    { label: "GOV.UK — Disabled Facilities Grants", href: "https://www.gov.uk/disabled-facilities-grants" },
  ],
  caveats:
    "The cap, means test thresholds, and administration vary between England, Wales, Scotland, and Northern Ireland. Always confirm with your local council. Landlord consent may be needed for rented properties.",
};

const SOCIAL_SERVICES_EQUIPMENT: FundingRoute = {
  name: "Social services equipment (on loan)",
  summary:
    "After a needs assessment, your council may loan equipment such as hoists, profiling beds, shower chairs, grab rails, or toilet aids — at no cost for qualifying needs.",
  eligibility: [
    "You have an eligible care need under the Care Act 2014.",
    "A needs assessment or occupational therapy assessment recommends the equipment.",
  ],
  nextSteps: [
    "Contact adult social services at your local council and request a needs assessment.",
    "An OT or social worker will recommend specific equipment.",
    "Equipment is usually delivered and installed by a local community equipment service.",
    "Items remain on loan — report breakages, and return them if no longer needed.",
  ],
  links: [
    { label: "GOV.UK — getting a needs assessment", href: "https://www.gov.uk/apply-needs-assessment-social-services" },
  ],
  caveats:
    "Wait times vary. For low-cost items (grab rails, perching stools), buying privately is often faster — check VAT relief eligibility for disability equipment on GOV.UK.",
};

const ACCESS_TO_WORK: FundingRoute = {
  name: "Access to Work grant",
  summary:
    "A DWP grant that can fund workplace adaptations, specialist equipment, support workers, and travel costs related to your disability — for employed or self-employed people.",
  eligibility: [
    "You have a disability or health condition that affects your ability to do your job.",
    "You are in paid work (or about to start), including self-employment.",
    "You are aged 16+ and living in England, Scotland, or Wales.",
  ],
  nextSteps: [
    "Apply online via GOV.UK before buying equipment — retrospective claims are harder.",
    "A workplace assessment may be arranged to identify what you need.",
    "The grant covers costs above what an employer should reasonably provide.",
    "Reapply or review when your job or condition changes.",
  ],
  links: [
    { label: "GOV.UK — Access to Work", href: "https://www.gov.uk/access-to-work" },
  ],
  caveats:
    "Access to Work does NOT replace the employer's duty to make reasonable adjustments under the Equality Act. The grant covers extra support beyond that baseline.",
};

const CHARITY_GRANTS: FundingRoute = {
  name: "Charity and trust grants",
  summary:
    "Many charities and benevolent funds offer one-off grants for disability equipment, vehicle adaptations, or home modifications — often filling gaps where statutory funding falls short.",
  eligibility: [
    "Varies by charity — most target specific conditions, age groups, or types of equipment.",
    "Usually means-tested or needs-based, with a short application form.",
    "Some require evidence that statutory routes have been explored first.",
  ],
  nextSteps: [
    "Search Turn2us (turn2us.org.uk) grant finder with your condition and postcode.",
    "Contact condition-specific charities (e.g. MS Society, Spinal Injuries Association, RNIB, Action on Hearing Loss).",
    "Apply early — many have limited annual budgets and fixed application windows.",
  ],
  links: [
    { label: "Turn2us grant finder", href: "https://www.turn2us.org.uk/" },
  ],
  caveats:
    "Grants are typically one-off and may not cover the full cost. Combine with other routes where possible.",
};

const VAT_RELIEF: FundingRoute = {
  name: "VAT relief on disability equipment",
  summary:
    "If you have a qualifying long-term illness or disability, you can buy certain equipment and adaptations at 0% VAT — saving 20% on the purchase price.",
  eligibility: [
    "You have a long-term illness or are disabled (the definition is broad — it does not require PIP or a formal assessment).",
    "The equipment is designed or adapted for disability use (e.g. adjustable beds, bath lifts, wheelchair accessories, stairlifts).",
  ],
  nextSteps: [
    "Tell the supplier before purchase that you qualify for VAT relief.",
    "Complete a simple eligibility declaration form (the supplier provides it).",
    "The supplier charges 0% VAT — you should not need to reclaim later.",
  ],
  links: [
    { label: "GOV.UK — VAT relief for disabled people", href: "https://www.gov.uk/financial-help-disabled/vat-relief" },
  ],
  caveats:
    "Not all items qualify — general furniture, standard phones, and non-adapted vehicles are excluded. Ask the supplier if unsure.",
};

export const ALL_FUNDING_ROUTES: FundingRoute[] = [
  NHS_WHEELCHAIR,
  MOTABILITY,
  DFG,
  SOCIAL_SERVICES_EQUIPMENT,
  ACCESS_TO_WORK,
  CHARITY_GRANTS,
  VAT_RELIEF,
];

export type AdvisorAnswer = {
  category: EquipmentCategory;
  receivingPip: boolean | null;
  inWork: boolean | null;
  needsHomeAdaptation: boolean;
};

export function getRecommendedRoutes(answers: AdvisorAnswer): FundingRoute[] {
  const routes: FundingRoute[] = [];

  if (answers.category === "wheelchair") {
    routes.push(NHS_WHEELCHAIR);
  }

  if (answers.category === "vehicle" || (answers.category === "wheelchair" && answers.receivingPip)) {
    if (answers.receivingPip) routes.push(MOTABILITY);
  }

  if (answers.needsHomeAdaptation || answers.category === "home") {
    routes.push(DFG);
    routes.push(SOCIAL_SERVICES_EQUIPMENT);
  }

  if (answers.inWork) {
    routes.push(ACCESS_TO_WORK);
  }

  routes.push(CHARITY_GRANTS);
  routes.push(VAT_RELIEF);

  const seen = new Set<string>();
  return routes.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });
}
