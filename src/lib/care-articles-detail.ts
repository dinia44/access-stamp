import type { AdviceArticle } from "@/lib/mock-data";

/**
 * Full-length care & support guides (England-focused where law differs by nation;
 * notes flag Wales/Scotland/NI where readers should verify locally).
 */
export const CARE_ARTICLES_DETAILED: AdviceArticle[] = [
  {
    slug: "personal-budgets-and-direct-payments",
    title: "Personal budgets and direct payments: control, paperwork, and risk",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Direct payments", "Personal budget", "Council", "Employer duties"],
    sections: [
      {
        type: "h2",
        text: "What a personal budget and direct payment actually are",
      },
      {
        type: "p",
        text: "After a care needs assessment, if you are eligible for care and support the council must produce a care and support plan (England, Care Act 2014). A personal budget is the amount of money the council calculates will meet those eligible needs. A direct payment is money paid to you (or a suitable person) so you can arrange care yourself instead of the council commissioning it. You gain flexibility; you also take on practical and sometimes legal responsibilities.",
      },
      {
        type: "ul",
        items: [
          "Managed account: a third party helps administer payroll and HMRC — still your decisions, less day-to-day admin.",
          "Individual service fund: an agreed provider holds the budget on agreed terms.",
          "Third-party payment: someone you trust receives the payment on your behalf when you cannot manage alone.",
        ],
      },
      {
        type: "h2",
        text: "What you can spend the money on (and what trips audits)",
      },
      {
        type: "p",
        text: "Spend must meet the eligible needs in your plan. Councils publish local policies, but common allowable costs include personal assistant wages, employer National Insurance, pensions where auto-enrolment applies, payroll fees, recruitment advertising, DBS checks where appropriate, and employer liability insurance. Holiday pay for employees accrues in law — do not skip it because the budget feels tight; fix the plan with the council instead.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Paperwork that saves you later",
        body: "Keep timesheets, payslips, contracts, invoices, and bank statements aligned to the plan. If a safeguarding or HMRC query appears, vague memory is not evidence.",
      },
      {
        type: "h2",
        text: "Employing a PA vs using self-employed PAs",
      },
      {
        type: "p",
        text: "Many councils expect you to employ PAs for ongoing personal care because employment rights and safeguarding are clearer. Labeling someone “self-employed” when they work fixed hours under your direction may not stand up with HMRC or in an employment tribunal. Take professional payroll advice before agreeing unusual structures.",
      },
      {
        type: "h2",
        text: "When cover fails: illness, resignation, and gaps",
      },
      {
        type: "ul",
        items: [
          "Build named backup: agency hours (if plan allows), family with limits, or second PA cross-trained on essentials.",
          "Keep a one-page emergency sheet: meds, allergies, hoist type, baseline behaviour, GP out-of-hours, DNACPR only if applicable and lawfully in place.",
          "If the council’s rate or hours are unrealistic for recruitment, ask for a review before crisis.",
        ],
      },
      {
        type: "h2",
        text: "Reviews, surpluses, and clawback",
      },
      {
        type: "p",
        text: "Plans should be reviewed when needs change. Large unspent balances can attract questions — sometimes you are saving for agreed equipment or respite; document that. If you spend outside the plan, the council may treat it as misuse and recover funds or end the direct payment.",
      },
      {
        type: "h2",
        text: "Wales, Scotland, and Northern Ireland",
      },
      {
        type: "p",
        text: "Direct payments exist in each nation but forms, names, and charging rules differ. Always use your local authority’s direct payments team and national guidance (Social Care Wales, Scottish Government social care pages, NI Health and Social Care Trusts) for thresholds and templates.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This guide is not legal, financial, or tax advice. For disputes over misuse allegations, employment claims, or HMRC investigations, seek specialist advice promptly.",
      },
    ],
  },
  {
    slug: "employing-a-personal-assistant-basics",
    title: "Employing a PA: checks, boundaries, and stopping unsafe care",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["PA", "Employment", "Recruitment", "Safety"],
    sections: [
      {
        type: "h2",
        text: "Start with a written role profile",
      },
      {
        type: "p",
        text: "List tasks, times, locations, and what is explicitly not included (e.g. heavy clinical procedures you are not commissioning). Include how lone working, keys, and medication support will work. Ambiguity creates boundary drift — especially on domestic extras, transport, or emotional load.",
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
          "DBS: the role and setting determine the appropriate level; use the DBS update service where it helps continuity.",
          "Interview with scenario questions, not only sympathy stories.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Probation and supervisions",
        body: "A short probation with clear review dates helps both sides. Brief weekly notes on what worked reduce awkward “suddenly it’s not working” conversations.",
      },
      {
        type: "h2",
        text: "Training, manual handling, and medication",
      },
      {
        type: "p",
        text: "Do not improvise hoisting, repositioning, or catheter care from YouTube. Commission training tied to occupational therapy or nurse sign-off where needed. For medication prompts vs administration, the legal line matters — wrong assumptions create safeguarding and criminal risk.",
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
        body: "Employment law changes over time. This is general information, not legal advice — verify notice periods, national minimum wage rates, and sick pay rules at the time you act.",
      },
    ],
  },
  {
    slug: "care-act-assessments-and-eligibility",
    title: "Care Act assessments: eligibility, wellbeing, and delays",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Care Act", "Eligibility", "Assessment", "Council"],
    sections: [
      {
        type: "h2",
        text: "The duty to assess",
      },
      {
        type: "p",
        text: "Under the Care Act 2014 (England), where it appears an adult may have needs for care and support, the local authority must carry out a needs assessment — regardless of your income or savings. Needs can be physical, mental, or a combination. The assessment should involve you and be proportionate; it is not a memory test you must pass.",
      },
      {
        type: "h2",
        text: "How eligibility is decided",
      },
      {
        type: "p",
        text: "Eligibility uses national criteria based on whether you are unable to achieve specified outcomes — such as eating, maintaining personal hygiene, managing toilet needs, being appropriately clothed, staying safe at home, maintaining a habitable home, and developing/maintaining family or work relationships — and whether that inability causes, or is likely to cause, a significant impact on wellbeing. “Significant” is a judgment call; weak reasoning can be challenged.",
      },
      {
        type: "h2",
        text: "Preparing evidence that helps, not overwhelms",
      },
      {
        type: "ul",
        items: [
          "Daily living: washing, dressing, meals, continence, moving around the home, stairs, night needs.",
          "Risks: falls, seizures, confusion with gas or meds, pressure injury, choking.",
          "Cognition and communication: needing prompts, reassurance, or advocacy.",
          "Carer breakdown: if an unpaid carer cannot continue safely, say so plainly.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Delays and urgency",
        body: "If delay creates risk — no care after discharge, dehydration, missed meds — put it in writing to the council with dates and risks. Ask for interim support and copy your GP or ward. Some situations engage safeguarding or NHS continuing healthcare screening.",
      },
      {
        type: "h2",
        text: "Financial assessment and charging",
      },
      {
        type: "p",
        text: "Eligibility for care is separate from who pays. If the council meets needs, it will usually carry out a financial assessment. Capital limits and tariff income rules change — check current thresholds on gov.uk. Some disability-related expenses can be disregarded in the calculation if properly evidenced.",
      },
      {
        type: "h2",
        text: "Care plans and personal budgets",
      },
      {
        type: "p",
        text: "If eligible, you should receive a care and support plan showing needs, outcomes, and how they will be met — including personal budget details where relevant. Vague plans (“four calls per day”) are hard to enforce; ask for specificity on times, tasks, and contingency.",
      },
      {
        type: "h2",
        text: "Children, young carers, and other nations",
      },
      {
        type: "p",
        text: "Children’s social care uses different legislation (Children Act 1989 etc.). Young carers may need separate support. Wales, Scotland, and Northern Ireland use different statutes and terminology — always confirm local duties.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This is not legal advice. For appeals, judicial review time limits, or complex NHS/social care boundaries, contact a welfare rights or community care solicitor early.",
      },
    ],
  },
  {
    slug: "when-care-plans-break-down",
    title: "When care breaks down: escalation, safeguarding, and hospital discharge",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Crisis", "Safeguarding", "Discharge", "Escalation"],
    sections: [
      {
        type: "h2",
        text: "Name the gap in one paragraph",
      },
      {
        type: "p",
        text: "Write what was agreed (hours, tasks, provider), what actually happened, dates/times, and the risk: missed turns, soaked pads, no medication prompt, lone working without a working alarm, verbal abuse, or no cover after agency cancellation. Factual tone helps complaints teams and safeguarding.",
      },
      {
        type: "h2",
        text: "Safeguarding adults",
      },
      {
        type: "p",
        text: "If an adult with care needs is experiencing or at risk of abuse or neglect and cannot protect themselves, the local authority must make enquiries under Care Act section 42 where the threshold is met. That can include self-neglect in some areas’ policies. Multi-Agency Safeguarding Hub (MASH) routes vary by council — phone the adult social care line and ask for safeguarding.",
      },
      {
        type: "ul",
        items: [
          "Immediate danger: call 999.",
          "Medical deterioration: NHS 111 or 999 as appropriate; mention care failure as context.",
          "Financial abuse by a carer: police and bank fraud teams may be relevant alongside safeguarding.",
        ],
      },
      {
        type: "h2",
        text: "Hospital discharge and the “unsafe to go home” scenario",
      },
      {
        type: "p",
        text: "Discharge should be safe and lawful. If home care is not in place, equipment not delivered, or property unsuitable, escalate to the ward manager, hospital PALS, and the council’s urgent social care duty. Integrated care systems sometimes have discharge hubs — ask for named contacts.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Chronologies win complaints",
        body: "A one-page timeline beats fifty emotional emails. Attach the care plan, missed visit logs, and any GP letter about impact.",
      },
      {
        type: "h2",
        text: "Provider vs council responsibility",
      },
      {
        type: "p",
        text: "If the council commissions an agency, both may have roles: the agency for delivery, the council for sufficiency of care. If you employ PAs with a direct payment, employer responsibility sits with you — but the council still owes care planning and sometimes contingency advice.",
      },
      {
        type: "h2",
        text: "NHS Continuing Healthcare (CHC)",
      },
      {
        type: "p",
        text: "Some people with intense health needs should be assessed for NHS-funded CHC instead of means-tested social care. Poorly coordinated discharge can miss this. Ask for screening if needs are primarily health-managed — specialist advice matters because CHC refusals are often appealed.",
      },
      {
        type: "h2",
        text: "Regulators and MPs",
      },
      {
        type: "p",
        text: "CQC regulates registered providers in England; it does not resolve individual contract disputes but can take patterns seriously. Councillors and MPs can chase system failures when individual complaints stall — use them for obstruction, not for clinical disagreements.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "If someone is deteriorating fast, prioritise medical and emergency routes over complaint processes.",
      },
    ],
  },
  {
    slug: "respite-carer-breaks-and-funded-support",
    title: "Respite and carer breaks: funded routes, family guilt, and realistic planning",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Respite", "Carers", "Council", "Replacement care"],
    sections: [
      {
        type: "h2",
        text: "Why respite is a safety issue, not a luxury",
      },
      {
        type: "p",
        text: "Unpaid carers running on empty make mistakes with medication, transfers, and judgment. The person they support loses consistency. Councils can arrange replacement care so carers can rest; some areas also fund sitting services, day centres, or short residential breaks. Waiting lists are real — start the conversation before burnout becomes A&E.",
      },
      {
        type: "h2",
        text: "Carer’s assessments and breaks",
      },
      {
        type: "p",
        text: "If you appear to have needs for support as a carer, the local authority should assess those needs (Care Act 2014, carers’ provisions). Support might include information, training, counselling, or services to prevent deterioration in your own health — including breaks. Bring sleep diaries, work strain, and mental health impact.",
      },
      {
        type: "h2",
        text: "Emergency vs planned respite",
      },
      {
        type: "ul",
        items: [
          "Emergency: sudden hospital admission of carer, mental health crisis, or safeguarding — phone the council duty line; out-of-hours may be thin.",
          "Planned: book months ahead; share medical and behaviour notes early so providers can staff safely.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Define the break in hours",
        body: "“A week off” is vague. Specify handover time, medication regime, dietary texture, night checks, and who pays transport to respite — ambiguity causes last-minute collapse.",
      },
      {
        type: "h2",
        text: "Children, disabled young people, and sibling carers",
      },
      {
        type: "p",
        text: "Short breaks for disabled children are often commissioned locally (statements vary). Young carers may be entitled to assessments and support in their own right. Sibling carers can be invisible — name their school and mental health needs in writing.",
      },
      {
        type: "h2",
        text: "Charities and self-funding",
      },
      {
        type: "p",
        text: "When statutory funding is slow, charities sometimes offer grants or sitting services — eligibility varies. Self-funding breaks while waiting for assessment is unfair but common; keep receipts if you later seek reimbursement as part of a complaint remedy.",
      },
      {
        type: "h2",
        text: "Guilt and family dynamics",
      },
      {
        type: "p",
        text: "Guilt often blocks breaks. Reframe: rest reduces errors and resentment. If family members disagree, use a social worker or mediator where available.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Respite providers have their own safeguarding duties. Full honest disclosure of behaviours and risks protects everyone.",
      },
    ],
  },
  {
    slug: "advocacy-social-care-complaints-and-ombudsman",
    title: "Advocacy and complaints: councils, LGSCO, and keeping escalation sane",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Complaints", "LGSCO", "Advocacy", "Council"],
    sections: [
      {
        type: "h2",
        text: "Independent advocacy under the Care Act",
      },
      {
        type: "p",
        text: "If you would have substantial difficulty in being involved in care processes and there is no appropriate individual to help, the local authority must arrange an independent advocate (Care Act sections 67–68). Difficulty can arise from communication needs, learning disability, mental health condition, or trauma. Ask in writing for Care Act advocacy; keep the response.",
      },
      {
        type: "h2",
        text: "Complaints: provider first, then council",
      },
      {
        type: "ul",
        items: [
          "Registered care provider: use their complaints procedure; escalate to CQC intelligence if serious risk.",
          "Council-commissioned care: you can complain to the council about commissioning failures even if the agency also has a duty.",
        ],
      },
      {
        type: "h2",
        text: "Local Government and Social Care Ombudsman (LGSCO)",
      },
      {
        type: "p",
        text: "For eligible complaints about adult social care maladministration, the LGSCO can investigate after local remedies are exhausted. Time limits apply (often 12 months from when you first knew the issue — confirm current rules on the LGSCO website). Remedies can include financial redress, reassessment, or apologies.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Build a complaint bundle",
        body: "Index PDF: chronology, care plan, emails, call logs (date, adviser name, summary), photos only if lawful and relevant, and a clear ask: what outcome would put this right?",
      },
      {
        type: "h2",
        text: "NHS overlap",
      },
      {
        type: "p",
        text: "NHS complaints use the Parliamentary and Health Service Ombudsman after local resolution. Discharge disputes and CHC refusals often straddle NHS and social care — wrong door wastes months. Specialist advocates exist for CHC.",
      },
      {
        type: "h2",
        text: "Legal routes",
      },
      {
        type: "p",
        text: "Judicial review can challenge unlawful council decisions but has strict time limits and cost risk. Solicitors specialising in community care law can advise on merits. Legal aid is limited but sometimes available.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This guide is not legal advice. Do not miss limitation dates while waiting for informal promises.",
      },
    ],
  },
  {
    slug: "continuity-when-agency-or-worker-changes",
    title: "Continuity when your agency or worker changes",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Agency", "Continuity", "Handover", "Risk"],
    sections: [
      {
        type: "h2",
        text: "Why turnover hurts",
      },
      {
        type: "p",
        text: "Every new face must learn hoist sling type, epilepsy plan, communication board, diabetes snacks, and “good day vs bad day” signs. When handovers are a five-minute phone call, errors cluster: wrong sling, missed allergy, missed fluid thickening, or unlocked doors.",
      },
      {
        type: "h2",
        text: "A living handover document",
      },
      {
        type: "ul",
        items: [
          "One front page: diagnosis list, allergies, DNACPR only if applicable, GP, district nurse, mental capacity notes.",
          "Daily routine: what “help” means step by step for washing, meals, and toilet.",
          "Behaviour: triggers, de-escalation, when to call family or 999.",
          "Equipment: hoist model, sling colour/size, profiling bed controls, oxygen concentrator rules.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Overlap shifts",
        body: "Refuse a single shadow shift for complex care unless risk is accepted in writing. Two or more overlaps let muscle memory transfer.",
      },
      {
        type: "h2",
        text: "When churn signals commissioning failure",
      },
      {
        type: "p",
        text: "Repeated cancelled calls, different staff daily, or untrained bank workers may breach contract expectations. Document patterns and ask the council contract monitoring team to intervene. Providers under financial strain sometimes cut corners — escalate safeguarding if neglect appears.",
      },
      {
        type: "h2",
        text: "Mental capacity and best interests",
      },
      {
        type: "p",
        text: "If the person lacks capacity for a specific decision, day-to-day care should follow a best-interests process — not staff preference. Lasting powers of attorney or deputies may exist; copies should be on file.",
      },
      {
        type: "h2",
        text: "Medication and MAR charts",
      },
      {
        type: "p",
        text: "Medication errors spike at transitions. Ask for MAR chart reconciliation between old and new teams; check PRN protocols and “when required” maximums in writing.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Never block lawful safeguarding or CQC access to protect a favourite worker. Report concerns through proper channels.",
      },
    ],
  },
  {
    slug: "informal-carers-assessment-and-support",
    title: "Informal carers: assessments, breaks, and when to ask for a carer’s assessment",
    categorySlug: "care",
    updated: "2026-05-07",
    tags: ["Carers", "Assessment", "Rights", "Support"],
    sections: [
      {
        type: "h2",
        text: "You are a carer even if you do not use the word",
      },
      {
        type: "p",
        text: "Unpaid carers include relatives, partners, friends, and neighbours providing support because of illness, disability, mental health, or addiction. You may have rights to assessment and support regardless of whether the person you care for accepts services themselves.",
      },
      {
        type: "h2",
        text: "Carer’s assessment (England overview)",
      },
      {
        type: "p",
        text: "Where it appears a carer may have needs for support, the local authority must assess (Care Act 2014). The assessment looks at whether the carer is willing and able to continue caring, whether they work or want to work, and whether they want education or training. Support can include information, respite, equipment, or counselling — subject to charging rules where services are provided to the carer.",
      },
      {
        type: "h2",
        text: "What to bring to the assessment",
      },
      {
        type: "ul",
        items: [
          "Sleep: night waking, turning, supervision, fear of seizures.",
          "Physical strain: lifting without training, back pain, no time for GP.",
          "Money: reduced hours, travel costs, heating for someone home all day.",
          "Mental health: anxiety, isolation, grief for the relationship before illness.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Young carers",
        body: "Children under 18 who care have separate rights to assessment and support. Schools should know — attendance and attainment often suffer silently.",
      },
      {
        type: "h2",
        text: "Carer’s Allowance and earnings",
      },
      {
        type: "p",
        text: "Carer’s Allowance has strict eligibility: caring 35+ hours weekly for someone on qualifying disability benefits, and an earnings limit that changes — always verify on gov.uk before taking extra paid hours. Overpayment recovery is stressful; log payslips.",
      },
      {
        type: "h2",
        text: "Employment rights for working carers",
      },
      {
        type: "p",
        text: "Employees have the right to request flexible working from day one in many cases (law has been updated — check current ACAS guidance). Carer’s leave entitlements have also been extended in legislation — confirm how many days per year apply when you read this. Unpaid leave is a safety net, not a wage replacement.",
      },
      {
        type: "h2",
        text: "When to say you cannot continue",
      },
      {
        type: "p",
        text: "It is not failure to admit limits. Giving councils early notice that care may collapse can trigger contingency planning. If you are at breaking point, say so in writing and ask for an urgent review of both the cared-for person’s plan and your carer’s assessment.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "If you or the person you care for is in immediate danger, use emergency services. This guide is not legal or benefits advice.",
      },
    ],
  },
];
