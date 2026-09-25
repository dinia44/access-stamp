import Link from "next/link";
import { toVerificationLabel, toVerificationType } from "@/lib/venue-verification";

type Props = {
  verification: string;
  confidence: "High" | "Medium" | "Low";
  lastUpdated: string;
};

export function AccessCheckedMethodology({ verification, confidence, lastUpdated }: Props) {
  const verificationType = toVerificationType(verification);
  const verificationLabel = toVerificationLabel(verificationType);

  const sourceDescription: Record<string, string> = {
    demo: "This is a demonstration listing showing how Access Stamp venue reports could work. It has not been independently verified.",
    unverified: "early information that still needs confirmation before we treat it as reliable.",
    community_reported: "information shared by disabled visitors or venue staff, checked against our feature checklist.",
    venue_submitted: "information submitted by the venue and checked against our feature checklist.",
    desk_reviewed: "information reviewed remotely against our methodology, without an on-site visit.",
    onsite_audited: "a measured on-site audit with photographed evidence of entrances, routes, toilets and support features.",
  };

  return (
    <aside className="rounded-2xl border border-[#EFE5DA] bg-[#FAF4ED] p-4 text-sm leading-7 text-[#4A5263]">
      <details className="group">
        <summary className="cursor-pointer list-none text-base font-semibold text-[#20242E] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            How to read this listing
            <span className="text-xs font-medium text-[#596474] group-open:hidden">Show</span>
            <span className="hidden text-xs font-medium text-[#596474] group-open:inline">Hide</span>
          </span>
        </summary>
        <div className="mt-3 border-t border-[#EFE5DA] pt-3">
          <p>
            <span className="font-semibold text-[#20242E]">{verificationLabel}</span> means this listing is based on{" "}
            {sourceDescription[verificationType] ?? sourceDescription.unverified}
          </p>
          <p className="mt-2">
            {verificationType === "demo" ? "Confidence and audit dates are not assessed for demonstration listings. Features and images illustrate the report format and must not be used to plan a real visit." : `Confidence is rated ${confidence} based on evidence completeness and recency. Last updated ${lastUpdated}. Features are reported present, unavailable or unknown.`}
          </p>
          <p className="mt-2">
            Access information can change. Check the confidence label, review any known unknowns, and confirm important
            details directly with the venue before travelling.
          </p>
          <p className="mt-2">
            <Link href="/methodology" className="font-semibold text-[#C8430F] underline-offset-2 hover:underline">
              Read our methodology
            </Link>
          </p>
        </div>
      </details>
    </aside>
  );
}
