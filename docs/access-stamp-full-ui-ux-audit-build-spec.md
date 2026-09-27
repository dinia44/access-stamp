# Access Stamp — Full UI/UX Audit & Build Specification

**Project:** Access Stamp  
**Goal:** Consolidate the current product, improve trust and clarity, reduce duplication, and sharpen the main user journeys.  
**Rule:** Do not redesign Access Stamp from scratch. Improve the existing product by making it shorter, clearer, more consistent and more task-focused.

---

## 1. Executive summary

Access Stamp is now much stronger than earlier versions. The venue-access proposition is clearer, the evidence/unknowns philosophy is strong, the methodology is unusually detailed, and the product contains several genuinely useful tools.

The main problem is no longer lack of features. It is that **too many features are competing for attention**.

A new user should not have to understand the difference between Venue Finder, Guides, Help Cards, Planning Tools, AI Toolkit, Access Needs Profiler, Article Companion, Venue Question Generator, Venue Fit Planner and the Doorway/Fit Checker before they can get help.

The next version should feel like the same product with **roughly 30% less interface**, not a larger product with more added.

The clearest overall mental model is:

> **Places. Guidance. Venue services.**

---

# 2. Core product model

## Find a place

Primary product: **Find a venue**

Supporting features:

- search
- map
- access filters
- venue reports
- measurements
- photographs
- visible unknowns
- check against my needs

## Get guidance

Primary product: **Ask Access Stamp**

Supporting features:

- personalised guides
- existing trusted Guides
- Help Cards
- templates
- specialist tools
- Directory
- Glossary

## Improve a venue

Primary product: **For venues**

Supporting features:

- review packages
- venue submission
- methodology
- corrections
- partnership/pilot services

---

# 3. Recommended global navigation

```text
Access Stamp

Find a venue
Ask Access Stamp
Resources ▾
    Guides
    Help Cards
    Tools
    Directory
    Glossary
For venues
About
```

### Rules

- `Find a venue` remains the core venue-access action.
- `Ask Access Stamp` becomes the main personalised-guidance route.
- Guides, Help Cards and Tools should not compete as equal top-level products.
- Group lower-priority information under `Resources`.
- Keep `For venues` and `About` visible.
- On mobile, keep `Find a venue` and `Ask Access Stamp` easy to reach.
- Remove legacy top-level labels such as `Advice` and `AI Tools`.

---

# 4. Terminology standard

Use terminology consistently across the whole site.

## Preferred wording

- Guides
- Ask Access Stamp
- Tools
- Submit your venue
- Venue review
- On-site verified
- Reviewed remotely
- Submitted / not independently verified
- Demo
- Find venues that may work for your needs
- Check this venue against my needs
- Evidence completeness
- Verification strength
- Evidence recency

## Avoid

- Advice
- AI Toolkit as the main user-facing label
- certification / certified
- wheelchair-friendly
- fully accessible
- universally accessible
- accessible venue as a blanket claim
- audited measurements on demo data
- find accessible places

Use one public contact domain consistently:

`hello@accessstamp.co.uk`

---

# 5. Homepage

The current homepage opening is one of the stronger parts of Access Stamp. Keep the core hero and venue-search proposition.

## Recommended flow

```text
Hero
↓
Venue Finder
↓
How Access Stamp works
↓
One strong example venue report
↓
Check against my needs
↓
Ask Access Stamp
↓
Why trust Access Stamp?
↓
Founder strip
↓
For venues
↓
Newsletter / footer
```

## How Access Stamp works

Use three short steps:

1. **Search** — Find a venue or place.
2. **Check the evidence** — See measurements, photos, verification and unknowns.
3. **Compare it with your needs** — Work out whether it is likely to work for you.

## Reduce demo listings

Do not show multiple equal-weight demo venue cards as though they represent coverage.

Use one excellent example and clearly label it:

> **Example Access Stamp venue report**

