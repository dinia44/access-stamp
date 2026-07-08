import Link from "next/link";

export function ToolkitTrustStrip() {
  return (
    <section
      className="border-b border-[#EFE5DA] bg-[#FDFBF8] px-4 py-5 sm:px-6"
      aria-label="Important information"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[18px] border border-[#E5ECD9] border-l-4 border-l-[#5F7444] bg-[#EFF3E7]/70 px-4 py-4 sm:px-5">
          <p className="text-sm leading-7 text-[#4A5263] sm:text-base">
            <span className="font-semibold text-[#20242E]">Preparation, not professional advice.</span>{" "}
            These tools create drafts, checklists, and next steps — not legal, medical, emergency, or crisis advice.
            Check important decisions with official sources, and avoid entering unnecessary sensitive information. Use
            them alongside our{" "}
            <Link href="/advice" className="font-semibold text-[#EF5B25] underline-offset-2 hover:underline">
              practical guides
            </Link>{" "}
            when you need fuller context.
          </p>
        </div>
      </div>
    </section>
  );
}
