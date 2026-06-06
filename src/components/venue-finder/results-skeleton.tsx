export function ResultsSkeleton() {
  return (
    <ul className="mt-6 grid gap-5" aria-busy="true" aria-label="Loading venue results">
      {[1, 2, 3].map((i) => (
        <li key={i} className="vf-venue-card vf-skeleton-card">
          <div className="vf-venue-card-accent vf-skeleton" style={{ height: 4 }} aria-hidden="true" />
          <div className="vf-venue-card-body">
            <div className="vf-venue-card-image" aria-hidden="true" />
            <div className="vf-venue-card-content space-y-3">
              <div className="vf-skeleton h-5 w-24 rounded-full" />
              <div className="vf-skeleton h-6 w-2/3 max-w-xs" />
              <div className="vf-skeleton h-4 w-1/3 max-w-[10rem]" />
              <div className="flex gap-2">
                <div className="vf-skeleton h-6 w-28 rounded-full" />
                <div className="vf-skeleton h-6 w-32 rounded-full" />
              </div>
              <div className="vf-skeleton mt-2 h-4 w-full" />
              <div className="vf-skeleton h-4 w-4/5" />
              <div className="vf-skeleton h-16 w-full" />
              <div className="vf-skeleton h-11 w-40" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
