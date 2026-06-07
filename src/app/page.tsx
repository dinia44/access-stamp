import { SetChatContext } from "@/components/chat/set-context";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHeader } from "@/components/home/home-header";
import { HomeHeroGuidanceCta } from "@/components/home/home-hero-guidance-cta";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeTrustStats } from "@/components/home/home-trust-stats";
import { HOME_PAGE_SHELL } from "@/components/home/home-theme";

export default function HomePage() {
  return (
    <div className={HOME_PAGE_SHELL}>
      <SetChatContext page={{ kind: "home" }} />

      <HomeHeader />
      <HomeHero />
      <HomeHeroGuidanceCta />
      <HomePopularGuides />
      <HomeHowItWorks />
      <HomeTrustStats />
      <HomePopularVenues />
    </div>
  );
}
