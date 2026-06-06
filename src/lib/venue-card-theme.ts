import type { Venue } from "@/lib/mock-data";
import { computeAccessScore } from "@/lib/venue-access-score";

export type VenueCardTheme = {
  id: "blue" | "green" | "purple" | "orange";
  accent: string;
  accentSoft: string;
  accentRing: string;
  buttonSolid: string;
  buttonSolidHover: string;
};

export const VENUE_CARD_THEMES: VenueCardTheme[] = [
  {
    id: "blue",
    accent: "#2563EB",
    accentSoft: "#EFF6FF",
    accentRing: "#BFDBFE",
    buttonSolid: "bg-[#2563EB] hover:bg-[#1D4ED8]",
    buttonSolidHover: "#1D4ED8",
  },
  {
    id: "green",
    accent: "#1E8547",
    accentSoft: "#ECFDF3",
    accentRing: "#BBF7D0",
    buttonSolid: "bg-[#1E8547] hover:bg-[#166534]",
    buttonSolidHover: "#166534",
  },
  {
    id: "purple",
    accent: "#7C3AED",
    accentSoft: "#F5F3FF",
    accentRing: "#DDD6FE",
    buttonSolid: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    buttonSolidHover: "#6D28D9",
  },
  {
    id: "orange",
    accent: "#EA8A1A",
    accentSoft: "#FFF7ED",
    accentRing: "#FED7AA",
    buttonSolid: "bg-[#EA8A1A] hover:bg-[#C2410C]",
    buttonSolidHover: "#C2410C",
  },
];

export function themeForVenueIndex(index: number): VenueCardTheme {
  return VENUE_CARD_THEMES[index % VENUE_CARD_THEMES.length];
}

export type VenueFeatureChip = {
  label: string;
  icon: "step-free" | "toilet" | "parking" | "lift" | "hearing" | "quiet";
};

export function getVenueBadge(venue: Venue, index: number): { label: string; emoji: string } {
  const score = computeAccessScore(venue);
  if (venue.verification === "Access Stamp checked" && venue.confidence === "High") {
    return { label: "Great access", emoji: "★" };
  }
  if (index === 0 && score >= 88) {
    return { label: "Top pick", emoji: "🔥" };
  }
  if (venue.verification === "Not yet verified") {
    return { label: "New report", emoji: "📋" };
  }
  if (venue.features["Quiet environment"] === "yes" || venue.tags.some((t) => /family|quiet/i.test(t))) {
    return { label: "Family friendly", emoji: "★" };
  }
  return { label: "Access checked", emoji: "✓" };
}

export function getVenueFeatureChips(venue: Venue): VenueFeatureChip[] {
  const chips: VenueFeatureChip[] = [];
  if (venue.features["Step-free entrance"] === "yes") {
    chips.push({ label: "Step-free", icon: "step-free" });
  }
  if (venue.features["Accessible toilet"] === "yes") {
    chips.push({ label: "Accessible toilet", icon: "toilet" });
  }
  if (venue.features["Nearby Blue Badge parking"] === "yes") {
    chips.push({ label: "Parking", icon: "parking" });
  }
  if (venue.features["Lift access"] === "yes") {
    chips.push({ label: "Lift", icon: "lift" });
  }
  if (venue.tags.some((tag) => /hearing\s*loop/i.test(tag))) {
    chips.push({ label: "Hearing loop", icon: "hearing" });
  }
  if (venue.features["Quiet environment"] === "yes") {
    chips.push({ label: "Quiet space", icon: "quiet" });
  }
  return chips.slice(0, 4);
}

export function formatVenueLocation(location: string): string {
  const parts = location.split(",").map((part) => part.trim());
  if (parts.length >= 2) {
    return `${parts[0]}, ${parts.slice(1).join(", ")}`;
  }
  return location;
}
