import type { AuthorityType, RuleStatus } from "@/data/help-cards/types";

export const AUTHORITY_LABELS: Record<AuthorityType, string> = {
  "law-or-regulation": "Law or regulation",
  "regulator-guidance": "Regulator guidance",
  "government-guidance": "Government guidance",
  "provider-policy": "Provider policy",
  "access-stamp-practical": "Access Stamp practical suggestion",
  "needs-confirmation": "Needs confirmation",
};

export const AUTHORITY_ORDER: AuthorityType[] = [
  "law-or-regulation",
  "regulator-guidance",
  "government-guidance",
  "provider-policy",
  "access-stamp-practical",
  "needs-confirmation",
];

export type RuleStatusMeta = {
  label: string;
  /** semantic token family used for surface/border/text */
  tone: "trust" | "warning" | "information" | "danger" | "neutral";
};

export const RULE_STATUS_META: Record<RuleStatus, RuleStatusMeta> = {
  entitlement: { label: "Entitlement or permission", tone: "trust" },
  restriction: { label: "Restriction", tone: "warning" },
  condition: { label: "Condition", tone: "warning" },
  "provider-variable": { label: "Varies by provider", tone: "information" },
  "needs-confirmation": { label: "Needs confirmation", tone: "information" },
};

export function authorityLabel(type: AuthorityType): string {
  return AUTHORITY_LABELS[type];
}

export function ruleStatusMeta(status: RuleStatus): RuleStatusMeta {
  return RULE_STATUS_META[status];
}

/** True for authority types that count as an official/primary source for high-stakes facts. */
export function isAuthoritativeSource(type: AuthorityType): boolean {
  return type === "law-or-regulation" || type === "regulator-guidance" || type === "government-guidance";
}
