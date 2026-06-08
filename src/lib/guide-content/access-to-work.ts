import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { step } from "@/lib/guide-content/types";

export const ACCESS_TO_WORK_WORKFLOW: PracticalGuideWorkflow = {
  subtitle:
    "A practical, step-by-step guide to what Access to Work can fund, how to apply, and how to ask for the right support with confidence.",
  currentStep: 2,
  totalSteps: 6,
  completedCount: 1,
  summary: [
    "Understand what Access to Work is",
    "Identify support you may need",
    "Check what Access to Work may fund",
    "Prepare before applying",
    "Handle the assessment process",
    "Use, review or challenge a decision",
  ],
  atAGlance: [
    "Access to Work can help with extra disability-related work costs.",
    "It can support equipment, software, travel, support workers and communication support.",
    "It does not replace your employer's duty to make reasonable adjustments.",
    "Explain the work barrier, the impact and the support you need.",
    "Keep copies of applications, decisions, receipts and emails.",
    "Check renewal dates if your support is ongoing.",
  ],
  templates: [
    {
      title: "Access to Work application prep checklist",
      format: "DOCX",
      description: "Gather the details you need before applying.",
      href: "/downloads/access-to-work-application-prep-checklist.docx",
    },
    {
      title: "Work barriers and support needs worksheet",
      format: "DOCX",
      description: "Turn your work barriers into clear support requests.",
      href: "/downloads/access-to-work-barriers-worksheet.docx",
    },
    {
      title: "Access to Work call notes template",
      format: "DOCX",
      description: "Keep a record of adviser calls, evidence requests and next steps.",
      href: "/downloads/access-to-work-call-notes-template.docx",
    },
    {
      title: "Decision review email template",
      format: "DOCX",
      description: "Ask for clarification or review if the support offered is unclear or insufficient.",
      href: "/downloads/access-to-work-decision-review-email.docx",
    },
  ],
  officialLinks: [
    { label: "GOV.UK: Access to Work", href: "https://www.gov.uk/access-to-work" },
    { label: "GOV.UK: Apply for an Access to Work grant", href: "https://www.gov.uk/access-to-work/apply" },
    {
      label: "GOV.UK: Access to Work factsheet for customers",
      href: "https://www.gov.uk/government/publications/access-to-work-factsheet-for-customers",
    },
    {
      label: "GOV.UK: Access to Work factsheet for employers",
      href: "https://www.gov.uk/government/publications/access-to-work-factsheet-for-employers",
    },
    {
      label: "GOV.UK: Reasonable adjustments for disabled workers",
      href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers",
    },
    { label: "Acas: Reasonable adjustments at work", href: "https://www.acas.org.uk/reasonable-adjustments" },
  ],
  aiIntro:
    "Need help applying this guide to your situation? Ask about what Access to Work may fund, how to explain your work barriers, what to prepare before applying, or what to do if your application is delayed or refused.",
  aiSuggestions: [
    "What could Access to Work help me ask for?",
    "How do I explain my condition affects work?",
    "What should I prepare before applying?",
    "Can Access to Work pay for travel support?",
    "What if my employer says this is their responsibility?",
    "Help me draft my application answers",
  ],
  aiDemoQuestion: "How do I explain my condition affects work?",
  aiDemoIntro: "Access to Work is strongest when you explain three things clearly:",
  aiDemoAnswer: [
    "The work barrier — what task, journey, environment or communication issue is difficult.",
    "The impact — how it affects your ability to do the job or stay in work.",
    "The support need — what equipment, travel support, human support, software or workplace change may reduce the problem.",
    "You do not need to overshare every medical detail. Focus on what happens at work and what support would help.",
  ],
  aiDisclaimer:
    "AI can make mistakes. Use this as practical guidance, not legal advice. Check important decisions with GOV.UK, Access to Work, Acas, Citizens Advice, your union or a legal adviser.",
  primaryCta: { label: "I'm ready to apply" },
  learnMoreHref: "https://www.gov.uk/access-to-work",
  steps: [
    step({
      id: "understand-access-to-work",
      number: 1,
      title: "Understand what Access to Work is",
      preview: "Learn what Access to Work can help with and where it fits alongside reasonable adjustments.",
      outcome: "Outcome: support overview",
      statusLabel: "Start here",
      status: "completed",
      content: {
        intro:
          "Access to Work is a UK government support scheme that can help disabled people and people with health conditions get or stay in work. It can help with extra work-related costs linked to disability or a health condition.",
        introExtra: [
          "Access to Work can support things like specialist equipment, assistive software, support workers, travel support, workplace adaptations, mental health support and communication support at interviews.",
          "Important: Access to Work does not replace your employer's duty to make reasonable adjustments. Your employer may still need to remove barriers, change policies, provide equipment, adjust working patterns or make workplace changes.",
        ],
        whatThisMeans: [
          "Access to Work is usually for extra support linked to your disability or health condition.",
          "Your employer may still be responsible for reasonable adjustments.",
          "Access to Work can sometimes advise your employer about support needs.",
          "You can apply if you are working, about to start work, self-employed, or attending certain interviews.",
        ],
        checklist: [
          "Do I have a disability or health condition that affects work?",
          "Am I in paid work, about to start work, self-employed, or going to an interview?",
          "Do I need support beyond ordinary workplace arrangements?",
          "Is the support something my employer should provide as a reasonable adjustment?",
          "Could Access to Work help with extra costs?",
        ],
        example:
          "Someone cannot use public transport safely because of their condition. Their employer may need to consider reasonable adjustments, but Access to Work may also help with travel support if the need is linked to getting to or staying in work.",
        exampleLabel: "Example scenario",
        aiPrompt: "Help me understand whether Access to Work could apply to my situation",
      },
    }),
    step({
      id: "work-out-support",
      number: 2,
      title: "Work out what support you might need",
      preview: "Identify the work barriers and turn them into possible support needs.",
      outcome: "Outcome: support needs list",
      statusLabel: "In progress",
      status: "active",
      content: {
        intro:
          "Before applying, get clear about what is making work difficult. Access to Work is more likely to make sense when you can explain the barrier, how it affects your work, and what support could help.",
        introExtra: [
          "Start with the problem, not the product. Do not just say “I need equipment”. Explain what task is difficult and why.",
        ],
        whatThisMeans: [
          "A barrier might be physical, sensory, communication-related, cognitive, travel-related, pain-related, fatigue-related or mental-health-related.",
          "Support should be connected to your job tasks.",
          "You do not need to know the perfect solution before applying, but you should describe what is difficult.",
          "A workplace assessment may help identify the right support.",
        ],
        checklist: [
          "What part of work is difficult or inaccessible?",
          "Is the issue about equipment, travel, communication, support workers, workplace layout, mental health, or working from home?",
          "How often does the issue happen?",
          "What happens if the support is not provided?",
          "What support have I already tried?",
          "What would make the task safer, easier or more manageable?",
        ],
        extraSections: [
          {
            title: "Support categories",
            items: [
              "Equipment and software — assistive software, ergonomic equipment, specialist chairs, adapted keyboards, speech-to-text, screen readers, specialist computer equipment.",
              "Human support — support worker, job coach, BSL interpreter, lipspeaker, note taker, travel buddy.",
              "Travel support — help with extra travel costs if disability or health condition means public transport is not suitable.",
              "Workplace changes — physical changes to a workplace, including a home workplace if you work from home some or all of the time.",
              "Mental health support — tailored support plan and one-to-one sessions through the Access to Work mental health support route.",
            ],
          },
        ],
        example:
          "“The main barrier is that I cannot safely travel to work using public transport because of my health condition. This affects my ability to attend work reliably. I would like Access to Work to consider travel support.”",
        exampleLabel: "Example wording",
        aiPrompt: "Turn my work barriers into possible Access to Work support needs",
      },
    }),
    step({
      id: "check-funding",
      number: 3,
      title: "Check what Access to Work may fund",
      preview: "Understand common types of support and what is usually outside the scheme.",
      outcome: "Outcome: funding shortlist",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "Access to Work can fund practical support linked to your disability or health condition. The exact support depends on your needs, your job, your employer, and what is considered appropriate.",
        introExtra: [
          "It can include a grant towards extra costs of working. It does not usually pay for normal business costs, standard equipment everyone needs, or reasonable adjustments your employer is legally responsible for.",
        ],
        whatThisMeans: [
          "Access to Work may help with extra costs that arise because of disability or health.",
          "Your employer may still need to pay for reasonable adjustments.",
          "You or your employer may sometimes need to pay costs first and claim money back.",
          "Some support may require quotes, evidence or an assessment.",
        ],
        checklist: [
          "Is this cost directly linked to my disability or health condition?",
          "Is it needed for work?",
          "Is it beyond normal equipment or support?",
          "Is it something my employer should provide anyway?",
          "Do I need quotes or an assessment?",
          "Should I wait for approval before buying anything?",
        ],
        extraSections: [
          {
            title: "Common things Access to Work may help with",
            items: [
              "Specialist equipment",
              "Assistive software",
              "Support workers",
              "Job coaches",
              "BSL interpreters",
              "Communication support at interviews",
              "Travel-to-work support",
              "Vehicle adaptations",
              "Workplace adaptations",
              "Mental health support",
            ],
          },
          {
            title: "What it may not cover",
            items: [
              "Reasonable adjustments your employer should legally make",
              "Standard equipment needed by all staff",
              "Everyday commuting costs that are not disability-related",
              "Support unrelated to your work",
              "Costs that have not been approved properly",
              "Retrospective spending unless Access to Work agrees",
            ],
          },
        ],
        example:
          "If someone needs screen-reading software because of a visual impairment, Access to Work may consider support. If the issue is simply that the employer has not provided a basic laptop for the job, that is more likely to be an employer responsibility.",
        exampleLabel: "Example scenario",
        aiPrompt: "Help me work out what Access to Work might fund",
      },
    }),
    step({
      id: "prepare-apply",
      number: 4,
      title: "Prepare before you apply",
      preview: "Gather the details you need so the application is clear and complete.",
      outcome: "Outcome: application checklist",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "Before applying, prepare the information you will need. A rushed application can become vague. A strong application explains your work situation, your barriers, and the support you think may help.",
        introExtra: ["You do not need to write a legal argument. You need to describe the practical impact clearly."],
        whatThisMeans: [
          "You will usually need your contact details.",
          "You will need workplace details.",
          "You may need a workplace contact.",
          "You may need your National Insurance number if you have it.",
          "If self-employed, you may need business or tax details.",
          "You need to explain how your condition affects your work.",
        ],
        checklist: [
          "Can I explain my job in plain English?",
          "Can I explain the barriers clearly?",
          "Can I describe what happens without support?",
          "Have I listed the support I think would help?",
          "Do I have my workplace contact details?",
          "Have I checked whether my employer already has a duty to provide some adjustments?",
          "Have I saved a copy of what I plan to submit?",
        ],
        extraSections: [
          {
            title: "Information to prepare",
            items: [
              "Your job title or type of work",
              "Your workplace address and postcode",
              "Your employer or workplace contact details",
              "How your condition affects work",
              "What tasks are difficult",
              "What support you already have",
              "What support you think you need",
              "Any reports, assessments, or examples that explain the barriers",
              "Details of upcoming start date or interview if relevant",
            ],
          },
        ],
        example:
          "“My role involves regular computer use, meetings and travel to the workplace. Because of my condition, I experience barriers with workstation setup, fatigue and travel. I would like support to identify suitable equipment and travel options.”",
        exampleLabel: "Example wording",
        aiPrompt: "Help me prepare my Access to Work application answers",
      },
    }),
    step({
      id: "apply-assessment",
      number: 5,
      title: "Apply and handle the assessment",
      preview: "Know what happens after you apply and how to explain your needs clearly.",
      outcome: "Outcome: submitted application",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "You can apply for Access to Work online or by phone. After you apply, an adviser may contact you for more information. They may ask about your condition, your job, the barriers you face, and what support you think you need.",
        introExtra: [
          "Sometimes Access to Work may arrange an assessment or ask for more details before making a decision.",
        ],
        whatThisMeans: [
          "Be practical and specific.",
          "Keep notes of calls and emails.",
          "Ask what happens next and when you should expect an update.",
          "Do not buy expensive equipment before approval unless you are clearly told it is okay.",
          "If your employer is contacted, Access to Work should usually ask for your permission first.",
        ],
        checklist: [
          "Did I save confirmation of the application?",
          "Did I write down the date I applied?",
          "Did I record who I spoke to?",
          "Did I ask what evidence or quotes are needed?",
          "Did I ask whether my employer will be contacted?",
          "Did I ask when I should expect the next update?",
          "Did I keep copies of all emails and decision letters?",
        ],
        extraSections: [
          {
            title: "Example call notes template",
            items: [
              "Date:",
              "Who I spoke to:",
              "What they asked:",
              "What I explained:",
              "Documents requested:",
              "Next step:",
              "Expected timescale:",
            ],
          },
        ],
        example:
          "“The key issue is not just my diagnosis. The work barrier is that [task/environment/travel] is difficult because [impact]. The support I think may help is [support], because it would allow me to [work outcome].”",
        exampleLabel: "Example wording for an adviser",
        aiPrompt: "Help me explain my needs to an Access to Work adviser",
      },
    }),
    step({
      id: "use-review-challenge",
      number: 6,
      title: "Use, review or challenge the decision",
      preview: "Understand what to do once you receive a decision or if support is delayed.",
      outcome: "Outcome: next-step plan",
      statusLabel: "To do",
      status: "upcoming",
      content: {
        intro:
          "Once Access to Work makes a decision, read the letter carefully. Check what has been approved, how much has been approved, who pays first, how claims are made, and when the grant ends.",
        introExtra: [
          "If the support is wrong, missing, delayed or unclear, ask questions quickly. If your circumstances change, you may need to update Access to Work. If you use ongoing support, you may need to renew before the award ends.",
        ],
        whatThisMeans: [
          "The decision letter matters. Keep it safe.",
          "Check exactly what has and has not been approved.",
          "Understand whether you or your employer needs to pay first and claim back.",
          "Keep receipts, invoices and evidence.",
          "Review whether the support actually works.",
          "Ask for reconsideration or further advice if the decision does not meet your needs.",
        ],
        checklist: [
          "What support has been approved?",
          "How much funding has been approved?",
          "Who is responsible for buying or arranging the support?",
          "Do I need to claim money back?",
          "What evidence is needed for claims?",
          "When does the grant end?",
          "Do I need to renew it?",
          "Is the support actually solving the barrier?",
          "Do I need to ask for the decision to be reviewed?",
        ],
        extraSections: [
          {
            title: "Example follow-up wording",
            items: [
              "“Thank you for the decision. Please could you clarify what support has been approved, who is responsible for arranging it, whether costs need to be paid up front, and what evidence is needed to claim the money back?”",
            ],
          },
          {
            title: "Example review wording",
            items: [
              "“The support has helped with [issue], but the barrier remains because [problem]. Please could this be reviewed and alternative support considered?”",
            ],
          },
        ],
        example:
          "Keep a simple log: decision date, approved items, who pays first, renewal date, and whether the support is actually reducing the work barrier.",
        exampleLabel: "Practical tip",
        aiPrompt: "Help me understand or respond to my Access to Work decision",
      },
    }),
  ],
};
