/**
 * Sections for `employing-a-personal-assistant-basics`.
 * Mock adverts, checklists, and forms are **Access Stamp originals** for illustration only —
 * not copies of any third-party pack. Always have contracts and policies checked against
 * current law, your council’s direct payment team, ACAS, and (where needed) an employment lawyer.
 */

type AdviceSection =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pre"; text: string }
  | { type: "callout"; tone: "warning" | "tip" | "contact" | "steps"; title: string; body: string };

export const PA_EMPLOYER_GUIDE_SECTIONS: AdviceSection[] = [
  {
    type: "h2",
    text: "Further reading: UK hubs (not affiliated)",
  },
  {
    type: "p",
    text: "User-led charities and regional direct-payment support services often publish recruitment packs, training, and PA matching tools. Two well-known examples are Independent Lives (direct payment support and PA recruitment information — see https://www.independentlives.org/ and their recruitment pages under Direct payment support services) and PA Pages (https://pa-pages.org/), which brings together employers, PAs, and training. Access Stamp is independent of both; we link them because many people find their structures useful when building their own paperwork.",
  },
  {
    type: "callout",
    tone: "tip",
    title: "How we used that inspiration",
    body: "Their sites emphasise choice and control, safer recruitment, interviews, and ongoing management. Below we recreated that idea with our own mock templates and checklists you can adapt — we did not reproduce their PDFs or wording.",
  },
  {
    type: "h2",
    text: "Start with a role profile and person specification",
  },
  {
    type: "p",
    text: "Before you advertise, write two things: a role profile (hours, location, tasks, boundaries) and a person specification (skills, experience, attitudes). They keep interviews fair and help you defend decisions if someone challenges why they were not appointed.",
  },
  {
    type: "pre",
    text: `PERSON SPECIFICATION (ONE PAGE) — Personal Assistant
Role ref: PA-001        Employer: [Your name or “individual employer”]        Date: [ ]

Essential
• Right to work in the UK (evidence on file before start).
• Reliable timekeeping; able to cover agreed shifts with reasonable notice for swaps.
• Respect for confidentiality, dignity, and consent in personal care.
• Ability to follow a written support plan and record visits accurately.
• [Add: e.g. manual handling certificate dated within 12 months] OR willingness to attend employer-funded training before lone working.

Desirable
• Experience supporting [autism / stroke / MS / mental health crisis plan / other — be specific].
• Full UK driving licence and business-use insurance if driving your vehicle.
• Cooking textured diets / epilepsy awareness / BSL basics — only if genuinely needed.

Not required (say so to widen the pool)
• [e.g. “No formal care qualification required — induction provided.”]

Red lines (instant mismatch)
• Cannot work early mornings / cannot work weekends — if non-negotiable, state shifts here.
• Refuses to use hoist after training — if hoisting is essential.`,
  },
  {
    type: "h2",
    text: "Document pack: what to keep on file",
  },
  {
    type: "ul",
    items: [
      "Signed contract or written statement of particulars (hours, pay, location, job title, holiday, sick pay rules, notice).",
      "Right to work check record (copies dated, method noted — follow https://www.gov.uk/ ).",
      "DBS certificate or application reference + update service invite if used.",
      "Two references, ideally one from a past care or customer-facing role, with gaps explained.",
      "Emergency contacts, GP surgery, allergy list, and “do not resuscitate” status only if applicable and lawfully documented.",
      "Moving and handling plan, sling ID, and medication protocol signed off by appropriate professionals where needed.",
      "Timesheet template, mileage rules (if any), and how overtime or swaps are agreed in writing.",
      "Supervision dates for probation — short notes after each meeting.",
    ],
  },
  {
    type: "h2",
    text: "Recruitment checklist (from advert to first shift)",
  },
  {
    type: "ul",
    items: [
      "☐ Budget confirmed with council / DP account: hourly cap, maximum hours, employer costs (NI, pension, insurance).",
      "☐ Person spec agreed with anyone else in the household who is affected.",
      "☐ Advert drafted (see mock below); posted where you recruit (job board, PA Pages-style platforms, local notice, word of mouth).",
      "☐ Application deadline and shortlist criteria fixed *before* you read CVs.",
      "☐ Interview questions and scoring grid prepared (see mock scorecard).",
      "☐ Trial/shadow shifts scheduled with overlap if tasks are complex.",
      "☐ Offer sent in writing; start date; probation length (often 3–6 months).",
      "☐ Payroll or managed account instructed; HMRC starter checklist completed.",
      "☐ Keys / codes / alarm instructions only issued after trust and contract start (many employers use a lockbox later).",
    ],
  },
  {
    type: "h2",
    text: "Mock job advert (edit every bracket)",
  },
  {
    type: "pre",
    text: `PERSONAL ASSISTANT — [part-time / job share / full-time]
[Your town / postcode sector]   From £[rate] per hour   [e.g. “Evenings 4pm–8pm + alternate Saturday mornings”]

About us
I am a disabled person who employs my own staff using a direct payment. I need practical, respectful support at home so I can [work / study / parent / manage health appointments — pick what fits].

The role
• Personal care: washing, dressing, toileting — following my pacing and dignity preferences.
• [Meal preparation / prompting fluids / light kitchen tidy after meals].
• [Prompting medication only / medication administration only after training — delete one line].
• [Domestic: only tasks linked to care, e.g. change bed, laundry related to continence — be explicit].
• Accompanying me to [shops / GP / leisure] when booked in advance.

What I am looking for
Someone [calm under pressure / confident with hoists / comfortable with pets — edit]. You must respect boundaries: this is a professional relationship, not a friendship or therapy service.

Requirements
• Experience of [X] preferred; full paid induction and shadow shifts provided.
• Right to work in the UK — evidence required before first paid hour.
• [Driving licence essential / not required].

To apply
Email [address] with CV and a short note (max 300 words) explaining how you meet the person specification. Interviews [dates / “rolling”]. I welcome disabled applicants.

Equal opportunities
I recruit on merit against the person specification. Reasonable adjustments to the application or interview process are available — ask.`,
  },
  {
    type: "h2",
    text: "Sifting applications fairly",
  },
  {
    type: "ul",
    items: [
      "Score each application 1–5 against each **essential** criterion only on first pass.",
      "Note unexplained gaps > 3 months; ask once at interview — there are lawful innocent reasons.",
      "Do not use social media “vibe checks” instead of references — bias risk is high.",
      "If you use AI to summarise CVs, you remain responsible for final decisions and equality law.",
    ],
  },
  {
    type: "h2",
    text: "Interview scorecard (mock)",
  },
  {
    type: "pre",
    text: `Candidate: _______________  Date: ____  Interviewers: _______________

Score 0–2 each (0=no evidence, 1=partial, 2=strong). Total out of 20.
A. Reliability & honesty (punctuality, gaps explained)     ___/2
B. Experience relevant to our support plan                   ___/2
C. Communication & boundaries (respect, clarity)            ___/2
D. Moving & handling / health awareness (if applicable)     ___/2
E. Medication understanding (prompt vs administer)        ___/2
F. Equality & dignity (examples, language used)            ___/2
G. Problem scenario responses (see questions below)        ___/4
H. Practical availability vs our rota                       ___/2

Scenario questions (pick 2–3)
1) “I prefer to shower myself but need you to pass items and steady my leg. How would we organise privacy?”
2) “If you arrived and I was unresponsive but breathing, what would you do?” (Look for 999 + recovery position awareness — not amateur diagnosis.)
3) “If another family member started giving you extra tasks mid-shift, how would you handle it?”

Notes:
_________________________________________________________________
Decision: ☐ Offer  ☐ Reject  ☐ Second interview   Reason: _________________________`,
  },
  {
    type: "h2",
    text: "Offer letter checklist (before they say yes)",
  },
  {
    type: "ul",
    items: [
      "☐ Job title, start date, first shift time, and probation end date.",
      "☐ Pay rate, pay dates, and whether bank holidays attract enhanced pay (if agreed).",
      "☐ Annual leave calculation for part-year starters (use gov.uk holiday calculators or payroll).",
      "☐ Sick pay: statutory minimum at least; explain how to report sickness.",
      "☐ Notice period both ways; disciplinary and grievance pointers (ACAS codes).",
      "☐ Confidentiality and data protection (what may never be posted online).",
    ],
  },
  {
    type: "h2",
    text: "New employee / first day induction form (mock)",
  },
  {
    type: "pre",
    text: `NEW STARTER INDUCTION — Personal Assistant
Employee name: __________________  Start date: __________

Household & access
• Address, parking, buzzer code / key safe rules: _________________________________
• Who else lives here; pets; allergies in the home: ________________________________

Safety & equipment
• Fire exits, evacuation plan if mobility equipment fails: ___________________________
• Hoist model ______ sling type/colour ________ (attach photo to care file if helpful)
• Oxygen / CPAP / epilepsy rescue plan location: ___________________________________

Daily rhythm (tick when explained)
☐ Morning routine priorities
☐ Meal times and dietary texture / allergies
☐ Toilet / commode / pad routine
☐ Medication: prompts only / administration after training (delete one)
☐ How I communicate pain, distress, or “need to cancel tone of day”

Boundaries
☐ Mobile phone use during personal care
☐ Guests / additional tasks from relatives — redirect to me
☐ Finishing on time unless pre-agreed extension

Signatures
Employee signature: _________________ Date: _____
Employer / representative: __________ Date: _____`,
  },
  {
    type: "h2",
    text: "Probation: light-touch review prompts",
  },
  {
    type: "ul",
    items: [
      "Week 2: What is working? What needs one concrete change?",
      "Week 6: Rota stress, sleep impact for either side, any training booked?",
      "Week 12: Confirm pass probation or extend with clear targets.",
    ],
  },
  {
    type: "h2",
    text: "Timesheet & mileage (simple mock)",
  },
  {
    type: "pre",
    text: `WEEK ENDING: ____/____/______
Employee: ________________  Employer ref: __________

Day    Start   Breaks   Finish   Total hrs   Notes (e.g. accompanied appointment)
Mon
Tue
Wed
Thu
Fri
Sat
Sun
                                    WEEK TOTAL: ______

Mileage (only if agreed in writing, business insurance confirmed)
Date   From / To                        Miles   Rate p/mile   £
                                                      TOTAL £: ______

Employee declaration: I confirm these hours are accurate.
Signed: ______________  Date: ______

Employer approval: ______________  Date: ______`,
  },
  {
    type: "h2",
    text: "Safer recruitment basics",
  },
  {
    type: "ul",
    items: [
      "Right to work checks — follow gov.uk lists; keep copies dated.",
      "References from prior care or employment roles, with gaps explained.",
      "DBS: the role and setting determine the appropriate level; update service can reduce repeat full applications.",
      "Interview with scenario questions, not only sympathy stories.",
    ],
  },
  {
    type: "callout",
    tone: "tip",
    title: "Probation and supervisions",
    body: "A short probation with clear review dates helps both sides. Brief notes after supervisions reduce awkward “suddenly it’s not working” conversations.",
  },
  {
    type: "h2",
    text: "Training, manual handling, and medication",
  },
  {
    type: "p",
    text: "Do not improvise hoisting, repositioning, or catheter care from online videos alone. Commission training tied to occupational therapy or nurse sign-off where needed. For medication prompts versus administration, the legal line matters — wrong assumptions create safeguarding and criminal risk.",
  },
  {
    type: "h2",
    text: "Boundaries, dignity, and harassment",
  },
  {
    type: "p",
    text: "PAs are at risk of harassment too; disabled employers also deserve respect. A simple code — how to raise concerns, how to swap tasks when pain spikes, how to end shifts on time — prevents burnout on both sides.",
  },
  {
    type: "h2",
    text: "When care is unsafe or abusive",
  },
  {
    type: "ul",
    items: [
      "Pause tasks that could injure either person; call 999 if immediate harm.",
      "Contact the council safeguarding team where an adult with care needs is at risk.",
      "Follow employment law on suspension and investigation where appropriate — ACAS guidance helps.",
    ],
  },
  {
    type: "h2",
    text: "Ending employment fairly",
  },
  {
    type: "p",
    text: "Use notice periods in the contract, meet pension and holiday pay duties, and give written reasons where required. Retaliation or “ghosting” creates tribunal risk and destabilises the person receiving care.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Important",
    body: "Employment law changes over time. Mock templates are not legal documents. Verify pay rates, notice, sick pay, and pension with ACAS, gov.uk, payroll, or a solicitor at the time you act.",
  },
];

