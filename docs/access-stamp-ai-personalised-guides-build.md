# Access Stamp — AI Personalised Guidance Builder
## Cursor-Ready Build Instructions

**Project:** Access Stamp  
**Feature:** Ask Access Stamp / Personalised Guidance Builder  
**Status:** Build specification  
**Primary route:** `/ask`  
**Secondary route:** `/my-guide/[id]` for saved guides later  

---

# 1. Objective

Build a new **Ask Access Stamp** experience that lets a user describe a real accessibility problem in their own words and receive a structured, personalised action guide.

The AI must **not replace the existing Access Stamp guides**.

The existing guides remain the trusted content library and source of truth. The new AI layer should:

1. understand what the user is trying to do;
2. identify the most relevant existing Access Stamp guides and tools;
3. retrieve the relevant approved content;
4. assemble that information into a personalised step-by-step plan;
5. clearly show which Access Stamp guides were used;
6. identify gaps or uncertainty instead of inventing information;
7. offer relevant next actions such as a letter template, checklist, Venue Finder search or Access Profile update.

The product should feel like **Access Stamp helping the user navigate a situation**, not like a generic chatbot.

---

# 2. Product principle

Use this model throughout the implementation:

```text
EXISTING ACCESS STAMP GUIDES
Trusted / reviewed information
          ↓
STRUCTURED ACCESS STAMP DATA
Venue data, measurements, tools, templates, access profiles
          ↓
AI PERSONALISATION LAYER
Finds, combines, explains and adapts relevant information
          ↓
PERSONALISED ACTION GUIDE
Practical next steps for the user's situation
```

The AI should not behave as an unrestricted answer generator.

It should behave as an **orchestration and personalisation layer over trusted Access Stamp information**.

---

# 3. Do not remove the current guides

Keep the existing guide library and guide URLs intact.

The Resources / Guides area should offer two clear paths:

## Path A — Ask Access Stamp

Primary card:

> **Tell us what you need**  
> Describe your situation and Access Stamp will build a practical guide using our trusted information and tools.

CTA:

**Build my guide**

Route:

`/ask`

## Path B — Browse guides

Keep the existing categories and guides for users who already know what information they want.

Example categories:

- Employment
- Travel
- Social care
- Benefits
- Equipment
- Rights
- Venue access
- Education

Do not make the AI the only way to access information.

---

# 4. Navigation change

Add a prominent navigation item:

**Ask Access Stamp**

Recommended desktop navigation:

```text
Access Stamp

Find a venue
Guides
Ask Access Stamp
For venues
Partners
About
```

`Ask Access Stamp` should feel important, but it should not visually overpower `Find a venue` if venue access remains the main product proposition.

On mobile, include it as a first-level menu item rather than burying it inside Resources.

---

# 5. `/ask` page layout

Create a premium, calm, accessibility-first page inspired by the approved prototype.

Do **not** copy the prototype as a rigid three-column dashboard on small screens. The desktop layout may use three columns, but mobile must become a simple vertical flow.

## Hero

### Heading

**Ask Access Stamp**

### Subheading

**Get a personalised guide for your situation.**

### Supporting copy

> Tell us what you're trying to do and we'll build a practical step-by-step guide using trusted Access Stamp information, tools and venue data.

Optional supporting label:

> Trusted information. Tailored to you.

Avoid phrases such as:

- AI expert
- instant legal advice
- disability expert AI
- guaranteed answer

The user should understand that AI is being used, but the brand promise should remain centred on useful accessibility guidance.

---

# 6. Input panel

Desktop: left-hand column.  
Mobile: first content section under the hero.

## Section 1 — Tell us what you need

Large textarea.

Placeholder examples can rotate between:

> I'm starting a new job and the office is upstairs. I use a wheelchair and can't access the stairs. What should I do?

> I'm taking my mum to a restaurant and need to know what accessibility information to check first.

> My university has changed my classroom and the new room isn't accessible. What should I ask for?

Label:

**Describe your situation in your own words**

Character guidance:

- minimum useful input: approximately 20 characters
- recommended maximum: 1,500 characters
- do not make users complete a huge form before asking a question

## Section 2 — Optional context

Keep this progressive and optional.

Fields:

### This is mainly about

Dropdown or accessible combobox:

- Employment / work
- Travel
- Venues
- Education
- Social care
- Benefits
- Equipment
- Housing
- Transport
- Something else

### My access needs include

Multi-select chips or checkboxes. Examples:

