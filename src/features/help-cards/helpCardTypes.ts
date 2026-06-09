export type HelpCardSourceConfidence = "official" | "secondary" | "needs-review";

export type HelpCardSource = {
  title: string;
  publisher: string;
  url: string;
  lastChecked: string;
  confidence: HelpCardSourceConfidence;
  supports: string;
};

export type HelpCardActions = {
  canCopy: boolean;
  canPrint: boolean;
  canSaveToPhone: boolean;
  canTailorWithAI: boolean;
};

export type ResearchHelpCard = {
  id: string;
  title: string;
  slug: string;
  category: string;
  situation: string;
  urgency: "low" | "medium" | "high";
  badge: string;
  summary: string;
  useThisWhen: string;
  quickLine: string;
  keyBullets: string[];
  sayThisFirst: string[];
  keyRightsLine?: string;
  whatToAskFor: string[];
  questionsToAsk: string[];
  evidenceToHaveReady: string[];
  afterTheConversation: string[];
  whatNotToSayOrAssume?: string[];
  importantLimits: string[];
  sources: HelpCardSource[];
  actions: HelpCardActions;
  lastReviewed: string;
  sourceConfidence: HelpCardSourceConfidence;
  tags: string[];
};

export type HelpCardPack = {
  id: string;
  title: string;
  description: string;
  cardSlugs: string[];
};
