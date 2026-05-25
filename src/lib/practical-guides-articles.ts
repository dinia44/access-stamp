import type { AdviceArticle } from "@/lib/mock-data";

const DISCLAIMER =
  "This guide is general information, not legal advice. Check official guidance or get specialist advice for your situation.";

const AI_CTA =
  "Need help turning your situation into a clear next step? Use the Access Stamp AI Assistant to create a checklist, draft wording, or prepare questions before you contact an organisation.";

type GuideInput = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  readTimeMinutes: number;
  categorySlug: AdviceArticle["categorySlug"];
  tags: string[];
  summary: string;
  who: string[];
  whatAvailable: string[];
  evidence: string[];
  steps: string[];
  mistakes: string[];
  templateTitle: string;
  templateBody: string;
  ifRefused: string[];
  officialLinks: Array<{ label: string; href: string }>;
  relatedLinks?: Array<{ label: string; href: string }>;
};

function buildGuide(g: GuideInput): AdviceArticle {
  const sections: AdviceArticle["sections"] = [
    {
      type: "callout",
      tone: "warning",
      title: "Disclaimer",
      body: DISCLAIMER,
    },
    { type: "p", text: g.summary },
    { type: "h2", text: "Who this applies to" },
    { type: "ul", items: g.who },
    { type: "h2", text: "What you can ask for or what may be available" },
    { type: "ul", items: g.whatAvailable },
    { type: "h2", text: "What evidence helps" },
    { type: "ul", items: g.evidence },
    { type: "h2", text: "Step-by-step process" },
    {
      type: "callout",
      tone: "steps",
      title: "Checklist",
      body: g.steps.map((s, i) => `${i + 1}) ${s}`).join("\n"),
    },
    { type: "h2", text: "Common mistakes to avoid" },
    { type: "ul", items: g.mistakes },
    { type: "h2", text: g.templateTitle },
    { type: "pre", text: g.templateBody },
    { type: "h2", text: "If you are refused, delayed, or ignored" },
    { type: "ul", items: g.ifRefused },
    { type: "h2", text: "Useful official links" },
    { type: "links", items: g.officialLinks },
  ];

  if (g.relatedLinks?.length) {
    sections.push({ type: "h2", text: "Related guides on Access Stamp" });
    sections.push({ type: "links", items: g.relatedLinks });
  }

  sections.push({
    type: "callout",
    tone: "tip",
    title: "Access Stamp AI Assistant",
    body: AI_CTA,
  });

  return {
    slug: g.slug,
    title: g.title,
    seoTitle: g.seoTitle,
    metaDescription: g.metaDescription,
    excerpt: g.excerpt,
    readTimeMinutes: g.readTimeMinutes,
    categorySlug: g.categorySlug,
    updated: "2026-05-12",
    tags: g.tags,
    sections,
  };
}

