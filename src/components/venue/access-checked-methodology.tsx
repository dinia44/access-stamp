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
    <aside className="rounded-2xl border border-[#EFE5DA] bg-[#FAF4ED] p-5 text-sm leading-7 text-[#4A5263]">
      <h2 className="text-base font-semibold text-[#20242E]">How to read this listing</h2>
      <p className="mt-2">
        <span className="font-semibold text-[#20242E]">{verificationLabel}</span> means this listing is based on{" "}
        {sourceDescription[verificationType] ?? sourceDescription.unverified}
      </p>
      <p className="mt-2">
        Confidence is rated <span className="font-semibold text-[#20242E]">{confidence}</span> based on how complete
        and recent the evidence is. Last updated {lastUpdated}. We show features as confirmed, not available, or
        unknown — colour and icons are never the only signal.
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
    </aside>
  );
}
