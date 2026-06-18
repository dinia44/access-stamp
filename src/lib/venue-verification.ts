/** Internal verification classification for venue records. */
export type VerificationType =
  | "demo"
  | "unverified"
  | "community_reported"
  | "venue_submitted"
  | "desk_reviewed"
  | "onsite_audited";

/** Public-facing verification label shown on cards and venue pages. */
export type VerificationLabel =
  | "Demo listing"
  | "Not yet verified"
  | "Community reported"
  | "Venue submitted"
  | "Desk reviewed"
  | "On-site audited";

export const VERIFICATION_PUBLIC_LABELS: Record<VerificationType, VerificationLabel> = {
  demo: "Demo listing",
  unverified: "Not yet verified",
  community_reported: "Community reported",
  venue_submitted: "Venue submitted",
  desk_reviewed: "Desk reviewed",
  onsite_audited: "On-site audited",
};

/** Legacy seed values mapped to the new verification model. */
const LEGACY_VERIFICATION_MAP: Record<string, VerificationType> = {
  "Access Stamp checked": "demo",
  "Access Stamp audited": "demo",
  "Community reported": "community_reported",
  "Not yet verified": "unverified",
  "Demo listing": "demo",
  "Venue submitted": "venue_submitted",
  "Desk reviewed": "desk_reviewed",
  "On-site audited": "onsite_audited",
};

export function toVerificationType(value: string | undefined): VerificationType {
  if (!value) return "unverified";
  if (value in VERIFICATION_PUBLIC_LABELS) {
    return value as VerificationType;
  }
  return LEGACY_VERIFICATION_MAP[value] ?? "unverified";
}

export function toVerificationLabel(type: VerificationType): VerificationLabel {
  return VERIFICATION_PUBLIC_LABELS[type];
}

export function isDemoListing(type: VerificationType): boolean {
  return type === "demo";
}

export function claimsOnsiteAudit(type: VerificationType): boolean {
  return type === "onsite_audited";
}

export function shouldShowAccessScore(type: VerificationType): boolean {
  return type !== "demo" && type !== "unverified";
}

/** Minimum audit record fields required before claiming on-site audit. */
export type AuditRecord = {
  auditDate: string;
  auditorIdentity: string;
  auditReportId: string;
  evidenceRecords: string[];
  measurementRecords: string[];
  reportVersion: string;
  recheckOrExpiryDate: string;
};

export function hasValidAuditRecord(record?: Partial<AuditRecord> | null): boolean {
  if (!record) return false;
  return Boolean(
    record.auditDate &&
      record.auditorIdentity &&
      record.auditReportId &&
      record.evidenceRecords?.length &&
      record.measurementRecords?.length &&
      record.reportVersion &&
      record.recheckOrExpiryDate,
  );
}
