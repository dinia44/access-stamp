import type { AuthorityType } from "@/data/help-cards/types";

export type HelpCardDownloadStatus = "draft" | "reviewed" | "published";

export type HelpCardDownloadLayout = "one-page" | "two-page";

/** Curated, reviewable wording for the offline Help Card. Factual fields come from the canonical card. */
export type HelpCardDownloadCopy = {
  version: number;
  status: HelpCardDownloadStatus;
  title: string;
  shortTitle?: string;
  purpose: string;
  keyMessage: string;
  actions: string[];
  questionsToAsk?: string[];
  suggestedWording?: {
    label: string;
    text: string;
  };
  conditions?: string[];
  beforeYouGo?: string[];
  footerNote: string;
  layout: HelpCardDownloadLayout;
};

export type HelpCardDownloadSource = {
  title: string;
  url: string;
  publisher: string;
  authorityType: AuthorityType;
};

export type HelpCardDownloadDocument = HelpCardDownloadCopy & {
  slug: string;
  category: string;
  appliesTo: string;
  authorityLabel: string;
  reviewedAt: string;
  sources: HelpCardDownloadSource[];
  disclaimer: string;
  liveUrl: string;
  liveUrlLabel: string;
};

export type HelpCardDownloadResolveResult =
  | { ok: true; document: HelpCardDownloadDocument }
  | {
      ok: false;
      reason: "missing-card" | "unpublished-card" | "missing-copy" | "draft" | "invalid";
      issues: string[];
    };