- Wheelchair access
- Step-free access
- Accessible toilet
- Mobility equipment
- Hearing access
- Visual access
- Sensory access
- Communication support
- Personal assistance / carer support
- I prefer not to say

Do not require the user to label themselves with a diagnosis.

### Where are you?

Only ask jurisdiction when it materially changes the answer.

Example:

- England
- Scotland
- Wales
- Northern Ireland
- Outside the UK

Do not request a precise address here.

### Anything else we should know?

Optional textarea.

---

# 7. Primary CTA

Button:

**Build my guide**

Optional icon:

small sparkle / Access Stamp assistant mark.

Button should be full width inside the input card on mobile.

Do not use:

- Ask AI
- Generate answer
- Submit prompt

Those phrases make the experience feel generic.

---

# 8. Loading state

The loading state should reinforce what the product is doing.

Example sequence:

```text
Understanding your situation…
Finding relevant Access Stamp guides…
Checking useful tools and templates…
Building your action plan…
```

Do not show fake percentages.

Use a skeleton for the guide cards so the page does not jump dramatically when the response loads.

---

# 9. Personalised guide output

Desktop: central column.  
Mobile: immediately underneath the input form.

The response should **not** appear as one long AI chat bubble.

Render it as a structured Access Stamp guide.

## Guide header

Example:

**Your Access Stamp guide**

Supporting text:

> A personalised plan based on your situation.

Actions:

- Save
- Copy link / Share
- Download later
- Start again

For MVP, `Save` can require sign-in or remain disabled until saved guides are implemented.

---

# 10. Required guide sections

The AI response should normally populate these structured sections when relevant.

## 1. What this means

A concise explanation of the situation.

Do not overstate legal or medical certainty.

Example:

> Based on what you've described, the inaccessible upstairs workspace may create a barrier to doing your job. Relevant Access Stamp guidance includes reasonable adjustments and accessible workplace planning.

## 2. Your options

Present concrete options as cards or checklist rows.

Examples:

- ask for an accessible workstation;
- move team meetings to an accessible room;
- consider hybrid or remote working where appropriate;
- request access equipment or building changes;
- agree an interim arrangement while a longer-term solution is assessed.

Do not present these as guaranteed entitlements unless the underlying approved content supports that statement.

## 3. What to do next

Use a numbered sequence.

Example:

1. Write down the barrier you are experiencing.
2. Identify the adjustment that would remove or reduce it.
3. Contact the appropriate person.
4. Keep a written record.
5. Review the response and decide whether further support is needed.

## 4. Use this tool / template

When relevant, surface an existing Access Stamp tool.

Examples:

- adjustment request template;
- workplace checklist;
- venue checklist;
- benefits preparation list;
- travel planning checklist;
- help card;
- Doorway / Fit Checker;
- Venue Finder.

Do not make the AI rewrite every tool from scratch if a reviewed Access Stamp tool already exists.

## 5. What Access Stamp could not confirm

This is important.

If relevant information is missing, explicitly show an uncertainty panel.

Example:

> **We couldn't confirm:** whether your employer has already assessed alternative rooms. That may affect which next step is most useful.

This should be a normal product behaviour, not an error state.

---

# 11. Source panel — “Based on these Access Stamp guides”

Desktop: right column.  
Mobile: beneath the main guide.

This panel is mandatory when the generated guide uses internal content.

Example:

### Based on these Access Stamp guides

**Reasonable Adjustments**  
Your rights and how to ask

**Accessible Workplaces**  
Planning an accessible working environment

**Talking to Your Employer**  
Practical communication tips and templates

**Equality Act 2010**  
Plain-English Access Stamp guidance

Each item must link to the original guide.

Add:

**View all related guides →**

This preserves the value of the existing guide library and makes the AI response auditable.

---

# 12. Related tools panel

Display tools only when they are genuinely relevant.

Example:

### Related tools

- My Access Profile
- Letter templates
- Workplace checklist
- Venue Finder

Do not show every Access Stamp tool on every answer.

---

# 13. Follow-up questions

Under the response, allow:

**Ask a follow-up question**

Examples:

> What if they say no?

> Can you help me write the email?

> What should I take to the meeting?

The follow-up should retain the current personalised guide context.

However, do not turn the entire page into a standard chat interface.

The guide remains the primary artifact.

Follow-up responses should update or append relevant sections of the guide where possible.

---

# 14. Existing guide content model

Do not scrape rendered guide pages every time a user asks a question.

