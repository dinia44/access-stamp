import type { HelpCardSource } from "@/features/help-cards/helpCardTypes";
import { HC_MUTED_SM } from "@/components/help-cards/help-cards-theme";

export function HelpCardSources({
  sources,
  lastReviewed,
}: {
  sources: HelpCardSource[];
  lastReviewed?: string;
}) {
  return (
    <section aria-labelledby="help-card-sources" className="rounded-2xl border border-[#ead2bf]/80 bg-[#fffaf4] p-5 sm:p-6">
      <h3 id="help-card-sources" className="text-sm font-bold uppercase tracking-wide text-[#17212b]">
        Sources checked
      </h3>
      {lastReviewed ? (
        <p className={`${HC_MUTED_SM} mt-2`}>Last reviewed: {lastReviewed}</p>
      ) : null}
      <ul className="mt-4 space-y-4">
        {sources.map((source) => (
          <li key={source.url} className="text-sm leading-6 text-[#17212b]">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ef5b2a] underline-offset-2 hover:underline"
            >
              {source.title}
            </a>
            <p className="mt-1 text-[#5f6b76]">
              {source.publisher} · {source.confidence} · checked {source.lastChecked}
            </p>
            <p className="mt-1 text-[#5f6b76]">{source.supports}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
