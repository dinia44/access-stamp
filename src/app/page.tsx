import { SetChatContext } from "@/components/chat/set-context";
import { HomeAccessReportSection } from "@/components/home/home-access-report-section";
import { HomeAiToolsPreview } from "@/components/home/home-ai-tools-preview";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomeHeader } from "@/components/home/home-header";
import { HomeHero } from "@/components/home/home-hero";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeProductPillars } from "@/components/home/home-product-pillars";
import { HomeTrustSection } from "@/components/home/home-trust-section";
import { HOME_PAGE_SHELL } from "@/components/home/home-theme";

/** Mostly static marketing homepage — revalidate hourly. */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className={HOME_PAGE_SHELL}>
      <SetChatContext page={{ kind: "home" }} />

      <HomeHeader />
      <HomeHero />
      <HomeProductPillars />
      <HomeAccessReportSection />
      <HomePopularGuides />
      <HomeAiToolsPreview />
      <HomeTrustSection />
      <HomePopularVenues />
      <HomeFinalCta />
    </div>
  );
}
