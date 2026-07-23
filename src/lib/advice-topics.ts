import type { AdviceCategorySlug } from "@/lib/content/types";

export type AdviceTopic = {
  id: AdviceCategorySlug;
  slug: AdviceCategorySlug;
  /** @deprecated Prefer AdviceTopicIcon — kept for any legacy string consumers. */
  icon: string;
  title: string;
  description: string;
  /** Short one-line description for compact cards. */
  shortDescription: string;
};

/** Priority topics shown before "More filters" on the hub. */
export const PRIORITY_TOPIC_SLUGS: AdviceCategorySlug[] = [
  "rights",
  "workplace",
  "care",
  "equipment",
  "emergency",
];

/** Single source of truth for topic cards, hero filter chips, and topic pages. */
export const ADVICE_TOPICS: AdviceTopic[] = [
  {
    id: "rights",
    slug: "rights",
    icon: "",
    title: "Your Rights",
    description: "Benefits, legal protections, Equality Act, and what you're entitled to",
    shortDescription: "Benefits, Equality Act and entitlements",
  },
  {
    id: "education",
    slug: "education",
    icon: "",
    title: "Education",
    description: "DSA, EHC plans, school and university support",
    shortDescription: "DSA, EHC plans and school support",
  },
  {
    id: "transport",
    slug: "transport",
    icon: "",
    title: "Transport",
    description: "Public transport: trains, buses, taxis, assistance",
    shortDescription: "Trains, buses, taxis and assistance",
  },
  {
    id: "cars",
    slug: "cars",
    icon: "",
    title: "Cars",
    description: "Your own vehicle: Blue Badge, Motability, adaptations, parking",
    shortDescription: "Blue Badge, Motability and parking",
  },
  {
    id: "sport",
    slug: "sport",
    icon: "",
    title: "Sport",
    description: "Accessible gyms, leisure centres, adaptive sport, club checklists",
    shortDescription: "Gyms, leisure and adaptive sport",
  },
  {
    id: "workplace",
    slug: "workplace",
    icon: "",
    title: "Workplace",
    description: "Access to Work, adjustments, discrimination, returning to work",
    shortDescription: "Access to Work and adjustments",
  },
  {
    id: "care",
    slug: "care",
    icon: "",
    title: "Care & Support",
    description: "Personal budgets, hiring PAs, templates, managing care",
    shortDescription: "Personal budgets and PA support",
  },
  {
    id: "equipment",
    slug: "equipment",
    icon: "",
    title: "Equipment",
    description: "Wheelchairs, home equipment, vehicle adaptations, tech",
    shortDescription: "Wheelchairs, adaptations and tech",
  },
  {
    id: "emergency",
    slug: "emergency",
    icon: "",
    title: "Emergency & Quick Help",
    description: "Breakdowns, helplines, NHS services, rights cards",
    shortDescription: "Helplines, NHS and crisis routes",
  },
  {
    id: "new-to-disability",
    slug: "new-to-disability",
    icon: "",
    title: "New to Disability",
    description: "Starting point for newly disabled people and families",
    shortDescription: "First steps for you and your family",
  },
  {
    id: "travel",
    slug: "travel",
    icon: "",
    title: "Travel",
    description: "Trips and holidays: flying, hotels, insurance, planning",
    shortDescription: "Flying, hotels and trip planning",
  },
];

/** @deprecated Use ADVICE_TOPICS — kept for existing imports. */
export const ADVICE_CATEGORIES = ADVICE_TOPICS.map((topic) => ({
  title: topic.title,
  href: `/advice/${topic.slug}`,
  icon: topic.icon,
  desc: topic.description,
}));

export function adviceTopicBySlug(slug: AdviceCategorySlug): AdviceTopic | undefined {
  return ADVICE_TOPICS.find((topic) => topic.slug === slug);
}

export function adviceTopicLabel(slug: AdviceCategorySlug): string {
  return adviceTopicBySlug(slug)?.title ?? "Advice";
}
