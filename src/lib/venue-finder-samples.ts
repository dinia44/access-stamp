export type SampleVenueCard = {
  id: string;
  name: string;
  type: string;
  verification: "Access Stamp checked" | "Community reported" | "Not yet verified";
  confidence: "High confidence" | "Medium confidence" | "Low confidence";
  summary: string;
  warning: string;
};

export const SAMPLE_VENUE_CARDS: SampleVenueCard[] = [
  {
    id: "sample-cafe",
    name: "Sample Café Access Report",
    type: "Café · Example listing",
    verification: "Access Stamp checked",
    confidence: "High confidence",
    summary: "Step-free entrance · Accessible toilet · Blue Badge parking 30m away",
    warning: "Check before visiting: toilet transfer side should be confirmed before travel.",
  },
  {
    id: "sample-hotel",
    name: "Sample Hotel Access Report",
    type: "Hotel · Example listing",
    verification: "Community reported",
    confidence: "Medium confidence",
    summary: "Level entrance · Lift access · Accessible room information partly available",
    warning: "Check before visiting: bed height and bathroom layout need confirmation.",
  },
  {
    id: "sample-toilet",
    name: "Sample Public Toilet Report",
    type: "Public toilet · Example listing",
    verification: "Not yet verified",
    confidence: "Low confidence",
    summary: "Accessible toilet listed nearby · Details not yet checked",
    warning: "Check before visiting: measurements and opening hours not confirmed.",
  },
];