## Add Ask Access Stamp

After the main venue pathway:

### Need help with something else?

**Tell Access Stamp what's happening.**

Get a practical guide built around your situation using trusted Access Stamp information.

**Ask Access Stamp →**

Then a quieter:

**Browse guides →**

## Trust section

Keep it short:

- measured details
- evidence labels
- visible unknowns
- lived experience

## Founder strip

Use:

- real founder photo
- Allister Diniz
- one concrete quote
- link to About

Avoid inspirational disability framing.

---

# 6. Venue Finder

The Venue Finder should be more task-focused.

## Demo framing

Do not say:

> Venues across the UK — 17 venues shown

if those records are demonstrations.

Use:

### Explore the Access Stamp venue experience

17 demonstration listings showing how detailed venue access information works.

When real data is added, separate:

- **Verified & reviewed venues**
- **Product examples**

## Results views

Use one switch:

```text
Grid | List | Map
```

Do not put the map in a separate section much further down the page.

## Regroup filters

### Getting in

- step-free entrance
- doorway width
- ramp
- threshold
- automatic door

### Moving around

- lift
- turning space
- internal route
- seating space
- wheelchair seating

### Toilets

- accessible toilet
- Changing Places
- transfer space
- transfer side
- toilet doorway

### Arrival

- Blue Badge parking
- drop-off
- surface
- distance from parking

### Sensory

- quiet area
- noise
- lighting
- crowd levels

### Communication

- hearing loop
- signage
- visual information

### Assistance

- staff assistance
- PA / companion space
- assistance dog information

## AI placement

Do not add a large generic AI section underneath results.

Use a small helper near filters:

> **Not sure which filters matter? Tell Access Stamp what you need →**

## Save feature

Either implement Save properly or remove Save messaging until it exists.

Do not advertise unavailable functionality.

## Reduce content after results

After the results, keep only:

- pagination / continuation
- map view
- compact venue-owner CTA

Do not turn the second half into a feature showcase.

---

# 7. Venue report pages

Venue reports should answer the user's decision first and show evidence second.

## Recommended hierarchy

```text
Venue name
Category · Location
Verification status
Checked date

Does this look suitable for your needs?

Looks promising
Check before travelling
Not available

[ Check against my needs ]

Measurements

Photos

Detailed access information

Questions / visit planning

Evidence / methodology

Corrections
```

## Summary groups

### Looks promising

Examples:

- step-free entrance
- 90 cm entrance width
- accessible toilet

### Check before travelling

Examples:

- lift access unknown
- quiet environment unknown
- staff support unknown

### Not available

Examples:

- Changing Places
- automatic doors

## Move personalised fit higher

Order:

1. summary
2. check against my needs
3. measurements
4. photos
5. full access detail

## Merge overlapping fit products

Replace separate `Will it fit?`, `Venue Fit Planner` and `AI venue fit planner` experiences with:

# Check this venue against my needs

Possible inputs:

- wheelchair width
- equipment dimensions
- step-free requirement
- toilet requirement
- transfer side
- parking/drop-off
- quiet environment
- support / PA space

Deterministic data should calculate what it can. AI should explain the result.

## Remove duplicate access summaries

Do not list the same confirmed/unavailable/unknown information twice.

Top = decision summary.  
Lower section = detailed evidence.

---

# 8. Demo venue trust rules

This is a P0 issue.

## Never recommend a demo venue

Do not use phrases such as:

> one of the stronger wheelchair-friendly options

on a demo/unverified listing.

Use neutral demonstration copy only.

## Verification wording must reflect state

### Demo

**Example measurements**

### Submitted

**Venue-supplied measurements**

### Remote review

**Reviewed measurements**

### On-site review

**Measured by Access Stamp**

Do not display `audited measurements` unless the record genuinely supports that claim.

This should be derived from the data model, not written independently in components.

---

# 9. Remove generic accessibility scoring

