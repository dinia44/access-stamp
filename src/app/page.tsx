import { SetChatContext } from "@/components/chat/set-context";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHeader } from "@/components/home/home-header";
import { HomeHeroGuidanceCta } from "@/components/home/home-hero-guidance-cta";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeLivedExperience } from "@/components/home/home-lived-experience";
import { HomePlanBeforeYouGo } from "@/components/home/home-plan-before-you-go";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeTrustStats } from "@/components/home/home-trust-stats";
import { HomeUserJourneys } from "@/components/home/home-user-journeys";
import { HomeWhatWeHelpWith } from "@/components/home/home-what-we-help-with";
import { HOME_PAGE_SHELL } from "@/components/home/home-theme";

/** Mostly static marketing homepage — revalidate hourly. */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className={HOME_PAGE_SHELL}>
      <SetChatContext page={{ kind: "home" }} />

      <HomeHeader />
      <HomeHero />
      <HomeUserJourneys />
      <HomeHeroGuidanceCta />
      <HomeWhatWeHelpWith />
      <HomePopularGuides />
      <HomePlanBeforeYouGo />
      <HomeHowItWorks />
      <HomeLivedExperience />
      <HomeTrustStats />
      <HomePopularVenues />
    </div>
  );
}
