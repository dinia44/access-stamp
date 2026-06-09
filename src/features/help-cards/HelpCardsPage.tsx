const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dtl4syjuh/image/upload/v1781037325/0d8001f9-4328-4946-b478-14182622343b_fvwtle.png";

type IconName =
  | "shield"
  | "car"
  | "badge"
  | "chat"
  | "clock"
  | "briefcase"
  | "users"
  | "stethoscope"
  | "hospital"
  | "care"
  | "pound"
  | "venue"
  | "bus"
  | "check"
  | "question"
  | "sliders"
  | "quote"
  | "phone"
  | "print"
  | "spark"
  | "copy";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = {
    className: `as-icon ${className}`,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return <svg {...common}><path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" /></svg>;
    case "car":
      return <svg {...common}><path d="M5 17h14" /><path d="M7 17v2" /><path d="M17 17v2" /><path d="M4 13l2-5h12l2 5" /><path d="M6 13h12" /><circle cx="7.5" cy="15.5" r="1" /><circle cx="16.5" cy="15.5" r="1" /></svg>;
    case "badge":
      return <svg {...common}><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M9 8h6" /><path d="M9 12h6" /><path d="M9 16h3" /></svg>;
    case "chat":
      return <svg {...common}><path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4.5A8 8 0 1 1 21 12Z" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "briefcase":
      return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>;
    case "users":
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "stethoscope":
      return <svg {...common}><path d="M6 3v5a4 4 0 0 0 8 0V3" /><path d="M14 8a4 4 0 0 0 8 0v-.5" /><circle cx="20" cy="7" r="2" /><path d="M10 12v2a6 6 0 0 0 12 0v-4" /></svg>;
    case "hospital":
      return <svg {...common}><path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" /><path d="M9 21v-6h6v6" /><path d="M10 8h4" /><path d="M12 6v4" /></svg>;
    case "care":
      return <svg {...common}><path d="M12 21s-7-4.5-9-9.5C1.5 7.5 4 4 7.5 4c2 0 3.5 1.2 4.5 2.5C13 5.2 14.5 4 16.5 4 20 4 22.5 7.5 21 11.5 19 16.5 12 21 12 21Z" /></svg>;
    case "pound":
      return <svg {...common}><path d="M7 11h8" /><path d="M8 21h8" /><path d="M8 21c3-3 4-6 2-12a4 4 0 0 1 7-3" /></svg>;
    case "venue":
      return <svg {...common}><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9 21v-6h6v6" /></svg>;
    case "bus":
      return <svg {...common}><rect x="5" y="3" width="14" height="15" rx="2" /><path d="M7 18v3" /><path d="M17 18v3" /><path d="M5 9h14" /><circle cx="8" cy="15" r="1" /><circle cx="16" cy="15" r="1" /></svg>;
    case "check":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
    case "question":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.8 2.8 0 0 1 5 1.7c0 2-2.5 2.2-2.5 4" /><path d="M12 18h.01" /></svg>;
    case "sliders":
      return <svg {...common}><path d="M4 6h10" /><path d="M18 6h2" /><circle cx="16" cy="6" r="2" /><path d="M4 12h3" /><path d="M11 12h9" /><circle cx="9" cy="12" r="2" /><path d="M4 18h12" /><path d="M20 18h0" /><circle cx="18" cy="18" r="2" /></svg>;
    case "quote":
      return <svg {...common}><path d="M9 7H5v5h4v5H4" /><path d="M20 7h-4v5h4v5h-5" /></svg>;
    case "phone":
      return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>;
    case "print":
      return <svg {...common}><path d="M6 9V3h12v6" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v7H6z" /></svg>;
    case "spark":
      return <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /></svg>;
    case "copy":
      return <svg {...common}><rect x="9" y="9" width="11" height="11" rx="2" /><rect x="4" y="4" width="11" height="11" rx="2" /></svg>;
  }
}

const highPressureCards: Array<{ label: string; icon: IconName }> = [
  { label: "Stopped by police", icon: "shield" },
  { label: "Section 88 driving licence", icon: "car" },
  { label: "Blue Badge issue", icon: "badge" },
  { label: "Communication support", icon: "chat" },
  { label: "Please give me time to respond", icon: "clock" },
];

const situationCards: Array<{ label: string; icon: IconName }> = [
  { label: "Job interview", icon: "briefcase" },
  { label: "Work adjustments", icon: "users" },
  { label: "GP appointment", icon: "stethoscope" },
  { label: "Hospital appointment", icon: "hospital" },
  { label: "Social care assessment", icon: "care" },
  { label: "Benefits assessment", icon: "pound" },
  { label: "Visiting a venue", icon: "venue" },
  { label: "Travel or transport issue", icon: "bus" },
];

const cardPacks = [
  "Job interview access pack",
  "Medical appointment access pack",
  "Social care assessment pack",
  "Venue visit access pack",
  "Work reasonable adjustment pack",
  "Benefits assessment pack",
];

const previewModules: Array<{
  title: string;
  icon: IconName;
  lines: string[];
  wide?: boolean;
}> = [
  {
    title: "Check once",
    icon: "check",
    lines: [
      "Reasonable adjustments can apply to job applicants.",
      "Ask early and get confirmation in writing.",
    ],
  },
  {
    title: "Helpful ask",
    icon: "question",
    lines: ["Is the interview room step-free?", "Is there an accessible toilet nearby?"],
  },
  {
    title: "Adjustments I can ask for",
    icon: "sliders",
    lines: [
      "Changes to the recruitment process.",
      "Extra time, breaks, remote option or accessible room setup.",
    ],
  },
  {
    title: "Carry",
    icon: "briefcase",
    lines: [
      "Short access-needs summary.",
      "Medical/access evidence if required.",
      "Previous adjustment examples.",
    ],
  },
  {
    title: "Key line",
    icon: "quote",
    wide: true,
    lines: [
      "“I’m asking for reasonable adjustments so I can take part in the interview fairly.”",
    ],
  },
];

