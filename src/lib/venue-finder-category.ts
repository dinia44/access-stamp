export type VenueImageTheme = "cafe" | "hotel" | "toilet" | "shop" | "attraction";

export type CategoryAccent = {
  accent: string;
  soft: string;
  label: string;
};

const CATEGORY_ACCENTS: Record<VenueImageTheme, CategoryAccent> = {
  cafe: { accent: "#EA580C", soft: "#FFF7ED", label: "Café / restaurant" },
  hotel: { accent: "#F04A16", soft: "#FFF3E8", label: "Hotel" },
  toilet: { accent: "#59682A", soft: "#EDF7ED", label: "Public toilet" },
  shop: { accent: "#D93E10", soft: "#FFF3E8", label: "Shop" },
  attraction: { accent: "#CA8A04", soft: "#FFFBEB", label: "Public place" },
};

const IMAGE_GRADIENTS: Record<VenueImageTheme, string> = {
  cafe:
    "linear-gradient(160deg, rgba(234,88,12,0.55) 0%, rgba(124,45,18,0.85) 45%, rgba(15,23,42,0.92) 100%), radial-gradient(circle at 20% 30%, rgba(251,191,36,0.35), transparent 45%), linear-gradient(135deg, #7C2D12 0%, #431407 100%)",
  hotel:
    "linear-gradient(160deg, rgba(240,74,22,0.5) 0%, rgba(69,82,31,0.85) 50%, rgba(16,33,32,0.92) 100%), radial-gradient(circle at 75% 25%, rgba(214,168,79,0.25), transparent 40%), linear-gradient(135deg, #45521F 0%, #102120 100%)",
  toilet:
    "linear-gradient(160deg, rgba(89,104,42,0.55) 0%, rgba(69,82,31,0.88) 50%, rgba(16,33,32,0.94) 100%), radial-gradient(circle at 30% 70%, rgba(214,168,79,0.2), transparent 45%), linear-gradient(135deg, #45521F 0%, #102120 100%)",
  shop:
    "linear-gradient(160deg, rgba(240,74,22,0.5) 0%, rgba(180,83,9,0.85) 50%, rgba(16,33,32,0.92) 100%), radial-gradient(circle at 80% 40%, rgba(255,226,211,0.25), transparent 40%), linear-gradient(135deg, #D93E10 0%, #102120 100%)",
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
