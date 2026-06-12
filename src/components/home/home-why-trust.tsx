import { PageContainer } from "@/components/layout/PageContainer";

const PROOF_TILES = [
  {
    title: "Photo-evidenced reports",
    body: "Venue listings show measured doorways, routes, and facilities — not vague tick-box claims.",
  },
  {
    title: "Built by disabled people",
    body: "Guidance and tools shaped by lived experience in the UK — practical, not performative.",
  },
  {
    title: "Plain-English UK guidance",
    body: "Rights, benefits, travel, care, and equipment explained without jargon or charity-speak.",
  },
  {
    title: "Free for visitors",
    body: "Search venues, read guides, and use core AI tools at no cost — funded by venue audits.",
  },
] as const;

export function HomeWhyTrust() {
  return (
    <section className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20" aria-labelledby="why-trust-heading">
      <PageContainer>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Why trust us</p>
          <h2 id="why-trust-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
            Honest about what we know
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {PROOF_TILES.map((tile) => (
            <li
              key={tile.title}
              className="rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]"
            >
              <h3 className="text-base font-semibold text-[#20242E]">{tile.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4A5263]">{tile.body}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
