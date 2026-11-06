"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "venue-summary", label: "Overview" },
  { id: "venue-entrance", label: "Entrance" },
  { id: "venue-inside", label: "Inside" },
  { id: "venue-toilets", label: "Toilets" },
  { id: "venue-arrival", label: "Getting here" },
  { id: "venue-fit", label: "My needs" },
];

export function VenueDetailSectionNav({
  hasPhotos = true,
}: {
  hasPhotos?: boolean;
}) {
  const [active, setActive] = useState("venue-summary");
  useEffect(() => {
    const targets = SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return (
    <nav aria-label="On this page" className="venue-report-nav">
      <ul>
        {SECTIONS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
        {hasPhotos ? (
          <li>
            <a href="#venue-photos">Photos</a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
