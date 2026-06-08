import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { AccessReportPreview } from "@/components/access-report-preview";
import {
  AS_BTN_GHOST,
  AS_BTN_SECONDARY,
  AS_CONTAINER,
  AS_HERO_DISPLAY,
  AS_BODY,
} from "@/lib/design-system";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#071826] pb-[clamp(4rem,8vw,6rem)] pt-8 text-white sm:pt-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 0%, rgba(212,168,79,0.12) 0%, transparent 35%)",
        }}
      />

      <div className={`${AS_CONTAINER} relative`}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#60A5FA]">UK accessibility platform</p>
            <h1 className={`${AS_HERO_DISPLAY} mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-white`}>
              Find accessible places with confidence.
            </h1>
            <p className={`${AS_BODY} mt-5 max-w-xl text-[#CBD5E1]`}>
              Search access-checked venues, read practical reports before you travel, and get AI-assisted planning
              built from lived experience.
            </p>

            <div className="mt-8">
              <AccessStampSearchBox integrated />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/advice" className={AS_BTN_SECONDARY}>
                Explore guides
              </Link>
              <Link href="/ai" className={`${AS_BTN_GHOST} text-[#93C5FD]`}>
                Ask Access Stamp AI →
              </Link>
            </div>
          </div>

          <div className="hidden min-w-0 lg:block">
            <AccessReportPreview variant="compact" showCta={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
