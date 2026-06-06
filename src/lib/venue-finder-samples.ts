import type { VenueImageTheme } from "@/lib/venue-finder-category";

export type SampleVenueCard = {
  id: string;
  name: string;
  type: string;
  imageTheme: VenueImageTheme;
  verification: "Access Stamp checked" | "Community reported" | "Not yet verified";
  confidence: "High confidence" | "Medium confidence" | "Low confidence";
  summary: string;
  bestFor: string;
  warning: string;
};

export const SAMPLE_VENUE_CARDS: SampleVenueCard[] = [
  {
    id: "sample-cafe",
    name: "Sample Café Access Report",
    type: "Café · Example listing",
    imageTheme: "cafe",
    verification: "Access Stamp checked",
    confidence: "High confidence",
    summary: "Step-free entrance · Accessible toilet · Blue Badge parking 30m away",
    bestFor: "Manual wheelchair users, people who need step-free café access",
    warning: "Check before visiting: toilet transfer side should be confirmed before travel.",
  },
  {
    id: "sample-hotel",
    name: "Sample Hotel Access Report",
    type: "Hotel · Example listing",
    imageTheme: "hotel",
    verification: "Community reported",
    confidence: "Medium confidence",
    summary: "Level entrance · Lift access · Accessible room information partly available",
    bestFor: "People who need level access and lift access to guest floors",
    warning: "Check before visiting: bed height and bathroom layout need confirmation.",
  },
  {
    id: "sample-toilet",
    name: "Sample Public Toilet Report",
    type: "Public toilet · Example listing",
    imageTheme: "toilet",
    verification: "Not yet verified",
    confidence: "Low confidence",
    summary: "Accessible toilet listed nearby · Details not yet checked",
    bestFor: "People planning toilet stops — confirm details before travel",
    warning: "Check before visiting: measurements and opening hours not confirmed.",
  },
];
