/**
 * Seeds for advice categories that previously had no (or almost no) articles.
 * Rendered into ADVICE_ARTICLES in mock-data.ts with the standard section template.
 */
export const ADVICE_EXTRA_SEEDS = [
  // --- Transport ---
  {
    slug: "trains-and-passenger-assistance",
    title: "Trains and Passenger Assist: booking, turning up, and when things go wrong",
    categorySlug: "transport" as const,
    tags: ["Trains", "Passenger Assist", "Rail"],
    intro:
      "Passenger Assist can help with boarding, ramps, and station changes, but quality varies. The useful habit is to book when you can, arrive with time, know your rights on turn-up-and-go routes, and keep a record when assistance fails.",
    steps: [
      "Check whether your journey is covered by turn-up-and-go or requires booking (rules differ between operators).",
      "Arrive with enough time for ramps, lifts, and platform changes — tight connections are where assistance breaks.",
      "Confirm how staff will meet you: station meeting point, platform, or onboard.",
      "If assistance fails, note times, staff names, photos of information screens, and ask for a complaint reference.",
    ],
  },
  {
    slug: "buses-and-local-access",
    title: "Buses: ramps, space, and challenging unsafe drivers",
    categorySlug: "transport" as const,
    tags: ["Buses", "Wheelchairs", "Local travel"],
    intro:
      "Bus access depends on working ramps, clear wheelchair space, and drivers following rules. When space is refused incorrectly, you may need clear wording and a complaint route.",
    steps: [
      "Position for the ramp zone — drivers should kneel the bus and deploy the ramp when needed.",
      "If the wheelchair space is occupied by a buggy, policy depends on priority rules — ask calmly and request next steps.",
      "If you are refused for a non-valid reason, note route, time, fleet number, and registration.",
      "Report through the operator and escalate to the Traffic Commissioner if needed.",
    ],
  },
  {
    slug: "driving-parking-enforcement-basics",
    title: "Driving, Blue Badge parking, and enforcement disputes",
    categorySlug: "transport" as const,
    tags: ["Driving", "Blue Badge", "Parking"],
    intro:
      "Blue Badge rules are local as well as national. Misuse penalties are serious, but disabled people also get wrongly ticketed when bays are poorly marked or apps misread plates.",
    steps: [
      "Check local badge rules for kerbs, loading bays, and resident zones.",
      "Keep the badge visible correctly and match the badge holder rules.",
      "Photograph unclear signage, bay markings, and meters if you appeal a ticket.",
      "Appeal promptly in writing with evidence — many PCNs are overturned on review.",
    ],
  },
  {
    slug: "taxis-and-private-hire-wheelchairs",
    title: "Taxis and private hire: wheelchair access and refusals",
    categorySlug: "transport" as const,
    tags: ["Taxis", "Wheelchairs", "Equality Act"],
    intro:
      "Licensed taxis and designated private hire vehicles have duties around wheelchair users. Refusals can be unlawful — documentation and calm reporting matter.",
    steps: [
      "Know whether your vehicle class is covered by duties in your area.",
      "If refused, note vehicle plate, time, location, and reason given.",
      "Report to the licensing council — patterns matter.",
      "If unsafe or urgent, use alternatives (another operator) while you escalate.",
    ],
  },
  {
    slug: "flying-with-a-wheelchair-uk",
    title: "Flying with a wheelchair: airlines, batteries, and damage claims",
    categorySlug: "transport" as const,
    tags: ["Flying", "Air travel", "Wheelchairs"],
    intro:
      "Air travel adds airline rules on batteries, aisle chairs, and assistance timing. Damage to chairs is a known failure mode — reduce risk with photos, labels, and immediate reporting.",
    steps: [
      "Tell the airline early about powered chairs, batteries, dimensions, and wet-cell rules.",
      "Arrive with spare supplies if allowed and keep essentials in cabin baggage.",
      "Take photos of the chair before handover and inspect immediately on arrival.",
      "Report damage before leaving the airport where possible and keep all paperwork.",
    ],
  },
  {
    slug: "mobility-scooters-on-buses-and-trains",
    title: "Mobility scooters on buses and trains: permits, size classes, and planning",
    categorySlug: "transport" as const,
    tags: ["Scooters", "Buses", "Trains"],
    intro:
      "Operators often classify scooters and require permits or measurements. Turning circle, weight, and battery type can decide whether travel is allowed.",
    steps: [
      "Check operator scooter policies before buying or planning trips.",
      "Ask for assessment or permit schemes where required.",
      "Avoid peak crush times if you can — boarding space disappears fast.",
      "Have a backup plan if a route cannot take your scooter class.",
    ],
  },

  // --- Workplace ---
  {
    slug: "access-to-work-basics",
    title: "Access to Work: what it can pay for and how to apply",
    categorySlug: "workplace" as const,
    tags: ["Access to Work", "Work", "Funding"],
    intro:
      "Access to Work can fund specialist equipment, support workers, travel to work, mental health coaching, and communication support. It is about removing barriers at work, not replacing employers’ reasonable adjustments.",
    steps: [
      "Gather job description, barriers, and what you already tried.",
      "Apply early — delays happen.",
      "Be specific in assessments: tasks, pain, fatigue, communication needs.",
      "Keep copies of recommendations and employer confirmations.",
    ],
  },
  {
    slug: "reasonable-adjustments-you-can-ask-for",
    title: "Reasonable adjustments at work: examples that actually happen",
    categorySlug: "workplace" as const,
    tags: ["Equality Act", "Adjustments", "Work"],
    intro:
      "Adjustments can include equipment, flexible hours, remote work, breaks, accessible software, quiet space, redeployment, and communication changes. What is reasonable depends on effectiveness, cost, and practicality.",
    steps: [
      "Explain the barrier and the adjustment as a pair — not just diagnosis.",
      "Ask for a trial period with review dates.",
      "Put requests in writing and keep meeting notes.",
      "Involve Occupational Health where helpful — but remember OH advises, employers decide.",
    ],
  },
  {
    slug: "disability-discrimination-and-grievances",
    title: "Discrimination at work: grievances and early steps",
    categorySlug: "workplace" as const,
    tags: ["Discrimination", "Grievance", "Work"],
    intro:
      "Early documentation improves outcomes. Many situations mix capability processes with disability issues — separate facts, dates, and witnesses.",
    steps: [
      "Keep a dated timeline of events and requests.",
      "Raise issues formally through grievance where safe to do so.",
      "Ask for adjustments during any process itself.",
      "Get specialist advice for tribunal deadlines — timescales are strict.",
    ],
  },
  {
    slug: "returning-to-work-after-disability",
    title: "Returning to work after illness or injury: phased returns and risk",
    categorySlug: "workplace" as const,
    tags: ["Returning to work", "Fit note", "Planning"],
    intro:
      "Returns fail when energy, travel, or toilets do not match reality. Phased returns, equipment, and clear limits reduce relapse.",
    steps: [
      "Ask GP or clinician for advice appropriate to work tasks.",
      "Request workplace adjustments before day one where possible.",
      "Review weekly — adjust hours before crisis.",
      "Know sick pay, certification, and benefit interactions if income drops.",
    ],
  },
  {
    slug: "flexible-working-and-health",
    title: "Flexible working requests when health fluctuates",
    categorySlug: "workplace" as const,
    tags: ["Flexible working", "Health", "Work"],
    intro:
      "Flexible working can be a statutory request or a reasonable adjustment depending on context. Clear proposals beat vague pleas.",
    steps: [
      "Propose a pattern with start/end times and core hours.",
      "Explain impact on clients or teams and how cover works.",
      "Ask for a trial and metrics for success.",
      "Follow up in writing after verbal agreements.",
    ],
  },
  {
    slug: "occupational-health-and-workplace-assessments",
    title: "Occupational Health reports: how to read them and respond",
    categorySlug: "workplace" as const,
    tags: ["Occupational Health", "Work", "Evidence"],
    intro:
      "Occupational Health should focus on function and workplace barriers. Reports can be wrong — you can respond with corrections and extra evidence.",
    steps: [
      "Check facts carefully — diagnoses, dates, and job role.",
      "Ask for missing recommendations to be clarified.",
      "Share relevant specialist letters if OH lacks detail.",
      "Remember OH advice is not a final legal determination.",
    ],
  },
  {
    slug: "access-to-work-what-employer-pays-vs-grant",
    title: "Access to Work vs employer duty: who pays for what?",
    categorySlug: "workplace" as const,
    tags: ["Access to Work", "Employer duty", "Funding"],
    intro:
      "A common confusion: employers still owe reasonable adjustments under the Equality Act, even when Access to Work exists. The grant can fund extra support, but it is not a substitute for core employer duties.",
    steps: [
      "List adjustments your employer should provide immediately under reasonable adjustments.",
      "List additional specialist costs that Access to Work may fund.",
      "Confirm in writing which party is paying each item and by when.",
      "Escalate delays that leave you unable to work safely.",
    ],
  },
  {
    slug: "access-to-work-application-walkthrough",
    title: "Access to Work application: step-by-step walkthrough",
    categorySlug: "workplace" as const,
    tags: ["Access to Work", "Application", "Steps"],
    intro:
      "Applications go better when your evidence names concrete work tasks, barriers, and consequences. Generic statements like \"I need support\" usually lead to slower and weaker recommendations.",
    steps: [
      "Prepare your role tasks and where barriers happen (travel, meetings, software, fatigue).",
      "Describe what happens without support: delays, errors, pain, sickness absence, safety risk.",
      "Include previous adjustments that helped or failed.",
      "After submitting, keep timelines and chase if responses stall.",
    ],
  },
  {
    slug: "workplace-meeting-script-and-email-template",
    title: "Workplace adjustment meeting script and follow-up email template",
    categorySlug: "workplace" as const,
    tags: ["Meetings", "Templates", "Adjustments"],
    intro:
      "Most workplace disputes come from unclear conversations. A short script and a same-day follow-up email create accountability without escalating too early.",
    steps: [
      "Start with: barrier, requested adjustment, and expected outcome.",
      "Ask for trial dates, review date, and decision owner.",
      "Send a follow-up email summarising what was agreed.",
      "If no response, send one reminder before formal grievance.",
    ],
  },
  {
    slug: "probation-disability-disclosure-and-risk",
    title: "Probation, disclosure, and disability risk at a new job",
    categorySlug: "workplace" as const,
    tags: ["Probation", "Disclosure", "New job"],
    intro:
      "Starting a new role while managing disability can mean deciding when to disclose and how much detail to share. You do not need to overshare medical history to request practical adjustments.",
    steps: [
      "Decide what to disclose based on barriers, not diagnosis detail.",
      "Request essential adjustments early enough for probation targets to be fair.",
      "Track missed support and impact on performance metrics.",
      "Get advice quickly if capability action starts before adjustments are in place.",
    ],
  },

  // Travel articles now live in `src/lib/travel-articles-detail.ts`.

  // --- Sport & leisure ---
  {
    slug: "leisure-centre-and-gym-access",
    title: "Leisure centres and gyms: memberships, inductions, and awkward barriers",
    categorySlug: "sport" as const,
    tags: ["Gyms", "Leisure", "Access"],
    intro:
      "Chains publish policies but local buildings vary. Inductions should cover realistic routes: changing, poolside, equipment floor, and emergency evacuation.",
    steps: [
      "Ask for an access tour before paying.",
      "Ask how evacuation works if lifts cannot be used.",
      "Ask whether kit needs a referral or adapted induction.",
      "Challenge blanket bans — proportionality matters.",
    ],
  },
  {
    slug: "adaptive-sport-and-local-clubs",
    title: "Adaptive sport: finding coaches, clubs, and grassroots pathways",
    categorySlug: "sport" as const,
    tags: ["Sport", "Clubs", "Grassroots"],
    intro:
      "Pathways differ by sport: national bodies, local parasport hubs, and disability-led clubs. Transport and changing facilities often decide whether someone can stay.",
    steps: [
      "Search national governing body disability pages first.",
      "Ask clubs plainly about kit, toilets, and helper policies.",
      "Ask training times that match transport availability.",
      "Start with low-commitment sessions before buying kit.",
    ],
  },
  {
    slug: "swimming-pools-changing-places-and-access",
    title: "Swimming pools: hoists, changing, and chlorinated environment realities",
    categorySlug: "sport" as const,
    tags: ["Swimming", "Changing Places", "Leisure"],
    intro:
      "Pool access is more than a ramp — it includes bench height, sling sizes, pool hoists, lifeguard procedures, and noise.",
    steps: [
      "Ask whether pool hoists are maintained and who operates them.",
      "Ask about Changing Places or suitable changing options.",
      "Ask about quiet sessions if sensory overload is a barrier.",
      "Plan hydration, fatigue, and recovery time after sessions.",
    ],
  },
  {
    slug: "grassroots-sport-and-equality",
    title: "Grassroots sport and fairness: reasonable adjustments in clubs",
    categorySlug: "sport" as const,
    tags: ["Sport", "Equality Act", "Clubs"],
    intro:
      "Volunteer-run clubs still have duties in many contexts. Adjustments might include communication support, flexible kit rules, extra warm-up time, or scheduling.",
    steps: [
      "Ask what flexibility exists within competition rules.",
      "Ask for written summaries after verbal promises.",
      "Escalate via governing bodies where discrimination persists.",
      "Document incidents — patterns matter.",
    ],
  },

  // Care & support: full articles live in `src/lib/care-articles-detail.ts` (merged in mock-data.ts).

  // --- Emergency & quick help ---
  {
    slug: "urgent-mental-health-support-uk",
    title: "Urgent mental health support in the UK: NHS, charity, and crisis lines",
    categorySlug: "emergency" as const,
    tags: ["Mental health", "Crisis", "Helplines"],
    intro:
      "Crisis routes vary by nation and area. If you are unsafe, emergency services are appropriate. For intense distress without immediate danger, NHS urgent mental health lines and charities can help.",
    steps: [
      "If you might act on suicidal thoughts, seek urgent help now — same-day GP/999/NHS 111 depending on severity.",
      "Keep crisis numbers saved on phone and written at home.",
      "Ask local NHS trust for crisis café or crisis team numbers.",
      "Tell someone trusted where you are if you feel at risk.",
    ],
  },
  {
    slug: "nhs-111-and-999-how-to-choose",
    title: "NHS 111 vs 999: how to choose when needs are unclear",
    categorySlug: "emergency" as const,
    tags: ["NHS", "Emergency", "Health"],
    intro:
      "999 is for life-threatening emergencies. NHS 111 can direct you when symptoms are worrying but not clearly emergent — describing functional decline matters.",
    steps: [
      "Call 999 for breathing struggles, severe bleeding, suspected stroke, crushing chest pain, or unconsciousness.",
      "Use NHS 111 online or phone for urgent advice when unsure.",
      "Keep a list of conditions, allergies, and medications for calls.",
      "Ask for callback numbers if lines are busy.",
    ],
  },
  {
    slug: "helplines-text-lines-you-can-use-today",
    title: "Helplines and text support you can use today",
    categorySlug: "emergency" as const,
    tags: ["Helplines", "Text support", "UK"],
    intro:
      "Samaritans and SHOUT are widely available in the UK. Specialist lines exist for abuse, benefits, housing, and disability hate crime.",
    steps: [
      "Save Samaritans 116 123 and SHOUT 85258.",
      "Search specialist lines for your situation — benefits, housing, domestic abuse.",
      "If speech is hard, text services can help.",
      "If hate crime, record safely and report through police or third-party reporting.",
    ],
  },
  {
    slug: "power-cuts-and-medical-equipment-plan-b",
    title: "Power cuts and medical equipment: Plan B for chairs, beds, and oxygen",
    categorySlug: "emergency" as const,
    tags: ["Power", "Safety", "Equipment"],
    intro:
      "Power-dependent equipment needs supplier guidance and backup plans. Never improvise unsafe transfers during outages.",
    steps: [
      "Register priority services with your energy network if eligible.",
      "Ask suppliers for outage guidance for your device class.",
      "Keep torches, charged phones, and neighbour contacts accessible.",
      "Know local respite or emergency routes if failure would strand you.",
    ],
  },
  {
    slug: "wallet-card-and-emergency-contacts",
    title: "Wallet cards and emergency contacts: communication when speech or cognition drops",
    categorySlug: "emergency" as const,
    tags: ["Communication", "Emergency", "Planning"],
    intro:
      "Short written explanations reduce harmful assumptions in emergencies. Include conditions, medication allergies, communication needs, and advocate contacts.",
    steps: [
      "Write a card with essentials — not your whole medical history.",
      "Add emergency contacts who actually answer.",
      "Update after medication changes.",
      "Teach trusted people where to find documents at home.",
    ],
  },
] as const;
