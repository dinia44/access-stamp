export type HelpCard = {
  slug: string;
  title: string;
  category: "Driving" | "Work" | "Education" | "Travel" | "Care" | "Rights" | "Emergency";
  summary: string;
  whenToUse: string[];
  mustAsk: string[];
  checklist: string[];
  documentsToCarry: string[];
  escalateIf: string[];
  keyLine: string;
  tags: string[];
};

export const HELP_CARD_CONCERNS = [
  "Driving licence renewal",
  "Job interview adjustments",
  "Starting school with disability",
  "Access to Work",
  "Flying with a wheelchair",
  "Wheelchair damaged by airline",
  "Emergency wheelchair breakdown",
  "Reasonable adjustments",
  "Care package review",
  "University disability support",
  "Public transport refusal",
  "Blue Badge and parking",
  "Equality Act rights",
  "Disability discrimination at work",
  "School/university discrimination",
  "Service provider discrimination",
  "Housing accessibility refusal",
  "Making a formal complaint",
] as const;

export const HELP_CARDS: HelpCard[] = [
  {
    slug: "section-88-driving-card",
    title: "Section 88 driving checklist",
    category: "Driving",
    summary: "Carry this when driving while your UK licence renewal is being processed.",
    whenToUse: [
      "You have applied to renew your licence with DVLA.",
      "You need to keep driving lawfully while waiting for decision.",
    ],
    mustAsk: [
      "Do I still meet the standards for my previous licence entitlement?",
      "Has any clinician formally advised me to stop driving?",
    ],
    checklist: [
      "Confirm you have submitted your valid renewal application.",
      "Check your doctor has not told you to stop driving.",
      "Confirm you still meet previous licence conditions.",
      "Carry proof of application date and reference number.",
      "Carry key line below in case questioned by employer or police.",
    ],
    documentsToCarry: [
      "DVLA renewal confirmation/reference.",
      "Copy of submitted form date.",
      "Any clinician note confirming fitness where available.",
    ],
    escalateIf: [
      "Employer blocks driving duties without reviewing Section 88 status.",
      "You receive conflicting advice from insurer/employer.",
    ],
    keyLine:
      "I am driving under Section 88 provisions while my licence renewal is under DVLA review and I continue to meet medical and legal requirements.",
    tags: ["DVLA", "Section 88", "Licence", "Renewal"],
  },
  {
    slug: "job-interview-adjustments-card",
    title: "Job interview access card",
    category: "Work",
    summary: "Prompt card for disabled candidates to ask the right access questions before and after interview.",
    whenToUse: [
      "Before a first interview.",
      "When disclosing access needs to recruiter or hiring manager.",
    ],
    mustAsk: [
      "Who owns my adjustments plan from interview to onboarding?",
      "Will occupational health referral be triggered if required?",
      "Will a workplace risk assessment and PEEP be completed before start?",
    ],
    checklist: [
      "Ask who owns adjustments process and timelines.",
      "Ask whether interview location is step-free and toilet accessible.",
      "Ask for alternative formats or extra processing time if needed.",
      "Ask for occupational health referral timeline after offer.",
      "Ask how Access to Work support will be handled.",
      "Ask if fire evacuation plan (PEEP) will be created on day one.",
    ],
    documentsToCarry: [
      "Short adjustment summary (1 page).",
      "Optional evidence letter for specific workplace restrictions.",
      "List of required software/equipment and turnaround times.",
    ],
    escalateIf: [
      "Offer is delayed or withdrawn after adjustment request.",
      "Employer refuses to discuss safety adjustments before start.",
    ],
    keyLine:
      "I can perform this role with reasonable adjustments. Please confirm the named contact and timeline for adjustments, occupational health, Access to Work, and evacuation planning.",
    tags: ["Interview", "Adjustments", "Occupational health", "PEEP"],
  },
  {
    slug: "access-to-work-setup-card",
    title: "Access to Work setup card",
    category: "Work",
    summary: "Use this when starting work or changing role to avoid delays in support.",
    whenToUse: ["New job offer accepted.", "Role or location changes."],
    mustAsk: [
      "Who is named employer contact for Access to Work?",
      "What is the procurement route and who submits quotes?",
    ],
    checklist: [
      "Start application early and keep reference numbers.",
      "Document barriers by task, not diagnosis.",
      "Agree employer contact and procurement route.",
      "List required equipment, support worker, travel support.",
      "Set review date after first 6-8 weeks in role.",
    ],
    documentsToCarry: [
      "Role duties list with barrier notes.",
      "Quote requests and supplier options.",
      "Access to Work reference and communication log.",
    ],
    escalateIf: [
      "Support start date keeps moving with no owner.",
      "Essential kit is delayed and role becomes unsafe/unworkable.",
    ],
    keyLine: "Please confirm who submits quotes, who purchases items, and the target date support will be live.",
    tags: ["Access to Work", "Employer", "Support"],
  },
  {
    slug: "workplace-peep-risk-card",
    title: "Workplace risk and evacuation card",
    category: "Work",
    summary: "Checklist to trigger safe workplace setup for disabled staff.",
    whenToUse: ["First week in a new workplace.", "Office move or floor change."],
    mustAsk: [
      "Has my role-specific risk assessment been completed and shared?",
      "Is my PEEP tested and staffed for absences?",
    ],
    checklist: [
      "Request workstation and access risk assessment.",
      "Request personal emergency evacuation plan (PEEP).",
      "Confirm who provides evacuation support and backup.",
      "Confirm refuge areas, exits, and drills include you.",
      "Review after any health or workplace change.",
    ],
    documentsToCarry: [
      "Written risk assessment copy.",
      "PEEP with named responsible staff.",
      "Any specialist seating/manual handling instructions.",
    ],
    escalateIf: [
      "You are told to work without completed risk controls.",
      "No backup evacuation support is in place.",
    ],
    keyLine: "Safety planning must include my access needs in normal work and emergency evacuation.",
    tags: ["Risk assessment", "PEEP", "Fire", "Safety"],
  },
  {
    slug: "school-start-parent-card",
    title: "Parent school start access card",
    category: "Education",
    summary: "For parents of disabled children starting school or changing year group.",
    whenToUse: ["Before term starts.", "Transition meetings."],
    mustAsk: [
      "Who is my child’s named SEND lead and day-to-day key person?",
      "Which risk assessments exist and when are they reviewed?",
    ],
    checklist: [
      "Ask for named SEND and safeguarding contacts.",
      "Ask for mobility, toileting, and medical support plan.",
      "Ask what risk assessments already exist and who updates them.",
      "Ask for written plan for trips, PE, and break times.",
      "Ask how exclusions and behaviour policy are adjusted for disability.",
      "Set first review meeting date in writing.",
    ],
    documentsToCarry: [
      "Current professional letters and support plans.",
      "Medication and emergency protocol summary.",
      "Communication method preferences for school/home updates.",
    ],
    escalateIf: [
      "School cannot provide safe toileting/medical support on day one.",
      "Reasonable adjustments are repeatedly delayed.",
    ],
    keyLine: "Please provide written support, risk assessment ownership, and review dates before start.",
    tags: ["School", "SEND", "Parent", "Support plan"],
  },
  {
    slug: "school-risk-assessment-card",
    title: "School risk assessment card",
    category: "Education",
    summary: "Quick checklist of risk assessments families should ask to see.",
    whenToUse: ["Annual review.", "New equipment or mobility needs."],
    mustAsk: [
      "Who owns each risk assessment and who signs off updates?",
      "How are agency/cover staff briefed on the plan?",
    ],
    checklist: [
      "Classroom access and movement plan.",
      "Manual handling and transfer safety plan.",
      "Toileting and intimate care procedure.",
      "Medical administration and emergency medication plan.",
      "School trip and transport risk assessment.",
      "Emergency evacuation and lockdown inclusion plan.",
    ],
    documentsToCarry: [
      "Latest care and handling plan.",
      "Current emergency contacts and medical details.",
      "Equipment use instructions with photos if useful.",
    ],
    escalateIf: [
      "Assessments exist but are not implemented in daily routines.",
      "School declines to share review schedule or owners.",
    ],
    keyLine: "Please confirm each assessment owner, next review date, and where the plan is stored.",
    tags: ["Risk assessments", "Education", "Safety"],
  },
  {
    slug: "university-support-card",
    title: "University support setup card",
    category: "Education",
    summary: "Bring to disability service meetings to lock in practical support.",
    whenToUse: ["Before term starts.", "When support is failing."],
    mustAsk: [
      "Which adjustments are guaranteed before teaching starts?",
      "Who handles urgent failures during term?",
    ],
    checklist: [
      "Confirm disability advisor and escalation route.",
      "Confirm lecture, exam, and deadline adjustments.",
      "Confirm campus route and accommodation access.",
      "Confirm note-taking or communication support.",
      "Confirm what is DSA funded vs university funded.",
    ],
    documentsToCarry: [
      "DSA evidence and recommendations.",
      "Support plan summary you can resend quickly.",
      "Accommodation and access confirmation emails.",
    ],
    escalateIf: [
      "Exam/teaching adjustments are missing near deadlines.",
      "Campus access barriers prevent attendance.",
    ],
    keyLine: "Please send my support plan in writing and confirm who implements each adjustment.",
    tags: ["University", "DSA", "Adjustments"],
  },
  {
    slug: "flight-assistance-card",
    title: "Flying with wheelchair card",
    category: "Travel",
    summary: "Use before travel and at airport to reduce avoidable failures.",
    whenToUse: ["Booking flights.", "Check-in and boarding."],
    mustAsk: [
      "Has special assistance booking been confirmed in writing?",
      "How is my wheelchair tagged, stowed, and returned?",
    ],
    checklist: [
      "Provide wheelchair dimensions, weight, battery details in advance.",
      "Ask for written confirmation of assistance booking.",
      "Carry handling instructions for your wheelchair.",
      "Photograph wheelchair condition before handover.",
      "Ask how and where wheelchair is returned on landing.",
    ],
    documentsToCarry: [
      "Wheelchair spec sheet and handling instructions.",
      "Battery compliance notes (if powered chair).",
      "Assistance booking confirmation and flight references.",
    ],
    escalateIf: [
      "Assistance booking is missing at airport.",
      "Staff request unsafe transfer method.",
    ],
    keyLine: "My wheelchair is mobility equipment, not standard baggage. Please follow handling instructions and confirm return point.",
    tags: ["Airport assistance", "Wheelchair", "Airline"],
  },
  {
    slug: "wheelchair-damage-claim-card",
    title: "Wheelchair damage on flight card",
    category: "Travel",
    summary: "Immediate steps if airline damages mobility equipment.",
    whenToUse: ["At destination airport after damage.", "During claim process."],
    mustAsk: [
      "Can you issue a written damage report before I leave the airport?",
      "What immediate replacement support will be provided today?",
    ],
    checklist: [
      "Report damage before leaving airport and get written report.",
      "Take timestamped photos and video evidence.",
      "Request immediate mobility replacement support.",
      "Keep receipts for emergency transport and equipment.",
      "Escalate through airline complaint route and regulator where relevant.",
    ],
    documentsToCarry: [
      "Damage report reference.",
      "Photos/videos with timestamps.",
      "Receipts for emergency transport/equipment.",
    ],
    escalateIf: [
      "Airline refuses immediate mobility replacement support.",
      "No written claim reference is provided.",
    ],
    keyLine:
      "My wheelchair damage affects mobility and independence. I need immediate usable replacement support and a formal written claim reference.",
    tags: ["Damage claim", "CAA", "FAA", "Mobility equipment"],
  },
  {
    slug: "public-transport-refusal-card",
    title: "Bus and taxi refusal rights card",
    category: "Rights",
    summary: "For access refusals on public transport and taxi services.",
    whenToUse: ["Refused boarding.", "Driver refuses ramp or service."],
    mustAsk: [
      "Can you log this refusal and issue a complaint reference now?",
      "What is your accessible service escalation route?",
    ],
    checklist: [
      "Record operator name, route, time, and vehicle ID.",
      "Record exact refusal wording if possible.",
      "Request complaint reference immediately.",
      "Escalate to operator accessibility team in writing.",
      "Escalate to regulator or local authority licensing team if unresolved.",
    ],
    documentsToCarry: [
      "Incident timeline notes.",
      "Photos or witness details where possible.",
      "Complaint references and responses.",
    ],
    escalateIf: [
      "Repeat refusal pattern on same route/operator.",
      "No response within published complaint timeline.",
    ],
    keyLine: "Please log this as a disability access refusal and provide a complaint reference now.",
    tags: ["Transport", "Refusal", "Complaint", "Equality Act"],
  },
  {
    slug: "blue-badge-parking-card",
    title: "Blue Badge parking quick card",
    category: "Driving",
    summary: "Parking rights and practical checks for disabled drivers and passengers.",
    whenToUse: ["Parking in unfamiliar area.", "Disputed use of badge."],
    mustAsk: [
      "What local restrictions apply to this specific location?",
      "If issued a penalty, where do I submit evidence?",
    ],
    checklist: [
      "Display badge and clock correctly where required.",
      "Check local restrictions and exemptions.",
      "Keep renewal and eligibility notes in phone/wallet.",
      "Record details if challenged or penalized unfairly.",
      "Appeal with evidence and timeline.",
    ],
    documentsToCarry: [
      "Blue Badge details and renewal date.",
      "Photos of signage and bay markings if challenged.",
      "Appeal notes and evidence list.",
    ],
    escalateIf: [
      "Repeated penalties despite compliant use.",
      "Badge misuse allegation without evidence.",
    ],
    keyLine: "I am using this Blue Badge in line with local disabled parking rules. Please provide written reason for any penalty.",
    tags: ["Blue Badge", "Parking", "Appeal"],
  },
  {
    slug: "care-review-card",
    title: "Care package review card",
    category: "Care",
    summary: "Use at social care reviews to keep support matched to real needs.",
    whenToUse: ["Annual review.", "Needs have changed."],
    mustAsk: [
      "Will this review reassess outcomes, not only current hours?",
      "What is the formal challenge route if refused?",
    ],
    checklist: [
      "List what is unsafe or no longer manageable.",
      "Show impact on washing, toileting, meals, mobility, medication.",
      "Request reassessment of hours and outcomes.",
      "Request carer impact and backup planning review.",
      "Ask for written decision and appeal route.",
    ],
    documentsToCarry: [
      "Daily barrier log.",
      "Hospital/discharge updates since last review.",
      "Carer strain notes and contingency gaps.",
    ],
    escalateIf: [
      "Urgent care tasks are missed and safety is affected.",
      "Review completed without written decision.",
    ],
    keyLine: "My needs have changed and current support is no longer safe or sufficient. I request reassessment with written outcome.",
    tags: ["Social care", "Review", "Reassessment"],
  },
  {
    slug: "hospital-discharge-access-card",
    title: "Hospital discharge access card",
    category: "Care",
    summary: "Checklist to avoid unsafe discharge without support in place.",
    whenToUse: ["Before discharge day.", "After major health event."],
    mustAsk: [
      "What support is guaranteed in first 24-48 hours at home?",
      "Who is accountable if agreed support fails?",
    ],
    checklist: [
      "Confirm home access and transfer safety plan.",
      "Confirm required equipment delivery date.",
      "Confirm medication and follow-up appointments in writing.",
      "Confirm who to call if support fails in first 48 hours.",
      "Do not accept unsafe discharge without clear plan.",
    ],
    documentsToCarry: [
      "Discharge summary and medication list.",
      "Equipment order confirmations.",
      "Emergency contact plan.",
    ],
    escalateIf: [
      "Discharge is proposed without essential equipment.",
      "No emergency support contact is provided.",
    ],
    keyLine: "I need a safe discharge plan with equipment, support contacts, and written actions before leaving hospital.",
    tags: ["Discharge", "Hospital", "Safety"],
  },
  {
    slug: "emergency-breakdown-card",
    title: "Wheelchair breakdown emergency card",
    category: "Emergency",
    summary: "Fast actions when wheelchair or key equipment fails in public.",
    whenToUse: ["Wheelchair breakdown.", "Battery or control failure."],
    mustAsk: [
      "What emergency repair ETA can you provide?",
      "What temporary replacement options are available?",
    ],
    checklist: [
      "Move to safe location and avoid unsafe manual lifting.",
      "Call repair provider and note reference.",
      "Request emergency mobility backup support.",
      "Contact venue/transport staff for immediate practical help.",
      "Record incident details for complaints or support claims.",
    ],
    documentsToCarry: [
      "Repair provider details and policy numbers.",
      "Photos of failure point.",
      "Emergency contacts and backup transport options.",
    ],
    escalateIf: [
      "No safe mobility alternative is offered.",
      "Repair support repeatedly misses urgent timelines.",
    ],
    keyLine: "I need safe immediate mobility support while urgent repair is arranged.",
    tags: ["Breakdown", "Emergency", "Repair"],
  },
  {
    slug: "reasonable-adjustments-card",
    title: "Reasonable adjustments request card",
    category: "Rights",
    summary: "Universal card for work, education, and services.",
    whenToUse: ["Requesting adjustment.", "Following up ignored request."],
    mustAsk: [
      "Who approves this adjustment and by what date?",
      "What temporary workaround is in place meanwhile?",
    ],
    checklist: [
      "State barrier clearly and where it happens.",
      "State requested adjustment and why it helps.",
      "Ask for implementation owner and date.",
      "Ask for decision in writing.",
      "Escalate if delayed or refused without reason.",
    ],
    documentsToCarry: [
      "Written request and follow-up trail.",
      "Examples of barrier impact on task/safety.",
      "Any prior agreed adjustments.",
    ],
    escalateIf: [
      "No written response after repeated requests.",
      "Refusal without objective reason or alternatives.",
    ],
    keyLine: "I am requesting a reasonable adjustment to remove this barrier. Please confirm decision and implementation date in writing.",
    tags: ["Equality Act", "Adjustments", "Access"],
  },
  {
    slug: "travel-insurance-disability-card",
    title: "Accessible travel insurance card",
    category: "Travel",
    summary: "Questions to ask before buying travel insurance with disability.",
    whenToUse: ["Buying policy.", "Declaring medical conditions."],
    mustAsk: [
      "Does this policy cover my declared condition and wheelchair damage risks?",
      "How do I activate urgent replacement support abroad?",
    ],
    checklist: [
      "Confirm declared conditions are fully listed.",
      "Confirm wheelchair/mobility equipment coverage amount.",
      "Confirm emergency assistance access needs are noted.",
      "Confirm replacement equipment process abroad.",
      "Save policy wording and emergency numbers offline.",
    ],
    documentsToCarry: [
      "Policy wording PDF and emergency numbers.",
      "Equipment value and serial details.",
      "Medical declaration confirmation.",
    ],
    escalateIf: [
      "Provider gives conflicting statements on wheelchair cover.",
      "Emergency assistance line cannot support accessibility needs.",
    ],
    keyLine: "Please confirm in writing that my condition and mobility equipment are covered under this policy.",
    tags: ["Insurance", "Travel", "Wheelchair"],
  },
  {
    slug: "new-job-first-30-days-card",
    title: "New job first 30 days card",
    category: "Work",
    summary: "Detailed startup card for disabled employees to make onboarding safe, workable, and documented.",
    whenToUse: ["Offer accepted and before first month ends.", "New manager or location change."],
    mustAsk: [
      "Has my workstation and task risk assessment been completed?",
      "Has occupational health referral been made if needed?",
      "Has Access to Work application/implementation ownership been agreed?",
      "Has a PEEP and fire safety support plan been tested?",
    ],
    checklist: [
      "Agree adjustment owner, dates, and review points in writing.",
      "Confirm software/equipment setup before core duties begin.",
      "Confirm breaks, fatigue pacing, and manual handling boundaries.",
      "Confirm emergency evacuation support with backup staff.",
      "Set week-2 and week-6 review meetings.",
      "Document unresolved barriers and interim controls.",
    ],
    documentsToCarry: [
      "Onboarding adjustment summary (1 page).",
      "Risk assessment and PEEP copies.",
      "Occupational health referral status.",
      "Access to Work reference and timeline.",
    ],
    escalateIf: [
      "You are asked to work without agreed safety controls.",
      "No named owner for unresolved adjustments by week 2.",
      "Emergency evacuation support is not viable.",
    ],
    keyLine:
      "I’m committed to the role and need agreed adjustments, risk controls, occupational health actions, and emergency planning implemented to work safely and effectively.",
    tags: ["New job", "Risk assessment", "Occupational health", "Access to Work", "PEEP"],
  },
  {
    slug: "equality-act-core-rights-card",
    title: "Equality Act core rights card (UK)",
    category: "Rights",
    summary: "High-clarity reminder of your core disability protections under the Equality Act 2010.",
    whenToUse: ["When you need to explain your rights quickly.", "Before meetings with employers, schools, or services."],
    mustAsk: [
      "What reasonable adjustments will you make and by when?",
      "Who is the named decision-maker for this adjustment request?",
      "How will you avoid substantial disadvantage in practice?",
    ],
    checklist: [
      "State barrier and impact clearly in plain language.",
      "Request specific adjustment linked to the barrier.",
      "Ask for written response with timeline.",
      "Keep records of requests, responses, and outcomes.",
      "Escalate if ignored, delayed, or refused without reason.",
    ],
    documentsToCarry: [
      "Short rights summary and adjustment request.",
      "Timeline of key events and communications.",
      "Evidence of practical disadvantage (notes/photos/emails).",
    ],
    escalateIf: [
      "Adjustment is refused without practical alternatives.",
      "You are treated worse after disclosing disability.",
      "You experience repeated access barriers despite notice.",
    ],
    keyLine:
      "Under the Equality Act 2010, I am requesting reasonable adjustments to remove disability-related barriers and avoid substantial disadvantage.",
    tags: ["Equality Act", "Reasonable adjustments", "Disability rights"],
  },
  {
    slug: "workplace-discrimination-response-card",
    title: "Workplace disability discrimination response card",
    category: "Rights",
    summary: "Practical action steps if treatment at work crosses into disability discrimination.",
    whenToUse: ["After discriminatory comments/actions.", "When adjustments are ignored and harm is ongoing."],
    mustAsk: [
      "Can this be investigated under grievance and equality procedures now?",
      "What immediate protections are in place while this is reviewed?",
      "Who is the independent escalation contact (HR/senior lead)?",
    ],
    checklist: [
      "Write factual timeline: who/what/when/impact.",
      "Submit written grievance with specific remedies requested.",
      "Request interim protections during investigation.",
      "Keep copies of all notes, emails, and meeting outcomes.",
      "Seek specialist advice before legal deadlines pass.",
    ],
    documentsToCarry: [
      "Incident timeline with evidence references.",
      "Adjustment history and unresolved requests.",
      "Sickness/impact notes if relevant.",
    ],
    escalateIf: [
      "Retaliation follows your complaint.",
      "Investigation is delayed or not impartial.",
      "Health/safety risk continues while unresolved.",
    ],
    keyLine:
      "I am raising a formal disability discrimination concern and requesting immediate interim protections while this is investigated.",
    tags: ["Workplace", "Discrimination", "Grievance", "HR"],
  },
  {
    slug: "education-discrimination-card",
    title: "School and university discrimination card",
    category: "Education",
    summary: "Checklist for disability discrimination and adjustment failures in education settings.",
    whenToUse: ["Support plan failures.", "Exclusions/penalties linked to disability needs."],
    mustAsk: [
      "Which adjustment duties are being applied now, not later?",
      "Who signs off support and how is delivery monitored?",
      "What is the formal complaint and escalation route?",
    ],
    checklist: [
      "Document specific incidents and educational impact.",
      "Link each barrier to a reasonable adjustment request.",
      "Ask for written action plan with dates.",
      "Request urgent review if safety/attendance is affected.",
      "Escalate to governing body/university process if unresolved.",
    ],
    documentsToCarry: [
      "Support plan and review history.",
      "Incident log (attendance, sanctions, missed support).",
      "Professional evidence letters where relevant.",
    ],
    escalateIf: [
      "Repeated failures despite agreed support plan.",
      "Disciplinary action ignores disability context.",
      "Attendance or safety is compromised.",
    ],
    keyLine:
      "I am requesting immediate disability adjustments and a written action plan to prevent ongoing educational disadvantage.",
    tags: ["Education", "Discrimination", "SEND", "University"],
  },
  {
    slug: "services-and-public-places-rights-card",
    title: "Services and public places access rights card",
    category: "Rights",
    summary: "Use when shops, venues, healthcare, or public services fail to provide accessible service.",
    whenToUse: ["Service refusal.", "Inaccessible booking/entry/payment processes."],
    mustAsk: [
      "What immediate alternative service can you provide today?",
      "Who is your accessibility lead and complaint owner?",
      "When will this barrier be fixed and communicated?",
    ],
    checklist: [
      "Ask for immediate practical workaround.",
      "Record date/time/staff and barrier detail.",
      "Submit complaint with specific remedy requested.",
      "Request written outcome and implementation date.",
      "Escalate to regulator/ombudsman where applicable.",
    ],
    documentsToCarry: [
      "Barrier evidence (photos/screenshots/notes).",
      "Complaint references and correspondence.",
      "Requested remedy list.",
    ],
    escalateIf: [
      "No workaround is offered at point of need.",
      "Same barrier appears repeatedly after complaint.",
      "Essential care/health/service access is blocked.",
    ],
    keyLine:
      "I need an accessible equivalent service now, and a written plan for permanent removal of this barrier.",
    tags: ["Services", "Public places", "Access", "Complaint"],
  },
  {
    slug: "housing-access-refusal-card",
    title: "Housing accessibility refusal card",
    category: "Rights",
    summary: "For refused adaptations, inaccessible allocations, or unsafe housing access barriers.",
    whenToUse: ["Landlord/council refuses adaptation request.", "Property offered is functionally inaccessible."],
    mustAsk: [
      "What formal assessment has been completed and by whom?",
      "What reasonable alternatives are available immediately?",
      "What is the written appeal/review route and deadline?",
    ],
    checklist: [
      "Describe unsafe/impossible tasks in the home.",
      "Request written decision with reasons and evidence.",
      "Request occupational therapy/housing reassessment.",
      "Submit appeal with practical impact examples.",
      "Escalate to housing ombudsman/legal advice if needed.",
    ],
    documentsToCarry: [
      "OT or clinical evidence where available.",
      "Photos/measurements of barriers.",
      "Decision letters and appeal drafts.",
    ],
    escalateIf: [
      "Safety-critical access is unresolved.",
      "Decision ignores evidence of functional need.",
      "No interim safety measures are offered.",
    ],
    keyLine:
      "My current housing setup creates disability-related safety barriers. I request reassessment and accessible interim measures in writing.",
    tags: ["Housing", "Adaptations", "OT", "Appeal"],
  },
  {
    slug: "formal-complaint-and-evidence-card",
    title: "Formal complaint and evidence pack card",
    category: "Rights",
    summary: "Template-style card for building a strong complaint trail and preparing for escalation.",
    whenToUse: ["Before submitting formal complaint.", "When preparing tribunal/legal advice pack."],
    mustAsk: [
      "What exact remedy am I asking for and by when?",
      "What evidence proves barrier, impact, and notice given?",
      "What are the next escalation deadlines?",
    ],
    checklist: [
      "Build one timeline with dates, actors, and outcomes.",
      "Attach key evidence only (clear and relevant).",
      "State requested remedy in measurable terms.",
      "Set response deadline in writing.",
      "Prepare escalation draft before deadline expires.",
    ],
    documentsToCarry: [
      "Master timeline document.",
      "Evidence index (emails/notes/photos/reports).",
      "Draft complaint and escalation letters.",
    ],
    escalateIf: [
      "No response by stated deadline.",
      "Response ignores core remedy request.",
      "Barrier continues to cause harm or exclusion.",
    ],
    keyLine:
      "I am submitting a formal disability access complaint with supporting evidence and a clear remedy request. Please confirm receipt and response deadline.",
    tags: ["Complaint", "Evidence", "Escalation", "Tribunal prep"],
  },
];

export const FEATURED_HELP_CARD_SLUGS = [
  "new-job-first-30-days-card",
  "section-88-driving-card",
  "school-start-parent-card",
  "wheelchair-damage-claim-card",
] as const;
