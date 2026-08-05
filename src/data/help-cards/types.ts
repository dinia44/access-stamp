// Help Card rights-and-rules information model.
// A Help Card is a source-backed explanation of what the rules say in ONE real situation.
// It is not a wallet of copyable scripts. Copy/save/print/AI are secondary utilities.

export type AuthorityType =
  | "law-or-regulation"
  | "regulator-guidance"
  | "government-guidance"
  | "provider-policy"
  | "access-stamp-practical"
  | "needs-confirmation";

export type RuleStatus =
  | "entitlement"
  | "restriction"
  | "condition"
  | "provider-variable"
  | "needs-confirmation";

export type PublicationState = "draft" | "review" | "published";

export interface HelpCardSource {
  id: string;
  title: string;
  authority: string;
  authorityType: AuthorityType;
  jurisdiction: string;
  reference?: string;
  url: string;
  /** ISO date YYYY-MM-DD. When the rule/source became effective, where known. */
  effectiveFrom?: string;
  /** ISO date YYYY-MM-DD. When Access Stamp last confirmed this source link and summary. */
  checkedAt: string;
}

export interface HelpCardRule {
  id: string;
  /** Section id — see HELP_CARD_SECTIONS. */
  section: string;
  headline: string;
  plainEnglish: string;
  status: RuleStatus;
  applicability: string;
  conditions?: string[];
  exceptions?: string[];
  evidenceToCarry?: string[];
  /** Short plain-English explanation for pointing to the source if challenged. */
  ifChallenged?: string;
  /** Optional copyable sentence for the "If you are challenged" section. */
  suggestedWording?: string;
  /** When true, include this rule in the At a glance summary. */
  atAGlance?: boolean;
  sourceIds: string[];
}

export interface HelpCardVariant {
  id: string;
  contextLabel: string;
  applicability: Record<string, string | string[]>;
  rules: HelpCardRule[];
  /** ISO date YYYY-MM-DD. When this variant was last reviewed by Access Stamp. */
  reviewedAt?: string;
  /** Things the visitor still needs to confirm with the relevant authority or provider. */
  confirm?: string[];
}

export interface HelpCard {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryKey: string;
  summary: string;
  /** Human-readable region/context shown on the hub, e.g. "Great Britain". */
  region: string;
  variants: HelpCardVariant[];
  sources: HelpCardSource[];
  relatedGuideSlugs?: string[];
  relatedCardSlugs?: string[];
  highStakes?: boolean;
  disclaimer?: string;
  publicationState: PublicationState;
}
