# Access Stamp Frontend Build-Edit Specification

## Purpose

This document turns the frontend audit into an ordered implementation plan for improving the Access Stamp website.

The goal is to make the site feel:

- Premium
- Practical
- Trustworthy
- Modern
- Disability-led
- Accessible
- Production-ready

This is not a surface-level Tailwind cleanup. The site needs a stronger frontend system: shared components, predictable interaction states, better responsive behaviour, stronger accessibility, and cleaner page structure.

---

## Implementation Order

Follow this order. Do not start by randomly tweaking page-level styling.

1. Create the UI foundation.
2. Build shared button and interaction components.
3. Fix the header and navigation.
4. Build proper form components.
5. Rebuild the Venue Finder interaction layer.
6. Rebuild Help Cards actions properly.
7. Fix advice page accordions and dropdowns.
8. Fix responsive layout and breakpoints.
9. Add motion and reduced-motion rules.
10. Add QA tests and acceptance checks.

---

# 1. Create a Proper UI Foundation

## Objective

Create a consistent design system foundation so the site stops feeling like different sections were built separately.

## Files to create or update

```txt
src/styles/tokens.css
src/app/globals.css
tailwind.config.ts
```

## Add design tokens

```css
:root {
  --as-bg: #08111f;
  --as-bg-soft: #0d1b2f;
  --as-surface: #101f35;
  --as-surface-raised: #142641;
  --as-border: rgba(255, 255, 255, 0.14);

  --as-text: #f7fafc;
  --as-text-muted: #b8c4d4;
  --as-text-soft: #8fa0b6;

  --as-gold: #d8b35a;
  --as-blue: #67c7ff;
  --as-green: #64d98a;
  --as-red: #ff6b6b;

  --as-focus: #8fd7ff;

  --as-radius-sm: 10px;
  --as-radius-md: 16px;
  --as-radius-lg: 24px;
  --as-radius-xl: 32px;

  --as-shadow-soft: 0 18px 50px rgba(0, 0, 0, 0.26);
  --as-shadow-card: 0 20px 70px rgba(0, 0, 0, 0.32);
}
```

## Tailwind spacing scale

Use consistent spacing tokens.

```ts
spacing: {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
}
```

## Build edits

- Replace random one-off spacing values.
- Replace random card radii.
- Replace random shadows.
- Standardise section padding.
- Standardise text colours.
- Standardise focus colour.
- Make all pages use the same surface/background system.

## Acceptance criteria

- No random `mt-[17px]`, `p-[23px]`, or `rounded-[13px]` unless there is a deliberate reason.
- Cards, buttons, filters, and forms use shared tokens.
- Focus colour is consistent across the site.
- Section spacing feels controlled, not accidental.

---

# 2. Build Shared Button and Interaction Components

## Objective

Every button and CTA should behave consistently across the website.

## Files to create

```txt
src/components/ui/Button.tsx
src/components/ui/ButtonLink.tsx
src/components/ui/Spinner.tsx
```

## Button requirements

The button component must support:

```ts
variant: "primary" | "secondary" | "ghost" | "outline" | "danger" | "chip"
size: "sm" | "md" | "lg" | "icon"
isLoading?: boolean
disabled?: boolean
leftIcon?: ReactNode
rightIcon?: ReactNode
```

## Interaction requirements

Every button must have:

- Default state
- Hover state
- Focus-visible state
- Active/pressed state
- Disabled state
- Loading state where relevant
- Minimum 44×44px touch target for core controls
- No accidental double-submit
- Proper `aria-busy` when loading
- Clear accessible label when icon-only

## Button implementation pattern