/** Plain-text export of the same sections (single source of truth) for .txt download. */
export function buildPaRecruitmentPackPlainText(): string {
  const lines: string[] = [
    "ACCESS STAMP — PA recruitment pack (plain text export)",
    "Guide path: /advice/employing-a-personal-assistant-basics",
  ];
  const site =
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0
      ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "")
      : "";
  if (site) lines.push(`Full URL: ${site}/advice/employing-a-personal-assistant-basics`);
  lines.push(
    "",
    "Mock templates only — edit for your situation. Not legal, tax, or employment advice.",
    "Further UK hubs (not affiliated): https://www.independentlives.org/ — https://pa-pages.org/",
    "",
  );

  for (const block of PA_EMPLOYER_GUIDE_SECTIONS) {
    if (block.type === "h2") {
      lines.push("", "=".repeat(72), block.text.toUpperCase(), "=".repeat(72), "");
    } else if (block.type === "p") {
      lines.push(block.text.trim(), "");
    } else if (block.type === "ul") {
      lines.push(...block.items.map((item) => `• ${item}`), "");
    } else if (block.type === "pre") {
      lines.push("--- form / template ---", block.text.trim(), "");
    } else if (block.type === "callout") {
      const tag = block.tone === "warning" ? " (warning)" : "";
      lines.push(`--- ${block.title}${tag} ---`, block.body.trim(), "");
    }
  }
  return lines.join("\n");
}
