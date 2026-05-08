import type { AdviceArticle } from "@/lib/mock-data";

/**
 * Full-length travel guides (UK-focused practical detail for disabled travellers).
 */
export const TRAVEL_ARTICLES_DETAILED: AdviceArticle[] = [
  {
    slug: "booking-accessible-accommodation",
    title: "Booking accessible accommodation: questions that reveal reality",
    categorySlug: "travel",
    updated: "2026-05-08",
    tags: ["Travel", "Hotels", "Access", "Measurements"],
    sections: [
      { type: "h2", text: "Do not book from labels alone" },
      {
        type: "p",
        text: "Accessible can mean anything from one grab rail to a fully adapted room. Ask for specifics in writing before paying. Most expensive travel mistakes happen when people trust stock photos and broad claims.",
      },
      { type: "h2", text: "Ask for the full access route" },
      {
        type: "ul",
        items: [
          "Street/parking to entrance: kerbs, slope gradient, ramp length, automatic doors.",
          "Reception to room: lift dimensions, corridor width, heavy fire doors.",
          "Room to breakfast/bar/pool: whether every area you plan to use is step-free.",
          "Emergency exits: whether there is a Personal Emergency Evacuation Plan (PEEP) process.",
        ],
      },
      { type: "h2", text: "Bathroom details that decide whether the trip works" },
      {
        type: "ul",
        items: [
          "Shower: roll-in vs tray lip, entrance width, seat fixed/folding, drain slope.",
          "Toilet: height, transfer side space, grab rail positions.",
          "Basin and mirror: usable from seated position.",
          "Door swing: whether a wheelchair can enter and close the door safely.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Best evidence request",
        body: "Ask for recent timestamped photos or a short video walkthrough with tape measure visible at key points (door width, shower opening, turning circle).",
      },
      { type: "h2", text: "Bedroom and bed setup checks" },
      {
        type: "p",
        text: "Bed height can make transfers impossible or unsafe. Ask if the bed can be raised/lowered, whether furniture can be moved, and whether mobile hoists can fit around the bed. Confirm socket locations for charging powerchairs, CPAP, or other equipment.",
      },
      { type: "h2", text: "Things that may be useful (especially first time)" },
      {
        type: "ul",
        items: [
          "Ask bed height in cm from floor to top of mattress. If unknown, ask staff to measure.",
          "Ask bathroom and bedroom door clear width in cm (clear opening, not frame width).",
          "Ask toilet seat height in cm and transfer space on left and right.",
          "Ask shower entry type (true roll-in vs lip/tray) and lip height in cm if present.",
          "Ask whether shower seat is fixed, fold-down, removable, and weight-rated.",
          "Ask lift internal size and door width, plus what happens if the lift is out of order.",
          "Ask whether accessible rooms are ever reassigned and how they protect your booking.",
          "Ask for the nearest truly step-free route from drop-off/parking to your room.",
          "Ask if they can remove decorative furniture to improve turning space if needed.",
          "Ask for photos/video from this season, not archive marketing pictures.",
        ],
      },
      { type: "h2", text: "Template email: accessibility checks before booking" },
      {
        type: "pre",
        text: `Subject: Accessibility checks before I book [Hotel name], [dates]

Hello [Hotel team / Reservations],

I am planning to stay at your hotel on [dates], and I need to confirm access details before booking.
Could you please reply by email with answers to the questions below?

Room and route
1) Is the route from street/parking to reception and from reception to the room fully step-free?
2) Door clear width (cm): room door ___ / bathroom door ___
3) Lift details (if relevant): door width ___ cm, internal depth ___ cm, internal width ___ cm

Bedroom
4) Bed height from floor to top of mattress (cm): ___
5) Can furniture be moved to allow turning space?
6) Is there space for a mobile hoist if required?

Bathroom
7) Shower type: roll-in / tray with lip (please state lip height in cm)
8) Toilet seat height (cm): ___
9) Transfer space next to toilet: left side ___ cm / right side ___ cm
10) Grab rails: positions around toilet and shower (photo helpful)
11) Shower seat: fixed / fold-down / portable, and weight limit if known

Practical
12) Can you share recent photos or a short video of the exact room and bathroom?
13) If the room is not as described on arrival, what is your process for relocation or cancellation?
14) Please confirm this room will be blocked as an accessibility-required booking.

Thanks very much for your help. Written confirmation helps me travel safely.

Kind regards,
[Name]
[Phone number]
[Booking reference if already held]`,
      },
      {
        type: "callout",
        tone: "tip",
        title: "If you call instead of email",
        body: "Ask for the staff member's name, then send a follow-up email saying “Thanks for confirming…” with the details listed. This creates written evidence.",
      },
      { type: "h2", text: "Template checklist: first-trip essentials people forget" },
      {
        type: "ul",
        items: [
          "A one-page support summary: diagnosis is optional, practical needs are essential.",
          "Medication list with generic names, doses, and timing.",
          "Equipment serial numbers, photos, and receipts saved offline.",
          "Spare charger/adapters and extension lead if sockets are hard to reach.",
          "Emergency contacts card in wallet and phone lock-screen details if appropriate.",
          "Insurance emergency number printed (not only saved in an app).",
          "Buffer time after arrival for setup and recovery, not a tight same-day schedule.",
        ],
      },
      { type: "h2", text: "Cancellation and complaints protection" },
      {
        type: "ul",
        items: [
          "Get promises by email (or message) so evidence exists if reality differs.",
          "Ask if they will offer free cancellation if access is materially not as described.",
          "Check payment method chargeback windows and booking platform dispute rules.",
          "If arrival is unsafe, document immediately with photos and request alternatives on the day.",
        ],
      },
      { type: "h2", text: "International planning basics" },
      {
        type: "p",
        text: "Outside the UK, bathroom norms and accessibility law differ. Ask about adapter plugs, medical equipment voltage, local wheelchair taxis, and nearest accessible pharmacy/hospital before departure.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This guide is general information, not legal advice. If access failures involve discrimination, keep evidence and seek specialist support promptly.",
      },
    ],
  },
  {
    slug: "travel-insurance-and-medical-equipment",
    title: "Travel insurance: equipment, medication, and disclosure",
    categorySlug: "travel",
    updated: "2026-05-08",
    tags: ["Insurance", "Travel", "Equipment", "Medical"],
    sections: [
      { type: "h2", text: "Why policies fail at claim time" },
      {
        type: "p",
        text: "Claims are often rejected because key details were not declared, item values were under-stated, or policy limits were misunderstood. Travel insurance wording is contractual: if a condition or device should have been disclosed, the insurer may reduce or refuse payout.",
      },
      { type: "h2", text: "Disclose conditions functionally and honestly" },
      {
        type: "ul",
        items: [
          "Declare diagnoses and recent investigations when asked.",
          "Mention planned procedures or pending consultant follow-up if relevant.",
          "State mobility and equipment dependence where policy questions request this.",
          "Save screenshots/emails confirming what was declared and accepted.",
        ],
      },
      { type: "h2", text: "Equipment cover: check the numbers" },
      {
        type: "p",
        text: "Many policies cap single items below the value of powerchairs, custom cushions, communication devices, or specialist battery systems. Check whether a separate equipment extension is required and whether depreciation rules apply.",
      },
      {
        type: "ul",
        items: [
          "Single-item limit and total baggage limit.",
          "Cover for hired replacement equipment while yours is repaired.",
          "Emergency delivery of spare parts.",
          "Excess amount and exclusions for wear/tear or pre-existing faults.",
        ],
      },
      { type: "h2", text: "Medication and documents pack" },
      {
        type: "ul",
        items: [
          "GP or clinic letter listing medication, diagnosis, and essential devices.",
          "Repeat prescription copy and generic medication names.",
          "Extra supply in original packaging split across bags where safe.",
          "Insurer emergency line saved offline and on paper.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Claim-ready file",
        body: "Before travel, store receipts, serial numbers, and photos of all high-value equipment in a cloud folder plus offline copy. This speeds claims after loss or damage.",
      },
      { type: "h2", text: "Medical assistance and repatriation" },
      {
        type: "p",
        text: "Confirm who authorises treatment abroad, how emergency medical transfer decisions are made, and whether companion travel is covered. For complex conditions, ask insurer medical screening teams explicit scenario questions.",
      },
      { type: "h2", text: "EHIC/GHIC is not full insurance" },
      {
        type: "p",
        text: "For eligible destinations, GHIC/EHIC can support access to state healthcare but does not replace travel insurance. It usually does not cover private treatment, cancellation, mountain rescue, or equipment losses.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This is informational content, not regulated insurance advice. Always rely on current policy wording and insurer confirmations.",
      },
    ],
  },
  {
    slug: "airports-batteries-and-spare-parts",
    title: "Airports and mobility tech: batteries, spare parts, and hand baggage",
    categorySlug: "travel",
    updated: "2026-05-08",
    tags: ["Flying", "Batteries", "Wheelchairs", "Assistance"],
    sections: [
      { type: "h2", text: "Start with airline-specific rules, not generic advice" },
      {
        type: "p",
        text: "Battery and mobility aid rules vary by airline and aircraft. Contact the airline assistance team early with your chair model, battery chemistry, and dimensions. Ask for written approval and keep it with boarding documents.",
      },
      { type: "h2", text: "Battery details you should know before calling" },
      {
        type: "ul",
        items: [
          "Battery chemistry (lithium-ion, gel, AGM, etc.).",
          "Watt-hour (Wh) rating where applicable.",
          "How the battery disconnects and whether terminals can be protected.",
          "Whether spare batteries are carried and in what case.",
        ],
      },
      { type: "h2", text: "Day-of-travel damage prevention" },
      {
        type: "ul",
        items: [
          "Label chair with your contact info and handling notes.",
          "Photograph chair from all sides before check-in.",
          "Secure removable controls/joysticks if advised by manufacturer.",
          "Carry critical cushions or pressure-relief items in cabin when possible.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Gate handover script",
        body: "Use a short script: battery type, no-lift zones, how to disengage drive, and parts that must not be forced. Ask staff to confirm they noted it.",
      },
      { type: "h2", text: "Spare parts and hand baggage" },
      {
        type: "p",
        text: "Carry essential small spares that are permitted: charger cables, fuses, Allen keys (if allowed), and controller instructions. Rules on tools vary by airport security and airline policy, so confirm in advance.",
      },
      { type: "h2", text: "Assistance booking and timing" },
      {
        type: "ul",
        items: [
          "Book assistance when ticketing and reconfirm 48–72 hours before flight.",
          "Arrive early enough for assistance queues and security checks.",
          "For connections, confirm transfer assistance between flights.",
          "If assistance fails, request incident reference numbers immediately.",
        ],
      },
      { type: "h2", text: "If the chair is delayed or damaged" },
      {
        type: "p",
        text: "Report before leaving the airport and get written records. Ask for immediate suitable mobility support and reimbursement pathways. Keep all receipts for taxis, temporary equipment, and accessible accommodation changes caused by the incident.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Never improvise unsafe transfers to save time at the airport. If assistance is not safe, stop and escalate to duty managers.",
      },
    ],
  },
  {
    slug: "ferries-and-coaches-access",
    title: "Ferries and coaches: lifts, evacuation, and seasickness planning",
    categorySlug: "travel",
    updated: "2026-05-08",
    tags: ["Ferries", "Coaches", "Travel", "Evacuation"],
    sections: [
      { type: "h2", text: "Why ferries/coaches need separate planning" },
      {
        type: "p",
        text: "These journeys often combine terminals, ramps, vehicle decks, and onboard spaces with varying staff support. The booking may look simple but the access chain can break at transfer points.",
      },
      { type: "h2", text: "Questions to ask before booking" },
      {
        type: "ul",
        items: [
          "Exact boarding and disembarkation process for wheelchair users.",
          "Whether you stay in your chair or transfer to a provided seat.",
          "Lift availability between decks and what happens if lift is out of service.",
          "Accessible toilet location and whether it remains available during sailing.",
        ],
      },
      { type: "h2", text: "Evacuation and safety limits" },
      {
        type: "p",
        text: "Ask what evacuation arrangements exist if you cannot use stairs or if weather affects boarding equipment. Staff should explain procedures, not just say they are compliant.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Get names and references",
        body: "When a company gives access assurances, keep the booking reference, staff name, and timestamp. It helps if there is a dispute later.",
      },
      { type: "h2", text: "Seasickness, fatigue, and symptom management" },
      {
        type: "ul",
        items: [
          "Choose seating/cabin positions that reduce motion triggers if known.",
          "Check medication timing with prescriber advice before long crossings.",
          "Plan hydration, snacks, and toilet timing around boarding queues.",
          "Build recovery time after arrival rather than tight onward plans.",
        ],
      },
      { type: "h2", text: "Coach-specific considerations" },
      {
        type: "p",
        text: "Coach routes vary in wheelchair spaces, tie-down systems, and driver training. Confirm whether assistance animals are accommodated, whether priority seats can be guaranteed, and how disrupted services handle missed accessible connections.",
      },
      { type: "h2", text: "Terminal transfers and onward links" },
      {
        type: "p",
        text: "Many failed journeys happen between services: station to port, port to coach bay, coach bay to hotel. Plan each handoff point with phone numbers and fallback taxi options.",
      },
      { type: "h2", text: "If access fails on the day" },
      {
        type: "ul",
        items: [
          "Ask for immediate reasonable alternatives, not generic apologies.",
          "Document what failed: time, location, staff responses, safety impact.",
          "Keep receipts for additional costs caused by inaccessible provision.",
          "Complain in writing with specific remedy request (refund, rebooking, reimbursement).",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "If any boarding/transfer step is unsafe, stop and escalate. Your safety matters more than maintaining schedule.",
      },
    ],
  },
];
