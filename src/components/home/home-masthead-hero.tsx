import Link from "next/link";
import { AccessStampSearchBox } from "@/components/home/access-stamp-search-box";
import { RouteDecoration } from "@/components/home/route-decoration";
import { SiteLogo } from "@/components/site-logo";

export function HomeMastheadHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF8] via-[#FBEDE2] to-[#F7E0CE] px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:pb-24">
      <RouteDecoration className="right-[-5%] top-8 h-28 w-[min(55vw,420px)] opacity-80" />
      <RouteDecoration className="bottom-12 left-[-8%] h-24 w-[min(45vw,360px)] opacity-60" flip />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-8 flex w-full flex-col items-center">
          <Link href="/" className="inline-flex justify-center" aria-label="Access Stamp home">
            <SiteLogo priority className="h-auto max-h-[72px] w-auto object-contain sm:max-h-[84px]" />
          </Link>
        </div>

        <p className="mx-auto inline-flex items-center rounded-full border border-[#F6CFB8] bg-[#FDE9DD] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#C8430F]">
          Venues · Advice · Rights · AI tools
        </p>

        <h1 className="mt-6 font-[family-name:var(--font-heading)] text-[clamp(3rem,9vw,6.75rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#20242E]">
          Access{" "}
          <span className="italic text-[#C8430F]">Stamp</span>
        </h1>

        <p className="mt-4 font-[family-name:var(--font-heading)] text-xl italic text-[#20242E] sm:text-2xl">
          Everyday life, made accessible.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#4A5263] sm:text-lg">
          Access-checked venues, plain-English advice on rights, benefits and equipment, and AI tools that help you
          plan — built by disabled people in the UK.
        </p>

        <div className="mx-auto mt-10 max-w-3xl text-left">
          <AccessStampSearchBox integrated />
        </div>
      </div>
    </section>
  );
}
