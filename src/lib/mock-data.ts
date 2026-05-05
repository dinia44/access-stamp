export type Venue = {
  slug: string;
  name: string;
  location: string;
  type:
    | "Restaurant"
    | "Café"
    | "Hotel"
    | "Shopping"
    | "Arts & Culture"
    | "Leisure"
    | "Pub & Bar"
    | "Healthcare"
    | "Entertainment"
    | "Outdoor"
    | "Sports & Fitness";
  rating: number;
  summary: string;
  tags: string[];
  verification: "Community reported" | "Access Stamp checked" | "Not yet verified";
  lastUpdated: string;
  confidence: "High" | "Medium" | "Low";
  features: Record<string, "yes" | "no" | "unknown">;
};

export const SAMPLE_VENUES: Venue[] = [
  {
    slug: "harbour-kitchen-liverpool",
    name: "Harbour Kitchen",
    location: "Liverpool, L1",
    type: "Restaurant",
    rating: 4.4,
    summary:
      "Step-free entrance with wide doors. Spacious layout and an accessible toilet on the ground floor.",
    tags: ["Step-free", "Accessible toilet", "Spacious"],
    verification: "Community reported",
    lastUpdated: "May 2026",
    confidence: "Medium",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "unknown",
      "Automatic doors": "no",
      "Wide doorways (80cm+)": "yes",
      "Turning space (150cm+)": "yes",
      "Accessible toilet": "yes",
      "Changing Places toilet": "no",
      "Nearby Blue Badge parking": "yes",
      "Lift access": "unknown",
      "Quiet environment": "unknown",
      "Staff disability awareness": "unknown",
    },
  },
  {
    slug: "gallery-cafe-manchester",
    name: "Gallery Café",
    location: "Manchester, M1",
    type: "Café",
    rating: 4.1,
    summary:
      "Level access via side entrance. Tight turning space near the counter, accessible toilet not confirmed.",
    tags: ["Step-free", "Tight turning", "Ask staff"],
    verification: "Not yet verified",
    lastUpdated: "May 2026",
    confidence: "Low",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "unknown",
      "Automatic doors": "unknown",
      "Wide doorways (80cm+)": "unknown",
      "Turning space (150cm+)": "no",
      "Accessible toilet": "unknown",
      "Changing Places toilet": "no",
      "Nearby Blue Badge parking": "unknown",
      "Lift access": "unknown",
      "Quiet environment": "yes",
      "Staff disability awareness": "unknown",
    },
  },
  {
    slug: "riverside-cinema-leeds",
    name: "Riverside Cinema",
    location: "Leeds, LS1",
    type: "Entertainment",
    rating: 4.6,
    summary:
      "Step-free entry, lift to all screens, transfer-friendly seating options, and hearing loop available.",
    tags: ["Lift", "Seating", "Hearing loop"],
    verification: "Access Stamp checked",
    lastUpdated: "May 2026",
    confidence: "High",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "unknown",
      "Automatic doors": "yes",
      "Wide doorways (80cm+)": "yes",
      "Turning space (150cm+)": "yes",
      "Accessible toilet": "yes",
      "Changing Places toilet": "unknown",
      "Nearby Blue Badge parking": "yes",
      "Lift access": "yes",
      "Quiet environment": "unknown",
      "Staff disability awareness": "yes",
    },
  },
  {
    slug: "the-botanist-kitchen-manchester",
    name: "The Botanist Kitchen",
    location: "Manchester, M1",
    type: "Restaurant",
    rating: 4.7,
    summary:
      "Step-free entrance, good turning space, and nearby parking. Practical details are confirmed in the listing.",
    tags: ["Step-free", "Parking", "Spacious"],
    verification: "Community reported",
    lastUpdated: "May 2026",
    confidence: "Medium",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "unknown",
      "Automatic doors": "unknown",
      "Wide doorways (80cm+)": "yes",
      "Turning space (150cm+)": "yes",
      "Accessible toilet": "yes",
      "Changing Places toilet": "no",
      "Nearby Blue Badge parking": "yes",
      "Lift access": "unknown",
      "Quiet environment": "unknown",
      "Staff disability awareness": "unknown",
    },
  },
  {
    slug: "riverside-arts-centre-bristol",
    name: "Riverside Arts Centre",
    location: "Bristol, BS1",
    type: "Arts & Culture",
    rating: 4.5,
    summary:
      "Lift access to key areas and a Changing Places toilet. Clear approach routes and helpful staff.",
    tags: ["Lift access", "Changing Places", "Clear routes"],
    verification: "Access Stamp checked",
    lastUpdated: "May 2026",
    confidence: "High",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "unknown",
      "Automatic doors": "yes",
      "Wide doorways (80cm+)": "yes",
      "Turning space (150cm+)": "yes",
      "Accessible toilet": "yes",
      "Changing Places toilet": "yes",
      "Nearby Blue Badge parking": "unknown",
      "Lift access": "yes",
      "Quiet environment": "unknown",
      "Staff disability awareness": "yes",
    },
  },
  {
    slug: "greenfield-shopping-village-leeds",
    name: "Greenfield Shopping Village",
    location: "Leeds, LS2",
    type: "Shopping",
    rating: 4.3,
    summary:
      "Powered chair friendly, rest areas available, and staff are trained. Good internal circulation space.",
    tags: ["Power chair OK", "Staff trained", "Rest areas"],
    verification: "Community reported",
    lastUpdated: "May 2026",
    confidence: "Medium",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "unknown",
      "Automatic doors": "yes",
      "Wide doorways (80cm+)": "yes",
      "Turning space (150cm+)": "yes",
      "Accessible toilet": "yes",
      "Changing Places toilet": "unknown",
      "Nearby Blue Badge parking": "yes",
      "Lift access": "yes",
      "Quiet environment": "unknown",
      "Staff disability awareness": "yes",
    },
  },
];

