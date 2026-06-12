import type { AdviceArticle } from "@/lib/content/types";
import { ADVICE_CATEGORIES } from "@/lib/advice-topics";

export { ADVICE_CATEGORIES };
import { ADVICE_EXTRA_SEEDS } from "@/lib/advice-extra-seeds";
import { PRACTICAL_GUIDE_ARTICLES } from "@/lib/practical-guides-articles";
import { CARE_ARTICLES_DETAILED } from "@/lib/care-articles-detail";
import { EQUIPMENT_ARTICLES_DETAILED } from "@/lib/equipment-articles-detail";
import { RIGHTS_ARTICLES_DETAILED } from "@/lib/rights-articles-detail";
import { TRAVEL_ARTICLES_DETAILED } from "@/lib/travel-articles-detail";

export type { Venue } from "@/lib/venue-legacy";
export { SAMPLE_VENUES } from "@/lib/venue-legacy";


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

export type { AdviceArticle };

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
  ...PRACTICAL_GUIDE_ARTICLES,
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
  { term: "Access to Work", meaning: "A UK government scheme that can fund workplace adjustments, equipment, and support workers for disabled employees or self-employed people." },
  { term: "Accessible toilet", meaning: "A toilet designed for wheelchair users, typically with grab rails, enough turning space, and an emergency alarm cord. Not the same as a Changing Places toilet." },
  { term: "Advocacy", meaning: "Professional support to help a person express their views, access services, or challenge decisions — often available free through local organisations." },
  { term: "Assistive technology (AT)", meaning: "Any device or software that helps a disabled person perform tasks — from screen readers and switch access to powered wheelchairs and communication aids." },
  { term: "Attendance Allowance", meaning: "A tax-free benefit for people over State Pension age who need help with personal care or supervision because of a disability or illness." },
  { term: "Blue Badge", meaning: "A parking permit for disabled people that allows use of designated bays, on-street parking concessions, and exemptions from some restrictions across the UK." },
  { term: "BSL", meaning: "British Sign Language. A visual language used by many Deaf people in the UK, recognised as a language in its own right since 2022." },
  { term: "Carer’s Allowance", meaning: "A weekly benefit for people who spend at least 35 hours a week caring for someone receiving certain disability benefits." },
  { term: "Changing Places", meaning: "A larger accessible toilet with a ceiling hoist, height-adjustable changing bench, and enough space for the disabled person plus up to two carers. Much rarer than standard accessible toilets." },
  { term: "Direct Payment", meaning: "Money from the local authority given directly to a disabled person (or their representative) so they can arrange and pay for their own care and support." },
  { term: "Disabled Facilities Grant (DFG)", meaning: "A local authority grant of up to £30,000 (England) to fund home adaptations such as ramps, stairlifts, wet rooms, and door widening." },
  { term: "Disabled Students’ Allowance (DSA)", meaning: "Funding for UK higher education students with a disability, long-term health condition, or specific learning difficulty, covering equipment, support workers, and travel." },
  { term: "EAA", meaning: "European Accessibility Act. EU directive (coming into force June 2025) requiring key products and services to be accessible. Affects UK businesses that trade in the EU." },
  { term: "EHC Plan", meaning: "Education, Health and Care plan. A legal document for children and young people (0–25) with special educational needs, setting out the support they must receive." },
  { term: "Equality Act 2010", meaning: "The main UK law protecting disabled people from discrimination. It requires service providers and employers to make ‘reasonable adjustments’." },
  { term: "Hidden disability", meaning: "A disability that is not immediately visible — such as chronic pain, autism, epilepsy, mental health conditions, or inflammatory bowel disease." },
  { term: "Induction loop", meaning: "An assistive listening system that transmits sound directly to hearing aids set to the ‘T’ (telecoil) position. Common in reception desks, theatres, and ticket offices." },
  { term: "Level access", meaning: "An entrance or route with no steps — either completely flat or with a gentle ramp (ideally 1:20 gradient or shallower)." },
  { term: "Motability", meaning: "A UK scheme that lets eligible disabled people lease a new car, scooter, or powered wheelchair using their higher-rate mobility benefit." },
  { term: "NHS wheelchair services", meaning: "Local NHS teams that assess, provide, and maintain wheelchairs. Waiting times and what they provide vary widely by area." },
  { term: "Occupational therapist (OT)", meaning: "A health professional who assesses daily living needs and recommends equipment, adaptations, and techniques to maintain independence." },
  { term: "PIP", meaning: "Personal Independence Payment. A tax-free benefit for people aged 16 to State Pension age who have a long-term health condition or disability. Assessed on how your condition affects you, not the condition itself." },
  { term: "Radar key", meaning: "A universal key that opens locked accessible toilets across the UK under the National Key Scheme. Available for around £6 from Disability Rights UK." },
  { term: "Reasonable adjustment", meaning: "A change that a service provider, employer, or school must make under the Equality Act to remove barriers for disabled people — unless it’s not reasonably practicable." },
  { term: "Respite / short breaks", meaning: "Temporary care that gives the usual carer a break. Can be provided at home, in a care setting, or through a holiday scheme." },
  { term: "Sensory room", meaning: "A controlled environment designed for people with sensory processing differences — often featuring soft lighting, projectors, tactile surfaces, and calming sounds." },
  { term: "Social care assessment", meaning: "A free assessment by the local authority to determine what care and support a person needs and what the council will fund under the Care Act 2014." },
  { term: "Sunflower lanyard", meaning: "A green lanyard with sunflower print worn to indicate a hidden disability. Recognised by many shops, airports, and transport providers across the UK." },
  { term: "Transfer", meaning: "Moving from one seated position to another — for example, from a wheelchair to a car seat, toilet, or bed. Technique varies by mobility level." },
  { term: "Turning circle", meaning: "The space a wheelchair needs to make a full 180° or 360° turn. A standard manual chair needs roughly 1500 mm diameter; powered chairs and scooters need more." },
  { term: "WAV", meaning: "Wheelchair Accessible Vehicle. A car or minibus adapted with a ramp or lift and floor-mounted wheelchair restraints, allowing a person to travel seated in their wheelchair." },
];
