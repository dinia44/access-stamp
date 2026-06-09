import { HomeHeroGuidanceAskAi } from "@/components/home/home-hero-guidance-ask-ai";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageContainer } from "@/components/layout/PageContainer";

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HomeHeroGuidanceCta() {
  return (
    <section className="relative z-20 -mt-4 px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="guidance-cta-heading">
      <PageContainer>
        <div className="relative overflow-hidden rounded-3xl border border-[#F1D8C7] bg-gradient-to-r from-[#FFE2D3] via-[#FFF3E8] to-[#FFE8D6] p-6 shadow-xl shadow-[#F04A16]/10 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
            style={{
              background:
                "radial-gradient(600px 300px at 0% 50%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(400px 200px at 100% 30%, rgba(255,255,255,0.35), transparent 55%)",
            }}
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex shrink-0 items-start gap-5">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#F1D8C7] bg-white text-[#F04A16] shadow-md shadow-[#F04A16]/10">
                <BookIcon className="h-6 w-6" />
              </span>
              <div className="max-w-2xl pt-1">
                <h2 id="guidance-cta-heading" className="text-xl font-bold tracking-[-0.02em] text-[#13201F] sm:text-2xl">
                  Need practical guidance beyond venue search?
                </h2>
                <p className="mt-2 text-base leading-7 text-[#5E6A66]">
                  Explore trusted disability advice and get clear, practical answers from our AI assistant — anytime.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:ml-auto">
              <ButtonLink href="/advice" variant="secondary" className="gap-2" aria-label="Explore disability guides">
                Explore disability guides
                <ArrowIcon className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <HomeHeroGuidanceAskAi />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
