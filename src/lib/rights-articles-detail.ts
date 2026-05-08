import type { AdviceArticle } from "@/lib/mock-data";

type RightsSeed = {
  slug: string;
  title: string;
  categorySlug?: AdviceArticle["categorySlug"];
  tags: string[];
  intro: string;
  checks: string[];
  actions: string[];
  warning: string;
  customSections?: AdviceArticle["sections"];
};

function buildRightsSections(seed: RightsSeed): AdviceArticle["sections"] {
  if (seed.customSections?.length) return seed.customSections;
  return [
    { type: "h2", text: "What this means in real life" },
    { type: "p", text: seed.intro },
    { type: "h2", text: "What to check before you act" },
    { type: "ul", items: seed.checks },
    { type: "h2", text: "What to do next (without overwhelm)" },
    { type: "ul", items: seed.actions },
    {
      type: "callout",
      tone: "steps",
      title: "One sentence you can use",
      body: `“I’m requesting support on ${seed.title.toLowerCase()} because this is affecting my day-to-day independence and safety. Please confirm the correct process, required evidence, and response timeline in writing.”`,
    },
    {
      type: "callout",
      tone: "tip",
      title: "Practical tip",
      body: "Keep one simple timeline: date, who you spoke to, what was promised, what actually happened, and how it affected daily life.",
    },
    {
      type: "callout",
      tone: "warning",
      title: "Important",
      body: seed.warning,
    },
  ];
}