```tsx
import { forwardRef } from "react";
import clsx from "clsx";
import { Spinner } from "./Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "chip";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--as-focus)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--as-bg)]",
          "disabled:cursor-not-allowed disabled:opacity-55",
          "active:scale-[0.98]",
          {
            "min-h-11 px-5 text-sm": size === "md",
            "min-h-10 px-4 text-sm": size === "sm",
            "min-h-12 px-6 text-base": size === "lg",
            "h-11 w-11 p-0": size === "icon",

            "bg-[var(--as-gold)] text-[#07101d] hover:brightness-105":
              variant === "primary",
            "bg-white/10 text-white hover:bg-white/15":
              variant === "secondary",
            "bg-transparent text-white hover:bg-white/10":
              variant === "ghost",
            "border border-white/18 bg-transparent text-white hover:bg-white/10":
              variant === "outline",
            "bg-[var(--as-red)] text-white hover:brightness-105":
              variant === "danger",
            "border border-white/16 bg-white/8 text-white hover:bg-white/12 data-[selected=true]:border-[var(--as-blue)] data-[selected=true]:bg-[var(--as-blue)]/16":
              variant === "chip",
          },
          className
        )}
        {...props}
      >
        {isLoading ? <Spinner /> : leftIcon}
        <span>{isLoading ? "Loading…" : children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
```

## Replace loose CTAs across

```txt
Homepage
Venue Finder
Help Cards
Advice pages
Header
Footer CTA blocks
```

## Homepage CTA example

```tsx
<div className="flex flex-col gap-3 sm:flex-row">
  <Button asChild variant="primary" size="lg">
    <Link href="/venue-finder">Find accessible venues</Link>
  </Button>

  <Button asChild variant="secondary" size="lg">
    <Link href="/ask-ai">Ask Access Stamp AI</Link>
  </Button>

  <Button asChild variant="outline" size="lg">
    <Link href="/advice">Explore advice guides</Link>
  </Button>
</div>
```

If the current Button does not support `asChild`, either add Radix Slot or create a separate `ButtonLink` component.

## Acceptance criteria

- All buttons use the shared component.
- All core controls are at least 44×44px.
- Loading buttons cannot be clicked again.
- No invisible focus states.
- No icon-only buttons without accessible names.
- Button variants feel consistent across the whole site.

---

# 3. Fix the Header and Navigation

## Objective

Clean up desktop/mobile navigation so it is visually clean and accessible.

## Files to create or update

```txt
src/components/layout/Header.tsx
src/components/layout/MobileMenu.tsx
src/components/layout/SiteSearch.tsx
```

## Known issue

The homepage appears to expose repeated header/nav/search/menu structures. That may be responsive duplication, but hidden mobile/desktop controls must not be focusable or exposed to assistive tech.

## Desktop nav pattern

```tsx
<nav aria-label="Primary navigation" className="hidden lg:flex">
```

## Mobile menu button pattern

```tsx
<Button
  variant="ghost"
  size="icon"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  <MenuIcon aria-hidden="true" />
</Button>
```

## Mobile menu pattern

```tsx
<div
  id="mobile-menu"
  hidden={!isOpen}
  aria-hidden={!isOpen}
  className="lg:hidden"
>
```

## Critical rule

Do not simply move the mobile menu off-screen while its links remain focusable.

That is broken accessibility.

When closed, the mobile menu must be completely unavailable to keyboard users.

## Active nav state

```tsx
<Link
  href="/venue-finder"
  aria-current={pathname === "/venue-finder" ? "page" : undefined}
  className={clsx(
    "rounded-full px-4 py-2 text-sm font-medium",
    pathname === "/venue-finder"
      ? "bg-white text-[#07101d]"
      : "text-white/80 hover:text-white hover:bg-white/10"
  )}
>
  Venue Finder
</Link>
```

## Keyboard behaviour

- Menu button opens menu with Enter/Space.
- Escape closes the menu.
- Focus returns to the menu button after close.
- Tab order follows visual order.
- Hidden desktop/mobile duplicates are not focusable.

## Acceptance criteria

- One primary nav exposed at a time.
- Mobile menu opens and closes with keyboard.
- Escape closes mobile menu.
- Focus returns to menu button after close.
- No duplicate focusable nav links.
- Current page has `aria-current="page"`.

