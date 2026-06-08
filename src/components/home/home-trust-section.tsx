import { AS_CARD, AS_CONTAINER, AS_EYEBROW, AS_SECTION, AS_SECTION_H2, AS_BODY } from "@/lib/design-system";

const TRUST_POINTS = [
  {
    title: "Lived experience led",
    body: "Built with disabled people, carers, and families — not as an afterthought or charity campaign.",
  },
  {
    title: "Practical verification",
    body: "Access reports combine community checks, photos, and clear feature labels you can act on.",
  },
  {
    title: "Honest, not hype",
    body: "We say when details are uncertain and remind you to check before you travel.",
  },
  {
    title: "Decision-ready guidance",
    body: "Guides and AI answers focus on what to do next — in plain language, without jargon walls.",
  },
] as const;

export function HomeTrustSection() {
  return (
    <section className={`${AS_SECTION} bg-[#F3EFE6]`} aria-labelledby="trust-heading">
      <div className={AS_CONTAINER}>
        <p className={AS_EYEBROW}>Why trust Access Stamp</p>
        <h2 id="trust-heading" className={`${AS_SECTION_H2} mt-3 max-w-2xl text-[#102033]`}>
          Calm confidence, not charity tone
        </h2>
        <p className={`${AS_BODY} mt-4 max-w-2xl text-[#617080]`}>
          We help you make access decisions quickly — with evidence, honesty, and respect for your time.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {TRUST_POINTS.map((point, index) => (
            <article key={point.title} className={`${AS_CARD} ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <h3 className="text-lg font-bold text-[#102033]">{point.title}</h3>
              <p className={`${AS_BODY} mt-2 text-[#617080]`}>{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
