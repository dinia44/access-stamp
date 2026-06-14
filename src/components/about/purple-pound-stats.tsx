import { AboutSection } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeIn } from "@/components/fade-in";

const STATS = [
  { value: "16 million", label: "Disabled people in the UK" },
  { value: "£274bn+", label: "Estimated annual disabled household spending power" },
  { value: "4 in 10", label: "Disabled people unable to visit local shops because they are inaccessible" },
] as const;

export function PurplePoundStats() {
  return (
    <AboutSection tone="alt" aria-labelledby="purple-pound-heading">
      <div className="max-w-3xl space-y-4">
        <h2
          id="purple-pound-heading"
          className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
        >
          Accessibility is not just a moral issue. It is commercial.
        </h2>
        <p className={ABOUT_BODY}>
          Disabled people and their households represent one of the UK’s most overlooked customer markets. The Purple
          Pound has been estimated at £274 billion per year, and newer Purple Tuesday material cites research
          suggesting disabled people and their families may represent £446 billion in spending power.
        </p>
        <p className={ABOUT_BODY}>
          But that opportunity is wasted when venues do not provide clear access information. If a disabled customer
          cannot tell whether they can enter, use the toilet, transfer safely, park nearby, or ask staff for support,
          many will simply not risk the visit.
        </p>
        <p className={ABOUT_BODY}>
          For venues, accessibility is not only about major building work. Small improvements can build trust: better
          photos, honest measurements, clear ramp procedures, staff training, accurate website information, quieter
          booking times, and practical details that help people decide before they arrive.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {STATS.map((stat, index) => (
          <FadeIn key={stat.label} delayMs={index * 50}>
            <li className={`p-6 text-center sm:p-7 ${ABOUT_PANEL}`}>
              <p className="text-3xl font-bold tracking-tight text-[#13201F] sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#5E6A66]">{stat.label}</p>
            </li>
          </FadeIn>
        ))}
      </ul>

      <p className="mt-6 text-xs leading-5 text-[#5E6A66]">
        Figures are based on publicly available research from UK Parliament, Scope, Business Disability Forum, Purple
        Tuesday, and VisitBritain.
      </p>

      <div className={`mt-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${ABOUT_PANEL}`}>
        <p className="max-w-xl text-base font-semibold leading-7 text-[#13201F]">
          If your venue is accessible but people cannot find or trust the information, you are still losing customers.
        </p>
        <ButtonLink href="/for-venues" className="w-full shrink-0 sm:w-auto">
          Improve your venue listing
        </ButtonLink>
      </div>
    </AboutSection>
  );
}
