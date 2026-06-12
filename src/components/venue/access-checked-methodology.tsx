import Link from "next/link";

type Props = {
  verification: "Community reported" | "Access Stamp checked" | "Not yet verified";
  confidence: "High" | "Medium" | "Low";
  lastUpdated: string;
};

export function AccessCheckedMethodology({ verification, confidence, lastUpdated }: Props) {
  const verificationLabel =
    verification === "Access Stamp checked"
      ? "Access Stamp audited"
      : verification === "Community reported"
        ? "Community reported"
        : "Not yet verified";

  return (
    <aside className="rounded-2xl border border-[#EFE5DA] bg-[#FAF4ED] p-5 text-sm leading-7 text-[#4A5263]">
      <h2 className="text-base font-semibold text-[#20242E]">What does access-checked mean?</h2>
      <p className="mt-2">
        <span className="font-semibold text-[#20242E]">{verificationLabel}</span> means this listing is based on{" "}
        {verification === "Access Stamp checked"
          ? "a measured on-site audit with photographed evidence of entrances, routes, toilets and support features."
          : verification === "Community reported"
            ? "information shared by disabled visitors or venue staff, checked against our feature checklist."
            : "early information that still needs confirmation before we treat it as reliable."}
      </p>
      <p className="mt-2">
        Confidence is rated <span className="font-semibold text-[#20242E]">{confidence}</span> based on how complete
        and recent the evidence is. Last updated {lastUpdated}. We show features as confirmed, not available, or
        unknown — colour and icons are never the only signal.
      </p>
      <p className="mt-2">
        <Link href="/about" className="font-semibold text-[#C8430F] underline-offset-2 hover:underline">
          Read how Access Stamp works
        </Link>
      </p>
    </aside>
  );
}
