import { SetChatContext } from "@/components/chat/set-context";
import { HomeAiToolsPreview } from "@/components/home/home-ai-tools-preview";
import { HomeForVenuesBand } from "@/components/home/home-for-venues-band";
import { HomeFounderMission } from "@/components/home/home-founder-mission";
import { HomeHelpCardsPreview } from "@/components/home/home-help-cards-preview";
import { HomeMastheadHero } from "@/components/home/home-masthead-hero";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeUserPathways } from "@/components/home/home-user-pathways";
import { HomeWhyTrust } from "@/components/home/home-why-trust";
import { HomeWillItFitDemo } from "@/components/home/home-will-it-fit-demo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#20242E]">
      <SetChatContext page={{ kind: "home" }} />

      <HomeMastheadHero />
      <HomeUserPathways />
      <HomePopularVenues />
      <HomeWillItFitDemo />
      <HomePopularGuides />
      <HomeHelpCardsPreview />
      <HomeAiToolsPreview />
      <HomeFounderMission />
      <HomeForVenuesBand />
      <HomeWhyTrust />
    </div>
  );
}
