import { AboutSection } from "@/components/about/about-section";
import {
  ABOUT_BODY,
  ABOUT_H2,
  ABOUT_PANEL,
} from "@/components/about/about-theme";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

const CREDIBILITY_CHIPS = [
  "Disabled-led",
  "Wheelchair user perspective",
  "Practical access detail",
  "Plain English guidance",
  "Built around real decisions",
] as const;

export function FounderStory() {
  return (
    <AboutSection
      id="founder"
      tone="panel"
      aria-labelledby="founder-section-heading"
      className="founder-about-section bg-[#F4EEF8]"
    >
      <h2 id="founder-section-heading" className="sr-only">
        About Allister Diniz, founder of Access Stamp
      </h2>

      <div className="grid gap-10 md:grid-cols-1 md:items-start md:gap-12 lg:gap-16">
        <div className="founder-copy space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]">Founder-led platform</p>
            <p className="text-lg font-semibold text-[#13201F]">Allister Diniz · Founder, Access Stamp</p>
            <h3 className={ABOUT_H2}>
              Built from lived experience, not box-ticking.
            </h3>
            <p className={ABOUT_BODY}>
              Access Stamp was founded by Allister Diniz to make access information more practical, honest, and useful.
              Accessibility is not just a ramp symbol. It is doorway width, seating, transfer space, fatigue, toilet
              layout, staff awareness, pressure care, emergency planning, and knowing what to expect before you risk the
              journey.
            </p>
            <p className="text-[1rem] leading-[1.7] text-[#5E6A66]">
              Vague &ldquo;wheelchair accessible&rdquo; claims are not enough. Access Stamp exists because disabled
              people are often expected to discover access barriers alone — at the doorway, in the toilet, at work, or
              on the phone before an appointment. We show practical detail, label what is unknown, and help venues
              explain access in a way people can actually use.
            </p>
          </div>

          <ul
            className="flex flex-wrap gap-2.5"
            aria-label="Founder credibility"
          >
            {CREDIBILITY_CHIPS.map((chip) => (
              <li key={chip}>
                <span className="inline-flex rounded-full border border-[#E2D4EC] bg-white/80 px-3.5 py-1.5 text-sm font-medium text-[#13201F] shadow-[0_8px_20px_-16px_rgba(89,56,120,0.35)]">
                  {chip}
                </span>
              </li>
            ))}
          </ul>

          <FadeIn delayMs={100}>
            <aside
              className={cn(
                ABOUT_PANEL,
                "border-[#E2D4EC] bg-white/90 p-6 sm:p-7",
              )}
              aria-labelledby="founder-insight-heading"
            >
              <p
                id="founder-insight-heading"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]"
              >
                Founder insight
              </p>
              <p className="mt-3 text-[1rem] leading-[1.7] text-[#13201F]">
                Access is rarely one thing. It is the route, the chair, the cushion, the transfer, the toilet, the
                support, the risk plan, and the information someone has before they leave.
              </p>
            </aside>
          </FadeIn>
        </div>
      </div>
    </AboutSection>
  );
}