---

# 4. Build Proper Form Components

## Objective

Make search, location, filter, and AI input experiences feel solid and accessible.

## Files to create

```txt
src/components/ui/FormField.tsx
src/components/ui/TextInput.tsx
src/components/ui/SearchInput.tsx
src/components/ui/ErrorMessage.tsx
src/components/ui/FieldHint.tsx
```

## Text input pattern

```tsx
type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextInput({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: TextInputProps) {
  const inputId = id ?? props.name;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-white">
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={clsx(
          "min-h-11 w-full rounded-2xl border bg-white/8 px-4 text-white placeholder:text-white/45",
          "border-white/16 focus:border-[var(--as-blue)] focus:outline-none focus:ring-4 focus:ring-[var(--as-blue)]/20",
          error && "border-[var(--as-red)] focus:border-[var(--as-red)] focus:ring-[var(--as-red)]/20",
          className
        )}
        {...props}
      />

      {hint && (
        <p id={hintId} className="text-sm text-[var(--as-text-muted)]">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-sm font-medium text-[var(--as-red)]">
          {error}
        </p>
      )}
    </div>
  );
}
```

## Search form behaviour

Create:

```txt
src/features/search/VenueSearchForm.tsx
```

## Rules

- Search field has a visible label.
- Location field has a visible label.
- Pressing Enter submits the form.
- Search button disables while loading.
- Empty search does not crash.
- Errors are inline.
- Result count updates politely with `aria-live`.

## Example search form

```tsx
<form
  role="search"
  aria-label="Search accessible venues"
  onSubmit={handleSubmit}
  className="grid gap-4 rounded-[var(--as-radius-xl)] border border-white/12 bg-white/8 p-4 md:grid-cols-[1fr_1fr_auto]"
>
  <TextInput
    name="query"
    label="Search"
    placeholder="Venue, café, museum, cinema…"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    autoComplete="off"
  />

  <TextInput
    name="location"
    label="Location"
    placeholder="Town, city, or postcode"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    autoComplete="postal-code"
  />

  <div className="flex items-end">
    <Button type="submit" isLoading={isSearching} className="w-full md:w-auto">
      Search venues
    </Button>
  </div>
</form>
```

## Result status

```tsx
<p role="status" aria-live="polite" className="text-sm text-white/70">
  {isSearching
    ? "Searching venues…"
    : `${filteredVenues.length} venues match your search.`}
</p>
```

## Acceptance criteria

- No input without a visible label.
- No placeholder-only fields.
- Search submits with Enter.
- Loading button cannot double-submit.
- Errors are connected to inputs.
- Result changes are announced politely.
- Empty states are clear and useful.

---

# 5. Rebuild the Venue Finder Interaction Layer

## Objective

Make Venue Finder feel like a proper product feature, not a prototype.

## Files to create or refactor

```txt
src/features/venues/VenueFinderPage.tsx
src/features/venues/VenueSearchForm.tsx
src/features/venues/AccessFilterGroup.tsx
src/features/venues/VenueMap.tsx
src/features/venues/VenueResults.tsx
src/features/venues/VenueCard.tsx
src/features/venues/VenueSkeleton.tsx
src/features/venues/EmptyResults.tsx
src/features/venues/MapFallback.tsx
```

## Layout structure

```tsx
<main id="main-content">
  <VenueFinderHero />

  <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[380px_1fr]">
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <VenueSearchForm />
      <AccessFilterGroup />
      <AiPlanningCard />
    </aside>

    <div className="space-y-6">
      <VenueMap />
      <VenueResults />
    </div>
  </section>
</main>
```

## Filter chips

Current filters include:

- Wheelchair access
- Accessible toilet
- Step-free entrance
- Parking
- Quiet space
- Hearing loop
- Assistance available

Each chip should be a real button.

