# Access Stamp — Website Build Prompt

You are building the full website for **Access Stamp**, a UK-focused accessibility platform. This is not a wireframe or mockup — build a fully functional, production-ready website with real content structure, working navigation, and interactive components.

---

## What Access Stamp Is

Access Stamp is a practical resource platform for disabled people, wheelchair users, carers, older people, and families in the UK. It was created from lived experience by a wheelchair user. It is not a charity. It is not a corporate compliance tool. It is a serious, modern platform that treats disabled people as capable adults who need better information, not sympathy.

The platform has three core features at launch:

1. **Advice Hub** — comprehensive, plain-language guides covering rights, education, transport, workplace, care, equipment, and more
2. **Venue Finder** — detailed accessibility search for UK venues based on real, practical access features
3. **AI Assistant** — a chatbot and voice assistant that can answer questions, search venues, and guide users through the platform

---

## Brand & Design System

### Name
Access Stamp

### Logo
The logo is a stylised "A" mark in navy, blue, and amber. Use the logo image in the navbar, footer, and mission section. The logo represents a stamp of approval and verification.

### Colour Palette

| Role | Colour | Hex | Usage |
|------|--------|-----|-------|
| Primary dark | Deep navy | #0c1d34 | Headings, dark hero/CTA sections, footer |
| Primary action | Blue | #2478d0 | Buttons, links, active states, icon backgrounds |
| Secondary warm | Amber | #d4952a | Badges, tags, section labels, secondary buttons, warmth |
| Light amber | Light amber | #f0c86a | Accent highlights, italic emphasis text on dark backgrounds |
| Pale amber | Amber pale | #fdf4e3 | Amber badge backgrounds, warm card tints |
| Pale blue | Blue pale | #e6f0fb | Blue badge backgrounds, light icon containers |
| Background 1 | Warm off-white | #f6f4f1 | Primary page background |
| Background 2 | Warm light | #f0ede8 | Alternating section background |
| Cards | White | #ffffff | All card surfaces |
| Body text | Dark blue-grey | #2c3e54 | Body copy on light backgrounds |
| Heading text | Navy | #0c1d34 | All headings on light backgrounds |
| Muted text | Grey-blue | #5a6e82 | Secondary/muted text, timestamps, labels |
| Text on dark | White | #ffffff | Headings on dark backgrounds |
| Text on dark body | Light blue-grey | #c0d0e2 | Body text on dark backgrounds |
| Border | Warm grey | #ddd8d0 | Card borders, dividers |