Remove the universal weighted score model such as:

- Entrance 25%
- Inside 25%
- Toilets 25%
- Parking/support 25%

It conflicts with the stronger principle already used elsewhere:

> **No single access score.**

Replace with:

### Evidence completeness

How much useful information is available.

### Verification strength

How reliable the source is.

### Evidence recency

How recently the information was checked.

### Personal fit

Whether the venue appears to meet the individual user's stated needs.

---

# 10. Methodology page

Keep the detailed methodology, but add a simple explanation at the top.

# How Access Stamp information works

### 1. We record what is known

Measurements, features, photographs and evidence.

### 2. We show where it came from

Users should know whether information was submitted, reviewed or measured.

### 3. We show what is unknown

Unknown does not mean inaccessible. It means there is not enough evidence.

### 4. We date the evidence

Venue accessibility information can change.

### 5. You decide whether it meets your needs

Access Stamp should not declare a venue universally accessible.

CTA:

**Read the full methodology ↓**

## Public verification labels

Simplify to:

- On-site verified
- Reviewed remotely
- Submitted / not independently verified
- Demo

Keep more detailed internal states if needed.

---

# 11. Guides hub

Keep the guide quality signals, review dates and official sources.

Simplify top-level categories.

## Money & rights

Benefits, Equality Act, complaints and entitlements.

## Work & education

Employment, university, school and reasonable adjustments.

## Care & support

Social care, carers, PAs and assessments.

## Equipment & home

Wheelchairs, equipment, technology and adaptations.

## Travel & transport

Cars, trains, flying, hotels and public transport.

## Everyday disability

New to disability, sport, emergency planning and everyday support.

Detailed tags can remain underneath.

---

# 12. Individual guide template

The current guide pages are over-engineered.

Use one clear document structure.

```text
Title

Summary

Reviewed date · Jurisdiction · Reading time

[ Listen ]

At a glance

On this page

Start here

Step-by-step guide

Evidence / what helps

Templates

If things go wrong

Official sources

Make this guide personal

Related guides
```

## At a glance

Use only one.

Maximum around five key points.

## Navigation

Use one navigation system.

Remove overlapping combinations of:

- Start Guide
- jump selector
- On this page button group
- numbered step buttons
- progress navigation

One sticky `On this page` control is enough.

## Start here

Use three immediate actions.

## AI inside guides

Do not repeat AI prompts throughout the page.

Use one main module:

### Make this guide personal

> Tell Access Stamp what is happening and we'll turn this guide into a practical plan for your situation.

**Personalise this guide**

## Unfinished controls

Remove any `Download not available yet` or similar unfinished UI until the feature exists.

---

# 13. Ask Access Stamp

This should become the main AI guidance experience.

The user should not need to select the right AI product first.

## Main flow

```text
Tell us what's happening
↓
Identify topic
↓
Find relevant reviewed Access Stamp guides
↓
Retrieve useful sections
↓
Combine tools/templates
↓
Build a personalised action guide
↓
Show sources and unknowns
↓
Allow follow-up
```

## Keep specialist tools

Keep them under:

**More tools**

Rename them by outcome:

- **Build my access profile**
- **Make this guide personal**
- **Build my evidence checklist**
- **Draft a letter**
- **Questions to ask a venue**
- **Check a venue against my needs**

Avoid technical product names where a task-based label is clearer.

---

# 14. AI privacy UX

Use concise privacy messaging:

> **Avoid sharing information we don't need to know.** Read our Privacy Policy.

Do not make every AI interaction begin with an intimidating block of warnings.

Use stronger disclosures only when truly necessary.

Never claim data is private, never stored or anonymous unless the implementation guarantees it.

---

# 15. For Venues

Simplify the page around four questions.

## What will my venue get?

Examples:

- public access listing
- measurements
- photographs
- access summary
- report depending on tier
- recommendations depending on tier

## What do you check?

