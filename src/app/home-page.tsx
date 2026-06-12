import { SetChatContext } from "@/components/chat/set-context";
import { HomeForVenuesBand } from "@/components/home/home-for-venues-band";
import { HomeHeroImageBand } from "@/components/home/home-hero-image-band";
import { HomeJourneys } from "@/components/home/home-journeys";
import { HomeMastheadHero } from "@/components/home/home-masthead-hero";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeWhyTrust } from "@/components/home/home-why-trust";
import { HomeWillItFitDemo } from "@/components/home/home-will-it-fit-demo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#20242E]">
      <SetChatContext page={{ kind: "home" }} />

      <HomeMastheadHero />
      <HomeHeroImageBand />
      <HomeWillItFitDemo />
      <HomeJourneys />
      <HomePopularVenues />
      <HomePopularGuides />
      <HomeForVenuesBand />
      <HomeWhyTrust />
    </div>
  );
}
