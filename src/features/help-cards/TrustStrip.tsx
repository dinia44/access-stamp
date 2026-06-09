const TRUST_ITEMS = [
  "Source-backed",
  "Plain English",
  "Save offline",
  "Print-friendly",
  "Disability-led",
] as const;

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-strip-title" className="px-5 pt-6 pb-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px] rounded-[30px] border border-[#EAD5C2] bg-white/70 p-6 shadow-sm">
        <h2 id="trust-strip-title" className="sr-only">
          Why you can trust Access Stamp help cards
        </h2>

        <div className="grid gap-4 md:grid-cols-5">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#F0DED0] bg-[#FFFDF9] px-4 py-4 text-center text-sm font-black text-[#132033]"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-sm leading-6 text-[#68717E]">
          Access Stamp provides practical prompts, not medical, legal or financial advice.
        </p>
      </div>
    </section>
  );
}
