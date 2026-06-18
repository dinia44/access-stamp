import type { VenueImageTheme } from "@/lib/venue-finder-category";

export type SampleVenueCard = {
  id: string;
  name: string;
  categoryLabel: string;
  imageTheme: VenueImageTheme;
  verification: "On-site audited" | "Desk reviewed" | "Community reported" | "Demo listing" | "Not yet verified";
  secondaryVerification?: "On-site audited" | "Desk reviewed" | "Community reported" | "Demo listing" | "Not yet verified";
  features: string[];
  description: string;
  /** Legacy fields kept for any extended views */
  type?: string;
  confidence?: "High confidence" | "Medium confidence" | "Low confidence";
  summary?: string;
  bestFor?: string;
  warning?: string;
};

export const SAMPLE_VENUE_CARDS: SampleVenueCard[] = [
  {
    id: "sample-cafe",
    name: "Sample Café Access Report",
    categoryLabel: "Café",
    imageTheme: "cafe",
    verification: "Demo listing",
    secondaryVerification: "Community reported",
    features: ["Step-free entrance", "Accessible toilet", "Hearing loop"],
    description: "Level access via automatic door. Spacious seating and accessible toilet.",
  },
  {
    id: "sample-hotel",
    name: "Sample Hotel Access Report",
    categoryLabel: "Hotel",
    imageTheme: "hotel",
    verification: "Demo listing",
    secondaryVerification: "Desk reviewed",
    features: ["Step-free entrance", "Accessible toilet", "Lift access"],
    description: "Step-free entrance and lift to all floors. Accessible bedroom available.",
  },
  {
    id: "sample-toilet",
    name: "Sample Public Toilet Report",
    categoryLabel: "Public toilet",
    imageTheme: "toilet",
    verification: "Community reported",
    secondaryVerification: "Not yet verified",
    features: ["Step-free access", "Accessible toilet"],
    description: "Spacious cubicle with L/R transfer space. Radar key required.",
  },
];
