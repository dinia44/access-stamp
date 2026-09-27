/** Internal verification classification for venue records. */
export type VerificationType =
  | "demo"
  | "unverified"
  | "community_reported"
  | "venue_submitted"
  | "desk_reviewed"
  | "onsite_audited";

/** Public-facing labels; source provenance remains in VerificationType. */
export type VerificationLabel =
  | "Demo"
  | "Submitted / not independently verified"
  | "Reviewed remotely"
  | "On-site verified";

export const VERIFICATION_PUBLIC_LABELS: Record<VerificationType, VerificationLabel> = {
  demo: "Demo",
  unverified: "Submitted / not independently verified",
  community_reported: "Submitted / not independently verified",
  venue_submitted: "Submitted / not independently verified",
  desk_reviewed: "Reviewed remotely",
  onsite_audited: "On-site verified",
};

/** Never infer an on-site measurement from the presence of a number alone. */
export const MEASUREMENT_LABELS: Record<VerificationType, string> = {
  demo: "Example measurements",
  unverified: "Unverified measurements",
  community_reported: "Community-reported measurements",
  venue_submitted: "Venue-supplied measurements",
  desk_reviewed: "Reviewed measurements",
  onsite_audited: "Measured by Access Stamp",
};

export function getMeasurementLabel(type: VerificationType): string {
  return MEASUREMENT_LABELS[type];
}

/** Legacy seed values mapped to the new verification model. */
const LEGACY_VERIFICATION_MAP: Record<string, VerificationType> = {
  "Demo": "demo",
  "Submitted / not independently verified": "unverified",
  "Reviewed remotely": "desk_reviewed",
  "On-site verified": "onsite_audited",
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
  if (Object.hasOwn(VERIFICATION_PUBLIC_LABELS, value)) {
    return value as VerificationType;
  }
  return Object.hasOwn(LEGACY_VERIFICATION_MAP, value) ? LEGACY_VERIFICATION_MAP[value] : "unverified";
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
  // No universal access score: suitability depends on the individual’s needs.
  void type;
  return false;
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