export default function HelpCardsPage() {
  return (
    <div className="as-help-page">
      <header className="as-header" aria-label="Site header">
        <a className="as-logo" href="/" aria-label="Access Stamp home">
          <span className="as-logo-mark">A</span>
          <span className="as-logo-text">Access<br />Stamp</span>
        </a>

        <nav className="as-nav" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/venue-finder">Venue Finder</a>
          <a href="/advice">Advice Hub</a>
          <a href="/blog">Blog</a>
          <a href="/about">About</a>
          <a href="/resources">Resources</a>
        </nav>

        <a className="as-start-button" href="/venue-finder">Start searching</a>
      </header>

      <section className="as-search-shell" aria-label="Site search">
        <label htmlFor="site-search" className="as-search-label">Search the site</label>
        <div className="as-search-input-wrap">
          <span className="as-search-icon" aria-hidden="true">⌕</span>
          <input
            id="site-search"
            type="search"
            placeholder="Search venues, rights, equipment, transport or care support..."
          />
        </div>
      </section>

      <section className="as-hero" aria-labelledby="help-cards-title">
        <div className="as-hero-copy">
          <p className="as-eyebrow">Pocket-sized support tools</p>
          <h1 id="help-cards-title">Help Cards</h1>
          <p className="as-subtitle">
            Pocket-sized scripts for real-world access, rights and support situations.
          </p>
          <p className="as-body-copy">
            Open a card before an appointment, interview, venue visit, police stop or difficult
            conversation. Show it, read it out, print it, save it to your phone, or tailor it with AI.
          </p>

          <div className="as-cta-row">
            <a href="#card-packs" className="as-button as-button-primary">Build a card pack</a>
            <a href="#browse-cards" className="as-button as-button-secondary">Browse all cards</a>
          </div>

          <p className="as-trust-line">
            <span aria-hidden="true">✓</span>
            Source-backed cards for real conversations — not invented legal advice.
          </p>
        </div>

        <div className="as-photo-stage" aria-hidden="false">
          <img
            src={HERO_IMAGE_URL}
            alt="A disabled wheelchair user having a professional interview-style conversation in a modern office"
            className="as-hero-photo"
          />
          <div className="as-photo-fade" aria-hidden="true" />

          <div className="as-mini-card as-mini-card-top" aria-hidden="true">
            <strong>Adjustments<br />I Can Ask For</strong>
            <span>Extra time, breaks, remote option, accessible setup.</span>
          </div>

          <div className="as-mini-card as-mini-card-bottom" aria-hidden="true">
            <strong>Access Evidence</strong>
            <span>Medical letters, adjustment history, notes.</span>
          </div>
        </div>

        <aside className="as-preview-area" aria-label="Featured Help Card preview">
          <article className="as-help-card-preview">
            <div className="as-preview-header">
              <div>
                <p className="as-card-kicker">Access Stamp</p>
                <p className="as-card-path">Work & interviews / Interview</p>
              </div>
              <span className="as-help-badge">Help card</span>
            </div>

            <h2>Job interview reasonable adjustment card</h2>
            <p className="as-card-description">
              Request interview changes such as extra time, accessible room setup, remote interview,
              communication support or PA/carer support.
            </p>

            <div className="as-module-grid">
              {previewModules.map((module) => (
                <section
                  key={module.title}
                  className={module.wide ? "as-card-module as-card-module-wide" : "as-card-module"}
                >
                  <div className="as-module-icon"><Icon name={module.icon} /></div>
                  <div>
                    <h3>{module.title}</h3>
                    <ul>
                      {module.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <div className="as-action-row" aria-label="Help Card actions">
            <button type="button" aria-label="Save job interview reasonable adjustment card to phone">
              <Icon name="phone" />
              Save to phone
            </button>
            <button type="button" aria-label="Print job interview reasonable adjustment card">
              <Icon name="print" />
              Print
            </button>
            <button type="button" aria-label="Tailor job interview reasonable adjustment card with AI">
              <Icon name="spark" />
              Tailor with AI
            </button>
            <button type="button" className="as-copy-action" aria-label="Copy quick line from job interview reasonable adjustment card">
              <Icon name="copy" />
              Copy quick line
            </button>
          </div>
        </aside>
      </section>

      <section className="as-lower" id="browse-cards" aria-label="Help Card collections">
        <div className="as-lower-column">
          <div className="as-section-heading">
            <h2>High-pressure cards</h2>
            <p>For moments where you need clear wording quickly.</p>
          </div>
          <div className="as-compact-card-row">
            {highPressureCards.map((card) => (
              <a href="#" className="as-compact-card" key={card.label}>
                <Icon name={card.icon} />
                <span>{card.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="as-lower-column as-lower-column-middle">
          <div className="as-section-heading">
            <h2>Choose the situation</h2>
            <p>Pick the situation you&apos;re preparing for.</p>
          </div>
          <div className="as-situation-grid">
            {situationCards.map((card) => (
              <a href="#" className="as-situation-card" key={card.label}>
                <Icon name={card.icon} />
                <span>{card.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="as-lower-column" id="card-packs">
          <div className="as-section-heading">
            <h2>Card packs for difficult conversations</h2>
            <p>Everything you need in one place.</p>
          </div>
          <div className="as-pack-list">
            {cardPacks.map((pack) => (
              <a href="#" className="as-pack-row" key={pack}>
                <Icon name="briefcase" />
                <span>{pack}</span>
                <span aria-hidden="true">›</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