export const ADVICE_CATEGORIES = [
  {
    title: "Your Rights",
    href: "/advice/rights",
    icon: "⚖️",
    desc: "Benefits, legal protections, Equality Act, and what you're entitled to",
  },
  {
    title: "Education",
    href: "/advice/education",
    icon: "🎓",
    desc: "DSA, EHC plans, school and university support",
  },
  {
    title: "Transport",
    href: "/advice/transport",
    icon: "🚂",
    desc: "Trains, buses, driving, flying, taxis, scooter rules",
  },
  {
    title: "Cars",
    href: "/advice/cars",
    icon: "🚗",
    desc: "Blue Badge, Motability, driving adaptations, parking, and ownership",
  },
  {
    title: "Sport",
    href: "/advice/sport",
    icon: "🏃",
    desc: "Accessible gyms, leisure centres, adaptive sport, and club checklists",
  },
  {
    title: "Workplace",
    href: "/advice/workplace",
    icon: "💼",
    desc: "Access to Work, adjustments, discrimination, returning to work",
  },
  {
    title: "Care & Support",
    href: "/advice/care",
    icon: "🤝",
    desc: "Personal budgets, hiring PAs, templates, managing care",
  },
  {
    title: "Equipment",
    href: "/advice/equipment",
    icon: "🦽",
    desc: "Wheelchairs, home equipment, vehicle adaptations, tech",
  },
  {
    title: "Emergency & Quick Help",
    href: "/advice/emergency",
    icon: "🚨",
    desc: "Breakdowns, helplines, NHS services, rights cards",
  },
  {
    title: "New to Disability",
    href: "/advice/new-to-disability",
    icon: "🧭",
    desc: "Starting point for newly disabled people and families",
  },
  {
    title: "Travel",
    href: "/advice/travel",
    icon: "🧳",
    desc: "Flying, accessible accommodation, insurance, and planning ahead",
  },
];

export type AdviceArticle = {
  slug: string;
  title: string;
  categorySlug:
    | "rights"
    | "education"
    | "transport"
    | "workplace"
    | "care"
    | "equipment"
    | "emergency"
    | "new-to-disability"
    | "travel"
    | "cars"
    | "sport";
  updated: string;
  tags: string[];
  sections: Array<
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; tone: "warning" | "tip" | "contact" | "steps"; title: string; body: string }
  >;
};