```tsx
<button
  type="button"
  aria-pressed={selectedFilters.includes(filter.id)}
  data-selected={selectedFilters.includes(filter.id)}
  onClick={() => toggleFilter(filter.id)}
  className="min-h-11 rounded-full border border-white/14 px-4 text-sm font-semibold text-white data-[selected=true]:border-[var(--as-blue)] data-[selected=true]:bg-[var(--as-blue)]/18"
>
  {filter.label}
</button>
```

## Result cards

Repeated vague CTAs must become contextual.

```tsx
<Link
  href={`/venues/${venue.slug}`}
  aria-label={`View full details for ${venue.name}`}
>
  View details
</Link>

<Link
  href={`/venues/${venue.slug}#access-info`}
  aria-label={`View access information for ${venue.name}`}
>
  View access info
</Link>

<Button
  variant="secondary"
  onClick={() => selectVenueOnMap(venue.id)}
  aria-label={`Show ${venue.name} on the map`}
>
  Show on map
</Button>
```

## Access score

Do not show a floating score without context.

```tsx
<div aria-label={`Access score ${venue.score} percent`}>
  <span className="text-2xl font-bold">{venue.score}%</span>
  <span className="sr-only">access score</span>
</div>
```

## Map loading

```tsx
if (isLoading) {
  return <MapSkeleton message="Loading accessible venue map…" />;
}

if (error) {
  return (
    <MapFallback
      title="Map could not load"
      message="You can still browse all venue results below."
      action={<Button onClick={retry}>Try again</Button>}
    />
  );
}
```

## Use my location

Rules:

- Ask for location only after user clicks.
- Loading state: “Finding your location…”
- Error state: “Location access was blocked. Search by postcode instead.”
- Geolocation failure must not block browsing.

```tsx
<Button
  variant="secondary"
  isLoading={isLocating}
  onClick={handleUseLocation}
>
  Use my location
</Button>
```

## Empty result state

```tsx
<EmptyResults
  title="No venues match these filters"
  message="Remove a filter or search a wider area."
  actions={
    <>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button variant="secondary" onClick={resetSearch}>Reset search</Button>
    </>
  }
