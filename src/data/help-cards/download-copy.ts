import type { HelpCardDownloadCopy } from "@/data/help-cards/download-types";

const LIVE_CARD_NOTE =
  "This card does not prove eligibility, entitlement or an access arrangement. Check the live Help Card for the latest reviewed detail.";

export const HELP_CARD_DOWNLOAD_COPY: Record<string, HelpCardDownloadCopy> = {
  "section-88-driving-licence": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Driving while DVLA is processing your application",
    shortTitle: "Section 88 driving",
    purpose:
      "Use this card when you need to explain that your licence application is with DVLA and you may be able to keep driving under Section 88.",
    keyMessage:
      "Section 88 may allow you to continue driving while DVLA processes a valid application, but only if the official conditions are met. This card does not prove you are entitled to drive.",
    actions: [
      "Check the current DVLA INF188/6 guidance against your situation before you rely on Section 88.",
      "Carry evidence that you have submitted your application.",
      "Explain that any permission to drive is conditional, not automatic.",
      "Ask for time to show your documents if you are stopped or challenged.",
    ],
    questionsToAsk: [
      "Would it help if I show you evidence that my application is with DVLA?",
      "What information do you need from me?",
      "Would you like my DVLA reference or previous licence details?",
    ],
    suggestedWording: {
      label: "You could say",
      text: "I’ve sent my application to DVLA. I may be able to keep driving under Section 88 if the conditions are met — I can show you the application evidence.",
    },
    conditions: [
      "Section 88 only applies if you have submitted a valid DVLA application, previously held the relevant licence entitlement, are not disqualified, and meet any relevant medical standards.",
      "Different rules can apply to some medical conditions or licence types. Check INF188/6 for your situation.",
    ],
    beforeYouGo: [
      "Bring DVLA application confirmation, previous licence details, and any official DVLA correspondence.",
      "Bring relevant medical information if it applies, and insurance confirmation if you may be asked for it.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "blue-badge-issue": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Explaining a Blue Badge parking issue",
    purpose:
      "Use this card when you need to explain a Blue Badge or parking access issue calmly, before the situation escalates.",
    keyMessage:
      "Ask for time to show your Blue Badge and explain your access needs. Where you can park, and any concession, depends on local council rules.",
    actions: [
      "Ask for time to show your badge and explain the situation clearly.",
      "Keep the badge and any parking ticket, permit or photos ready.",
      "Note the time, location, signage and what was said.",
      "Check your local council’s Blue Badge parking rules when you can.",
    ],
    questionsToAsk: [
      "Can I show my Blue Badge and explain my access needs?",
      "Which local rule or sign applies to this bay or restriction?",
      "Is this bay or restriction covered by a Blue Badge here?",
    ],
    suggestedWording: {
      label: "You could say",
      text: "I use a Blue Badge because I have access needs. Please give me time to show the badge and explain the situation clearly.",
    },
    conditions: [
      "Blue Badge rules and enforcement vary by local council.",
      "Eligible bays, time limits and concessions are not the same everywhere.",
      "Scotland and Wales run their own Blue Badge schemes, with national guidance sitting alongside local rules.",
    ],
    beforeYouGo: [
      "Carry your Blue Badge.",
      "Keep a parking ticket or permit if you have one.",
      "Take photos of signage or bay markings if it is safe to do so.",
      "Keep any council correspondence that is relevant.",
      "Write down the time and location.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "job-interview-adjustments": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Asking for reasonable adjustments at a job interview",
    purpose:
      "Use this card when you need to request adjustments so you can take part in an interview fairly.",
    keyMessage:
      "You can ask an employer to consider reasonable adjustments so a disabled candidate is not put at a substantial disadvantage. Put the request in writing and be specific about what would help.",
    actions: [
      "Contact the recruiter or interview organiser as soon as you can.",
      "Ask for reasonable adjustments, name the practical changes you need, and ask for confirmation in writing.",
    ],
    questionsToAsk: [
      "Is the interview room step-free, and is there an accessible toilet nearby?",
      "Can you offer extra time, breaks, a remote option or communication support?",
      "Please confirm the arrangements in writing before the interview.",
    ],
    suggestedWording: {
      label: "You could write or say",
      text: "I’m asking for reasonable adjustments so I can take part in the interview fairly. Could we confirm access to the room, and whether extra time, breaks, a remote option or communication support is possible?",
    },
    conditions: [
      "The Equality Act 2010 applies in England, Scotland and Wales. Northern Ireland has separate disability discrimination law.",
      "What is reasonable depends on the role, the employer and the disadvantage you would otherwise face.",
    ],
    beforeYouGo: [
      "Prepare a short access-needs summary and note adjustments that have worked before.",
      "Bring medical or access evidence only if you choose to share it, and keep the organiser’s contact details to hand.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "reasonable-adjustments-at-work": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Asking for reasonable adjustments at work",
    purpose:
      "Use this card when your current setup at work is creating barriers and you need to request practical changes.",
    keyMessage:
      "You can request reasonable adjustments where a disabled employee is placed at a substantial disadvantage. Being specific about the task, the barrier and the change you need makes it easier for your employer to respond.",
    actions: [
      "Ask for a meeting or put the request in writing to your manager or HR.",
      "Set out the task that is affected and the barrier causing the issue.",
      "Say what adjustment would help, and what risk exists if nothing changes.",
      "Ask for the discussion and any agreed changes to be confirmed in writing.",
    ],
    questionsToAsk: [
      "Can we discuss reasonable adjustments for my role?",
      "Please confirm what you can put in place, and by when.",
      "Who is the right person to review this if we cannot agree it today?",
    ],
    suggestedWording: {
      label: "You could write or say",
      text: "I’m asking for reasonable adjustments. My current setup is making this work harder than it needs to be, and I’d like to talk through a few practical changes.",
    },
    conditions: [
      "The Equality Act 2010 applies in England, Scotland and Wales.",
      "Northern Ireland has separate disability discrimination law.",
      "What is reasonable depends on the job, the employer and the disadvantage you face.",
    ],
    beforeYouGo: [
      "Write down the task that is affected, the barrier, the adjustment that would help, and the risk if nothing changes.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "gp-appointment-access": {
    version: 1,
    status: "published",
    layout: "one-page",
    title: "Explaining access needs for a GP appointment",
    purpose:
      "Use this card when you need to explain access or communication needs while booking, attending or following up a GP appointment.",
    keyMessage:
      "Ask reception or the booking team for an appointment format you can attend safely. Individual practices set their own procedures, so confirm the arrangement with your practice.",
    actions: [
      "Tell the practice what access or communication support you need.",
      "Ask for an appointment format you can attend safely.",
      "Confirm the arrangement before you travel.",
      "Keep a short list of the points you want the appointment to cover.",
    ],
    questionsToAsk: [
      "Can you book this in a format I can attend safely?",
      "What access arrangements can the practice put in place?",
      "Can a support person attend with me?",
    ],
    suggestedWording: {
      label: "You could say",
      text: "I need an appointment format that works with my access needs. Please help me arrange this in a way I can attend safely.",
    },
    beforeYouGo: [
      "Note your main symptoms or the problem you need help with.",
      "Note how it affects daily life.",
      "Bring a medication list if you have one.",
      "Write down your access or communication needs.",
      "Write down the questions you want answered.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "social-care-assessment": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Preparing for a social care assessment",
    purpose:
      "Use this card when you are preparing for a social care needs assessment and need to explain daily needs, safety risks and carer impact.",
    keyMessage:
      "Keep the assessment focused on what happens on a bad day, the support you need to stay safe, and what would happen without that support. This card does not decide eligibility.",
    actions: [
      "Ask the assessment to look at a typical bad day, not only a good day.",
      "Give concrete examples of the support you need.",
      "Explain the risks if that support is not provided.",
      "Describe any impact on a carer, if that is relevant.",
    ],
    questionsToAsk: [
      "Can we go through what happens on a bad day, step by step?",
      "How will you record the support I need to stay safe?",
      "What happens next after this assessment?",
    ],
    suggestedWording: {
      label: "You could say",
      text: "I need this assessment to look at what happens on a bad day, the support I need to stay safe, and what would happen without that support.",
    },
    conditions: [
      "The Care Act 2014 sets out how needs assessments and eligibility work in England.",
      "Scotland, Wales and Northern Ireland have separate law. Check your area.",
      "Local authorities run assessments in different ways. Confirm how yours works.",
    ],
    beforeYouGo: [
      "Prepare examples of morning routine support.",
      "Prepare examples of personal care, transfers and mobility support.",
      "Prepare examples of meal, hydration, medication or health routines.",
      "Note the risks if support is not provided.",
      "Note carer impact if that is relevant.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "wheelchair-access-venue": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Checking wheelchair access before you visit",
    purpose:
      "Use this card when a venue says it is “wheelchair accessible” but has not given enough practical detail for you to decide safely.",
    keyMessage:
      "Ask for specific measurements and arrangements before booking. “Accessible” can mean different things at different venues.",
    actions: [
      "Ask for specific access details before you book.",
      "Write down the answers, including who confirmed them.",
      "Keep the venue’s reply with your booking details.",
      "Confirm important arrangements again if the visit is time-sensitive or difficult to rearrange.",
    ],
    questionsToAsk: [
      "Is the entrance completely step-free?",
      "Is that entrance the usual public entrance or a separate route?",
      "What is the narrowest doorway width?",
      "Is there an accessible toilet, and can you describe its layout and transfer space?",
      "Is there a clear route to the table, seat, room or activity?",
      "Can staff keep that route clear on the day?",
      "Where is the nearest Blue Badge parking or safe drop-off point?",
    ],
    suggestedWording: {
      label: "You could send or say",
      text: "Hi, I’m planning to visit and need a few specific access details before booking. Could you confirm the step-free entrance location, narrowest doorway width, accessible toilet layout, and whether staff can keep a clear route to the table or seat? Please also let me know about nearby Blue Badge parking or a safe drop-off point.",
    },
    beforeYouGo: [
      "Ask whether temporary works, furniture, events or equipment could change the usual route.",
      "Keep the venue’s reply with your booking details.",
      "Confirm important arrangements again if the visit is time-sensitive or difficult to rearrange.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "explain-access-before-appointment": {
    version: 1,
    status: "published",
    layout: "two-page",
    title: "Explaining access needs before an appointment",
    purpose:
      "Use this card when you need to confirm access arrangements before a medical, council, Jobcentre, education or other service appointment.",
    keyMessage:
      "Set out what you need before the appointment so it can be arranged in advance. Ask the service to confirm the arrangements, not only that the building is “accessible”.",
    actions: [
      "Contact the service before the appointment.",
      "List the access arrangements you need.",
      "Ask them to confirm what they can put in place.",
      "Ask whether a support person can attend.",
    ],
    questionsToAsk: [
      "Is there step-free access to the appointment room?",
      "Is there an accessible toilet?",
      "What waiting time and seating or positioning can you arrange?",
      "Can a support person attend with me?",
    ],
    suggestedWording: {
      label: "You could send or say",
      text: "Before my appointment, I need to confirm the access arrangements. I need step-free access, enough space for my wheelchair, a suitable waiting arrangement, and permission for a support person to attend if needed.",
    },
    conditions: [
      "Service providers in England, Scotland and Wales must consider reasonable adjustments for disabled people under the Equality Act 2010.",
      "What a service can arrange still varies. Confirm the details for this appointment.",
    ],
    beforeYouGo: [
      "Confirm step-free access.",
      "Confirm the accessible toilet if you will need it.",
      "Confirm waiting time and seating or positioning needs.",
      "Confirm whether a support person can attend.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },

  "report-inaccessible-information": {
    version: 1,
    status: "published",
    layout: "one-page",
    title: "Requesting accessible information",
    purpose:
      "Use this card when a website, document, form or service is hard to use and you need the information in a format you can access.",
    keyMessage:
      "Ask the provider to supply the information in a format you can use. Say what is inaccessible, what you need instead, and any deadline that applies.",
    actions: [
      "Say which document, page or format you cannot use.",
      "Ask for a format you can use, such as plain text, large print, a screen-reader-friendly file or email text.",
      "Give any deadline or urgency.",
      "Say who needs to respond, if you know.",
    ],
    questionsToAsk: [
      "Can you provide this in an accessible format?",
      "Which formats can you supply, and by when?",
      "Who should I contact if this does not arrive in time?",
    ],
    suggestedWording: {
      label: "You could send or say",
      text: "I’m unable to access this information in its current format. Please provide it in an accessible format, such as plain text, large print, a screen-reader-friendly PDF, or email text.",
    },
    conditions: [
      "Service providers in England, Scotland and Wales must consider reasonable adjustments for disabled people under the Equality Act 2010.",
      "Confirm which format the provider can actually supply, and any deadline that applies to your situation.",
    ],
    beforeYouGo: [
      "Note what format is inaccessible.",
      "Note what you need instead.",
      "Note any deadline or urgency.",
      "Note who needs to respond.",
    ],
    footerNote: LIVE_CARD_NOTE,
  },
};

export function getHelpCardDownloadCopy(slug: string): HelpCardDownloadCopy | undefined {
  return HELP_CARD_DOWNLOAD_COPY[slug];
}
