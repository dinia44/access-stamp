/** Certification tier pricing — pilot programme. */
export const CERTIFICATION_PRICING = {
  bronze: { label: "Pilot pricing available" },
  silver: { label: "Pilot pricing available" },
  gold: { label: "Pilot pricing available" },
} as const;

export type CertificationTierId = keyof typeof CERTIFICATION_PRICING;

export type CertificationTier = {
  id: CertificationTierId;
  name: string;
  tagline: string;
  features: string[];
  stampTone: "bronze" | "silver" | "gold";
  mostPopular?: boolean;
};

export const CERTIFICATION_TIERS: CertificationTier[] = [
  {
    id: "bronze",
    name: "Bronze Access Snapshot",
    tagline: "Best for smaller venues that need a simple access information review.",
    features: [
      "On-site core accessibility audit",
      "Public access report on Access Stamp",
      "Bronze window stamp for your entrance",
      "Listed in the venue finder",
    ],
    stampTone: "bronze",
  },
  {
    id: "silver",
    name: "Silver Measured Access Report",
    tagline: "Best for venues that want a fuller measured report with practical recommendations.",
    features: [
      "Everything in Bronze",
      "Full measured PDF access report",
      "Staff guidance sheet for front-of-house",
      "Priority placement in venue finder",
    ],
    stampTone: "silver",
    mostPopular: true,
  },
  {
    id: "gold",
    name: "Gold Access Stamp Review",
    tagline: "Best for venues that want deeper review, staff-facing guidance, and a more complete access profile.",
    features: [
      "Everything in Silver",
      "Annual accessibility re-check",
      "Staff training session on access support",
      "Featured placement across Access Stamp",
    ],
    stampTone: "gold",
  },
];

export const WHAT_WE_CHECK = [
  "Entrances",
  "Routes",
  "Toilets",
  "Seating",
  "Parking/drop-off",
  "Staff support",
  "Emergency considerations",
  "Website information",
] as const;

export const WHAT_VENUES_RECEIVE = [
  "Access information review",
  "Practical recommendations",
  "Access profile for customers",
  "Confidence label",
  "Clear next steps",
  "Optional staff-facing guidance",
] as const;

export const FOR_VENUES_FAQ = [
  {
    question: "Is this a legal requirement?",
    answer:
      "No — certification is voluntary. The Equality Act already requires reasonable adjustments for disabled customers, and the European Accessibility Act raises expectations across digital and physical services. An Access Stamp audit is proof of good faith and practical progress, not a substitute for your legal duties.",
  },
  {
    question: "What if my venue scores badly?",
    answer:
      "Your full report stays private until you choose to publish. We prioritise fixable quick wins and plain-English guidance so you can improve access before anything goes public. Many venues use the first audit as a practical improvement plan.",
  },
  {
    question: "How long does an audit take?",
    answer:
      "Most single-site audits take half a day on site, depending on venue size and complexity. You receive a draft report within ten working days, then a final report once any follow-up measurements are complete.",
  },
  {
    question: "Do you certify any venue that pays?",
    answer:
      "No. The Stamp reflects what we measure — entrances, routes, toilets, parking, hearing support, and staff readiness. That is why customers trust it. If a venue cannot meet a tier standard, we say so clearly.",
  },
  {
    question: "How is this different from doing a self-assessment?",
    answer:
      "Self-assessments are useful starting points, but customers cannot verify them. Access Stamp audits use measured doorways, photographed routes, and consistent methodology — the same data disabled customers and AI assistants use when recommending where to go.",
  },
] as const;

export const VENUE_TYPE_OPTIONS = [
  "Restaurant",
  "Café",
  "Pub or bar",
  "Hotel",
  "Arts and culture",
  "Entertainment",
  "Shopping",
  "Leisure",
  "Outdoor",
  "Healthcare",
  "Other",
] as const;