Entrance, routes, toilets, arrival, seating, communication, sensory information and assistance.

## Which review do I need?

Use a comparison table.

| Feature | Snapshot | Measured Review | Full Review |
|---|---:|---:|---:|
| Public listing | ✓ | ✓ | ✓ |
| On-site visit | ✓ | ✓ | ✓ |
| Core measurements | ✓ | ✓ | ✓ |
| Detailed measurements | — | ✓ | ✓ |
| PDF report | — | ✓ | ✓ |
| Staff guidance | — | ✓ | ✓ |
| Re-check | — | — | ✓ |
| Training | — | — | ✓ |

## What happens next?

```text
Book
↓
Review
↓
Draft
↓
Confirm
↓
Publish
```

Deeper commercial information and FAQs can sit below.

---

# 16. Submit Venue

This is a P0 consistency fix.

## Update navigation

Remove old labels such as:

- Advice
- AI Tools

Use the current global navigation.

## Remove certification language

Do not describe Access Stamp reviews as certification.

Use:

- venue review
- access report
- verified information
- on-site review

## Standardise contact details

Use:

`hello@accessstamp.co.uk`

Remove mixed domain references.

## Simplify form purpose

The page should clearly say:

> **Submit a venue for Access Stamp review.**

Collect:

- venue name
- location
- contact information
- why it is being submitted
- whether submitter owns/manages it
- optional accessibility context

Explain next steps clearly.

---

# 17. About

Cut the page by roughly 50–60%.

Move overlapping content to the correct pages.

## New structure

### What Access Stamp is

Short explanation.

### Why it exists

The problem with vague access claims.

### Founder — Allister Diniz

Add a real founder photograph.

Use one concrete story.

### How our approach is different

- measurements
- evidence
- unknowns
- personal fit
- disability-led development

### What we're building

Short product direction.

### Learn more

Links to:

- methodology
- accessibility
- venue reviews
- contact

Avoid duplicating commercial statistics, full methodology and AI tool descriptions here.

---

# 18. Help Cards

Do not rely on a loading state as the visible main experience.

Show useful server-rendered content immediately:

- Popular Help Cards
- Browse by situation
- Recently updated

Then layer search/filtering on top.

---

# 19. Directory

Improve category navigation.

Suggested groups:

- urgent help
- rights & benefits
- care & support
- mobility & equipment
- sensory support
- carers
- transport
- employment & education

Fix copy such as:

> Missing a service? Suggest a venue...

to:

> **Missing a service or organisation? Suggest it to Access Stamp.**

Make phone numbers tappable on mobile.

---

# 20. Blog

Do not prioritise major blog redesign work now.

Maintain visual consistency.

Use the blog more strategically later when venue data and traction are stronger.

---

# 21. Accessibility Statement

Keep the current strong approach.

After `/ask` launches, test and document:

- `/ask`
- generated guides
- AI loading states
- error states
- keyboard use
- screen-reader announcements
- reduced motion

Publish a new review date after significant UI changes.

---

# 22. Public verification model

Recommended user-facing states:

## On-site verified

Access Stamp visited and checked the venue.

## Reviewed remotely

Access Stamp reviewed available evidence without a full on-site review.

## Submitted / not independently verified

Information was supplied but not yet independently checked.

## Demo

Example data used to demonstrate product behaviour.

---

# 23. Evidence language in code

Derive evidence copy from verification state.

Example:

```ts
type VerificationState =
  | 'demo'
  | 'submitted'
  | 'remote_review'
  | 'on_site_verified';
```

Then map labels:

```text
demo -> Example measurements
submitted -> Venue-supplied measurements
remote_review -> Reviewed measurements
on_site_verified -> Measured by Access Stamp
```

Do not hard-code trust wording independently across components.

---

# 24. Resources page

Create one coherent Resources destination.

