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

      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">
        <FadeIn>
          <figure className="founder-photo-card mx-auto w-full max-w-md md:max-w-none">
            <div
              className={cn(
                ABOUT_PANEL,
                "relative flex aspect-[3/4] max-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] border-[#E8DDF0] bg-gradient-to-br from-[#F8F4FC] via-[#F3ECFA] to-[#EDE4F6] px-6 py-10 text-center shadow-[0_24px_48px_-28px_rgba(89,56,120,0.28)] sm:max-h-[480px] md:max-h-[540px]",
              )}
              role="img"
              aria-label="Founder image or video to be added."
            >
              <p className="text-sm font-medium text-[#6B5B7A]">Founder image/video to be added.</p>
            </div>
            <figcaption className="mt-5 text-center md:text-left">
              <p className="text-lg font-semibold text-[#13201F]">Allister Diniz</p>
              <p className="mt-0.5 text-sm font-medium text-[#59682A]">Founder, Access Stamp</p>
            </figcaption>
          </figure>
        </FadeIn>

        <div className="founder-copy space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]">Founder-led platform</p>
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