/>
```

## Fix result-count grammar

Use:

```ts
const venueLabel = count === 1 ? "venue" : "venues";
```

Then render:

```tsx
<p>{count} {venueLabel}</p>
```

## Acceptance criteria

- One search/filter panel.
- One map section.
- No duplicate filter list exposed.
- “Use my location” has loading/error/success states.
- Every repeated CTA has a contextual accessible name.
- Map failure does not block the page.
- Result count grammar is fixed.
- Search/filter/map/results feel connected.

---

# 6. Rebuild Help Cards Actions Properly

## Objective

Make Help Cards useful, trustworthy, and not repetitive for keyboard or screen-reader users.

## Files to create or refactor

```txt
src/features/help-cards/HelpCardsPage.tsx
src/features/help-cards/HelpCardGrid.tsx
src/features/help-cards/HelpCard.tsx
src/features/help-cards/HelpCardActions.tsx
src/features/help-cards/FeaturedHelpCard.tsx
src/features/help-cards/HelpCardPrintView.tsx
src/features/help-cards/useHelpCardDownload.ts
```

## Help Card action component

```tsx
export function HelpCardActions({ card }: { card: HelpCard }) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [saving, setSaving] = useState(false);

  async function copyKeyLine() {
    await navigator.clipboard.writeText(card.keyLine);
    setCopyState("copied");
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <ButtonLink
        href={`/help-cards/${card.slug}`}
        aria-label={`Open ${card.title}`}
      >
        Open card
      </ButtonLink>

      <Button
        variant="secondary"
        isLoading={saving}
        onClick={() => saveCard(card)}
        aria-label={`Save ${card.title} to phone`}
      >
        Save
      </Button>

      <Button
        variant="secondary"
        onClick={() => printCard(card)}
        aria-label={`Print ${card.title}`}
      >
        Print
      </Button>

      <Button
        variant="ghost"
        onClick={copyKeyLine}
        aria-label={`Copy key line from ${card.title}`}
      >
        {copyState === "copied" ? "Copied" : "Copy key line"}
      </Button>
    </div>
  );
}
```

## Action feedback

Add state feedback for:

| Action | Required behaviour |
|---|---|
| Save | “Saving…” → “Saved” or error |
| Print | Opens clean print flow |
| Copy | “Copied” for around 1.8 seconds |
| Tailor with AI | Loading/opening state, not silent failure |

## Print CSS

```css
@media print {
  body {
    background: white !important;
    color: black !important;
  }

  header,
  footer,
  nav,
  .no-print {
    display: none !important;
  }

  .print-card {
    break-inside: avoid;
    border: 1px solid #111;
    box-shadow: none !important;
  }
}
```

## Save to phone

Do not fake this.

Either implement actual image export or rename the action.

Possible tools:

- `html-to-image`
- `dom-to-image-more`
- Server-side image generation

The action should:

1. Render a clean card.
2. Export PNG.
3. Download with a clear filename.

Example filename:

```txt
access-stamp-job-interview-access-card.png
```

4. Show success or error.

## Acceptance criteria

- No repeated “Save” buttons without contextual `aria-label`.
- Copy key line works.
- Save has loading and error state.
- Print layout is clean.
- Help Card actions do not shift layout.
- Each card has one clear primary action.
- Tailor with AI does not silently fail.

---

# 7. Fix Advice Accordions and Dropdowns

## Objective

Remove empty or weak dropdowns and make advice pages actually useful.

## Files to create or update

```txt
src/components/ui/Accordion.tsx
src/features/advice/AdviceAccordionSection.tsx
```

## Accordion requirements

Each accordion item must have:

- Real button trigger
- `aria-expanded`
- `aria-controls`
- Keyboard support
- Visible focus state
- Useful content
- No empty panels

## Accordion pattern

```tsx
<button
  type="button"
  aria-expanded={isOpen}
  aria-controls={`panel-${id}`}
  id={`trigger-${id}`}
  onClick={() => setOpen(!isOpen)}
  className="flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-left font-semibold focus-visible:ring-4 focus-visible:ring-[var(--as-focus)]/40"
>
  {title}
  <ChevronDown
    aria-hidden="true"
    className={clsx("transition-transform", isOpen && "rotate-180")}
  />
</button>

<div
  id={`panel-${id}`}
  role="region"
  aria-labelledby={`trigger-${id}`}
  hidden={!isOpen}
>
  {children}
