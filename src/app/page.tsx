import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui";
import { HomeForVenues } from "@/components/home/home-for-venues";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomeHero } from "@/components/home/home-hero";
import { VenueFinderBox } from "@/components/home/venue-finder-box";
import { PlatformPillarsGrid } from "@/components/home/platform-pillars-grid";
import { HomeVerificationSection } from "@/components/home/home-verification-section";

export default function HomePage() {
  return (
    <div>
      <SetChatContext page={{ kind: "home" }} />

      <HomeHero />

      <section className="relative z-20 -mt-10 sm:-mt-14">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <VenueFinderBox />
        </div>
      </section>

      <PlatformPillarsGrid />
      <HomePopularVenues />
      <HomePopularGuides />
      <HomeVerificationSection />
      <HomeForVenues />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(700px 500px at 30% 50%, rgba(122,155,138,0.10), transparent 60%)",
          }}
        />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-[520px] text-center">
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-[#e8e2d8]">
                Your access needs, <span className="italic text-gold">taken seriously</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-[#a0998f]">
                Search venues, ask our AI, explore guides, understand your rights — all in one place.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="#platform-search">Search Access Stamp</Button>
                <Button href="/advice" variant="premium">
                  Explore guides →
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
