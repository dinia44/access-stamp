import { AboutSection } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { FadeIn } from "@/components/fade-in";

const PERSPECTIVE = [
  "Lived experience as a wheelchair user",
  "Focus on real-world access, not theory",
  "Built around practical decisions before people travel, work, study, or visit",
  "Designed to help disabled people and venues understand the details that usually get missed",
] as const;

export function FounderStory() {
  return (
    <AboutSection tone="alt" aria-labelledby="founder-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-14">
        <div className="space-y-4">
          <h2
            id="founder-heading"
            className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
          >
            Built by someone who had to learn access the hard way.
          </h2>
          <p className={ABOUT_BODY}>
            Access Stamp was created by Allister Diniz, a disabled wheelchair user who knows that access is rarely as
            simple as “can you get through the door?”
          </p>
          <p className={ABOUT_BODY}>
            When you first use a wheelchair, people often make it sound simple: you get a wheelchair, and that is the
            solution. But real access is full of hidden details. You learn about cushions, pressure areas, slide
            sheets, transfer space, barrier cream, seating posture, fatigue, toilet access, transport, emergency
            evacuation, and the small things nobody explains until something goes wrong.
          </p>
          <p className={ABOUT_BODY}>
            The same problem appears at work, in education, in venues, and in everyday life. Many disabled people are
            expected to understand risk assessments, fire evacuation plans, occupational health reports, reasonable
            adjustments, and access planning without anyone explaining them in plain English.
          </p>
          <p className={ABOUT_BODY}>
            Access Stamp exists to turn those hidden details into practical tools, guides, and venue information people
            can actually use.
          </p>
        </div>

        <FadeIn delayMs={100}>
          <aside className={`${ABOUT_PANEL} p-6 sm:p-8`} aria-labelledby="founder-perspective-heading">
            <p
              id="founder-perspective-heading"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]"
            >
              Founder perspective
            </p>
            <ul className="mt-5 space-y-4">
              {PERSPECTIVE.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#13201F]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#59682A]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </FadeIn>
      </div>
    </AboutSection>
  );
}