</div>
```

## Content rule

Each accordion panel should include:

- Plain-English explanation
- What to do next
- Example wording
- Evidence/checklist
- Related Help Card link where useful

## Acceptance criteria

- No empty dropdowns.
- Keyboard opens and closes panels.
- Panels do not cause major layout jump.
- Heading hierarchy remains logical.
- Advice content feels practical, not filler.

---

# 8. Fix Responsive Layout and Breakpoints

## Objective

Make the site hold up properly from small mobile to large desktop.

## Shared PageContainer

Create:

```tsx
export function PageContainer({ children, className }: Props) {
  return (
    <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
```

Use it everywhere.

Stop inventing new page widths on every section.

## Grid rules

### Homepage

```tsx
<section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
```

### Cards

```tsx
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
```

### Venue Finder

```tsx
<div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
```

### Help Cards

```tsx
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
```

## Prevent horizontal scroll

Add:

```css
html,
body {
  max-width: 100%;
  overflow-x: clip;
}

img,
svg,
video,
canvas {
  max-width: 100%;
}

* {
  min-width: 0;
}
```

This is a guardrail, not a substitute for fixing bad layout.

## Mobile CTA rows

Use:

```tsx
<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
```

Do not use this for unknown-width CTA rows on mobile:

```tsx
<div className="flex gap-3">
```

## Required viewport tests

Test at:

```txt
320px
360px
375px
390px
414px
430px
768px
1024px
1280px
1366px
1440px
1536px
1920px
```

Also test:

- 200% browser zoom
- 400% zoom/reflow
- Landscape mobile
- Reduced motion
- Light/dark mode if supported

## Acceptance criteria

- No horizontal scroll at 320px.
- Header works at 320px.
- Venue cards do not clip.
- Filter chips wrap or use an obvious horizontal scroller.
- Map does not break the page.
- CTAs stack cleanly on mobile.
- Text wraps naturally.
- Cards remain aligned.

---

# 9. Add Motion and Reduced-Motion Rules

## Objective

Make the site feel premium without annoying or overwhelming disabled users.

## File to create

```txt
src/styles/motion.css
```

## Motion tokens

```css
:root {
  --as-duration-fast: 120ms;
  --as-duration-base: 180ms;
  --as-duration-slow: 260ms;
  --as-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Reduced motion support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

## Transition rules

Use transitions for:

```css
transition-property: color, background-color, border-color, opacity, transform, box-shadow;
transition-duration: var(--as-duration-base);
transition-timing-function: var(--as-ease);
```

Avoid animating:

- height
- width
- left
- top
- margin
- padding

unless absolutely necessary.

## Timing guide

| Interaction | Duration |
|---|---|
| Button hover | 100–150ms |
| Chip selected | 100–180ms |
| Dropdown open | 150–220ms |
| Modal/drawer | 180–300ms |
| Page/section reveal | 200–300ms |

## Acceptance criteria

- Hover transitions feel quick.
- Dropdowns open within 150–220ms.
- No bouncing cards.
- Reduced motion removes non-essential movement.
- No core content depends on animation.
- No janky core interactions.

---

# 10. Add QA Tests and Acceptance Checks

## Objective

Stop relying on vibes. Add actual checks.

## Install if supported

```bash
npm install -D @playwright/test axe-core @axe-core/playwright
```

## Files to create

```txt
tests/accessibility.spec.ts
tests/keyboard.spec.ts
tests/responsive.spec.ts
```

## Keyboard focus test

```ts
import { test, expect } from "@playwright/test";

test("homepage has visible keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
});
```

## Venue search keyboard test

```ts
import { test, expect } from "@playwright/test";

test("venue search can be submitted by keyboard", async ({ page }) => {
  await page.goto("/venue-finder");

  await page.getByLabel(/search/i).fill("cafe");
  await page.getByLabel(/location/i).fill("Manchester");
  await page.keyboard.press("Enter");

  await expect(page.getByRole("status")).toContainText(/venues|searching/i);
});
```

## Axe accessibility test

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();

  const serious = results.violations.filter((v) =>
    ["critical", "serious"].includes(v.impact || "")
  );

  expect(serious).toEqual([]);
});
```

## Responsive overflow test

```ts
import { test, expect } from "@playwright/test";

const widths = [320, 375, 390, 768, 1024, 1440];

for (const width of widths) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/venue-finder");

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasOverflow).toBe(false);
  });
}
```

## QA tools

Use:

- Chrome DevTools
- Lighthouse
- axe DevTools
- WAVE
- Playwright
- Keyboard-only testing
- Real mobile device testing where possible

## Final acceptance criteria

The build is not done until the following are true:

- No P0 frontend issues.
- No P1 frontend issues.
- No invisible focus states.
- No duplicate hidden focusable controls.
- No placeholder-only form fields.
- No double-submit on async buttons.
- No accidental horizontal scrolling.
- No empty dropdowns.
- No fake Save, Print, Copy, or Tailor actions.
- No map failure that blocks browsing.
- No repeated vague CTA labels without context.
- No random one-off styling that should be a token.
- Reduced motion is supported.
- Site works with keyboard only.
- Site works at 320px width.

---

# Cursor Prompt

Copy this into Cursor.

```txt
Act as a senior frontend engineer and lead UI/UX developer. Refactor the Access Stamp website frontend so the site feels premium, practical, disability-led, accessible, and production-ready.

