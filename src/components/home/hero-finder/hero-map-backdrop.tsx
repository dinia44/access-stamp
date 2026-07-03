/** Ambient decorative map — aria-hidden, pointer-events none. */
export function HeroMapBackdrop() {
  return (
    <div className="hero-finder__backdrop" aria-hidden="true">
      <div className="hero-finder__gradient" />
      <svg className="hero-finder__map" viewBox="0 0 800 520" preserveAspectRatio="xMidYMax slice">
        <g stroke="var(--hero-map-stroke)" strokeWidth="1.2" fill="none" opacity="0.65">
          <path d="M40 120 H760 M40 200 H760 M40 280 H760 M40 360 H760 M40 440 H760" />
          <path d="M120 40 V480 M240 40 V480 M360 40 V480 M480 40 V480 M600 40 V480 M720 40 V480" />
          <path d="M40 80 H200 M600 80 H760 M40 400 H180 M620 400 H760" strokeDasharray="6 8" opacity="0.5" />
        </g>

        <ellipse cx="620" cy="360" rx="88" ry="54" fill="var(--hero-map-river)" opacity="0.9" />
        <ellipse cx="180" cy="140" rx="64" ry="42" fill="var(--hero-map-park)" />
        <ellipse cx="520" cy="120" rx="48" ry="34" fill="var(--hero-map-park)" />

        <path
          className="hero-finder__route"
          d="M150 410 C 230 360, 300 390, 380 330 S 540 250, 650 210"
        />

        <g fill="var(--hero-map-pin)">
          <circle className="hero-finder__pin-pulse" cx="150" cy="410" r="18" fill="none" stroke="var(--hero-map-pin)" strokeWidth="1.5" opacity="0.45" />
          <circle cx="150" cy="410" r="5" />

          <circle className="hero-finder__pin-pulse hero-finder__pin-pulse--delay-1" cx="380" cy="330" r="18" fill="none" stroke="var(--hero-map-pin)" strokeWidth="1.5" opacity="0.45" />
          <circle cx="380" cy="330" r="5" />

          <circle className="hero-finder__pin-pulse hero-finder__pin-pulse--delay-2" cx="650" cy="210" r="18" fill="none" stroke="var(--hero-map-pin)" strokeWidth="1.5" opacity="0.45" />
          <circle cx="650" cy="210" r="5" />
        </g>
      </svg>
    </div>
  );
}
