import { AboutSection } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCTA() {
  return (
    <AboutSection tone="panel" aria-labelledby="final-cta-heading">
      <div className={`mx-auto max-w-4xl p-8 text-center sm:p-12 ${ABOUT_PANEL}`}>
        <h2
          id="final-cta-heading"
          className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
        >
          Start with clearer access information.
        </h2>
        <p className={`mx-auto mt-4 max-w-2xl ${ABOUT_BODY}`}>
          Whether you are planning a visit, supporting someone else, improving a venue, or trying to understand the
          access details nobody explains, Access Stamp is built to make the next step clearer.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="/venue-finder" size="lg" className="w-full sm:w-auto">
            Find accessible venues
          </ButtonLink>
          <ButtonLink href="/advice" variant="secondary" size="lg" className="w-full sm:w-auto">
            Read practical guides
          </ButtonLink>
          <ButtonLink href="/submit-venue" variant="outline" size="lg" className="w-full sm:w-auto">
            List your venue
          </ButtonLink>
        </div>
      </div>
    </AboutSection>
  );
}
