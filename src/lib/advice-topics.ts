import type { AdviceCategorySlug } from "@/lib/content/types";

export type AdviceTopic = {
  id: AdviceCategorySlug;
  slug: AdviceCategorySlug;
  icon: string;
  title: string;
  description: string;
};

/** Single source of truth for topic cards, hero filter chips, and topic pages. */
export const ADVICE_TOPICS: AdviceTopic[] = [
  {
    id: "rights",
    slug: "rights",
    icon: "⚖️",
    title: "Your Rights",
    description: "Benefits, legal protections, Equality Act, and what you're entitled to",
  },
  {
    id: "education",
    slug: "education",
    icon: "🎓",
    title: "Education",
    description: "DSA, EHC plans, school and university support",
  },
  {
    id: "transport",
    slug: "transport",
    icon: "🚆",
    title: "Transport",
    description: "Public transport: trains, buses, taxis, assistance",
  },
  {
    id: "cars",
    slug: "cars",
    icon: "🚗",
    title: "Cars",
    description: "Your own vehicle: Blue Badge, Motability, adaptations, parking",
  },
  {
    id: "sport",
    slug: "sport",
    icon: "🏃",
    title: "Sport",
    description: "Accessible gyms, leisure centres, adaptive sport, club checklists",
  },
  {
    id: "workplace",
    slug: "workplace",
    icon: "💼",
    title: "Workplace",
    description: "Access to Work, adjustments, discrimination, returning to work",
  },
  {
    id: "care",
    slug: "care",
    icon: "🤝",
    title: "Care & Support",
    description: "Personal budgets, hiring PAs, templates, managing care",
  },
  {
    id: "equipment",
    slug: "equipment",
    icon: "🦽",
    title: "Equipment",
    description: "Wheelchairs, home equipment, vehicle adaptations, tech",
  },
  {
    id: "emergency",
    slug: "emergency",
    icon: "🚨",
    title: "Emergency & Quick Help",
    description: "Breakdowns, helplines, NHS services, rights cards",
  },
  {
    id: "new-to-disability",
    slug: "new-to-disability",
    icon: "🧭",
    title: "New to Disability",
    description: "Starting point for newly disabled people and families",
  },
  {
    id: "travel",
    slug: "travel",
    icon: "🧳",
    title: "Travel",
    description: "Trips and holidays: flying, hotels, insurance, planning",
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
