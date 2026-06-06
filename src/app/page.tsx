import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { HomeForVenues } from "@/components/home/home-for-venues";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHeader } from "@/components/home/home-header";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { CategoryShortcutRow } from "@/components/home/category-shortcut-row";
import { PlatformPillarsGrid } from "@/components/home/platform-pillars-grid";
import { HomeVerificationSection } from "@/components/home/home-verification-section";
import { HOME_BTN_GHOST, HOME_BTN_PRIMARY, HOME_PAGE_SHELL } from "@/components/home/home-theme";

export default function HomePage() {
  return (
    <div className={HOME_PAGE_SHELL}>
      <SetChatContext page={{ kind: "home" }} />

      <HomeHeader />
      <HomeHero />

      <section className="relative z-20 -mt-8 sm:-mt-10">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AccessStampSearchBox />
        </div>
      </section>

      <CategoryShortcutRow />
      <PlatformPillarsGrid />
      <HomePopularVenues />
      <HomePopularGuides />
      <HomeVerificationSection />
      <HomeForVenues />

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#061224] to-[#030B1A] py-24 text-[#F8FAFC]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(700px 500px at 30% 50%, rgba(34,211,238,0.08), transparent 60%), radial-gradient(600px 400px at 80% 40%, rgba(37,99,235,0.1), transparent 55%)",
          }}
        />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-[520px] text-center">
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-[#F8FAFC]">
                Your access needs, <span className="italic text-[#22D3EE]">taken seriously</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-[#94A3B8]">
                Search venues, ask our AI, explore guides, understand your rights — all in one place.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="#platform-search" className={HOME_BTN_PRIMARY}>
                  Search Access Stamp
                </a>
                <a href="/advice" className={HOME_BTN_GHOST}>
                  Explore guides →
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