Do not just tweak random Tailwind classes. Build a proper UI interaction system and then apply it across the site.

Main goals:
1. Fix button and CTA functionality.
2. Fix form mechanics and input validation.
3. Fix responsive layout and breakpoint issues.
4. Enforce UI consistency and design-system discipline.
5. Fix micro-interactions, loading states, reduced-motion support, and keyboard accessibility.

Pages to prioritise:
- Homepage
- /venue-finder
- /help-cards
- /advice/reasonable-adjustments-at-work and other advice pages using the same template

Known problems to solve:
- Header/nav/search/menu content appears duplicated between desktop/mobile states. Make sure hidden mobile/desktop controls are not focusable and not exposed to screen readers.
- Homepage CTAs need clearer spacing, accessible naming, consistent button styling, and proper focus states.
- Venue Finder has duplicated filter/map/search areas, weak loading states, repeated filters, repeated vague CTAs, and result-count grammar issues such as “17 venue s”.
- Help Cards repeat vague actions like “Open card”, “Save”, and “Print” across many cards. Add contextual accessible labels and proper Save/Print/Copy/Tailor states.
- Advice page accordions/dropdowns must contain real useful content and proper keyboard behaviour.

Implementation requirements:

1. Create or refactor shared UI components:
- components/ui/Button.tsx
- components/ui/ButtonLink.tsx if needed
- components/ui/Spinner.tsx
- components/ui/TextInput.tsx
- components/ui/FormField.tsx
- components/ui/Accordion.tsx
- components/ui/Toast.tsx or StatusMessage.tsx
- components/ui/EmptyState.tsx
- components/ui/Skeleton.tsx
- components/layout/Header.tsx
- components/layout/MobileMenu.tsx
- components/layout/PageContainer.tsx

2. Button component:
- Variants: primary, secondary, ghost, outline, danger, chip.
- Sizes: sm, md, lg, icon.
- Minimum touch target: 44x44px for core controls.
- Support isLoading, disabled, leftIcon, rightIcon.
- Use visible focus rings with focus-visible.
- Use aria-busy when loading.
- Disabled/loading buttons must not double-submit.
- Active state should have subtle pressed feedback.
- Do not rely on colour alone.

3. Header/navigation:
- Desktop nav should be hidden on mobile with hidden lg:flex.
- Mobile nav should be hidden on desktop with lg:hidden.
- Closed mobile menu must not be keyboard focusable.
- Menu button must use aria-expanded and aria-controls.
- Escape must close mobile menu.
- Focus should return to menu button when closed.
- Current nav link should use aria-current="page".
- Remove duplicate exposed nav/search/menu content.

4. Forms:
- Build reusable TextInput/FormField components.
- Every input must have a visible label.
- Do not use placeholder as the only label.
- Use aria-invalid and aria-describedby for errors.
- Search forms must submit with Enter.
- Buttons must show loading states.
- Preserve user input on error.
- Add useful empty results state.
- Add role="status" aria-live="polite" for result counts and async state.

5. Venue Finder:
Create or refactor:
- features/venues/VenueFinderPage.tsx
- features/venues/VenueSearchForm.tsx
- features/venues/AccessFilterGroup.tsx
- features/venues/VenueMap.tsx
- features/venues/VenueResults.tsx
- features/venues/VenueCard.tsx
- features/venues/VenueSkeleton.tsx
- features/venues/EmptyResults.tsx
- features/venues/MapFallback.tsx

