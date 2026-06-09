import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomeForVenues() {
  return (
    <section className={HOME_SECTION_ALT} aria-labelledby="for-venues-heading">
      <PageContainer>
        <div className="relative overflow-hidden rounded-3xl border border-[#E8C4A8]/50 bg-gradient-to-br from-[#FFE2D3] via-[#FFF3E8] to-white text-[#13201F] shadow-xl shadow-[#F04A16]/10">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            aria-hidden
            style={{
              background: "radial-gradient(circle at 80% 20%, rgba(240,74,22,0.1), transparent 50%)",
            }}
          />
          <div className="relative grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#59682A]">For venues</p>
              <h2 id="for-venues-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#13201F]">
                Help visitors know what to expect
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#2A3836]">
                Share clearer access information, suggest a venue for listing, or work with Access Stamp to improve how
                your venue describes step-free routes, toilets, parking and staff support.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <ButtonLink href="/submit-venue" aria-label="Suggest a venue for listing">
                Suggest a venue
              </ButtonLink>
              <ButtonLink href="/ai-toolkit/venue-questions" variant="ghost" aria-label="Open venue access checklist">
                Venue access checklist
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
