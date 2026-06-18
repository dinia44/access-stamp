/** Venue review tier pricing — pilot programme. */
export const REVIEW_TIER_PRICING = {
  snapshot: { label: "Pilot pricing available" },
  measured: { label: "Pilot pricing available" },
  full: { label: "Pilot pricing available" },
} as const;

export type ReviewTierId = keyof typeof REVIEW_TIER_PRICING;

export type ReviewTier = {
  id: ReviewTierId;
  name: string;
  tagline: string;
  features: string[];
  stampTone: "snapshot" | "measured" | "full";
  mostPopular?: boolean;
};

export const VENUE_REVIEW_TIERS: ReviewTier[] = [
  {
    id: "snapshot",
    name: "Access Snapshot",
    tagline: "Best for smaller venues that need a simple access information review.",
    features: [
      "On-site core accessibility review",
      "Public access report on Access Stamp",
      "Window stamp for your entrance",
      "Listed in the venue finder",
    ],
    stampTone: "snapshot",
  },
  {
    id: "measured",
    name: "Measured Access Report",
    tagline: "Best for venues that want a fuller measured report with practical recommendations.",
    features: [
      "Everything in Access Snapshot",
      "Full measured PDF access report",
      "Staff guidance sheet for front-of-house",
      "Priority placement in venue finder",
    ],
    stampTone: "measured",
    mostPopular: true,
  },
  {
    id: "full",
    name: "Full Access Review",
    tagline: "Best for venues that want deeper review, staff-facing guidance, and a more complete access profile.",
    features: [
      "Everything in Measured Access Report",
      "Annual accessibility re-check",
      "Staff training session on access support",
      "Featured placement across Access Stamp",
    ],
    stampTone: "full",
  },
];

/** @deprecated Use VENUE_REVIEW_TIERS */
export const CERTIFICATION_TIERS = VENUE_REVIEW_TIERS;
/** @deprecated Use REVIEW_TIER_PRICING */
export const CERTIFICATION_PRICING = REVIEW_TIER_PRICING;

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

export const EAA_REGULATORY_NOTE =
  "Organisations selling certain products and services into the EU may also need to consider the European Accessibility Act, which became applicable in EU member states on 28 June 2025. UK Equality Act duties continue to apply separately.";

export const FOR_VENUES_FAQ = [
  {
    question: "Is this a legal requirement?",
    answer: `No — Access Stamp reviews are voluntary. The Equality Act already requires reasonable adjustments for disabled customers. ${EAA_REGULATORY_NOTE} An Access Stamp review is evidence of good faith and practical progress, not a substitute for your legal duties.`,
  },
  {
    question: "What if my venue scores badly?",
    answer:
      "Your full report stays private until you choose to publish. We prioritise fixable quick wins and plain-English guidance so you can improve access before anything goes public. Many venues use the first review as a practical improvement plan.",
  },
  {
    question: "How long does a review take?",
    answer:
      "Most single-site reviews take half a day on site, depending on venue size and complexity. You receive a draft report within ten working days, then a final report once any follow-up measurements are complete.",
  },
  {
    question: "Do you publish a review for any venue that pays?",
    answer:
      "No. The stamp reflects what we measure — entrances, routes, toilets, parking, hearing support, and staff readiness. That is why customers trust it. If a venue cannot meet a tier standard, we say so clearly.",
  },
  {
    question: "How is this different from doing a self-assessment?",
    answer:
      "Self-assessments are useful starting points, but customers cannot verify them. Access Stamp reviews use measured doorways, photographed routes, and consistent methodology — the same data disabled customers use when choosing where to go.",
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
