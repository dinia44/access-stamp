import { SetChatContext } from "@/components/chat/set-context";
import { HomeForVenuesBand } from "@/components/home/home-for-venues-band";
import { HomeFounderMission } from "@/components/home/home-founder-mission";
import { HomeMastheadHero } from "@/components/home/home-masthead-hero";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomeSecondaryPathways } from "@/components/home/home-secondary-pathways";
import { HomeWhyTrust } from "@/components/home/home-why-trust";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <SetChatContext page={{ kind: "home" }} />

      <HomeMastheadHero />
      <HomePopularVenues />
      <HomeWhyTrust />
      <HomeSecondaryPathways />
      <HomeFounderMission />
      <HomeForVenuesBand />
    </div>
  );
}
