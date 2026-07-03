export type TickerItem = {
  kind: "Measured" | "Verified";
  venue: string;
  fact: string;
  /** ISO date when the fact was recorded — omit if unknown. */
  date?: string;
};

/**
 * Curated access facts shown in the homepage ticker.
 * Only include entries that match real listing data — replace with a CMS/DB query later.
 */
export const tickerItems: TickerItem[] = [
  { kind: "Measured", venue: "Harbour Kitchen", fact: "entrance 90 cm" },
  { kind: "Measured", venue: "Harbour Kitchen", fact: "doorway 92 cm" },
  { kind: "Measured", venue: "Riverside Cinema", fact: "entrance 105 cm" },
  { kind: "Measured", venue: "Botanical Gardens", fact: "visitor centre door 110 cm" },
  { kind: "Measured", venue: "Riverside Cinema", fact: "lift door 90 cm" },
  { kind: "Verified", venue: "Riverside Cinema", fact: "hearing loop available" },
  { kind: "Verified", venue: "Cardiff Community Hub", fact: "hearing loop at reception" },
  { kind: "Verified", venue: "Central Library Birmingham", fact: "hearing loop at service desks" },
];