Create or normalise a structured source-of-truth for guide content.

Recommended TypeScript model:

```ts
export type AccessStampGuide = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  jurisdiction?: 'england' | 'scotland' | 'wales' | 'northern-ireland' | 'uk' | 'general';
  tags: string[];
  reviewedAt: string;
  reviewedBy?: string;
  reviewStatus: 'reviewed' | 'draft' | 'archived';
  sensitivity?: 'general' | 'legal' | 'benefits' | 'health' | 'safeguarding';
  sections: Array<{
    id: string;
    heading: string;
    body: string;
  }>;
  sourceLinks?: Array<{
    label: string;
    url: string;
  }>;
};
```

Only `reviewed` content should be eligible as a trusted AI source by default.

---

# 15. Retrieval architecture

Use retrieval rather than dumping every guide into the model context.

Recommended flow:

```text
User request
   ↓
Intent + topic classification
   ↓
Retrieve likely relevant Access Stamp guides
   ↓
Filter by jurisdiction / status / sensitivity
   ↓
Select relevant sections
   ↓
Generate structured guide
   ↓
Validate source IDs and response schema
   ↓
Render Access Stamp UI components
```

For the first version, retrieval does not need to be overly sophisticated.

A reliable hybrid approach is enough:

- guide categories;
- guide tags;
- keyword search;
- optional embeddings / semantic search.

Do not build a complex vector database before the guide library is large enough to justify it.

---

# 16. AI response schema

Do not ask the model to return arbitrary Markdown.

Require structured JSON and render it using normal React components.

Example schema:

```ts
export type PersonalisedGuideResponse = {
  title: string;
  summary: string;
  topic: string;
  jurisdiction?: string;
  confidence: 'high' | 'medium' | 'limited';

  sections: Array<{
    type:
      | 'meaning'
      | 'options'
      | 'next_steps'
      | 'template'
      | 'checklist'
      | 'warning'
      | 'unknowns';
    heading: string;
    content?: string;
    items?: string[];
  }>;

  guideSources: Array<{
    guideId: string;
    sectionIds: string[];
  }>;

  relatedToolIds: string[];

  suggestedFollowUps: string[];

  missingInformation?: string[];
};
```

Validate the result server-side before displaying it.

If the model references a guide ID that does not exist, remove it and log the failure.

---

# 17. API route

Recommended endpoint:

`POST /api/guide/generate`

Input example:

```json
{
  "situation": "I'm starting a new job and the team is upstairs but I use a wheelchair.",
  "topic": "employment",
  "accessNeeds": ["wheelchair-access", "step-free"],
  "jurisdiction": "england",
  "additionalContext": "I haven't started yet."
}
```

Server responsibilities:

1. validate and sanitise input;
2. identify relevant guide content;
3. prepare the grounded model context;
4. request a structured response;
5. validate returned JSON;
6. attach only valid guide references;
7. return the result;
8. record anonymised product analytics.

Never expose model API keys to the browser.

---

# 18. AI system behaviour

The system prompt should enforce these principles:

```text
You are the personalisation layer for Access Stamp.

Use the supplied Access Stamp content as your primary source.
Do not invent Access Stamp policies, venue measurements, legal rights or factual claims.

When the supplied material does not support a confident answer:
- say what is unknown;
- ask a useful follow-up question where appropriate;
- direct the user to an authoritative external source where configured.

Prioritise practical next steps.
Use plain English.
Avoid patronising or inspirational language.
Never assume a person's capabilities from a diagnosis or disability label.
Do not declare a venue universally accessible.
Do not give a guarantee of a legal, benefits, medical or safeguarding outcome.
Return only the required structured response schema.
```

---

# 19. High-risk guidance

Some current or future Access Stamp topics may involve:

- legal rights;
- welfare benefits;
- health;
- safeguarding;
- employment disputes;
- social-care decisions.

Treat these differently from general planning advice.

For higher-risk topics:

1. prioritise reviewed Access Stamp content;
2. surface original/source links where available;
3. include jurisdiction clearly;
4. show the guide review/update date;
5. avoid absolute outcomes;
6. provide appropriate specialist routes when configured;
7. log which guide version informed the response.

Do not hide behind a huge generic disclaimer.

Build trust through visible sources and uncertainty instead.

---

# 20. Access Profile integration

Do not make this mandatory for MVP, but prepare the architecture for it.

Future users should be able to save reusable access preferences such as:

