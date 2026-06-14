import type { AdviceArticle } from "@/lib/content/types";
import type { GuideResourcePack } from "@/lib/guide-resources";
import type { GuideHeroHeaderProps } from "@/components/guide/guide-hero-header";
import type { PracticalGuideWorkflow } from "@/lib/practical-guide";

export type GuideHeroConfig = {
  categoryLabel?: string;
  secondaryLabel?: string;
  guideType?: string;
  factChecked?: boolean;
  backgroundImageUrl?: string;
  heroImageUrl?: string;
  subtitle?: string;
  lastUpdatedLabel?: string;
};

const HERO_OVERRIDES: Record<string, GuideHeroConfig> = {
  "access-to-work": {
    categoryLabel: "Practical guide",
    secondaryLabel: "Popular guide",
    guideType: "UK support guide",
    factChecked: true,
    lastUpdatedLabel: "Last reviewed",
    subtitle:
      "A practical, step-by-step guide to what Access to Work can fund, how to apply, and how to ask for the right support with confidence.",
  },
  "reasonable-adjustments-at-work": {
    categoryLabel: "Practical guide",
    secondaryLabel: "Best option",
    guideType: "UK support guide",
    factChecked: true,
    subtitle: "A practical, step-by-step guide with AI support",
  },
  "pip-renewal-form-what-to-write": {
    categoryLabel: "Practical guide",
    secondaryLabel: "Popular guide",
    guideType: "UK benefits guide",
    factChecked: true,
    subtitle: "A practical, step-by-step guide with AI support",
  },
};

export function buildGuideHeroProps(
  article: AdviceArticle,
  workflow: PracticalGuideWorkflow,
  resources?: GuideResourcePack | null,
): GuideHeroHeaderProps {
  const override = HERO_OVERRIDES[article.slug];

  return {
    title: workflow.displayTitle ?? article.title,
    subtitle: override?.subtitle ?? workflow.subtitle,
    categoryLabel: override?.categoryLabel ?? "Practical guide",
    secondaryLabel: override?.secondaryLabel ?? "Guide",
    lastUpdated: article.updated,
    lastUpdatedLabel: override?.lastUpdatedLabel ?? "Last updated",
    readTime: article.readTimeMinutes ? `${article.readTimeMinutes} min read` : undefined,
    guideType: override?.guideType ?? "UK support guide",
    factChecked: override?.factChecked ?? true,
    trustLabel: "Reviewed against official guidance",
    backgroundImageUrl: override?.backgroundImageUrl,
    heroImageUrl: override?.heroImageUrl,
    fullGuideHref: resources?.fullGuideCta.primaryHref,
  };
}
