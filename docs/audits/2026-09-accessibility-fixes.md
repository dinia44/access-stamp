# September 2026 accessibility audit fixes

## Implemented

- One structured source for Harbour Kitchen's example measurements: entrance 92cm (matching the existing photo caption and illustration), toilet door 80cm. These are demonstration values, not real-world measurements.
- Doorway calculations evaluate each opening, include a 5cm planning allowance, flag insufficient toilet clearance and avoid whole-venue suitability claims. Unknown measurements do not fall back to positive feature flags.
- Missing feature keys become explicitly unknown; result cards, summary counts, next steps and the breakdown use the same completed feature data.
- Demo reports do not assign real confidence, audit dates or confirmed status. AI fit planning from demo evidence is replaced by routes to questions and a fresh plan based on user-confirmed information. Demo context is included in chat and saved-plan summaries.
- Search normalises accents in both queries and indexed fields. Town/outward-postcode searches remain local and never silently fall back to another town. Full postcodes and coordinate searches use an explicitly labelled 25km radius.
- Report links preserve query, location, filters, sort, view, pagination and the originating card anchor. Return URLs are restricted to the local finder route.
- Filters use a native modal dialog with initial focus, background inertness, Escape, a visible close action, restored trigger focus and restored page scrolling.
- Contact fields can hold an official website, telephone and full address with a checked date and source. No contact details are invented for demo venues; missing details are explicit beside planning advice.
- Newsletter helper text has stronger contrast. Homepage fit copy is limited to the measured openings. Repeated result links identify their venue. Finder scrolling and fit animations respect reduced motion.
- The older AI page no longer claims access to verified venue audits or guaranteed current eligibility logic.
- Results precede the optional map on narrow screens.

## Automated checks

- `npm run test:audit`: regression cases for the 78cm chair/80cm toilet, clearance boundaries, unknown measurements, shared data, unknown counts, accented search, geographic containment, state round-tripping and return URL validation.
- `npm run build`: production compilation, TypeScript, venue-data validation and help-card validation.
- Changed TypeScript/React files: ESLint.
- `tests/accessibility-audit.spec.ts`: desktop and 390px modal keyboard focus, horizontal overflow, search-to-report-to-search state, and demo doorway evidence.

The local browser suite could not launch because Chromium was absent and its download returned an invalid archive. The browser tests are included in the existing GitHub Actions suite. A production build and unit checks do not replace those checks.

## Still requires evidence or manual review

- Verify real venue contact details and measurements before promoting any listing out of demo status.
- Run the browser suite, inspect the 390px layout, and review the preview before merging.
- Check with NVDA/VoiceOver, zoom and reflow, and reduced-motion settings. This change does not constitute full WCAG 2.2 AA certification.
- Test the under-one-minute venue decision with disabled users, including assistive-input users.
