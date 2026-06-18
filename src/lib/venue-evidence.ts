export type EvidenceSource = {
  id: string;
  type:
    | "measurement"
    | "photograph"
    | "venue_statement"
    | "community_submission"
    | "public_source"
    | "auditor_observation";
  collectedAt: string;
  collectedBy?: string;
  sourceUrl?: string;
  evidenceAssetId?: string;
  notes?: string;
};

export type VenueFeature = {
  id: string;
  name: string;
  status: "confirmed" | "not_available" | "unknown";
  value?: string | number;
  unit?: string;
  evidence: EvidenceSource[];
  lastReviewedAt?: string;
};

export const EVIDENCE_TYPE_LABELS: Record<EvidenceSource["type"], string> = {
  measurement: "On-site measurement",
  photograph: "Photograph",
  venue_statement: "Venue statement",
  community_submission: "Community submission",
  public_source: "Public source",
  auditor_observation: "Auditor observation",
};
