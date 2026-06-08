import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { step } from "@/lib/guide-content/types";

export const REASONABLE_ADJUSTMENTS_WORKFLOW: PracticalGuideWorkflow = {
  displayTitle: "Reasonable adjustments at work: your rights",
  subtitle: "A practical, step-by-step guide with AI support",
  currentStep: 2,
  totalSteps: 6,
  completedCount: 1,
  summary: [
    "Understand what reasonable adjustments are",
    "Identify the workplace barriers affecting you",
    "Match each barrier to practical support",
    "Write a clear request without oversharing",
    "Track your employer's response",
    "Know what to do if your request is delayed or refused",
  ],
  atAGlance: [
    "You have the right to equal treatment at work under the Equality Act 2010.",
    "Employers must make reasonable adjustments where you face a substantial disadvantage.",
    "You do not need a formal diagnosis to ask for adjustments.",
    "Explain the barrier, the impact, and a practical adjustment that would help.",
    "Keep written records of requests, meetings and outcomes.",
    "Access to Work may help with extra costs but does not replace the employer's duty.",
  ],
  templates: [
    {
      title: "Reasonable adjustment request template",
      format: "DOCX",
      description: "A simple email structure using barrier, impact, adjustment and reason.",
      href: "/downloads/reasonable-adjustment-request-template.docx",
    },
    {
      title: "Workplace barriers checklist",
      format: "DOCX",
      description: "Identify physical, communication, workload, sensory and policy barriers.",
      href: "/downloads/workplace-barriers-checklist.docx",
    },
    {
      title: "Follow-up email template",
      format: "DOCX",
      description: "Chase delayed or unclear responses without sounding aggressive.",
      href: "/downloads/follow-up-email-template.docx",
    },
    {
      title: "Adjustment review notes",
      format: "DOCX",
      description: "Record whether agreed adjustments are working and what needs to happen next.",
      href: "/downloads/reasonable-adjustment-review-notes.docx",
    },
  ],
  officialLinks: [
    {
      label: "GOV.UK: Reasonable adjustments for disabled workers",
      href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers",
    },
    { label: "Acas: Reasonable adjustments at work", href: "https://www.acas.org.uk/reasonable-adjustments" },
    {
      label: "EHRC: Workplace adjustments guidance",
      href: "https://www.equalityhumanrights.com/guidance/your-rights-work",
    },
    {
      label: "Citizens Advice: Asking your employer for changes",
      href: "https://www.citizensadvice.org.uk/law-and-courts/discrimination/check-what-type-of-discrimination-youve-experienced/asking-for-reasonable-adjustments/",
    },
    { label: "GOV.UK: Access to Work", href: "https://www.gov.uk/access-to-work" },
  ],
  aiIntro:
    "Need help applying this guide to your situation? Ask about your rights, how to describe workplace barriers, what adjustments to request, or what to do if your employer delays or refuses.",
  aiSuggestions: [
    "What adjustments might help with anxiety at work?",
    "How do I explain my needs to my employer?",
    "What if my employer says no?",
    "Do I need a diagnosis to ask for adjustments?",
    "How should I follow up if HR goes quiet?",
    "Help me draft my adjustment request email",
  ],
  aiDemoQuestion: "What adjustments might help with anxiety at work?",
  aiDemoIntro: "Useful adjustments often depend on the barrier, but common examples include:",
  aiDemoAnswer: [
    "Flexible start times or hybrid working to manage energy and travel.",
    "A quieter workspace or agreed focus blocks with fewer interruptions.",
    "Meeting agendas in advance, written follow-ups, or shorter meetings.",
    "Adjusted workload pacing or clearer priorities during busy periods.",
    "Regular check-ins with a named manager to review what is working.",
  ],
  aiDisclaimer:
    "AI can make mistakes. Use this as practical guidance, not legal advice. Check important decisions with GOV.UK, Acas, Citizens Advice, your union or a legal adviser.",
  primaryCta: { label: "I'm ready to make my request" },
  learnMoreHref: "/laws-guidance",
  steps: [
    step({
      id: "know-rights",
      number: 1,
      title: "Know your rights",
      preview: "Understand what reasonable adjustments are and when employers must act.",
      outcome: "Outcome: rights overview",
      statusLabel: "Completed",
      status: "completed",
      content: {
        intro:
          "Under the Equality Act 2010, employers must make reasonable adjustments where a disabled worker or job applicant faces a substantial disadvantage compared with non-disabled people.",
        introExtra: [
          "“Reasonable” depends on effectiveness, practicality, cost, and the size and resources of the employer. Adjustments are a legal duty in many cases — not a favour.",
          "You do not need a formal diagnosis to ask for adjustments, but you do need to explain the barrier and disadvantage at work.",
        ],
        whatThisMeans: [
          "You have the right to equal treatment at work.",
          "Adjustments can change policies, practices, physical environments, or provide auxiliary aids.",
          "Your employer cannot ignore a barrier simply because it is inconvenient to fix.",
          "Access to Work may fund extra support, but it does not remove the employer's adjustment duty.",
        ],
        checklist: [
          "Do I face a barrier that puts me at a substantial disadvantage at work?",
          "Is the issue linked to a long-term condition, mental health, neurodivergence, sensory difference, pain, fatigue or mobility?",
          "Have I identified which work tasks are affected?",
          "Do I know who to contact internally (manager, HR, occupational health)?",
          "Have I checked my employer's equality or adjustments policy?",
        ],
        example:
          "If open-plan noise makes concentration impossible for more than 20 minutes, that may be a substantial disadvantage when your role requires sustained focus. A reasonable adjustment might include a quieter workspace, hybrid days, or agreed focus blocks.",
        exampleLabel: "Example scenario",
        aiPrompt: "Help me understand my rights to reasonable adjustments at work",
      },
    }),
    step({
      id: "identify-adjustments",
      number: 2,
      title: "Identify adjustments that could help",
      preview: "Map workplace barriers to practical changes in environment, patterns and communication.",
      outcome: "Outcome: barrier map",
      statusLabel: "In progress",
      status: "active",
      content: {
        intro:
          "Think about the barriers you face and what could make work more accessible. Strong requests link a specific barrier to a practical change that would reduce disadvantage.",
        introExtra: [
          "Review physical environment, work patterns, communication, sensory load, and policy barriers before you write to your employer.",
        ],
        whatThisMeans: [
          "A barrier might affect one task or your whole working day.",
          "Adjustments should be connected to how you actually work.",
          "You do not need the perfect solution — describe the problem clearly first.",
          "Several small changes may work better than one large request.",
        ],
        checklist: [
          "What part of the physical workspace is difficult (noise, lighting, desk setup, temperature)?",
          "What work patterns are difficult (hours, breaks, commute, hybrid working, workload)?",
          "What communication formats are difficult (meetings, calls, written instructions, last-minute changes)?",
          "What happens on typical days and on harder days?",
          "What have I already tried informally?",
          "What would make the task safer, easier or more reliable?",
        ],
        extraSections: [
          {
            title: "Common barrier areas",
            items: [
              "Work environment — physical workspace, noise, lighting, equipment, accessible facilities.",
              "Work patterns — hours, breaks, fatigue, flexibility, hybrid working, phased return.",
              "Communication — meetings, shared information, format of instructions, response times.",
            ],
          },
        ],
        example:
          "“The barrier is that I cannot use a standard workstation for more than 30 minutes without pain and fatigue affecting concentration. A height-adjustable desk, regular breaks, and two hybrid days would reduce the disadvantage.”",
        exampleLabel: "Example wording",
        aiPrompt: "Help me identify reasonable adjustments that could help with my work barriers",
      },
    }),
    step({
      id: "plan-request",
      number: 3,
      title: "Plan your request",
      preview: "Turn barriers into one or two specific adjustments with clear reasons.",
      outcome: "Outcome: request draft",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "Before contacting your employer, draft a clear request. The strongest requests explain the barrier, the impact, the adjustment you are asking for, and why it is reasonable.",
        introExtra: [
          "You do not need to share full medical records. Focus on functional impact at work.",
        ],
        whatThisMeans: [
          "One clear email is better than a long unstructured complaint.",
          "Propose workable options — employers respond better when you suggest solutions.",
          "Evidence can help but is not always required to start the conversation.",
          "Occupational health or Access to Work may support the request later.",
        ],
        checklist: [
          "Have I named the specific task or situation that is difficult?",
          "Have I explained the impact on my work (safety, reliability, deadlines, attendance)?",
          "Have I suggested one or two specific adjustments?",
          "Have I included an alternative if the first option is not possible?",
          "Have I avoided unnecessary clinical detail?",
          "Have I noted any evidence I can attach if helpful?",
        ],
        example:
          "Subject: Request for reasonable adjustments\n\nDisadvantage: I cannot attend back-to-back meetings without significant fatigue affecting afternoon work.\n\nAdjustments requested: meeting-free focus blocks on two afternoons per week; agendas shared 24 hours in advance.\n\nReason: These changes would allow me to complete core tasks reliably without missing deadlines.",
        exampleLabel: "Example email structure",
        aiPrompt: "Help me plan and draft my reasonable adjustment request",
      },
    }),
    step({
      id: "talk-employer",
      number: 4,
      title: "Talk to your employer",
      preview: "Request a meeting, follow up in writing, and ask for clear next steps.",
      outcome: "Outcome: request sent",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "Send your request to the right person — usually your line manager and HR. Ask for a meeting if needed, then follow up in writing with the same points so there is a record.",
        introExtra: [
          "Ask for a named contact, timeline, and review date. Verbal promises are hard to rely on later.",
        ],
        whatThisMeans: [
          "A meeting can help, but written confirmation matters.",
          "HR or occupational health may be involved — check what they record about your needs.",
          "Your employer should respond within a reasonable time.",
          "Keep copies of emails, meeting notes, and agreed actions.",
        ],
        checklist: [
          "Who received my request?",
          "Did I ask for written confirmation of next steps?",
          "Did I ask who is responsible for each adjustment?",
          "Did I ask for a timeline for implementation?",
          "Did I agree a date to review whether adjustments are working?",
          "Did I keep copies of all messages and attachments?",
        ],
        example:
          "“Thank you for meeting today. To confirm, we agreed that HR will arrange an ergonomic assessment by [date], and my manager will approve hybrid working on Tuesdays and Thursdays from [date]. Please could you confirm this in writing?”",
        exampleLabel: "Example follow-up wording",
        aiPrompt: "Help me talk to my employer about reasonable adjustments",
      },
    }),
    step({
      id: "if-agreed",
      number: 5,
      title: "If your request is agreed",
      preview: "Confirm agreements in writing and review whether adjustments actually work.",
      outcome: "Outcome: adjustments in place",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "When adjustments are agreed, confirm them in writing and check they are actually implemented. Equipment orders, policy changes, and rota updates can stall if no one owns the next step.",
        introExtra: [
          "Review after 4–6 weeks. Say what is working and what still blocks you.",
        ],
        whatThisMeans: [
          "Agreement is not the same as implementation.",
          "Check who orders equipment and whether costs are approved.",
          "Access to Work may be relevant for some extra costs.",
          "A short review meeting can prevent problems building up.",
        ],
        checklist: [
          "Has every agreed adjustment been implemented?",
          "Is equipment installed, software set up, or policy updated?",
          "Do colleagues and managers know about agreed changes?",
          "Is the adjustment reducing the original barrier?",
          "What still needs changing?",
          "When is the next review date?",
        ],
        example:
          "“The hybrid working days are helping with fatigue, but I still cannot use the shared desk area for more than an hour because of noise. Please could we review a quieter workspace or additional focus blocks?”",
        exampleLabel: "Example review wording",
        aiPrompt: "Help me review whether my agreed adjustments are working",
      },
    }),
    step({
      id: "if-wrong",
      number: 6,
      title: "If things go wrong",
      preview: "Know what to do if your request is delayed, refused, or ignored.",
      outcome: "Outcome: escalation plan",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "If your employer delays, refuses, or ignores your request, ask for written reasons. Keep a diary of ongoing impact at work and consider formal routes if internal discussion fails.",
        introExtra: [
          "Strict time limits apply to employment tribunal claims — contact ACAS early conciliation if you need to explore this route.",
        ],
        whatThisMeans: [
          "A refusal should explain why an adjustment is considered unreasonable.",
          "Another adjustment may still achieve the same outcome.",
          "Grievance procedures may be the next internal step.",
          "Welfare rights or employment advice can help you understand options.",
        ],
        checklist: [
          "Did I ask for written reasons for the refusal or delay?",
          "Have I kept a diary of how the barrier still affects my work?",
          "Have I checked my employer's grievance policy?",
          "Have I contacted ACAS or advice services about time limits?",
          "Do I need to escalate internally before taking external action?",
          "Have I preserved copies of all correspondence?",
        ],
        example:
          "“I am writing to follow up on my reasonable adjustments request dated [date]. Please confirm whether the adjustment is agreed, under review, or refused, who is responsible for next steps, and the expected completion date.”",
        exampleLabel: "Example follow-up email",
        aiPrompt: "Help me respond if my reasonable adjustment request is refused or delayed",
      },
    }),
  ],
};