const RIGHTS_SEEDS: RightsSeed[] = [
  {
    slug: "blue-badge",
    title: "Blue Badge: eligibility, applying, and using it",
    categorySlug: "cars",
    tags: ["Blue Badge", "Parking", "Local council"],
    intro: "Blue Badge rules are national framework plus local administration. Most problems come from weak evidence, unclear mobility impact, or misunderstanding where the badge can be used.",
    checks: [
      "Confirm current eligibility routes (automatic and non-automatic) on your local council page.",
      "Prepare evidence showing walking distance, pain/fatigue, safety risk, and variability.",
      "Check local misuse enforcement and renewal timing.",
    ],
    actions: [
      "Write a short impact statement using real examples from recent weeks.",
      "Upload clear supporting evidence in one bundle.",
      "If refused, request reasons in writing and use review/appeal route promptly.",
    ],
    warning: "Blue Badge misuse can lead to fines or prosecution. Use only in line with current guidance.",
  },
  {
    slug: "motability",
    title: "Motability scheme: how it works",
    categorySlug: "cars",
    tags: ["Motability", "Cars", "Mobility support"],
    intro: "Motability can exchange qualifying mobility benefit components for a leased vehicle, scooter, or powered wheelchair package with servicing and insurance included.",
    checks: [
      "Confirm benefit eligibility and remaining award length.",
      "Compare advance payments and running-cost implications.",
      "Check adaptations, named drivers, and mileage limits before ordering.",
    ],
    actions: [
      "List your non-negotiable access needs before choosing model.",
      "Ask dealer to confirm adaptation lead times in writing.",
      "Review scheme-end return options early to avoid last-minute pressure.",
    ],
    warning: "Scheme rules and pricing change over time; rely on current Motability and DWP guidance.",
  },
  {
    slug: "vehicle-tax-exemption",
    title: "Vehicle tax exemption and reductions",
    categorySlug: "cars",
    tags: ["Vehicle tax", "DVLA", "Benefits"],
    intro: "Some disabled drivers or passengers can claim vehicle tax exemption or reduction if qualifying benefits and vehicle registration conditions are met.",
    checks: [
      "Verify which benefit rate qualifies for full exemption vs reduction.",
      "Check whose name the vehicle must be registered in.",
      "Confirm evidence and renewal process with DVLA guidance.",
    ],
    actions: [
      "Gather benefit letter and V5C details before applying.",
      "Use the correct application route for first claim and renewals.",
      "Keep copies of all submissions and acknowledgement references.",
    ],
    warning: "Incorrect claims can trigger backdated charges and penalties.",
  },
  {
    slug: "parking-rights",
    title: "Parking rights and enforcement (what to do when it goes wrong)",
    categorySlug: "cars",
    tags: ["Parking", "Enforcement", "Appeals"],
    intro: "Disabled parking disputes are often won on evidence quality: signage, bay layout, permit visibility, and procedural fairness.",
    checks: [
      "Identify whether the ticket is council, private, or police route.",
      "Collect photos of signage, bay markings, machine faults, and timing.",
      "Check deadlines for representations and appeals.",
    ],
    actions: [
      "Submit one concise chronology with evidence attachments.",
      "Request discretionary cancellation where disability impact was ignored.",
      "Escalate to formal tribunal/appeal channels if initial rejection is weak.",
    ],
    warning: "Do not ignore notices while disputing; missed deadlines reduce options.",
  },
  {
    slug: "wavs",
    title: "Wheelchair Accessible Vehicles (WAVs): options and costs",
    categorySlug: "cars",
    tags: ["WAV", "Vehicle adaptations", "Wheelchair transport"],
    intro: "A WAV must fit your chair, transfer method, tie-down requirements, and routine routes. The wrong layout can be expensive and unsafe.",
    checks: [
      "Measure chair footprint, occupant height, and ramp/entry clearance.",
      "Confirm restraint system type and crash-tested positions.",
      "Compare new vs used WAV warranty and servicing coverage.",
    ],
    actions: [
      "Request real-world demo with your own chair before deciding.",
      "Get written quote including all adaptation and maintenance costs.",
      "Plan contingency if the WAV is off-road for repairs.",
    ],
    warning: "Vehicle safety setup should always follow trained specialist guidance.",
  },
  {
    slug: "licence-conditions",
    title: "Licence conditions and driving adaptations",
    categorySlug: "cars",
    tags: ["DVLA", "Driving", "Adaptations"],
    intro: "Medical conditions can trigger licence notifications and potential driving restrictions. Early disclosure and proper assessment protect you legally and safely.",
    checks: [
      "Check if your condition must be reported to DVLA now.",
      "Review any existing licence codes/conditions.",
      "Assess whether hand controls or other adaptations are needed.",
    ],
    actions: [
      "Submit required DVLA notifications with supporting medical info.",
      "Arrange specialist driving assessment where needed.",
      "Notify insurer of any relevant diagnosis/adaptation changes.",
    ],
    warning: "Driving without required disclosure can invalidate insurance and expose you to legal risk.",
  },
  {
    slug: "driving-adaptations-products-library",
    title: "Driving adaptations and products library: what exists and who it helps",
    categorySlug: "cars",
    tags: ["Driving adaptations", "Products", "Cars", "Mobility"],
    intro: "Most people only hear about one or two adaptation options. In reality there are many products for steering, braking, transfers, seating, storage, loading wheelchairs, and reducing pain/fatigue while driving.",
    checks: [],
    actions: [],
    warning: "Wrongly specified adaptations can create serious safety risk. Always use qualified assessors and approved installers.",
    customSections: [
      { type: "h2", text: "What this means in real life" },
      {
        type: "p",
        text: "Most people are shown one adaptation and asked to make it work. A better approach is to start with your real barrier (for example pain when steering, unsafe transfers, or struggling to load equipment) and match products to that barrier.",
      },
      { type: "h2", text: "Controls for hands, feet, and steering" },
      {
        type: "ul",
        items: [
          "Hand controls: push/pull, radial, and over-ring systems for accelerator and brake.",
          "Left-foot accelerators and pedal guards where right-foot control is limited.",
          "Steering aids: spinner knobs, tri-pins, reduced-effort steering options.",
          "Secondary controls: indicators, lights, and wipers remapped to easier positions.",
        ],
      },
      { type: "h2", text: "Transfers, seating, and driving position" },
      {
        type: "ul",
        items: [
          "Transfer plates and grab solutions for safer seat-to-seat movement.",
          "Swivel/turning seats and six-way/eight-way powered seat systems.",
          "Custom cushions, lumbar support, and posture supports for longer trips.",
          "Head/neck positioning and fatigue-reduction setup for pain management.",
        ],
      },
      { type: "h2", text: "Loading and carrying wheelchairs or scooters" },
      {
        type: "ul",
        items: [
          "Boot hoists/lifts/cranes for manual wheelchairs and scooters.",
          "Roof loading systems for lighter chairs where suitable.",
          "Platform lifts and docking systems for larger powered equipment.",
          "Tie-down and restraint systems for vehicles carrying occupied wheelchairs.",
        ],
      },
      { type: "h2", text: "Safety and visibility tech" },
      {
        type: "ul",
        items: [
          "Mirror/camera assists and blind-spot support for limited neck movement.",
          "Parking sensors and reversing support for safer low-speed manoeuvres.",
          "Voice-activated controls for reduced hand strain in traffic.",
          "Backup power and charging planning for powered access equipment.",
        ],
      },
      { type: "h2", text: "What to check before spending money" },
      {
        type: "ul",
        items: [
          "Start with a specialist driving assessment before choosing products.",
          "Check compatibility with your specific vehicle model and daily routes.",
          "Confirm insurance and DVLA notification requirements in writing.",
          "Test in real-world conditions, not only a short demo.",
          "Get servicing plans, warranty terms, and failure contingency details.",
        ],
      },
      { type: "h2", text: "What to do next (without overwhelm)" },
      {
        type: "ul",
        items: [
          "Make a two-column list: “what is hard now” and “possible adaptation”.",
          "Shortlist 2 to 3 adaptation packages (not 20 products).",
          "Book trial/assessment with your transfer method and wheelchair setup.",
          "Confirm final specification, training, and handover paperwork before install.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Practical tip",
        body: "Take photos of your current transfer/load process before assessment. It helps assessors recommend what will actually work for your real routine.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Wrongly specified adaptations can create serious safety risk. Always use qualified assessors and approved installers.",
      },
    ],
  },
  {
    slug: "dfg",
    title: "Disabled Facilities Grant (DFG): what it covers and how to apply",
    categorySlug: "equipment",
    tags: ["DFG", "Housing", "Adaptations"],
    intro: "DFG can support major home adaptations where they are necessary and appropriate, but timelines are often long due to assessment, approvals, and contractor capacity.",
    checks: [
      "Confirm local DFG process and current cap/eligibility details.",
      "Secure OT recommendations that match real functional barriers.",
      "Check landlord/leaseholder permissions where required.",
    ],
    actions: [
      "Start with a written barrier list and photos.",
      "Track every stage: referral, assessment, quote, approval, install.",
      "Escalate delays in writing when risk or hospital discharge is affected.",
    ],
    warning: "Rules differ across UK nations; always verify with your local authority.",
  },
  {
    slug: "council-housing-priority",
    title: "Council housing priority and the medical needs process",
    tags: ["Council housing", "Medical priority", "Allocations"],
    intro: "Medical priority decisions rely on allocations policy wording and evidence of unsuitability of current accommodation.",
    checks: [
      "Read your council allocations policy and banding criteria.",
      "Evidence specific risk: stairs, toileting barriers, transfer hazards, isolation.",
      "Check review rights and timescales after banding decision.",
    ],
    actions: [
      "Submit a focused medical impact statement with professional evidence.",
      "Request review quickly if priority is refused/too low.",
      "Keep bid history and missed opportunities documented.",
    ],
    warning: "Housing lists can be long even with priority; keep parallel options active.",
  },
  {
    slug: "equipment-through-social-services",
    title: "Getting equipment through social services",
    tags: ["Social care", "Equipment", "OT"],
    intro: "Local authorities may provide loan equipment after assessment. Clarity on ownership, maintenance, and review route prevents avoidable breakdowns.",
    checks: [
      "Confirm assessment criteria and expected waiting times.",
      "Check whether equipment is loaned or permanently provided.",
      "Identify repair and replacement pathways before delivery.",
    ],
    actions: [
      "Document unsafe tasks and near-misses before assessment.",
      "Ask for interim support if delay creates immediate risk.",
      "Request review if needs change or equipment no longer fits function.",
    ],
    warning: "For complex transfer or pressure care risks, seek clinical guidance alongside social care routes.",
  },
  {
    slug: "adapting-a-rented-property",
    title: "Adapting a rented property: your rights and the process",
    tags: ["Renting", "Adaptations", "Landlord"],
    intro: "Renters often need both disability evidence and landlord consent structures. Early communication and written records are essential.",
    checks: [
      "Review tenancy terms and adaptation clauses.",
      "Confirm what needs landlord consent vs minor removable aids.",
      "Identify who funds installation and reinstatement if required.",
    ],
    actions: [
      "Send a written adaptation request with OT rationale where available.",
      "Propose practical options and contractor safeguards.",
      "Escalate unreasonable refusal through advice/legal channels.",
    ],
    warning: "Legal rights depend on tenancy type and jurisdiction; seek specialist housing advice for disputes.",
  },
  {
    slug: "smart-home",
    title: "Smart home and assistive tech for independence",
    tags: ["Assistive tech", "Smart home", "Independence"],
    intro: "Good assistive tech removes one repeated barrier reliably; poor setup adds cognitive load and failure points.",
    checks: [
      "Start with a single high-impact task to automate.",
      "Ensure backup manual options for power/internet failure.",
      "Check privacy settings and account-sharing boundaries.",
    ],
    actions: [
      "Pilot one tool for two weeks before expanding.",
      "Document setup steps for carers/family backups.",
      "Keep firmware/app updates managed to avoid silent breakage.",
    ],
    warning: "Tech does not replace emergency medical/safeguarding responses.",
  },
  {
    slug: "housing-register",
    title: "Housing register basics and realistic timelines",
    tags: ["Housing register", "Allocations", "Planning"],
    intro: "Housing register outcomes depend on policy, local stock, and competition in your band/bedroom need category.",
    checks: [
      "Confirm your band, bedroom entitlement, and local connection rules.",
      "Track typical waiting outcomes in your area where published.",
      "Understand what evidence can trigger a reassessment.",
    ],
    actions: [
      "Keep application details updated immediately after change.",
      "Bid consistently and keep records of failed bids.",
      "Use support agencies if paperwork/admin barriers are high.",
    ],
    warning: "Registering alone is not a guarantee of quick rehousing.",
  },
  {
    slug: "uc-lcwra",
    title: "Universal Credit: LCWRA and how assessments work",
    tags: ["Universal Credit", "LCWRA", "WCA"],
    intro: "LCWRA decisions are based on functional impact evidence and descriptors. Strong examples and records reduce preventable refusals.",
    checks: [
      "Track symptoms and functional limits over time, not one-off days.",
      "Collect supporting letters that describe impact on tasks safely.",
      "Know mandatory reconsideration and appeal deadlines.",
    ],
    actions: [
      "Submit evidence with clear task-based examples.",
      "Request decision reasoning in writing if refused.",
      "Appeal promptly where evidence supports entitlement.",
    ],
    warning: "Benefit rules and rates change; always check current DWP guidance.",
  },
  {
    slug: "attendance-allowance",
    title: "Attendance Allowance: the essentials",
    tags: ["Attendance Allowance", "Benefits", "Care needs"],
    intro: "Attendance Allowance focuses on help needed with personal care/supervision due to illness or disability, not on diagnosis alone.",
    checks: [
      "Describe day and night needs, prompting, supervision, and safety risk.",
      "Use real examples and frequency, including bad days.",
      "Check whether PIP/DLA interactions affect route.",
    ],
    actions: [
      "Complete forms with concrete practical scenarios.",
      "Attach supporting clinical or care evidence.",
      "Seek welfare rights help before challenging refusals.",
    ],
    warning: "Do not understate needs because you are used to coping.",
  },
  {
    slug: "carers-allowance",
    title: "Carer’s Allowance: eligibility and trade-offs",
    tags: ["Carer's Allowance", "Carers", "Benefits"],
    intro: "Carer’s Allowance has strict criteria and can interact with other benefits. Eligibility mistakes often cause overpayments.",
    checks: [
      "Confirm cared-for person receives qualifying disability benefit.",
      "Check 35+ hours care threshold and current earnings limit.",
      "Review impact on existing benefits and pension credits.",
    ],
    actions: [
      "Track care hours and earnings consistently.",
      "Report changes quickly to avoid overpayment risk.",
      "Use specialist advice for complex household benefit mixes.",
    ],
    warning: "Rules can change yearly; verify current thresholds before decisions.",
  },
  {
    slug: "council-tax-disability-reduction",
    title: "Council Tax disability reduction",
    tags: ["Council Tax", "Disability reduction", "Local authority"],
    intro: "Some households qualify for Council Tax reductions due to disability-related room/equipment adaptations.",
    checks: [
      "Check local criteria for disability reductions/discounts.",
      "Gather evidence of adaptation and who benefits from it.",
      "Review backdating policy where applicable.",
    ],
    actions: [
      "Submit concise application with supporting evidence.",
      "Request reconsideration if refused without full reasons.",
      "Keep all decision letters and reference numbers.",
    ],
    warning: "Schemes vary by council; use local published guidance for final eligibility.",
  },
  {
    slug: "prescription-exemptions",
    title: "Prescription charge exemptions",
    tags: ["NHS", "Prescriptions", "Costs"],
    intro: "Prescription exemption routes depend on age, qualifying benefits, medical exemptions, and certificates.",
    checks: [
      "Confirm exemption category and current evidence needed.",
      "Check certificate validity dates and renewal reminders.",
      "Keep proof where pharmacy verification is delayed.",
    ],
    actions: [
      "Apply or renew exemption certificates ahead of expiry.",
      "Use prepayment certificate comparisons if no exemption applies.",
      "Record payment receipts where reimbursement may apply.",
    ],
    warning: "Wrong declarations can lead to penalty notices and recovery.",
  },
  {
    slug: "equality-act",
    title: "Equality Act 2010: reasonable adjustments in practice",
    tags: ["Equality Act", "Disability rights", "Adjustments"],
    intro: "The Equality Act requires reasonable adjustments in services, work, and education contexts. The strongest cases show barrier, requested adjustment, and concrete impact.",
    checks: [
      "Identify exact barrier and where it occurs.",
      "State the adjustment requested and why it is reasonable.",
      "Document refusal reasoning and consequences.",
    ],
    actions: [
      "Send written adjustment request with deadline for response.",
      "Escalate through formal complaint routes where needed.",
      "Preserve timeline evidence in case external advice is required.",
    ],
    warning: "For legal action timelines and remedies, get specialist advice early.",
  },
  {
    slug: "reasonable-adjustments",
    title: "Reasonable adjustments: what to ask for and how",
    tags: ["Adjustments", "Access", "Template"],
    intro: "Adjustment requests work best when specific, practical, and tied directly to a barrier and desired outcome.",
    checks: [
      "Describe the barrier in plain task language.",
      "Ask for one or two concrete adjustments first.",
      "Set a review date to test whether it worked.",
    ],
    actions: [
      "Use barrier-impact-adjustment format in writing.",
      "Request named owner for implementation.",
      "Track what was promised vs delivered.",
    ],
    warning: "Vague requests often get vague responses; specificity protects you.",
  },
  {
    slug: "formal-complaints",
    title: "How to make a formal complaint (and keep it effective)",
    tags: ["Complaints", "Escalation", "Evidence"],
    intro: "If you are exhausted or upset, complaints can feel like another full-time job. The aim is not to sound perfect, it is to be clear enough that the issue cannot be ignored.",
    checks: [
      "Identify the correct organisation and complaint stage.",
      "Set out chronology with dates, names, and outcomes sought.",
      "Attach only relevant evidence and keep file indexed.",
    ],
    actions: [
      "Ask for written response timeframe and the next escalation stage in the same email.",
      "Escalate after deadline by listing unresolved points one-by-one.",
      "Use ombudsman/regulator routes when local resolution has clearly stalled.",
    ],
    warning: "You can be compassionate and still be firm. Keep deadlines visible so your options are protected.",
  },
  {
    slug: "eass",
    title: "When to contact EASS (Equality Advisory Support Service)",
    tags: ["EASS", "Discrimination", "Support"],
    intro: "EASS can help people understand discrimination rights and next steps before or alongside formal legal routes.",
    checks: [
      "Prepare a short chronology and copies of key correspondence.",
      "Identify protected characteristic and discriminatory act/omission.",
      "Clarify what resolution you want before contact.",
    ],
    actions: [
      "Contact EASS with concise facts and documents ready.",
      "Follow recommended pre-action or complaint steps.",
      "Keep records of guidance and deadlines discussed.",
    ],
    warning: "EASS is guidance/signposting, not a substitute for legal representation in complex litigation.",
  },
  {
    slug: "advocacy",
    title: "Advocacy: who can help and how to use it",
    tags: ["Advocacy", "Support", "Representation"],
    intro: "Advocates help people participate in decisions where communication, complexity, or power imbalance creates disadvantage.",
    checks: [
      "Identify whether statutory independent advocacy duty may apply.",
      "Clarify what decisions you need support with now.",
      "Share key documents early so advocate can prepare.",
    ],
    actions: [
      "Request advocacy in writing where eligibility conditions may be met.",
      "Set clear goals for meetings and outcomes.",
      "Use advocate notes to confirm actions after meetings.",
    ],
    warning: "Advocacy availability varies by area; ask for waiting-time alternatives if urgent.",
  },
  {
    slug: "public-services",
    title: "Accessing public services: what you can expect",
    tags: ["Public services", "Accessibility", "Rights"],
    intro: "Public services should be usable without avoidable barriers. Practical documentation helps resolve repeated access failures.",
    checks: [
      "List recurring barriers in appointments, forms, calls, or buildings.",
      "Request accessible formats/communication preferences clearly.",
      "Track no-response or repeated service failures by date.",
    ],
    actions: [
      "Send one written access request with specific adjustments.",
      "Escalate unresolved barriers through complaint channels.",
      "Use advocacy where communication support is needed.",
    ],
    warning: "If health or safety is at risk, use urgent routes alongside complaints.",
  },
  {
    slug: "nhs-wheelchair-services",
    title: "NHS wheelchair services: referral and what to expect",
    tags: ["NHS", "Wheelchair service", "Referral"],
    intro: "Wheelchair service pathways vary by area, but clear referral evidence and practical needs framing improves outcomes.",
    checks: [
      "Confirm referral route and local eligibility wording.",
      "Prepare function-based evidence for daily mobility barriers.",
      "Ask about waiting times, repair routes, and review process.",
    ],
    actions: [
      "Submit referrals with clear risk/impact examples.",
      "Request written specification and follow-up times.",
      "Escalate unsafe delay through patient experience channels.",
    ],
    warning: "Local commissioning differs; verify details with your service.",
  },
  {
    slug: "continuing-healthcare-chc",
    title: "NHS Continuing Healthcare (CHC): basics",
    tags: ["CHC", "NHS funding", "Care funding"],
    intro: "CHC is NHS-funded care for people with a primary health need. Screening and full assessment outcomes depend on evidence quality and domain scoring.",
    checks: [
      "Ask for CHC checklist when needs appear primarily health-driven.",
      "Gather records across nursing, behaviour, cognition, mobility, skin, meds.",
      "Keep MDT decision rationale and scoring documentation.",
    ],
    actions: [
      "Request copies of checklist/decision support documents.",
      "Challenge weak reasoning via review/appeal pathways promptly.",
      "Use specialist advocacy/advice for complex appeals.",
    ],
    warning: "CHC disputes are technical and time-sensitive; get support early.",
  },
  {
    slug: "gp-access",
    title: "GP and hospital accessibility rights",
    tags: ["NHS access", "GP", "Hospital"],
    intro: "Accessible healthcare includes communication, appointment process, physical access, and safe clinical pathways.",
    checks: [
      "Request communication needs on record (format, interpreter, timing).",
      "Check physical access route and transfer support where needed.",
      "Document repeated missed adjustments by service and date.",
    ],
    actions: [
      "Send written accessibility request before appointments.",
      "Escalate persistent barriers via practice manager/PALS.",
      "Use complaint channels if unsafe access persists.",
    ],
    warning: "Urgent clinical deterioration should use emergency or urgent NHS routes first.",
  },
  {
    slug: "nhs-complaints",
    title: "NHS complaints: how to escalate",
    tags: ["NHS complaints", "PALS", "Escalation"],
    intro: "A strong NHS complaint sets out facts, harm/impact, and specific remedy sought, then escalates in sequence.",
    checks: [
      "Start with local resolution route and keep reference numbers.",
      "Use PALS for urgent practical resolution where available.",
      "Track response deadlines and unanswered points.",
    ],
    actions: [
      "Submit concise chronology with evidence attachments.",
      "Request written action plan and named accountability.",
      "Escalate to ombudsman route when local process is exhausted.",
    ],
    warning: "Keep complaint and urgent clinical care routes running in parallel if needed.",
  },
  {
    slug: "mental-health-crisis",
    title: "Mental health crisis support routes (UK)",
    tags: ["Mental health", "Crisis", "Safety"],
    intro: "When you are in crisis, clear next steps matter more than perfect wording. This section is here to reduce panic and help you reach support quickly.",
    checks: [
      "Know your local crisis line and NHS urgent mental health route.",
      "Keep emergency contacts and medication information accessible.",
      "Identify warning signs and agreed escalation steps in advance.",
    ],
    actions: [
      "If immediate danger: call 999 or attend A&E.",
      "For urgent support: use NHS 111 option for mental health where available.",
      "Use Samaritans 116 123 or Shout 85258 when in distress and needing immediate support.",
    ],
    warning: "If there is immediate risk to life or serious harm, call emergency services now.",
  },
  {
    slug: "traveling-with-care",
    title: "Traveling with support needs: planning and paperwork",
    tags: ["Travel", "Care support", "Planning"],
    intro: "Travel with support needs works best when medication, equipment, assistance bookings, and contingency plans are prepared in writing.",
    checks: [
      "Confirm accessibility and assistance bookings in writing.",
      "Carry concise care summary and medication list.",
      "Plan backup for delays, equipment failure, and fatigue spikes.",
    ],
    actions: [
      "Create one travel pack folder (digital + print).",
      "Share key information with support person before departure.",
      "Log incidents immediately if access failures occur.",
    ],
    warning: "Do not accept unsafe transfers or rushed handling to keep schedule.",
  },
  {
    slug: "disabled-parents",
    title: "Disabled parents: practical support and rights",
    tags: ["Parenting", "Disability", "Family support"],
    intro: "Disabled parents are often judged before they are supported. You have the right to practical adjustments that help you parent safely and consistently, not assumptions about what you cannot do.",
    checks: [
      "Document barriers that affect parenting tasks and safety.",
      "Request practical adjustments from involved services.",
      "Keep records of support offered vs actually delivered.",
    ],
    actions: [
      "Use clear task-based requests for support.",
      "Challenge discriminatory assumptions in writing and ask for evidence-based decisions.",
      "Seek advocacy if meetings become overwhelming or one-sided.",
    ],
    warning: "If safeguarding action starts, get specialist legal support early and keep a dated evidence timeline.",
  },
  {
    slug: "childcare",
    title: "Childcare and accessibility: what to ask",
    tags: ["Childcare", "Accessibility", "Family"],
    intro: "Accessible childcare planning should cover entry routes, handover process, medication needs, and communication reliability.",
    checks: [
      "Check physical access for parent and child at pickup/drop-off.",
      "Confirm policy for medication/allergy and emergency contact.",
      "Ask how communication is handled when adjustments are needed.",
    ],
    actions: [
      "Visit settings with a practical checklist before enrolling.",
      "Put agreed adjustments in writing and review after start date.",
      "Escalate unresolved barriers through provider complaints process.",
    ],
    warning: "Where safety-critical needs are involved, insist on clear written plans.",
  },
  {
    slug: "childrens-benefits",
    title: "Children’s disability benefits overview",
    tags: ["Children", "Benefits", "DLA"],
    intro: "Children’s disability support routes depend on age, care/mobility needs, and family circumstances. Evidence should show practical daily impact clearly.",
    checks: [
      "Check current eligibility and age thresholds for relevant benefits.",
      "Gather school/clinical evidence describing functional needs.",
      "Track how often supervision or extra care is required.",
    ],
    actions: [
      "Complete forms with concrete examples from normal routines.",
      "Keep copies of submission and all decision notices.",
      "Challenge refusals with targeted additional evidence.",
    ],
    warning: "Benefit rates and rules change; verify current official guidance.",
  },
  {
    slug: "respite",
    title: "Respite: how to ask for it and what ‘counts’",
    tags: ["Respite", "Carers", "Support planning"],
    intro: "Respite is a risk-management support, not a luxury. Clear definition of tasks, timing, and contingency avoids breakdowns.",
    checks: [
      "Define exactly what replacement support must cover.",
      "Confirm who funds and coordinates respite arrangements.",
      "Prepare emergency fallback if booked respite fails.",
    ],
    actions: [
      "Request respite need in writing with evidence of strain/risk.",
      "Agree handover documents for safe continuity.",
      "Review outcomes and request plan changes if support is inadequate.",
    ],
    warning: "Unsafe respite arrangements should be escalated immediately.",
  },
  {
    slug: "family-activities",
    title: "Family activities: finding genuinely accessible places",
    tags: ["Family", "Activities", "Access"],
    intro: "Family activity planning works best when access checks include toilets, routes, parking, rest spaces, and sensory load.",
    checks: [
      "Request practical access details rather than generic labels.",
      "Check route distance, seating/rest points, and toilet setup.",
      "Confirm cancellation/refund options if access differs on arrival.",
    ],
    actions: [
      "Use a standard pre-visit checklist for each venue.",
      "Build pacing breaks into the plan for fatigue/pain management.",
      "Document access failures and request remedy in writing.",
    ],
    warning: "Do not push through unsafe environments to avoid disappointment.",
  },
  {
    slug: "pregnancy",
    title: "Pregnancy, birth, and disability: navigating appointments",
    tags: ["Pregnancy", "Maternity", "Accessibility"],
    intro: "Pregnancy appointments can become exhausting when access needs are ignored. You should not have to fight at every step for safe communication, positioning, and practical support.",
    checks: [
      "Ask maternity team to record specific access/communication needs.",
      "Plan appointment timing and transport around symptom variation.",
      "Confirm labour ward accessibility and equipment availability early.",
    ],
    actions: [
      "Create a concise maternity access plan and bring/share it at every contact.",
      "Escalate unresolved barriers early via maternity liaison channels and ask for named follow-up.",
      "Keep one timeline of appointments, decisions, and unmet access needs.",
    ],
    warning: "Urgent symptoms should use maternity emergency guidance immediately, even if access arrangements are still unresolved.",
  },
];

export const RIGHTS_ARTICLES_DETAILED: AdviceArticle[] = RIGHTS_SEEDS.map((seed) => ({
  slug: seed.slug,
  title: seed.title,
  categorySlug: seed.categorySlug ?? "rights",
  updated: "2026-05-08",
  tags: seed.tags,
  sections: buildRightsSections(seed),
}));

