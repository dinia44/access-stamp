import { AboutSection, AboutSectionHeader } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { FadeIn } from "@/components/fade-in";

const WEAK = ["“Wheelchair accessible”", "“Disabled toilet available”", "“Staff can help”"] as const;

const USEFUL = [
  "Step-free entrance location",
  "Door width and turning space",
  "Toilet transfer side and space",
  "Parking distance and surface",
  "Photos of entrance and toilet route",
  "Staff process for ramps or assistance",
] as const;

export function ProblemComparison() {
  return (
    <AboutSection aria-labelledby="access-gap-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
        <AboutSectionHeader
          id="access-gap-heading"
          title="The access gap is not just ramps and toilets."
          description={
            <div className="space-y-4">
              <p className={ABOUT_BODY}>
                Too much accessibility information is vague. A venue can say “wheelchair accessible” without
                explaining the things that actually decide whether someone can visit safely: entrance width,
                step-free routes, toilet transfer space, seating layout, parking distance, staff awareness, quiet
                times, emergency planning, and whether the information is recent.
              </p>
              <p className={ABOUT_BODY}>
                That leaves disabled people and families doing the work themselves — calling ahead, guessing from
                photos, risking wasted journeys, or avoiding places completely.
              </p>
            </div>
          }
        />

        <FadeIn delayMs={100}>
          <div className={`${ABOUT_PANEL} overflow-hidden`}>
            <div className="border-b border-[#F1D8C7] bg-[#FFF3E8] px-6 py-4">
              <p className="text-sm font-bold text-[#13201F]">Vague access claims vs useful access details</p>
            </div>
            <div className="grid gap-0 sm:grid-cols-2">
              <div className="border-b border-[#F1D8C7] p-6 sm:border-b-0 sm:border-r">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#B45309]">Weak information</p>
                <ul className="mt-4 space-y-3">
                  {WEAK.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-[#FDE68A]/60 bg-[#FFFBEB] px-3 py-2.5 text-sm text-[#5E6A66]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#2F7D32]">Useful information</p>
                <ul className="mt-4 space-y-3">
                  {USEFUL.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-[#C8E6C9]/70 bg-[#EDF7ED] px-3 py-2.5 text-sm text-[#13201F]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </AboutSection>
  );
}
