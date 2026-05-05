import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-semibold text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, idx) => (
          <li key={`${it.label}-${idx}`} className="flex items-center gap-2">
            {idx > 0 ? <span aria-hidden>›</span> : null}
            {it.href ? (
              <Link className="hover:text-blue" href={it.href}>
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-heading">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

