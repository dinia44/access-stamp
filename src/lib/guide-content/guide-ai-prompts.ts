type GuideAiPromptSet = {
  suggestions: string[];
  demoQuestion: string;
  demoIntro: string;
  demoAnswer: string[];
};

const SLUG_PROMPTS: Record<string, GuideAiPromptSet> = {
  "pip-renewal-form-what-to-write": {
    suggestions: [
      "Turn my PIP difficulties into clear activity examples.",
      "Check this PIP answer for vague wording.",
      "Help me match my evidence to PIP activities.",
    ],
    demoQuestion: "Turn my daily difficulties into PIP activity examples.",
    demoIntro: "Strong PIP answers describe function, not diagnosis:",
    demoAnswer: [
      "Name the task and what happens when you try it safely, repeatedly, and in reasonable time.",
      "Include help you need, aids, supervision, prompting, and recovery time after tasks.",
      "Use real examples from the last few weeks — including bad days.",
    ],
  },
  "access-to-work": {
    suggestions: [
      "Turn my work problems into an Access to Work barrier table.",
      "Help me write an Access to Work application summary.",
      "Draft a follow-up email after an Access to Work call.",
    ],
    demoQuestion: "Turn my work barriers into an Access to Work request.",
    demoIntro: "Access to Work is strongest when you explain three things:",
    demoAnswer: [
      "The work barrier — task, journey, environment, or communication issue.",
      "The impact — how it affects your ability to do the job safely or reliably.",
      "The support need — equipment, travel, human support, or workplace change.",
    ],
  },
  "reasonable-adjustments-at-work": {
    suggestions: [
      "Turn my workplace problem into a reasonable adjustment request.",
      "Check my email for weak wording.",
      "Draft a follow-up after an adjustment meeting.",
    ],
    demoQuestion: "Turn my workplace problem into a reasonable adjustment request.",
    demoIntro: "A clear access request names the barrier, impact, and adjustment:",
    demoAnswer: [
      "Because of [access need], I face difficulty with [task/environment].",
      "This puts me at a disadvantage because [impact].",
      "I am requesting [adjustment] so I can work safely and effectively.",
    ],
  },
  "book-train-assistance-passenger-assist": {
    suggestions: [
      "Create my Passenger Assist booking checklist.",
      "Draft a complaint about failed train assistance.",
      "Help me ask a station about step-free access.",
    ],
    demoQuestion: "Create my Passenger Assist booking checklist.",
    demoIntro: "Before you travel, confirm:",
    demoAnswer: [
      "Journey date, stations, train times, and booking reference saved offline.",
      "Mobility aid details, ramp needs, and realistic connection times.",
      "What to record if assistance fails on the day.",
    ],
  },
  "school-reasonable-adjustments": {
    suggestions: [
      "Turn my child's school barriers into adjustment requests.",
      "Draft an email to the SENCo.",
      "Prepare questions for a school support meeting.",
    ],
    demoQuestion: "Turn my child's school barriers into adjustment requests.",
    demoIntro: "Useful school requests follow this pattern:",
    demoAnswer: [
      "This is the barrier at school (not just the diagnosis).",
      "This is the impact on learning, safety, or participation.",
      "This is the adjustment requested, who owns it, and when it will be reviewed.",
    ],
  },
  "care-needs-assessment-social-services": {
    suggestions: [
      "Turn my daily care needs into assessment wording.",
      "Draft an email requesting a care needs assessment.",
      "Make a care diary template for one week.",
    ],
    demoQuestion: "Turn my daily support needs into assessment wording.",
    demoIntro: "Strong assessment requests name tasks and risk:",
    demoAnswer: [
      "Which daily tasks are unsafe or unreliable without help.",
      "How often support is needed and what happens without it.",
      "How this affects wellbeing and unpaid carer strain.",
    ],
  },
  "pip-mandatory-reconsideration": {
    suggestions: [
      "Help me respond to DWP's PIP decision reasons.",
      "Check my MR letter for vague wording.",
      "Build an evidence list for mandatory reconsideration.",
    ],
    demoQuestion: "Help me respond to DWP's PIP decision reasons.",
    demoIntro: "MR letters work best when they:",
    demoAnswer: [
      "Quote each reason DWP gave and answer with dated functional examples.",
      "Add new evidence that shows impact, not just diagnosis.",
      "Are sent within the deadline with proof of submission.",
    ],
  },
  "blue-badge-application-renewal": {
    suggestions: [
      "Help me explain my Blue Badge mobility difficulty.",
      "Make a Blue Badge evidence checklist.",
      "Draft a renewal explanation.",
    ],
    demoQuestion: "Help me explain my Blue Badge mobility difficulty.",
    demoIntro: "Explain what happens when you walk or travel:",
    demoAnswer: [
      "Pain, breathlessness, fatigue, falls, distress, or disorientation.",
      "Distance or time you can manage before needing to stop.",
      "Why parking closer reduces risk on typical journeys.",
    ],
  },
  "disabled-facilities-grant-home-adaptations": {
    suggestions: [
      "Turn my home access problems into a DFG request.",
      "Draft an email asking for an OT adaptations assessment.",
      "Make a home barrier checklist.",
    ],
    demoQuestion: "Turn my home access problems into a DFG request.",
    demoIntro: "Start with the task, not the product:",
    demoAnswer: [
      "Name the home barrier (bathroom, stairs, entrance, bedroom).",
      "Explain risk, frequency, and what happens without adaptation.",
      "Ask the council about OT assessment and DFG process before major work.",
    ],
  },
  "universal-credit-lcwra-work-capability": {
    suggestions: [
      "Turn my health limits into WCA wording.",
      "Check if my answer is too diagnosis-focused.",
      "Make a UC assessment evidence checklist.",
    ],
    demoQuestion: "Turn my health limits into WCA wording.",
    demoIntro: "Explain what you cannot do safely and repeatedly:",
    demoAnswer: [
      "Link symptoms to functional limits, risk, and after-effects.",
      "Include bad days and recovery time after attempting activities.",
      "Use real examples, not only condition labels.",
    ],
  },
  "trains-and-passenger-assistance": {
    suggestions: [
      "Create my Passenger Assist booking checklist.",
      "Draft a complaint about failed train assistance.",
      "Help me plan a journey with realistic connection times.",
    ],
    demoQuestion: "Create my Passenger Assist booking checklist.",
    demoIntro: "Strong rail plans include:",
    demoAnswer: [
      "Booking reference saved offline and connection times that allow for assistance.",
      "Mobility aid details, ramp needs, and meeting point confirmation.",
      "What to record if assistance fails on the day.",
    ],
  },
  "buses-and-local-access": {
    suggestions: [
      "Draft a bus access complaint with the right details.",
      "Help me explain why a ramp or space refusal was unsafe.",
      "Make a bus incident log for my route.",
    ],
    demoQuestion: "Draft a bus access complaint with the right details.",
    demoIntro: "Useful bus complaints include:",
    demoAnswer: [
      "Route, time, fleet or registration number, and what was refused.",
      "Why the refusal was unsafe or against policy.",
      "What remedy or follow-up you are requesting.",
    ],
  },
  "flying-with-a-wheelchair-uk": {
    suggestions: [
      "Make my wheelchair air travel information sheet.",
      "Draft an airline assistance email.",
      "Draft a wheelchair damage complaint.",
    ],
    demoQuestion: "Make my wheelchair air travel information sheet.",
    demoIntro: "Tell the airline early about:",
    demoAnswer: [
      "Chair type, dimensions, weight, battery type, and transfer needs.",
      "Handling instructions and photos before handover.",
      "What to do immediately if equipment is damaged.",
    ],
  },
  "choosing-a-wheelchair": {
    suggestions: [
      "Make a wheelchair trial checklist for my home and routes.",
      "Help me compare manual vs powered options for my needs.",
      "Draft questions for NHS wheelchair services.",
    ],
    demoQuestion: "Make a wheelchair trial checklist for my home and routes.",
    demoIntro: "Before you commit, test:",
    demoAnswer: [
      "Door widths, turning circles, transport fit, and typical daily distances.",
      "Cushion, posture, and pressure risk with a clinician if needed.",
      "Repair, warranty, and who funds adjustments after delivery.",
    ],
  },
  "equality-act": {
    suggestions: [
      "Turn my access problem into a reasonable adjustment request.",
      "Help me explain substantial disadvantage in plain English.",
      "Draft a formal complaint about disability discrimination.",
    ],
    demoQuestion: "Turn my access problem into a reasonable adjustment request.",
    demoIntro: "Equality Act requests work best when they:",
    demoAnswer: [
      "Name the barrier and how it puts you at a disadvantage.",
      "Propose a practical adjustment that would reduce the barrier.",
      "Ask for a written response and review date.",
    ],
  },
  "formal-complaints": {
    suggestions: [
      "Draft a formal complaint letter with timeline and remedy.",
      "Help me list evidence for my complaint.",
      "Check if my complaint wording is too vague.",
    ],
    demoQuestion: "Draft a formal complaint letter with timeline and remedy.",
    demoIntro: "Strong complaints include:",
    demoAnswer: [
      "Dates, who was involved, what happened, and what you asked for.",
      "The impact on you and the remedy you want.",
      "A clear deadline for response and escalation route if ignored.",
    ],
  },
  "nhs-complaints": {
    suggestions: [
      "Draft an NHS complaint with the right timeline.",
      "Help me explain access failures at appointments.",
      "Make an NHS complaint evidence checklist.",
    ],
    demoQuestion: "Draft an NHS complaint with the right timeline.",
    demoIntro: "NHS complaints should:",
    demoAnswer: [
      "Start with PALS where helpful, then formal complaint if needed.",
      "Use dates, departments, and specific access or care failures.",
      "Request written acknowledgment and response timeframe.",
    ],
  },
  dfg: {
    suggestions: [
      "Turn my home access problems into a DFG request.",
      "Draft an email asking for an OT adaptations assessment.",
      "Make a home barrier checklist.",
    ],
    demoQuestion: "Turn my home access problems into a DFG request.",
    demoIntro: "Start with the task, not the product:",
    demoAnswer: [
      "Name the home barrier and what happens without adaptation.",
      "Explain risk, frequency, and urgency.",
      "Ask the council about OT assessment and DFG process before major work.",
    ],
  },
  "access-to-work-basics": {
    suggestions: [
      "Turn my work barriers into an Access to Work request.",
      "Help me list what Access to Work may fund.",
      "Draft a follow-up after an Access to Work call.",
    ],
    demoQuestion: "Turn my work barriers into an Access to Work request.",
    demoIntro: "Apply by explaining the barrier first:",
    demoAnswer: [
      "The work task or journey that is difficult.",
      "What happens without support — impact, risk, or absence.",
      "The support that would reduce the barrier.",
    ],
  },
  "reasonable-adjustments-you-can-ask-for": {
    suggestions: [
      "Turn my workplace barrier into adjustment examples.",
      "Help me draft a reasonable adjustment request.",
      "Suggest adjustments for my specific work tasks.",
    ],
    demoQuestion: "Turn my workplace barrier into adjustment examples.",
    demoIntro: "Link each barrier to a practical fix:",
    demoAnswer: [
      "Name the task, environment, or rule that creates disadvantage.",
      "Propose one or two realistic adjustments.",
      "Ask for a trial period and review date in writing.",
    ],
  },
  "disability-discrimination-and-grievances": {
    suggestions: [
      "Help me build a workplace discrimination timeline.",
      "Draft a grievance opening letter.",
      "Check if my evidence is strong enough to escalate.",
    ],
    demoQuestion: "Help me build a workplace discrimination timeline.",
    demoIntro: "Strong timelines include:",
    demoAnswer: [
      "Dates, witnesses, requests made, and responses received.",
      "How disability-related barriers affected your work.",
      "What remedy or adjustment you asked for and what happened next.",
    ],
  },
  "flexible-working-and-health": {
    suggestions: [
      "Draft a flexible working request linked to my health needs.",
      "Help me propose a trial pattern with review dates.",
      "Check my request for weak or vague wording.",
    ],
    demoQuestion: "Draft a flexible working request linked to my health needs.",
    demoIntro: "Useful requests propose:",
    demoAnswer: [
      "A specific pattern with core hours and how cover works.",
      "Why the pattern reduces a health-related barrier at work.",
      "A trial period and date to review whether it is working.",
    ],
  },
  "workplace-meeting-script-and-email-template": {
    suggestions: [
      "Draft my adjustment meeting script.",
      "Write a follow-up email after an adjustment meeting.",
      "Help me record what was agreed and who owns each action.",
    ],
    demoQuestion: "Draft my adjustment meeting script.",
    demoIntro: "Cover these in the meeting:",
    demoAnswer: [
      "Barrier, requested adjustment, and expected outcome.",
      "Trial dates, review date, and decision owner.",
      "Same-day follow-up email confirming what was agreed.",
    ],
  },
  "dsa-disabled-students-allowance": {
    suggestions: [
      "Turn my study barriers into a DSA needs list.",
      "Draft an email to university disability support.",
      "Help me prepare for a DSA needs assessment.",
    ],
    demoQuestion: "Turn my study barriers into a DSA needs list.",
    demoIntro: "DSA is for study-related barriers:",
    demoAnswer: [
      "Reading, writing, concentration, fatigue, mobility, labs, exams, or placements.",
      "Real course tasks — not only diagnosis labels.",
      "What support would help you study on equal terms.",
    ],
  },
  "ehc-plan-basics": {
    suggestions: [
      "Help me check if my EHC plan wording is specific enough.",
      "Draft questions for an EHC plan review meeting.",
      "Turn my child's needs into measurable outcomes.",
    ],
    demoQuestion: "Help me check if my EHC plan wording is specific enough.",
    demoIntro: "Strong EHC plans name:",
    demoAnswer: [
      "Specific provision, frequency, and who delivers it.",
      "Measurable outcomes and review dates.",
      "What happens if the plan is not delivered.",
    ],
  },
  "request-ehcp-needs-assessment": {
    suggestions: [
      "Draft an EHC needs assessment request letter.",
      "Explain why SEN support is not enough for my child.",
      "Make an evidence list for an EHCNA request.",
    ],
    demoQuestion: "Draft an EHC needs assessment request letter.",
    demoIntro: "A strong request explains:",
    demoAnswer: [
      "What support has been tried and why it is insufficient.",
      "The barrier at school and impact on learning or wellbeing.",
      "Evidence from school, therapists, or your own dated log.",
    ],
  },
  "exam-access-arrangements": {
    suggestions: [
      "Draft an exam access arrangement request.",
      "Help me explain why extra time or breaks are needed.",
      "Make a list of exam barriers to share with school or college.",
    ],
    demoQuestion: "Draft an exam access arrangement request.",
    demoIntro: "Requests should link:",
    demoAnswer: [
      "Specific exam tasks that are harder because of disability or health.",
      "Arrangements requested: extra time, rest breaks, separate room, or assistive tech.",
      "Evidence or history of similar support that helped.",
    ],
  },
  "care-act-assessments-and-eligibility": {
    suggestions: [
      "Turn my daily care needs into assessment wording.",
      "Draft an email requesting a care needs assessment.",
      "Make a one-week care diary template.",
    ],
    demoQuestion: "Turn my daily care needs into assessment wording.",
    demoIntro: "Name tasks, risk, and frequency:",
    demoAnswer: [
      "Which daily tasks are unsafe or unreliable without help.",
      "What happens without support and how often help is needed.",
      "Impact on wellbeing and unpaid carer strain.",
    ],
  },
  "employing-a-personal-assistant-basics": {
    suggestions: [
      "Write my PA job advert.",
      "Create a PA interview scorecard.",
      "Draft my PA induction checklist.",
    ],
    demoQuestion: "Write my PA job advert.",
    demoIntro: "A safe PA advert includes:",
    demoAnswer: [
      "Actual care tasks, boundaries, and routines — not vague 'help needed'.",
      "Probation or trial shift process and references.",
      "Professionalism, privacy, and safety expectations.",
    ],
  },
  "personal-budgets-and-direct-payments": {
    suggestions: [
      "Make a direct payment setup checklist.",
      "Help me explain what my budget should cover.",
      "Draft a request to review an unrealistic care budget.",
    ],
    demoQuestion: "Make a direct payment setup checklist.",
    demoIntro: "Before you start, confirm:",
    demoAnswer: [
      "Payroll, insurance, contracts, and record-keeping responsibilities.",
      "What the plan allows you to spend on and what triggers audit questions.",
      "Backup cover if your PA is ill or leaves.",
    ],
  },
  "when-care-plans-break-down": {
    suggestions: [
      "Draft a care breakdown escalation email.",
      "Help me document unsafe care gaps.",
      "Make a safeguarding or complaint timeline.",
    ],
    demoQuestion: "Draft a care breakdown escalation email.",
    demoIntro: "Escalate with:",
    demoAnswer: [
      "Dates, tasks missed, and safety or wellbeing impact.",
      "What was agreed in the care plan versus what happened.",
      "The immediate remedy and written response you need.",
    ],
  },
  "respite-carer-breaks-and-funded-support": {
    suggestions: [
      "Draft a respite request email.",
      "Help me explain carer breakdown risk.",
      "Make a carer break planning checklist.",
    ],
    demoQuestion: "Draft a respite request email.",
    demoIntro: "Respite requests work best when they:",
    demoAnswer: [
      "Explain why current informal support is not sustainable.",
      "Name frequency and type of break needed.",
      "Link to carer assessment or care plan review if relevant.",
    ],
  },
  "pip-in-plain-english": {
    suggestions: [
      "Explain PIP in simple terms for my situation.",
      "What should I do first if I think I may qualify?",
      "Link me to the right detailed PIP guide.",
    ],
    demoQuestion: "What should I do first if I think I may qualify for PIP?",
    demoIntro: "PIP is about daily impact, not diagnosis:",
    demoAnswer: [
      "Start a short log of how tasks are affected on ordinary and bad days.",
      "Gather any letters that describe function, not just condition names.",
      "Use the renewal or new claim guide when you are ready to apply.",
    ],
  },
  "blue-badge": {
    suggestions: [
      "Help me explain my Blue Badge mobility difficulty.",
      "Make a Blue Badge evidence checklist.",
      "Draft a renewal explanation.",
    ],
    demoQuestion: "Help me explain my Blue Badge mobility difficulty.",
    demoIntro: "Explain what happens when you walk or travel:",
    demoAnswer: [
      "Pain, breathlessness, fatigue, falls, distress, or distance limits.",
      "Real examples from typical journeys.",
      "Why parking closer reduces risk.",
    ],
  },
  motability: {
    suggestions: [
      "Help me list my non-negotiable vehicle access needs.",
      "Make a Motability vehicle comparison checklist.",
      "Draft questions about adaptations and lead times.",
    ],
    demoQuestion: "Help me list my non-negotiable vehicle access needs.",
    demoIntro: "Before choosing a vehicle, confirm:",
    demoAnswer: [
      "Transfer method, ramp or lift needs, and seating position.",
      "Adaptation lead times and named driver rules.",
      "Running costs and scheme-end options.",
    ],
  },
  "booking-accessible-accommodation": {
    suggestions: [
      "Write an email asking a hotel for access measurements.",
      "Make a travel access checklist for my needs.",
      "Help me compare two accommodation replies.",
    ],
    demoQuestion: "Write an email asking a hotel for access measurements.",
    demoIntro: "Ask for specifics in writing:",
    demoAnswer: [
      "Step-free route, bathroom dimensions, bed height, and turning space.",
      "Recent photos or video with measurements if possible.",
      "Cancellation terms if access differs on arrival.",
    ],
  },
  "travel-insurance-and-medical-equipment": {
    suggestions: [
      "Make a list of insurance questions for my equipment.",
      "Help me declare medical conditions clearly.",
      "Draft questions about wheelchair cover limits.",
    ],
    demoQuestion: "Make a list of insurance questions for my equipment.",
    demoIntro: "Check cover for:",
    demoAnswer: [
      "Equipment value, batteries, and spare parts.",
      "Medical conditions and medication carriage rules.",
      "Cancellation if access or health needs change.",
    ],
  },
  "leisure-centre-and-gym-access": {
    suggestions: [
      "Make a gym access questions list.",
      "Draft an email before I join a leisure centre.",
      "Help me ask about evacuation and changing facilities.",
    ],
    demoQuestion: "Make a gym access questions list.",
    demoIntro: "Ask before you pay:",
    demoAnswer: [
      "Step-free routes, changing, pool hoist, and equipment floor access.",
      "Evacuation plan if lifts cannot be used.",
      "Induction adjustments and staff training.",
    ],
  },
  "first-30-days-disabled": {
    suggestions: [
      "Make a first-week practical plan.",
      "Help me prioritise safety, paperwork, and appointments.",
      "What should I do first after a new diagnosis?",
    ],
    demoQuestion: "Make a first-week practical plan.",
    demoIntro: "Focus on stability first:",
    demoAnswer: [
      "Safety at home, essential appointments, and key paperwork.",
      "One folder for medical, benefits, work, and care records.",
      "Short list of next actions — not everything at once.",
    ],
  },
  "urgent-mental-health-support-uk": {
    suggestions: [
      "Help me choose between crisis support options.",
      "Draft a crisis plan I can share with someone I trust.",
      "What should I do if I feel unsafe right now?",
    ],
    demoQuestion: "Help me choose between crisis support options.",
    demoIntro: "If you are in immediate danger, call 999.",
    demoAnswer: [
      "NHS urgent mental health lines and crisis teams vary by area.",
      "Samaritans 116 123 and SHOUT text 85258 are available now.",
      "Save numbers and tell someone trusted where you are if at risk.",
    ],
  },
  "wheelchair-breakdown-what-to-do": {
    suggestions: [
      "What should I do if my wheelchair breaks down now?",
      "Draft a repair escalation email to wheelchair services.",
      "Make a breakdown safety checklist.",
    ],
    demoQuestion: "What should I do if my wheelchair breaks down now?",
    demoIntro: "Safety first:",
    demoAnswer: [
      "Get to a safe position and avoid unsafe transfers.",
      "Contact NHS wheelchair services or your supplier with fault details.",
      "Log date, fault, and impact for repair priority.",
    ],
  },
};

function defaultPrompts(title: string): GuideAiPromptSet {
  const topic = title.split(":")[0]?.trim().toLowerCase() ?? "this guide";
  return {
    suggestions: [
      `What should I focus on first in ${topic}?`,
      "Help me explain my situation clearly in writing.",
      "What should I do if I am refused or ignored?",
    ],
    demoQuestion: `What should I focus on first in ${topic}?`,
    demoIntro: "A good starting point is to:",
    demoAnswer: [
      "Name one clear barrier or task that is difficult.",
      "Explain how it affects your ability to act on equal terms.",
      "List one practical change or next action you can take today.",
    ],
  };
}

export function getGuideAiPrompts(slug: string, title: string): GuideAiPromptSet {
  return SLUG_PROMPTS[slug] ?? defaultPrompts(title);
}