```ts
export type AccessProfile = {
  mobilityEquipment?: Array<{
    type: string;
    name?: string;
    widthMm?: number;
    lengthMm?: number;
  }>;

  requirements: string[];

  preferences?: {
    stepFree?: boolean;
    accessibleToilet?: boolean;
    transferSide?: 'left' | 'right' | 'either';
    hearingSupport?: boolean;
    companionSpace?: boolean;
  };
};
```

The user must control whether profile information is used in a personalised guide.

Never insert sensitive profile information into a guide unnecessarily.

---

# 21. Venue integration

Where a user's question concerns visiting a place, the personalised guide should be able to surface the Venue Finder.

Example:

> **Find venues that match this plan**

The user can then carry relevant access requirements into Venue Finder filters.

Future example:

```text
User asks:
"I need somewhere for lunch with my mum. She uses a walker and needs a step-free toilet."

Personalised guide identifies:
- step-free route
- suitable seating
- toilet access
- parking / drop-off

CTA:
Show venues matching these needs
```

Do not fabricate venue matches if Access Stamp does not have enough verified data.

---

# 22. Suggested React component structure

Recommended components:

```text
app/
  ask/
    page.tsx

components/
  ask/
    AskHero.tsx
    SituationForm.tsx
    TopicSelector.tsx
    AccessNeedsSelector.tsx
    GuideLoadingState.tsx
    PersonalisedGuide.tsx
    GuideSection.tsx
    GuideSources.tsx
    RelatedTools.tsx
    GuideUnknowns.tsx
    FollowUpBox.tsx
    PrivacyNote.tsx
```

Server-side:

```text
app/
  api/
    guide/
      generate/
        route.ts

lib/
  guides/
    retrieveGuides.ts
    guideIndex.ts
    validateGuideSources.ts

  ai/
    generatePersonalisedGuide.ts
    schemas.ts
    prompts.ts
```

Reuse the existing Access Stamp design system and UI primitives wherever possible.

Do not introduce a second design language just for the AI feature.

---

# 23. Desktop layout

At approximately 1280px and above:

```text
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
└─────────────────────────────────────────────────────────────┘

┌───────────────┬──────────────────────────┬─────────────────┐
│               │                          │                 │
│ Your          │ Personalised             │ Guide sources   │
│ situation     │ Access Stamp guide       │                 │
│               │                          │ Related tools   │
│ form          │                          │                 │
│               │                          │ Follow-up       │
│               │                          │                 │
└───────────────┴──────────────────────────┴─────────────────┘
```

Recommended approximate widths:

- form: 27%
- guide: 48%
- supporting rail: 25%

Use generous gutters.

The output guide should be visually dominant.

---

# 24. Mobile layout

Do not squeeze three desktop columns into mobile.

Order:

```text
Hero
↓
Situation form
↓
Build my guide
↓
Personalised guide
↓
Unknowns / important notes
↓
Sources
↓
Related tools
↓
Follow-up
```

Use sticky actions sparingly.

Never make the input textarea or generated guide horizontally scroll.

---

# 25. Visual direction

Follow the existing Access Stamp brand.

Desired feeling:

- premium;
- practical;
- calm;
- credible;
- disability-led;
- modern;
- clean;
- human.

Avoid:

- glowing AI gradients everywhere;
- robot illustrations;
- chatbot bubbles as the primary UI;
- purple-blue generic SaaS styling disconnected from Access Stamp;
- excessive sparkle icons;
- huge glassmorphism cards;
- inaccessible low-contrast pastel text;
- dense government-form styling.

AI should feel integrated rather than bolted on.

---

# 26. Accessibility requirements

This feature must be especially strong on accessibility.

At minimum:

- WCAG 2.2 AA colour contrast;
- full keyboard navigation;
- visible focus state;
- correct form labels;
- clear validation messages;
- no placeholder-only form labels;
- loading states announced with `aria-live`;
- generated content headings in logical order;
- expandable sections usable by keyboard;
- no information communicated only by colour;
- minimum comfortable touch targets;
- reduced-motion preference respected;
- screen-reader-friendly source links;
- generated lists use semantic HTML;
- user input is retained if generation fails.

Do not auto-focus generated content in a way that unexpectedly moves screen-reader or keyboard users around the page.

After successful generation, provide a polite live-region announcement such as:

> Your personalised Access Stamp guide is ready.

---

# 27. Error and low-confidence states

Design these deliberately.

## AI request failure

Show:

