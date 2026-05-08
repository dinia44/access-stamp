import { ADVICE_EXTRA_SEEDS } from "@/lib/advice-extra-seeds";
import { CARE_ARTICLES_DETAILED } from "@/lib/care-articles-detail";
import { EQUIPMENT_ARTICLES_DETAILED } from "@/lib/equipment-articles-detail";
import { RIGHTS_ARTICLES_DETAILED } from "@/lib/rights-articles-detail";
import { TRAVEL_ARTICLES_DETAILED } from "@/lib/travel-articles-detail";

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
  photos?: Array<{
    src: string;
    alt: string;
    label: string;
    measurement?: string;
  }>;
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
    photos: [
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070383/harbour-overview_xhnawl.png",
        alt: "Harbour Kitchen front view and outdoor approach",
        label: "Venue overview",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070411/harbour-entrance_xkan6a.png",
        alt: "Harbour Kitchen main entrance with step-free approach",
        label: "Entrance",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070373/harbour-doorway_c14mq8.png",
        alt: "Doorway opening at Harbour Kitchen with width measurement arrow",
        label: "Doorway",
        measurement: "Door width measured: 92cm",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070380/harbour-bathroom_rqjprt.png",
        alt: "Accessible toilet at Harbour Kitchen",
        label: "Bathroom",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070402/harbour-layout_trxskl.png",
        alt: "Internal seating and turning space at Harbour Kitchen",
        label: "Inside layout",
        measurement: "Turning circle shown: 150cm+",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070410/harbour-parking_asmpkh.png",
        alt: "Nearby parking and approach route for Harbour Kitchen",
        label: "Parking",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070408/harbour-quiet-corner_hvj1k5.png",
        alt: "Quieter seating corner inside Harbour Kitchen",
        label: "Quiet corner",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070381/harbour-staff-desk_jwbn6y.png",
        alt: "Service desk and staff assistance point at Harbour Kitchen",
        label: "Staff desk",
      },
      {
        src: "https://res.cloudinary.com/dnjaoqv42/image/upload/q_auto/f_auto/v1778070404/harbour-report-collage_h519nm.png",
        alt: "Combined venue accessibility visual report for Harbour Kitchen",
        label: "Full report",
      },
    ],
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
  {
    slug: "botanical-gardens-manchester",
    name: "Botanical Gardens",
    location: "Manchester, M2",
    type: "Outdoor",
    rating: 4.6,
    summary:
      "Mostly step-free garden routes with several level resting zones. Accessible toilet available near the main visitor centre.",
    tags: ["Outdoor routes", "Rest points", "Accessible toilet"],
    verification: "Access Stamp checked",
    lastUpdated: "May 2026",
    confidence: "High",
    features: {
      "Step-free entrance": "yes",
      "Ramp access": "yes",
      "Automatic doors": "unknown",
      "Wide doorways (80cm+)": "yes",
      "Turning space (150cm+)": "yes",
      "Accessible toilet": "yes",
      "Changing Places toilet": "no",
      "Nearby Blue Badge parking": "yes",
      "Lift access": "unknown",
      "Quiet environment": "yes",
      "Staff disability awareness": "yes",
    },
  },
  {
    slug: "gluckberry-woods-cafe-liverpool",
    name: "Gluckberry Woods Cafe",
    location: "Liverpool, L2",
    type: "Café",
    rating: 4.5,
    summary:
      "Step-free front entrance, flexible seating layout, and practical access details for wheelchair users and carers.",
    tags: ["Step-free", "Flexible seating", "Blue Badge nearby"],
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
      "Quiet environment": "yes",
      "Staff disability awareness": "unknown",
    },
  },
];

