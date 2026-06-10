const TRUST_ITEMS = [
  {
    title: "Real access detail",
    description: "Not vague labels. Practical detail you can trust.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Plan before you travel",
    description: "Toilets, routes, parking and more.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4l2 2" />
      </svg>
    ),
  },
  {
    title: "Built by disabled people",
    description: "For a community that knows what matters.",
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
    <section aria-label="Why trust Access Stamp venue detail" className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative grid gap-4 overflow-hidden rounded-[2rem] border border-border bg-verified-pale p-6 md:grid-cols-3">
        <div
          className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-background-2/80 blur-2xl"
          aria-hidden="true"
        />
        <ul className="contents">
          {TRUST_ITEMS.map((item) => (
            <li key={item.title} className="relative">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-card text-[var(--color-secondary)] shadow-sm">
                  {item.icon}
                </span>
                <div>
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-heading">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