> **We couldn't build your guide just now.**  
> Your information is still here. Please try again.

Never wipe the form.

## Insufficient Access Stamp content

Show:

> **We don't have enough reviewed Access Stamp information to answer this confidently yet.**

Then offer:

- relevant existing guides;
- useful external sources if configured;
- ability to rephrase or add detail.

## Ambiguous situation

Rather than inventing assumptions, ask one focused question.

Example:

> Which part of the UK are you in? The rules referred to in this guide can differ by nation.

---

# 28. Privacy copy

Under the form include a concise privacy message.

Example:

> **Your information is used to build this guide.** Avoid sharing information you don't need us to know. Read our Privacy Policy.

Do not claim information is “private” or “never stored” unless the actual system implementation supports that statement.

Define the data retention behaviour before changing this language.

---

# 29. Analytics

Add analytics from day one because this feature can become strong evidence for funders and product decisions.

Recommended events:

```text
ask_page_viewed
ask_guide_started
ask_topic_selected
ask_access_need_selected
ask_guide_generated
ask_generation_failed
ask_source_opened
ask_tool_opened
ask_followup_started
ask_followup_completed
ask_guide_shared
ask_guide_saved
ask_guide_feedback_positive
ask_guide_feedback_negative
```

Useful aggregate product questions:

- What situations are people asking about most?
- Which existing guides are most frequently used by the AI?
- Which questions cannot yet be answered from reviewed content?
- Which generated guides lead people into Venue Finder?
- Which tools are opened after guidance?
- Where does the existing guide library have obvious gaps?

Do not store unnecessary raw sensitive prompt content purely for analytics.

---

# 30. Feedback

At the bottom of generated guides:

> **Was this useful?**

Buttons:

- Yes
- Not quite
If `Not quite`, optionally offer:

- It missed something
- The information wasn't clear
- It didn't answer my question
- Something seems incorrect
- Other

This can become an important QA signal.

---

# 31. Existing Guides page changes

Do not redesign the whole guide system simply to launch this feature.

Add a new hero or prominent card above the guide categories:

```text
────────────────────────────────────────────
ASK ACCESS STAMP

Not sure which guide you need?
Tell us what you're trying to do and we'll
build a practical guide around your situation.

[ Build my guide ]
────────────────────────────────────────────

OR BROWSE GUIDES

Employment   Travel   Equipment   ...
```

This should make AI additive rather than destructive.

---

# 32. Homepage integration

Do not add another enormous homepage section.

Use a compact pathway after the primary Venue Finder / core product story.

Example:

### Need help with something else?

**Tell Access Stamp what's happening.**  
Get a practical guide built around your situation using our trusted accessibility information.

**Ask Access Stamp →**

This should be secondary to the homepage's main venue proposition.

---

# 33. MVP scope

Build the first version deliberately small.

## MVP must include

- `/ask` page;
- situation input;
- optional topic;
- optional access needs;
- jurisdiction where relevant;
- retrieval from reviewed Access Stamp guides;
- structured guide output;
- source guide panel;
- related tools;
- uncertainty / unknowns section;
- one follow-up interaction;
- analytics;
- useful failure states;
- desktop and mobile layouts;
- accessibility QA.

## MVP does not need

- voice assistant;
- persistent user memory;
- complex accounts;
- saved guide history;
- downloadable PDF;
- complex vector database;
- autonomous web browsing;
- automatic email sending;
- fully conversational chat history;
- AI-generated venue accessibility claims.

Keep the first release focused.

---

# 34. Phase 2

After real usage data:

- save personalised guides;
- connect My Access Profile;
- carry access requirements into Venue Finder;
- generate or pre-fill Access Stamp letter templates;
- richer follow-up questions;
- shareable guide links;
- PDF export;
- authenticated guide history;
- version history when an underlying guide changes.

---

# 35. Phase 3

Only after the text experience is proven:

- optional voice input;
- optional spoken output;
- conversational voice guidance;
- cross-feature assistant capable of opening Venue Finder filters and relevant planning tools;
- user-controlled persistent preferences.

Do not start with expensive real-time voice infrastructure before the underlying guidance workflow is proven useful.

---

# 36. Quality control / editorial workflow

The AI feature creates a new reason to improve the guide content system.

Every trusted guide should eventually expose:

- title;
- category;
- jurisdiction;
- review status;
- reviewed date;
- next review date where useful;
- source links;
- content owner / reviewer where appropriate;
- sensitivity level;
- structured sections;
- tags.

