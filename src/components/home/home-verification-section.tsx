import Link from "next/link";
import { VerificationBadge } from "@/components/verification-badge";
import { HOME_PANEL, HOME_SECTION_PANEL } from "@/components/home/home-theme";

export function HomeVerificationSection() {
  return (
    <section className={HOME_SECTION_PANEL} aria-labelledby="verification-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#59682A]">Trust & transparency</p>
          <h2 id="verification-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#13201F]">
            How we verify access information
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#5E6A66]">
            Venue pages combine structured feature checks with photos and measurements where we have them. Labels describe
            how strong the evidence is — not whether a place is &ldquo;good&rdquo; or &ldquo;bad&rdquo;.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className={`p-5 ${HOME_PANEL}`}>
            <VerificationBadge status="Access Stamp checked" />
            <p className="mt-3 text-sm leading-6 text-[#5E6A66]">
              Reviewed against our field-style checklist; priority for filters like verified venues only.
            </p>
          </li>
          <li className={`p-5 ${HOME_PANEL}`}>
            <VerificationBadge status="Community reported" />
            <p className="mt-3 text-sm leading-6 text-[#5E6A66]">
              Submitted or corroborated detail from disabled people and allies — useful, but worth confirming before you
              travel.
            </p>
          </li>
          <li className={`p-5 ${HOME_PANEL}`}>
            <VerificationBadge status="Not yet verified" />
            <p className="mt-3 text-sm leading-6 text-[#5E6A66]">
              Early or partial information — still worth a look, especially if you phone ahead or visit off-peak.
            </p>
          </li>
        </ul>

        <p className="mt-6">
          <Link
            href="/about#listings"
            className="text-sm font-semibold text-[#F04A16] transition-colors hover:text-[#59682A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#59682A]/20"
          >
            Read our full verification approach →
          </Link>
        </p>
      </div>
    </section>
  );
}