**Rules:**
- No plain white (#ffffff) page backgrounds — always use #f6f4f1 or #f0ede8
- White is only for card surfaces
- Dark navy sections used sparingly for impact — hero, one mid-page section, final CTA
- Amber appears throughout as the warm accent — badges, labels, numbered steps, secondary CTAs
- Blue is the primary action colour — all main buttons, links, and interactive elements

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | DM Serif Display | Regular, Italic |
| Body / UI | Plus Jakarta Sans | 300–800 |

Import from Google Fonts:
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap
```

### Design Principles
- Clean, modern, premium startup feel
- Calm and trustworthy — not clinical, not charity, not corporate
- Strong spacing and visual hierarchy
- White cards with warm-toned borders on warm off-white backgrounds
- Rounded corners (border-radius: 16px for cards, 12px for buttons and inputs)
- Subtle shadows on cards (warm-toned, not harsh black)
- Mobile responsive — mobile-first approach
- Scroll-triggered fade-in animations on sections
- Accessible design — minimum WCAG 2.1 AA contrast, keyboard navigable, screen reader friendly

---

## Site Structure & Navigation

### Primary Navigation (navbar)
Sticky top navbar with logo, nav links, and CTA button.

**Visible links:** Home, Venue Finder, Advice Hub, AI Assistant, Blog, About

**"More" dropdown:** Education, Transport, Workplace, Travel, Directory, Glossary

**CTA button:** Start Searching

**Mobile:** Hamburger menu with full link list.

### Page Structure

```
/                       → Homepage
/venue-finder           → Venue search and results
/venue/[slug]           → Individual venue detail page
/advice                 → Advice hub landing page
/advice/rights          → Your Rights section (tabbed by category)
/advice/education       → Education guides
/advice/transport       → Transport guides
/advice/workplace       → Workplace guides
/advice/care            → Care & Support guides
/advice/equipment       → Equipment guidance
/advice/emergency       → Emergency & quick help
/advice/new-to-disability → Starting point for newly disabled people
/advice/[slug]          → Individual article page
/directory              → Contacts directory
/glossary               → Jargon buster / glossary
/blog                   → Blog listing
/blog/[slug]            → Individual blog post
/about                  → About Access Stamp
```

---

## Feature 1: Advice Hub

The advice hub is the content backbone of Access Stamp. It is organised by life area, with each area containing multiple articles/guides.

### Advice Hub Landing Page (/advice)

**Layout:**
- Hero section with title "Advice Hub" and subtitle: "Practical, plain-language guides on disability rights, equipment, care, education, transport, and more — all written from lived experience."
- Grid of category cards, each linking to their section:

**Categories:**

| Category | Route | Icon/Emoji | Description |
|----------|-------|------------|-------------|
| Your Rights | /advice/rights | ⚖️ | Benefits, legal protections, Equality Act, and what you're entitled to |
| Education | /advice/education | 🎓 | DSA, EHC plans, school and university support |
| Transport | /advice/transport | 🚂 | Trains, buses, driving, flying, taxis, scooter rules |
| Workplace | /advice/workplace | 💼 | Access to Work, adjustments, discrimination, returning to work |
| Care & Support | /advice/care | 🤝 | Personal budgets, hiring PAs, templates, managing care |
| Equipment | /advice/equipment | 🦽 | Wheelchairs, home equipment, vehicle adaptations, tech |
| Emergency & Quick Help | /advice/emergency | 🚨 | Wheelchair breakdown, helplines, NHS services, rights cards |
| New to Disability | /advice/new-to-disability | 🧭 | Starting point for newly disabled people and families |

Below the grid, include:
- Link to Directory (/directory)
- Link to Glossary (/glossary)
- "Or ask our AI" prompt linking to the AI assistant

### Category Section Pages (e.g. /advice/rights)

**Layout:**
- Section title and description
- For "Your Rights": tabbed interface with categories (Driving & Motoring, Home & Housing, Benefits & Finance, Legal Rights, NHS & Healthcare, Family & Parenting) — each tab shows a list of article links
- For other sections: list of article cards with title, short description, and tags

### Individual Article Page (/advice/[slug])

**Layout:**
- Breadcrumb: Home > Advice Hub > [Category] > [Article Title]
- Article title (H1, DM Serif Display)
- Last updated date
- Category badge and tags
- Table of contents (auto-generated from H2 subheadings)
- Article content — structured with H2 and H3 subheadings, paragraphs, bullet lists where needed, callout boxes for important notes/warnings
- "Related articles" section at the bottom
- "Was this helpful?" feedback prompt
- "Ask the AI about this topic" button
- Share and print/download buttons

**Content formatting:**
- Plain English throughout
- Jargon terms linked to the glossary on first use
- Callout boxes for:
  - ⚠️ Important warnings (e.g. manual handling safety)
  - 💡 Tips (community knowledge, life hacks)
  - 📞 Contact details (helplines, services)
  - 📋 Step-by-step processes (numbered, clear)

### Directory Page (/directory)

- Searchable/filterable list of contacts
- Categories: Wheelchair services by region, Local authority disability teams, PA agencies, PA payroll services, Equipment suppliers, Repair services, Legal advice, Support organisations
- Each listing: Name, what they do, coverage area, phone, website, notes

### Glossary Page (/glossary)

- Alphabetical list of disability-related terms and acronyms
- Each term: the acronym/term, full name, plain-language definition
- Search/filter bar at the top
- Terms link back to relevant advice hub articles

---

## Feature 2: Venue Finder

### Venue Search Page (/venue-finder)

**Search Interface:**
A prominent search panel at the top of the page with:

1. **Location input** — text field with placeholder "City, town, or postcode". Autocomplete if possible.
2. **Venue type dropdown** — options: Restaurant, Café, Hotel, Shopping, Arts & Culture, Leisure, Pub & Bar, Healthcare, Entertainment, Outdoor, Sports & Fitness
3. **Search button** — primary blue button
4. **Access filter chips** — toggleable filter buttons below the search bar:
   - Step-free entrance
   - Ramp access
   - Accessible toilet
   - Changing Places toilet
   - Automatic doors
   - Wide doorways (80cm+)
   - Turning space (150cm+)
   - Nearby Blue Badge parking
   - Lift access
   - Transfer-friendly seating
   - Space for carers
   - Powered wheelchair suitable
   - Quiet environment
   - Staff disability awareness
5. **"More filters" expandable** — additional criteria
6. **AI search bar** — "Or describe what you need…" text field that sends a natural language query to the AI assistant (e.g. "wheelchair-friendly pub in Liverpool with good parking and a Changing Places toilet")

**Results:**
- Displayed as a grid of venue cards below the search panel
- Each card shows:
  - Venue name
  - Location (city, postcode area)
  - Venue type badge
  - Accessibility score or rating (if available) — displayed as a star rating or numerical score
  - Top 3 access feature tags (e.g. "Step-free", "Parking", "Spacious")
  - Short practical summary (1–2 sentences)
  - Distance from search location (if location provided)
- Pagination or infinite scroll for results
- "No results" state with helpful suggestions (broaden search, try AI, suggest a venue)
- Sort options: relevance, distance, rating

### Venue Detail Page (/venue/[slug])

**Layout:**

**Header section:**
- Venue name (H1)
- Location, venue type badge, accessibility score
- Share, save, and "Report an issue" buttons

**Image gallery** (if images available, otherwise a styled placeholder with venue type emoji)

**Accessibility breakdown** — the core of the page. Structured as a clear, scannable panel:

| Area | Details to show |
|------|----------------|
| Entrance & Approach | Step-free? Ramp? Automatic doors? Door width? Surface type? Gradient? |
| Interior | Layout description, aisle width, turning space, floor surface, lighting, noise level |
| Toilets | Accessible toilet? Dimensions? Grab rails? Emergency cord? Changing Places? |
| Seating | Moveable chairs? Table heights? Wheelchair spaces? Companion seating? |
| Parking | Blue Badge spaces? How many? Distance? Surface? Drop kerb? |
| Staff | Disability awareness training? Assistance available? |
| Additional | Hearing loop? Visual aids? Quiet hours? Sensory considerations? |

Each row shows a feature name, a status indicator (✅ available, ❌ not available, ❓ unknown), and a short note where relevant.

**Practical summary** — a 2–3 sentence human-readable summary of the venue's accessibility (e.g. "Step-free entry through wide double doors. Spacious layout with good turning space. Accessible toilet on ground floor with grab rails and emergency cord. Two Blue Badge spaces within 30 metres.")

**User reviews section** (placeholder for Phase 2 — show "Reviews coming soon" with option to submit early feedback)

**"Ask the AI about this venue" button** — opens the chatbot with the venue context preloaded

**Map** showing venue location with nearby parking and public transport

**Contact details** — address, phone, website, opening hours

**"Suggest an update" button** — for users to report inaccuracies or provide additional information

### Submit a Venue Page

- Simple form for users to suggest a new venue for inclusion
- Fields: venue name, location, venue type, what access features they know about, any additional notes
- Optional: attach a photo

---

## Feature 3: AI Assistant

### Floating Chat Widget

A persistent floating button in the bottom-right corner of every page.

**Collapsed state:**
- Circular or rounded-square button (blue background, white bot icon)
- Amber notification dot (pulsing) to indicate the assistant is available
- On hover: subtle scale-up

**Expanded state (chat panel):**

**Header:**
- Dark navy gradient background
- Bot icon and "Access Stamp AI" title
- Online status indicator (green dot + "Online · Voice enabled")
- Close button (X)

**Message area:**
- Scrollable message history
- Bot messages: white card bubbles on left, with light border
- User messages: blue bubbles on right
- Typing indicator when AI is processing
- Messages can contain:
  - Plain text
  - Venue result cards (mini cards with name, location, key features)
  - Links to advice hub articles
  - Numbered step-by-step instructions
  - Callout boxes for warnings or important notes

**Quick actions:**
- Row of tappable chips below the messages, above the input
- Context-aware — different suggestions on different pages:
  - Homepage: "Find accessible venues", "Explain PIP", "Wheelchair services near me"
  - Venue finder: "Help me search", "What does step-free mean?", "Venues near me"
  - Advice article: "Summarise this article", "What should I do next?", "Related topics"
  - General: "I'm new to disability", "Help me find a PA", "What are my rights at work?"

**Input area:**
- Text input field with placeholder "Ask me anything…"
- Voice input button (microphone icon) on the left of the input
  - Tap to start listening — icon pulses red, visual feedback shown
  - Tap again to stop — speech converted to text in the input field
  - Voice indicator message shown: "Listening…"
- Send button (arrow icon) on the right

**Voice output (optional, toggleable):**
- When enabled, the AI reads its response aloud using speech synthesis
- Toggle in the chat header or settings
- Visual indicator (speaker icon / audio wave) when speaking

### AI Behaviour

The AI assistant uses the Access Stamp system prompt (provided separately as a complete document). Key behaviours:

**Venue search:**
- When a user asks about finding a venue, the AI searches the venue database
- It asks clarifying questions about specific access needs before searching
- It presents results as mini venue cards within the chat
- It can explain what specific features mean (e.g. "Wide doorways means at least 80cm clear width")

**Advice and rights:**
- The AI can answer questions about any topic covered in the advice hub
- It references specific legislation, schemes, and processes
- It links to relevant advice hub articles for full details
- It includes appropriate disclaimers (not medical advice, not legal advice, suggest professional support where needed)

**Equipment and mobility:**
- Practical guidance on wheelchairs, transfers, equipment selection
- Community knowledge and life hacks
- Safety warnings for manual handling with disclaimer
- Step-by-step numbered instructions for physical techniques

**Emotional awareness:**
- Acknowledges frustration and difficulty before jumping to practical advice
- If someone appears to be in crisis, gently suggests Samaritans (116 123) or Crisis Text Line (text SHOUT to 85258)
- Never dismissive, never patronising

**Voice interactions:**
- Shorter responses — 2–3 sentences per chunk
- Asks "Would you like more detail?" rather than delivering everything at once
- Spells out acronyms on first use
- Offers to send a written summary to chat history

### AI Integration Points

The AI assistant should be contextually aware of where the user is on the site:

| Page | AI context |
|------|-----------|
| Homepage | General welcome, broad suggestions |
| Venue finder | Venue search mode — ask about location and access needs |
| Venue detail page | Knows which venue the user is viewing, can answer questions about it |
| Advice article | Knows which article the user is reading, can summarise or explain further |
| Rights section | Rights-focused — can help with specific entitlements |
| Care section | Care-focused — can help with budgets, PAs, applications |
| Directory | Can help find specific contacts |
| Glossary | Can explain terms in more detail |

---

## Homepage

The homepage ties everything together. It should include the following sections in order:

1. **Hero** (dark navy background) — headline "Find venues that actually work for your access needs", subtitle, and the venue search interface with access filter chips. Include an AI hint at the bottom of the search card.

2. **New to Disability** — white card on warm background with amber border. Starting point for newly disabled people. Quick-link grid to key topics. "Where to begin" and "Ask the AI" buttons.

3. **Platform Pillars** — "Everything in one place" section. Grid of 9 cards covering Venue Finder, AI Assistant, Equipment, Rights, Care, Education, Transport, Workplace, Blog. AI Assistant card should be visually highlighted (amber border/ring).

4. **Featured Venues** — 3 sample venue cards showing what real listings look like, with "Search all venues" link.

5. **AI Assistant Showcase** — split section: left side explains the AI chatbot and voice assistant with three feature cards (Chatbot, Voice, Trained on real detail). Right side shows a chat preview mockup with realistic conversation.

6. **Education Section** — two white cards side by side: guide list and DSA quick guide.

7. **Transport Section** — 6 cards for different transport types.

8. **Workplace Section** (dark navy background) — 6 cards for workplace rights topics.

9. **Equipment Section** — split layout: guide list left, 4 emoji quick-link cards right.

10. **Your Rights** — tabbed interface showing rights categories with article lists.

11. **Care & Support** — 4 cards for care topics.

12. **Emergency & Quick Help** — white card with 4 sub-cards for urgent contacts.

13. **Blog Preview** — 3 recent posts (blog and video).

14. **Directory & Glossary** — two white cards side by side.

15. **Community Coming Soon** — teaser card.

16. **Newsletter Signup** — email capture with amber subscribe button.

17. **Mission** — "Built from real experience" with logo and three values.

18. **Final CTA** (dark navy background) — "Your access needs, taken seriously" with Search, Chat with AI, and Explore buttons.

19. **Footer** — logo, description, link columns (Platform, Life Areas, Content), legal links, "Built with ❤️ from lived experience".

---

## Technical Requirements

- **Framework:** React with Tailwind CSS
- **Routing:** React Router or Next.js for page navigation
- **Content management:** Headless CMS (Sanity, Strapi, or Contentful) for advice hub articles and blog posts — content should be editable without code changes
- **Database:** PostgreSQL or equivalent for venue listings, user accounts, reviews
- **AI integration:** LLM API (e.g. Claude or GPT) with retrieval-augmented generation (RAG) over advice hub content and venue data. System prompt provided separately.
- **Voice:** Web Speech API for speech-to-text input. Optional speech synthesis for AI responses.
- **Search:** Full-text search across advice hub articles and venue listings
- **Authentication:** User accounts for saving venues, submitting reviews (Phase 2), and community (Phase 3)
- **Responsive:** Mobile-first design, fully functional on all screen sizes
- **Accessibility:** WCAG 2.1 AA minimum. Keyboard navigation, screen reader compatibility, sufficient colour contrast, focus indicators, alt text, ARIA labels where needed.
- **Performance:** Fast load times, lazy loading for images, code splitting for routes
- **SEO:** Server-side rendering or static generation for advice hub articles. Schema markup for articles, FAQs, and venue listings. Each article is a standalone indexable page targeting long-tail searches.

---

## Content Tone Reminders

- Clear, confident, practical
- Written from lived experience — first person where appropriate
- Trustworthy but warm
- Never clinical, never charity-style, never patronising
- No inspiration language ("brave", "inspiring", "overcoming")
- Use "wheelchair user" not "wheelchair-bound"
- Use "disabled person" not "person with disabilities" (UK social model preference)
- Jargon explained on first use, linked to glossary
- Complex processes broken into numbered steps
- Honest about system failures and frustrations
