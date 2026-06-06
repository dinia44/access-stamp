import Link from "next/link";
import { VerificationBadge } from "@/components/verification-badge";

export function HomeVerificationSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-16" aria-labelledby="verification-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Trust & transparency</p>
          <h2 id="verification-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-slate-900">
            How we verify access information
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Venue pages combine structured feature checks with photos and measurements where we have them. Labels describe
            how strong the evidence is — not whether a place is &ldquo;good&rdquo; or &ldquo;bad&rdquo;.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <VerificationBadge status="Access Stamp checked" />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Reviewed against our field-style checklist; priority for filters like verified venues only.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <VerificationBadge status="Community reported" />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Submitted or corroborated detail from disabled people and allies — useful, but worth confirming before you
              travel.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <VerificationBadge status="Not yet verified" />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Early or partial information — still worth a look, especially if you phone ahead or visit off-peak.
            </p>
          </li>
        </ul>

        <p className="mt-6">
          <Link
            href="/about#listings"
            className="text-sm font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
          >
            Read our full verification approach →
          </Link>
        </p>
      </div>
    </section>
  );
}
