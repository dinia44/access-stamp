import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutJsonLd } from "@/components/about/about-jsonld";
import { ABOUT_PAGE } from "@/components/about/about-theme";
import { AccessibilityPromise } from "@/components/about/accessibility-promise";
import { AIExplainerSection } from "@/components/about/ai-explainer-section";
import { AudienceSplitSection } from "@/components/about/audience-split-section";
import { FinalCTA } from "@/components/about/final-cta";
import { FounderStory } from "@/components/about/founder-story";
import { NewsletterSignup } from "@/components/about/newsletter-signup";
import { PlatformFeatureGrid } from "@/components/about/platform-feature-grid";
import { ProblemComparison } from "@/components/about/problem-comparison";
import { PurplePoundStats } from "@/components/about/purple-pound-stats";
import { SmallChangesChecklist } from "@/components/about/small-changes-checklist";
import { VerificationLabels } from "@/components/about/verification-labels";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("about");

const DISABLED_USER_BULLETS = [
  "Check whether a venue gives enough access detail",
  "Find practical guides before a problem escalates",
  "Prepare questions before calling a venue",
  "Understand wheelchair-related basics such as cushions, pressure areas, transfer planning, and seating needs",
  "Learn what to ask about work, education, fire evacuation, and reasonable adjustments",
  "Use AI tools to turn confusion into a clear checklist",
] as const;

const VENUE_BULLETS = [
  "Create clearer accessibility listings",
  "Identify missing access information",
  "Understand what disabled customers need to know before visiting",
  "Improve staff confidence around access questions",
  "Show small practical improvements that can make a real difference",
  "Build trust with disabled customers and families",
] as const;

export default function AboutPage() {
  return (
    <div className={ABOUT_PAGE}>
      <AboutJsonLd />
      <AboutHero />
      <ProblemComparison />
      <FounderStory />
      <PlatformFeatureGrid />
      <PurplePoundStats />
      <SmallChangesChecklist />
      <AudienceSplitSection
        id="for-users"
        tone="alt"
        title="For disabled people, carers, and families"
        body={[
          "Access Stamp is designed to reduce the guesswork. Whether you are planning a meal out, preparing for work, starting university, arranging travel, or trying to understand equipment and support needs, the platform gives you clearer information and practical next steps.",
        ]}
        bulletsTitle="You can use Access Stamp to…"
        bullets={DISABLED_USER_BULLETS}
        cta="Start with the practical guides"
        href="/advice"
      />
      <AudienceSplitSection
        id="for-venues"
        title="For venues, businesses, and organisations"
        body={[
          "Access Stamp helps venues move beyond vague claims like “disabled access available.” The goal is to help you explain access in a way disabled people can actually use when deciding whether to visit.",
          "Clear access information improves trust, reduces repeated phone calls, helps staff answer questions consistently, and makes your venue easier to choose.",
        ]}
        bulletsTitle="Access Stamp can help venues…"
        bullets={VENUE_BULLETS}
        cta="List or improve your venue"
        href="/for-venues"
      />
      <VerificationLabels />
      <AIExplainerSection />
      <AccessibilityPromise />
      <NewsletterSignup />
      <FinalCTA />
    </div>
  );
}
