import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_FOCUS } from "@/components/home/home-theme";

export function HomeFounderMission() {
  return (
    <section className="border-t border-[#EFE5DA] bg-[#F4EEF8] py-16 sm:py-20" aria-labelledby="founder-mission-heading">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div
            className="flex aspect-[4/3] flex-col items-center justify-center rounded-[24px] border border-[#E8DDF0] bg-gradient-to-br from-[#F8F4FC] via-[#F3ECFA] to-[#EDE4F6] px-6 py-10 text-center"
            role="img"
            aria-label="Founder image or video to be added."
          >
            <p className="text-sm font-medium text-[#6B5B7A]">Founder image/video to be added.</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]">Founder-led</p>
            <h2 id="founder-mission-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
              Built from lived experience, not box-ticking.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#4A5263]">
              Access Stamp was founded by Allister Diniz to make access information more practical, honest, and useful.
              Accessibility is not just a ramp symbol. It is doorway width, seating, transfer space, fatigue, toilet
              layout, staff awareness, pressure care, emergency planning, and knowing what to expect before you risk
              the journey.
            </p>
            <Link
              href="/about#founder"
              className={`mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
            >
              Read the full story
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
