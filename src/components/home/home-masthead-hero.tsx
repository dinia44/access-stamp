import Image from "next/image";
import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { heroBackdropImageUrl } from "@/lib/cloudinary-url";

const HERO_IMAGE = heroBackdropImageUrl(CLOUDINARY_MEDIA.homepageHeroBackdrop);

export function HomeMastheadHero() {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF8] pb-28 pt-8 sm:pb-32 sm:pt-10 lg:pb-36 lg:pt-12">
      <RouteDecoration className="right-[-5%] top-8 h-28 w-[min(55vw,420px)] opacity-80" />
      <RouteDecoration className="bottom-32 left-[-8%] h-24 w-[min(45vw,360px)] opacity-60" flip />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">
              Disability-led access platform
            </p>

            <h1 className="mt-4 max-w-xl font-[family-name:var(--font-heading)] text-[clamp(2.25rem,5.2vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#20242E]">
              Know what access looks like before you arrive.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#4A5263] sm:text-lg">
              Access Stamp gives disabled people and families practical venue details, clear guidance, and tools for
              asking the right questions — without vague accessibility claims or hidden unknowns.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="/venue-finder" className="w-full rounded-full sm:w-auto">
                Check venue access
              </ButtonLink>
              <ButtonLink href="/advice" variant="secondary" className="w-full rounded-full sm:w-auto">
                Find practical guidance
              </ButtonLink>
              <Link
                href="/ai-toolkit"
                className={`inline-flex min-h-[44px] w-full items-center justify-center gap-1 text-sm font-semibold text-[#C8430F] hover:underline sm:w-auto ${HOME_FOCUS}`}
              >
                Use Access Stamp tools
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:max-w-none">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_24px_64px_-24px_rgba(122,80,48,0.28)] sm:aspect-[5/6]"
              style={{ borderRadius: "58% 42% 55% 45% / 48% 52% 47% 53%" }}
            >
              <Image
                src={HERO_IMAGE}
                alt="People arriving at a café with step-free access, including a wheelchair user"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-cover object-center"
              />
            </div>
          </figure>
        </div>

        <div className="relative z-20 mx-auto mt-10 max-w-5xl lg:-mt-14 xl:-mt-16">
          <AccessStampSearchBox integrated />
        </div>
      </div>
    </section>
  );
}