const EDUCATION_ARTICLE_OVERRIDES: Record<string, Pick<AdviceArticle, "heroImage" | "sections" | "tags" | "updated">> = {
  "dsa-disabled-students-allowance": {
    updated: "2026-05-07",
    tags: ["DSA", "University", "Funding", "Needs assessment"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
      alt: "University student using an adapted laptop at a desk",
    },
    sections: [
      { type: "h2", text: "What DSA can fund in practice" },
      {
        type: "p",
        text: "Disabled Students' Allowance can fund specialist software, ergonomic equipment, mentoring, note-taking support, and disability-related travel costs. It does not replace general living costs or standard tuition support.",
      },
      { type: "h2", text: "What to prepare before applying" },
      {
        type: "ul",
        items: [
          "Evidence of disability or long-term condition (GP/consultant/diagnostic letter).",
          "A short barrier summary: what part of study is hard, where, and why.",
          "Current course details and university disability service contact.",
          "Any existing adjustment letters or support plans.",
        ],
      },
      { type: "h2", text: "Needs assessment meeting: what to ask" },
      {
        type: "ul",
        items: [
          "What recommendations address my core barriers first?",
          "What is funded by DSA vs what the university should provide?",
          "What are realistic delivery timelines for equipment and support workers?",
          "What fallback support exists if implementation is delayed?",
        ],
      },
      {
        type: "callout",
        tone: "steps",
        title: "Fast action checklist",
        body: "1) Apply early. 2) Prepare barrier notes before assessment. 3) Ask for written recommendations. 4) Share recommendations with disability services immediately. 5) Track delivery dates.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "If term starts and support is missing, ask for interim adjustments in writing the same day.",
      },
    ],
  },
  "ehc-plan-basics": {
    updated: "2026-05-07",
    tags: ["EHC plan", "School", "SEND", "Family"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
      alt: "Parent and child reviewing school paperwork together",
    },
    sections: [
      { type: "h2", text: "What makes an EHC plan enforceable" },
      {
        type: "p",
        text: "A useful EHC plan is specific: it names support, frequency, setting, staff responsibilities, and outcomes. Vague wording often leads to weak delivery and difficult challenge.",
      },
      { type: "h2", text: "Key checks in meetings" },
      {
        type: "ul",
        items: [
          "Does each need have a clearly matched provision?",
          "Is provision quantified (hours, sessions, staffing)?",
          "Are outcomes measurable and time-bound?",
          "Are transport, therapies, and exam support covered where needed?",
        ],
      },
      { type: "h2", text: "After each review" },
      {
        type: "ul",
        items: [
          "Send your own written summary of agreed actions.",
          "Ask for named owners and deadlines.",
          "Track what was promised versus delivered.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Parent strategy",
        body: "Keep one timeline file: meetings, decisions, missed support, and school communications. This is essential if you need to escalate.",
      },
    ],
  },
  "reasonable-adjustments-at-school": {
    updated: "2026-05-07",
    tags: ["Adjustments", "School", "College", "Equality Act"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      alt: "Accessible classroom layout with adjustable desks",
    },
    sections: [
      { type: "h2", text: "Reasonable adjustments that commonly help" },
      {
        type: "ul",
        items: [
          "Alternative timetables, movement breaks, and fatigue pacing.",
          "Accessible classroom seating and equipment setup.",
          "Communication adjustments (written instructions, processing time).",
          "Toilet/medical access plans that avoid dignity issues.",
        ],
      },
      { type: "h2", text: "How to phrase requests" },
      {
        type: "p",
        text: "Describe barrier → impact → adjustment requested → expected outcome. Keep requests practical and linked to learning/safety impact.",
      },
      {
        type: "callout",
        tone: "steps",
        title: "Template",
        body: "Barrier: [what happens]. Impact: [attendance/learning/safety]. Request: [specific adjustment]. Review date: [date].",
      },
      {
        type: "callout",
        tone: "warning",
        title: "If support is not delivered",
        body: "Request written reasons, ask for urgent interim support, and escalate through school complaints route with evidence timeline.",
      },
    ],
  },
  "university-support-plan": {
    updated: "2026-05-07",
    tags: ["University", "Support plan", "Adjustments", "DSA"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      alt: "University campus with accessible pathways",
    },
    sections: [
      { type: "h2", text: "What a strong support plan includes" },
      {
        type: "ul",
        items: [
          "Lecture delivery adjustments and attendance flexibility.",
          "Assessment and deadline adjustments with escalation route.",
          "Placement/field trip access requirements.",
          "Accommodation and campus route accessibility actions.",
        ],
      },
      { type: "h2", text: "First month checks" },
      {
        type: "ul",
        items: [
          "Are all departments aware of support plan commitments?",
          "Is DSA-recommended kit/support active yet?",
          "Do you have one named contact for urgent failures?",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Keep pressure low",
        body: "Ask for one email thread that tracks unresolved adjustments and deadlines. This prevents repeated retelling.",
      },
    ],
  },
};

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
  heroImage?: {
    src: string;
    alt: string;
  };
  sections: Array<
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "pre"; text: string }
    | { type: "callout"; tone: "warning" | "tip" | "contact" | "steps"; title: string; body: string }
  >;
};

const BASE_ADVICE_ARTICLES: AdviceArticle[] = [
  {
    slug: "pip-in-plain-english",
    title: "PIP in plain English (what it is, who it’s for, what to do next)",
    categorySlug: "new-to-disability",
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
  ...RIGHTS_ARTICLES_DETAILED,
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
  ...EQUIPMENT_ARTICLES_DETAILED,
  ...CARE_ARTICLES_DETAILED,
  ...TRAVEL_ARTICLES_DETAILED,
  ...ADVICE_EXTRA_SEEDS.map(({ slug, title, categorySlug, tags, intro, steps }) => ({
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

export const ADVICE_ARTICLES: AdviceArticle[] = BASE_ADVICE_ARTICLES.map((article) => {
  const override = EDUCATION_ARTICLE_OVERRIDES[article.slug];
  if (!override) return article;
  return {
    ...article,
    ...override,
    tags: [...override.tags],
    sections: [...override.sections],
  };
});

export const GLOSSARY: Array<{ term: string; meaning: string }> = [
  { term: "Access to Work", meaning: "A UK government scheme that can fund workplace adjustments and support." },
  { term: "Blue Badge", meaning: "Parking permit for disabled people that allows use of designated bays and concessions." },
  { term: "Changing Places", meaning: "A larger accessible toilet with hoist and adult changing bench." },
  { term: "DSA", meaning: "Disabled Students’ Allowance. Support for higher education related study needs." },
  { term: "EHC Plan", meaning: "Education, Health and Care plan for children and young people with additional needs." },
  { term: "PIP", meaning: "Personal Independence Payment. A benefit to help with extra costs of disability." },
];