```text
Resources

Ask Access Stamp
Not sure where to start?

Browse

Guides
Detailed step-by-step guidance

Help Cards
Short practical responses

Tools
Templates, checklists and planners

Directory
Useful organisations and services

Glossary
Plain-English terms
```

---

# 25. Visual design principles

Keep the existing Access Stamp design system.

Desired feel:

- premium
- practical
- calm
- credible
- disability-led
- modern
- evidence-based
- human

Avoid:

- charity-coded design
- government portal styling
- generic SaaS card overload
- glowing AI gradients
- robot illustrations
- chatbot-first layouts
- excessive nested cards
- decorative sections without a user task

---

# 26. Page-length rule

Before adding a section, ask:

> **Does this content belong on this page, or is it explaining another part of Access Stamp?**

Move content instead of repeating it.

Examples:

- commercial statistics → For Venues
- methodology → Methodology
- AI capabilities → Ask Access Stamp / Tools
- accessibility compliance → Accessibility Statement
- founder story → About
- fit explanation → venue reports

Do not restart the full Access Stamp story on every page.

---

# 27. Primary goal per page

Each page should have one main job.

| Page | Primary goal |
|---|---|
| Homepage | Understand Access Stamp and start a task |
| Venue Finder | Find a venue that may meet my needs |
| Venue page | Decide whether this venue looks suitable |
| Guide | Understand what to do next |
| Ask Access Stamp | Turn my situation into a practical plan |
| For Venues | Understand the service and choose a review |
| Submit Venue | Submit venue information |
| About | Understand why Access Stamp exists and who is behind it |

If a section does not support the primary goal, move or remove it.

---

# 28. Mobile rules

For every updated page:

- use single-column layouts where appropriate
- do not squeeze desktop columns into mobile
- avoid horizontal scrolling
- keep normal body-text sizes
- use comfortable tap targets
- collapse filters cleanly
- keep primary CTA obvious
- move side rails underneath content
- avoid multiple floating actions
- use sticky UI sparingly
- preserve logical heading order

---

# 29. Accessibility requirements

Maintain WCAG 2.2 AA as the minimum.

For every change:

- keyboard navigation
- clear visible focus
- logical heading hierarchy
- semantic lists/buttons
- no colour-only meaning
- sufficient contrast
- reduced motion support
- labels for all inputs
- clear validation
- live announcements where appropriate
- screen-reader friendly filters
- comfortable touch targets
- preserve user input after errors
- avoid unexpected focus movement

---

# 30. Analytics

Track real product journeys.

Recommended events:

```text
venue_search
venue_filter_used
venue_result_viewed
venue_map_opened
venue_fit_started
venue_fit_completed

ask_started
ask_guide_generated
ask_source_opened
ask_tool_opened
ask_followup_started

guide_opened
guide_personalise_clicked

venue_submit_started
venue_submit_completed

for_venues_enquiry_started
for_venues_enquiry_completed
```

Use analytics to answer:

- Which filters matter most?
- Which venue details are most often unknown?
- Which guides are most useful?
- Which questions lead users into Ask Access Stamp?
- Which tools are actually used?
- Where do users drop out?

Do not retain unnecessary sensitive prompt content for analytics.

---

# 31. Priority list

## P0 — Fix before heavy promotion

1. Update Submit Venue design and terminology.
2. Remove certification wording.
3. Fix `.com` / `.co.uk` inconsistencies.
4. Remove demo venue recommendation language.
5. Remove `audited measurements` from demo/unverified data.
6. Resolve Save messaging vs unavailable Save feature.
7. Remove generic weighted accessibility scoring.
8. Remove unfinished UI controls.
9. Standardise verification labels.
10. Standardise Guides / Resources / Tools terminology.

## P1 — Major UX consolidation

