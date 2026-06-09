import type { ResearchHelpCard } from "@/features/help-cards/helpCardTypes";
import type { HelpCard } from "@/lib/help-cards";

export function researchToHelpCard(card: ResearchHelpCard): HelpCard {
  return {
    slug: card.slug,
    title: card.title,
    category: card.category,
    summary: card.summary,
    whenToUse: [card.useThisWhen],
    mustAsk: card.questionsToAsk,
    checklist: card.keyBullets,
    documentsToCarry: card.evidenceToHaveReady,
    escalateIf: card.afterTheConversation.slice(0, 3),
    keyLine: card.quickLine,
    tags: card.tags,
    situation: card.situation,
    urgency: card.urgency,
    badge: card.badge,
    useThisWhen: card.useThisWhen,
    quickLine: card.quickLine,
    keyBullets: card.keyBullets,
    sayThisFirst: card.sayThisFirst,
    keyRightsLine: card.keyRightsLine,
    whatToAskFor: card.whatToAskFor,
    questionsToAsk: card.questionsToAsk,
    evidenceToHaveReady: card.evidenceToHaveReady,
    afterTheConversation: card.afterTheConversation,
    whatNotToSayOrAssume: card.whatNotToSayOrAssume,
    importantLimits: card.importantLimits,
    sources: card.sources,
    lastReviewed: card.lastReviewed,
    sourceConfidence: card.sourceConfidence,
    actions: card.actions,
    isSourceBacked: true,
  };
}