Create an internal admin or content workflow later for identifying:

- frequently used guides;
- outdated guides;
- AI questions with no suitable source;
- user feedback indicating unclear guidance.

The AI should help reveal content gaps, not hide them.

---

# 37. Example full interaction

## User input

> I'm starting a new job and my employer says I have to work upstairs because that's where my team sits. I use a wheelchair and can't access the stairs. What can I do?

## Access Stamp detects

```text
Topic: Employment
Need: wheelchair / step-free access
Jurisdiction: England
Likely relevant sources:
- Reasonable Adjustments
- Accessible Workplaces
- Talking to Your Employer
- Equality Act guidance
```

## Generated page

### Your Access Stamp guide

#### 1. What this means

Explain the potential workplace access barrier using only supported reviewed content.

#### 2. Options worth discussing

- accessible workstation;
- accessible meeting location;
- remote/hybrid arrangement where suitable;
- equipment or access alterations;
- interim alternative arrangement.

#### 3. What to do next

Numbered practical steps.

#### 4. Useful template

Surface the approved Access Stamp adjustment request template.

#### We couldn't confirm

Any situation-specific information Access Stamp does not know.

### Based on these guides

Display source guide cards.

### Related tools

Display relevant Access Stamp tools.

### Ask a follow-up

User asks:

> Can you help me write the email?

The AI uses the current guide context plus the approved template structure to produce an editable draft.

---

# 38. Acceptance criteria

The feature is ready for release only when all of the following are true:

- [ ] Existing guide pages remain available.
- [ ] `/ask` is reachable from primary navigation and Resources.
- [ ] Users can enter a plain-English situation without filling in unnecessary fields.
- [ ] AI responses are rendered as structured guide components rather than raw chat text.
- [ ] Every internal guide source shown to the user links to a real Access Stamp guide.
- [ ] The model cannot cite nonexistent guide IDs without being caught by server validation.
- [ ] The system clearly shows important unknowns.
- [ ] The system handles empty / poor retrieval without hallucinating a confident answer.
- [ ] Jurisdiction is included where it affects the guidance.
- [ ] Failed AI requests do not delete user input.
- [ ] Mobile UI is a proper single-column layout.
- [ ] Keyboard-only navigation works.
- [ ] Screen-reader labels and live status messages are implemented.
- [ ] Analytics fire without collecting unnecessary sensitive data.
- [ ] Existing visual design tokens are reused.
- [ ] The feature does not claim to replace professional legal, medical or other specialist services.

---

# 39. Final implementation instruction to Cursor

Implement this as an **extension of the existing Access Stamp product**, not a new standalone AI application.

Before changing code:

1. inspect the current repository structure;
2. identify the existing design system, components, typography, spacing and colour tokens;
3. identify the current guide routes and guide data source;
4. reuse existing components wherever possible;
5. do not delete, rename or break existing guide URLs;
6. do not invent guide content during the UI build;
7. build the personalised guide using the structured architecture above;
8. keep the AI provider behind a server-side abstraction so it can be replaced without rewriting the UI;
9. keep costs measurable by logging model usage and limiting retrieved context;
10. prioritise accessibility, evidence visibility and useful uncertainty over flashy AI behaviour.

The final feature should make users feel:

> **Access Stamp understood what I was trying to do, found the right trusted information, and turned it into something useful for my situation.**

It should **not** feel like:

> **Access Stamp added a chatbot.**

---

# 40. Recommended build order

Execute in this order:

### Sprint 1 — Foundation

- normalise existing guide data;
- add review status / metadata;
- create guide retrieval utility;
- create AI response schema;
- create server-side generation endpoint.

### Sprint 2 — `/ask` interface

- hero;
- form;
- loading state;
- personalised guide renderer;
- sources panel;
- related tools;
- error / unknown states.

### Sprint 3 — Integration

- navigation link;
- Guides page entry point;
- homepage pathway;
- related Access Stamp tools;
- follow-up question flow.

### Sprint 4 — QA

- accessibility testing;
- prompt injection / source-grounding checks;
- mobile testing;
- source validation;
- analytics validation;
- failure handling;
- editorial review.

### Sprint 5 — Real user pilot

Release to a small group and specifically test:

- whether people understand what to type;
- whether the generated guide is genuinely more useful than browsing manually;
- whether source links build trust;
- where Access Stamp lacks content;
- which guide sections users actually act on.

Use those results before investing in saved profiles, voice or more expensive AI functionality.