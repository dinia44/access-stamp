import Link from "next/link";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { HomeForVenues } from "@/components/home/home-for-venues";
import { HomePopularVenues } from "@/components/home/home-popular-venues";
import { HomePopularGuides } from "@/components/home/home-popular-guides";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHeader } from "@/components/home/home-header";
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

      <CategoryShortcutRow />
      <PlatformPillarsGrid />
      <HomePopularVenues />
      <HomePopularGuides />
      <HomeVerificationSection />
      <HomeForVenues />

      <section className="relative overflow-hidden border-t border-[#22D3EE]/10 bg-gradient-to-b from-[#0A2A52] to-[#071E3D] py-24 text-[#E0F7FF]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(700px 500px at 30% 50%, rgba(34,211,238,0.14), transparent 60%), radial-gradient(600px 400px at 80% 40%, rgba(37,99,235,0.16), transparent 55%)",
          }}
        />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-[520px] text-center">
              <h2 className="font-[var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-[#E0F7FF]">
                Your access needs, <span className="italic text-[#22D3EE]">taken seriously</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.75] text-[#BAE6FD]">
                Search venues, ask our AI, explore guides, and understand your rights — all in one place.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="#platform-search" className={HOME_BTN_PRIMARY}>
                  Search accessible places
                </a>
                <Link href="/advice" className={HOME_BTN_GHOST}>
                  Explore disability guides
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
