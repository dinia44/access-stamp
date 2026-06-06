export type VenueImageTheme = "cafe" | "hotel" | "toilet" | "shop" | "attraction";

export type CategoryAccent = {
  accent: string;
  soft: string;
  label: string;
};

const CATEGORY_ACCENTS: Record<VenueImageTheme, CategoryAccent> = {
  cafe: { accent: "#EA580C", soft: "#FFF7ED", label: "Café / restaurant" },
  hotel: { accent: "#2563EB", soft: "#EFF6FF", label: "Hotel" },
  toilet: { accent: "#0F766E", soft: "#F0FDFA", label: "Public toilet" },
  shop: { accent: "#7C3AED", soft: "#F5F3FF", label: "Shop" },
  attraction: { accent: "#CA8A04", soft: "#FFFBEB", label: "Public place" },
};

const IMAGE_GRADIENTS: Record<VenueImageTheme, string> = {
  cafe:
    "linear-gradient(160deg, rgba(234,88,12,0.55) 0%, rgba(124,45,18,0.85) 45%, rgba(15,23,42,0.92) 100%), radial-gradient(circle at 20% 30%, rgba(251,191,36,0.35), transparent 45%), linear-gradient(135deg, #7C2D12 0%, #431407 100%)",
  hotel:
    "linear-gradient(160deg, rgba(37,99,235,0.5) 0%, rgba(30,64,175,0.85) 50%, rgba(7,24,39,0.92) 100%), radial-gradient(circle at 75% 25%, rgba(214,168,79,0.25), transparent 40%), linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)",
  toilet:
    "linear-gradient(160deg, rgba(15,118,110,0.55) 0%, rgba(17,94,89,0.88) 50%, rgba(7,24,39,0.94) 100%), radial-gradient(circle at 30% 70%, rgba(45,212,191,0.2), transparent 45%), linear-gradient(135deg, #115E59 0%, #042F2E 100%)",
  shop:
    "linear-gradient(160deg, rgba(124,58,237,0.5) 0%, rgba(91,33,182,0.85) 50%, rgba(15,23,42,0.92) 100%), radial-gradient(circle at 80% 40%, rgba(167,139,250,0.25), transparent 40%), linear-gradient(135deg, #5B21B6 0%, #2E1065 100%)",
  attraction:
    "linear-gradient(160deg, rgba(202,138,4,0.5) 0%, rgba(161,98,7,0.85) 50%, rgba(15,23,42,0.92) 100%), radial-gradient(circle at 25% 60%, rgba(250,204,21,0.25), transparent 45%), linear-gradient(135deg, #A16207 0%, #422006 100%)",
};

export function getCategoryAccent(theme: VenueImageTheme): CategoryAccent {
  return CATEGORY_ACCENTS[theme];
}

export function getImageGradient(theme: VenueImageTheme): string {
  return IMAGE_GRADIENTS[theme];
}

export function themeFromVenueType(type: string): VenueImageTheme {
  const normalized = type.toLowerCase();
  if (normalized.includes("hotel")) return "hotel";
  if (normalized.includes("shop") || normalized.includes("shopping")) return "shop";
  if (normalized.includes("café") || normalized.includes("cafe") || normalized.includes("restaurant") || normalized.includes("pub") || normalized.includes("bar")) {
    return "cafe";
  }
  if (normalized.includes("healthcare")) return "toilet";
  return "attraction";
}

export function themeFromSampleId(id: string): VenueImageTheme {
  if (id.includes("cafe")) return "cafe";
  if (id.includes("hotel")) return "hotel";
  if (id.includes("toilet")) return "toilet";
  return "cafe";
}