1. Simplify navigation.
2. Make Ask Access Stamp the main guidance entry.
3. Simplify Venue Finder.
4. Create Grid / List / Map result modes.
5. Regroup filters.
6. Simplify guide templates.
7. Remove duplicate guide navigation.
8. Merge venue-fit tools.
9. Move personalised fit higher on venue pages.
10. Simplify venue summaries.

## P2 — Page polish

1. Cut About page.
2. Simplify For Venues.
3. Use review comparison table.
4. Improve Help Cards browsing.
5. Improve Directory browsing.
6. Add Methodology summary.
7. Create clearer Resources architecture.
8. Add founder image and stronger founder section.

## P3 — Later

1. Real Save functionality.
2. Persistent Access Profile.
3. Saved personalised guides.
4. richer fit logic.
5. council / partner pilot pages.
6. deeper blog/SEO strategy.

---

# 32. Recommended implementation order

## Sprint 1 — Trust and consistency

- fix Submit Venue
- fix contact domain
- remove certification wording
- fix demo copy
- fix verification wording
- remove unsupported Save copy
- remove unfinished UI
- remove scoring conflict
- standardise terminology

## Sprint 2 — Information architecture

- simplify header
- create Resources grouping
- promote Ask Access Stamp
- update mobile navigation
- standardise CTA labels

## Sprint 3 — Venue journey

- simplify Venue Finder
- add Grid / List / Map
- regroup filters
- improve demo framing
- simplify venue reports
- move personalised fit higher
- merge fit tools
- remove duplicated summaries

## Sprint 4 — Guidance journey

- simplify guide template
- remove duplicated At a glance
- use one navigation system
- remove repeated AI modules
- add one Make this guide personal section
- finish Ask Access Stamp integration

## Sprint 5 — Venue business journey

- simplify For Venues
- build review comparison table
- streamline enquiry
- align Submit Venue
- remove certification wording globally

## Sprint 6 — Brand and trust pages

- shorten About
- add founder image
- add Methodology summary
- improve Resources
- improve Help Cards
- improve Directory

## Sprint 7 — QA

- desktop review
- 390px mobile review
- keyboard-only testing
- screen-reader testing
- contrast testing
- reduced-motion testing
- terminology sweep
- broken-link sweep
- analytics validation
- live Vercel verification

---

# 33. Acceptance criteria

- [ ] Top-level navigation has a clear hierarchy.
- [ ] Ask Access Stamp is the main personalised-guidance entry.
- [ ] Guides, Help Cards and Tools remain available without competing as separate products.
- [ ] Demo listings cannot be mistaken for verified traction.
- [ ] Demo listings never use audited/verified wording.
- [ ] No venue is described as universally accessible.
- [ ] Generic accessibility scoring is removed.
- [ ] Venue reports lead with decision-making rather than data dumping.
- [ ] Fit/doorway/AI venue tools are consolidated.
- [ ] Venue Finder has grouped filters.
- [ ] Grid/List/Map are one results system.
- [ ] Save is either functional or not advertised.
- [ ] Guides use one navigation system.
- [ ] Guides contain one At a glance section.
- [ ] AI is not repeatedly inserted through guide content.
- [ ] Submit Venue uses current design and terminology.
- [ ] Certification wording is removed.
- [ ] Email/domain usage is consistent.
- [ ] About is substantially shorter.
- [ ] For Venues uses a comparison table.
- [ ] Methodology starts with a plain-English summary.
- [ ] Help Cards remain useful before client-side search completes.
- [ ] Directory categories are clearer.
- [ ] `/ask` is covered by accessibility testing.
- [ ] Mobile pages are purpose-built rather than compressed desktop layouts.
- [ ] Terminology is consistent across all routes.

---

# 34. Final product principle

Before adding anything new, ask:

> **Can somebody arrive with a disability-related problem and understand their next action without first understanding Access Stamp's product architecture?**

If the answer is no, simplify.

The next Access Stamp build should not feel like a larger product.

It should feel like a **more confident product**.

> **Less interface. Clearer evidence. Better decisions.**