export const PRACTICAL_GUIDE_ARTICLES: AdviceArticle[] = [
  buildGuide({
    slug: "pip-renewal-form-what-to-write",
    title: "PIP Renewal Form: What to Write and What Evidence to Send",
    seoTitle: "PIP renewal form: what to write and evidence to send",
    metaDescription:
      "How to complete a PIP renewal form with real examples, evidence lists, and mistakes to avoid. UK-focused plain English.",
    excerpt:
      "Renewal is about how your condition affects you now — not your diagnosis. This guide covers wording, evidence, and common form mistakes.",
    readTimeMinutes: 12,
    categorySlug: "rights",
    tags: ["PIP", "Benefits", "Renewal", "Forms"],
    summary:
      "A PIP renewal asks the same core question as a new claim: how does your health condition or disability affect daily living and mobility? The form is not a medical test — it is a structured description of real-life impact. Strong renewals use specific examples, consistent timelines (good days and bad days), and evidence that matches what you write.",
    who: [
      "People with an existing PIP award who receive a renewal pack from DWP.",
      "Claimants whose circumstances have changed (better, worse, or fluctuating).",
      "Family members or supporters helping someone complete the form — with the claimant’s consent.",
    ],
    whatAvailable: [
      "Continuation of daily living and/or mobility components if impact still meets the rules.",
      "An assessment (phone, paper, or face-to-face) if DWP needs more information.",
      "Backdated payments only in limited circumstances — focus on accurate dates in your answers.",
    ],
    evidence: [
      "Copies of previous PIP decision letters (if you have them).",
      "Prescription lists, clinic letters, or consultant summaries — keep copies, send originals only if asked.",
      "A symptom and impact diary for 2–4 weeks (sleep, pain, fatigue, falls, care needs).",
      "Support letters from a GP, nurse, social worker, or occupational therapist that describe function, not just diagnosis.",
      "Photos or lists of aids you use (splints, commode, perching stool, mobility equipment) linked to tasks.",
    ],
    steps: [
      "Read the renewal date on your letter and note any deadline — missing it can stop payments.",
      "Gather evidence before writing answers so examples and dates match.",
      "Work through each activity question using the same structure: task → what happens → help needed → risk if unsupported.",
      "Describe variability: how often difficulties happen and how long they last.",
      "Ask someone who knows your daily routine to read for gaps (not to change facts).",
      "Keep a copy of the completed form and proof of submission (online reference or recorded delivery).",
      "If invited to assessment, bring the same examples you wrote — inconsistency causes problems.",
    ],
    mistakes: [
      "Writing only the diagnosis (“I have MS”) without functional impact.",
      "Describing only your best day because you do not want to sound negative.",
      "Contradicting yourself between sections (e.g. cooking vs fatigue).",
      "Sending evidence DWP did not request without tying it to specific questions.",
      "Missing the deadline because you waited for a new hospital letter.",
    ],
    templateTitle: "Example wording pattern (adapt to your situation)",
    templateBody: `Activity: Preparing food

On most days I cannot prepare a simple meal safely without help. Pain and fatigue mean standing at the hob is limited to a few minutes. I use a stool and microwave meals, but chopping and lifting pans are unsafe when my hands are weak. On bad days I skip meals or rely on a carer to prepare food. Without support I risk burns, dropped items, or not eating — which worsens other symptoms.

Evidence attached: impact diary (4 weeks), GP letter dated [date], list of aids used.`,
    ifRefused: [
      "If payments stop or reduce, read the decision letter carefully — it should explain reasons linked to descriptors.",
      "You can ask for a mandatory reconsideration within one month of the decision date (check your letter).",
      "Contact welfare rights advice (Citizens Advice, local law centre) before the deadline if you need help.",
      "Keep attending GP or specialist appointments so ongoing impact is documented.",
    ],
    officialLinks: [
      { label: "GOV.UK — Personal Independence Payment", href: "https://www.gov.uk/pip" },
      { label: "GOV.UK — How to claim PIP", href: "https://www.gov.uk/pip/how-to-claim" },
      { label: "Citizens Advice — PIP", href: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/personal-independence-payment/" },
    ],
    relatedLinks: [
      { label: "PIP in plain English", href: "/advice/pip-in-plain-english" },
      { label: "PIP mandatory reconsideration", href: "/advice/pip-mandatory-reconsideration" },
    ],
  }),

  buildGuide({
    slug: "pip-mandatory-reconsideration",
    title: "PIP Mandatory Reconsideration: How to Challenge a Decision",
    seoTitle: "PIP mandatory reconsideration: how to challenge a decision",
    metaDescription:
      "Steps to request a PIP mandatory reconsideration, what to include, deadlines, and what to do if DWP still refuses.",
    excerpt:
      "If PIP stops or drops, you can ask DWP to look again. Timing and clear examples matter more than long medical folders.",
    readTimeMinutes: 10,
    categorySlug: "rights",
    tags: ["PIP", "Benefits", "Appeals", "MR"],
    summary:
      "A mandatory reconsideration (MR) is the first formal challenge when you disagree with a PIP decision. DWP reviews the decision again before you can appeal to a tribunal in most cases. MR success often depends on showing functional impact with dated examples, not sending every medical letter you have.",
    who: [
      "People who received a PIP decision letter they disagree with (new claim, renewal, or change of circumstances).",
      "Claimants where payments stopped or components were removed.",
    ],
    whatAvailable: [
      "A fresh review by DWP with a new decision letter.",
      "The same award continued, increased, or reduced again — outcomes vary.",
      "A route to appeal to an independent tribunal if MR does not change the outcome in your favour (check your letter).",
    ],
    evidence: [
      "The decision letter and summary of reasons (read which descriptors DWP thinks you meet).",
      "New evidence not already considered — especially functional impact diaries and support letters.",
      "Assessment report (request a copy if you had an assessment).",
      "A point-by-point response: for each activity DWP scored, explain what you can and cannot do with examples.",
    ],
    steps: [
      "Note the decision date on your letter — MR is usually required within one month (confirm on your letter).",
      "Request the MR in writing using the form or contact route shown on the decision letter.",
      "Write a structured challenge: quote DWP’s reason, then give real-life examples that contradict or qualify it.",
      "Send copies, keep originals; use recorded delivery or online submission proof.",
      "If you need more time for evidence, contact DWP promptly — do not assume extensions.",
      "Read the MR outcome letter; if still unhappy, check tribunal appeal deadline on that letter.",
    ],
    mistakes: [
      "Sending an MR late without explaining why (late requests are not always accepted).",
      "Repeating the original form answers without addressing DWP’s stated reasons.",
      "Relying on a diagnosis letter that does not describe day-to-day function.",
      "Assuming a phone call counts as MR without a written record.",
    ],
    templateTitle: "MR letter opening (adapt)",
    templateBody: `Dear Department for Work and Pensions,

I am requesting a mandatory reconsideration of the PIP decision dated [date], reference [if shown].

I disagree because the decision does not reflect my day-to-day impact. Below I respond to the reasons given, with dated examples.

[Insert numbered points per activity / reason]

Yours sincerely,
[Name]
[National Insurance number]
[Address]`,
    ifRefused: [
      "If MR upholds the decision, check whether you can appeal to a tribunal and the deadline on your letter.",
      "Get welfare rights representation for tribunal — success rates are often higher with good evidence bundles.",
      "Continue documenting impact weekly while waiting.",
    ],
    officialLinks: [
      { label: "GOV.UK — Challenge a PIP decision", href: "https://www.gov.uk/pip/how-to-claim" },
      { label: "Citizens Advice — Mandatory reconsideration", href: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/sick-or-disabled-benefits-appeals/mandatory-reconsideration/" },
    ],
    relatedLinks: [
      { label: "PIP renewal form guide", href: "/advice/pip-renewal-form-what-to-write" },
      { label: "PIP in plain English", href: "/advice/pip-in-plain-english" },
    ],
  }),

  buildGuide({
    slug: "access-to-work-application-guide",
    title: "Access to Work: What You Can Ask For and How to Apply",
    seoTitle: "Access to Work: what to ask for and how to apply",
    metaDescription:
      "Practical guide to UK Access to Work — eligible support, examples of funded items, application steps, and employer involvement.",
    excerpt:
      "Access to Work can fund equipment, travel, and support workers when disability affects doing your job. Here is how to frame a strong application.",
    readTimeMinutes: 11,
    categorySlug: "workplace",
    tags: ["Access to Work", "Work", "Funding", "Adjustments"],
    summary:
      "Access to Work (AtW) is a government scheme that can help pay for practical support so you can start or stay in work. It is not a benefit paid to you — it funds agreed items or services linked to workplace barriers. What gets approved depends on your job, the barrier, and whether support is reasonable for that role.",
    who: [
      "Disabled people or people with a health condition affecting work (employed or self-employed).",
      "People about to start a job or apprenticeship (timing rules apply — check GOV.UK).",
      "Employers cannot apply instead of you, but they are often involved in quotes and setup.",
    ],
    whatAvailable: [
      "Specialist equipment and software (ergonomic chairs, screen readers, adapted keyboards).",
      "Support workers (job coach, BSL interpreter, note-taker) for work tasks.",
      "Travel costs if you cannot use public transport safely or practically for the journey.",
      "Mental health support services in work in some cases.",
      "Workplace assessments to identify adjustments (may be funded as part of the grant).",
    ],
    evidence: [
      "Job description and typical tasks (hours, location, equipment used).",
      "A short barrier list: what stops you doing tasks safely, reliably, or on time.",
      "Quotes for equipment or support (AtW often needs costed options).",
      "Letters from OH, GP, or therapist describing work impact — functional wording helps.",
      "Employer contact willing to confirm role details (not always required but useful).",
    ],
    steps: [
      "Check current eligibility on GOV.UK (rules change — confirm before applying).",
      "List barriers by task: computer work, meetings, travel, physical work, communication.",
      "Research realistic solutions with prices (two quotes for higher-cost items helps).",
      "Apply online or by phone; keep your reference number.",
      "Take part in the AtW assessment or provide extra information if asked.",
      "If approved, follow the process to order items or book support — do not assume upfront payment.",
      "Review when your job changes — grants may need updating.",
    ],
    mistakes: [
      "Asking for items unrelated to work (home-only equipment without work link).",
      "Assuming AtW replaces the employer’s duty to make reasonable adjustments.",
      "Buying equipment before approval without checking payment rules.",
      "Vague applications (“I need a better chair”) without linking to tasks and hours.",
    ],
    templateTitle: "Barrier → solution table (for your notes)",
    templateBody: `Task: Video calls / screen work
Barrier: Eye strain and pain after 20 minutes; cannot sustain full working day
Support requested: Large monitor, text-to-speech software, scheduled breaks protocol
Estimated cost: [quote]
How it enables work: Completes core hours without missing deadlines`,
    ifRefused: [
      "Ask for written reasons and whether another solution could be funded instead.",
      "Request a review of the decision through the AtW dispute route (check current GOV.UK process).",
      "Raise reasonable adjustments with your employer in parallel — AtW is additional, not a replacement.",
    ],
    officialLinks: [
      { label: "GOV.UK — Access to Work", href: "https://www.gov.uk/access-to-work" },
      { label: "ACAS — Reasonable adjustments", href: "https://www.acas.org.uk/reasonable-adjustments" },
    ],
    relatedLinks: [
      { label: "Reasonable adjustments at work", href: "/advice/reasonable-adjustments-at-work" },
      { label: "Access to Work basics (existing guide)", href: "/advice/access-to-work-basics" },
    ],
  }),

  buildGuide({
    slug: "reasonable-adjustments-at-work",
    title: "Reasonable Adjustments at Work: A Simple Guide for Disabled Employees",
    seoTitle: "Reasonable adjustments at work: a simple guide",
    metaDescription:
      "What reasonable adjustments are, examples you can request, how to ask in writing, and what to do if your employer refuses.",
    excerpt:
      "Employers must remove barriers where reasonable. This guide helps you name the barrier, propose adjustments, and document responses.",
    readTimeMinutes: 10,
    categorySlug: "workplace",
    tags: ["Work", "Equality Act", "Adjustments", "Employer"],
    summary:
      "Under the Equality Act 2010, employers must make reasonable adjustments where a disabled worker faces a substantial disadvantage. “Reasonable” depends on cost, practicality, and effectiveness — not whether the adjustment is convenient for the employer. The skill is to describe disadvantage clearly and suggest specific fixes.",
    who: [
      "Disabled employees and workers in England, Scotland, and Wales (Northern Ireland has different equality law — check local advice).",
      "People returning after sickness, starting a new role, or whose needs have changed.",
      "Self-employed people dealing with clients — different duties, but access barriers still matter.",
    ],
    whatAvailable: [
      "Changes to policies or practices (flexible start times, rest breaks, hybrid working).",
      "Physical changes (desk setup, quiet space, accessible parking).",
      "Provision of auxiliary aids (specialist software, ergonomic equipment).",
      "Redeployment to a suitable alternative role as a last resort adjustment in some cases.",
      "Training or mentoring related to the barrier.",
    ],
    evidence: [
      "Occupational health report (if your employer offers OH).",
      "GP or specialist letter describing functional impact at work — not just diagnosis.",
      "A short written summary of tasks you cannot do safely or reliably without adjustment.",
      "Emails showing prior informal requests and outcomes.",
    ],
    steps: [
      "Identify the disadvantage: which work task fails without support?",
      "Draft 1–3 specific adjustments that would remove or reduce the disadvantage.",
      "Request a meeting with HR/manager; follow up in writing with the same points.",
      "Ask for a timeline and named owner for each adjustment.",
      "If agreed, confirm in email and check implementation (equipment ordered, policy updated).",
      "Review after 4–6 weeks — say what works and what still blocks you.",
    ],
    mistakes: [
      "Only complaining without proposing workable adjustments.",
      "Accepting “we’ll think about it” with no date or owner.",
      "Letting OH or HR speak for you without checking the written summary.",
      "Assuming Access to Work removes the employer’s legal duty.",
    ],
    templateTitle: "Email template to request adjustments",
    templateBody: `Subject: Request for reasonable adjustments

Dear [Manager/HR],

I am writing to request reasonable adjustments under the Equality Act because I face a substantial disadvantage at work due to [brief condition/impact — functional, not clinical detail].

Disadvantage: [e.g. cannot use standard workstation for more than X minutes without pain/fatigue risk]

Adjustments requested:
1. [Specific adjustment + how it helps]
2. [Alternative if first option not possible]

I am happy to discuss OH involvement or Access to Work if helpful. Please could we agree next steps and a date to review?

Thank you,
[Name]`,
    ifRefused: [
      "Ask for written reasons why an adjustment is considered unreasonable.",
      "Raise a formal grievance if internal discussion fails (check employer policy).",
      "Contact ACAS early conciliation if you are considering an employment tribunal claim — strict time limits apply.",
      "Keep diaries of impact at work after refusal.",
    ],
    officialLinks: [
      { label: "GOV.UK — Reasonable adjustments for disabled workers", href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers" },
      { label: "ACAS — Reasonable adjustments", href: "https://www.acas.org.uk/reasonable-adjustments" },
      { label: "Equality and Human Rights Commission — Work", href: "https://www.equalityhumanrights.com/guidance/your-rights-work" },
    ],
    relatedLinks: [
      { label: "Access to Work application guide", href: "/advice/access-to-work-application-guide" },
      { label: "Reasonable adjustments you can ask for", href: "/advice/reasonable-adjustments-you-can-ask-for" },
    ],
  }),

  buildGuide({
    slug: "book-train-assistance-passenger-assist",
    title: "How to Book Train Assistance with Passenger Assist",
    seoTitle: "How to book train assistance (Passenger Assist)",
    metaDescription:
      "Book UK rail Passenger Assist: ramps, boarding, connections, turn-up-and-go, and what to record when assistance fails.",
    excerpt:
      "Passenger Assist can help with boarding and connections — but booking rules and operator differences trip people up. Plan ahead and document failures.",
    readTimeMinutes: 9,
    categorySlug: "transport",
    tags: ["Trains", "Passenger Assist", "Travel", "Rail"],
    summary:
      "Passenger Assist is the national system for booking help on UK rail journeys — ramps, boarding, alighting, and sometimes station changes. Experience varies by operator and station staffing. Booking ahead is usually safest; some routes offer turn-up-and-go rights for wheelchair users — confirm for your operator.",
    who: [
      "Wheelchair users and passengers with mobility or sensory barriers to rail travel.",
      "People who need help with luggage, navigating stations, or making connections.",
      "Companions travelling with someone who needs assistance (book assistance for the passenger who needs it).",
    ],
    whatAvailable: [
      "Ramp deployment and escort to your seat or wheelchair space.",
      "Assistance at interchanges — allow extra time in bookings.",
      "Help with visual or hearing access needs at stations (varies).",
      "Alternative travel or compensation routes when services fail — operator policies differ.",
    ],
    evidence: [
      "Booking confirmation email or app reference.",
      "Photos of broken lifts, missing assistance, or platform changes.",
      "Names of staff and times (voice note immediately after incident).",
      "Ticket and seat reservation showing wheelchair space if applicable.",
    ],
    steps: [
      "Create or log in to Passenger Assist (website or app) or use operator-specific booking where required.",
      "Enter journey date, stations, and train times — double-check spelling of stations.",
      "State needs clearly: wheelchair type (manual/powered), transfer ability, luggage, companion.",
      "Allow longer connection times — 20+ minutes is common for assisted changes.",
      "Arrive earlier than minimum advised on confirmation.",
      "On the day, confirm assistance at the meeting point on your booking.",
      "If assistance fails, speak to station staff for immediate safety alternatives and a complaint reference.",
    ],
    mistakes: [
      "Booking tight connections under 15 minutes with assistance.",
      "Assuming turn-up-and-go applies on all operators without checking.",
      "Not carrying booking reference offline (phone battery risk).",
      "Leaving without logging a failure — complaints need dates and train IDs.",
    ],
    templateTitle: "Day-of-travel checklist",
    templateBody: `□ Booking reference saved offline
□ Operator phone number saved
□ Arrival time agreed (earlier than train)
□ Wheelchair dimensions noted if powered
□ Connection time realistic
□ Companion knows meeting point
□ If failed: time, staff name, train headcode, photo of screen`,
    ifRefused: [
      "Ask for duty manager at station; request alternative routing or taxi policy per operator.",
      "Submit formal complaint to train operator with booking proof.",
      "For persistent access failures, contact Transport Focus or relevant ombudsman routes (check current guidance).",
      "Consider alternative transport if safety is at risk — do not board without safe ramp deployment.",
    ],
    officialLinks: [
      { label: "National Rail — Passenger Assist", href: "https://www.nationalrail.co.uk/help-and-assistance/passenger-assist/" },
      { label: "GOV.UK — Rail passenger rights", href: "https://www.gov.uk/rail-passengers-rights" },
    ],
    relatedLinks: [
      { label: "Trains and Passenger Assist (broader guide)", href: "/advice/trains-and-passenger-assistance" },
    ],
  }),

  buildGuide({
    slug: "school-reasonable-adjustments",
    title: "School Reasonable Adjustments: A Parent’s Guide",
    seoTitle: "School reasonable adjustments: a parent’s guide",
    metaDescription:
      "How to request school reasonable adjustments in the UK, evidence to use, meeting tips, and escalation if support is not delivered.",
    excerpt:
      "Schools must remove barriers for disabled pupils. Document the disadvantage, ask for specific adjustments, and track delivery in writing.",
    readTimeMinutes: 11,
    categorySlug: "education",
    tags: ["School", "SEND", "Adjustments", "Parents"],
    summary:
      "Schools in England must make reasonable adjustments for disabled pupils and must not discriminate. Adjustments can cover access, toileting, sensory environment, communication, and participation in trips. This is separate from but often overlaps with SEN support and EHC plans.",
    who: [
      "Parents and carers of disabled children in mainstream or special schools in England (other UK nations have different systems).",
      "Young people able to advocate for themselves with support.",
      "Supporters attending meetings with parental consent.",
    ],
    whatAvailable: [
      "Environmental adjustments (quiet space, seating, lighting, movement breaks).",
      "Toileting and personal care plans with dignity preserved.",
      "Communication supports (visual timetables, extra processing time).",
      "Adjustments to trips, PE, and exams where relevant.",
      "SEN Support or EHC plan provision where needs require structured provision (see EHCP guide).",
    ],
    evidence: [
      "Medical or therapy letters describing functional impact at school (not only diagnosis).",
      "Your own dated log: incidents, exclusions, missed learning, distress, fatigue.",
      "Emails from school showing what was promised.",
      "Reports from CAMHS, OT, SALT, or educational psychologist if you have them.",
    ],
    steps: [
      "List barriers by school activity: classroom, corridor, playground, lunch, toilets, transport.",
      "Request a meeting with SENCO or head of year — bring a one-page summary.",
      "Propose specific adjustments with who will do them and start date.",
      "Follow up meeting notes in email: “I understand we agreed…”",
      "Review after half a term; note what was not implemented.",
      "If needs are extensive or unmet, consider whether an EHC needs assessment should be requested.",
    ],
    mistakes: [
      "Verbal-only agreements with no written follow-up.",
      "Letting school conflate “reasonable adjustment” with “we cannot afford it” without written rationale.",
      "Accepting reduced attendance without examining whether access caused it.",
      "Sharing full medical records without tying them to school barriers.",
    ],
    templateTitle: "One-page meeting summary for parents",
    templateBody: `Child: [Name]   Year: [X]
Barriers this term:
- [Barrier + impact on learning/safety]

Adjustments requested:
1. [Who / what / when / how often]
2. [...]

Review date: [date]
Parent contact: [email]`,
    ifRefused: [
      "Ask school for written explanation of refusal or delay.",
      "Complain through school complaints policy; keep copies.",
      "Contact local SENDIASS for free advice.",
      "Consider EHC needs assessment request if support needs are substantial and sustained.",
    ],
    officialLinks: [
      { label: "GOV.UK — SEND", href: "https://www.gov.uk/children-with-special-educational-needs" },
      { label: "IPSEA — Free SEND advice", href: "https://www.ipsea.org.uk/" },
      { label: "Contact — SENDIASS finder", href: "https://www.contact.org.uk/advice-and-support/local-support-sendiass-services/" },
    ],
    relatedLinks: [
      { label: "Request an EHC needs assessment", href: "/advice/request-ehcp-needs-assessment" },
      { label: "Reasonable adjustments at school (existing)", href: "/advice/reasonable-adjustments-at-school" },
    ],
  }),

  buildGuide({
    slug: "request-ehcp-needs-assessment",
    title: "How to Request an EHC Needs Assessment",
    seoTitle: "How to request an EHC needs assessment",
    metaDescription:
      "Request an Education, Health and Care needs assessment in England: who can ask, what to include, timelines, and if the local authority refuses.",
    excerpt:
      "An EHC needs assessment is the gateway to an EHC plan. A clear request letter with examples beats a folder of clinic letters alone.",
    readTimeMinutes: 12,
    categorySlug: "education",
    tags: ["EHC plan", "SEND", "School", "Local authority"],
    summary:
      "In England, you can ask your local authority (LA) for an EHC needs assessment if your child may need more support than a school can provide through SEN Support alone. The LA decides whether to assess — your request should show sustained need, evidence tried, and impact on learning.",
    who: [
      "Parents, carers, or young people aged 16–25 in their own right.",
      "Schools can also request — but parents can request independently.",
      "Children and young people with special educational needs that may require an EHC plan.",
    ],
    whatAvailable: [
      "A formal multi-agency assessment of education, health, and care needs.",
      "An EHC plan if the LA agrees support must be set out in a plan (not guaranteed by requesting assessment).",
      "Advice from professionals (educational psychology, health, social care) as part of process.",
    ],
    evidence: [
      "School reports, report cards, behaviour logs, attendance data.",
      "SEN Support plans and reviews showing what was tried and outcomes.",
      "Therapy or medical letters linked to learning and participation.",
      "Parent diary of needs at home and school.",
      "Examples of work showing gap between potential and output if relevant.",
    ],
    steps: [
      "Speak to SENCO about concerns and document what school has tried.",
      "Send written request to LA — use their form or a letter; keep proof of sending.",
      "Include child’s details, school, needs, evidence, and why assessment is necessary.",
      "LA must respond within legal timeframe — mark your calendar from send date.",
      "If LA agrees to assess, cooperate with information requests quickly.",
      "If LA refuses assessment, you receive decision with right to mediation and appeal (check letter).",
    ],
    mistakes: [
      "Requesting without showing what support was already attempted.",
      "Sending only diagnosis letters without educational impact.",
      "Missing LA’s own form requirements if they specify mandatory fields.",
      "Letting school delay providing records — chase in writing.",
    ],
    templateTitle: "Request letter skeleton",
    templateBody: `To: [Local authority SEND team]

I request an Education, Health and Care needs assessment for [child name], DOB [date], attending [school].

[Child] has [describe needs and impact on learning/access].

Support so far: [SEN Support actions + dates + outcomes]

Why assessment is needed: [why current support is insufficient]

Enclosed: [list of evidence]

Parent/carer: [name, address, phone, email]
Date:`,
    ifRefused: [
      "Read refusal letter — grounds must be explained.",
      "Consider mediation through the LA’s published route.",
      "You may appeal to the SEND Tribunal within the deadline on your letter — get IPSEA or SENDIASS advice quickly.",
    ],
    officialLinks: [
      { label: "GOV.UK — EHC plans", href: "https://www.gov.uk/children-with-special-educational-needs/extra-SEN-help" },
      { label: "IPSEA — EHC needs assessment", href: "https://www.ipsea.org.uk/pages/education/ehc-needs-assessments-and-plans/ehc-needs-assessments" },
    ],
    relatedLinks: [
      { label: "EHC plans: the basics for families", href: "/advice/ehc-plan-basics" },
      { label: "School reasonable adjustments", href: "/advice/school-reasonable-adjustments" },
    ],
  }),

  buildGuide({
    slug: "blue-badge-application-renewal",
    title: "Blue Badge Application: Evidence, Eligibility and Renewal Tips",
    seoTitle: "Blue Badge application, evidence and renewal",
    metaDescription:
      "Apply or renew a UK Blue Badge: automatic eligibility, evidence for discretionary awards, and common council mistakes.",
    excerpt:
      "Blue Badge rules combine national criteria and local council decisions. Match evidence to how you travel and park in practice.",
    readTimeMinutes: 9,
    categorySlug: "cars",
    tags: ["Blue Badge", "Parking", "Motability", "Council"],
    summary:
      "The Blue Badge helps disabled people park closer to destinations. Some people qualify automatically (e.g. certain benefits or blindness). Others apply through the local council with evidence of mobility problems. Renew before expiry — gaps can cause fines or loss of concessions.",
    who: [
      "Disabled people with severe mobility problems who meet automatic or discretionary criteria.",
      "Parents applying for badges for children with qualifying needs.",
      "Existing badge holders due for renewal (check expiry date).",
    ],
    whatAvailable: [
      "Parking in designated disabled bays and on-street concessions (rules vary by council).",
      "Some exemptions or extended time in certain zones — always read local signs.",
      "Organisational badges for organisations transporting disabled people (different rules).",
    ],
    evidence: [
      "Award letters for qualifying benefits (check current automatic eligibility list on GOV.UK).",
      "Proof of identity, address, and photo for new applications.",
      "For discretionary applications: walking ability description, aids used, falls, pain, fatigue distances.",
      "Supporting letter from GP or consultant describing mobility impact (not just diagnosis).",
    ],
    steps: [
      "Check if you qualify automatically on GOV.UK before gathering discretionary evidence.",
      "Apply through your local council website (England) or devolved routes in Scotland/Wales/NI.",
      "Upload clear photos of documents; keep file sizes within portal limits.",
      "For renewal, start before expiry — processing times vary.",
      "If refused, read grounds and consider reapplication with stronger functional evidence or advice.",
    ],
    mistakes: [
      "Using badge when someone else drives without the badge holder being present (misuse rules).",
      "Parking on yellow lines where local rules still restrict badge use.",
      "Submitting only a diagnosis without walking / transport impact.",
      "Letting badge expire while waiting for renewal.",
    ],
    templateTitle: "Discretionary evidence summary (for your draft)",
    templateBody: `I can walk [distance] without severe difficulty using [aids].
Typical journeys: [shop / school / hospital]
Barriers: [pain, breathlessness, falls risk, unpredictable fatigue]
Why closer parking is needed: [cannot reliably reach destination from standard parking]`,
    ifRefused: [
      "Request review or appeal route shown on council letter (process varies).",
      "Ask welfare or disability advice service for help with wording on reapplication.",
      "Update evidence with fresh GP letter focused on mobility outdoors.",
    ],
    officialLinks: [
      { label: "GOV.UK — Blue Badge scheme", href: "https://www.gov.uk/blue-badge-scheme-information-council" },
      { label: "GOV.UK — Apply for or renew a Blue Badge", href: "https://www.gov.uk/apply-blue-badge" },
    ],
    relatedLinks: [
      { label: "Driving, Blue Badge and enforcement", href: "/advice/driving-parking-enforcement-basics" },
    ],
  }),

  buildGuide({
    slug: "disabled-facilities-grant-home-adaptations",
    title: "Disabled Facilities Grant: How to Get Home Adaptations Funded",
    seoTitle: "Disabled Facilities Grant: home adaptations funding",
    metaDescription:
      "How Disabled Facilities Grants work in England: ramps, wet rooms, stairlifts, eligibility, council process, and means test basics.",
    excerpt:
      "DFG can fund major home adaptations through your council. Start with an occupational therapy assessment and clear quotes.",
    readTimeMinutes: 11,
    categorySlug: "equipment",
    tags: ["DFG", "Home adaptations", "Housing", "OT"],
    summary:
      "A Disabled Facilities Grant (DFG) helps pay for adaptations so a disabled person can live safely at home — for example ramps, stairlifts, level-access showers, and widening doors. In England maximum amounts are set nationally but administered locally; Scotland, Wales, and Northern Ireland have different schemes.",
    who: [
      "Disabled owners, tenants, and landlords applying for adaptations for a disabled occupant (rules differ for landlords).",
      "Households where someone cannot use essential rooms safely without adaptation.",
    ],
    whatAvailable: [
      "Ramps, stairlifts, hoists, wet rooms, widened doors, and heating adjustments in some cases.",
      "Minor adaptations sometimes via social care equipment services instead of DFG — ask council.",
      "Means-tested contribution may apply depending on household income (England).",
    ],
    evidence: [
      "Occupational therapy (OT) assessment recommending specific adaptations.",
      "Quotes from approved contractors (councils often need multiple quotes).",
      "Proof of ownership/tenancy and consent from landlord if renting.",
      "Photos of current access barriers and unsafe bathroom/kitchen setup.",
    ],
    steps: [
      "Contact local council housing adaptations or social care for OT referral.",
      "Complete OT home assessment — be clear about falls, transfers, washing, and egress in emergencies.",
      "Submit DFG application with OT report and contractor quotes.",
      "Wait for approval before starting works unless council confirms otherwise in writing.",
      "Use approved contractors where required; keep paperwork for grant payment flow.",
      "Review finished work with OT where possible.",
    ],
    mistakes: [
      "Starting building work before approval and expecting full reimbursement.",
      "Getting generic letters instead of OT specification of exact adaptations.",
      "Ignoring alternative funding (social care equipment, charitable grants) while DFG is slow.",
      "Not checking landlord permission for rented properties.",
    ],
    templateTitle: "Home barrier log (for OT visit)",
    templateBody: `Rooms I cannot use safely: [list]
Transfers: [bed / toilet / chair — help needed]
Falls/near misses (last 6 months): [dates]
Emergency egress: [can I leave quickly at night?]
Adaptations I think would help: [ramp / shower / stairlift — open to OT advice]`,
    ifRefused: [
      "Ask for written reasons and whether a smaller adaptation or equipment loan is available.",
      "Request reconsideration with updated OT report if health deteriorated.",
      "Contact local councillor or disability housing advice if delays are excessive — keep dates logged.",
    ],
    officialLinks: [
      { label: "GOV.UK — Disabled Facilities Grants", href: "https://www.gov.uk/disabled-facilities-grants" },
      { label: "Foundations — DFG guidance (England)", href: "https://www.foundations.uk.com/our-work/disabled-facilities-grant/" },
    ],
    relatedLinks: [
      { label: "Home access quick check", href: "/advice/home-access-quick-check" },
      { label: "Equipment funding advisor", href: "/advice/equipment" },
    ],
  }),

  buildGuide({
    slug: "care-needs-assessment-social-services",
    title: "Care Needs Assessment: How to Ask Social Services for Help",
    seoTitle: "Care needs assessment: ask social services for help",
    metaDescription:
      "Request a UK adult social care needs assessment: who qualifies, how to ask, carer assessments, and if the council says no.",
    excerpt:
      "A care needs assessment is how adults ask the council what support might be available. Be specific about tasks you cannot do safely at home.",
    readTimeMinutes: 10,
    categorySlug: "care",
    tags: ["Social care", "Care assessment", "Carers", "Council"],
    summary:
      "Adult social care in England must assess people who appear to need care and support. The assessment looks at what you need to achieve daily outcomes — washing, dressing, meals, safety, relationships, work — not just your diagnosis. Financial assessment for charges is separate.",
    who: [
      "Adults with care and support needs in England (other UK nations have different systems).",
      "Carers may be entitled to a separate carer’s assessment.",
      "People being discharged from hospital who need ongoing care planning.",
    ],
    whatAvailable: [
      "Care and support plan setting eligible needs.",
      "Support at home (care visits, equipment, technology).",
      "Day services or respite in some cases.",
      "Direct payments to arrange your own care if eligible.",
      "Care home funding only if needs meet eligibility and financial rules — not automatic.",
    ],
    evidence: [
      "List of tasks you cannot complete safely alone (with examples and frequency).",
      "Hospital discharge papers if relevant.",
      "GP or consultant letters describing functional needs.",
      "Carer statement of what they do daily and impact on their health.",
    ],
    steps: [
      "Contact local council adult social care — online form or phone; record date and reference.",
      "Describe needs plainly: washing, toileting, meals, medication, mobility, loneliness risk, night care.",
      "Allow assessor home visit or phone assessment; have supporter present if you want.",
      "Read draft care plan — check what needs are eligible vs what council will fund.",
      "Complete financial assessment if charges apply — get advice if confused.",
      "If offered direct payment, understand employment duties for personal assistants.",
    ],
    mistakes: [
      "Minimising needs during assessment out of pride — describe worst realistic days.",
      "Assuming NHS CHC funding applies (different test for health-dominated needs).",
      "Not requesting carer assessment in parallel.",
      "Accepting “not eligible” without written explanation and appeal route.",
    ],
    templateTitle: "Pre-assessment daily tasks list",
    templateBody: `Morning: [washing, dressing, meds — help needed?]
Meals: [prep / swallow / timing]
Toileting: [frequency, accidents, equipment]
Mobility: [indoors / outdoors, falls]
Night: [turning, monitoring, emergencies]
Carer strain: [hours, sleep loss]`,
    ifRefused: [
      "Ask for written decision with eligibility rationale under Care Act.",
      "Contact local Healthwatch or advocacy service for help challenging process.",
      "If needs change, request reassessment — do not wait for annual review only.",
      "Seek NHS continuing healthcare screening if needs are primarily health care (separate pathway).",
    ],
    officialLinks: [
      { label: "GOV.UK — Needs assessment", href: "https://www.gov.uk/apply-needs-assessment-social-services" },
      { label: "GOV.UK — Care Act 2014 guidance", href: "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance" },
      { label: "Carers UK — Assessments", href: "https://www.carersuk.org/help-and-advice/getting-support/local-support/assessments/" },
    ],
    relatedLinks: [
      { label: "Personal budgets and direct payments", href: "/advice/care" },
      { label: "Employing a PA basics", href: "/advice/employing-a-personal-assistant-basics" },
    ],
  }),
];