export const ADVICE_ARTICLES: AdviceArticle[] = [
  {
    slug: "pip-in-plain-english",
    title: "PIP in plain English (what it is, who it’s for, what to do next)",
    categorySlug: "rights",
    updated: "2026-05-03",
    tags: ["Benefits", "PIP", "Forms"],
    sections: [
      { type: "h2", text: "What PIP is" },
      {
        type: "p",
        text: "Personal Independence Payment (PIP) is a UK benefit to help with extra costs of disability. It’s not based on your diagnosis, it’s based on how your condition affects you day to day.",
      },
      { type: "h2", text: "What people get stuck on" },
      { type: "ul", items: ["Understating impact", "Missing real examples", "Not linking symptoms to tasks"] },
      {
        type: "callout",
        tone: "tip",
        title: "A useful framing",
        body: "Describe your worst days, and then your usual days. Use specific examples: what happens, what you can’t do, what support you need, and what the risk is if you try.",
      },
      { type: "h2", text: "Next steps" },
      {
        type: "callout",
        tone: "steps",
        title: "Quick steps",
        body: "1) Start a symptom and impact log. 2) Gather supporting letters. 3) Draft answers with real examples. 4) Ask someone to sanity-check wording.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This guide is not legal advice. For complex situations, get specialist welfare rights help.",
      },
    ],
  },
  {
    slug: "wheelchair-breakdown-what-to-do",
    title: "Wheelchair breakdown: what to do right now",
    categorySlug: "emergency",
    updated: "2026-05-03",
    tags: ["Emergency", "Repairs", "NHS"],
    sections: [
      { type: "h2", text: "Safety first" },
      {
        type: "callout",
        tone: "warning",
        title: "Manual handling risk",
        body: "Don’t let anyone lift you unsafely. If you need a transfer, do it with appropriate equipment and support.",
      },
      { type: "h2", text: "Who to contact" },
      {
        type: "callout",
        tone: "contact",
        title: "Crisis support",
        body: "If you feel in crisis, you can call Samaritans on 116 123 (UK), or text SHOUT to 85258.",
      },
      { type: "h2", text: "What to document" },
      {
        type: "ul",
        items: [
          "What failed (wheel, battery, joystick, castor)",
          "Where you are and whether you can move safely",
          "Photos/video if helpful",
        ],
      },
    ],
  },
  // Rights placeholders for homepage tabbed section (add real content later)
  ...(
    [
      ["blue-badge", "Blue Badge: eligibility, applying, and using it"],
      ["motability", "Motability scheme: how it works"],
      ["vehicle-tax-exemption", "Vehicle tax exemption and reductions"],
      ["parking-rights", "Parking rights and enforcement (what to do when it goes wrong)"],
      ["wavs", "Wheelchair Accessible Vehicles (WAVs): options and costs"],
      ["licence-conditions", "Licence conditions and driving adaptations"],

      ["dfg", "Disabled Facilities Grant (DFG): what it covers and how to apply"],
      ["council-housing-priority", "Council housing priority and the medical needs process"],
      ["equipment-through-social-services", "Getting equipment through social services"],
      ["adapting-a-rented-property", "Adapting a rented property: your rights and the process"],
      ["smart-home", "Smart home and assistive tech for independence"],
      ["housing-register", "Housing register basics and realistic timelines"],

      ["uc-lcwra", "Universal Credit: LCWRA and how assessments work"],
      ["attendance-allowance", "Attendance Allowance: the essentials"],
      ["carers-allowance", "Carer’s Allowance: eligibility and trade-offs"],
      ["council-tax-disability-reduction", "Council Tax disability reduction"],
      ["prescription-exemptions", "Prescription charge exemptions"],

      ["equality-act", "Equality Act 2010: reasonable adjustments in practice"],
      ["reasonable-adjustments", "Reasonable adjustments: what to ask for and how"],
      ["formal-complaints", "How to make a formal complaint (and keep it effective)"],
      ["eass", "When to contact EASS (Equality Advisory Support Service)"],
      ["advocacy", "Advocacy: who can help and how to use it"],
      ["public-services", "Accessing public services: what you can expect"],

      ["nhs-wheelchair-services", "NHS wheelchair services: referral and what to expect"],
      ["continuing-healthcare-chc", "NHS Continuing Healthcare (CHC): basics"],
      ["gp-access", "GP and hospital accessibility rights"],
      ["nhs-complaints", "NHS complaints: how to escalate"],
      ["mental-health-crisis", "Mental health crisis support routes (UK)"],
      ["traveling-with-care", "Traveling with support needs: planning and paperwork"],

      ["disabled-parents", "Disabled parents: practical support and rights"],
      ["childcare", "Childcare and accessibility: what to ask"],
      ["childrens-benefits", "Children’s disability benefits overview"],
      ["respite", "Respite: how to ask for it and what ‘counts’"],
      ["family-activities", "Family activities: finding genuinely accessible places"],
      ["pregnancy", "Pregnancy, birth, and disability: navigating appointments"],
    ] as const
  ).map(([slug, title]) => ({
    slug,
    title,
    categorySlug: "rights" as const,
    updated: "2026-05-03",
    tags: ["Rights"],
    sections: [
      { type: "h2" as const, text: "Overview" },
      {
        type: "p" as const,
        text: "This guide is being written. For now, this page is a placeholder so the site navigation works end to end.",
      },
      { type: "h2" as const, text: "Next steps" },
      {
        type: "callout" as const,
        tone: "tip" as const,
        title: "Tip",
        body: "If you tell us what happened and what outcome you need, the AI can help you plan the next step and point you at the right place to escalate.",
      },
      {
        type: "callout" as const,
        tone: "warning" as const,
        title: "Important",
        body: "This guide is not legal advice. For complex situations, contact Citizens Advice, Disability Rights UK, EASS, or a disability solicitor.",
      },
    ],
  })),
  ...(
    [
      {
        slug: "dsa-disabled-students-allowance",
        title: "Disabled Students' Allowance: what it can fund",
        categorySlug: "education",
        tags: ["DSA", "University", "Funding"],
        intro:
          "Disabled Students' Allowance (DSA) can fund study-related support in higher education, including equipment, software, mentoring, travel support, and non-medical helpers.",
        steps: [
          "Check whether your course and provider are eligible.",
          "Gather evidence of disability or long-term condition.",
          "Apply early, then book the needs assessment when invited.",
          "Keep a copy of every recommendation and quote.",
        ],
      },
      {
        slug: "ehc-plan-basics",
        title: "EHC plans: the basics for families",
        categorySlug: "education",
        tags: ["EHC plan", "School", "Support"],
        intro:
          "An Education, Health and Care plan records a child or young person's needs, outcomes, and support. The useful question is not just whether a plan exists, but whether it is specific enough to enforce.",
        steps: [
          "Write down what support is needed, when, how often, and from whom.",
          "Ask for vague wording to be made specific.",
          "Keep school evidence, professional reports, and examples from home.",
          "Track review dates and send your own notes after meetings.",
        ],
      },
      {
        slug: "reasonable-adjustments-at-school",
        title: "Reasonable adjustments at school and college",
        categorySlug: "education",
        tags: ["Adjustments", "School", "College"],
        intro:
          "Reasonable adjustments are practical changes that remove barriers. In education, they can cover access, timetables, communication, equipment, personal care, trips, and behaviour policies.",
        steps: [
          "Name the barrier clearly.",
          "Suggest the adjustment and why it helps.",
          "Ask who will do it and from what date.",
          "Review whether it actually worked, not just whether it was offered.",
        ],
      },
      {
        slug: "university-support-plan",
        title: "University support plans: what to ask for",
        categorySlug: "education",
        tags: ["University", "Adjustments", "Planning"],
        intro:
          "A university support plan should translate access needs into day-to-day arrangements for lectures, deadlines, placements, accommodation, exams, field trips, and communication.",
        steps: [
          "Contact disability services before the course starts if possible.",
          "Separate academic support from accommodation and campus access.",
          "Ask how adjustments are shared with departments.",
          "Get a named contact for when support breaks down.",
        ],
      },
      {
        slug: "exam-access-arrangements",
        title: "Exam access arrangements: extra time, breaks, and rooms",
        categorySlug: "education",
        tags: ["Exams", "Access", "Evidence"],
        intro:
          "Exam arrangements can include extra time, rest breaks, assistive technology, a reader, a scribe, modified papers, or a separate room. The right setup depends on what barrier the exam creates.",
        steps: [
          "Ask early, because deadlines can be much earlier than the exam.",
          "Explain the functional barrier, not only the diagnosis.",
          "Check practical details like room access, toilet access, and medication.",
          "Ask for a trial run if equipment or software is involved.",
        ],
      },
      {
        slug: "transport-to-education",
        title: "Transport to school, college, or university",
        categorySlug: "education",
        tags: ["Transport", "Education", "Planning"],
        intro:
          "Accessible education is not only about the classroom. If transport is unreliable, unsafe, or inaccessible, attendance and energy can fall apart quickly.",
        steps: [
          "Record the transport barrier and how it affects attendance.",
          "Ask who is responsible: council, school, college, university, or provider.",
          "Check wheelchair access, passenger assistance, escorts, and backup plans.",
          "Keep a log when transport fails.",
        ],
      },
      {
        slug: "choosing-a-wheelchair",
        title: "Choosing a wheelchair: what to check before you commit",
        categorySlug: "equipment",
        tags: ["Wheelchairs", "Mobility", "Setup"],
        intro:
          "A wheelchair is not just a seat with wheels. Fit, posture, terrain, transport, storage, pain, fatigue, and daily routine all matter.",
        steps: [
          "List where the chair must work: home, pavements, car, work, school, venues.",
          "Check seat width, depth, cushion, footplates, armrests, and posture.",
          "Think about fatigue, pain, pushing distance, hills, and weather.",
          "Ask about repairs, warranty, servicing, and temporary backup.",
        ],
      },
      {
        slug: "nhs-wheelchair-services-equipment",
        title: "NHS wheelchair services: referral and what to expect",
        categorySlug: "equipment",
        tags: ["NHS", "Wheelchairs", "Referral"],
        intro:
          "NHS wheelchair services vary by area, but the core process usually involves referral, assessment, eligibility, prescription, provision, and review.",
        steps: [
          "Ask your GP, occupational therapist, physiotherapist, or consultant about referral routes.",
          "Prepare examples of daily mobility barriers.",
          "Take measurements, photos, or notes if home access is part of the issue.",
          "Ask how repairs and urgent breakdowns are handled locally.",
        ],
      },
      {
        slug: "home-equipment-and-adaptations",
        title: "Home equipment and adaptations: start with the task",
        categorySlug: "equipment",
        tags: ["Home", "Adaptations", "OT"],
        intro:
          "Good equipment starts with the real task: washing, toileting, cooking, transferring, getting in and out, sleeping, or moving safely around the home.",
        steps: [
          "Write down the task that is unsafe or impossible.",
          "Ask for an occupational therapy assessment if needed.",
          "Check whether a small item, major adaptation, or care support is the real solution.",
          "Do not buy expensive equipment before checking fit, safety, and funding routes.",
        ],
      },
      {
        slug: "pressure-care-basics",
        title: "Pressure care basics for wheelchair users",
        categorySlug: "equipment",
        tags: ["Pressure care", "Wheelchairs", "Safety"],
        intro:
          "Pressure care is about reducing skin damage risk from sitting or lying in one position. Cushions, posture, transfers, nutrition, pain, sensation, and routine all matter.",
        steps: [
          "Get professional advice if there is redness, broken skin, swelling, heat, or pain.",
          "Check the cushion is right for the chair and the person.",
          "Review posture and transfer technique.",
          "Build pressure relief into the day in a way the person can actually follow.",
        ],
      },
      {
        slug: "assistive-tech-at-home",
        title: "Assistive tech at home: useful, low-fuss options",
        categorySlug: "equipment",
        tags: ["Tech", "Home", "Independence"],
        intro:
          "Assistive tech does not have to mean expensive specialist equipment. Phone settings, smart plugs, voice control, reminders, video doorbells, and simple sensors can reduce daily friction.",
        steps: [
          "Pick one repeated problem, not ten gadgets at once.",
          "Check privacy, reliability, and whether someone can troubleshoot it.",
          "Keep manual backup routes for lights, doors, heating, and medication.",
          "Review whether the tech reduces effort or creates more admin.",
        ],
      },
      {
        slug: "mobility-aids-before-you-buy",
        title: "Mobility aids: questions before buying privately",
        categorySlug: "equipment",
        tags: ["Mobility aids", "Buying", "Safety"],
        intro:
          "Walking sticks, rollators, scooters, ramps, and transfer aids can help, but the wrong item can increase falls, pain, or wasted money.",
        steps: [
          "Ask what problem the aid is meant to solve.",
          "Check size, weight, braking, storage, turning space, and transport.",
          "Try it in the environment where it will actually be used.",
          "Ask a professional if balance, falls, transfers, or fatigue are involved.",
        ],
      },
      {
        slug: "first-30-days-disabled",
        title: "First 30 days: a practical route through the overwhelm",
        categorySlug: "new-to-disability",
        tags: ["Starting point", "Planning", "Support"],
        intro:
          "The first stage can feel like everything needs solving at once. It helps to split the work into safety, paperwork, support routes, and one or two immediate priorities.",
        steps: [
          "Make a short list of what is unsafe or impossible today.",
          "Collect letters, discharge notes, medication lists, and appointment details.",
          "Start a diary of access barriers and support needs.",
          "Ask for help with one process at a time.",
        ],
      },
      {
        slug: "newly-disabled-paperwork",
        title: "Paperwork when you are newly disabled",
        categorySlug: "new-to-disability",
        tags: ["Paperwork", "Evidence", "Admin"],
        intro:
          "A basic paperwork system saves energy later. You do not need perfection, just enough structure to find evidence when services, benefits, work, school, or housing ask for it.",
        steps: [
          "Create folders for medical, benefits, care, work or education, housing, and equipment.",
          "Keep dates, names, reference numbers, and summaries of calls.",
          "Save photos or notes showing daily barriers.",
          "Ask for decisions in writing.",
        ],
      },
      {
        slug: "talking-to-services",
        title: "Talking to services: what to say and what to ask",
        categorySlug: "new-to-disability",
        tags: ["Services", "Appointments", "Advocacy"],
        intro:
          "Services can be hard to navigate because each one only sees part of the picture. A clear summary helps you explain what is happening without retelling everything from scratch.",
        steps: [
          "Start with what changed and what support is needed now.",
          "Ask who is responsible for the next action.",
          "Ask when you should hear back and what to do if you do not.",
          "Send a short follow-up message confirming what was agreed.",
        ],
      },
      {
        slug: "home-access-quick-check",
        title: "Home access quick check",
        categorySlug: "new-to-disability",
        tags: ["Home", "Safety", "Access"],
        intro:
          "A home access check looks at whether daily tasks can happen safely: entering, washing, toileting, cooking, sleeping, transferring, storing equipment, and leaving in an emergency.",
        steps: [
          "Check entrance, bathroom, bedroom, kitchen, and main route through the home.",
          "Note steps, narrow doors, tight turns, loose rugs, poor lighting, and transfer risks.",
          "Separate quick fixes from adaptations that need assessment.",
          "Ask for an occupational therapy assessment where safety is affected.",
        ],
      },
      {
        slug: "family-support-after-disability",
        title: "Family support when needs change",
        categorySlug: "new-to-disability",
        tags: ["Family", "Carers", "Communication"],
        intro:
          "Family and friends often want to help but may not know how. Clear roles, boundaries, and realistic expectations reduce conflict and burnout.",
        steps: [
          "Name practical tasks that would help, not just general support.",
          "Agree what the disabled person wants handled privately.",
          "Avoid unsafe lifting or care tasks without training.",
          "Build in rest for carers and the person receiving support.",
        ],
      },
      {
        slug: "confidence-outside-home",
        title: "Getting confidence outside the home again",
        categorySlug: "new-to-disability",
        tags: ["Confidence", "Access", "Planning"],
        intro:
          "Going out after a big change can involve access, fatigue, pain, toileting, transport, confidence, and other people's reactions. Planning can reduce the load.",
        steps: [
          "Choose one low-pressure place with a clear exit plan.",
          "Check toilets, parking, step-free access, distance, seating, and quiet space.",
          "Take what you need for comfort, medication, battery, or repairs.",
          "Review what worked and adjust the next trip.",
        ],
      },
    ] as const
  ).map(({ slug, title, categorySlug, tags, intro, steps }) => ({
    slug,
    title,
    categorySlug,
    updated: "2026-05-05",
    tags: [...tags],
    sections: [
      { type: "h2" as const, text: "What this covers" },
      { type: "p" as const, text: intro },
      { type: "h2" as const, text: "Practical next steps" },
      { type: "ul" as const, items: [...steps] },
      {
        type: "callout" as const,
        tone: "tip" as const,
        title: "Access Stamp tip",
        body: "Write the barrier down in plain language: what happens, when it happens, what support helps, and what risk or cost appears if nothing changes.",
      },
      {
        type: "callout" as const,
        tone: "warning" as const,
        title: "Important",
        body: "This guide is general information, not medical or legal advice. For safety-critical equipment, transfers, skin issues, or legal deadlines, get specialist support.",
      },
    ],
  })),
];

export const GLOSSARY: Array<{ term: string; meaning: string }> = [
  { term: "Access to Work", meaning: "A UK government scheme that can fund workplace adjustments and support." },
  { term: "Blue Badge", meaning: "Parking permit for disabled people that allows use of designated bays and concessions." },
  { term: "Changing Places", meaning: "A larger accessible toilet with hoist and adult changing bench." },
  { term: "DSA", meaning: "Disabled Students’ Allowance. Support for higher education related study needs." },
  { term: "EHC Plan", meaning: "Education, Health and Care plan for children and young people with additional needs." },
  { term: "PIP", meaning: "Personal Independence Payment. A benefit to help with extra costs of disability." },
];