Venue Finder layout:
- Use a two-column layout on desktop: sidebar search/filter panel and main result/map area.
- Stack cleanly on mobile.
- Keep only one filter list exposed.
- Filter chips must be real buttons with aria-pressed.
- “Use my location” must have loading/error/success states.
- Geolocation failure must not block browsing.
- Map must have loading, error, and fallback states.
- Result cards must have contextual accessible labels:
  - “View full details for [venue name]”
  - “View access information for [venue name]”
  - “Show [venue name] on the map”
- Fix result-count grammar: “1 venue”, “17 venues”.
- Access score must have an accessible label like “Access score 98 percent”.

6. Help Cards:
Create or refactor:
- features/help-cards/HelpCardsPage.tsx
- features/help-cards/HelpCardGrid.tsx
- features/help-cards/HelpCard.tsx
- features/help-cards/HelpCardActions.tsx
- features/help-cards/FeaturedHelpCard.tsx
- features/help-cards/HelpCardPrintView.tsx
- features/help-cards/useHelpCardDownload.ts

Help Card behaviour:
- Every repeated action must have contextual accessible labels.
- “Open card” should be aria-label="Open [card title]".
- “Save” should be aria-label="Save [card title] to phone".
- “Print” should be aria-label="Print [card title]".
- “Copy key line” should copy the exact key line and show “Copied” for around 1.8 seconds.
- “Save to phone” must either actually export a clean PNG or be renamed. Do not fake functionality.
- Print view should hide nav/footer and print a clean card.
- Tailor with AI should show loading/opening state and not silently fail.

7. Advice accordions/dropdowns:
- Use real button triggers.
- Add aria-expanded and aria-controls.
- Use hidden or conditional rendering correctly.
- Keyboard users must be able to open/close.
- No empty accordion panels.
- Each panel should include practical content:
  - Explanation
  - What to do next
  - Example wording
  - Evidence/checklist
  - Related Help Card link where useful

8. Responsive layout:
- Create a shared PageContainer component.
- Use consistent max-width, padding, and grid rules.
- No accidental horizontal scroll at 320px, 375px, 390px, 768px, 1024px, 1440px.
- Card grids should use:
  - grid gap-4
  - sm:grid-cols-2
  - xl:grid-cols-3 where appropriate
- Venue Finder should use:
  - lg:grid-cols-[360px_minmax(0,1fr)]
- CTA rows should stack on mobile and wrap on larger screens.
- Avoid 100vw plus padding bugs.
- Add min-width: 0 where text/card overflow occurs.

9. Motion:
- Add motion tokens:
  - fast 120ms
  - base 180ms
  - slow 260ms
  - cubic-bezier(0.22, 1, 0.36, 1)
- Animate only transform, opacity, colour, border, background, and shadow.
- Do not animate height/width/top/left/margin unless unavoidable.
- Add prefers-reduced-motion support:
  - disable non-essential animation
  - disable smooth scrolling
  - keep state changes understandable

10. QA:
Add Playwright tests if the project supports it:
- Keyboard focus visible on homepage.
- Venue search submits with Enter.
- Mobile menu opens/closes with keyboard and Escape.
- No horizontal scroll at 320, 375, 390, 768, 1024, 1440.
- Help Card copy action changes text to Copied.
- Axe scan has no critical or serious issues.

Acceptance criteria:
- No P0/P1 frontend issues.
- No invisible focus states.
- No duplicate hidden focusable controls.
- No placeholder-only form fields.
- No double-submit on async buttons.
- No accidental horizontal scrolling.
- No empty dropdowns.
- No fake Save/Print/Copy/Tailor actions.
- Design feels consistent, premium, practical, trustworthy, modern, and disability-led.
```

---

# Final Build Standard

The site is only acceptable when it meets this standard:

> Access Stamp must not merely look accessible. It must behave accessibly.

If the frontend still has hidden focusable nav, broken loading states, fake save/print actions, empty dropdowns, or mobile overflow, the build is not finished.

The product promise is confidence. The frontend has to prove that promise in every click, tap, focus state, form field, card, filter, and loading state.
