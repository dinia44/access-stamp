const TRUST_ITEMS = [
  {
    title: "Real access detail",
    description: "Not vague “accessible” labels.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Plan before you travel",
    description: "Check toilets, routes, parking and confidence notes.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4l2 2" />
      </svg>
    ),
  },
  {
    title: "Built around disabled users",
    description: "Practical access detail comes first.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
] as const;

export function VenueTrustStrip() {
  return (
    <section aria-label="Why trust Access Stamp venue detail" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ul className="grid gap-4 md:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item.title}
            className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-sm backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#EDF6EF] text-[#17201C]">
                {item.icon}
              </span>
              <div>
                <h2 className="text-base font-semibold tracking-[-0.02em] text-[#17201C]">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#4F5A53]">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
