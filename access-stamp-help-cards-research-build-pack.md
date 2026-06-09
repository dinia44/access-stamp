# Access Stamp Help Cards — Researched Source Pack + Build Brief

**Prepared for Cursor:** Use this document as the source of truth for the first Help Cards build.  
**Last researched:** 2026-06-09  
**Jurisdiction focus:** England / Wales unless stated otherwise.  
**Product intent:** Help Cards are portable, situation-specific access, rights and support cards that a disabled person can open, show, read out, print, save to phone, copy, or tailor before/during a real-world moment.

---

## 1. Non-negotiable rule for Cursor

Build the Help Cards from this document. Do **not** invent legal, driving, healthcare, benefits, social care or Blue Badge advice.

Use this wording style:

- Use **“may”**, **“ask”**, **“check”**, **“confirm”**, **“official guidance says”**.
- Avoid absolute claims unless the source clearly supports them.
- Never say: **“you are definitely entitled”**, **“you are legally allowed”**, **“they must do exactly X”**, or **“this proves you are right.”**
- Every card must contain an **Important limits** section.
- Every card must show **Sources checked** and **Last reviewed**.
- If a card cannot be verified against reliable sources, mark it:  
  **Needs source review — do not publish as final guidance yet.**

---

## 2. What Help Cards are

Help Cards are not generic help-centre tiles.

They are practical “pocket cards” for real situations:

- Police/driving stop.
- Job interview.
- GP or hospital appointment.
- Social care assessment.
- PIP/benefits assessment.
- Venue visit.
- Blue Badge issue.
- Communication difficulty.
- Reasonable adjustment request.

Each card should help the user answer:

1. What is happening?
2. What do I need to say?
3. What right, rule, guidance or process supports me?
4. What evidence should I show or keep?
5. What should the other person do next?
6. What should I record afterwards?

---

## 3. Page-level design direction

### Main route

`/help-cards`

### Page hero

**Title:** Help Cards

**Subtitle:** Pocket-sized scripts for real-world access, rights and support situations.

**Body copy:**  
Open a card before an appointment, interview, venue visit, police stop or difficult conversation. Show it, read it out, print it, save it to your phone, or tailor it with AI.

**Primary CTA:** Build a card pack  
**Secondary CTA:** Browse all cards  
**Search placeholder:** What situation are you preparing for?

### Visual style

Make it feel like:

- Apple Wallet.
- Access passport.
- Emergency support card.
- Practical rights card.
- Premium disability-led product.

Avoid:

- Generic charity support directory.
- Government-coded resource hub.
- Bland blog categories.
- Vague “learn more” tiles.
- Stock support-resource page styling.

### Page sections

1. Hero with search and featured card preview.
2. High-pressure cards.
3. Choose the situation.
4. Card packs for difficult conversations.
5. Featured card preview.
6. Browse all cards.
7. AI tailoring panel.
8. Safety/source notice.

---

## 4. Technical data model

Use a typed data model similar to this:

```ts
export type HelpCardSourceConfidence = "official" | "secondary" | "needs-review";

export type HelpCard = {
  id: string;
  title: string;
  slug: string;
  category: string;
  situation: string;
  urgency: "low" | "medium" | "high";
  badge: string;
  summary: string;
  useThisWhen: string;
  quickLine: string;
  sayThisFirst: string[];
  keyRightsLine?: string;
  whatToAskFor: string[];
  questionsToAsk: string[];
  evidenceToHaveReady: string[];
  afterTheConversation: string[];
  whatNotToSayOrAssume?: string[];
  importantLimits: string[];
  sources: {
    title: string;
    publisher: string;
    url: string;
    lastChecked: string;
    confidence: HelpCardSourceConfidence;
    supports: string;
  }[];
  actions: {
    canCopy: boolean;
    canPrint: boolean;
    canSaveToPhone: boolean;
    canTailorWithAI: boolean;
  };
  lastReviewed: string;
};
```

---

## 5. Official and credible sources researched

### 5.1 DVLA Section 88 / driving while DVLA processes an application

**Primary sources**

1. GOV.UK — *Can I drive while my application is with DVLA? (INF188/6)*  
   URL: https://www.gov.uk/government/publications/inf1886-can-i-drive-while-my-application-is-with-dvla  
   Publisher: Driver and Vehicle Licensing Agency  
   Last checked: 2026-06-09  
   Confidence: official

2. DVLA PDF — *INF188/6: Can I drive while my application is with DVLA?*  
   URL: https://assets.publishing.service.gov.uk/media/64edcf3a13ae1500116e2f5d/inf1886-can-i-drive-while-my-application-is-with-dvla.pdf  
   Publisher: Driver and Vehicle Licensing Agency  
   Last checked: 2026-06-09  
   Confidence: official

**Research summary**

- Section 88 of the Road Traffic Act 1988 may allow someone to continue driving while their licence application is with DVLA, but only if the Section 88 criteria are met.
- GOV.UK says if a licence expires while the DVLA application is being processed, the person **may** be able to continue driving.
- DVLA says it cannot tell a person whether Section 88 applies while medical investigations are being completed. The person and their doctor/healthcare professional are best placed to consider the criteria.
- DVLA says Section 88 cover ends if:
  - the new licence is received;
  - the application is refused or the licence is revoked by DVLA;
  - the application is more than a year old;
  - the person has been disqualified from driving since sending the application.
- If a licence was revoked/refused for medical reasons, DVLA says the person must wait for DVLA to reissue a new driving licence before driving again.
- Because Section 88 is UK legislation, it may not be accepted in other countries.

**Card safety rule**

Do not write “you can drive”. Write:

> “You may be able to continue driving while DVLA processes your application only if all Section 88 conditions apply.”

---

### 5.2 Equality Act / reasonable adjustments

**Primary sources**

1. Legislation.gov.uk — *Equality Act 2010, Section 20: Duty to make adjustments*  
   URL: https://www.legislation.gov.uk/ukpga/2010/15/section/20  
   Publisher: The National Archives / legislation.gov.uk  
   Last checked: 2026-06-09  
   Confidence: official

2. GOV.UK — *Equality Act 2010: guidance*  
   URL: https://www.gov.uk/guidance/equality-act-2010-guidance  
   Publisher: Government Equalities Office / EHRC / Office for Equality and Opportunity  
   Last checked: 2026-06-09  
   Confidence: official

3. GOV.UK — *Disability: quick start guide for service providers*  
   URL: https://www.gov.uk/government/publications/equality-act-guidance/disability-quick-start-guide-for-service-providers-html  
   Publisher: Government Equalities Office  
   Last checked: 2026-06-09  
   Confidence: official

4. GOV.UK — *Reasonable adjustments for workers with disabilities or health conditions*  
   URL: https://www.gov.uk/reasonable-adjustments-for-disabled-workers  
   Publisher: UK Government  
   Last checked: 2026-06-09  
   Confidence: official

5. ACAS — *Reasonable adjustments at work*  
   URL: https://www.acas.org.uk/reasonable-adjustments  
   Publisher: ACAS  
   Last checked: 2026-06-09  
   Confidence: official/authoritative employment guidance

**Research summary**

- The Equality Act 2010 protects disabled people from discrimination in work and wider society.
- Section 20 sets out the duty to make reasonable adjustments.
- Service providers are required to make reasonable changes where disabled customers or potential customers would otherwise be put at a substantial disadvantage.
- GOV.UK service provider guidance says reasonable changes can include changing policies/ways things are done, changes to the built environment, and auxiliary aids/services.
- GOV.UK service provider guidance says service providers cannot charge disabled customers for reasonable adjustments.
- GOV.UK service provider guidance says what is reasonable depends on circumstances, including cost, benefit, resources and practicality.
- GOV.UK service provider guidance says service providers should think ahead and should not wait until a disabled person experiences difficulty.
- GOV.UK employment guidance says employers must make reasonable adjustments so workers with disabilities or health conditions are not substantially disadvantaged.
- GOV.UK employment guidance gives examples including changing recruitment processes, doing things another way, making physical changes, changing equipment, changing working patterns or location.
- ACAS says reasonable adjustments are changes an employer makes to remove or reduce a disadvantage related to someone’s disability.
- ACAS says the duty covers job applicants as well as employees/workers.
- ACAS gives examples including extra time for written/reading tests, accessible interview rooms, accessible parking, breaks, flexible working, equipment and support.

**Card safety rule**

Do not tell the user the organisation is automatically breaking the law. Write:

> “Organisations covered by the Equality Act may have a duty to make reasonable adjustments where a disabled person would otherwise be placed at a substantial disadvantage.”

---

### 5.3 NHS / healthcare communication and access

**Primary sources**

1. NHS England — *Accessible Information Standard – requirements (DAPB1605)*  
   URL: https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/  
   Publisher: NHS England  
   Last checked: 2026-06-09  
   Confidence: official

2. NHS England — *Accessible Information Standard – implementation guidance*  
   URL: https://www.england.nhs.uk/long-read/accessible-information-standard-implementation-guidance/  
   Publisher: NHS England  
   Last checked: 2026-06-09  
   Confidence: official

3. NHS England — *Reasonable adjustments*  
   URL: https://www.england.nhs.uk/learning-disabilities/improving-health/reasonable-adjustments/  
   Publisher: NHS England  
   Last checked: 2026-06-09  
   Confidence: official

4. NHS Digital — *Reasonable Adjustment Flag*  
   URL: https://digital.nhs.uk/services/reasonable-adjustment-flag  
   Publisher: NHS Digital  
   Last checked: 2026-06-09  
   Confidence: official

**Research summary**

- The Accessible Information Standard aims to ensure disabled people, people with impairments and people with sensory loss can access and understand NHS/adult social care information and receive the communication support they need.
- The standard says services should identify, record, flag, share, meet and review people’s information and communication support needs.
- The standard applies to NHS and publicly funded adult social care providers and commissioners, including GP, community pharmacy, dental and optometry services.
- Examples of support include information in alternative formats, longer appointments, specific contact methods, communication professionals such as BSL/deafblind interpreters, communication aids, and advocacy support.
- NHS England states reasonable adjustments are a legal requirement to make health services accessible to disabled people.
- NHS Digital’s Reasonable Adjustment Flag is designed to provide staff with information about duties under the Equality Act and records existing adjustments.

**Card safety rule**

Do not promise a specific clinical outcome. Focus on access and communication support:

> “Please record and flag my communication/access needs so staff know what support I need for appointments.”

---

### 5.4 Social care needs assessments

**Primary sources**

1. GOV.UK — *Apply for a needs assessment by social services*  
   URL: https://www.gov.uk/apply-needs-assessment-social-services  
   Publisher: UK Government  
   Last checked: 2026-06-09  
   Confidence: official

2. NHS — *Getting a care needs assessment*  
   URL: https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/  
   Publisher: NHS  
   Last checked: 2026-06-09  
   Confidence: official

**Secondary source for practical preparation**

3. Age UK — *The Care Needs Assessment Explained*  
   URL: https://www.ageuk.org.uk/information-advice/care/arranging-care/care-needs-assessment/  
   Publisher: Age UK  
   Last checked: 2026-06-09  
   Confidence: secondary/credible

**Research summary**

- GOV.UK says a health and social care assessment is carried out by social services to find out what help and support a person needs.
- GOV.UK lists possible services such as home care help, disability equipment and adaptations, day centres, day care for a child, help with parenting, and care homes.
- GOV.UK says the page is for England and Wales.
- NHS says people should contact adult social services at their local council and ask for a needs assessment.
- Age UK says a person can ask for a care needs assessment by contacting adult social services and that carers may also be entitled to a carer’s assessment.

**Card safety rule**

Do not promise a number of hours or a care package. Write:

> “The assessment is to identify your needs, risks, outcomes and what support may be required.”

---

### 5.5 PIP / benefits assessment

**Primary sources**

1. GOV.UK — *Personal Independence Payment (PIP): What PIP is for*  
   URL: https://www.gov.uk/pip  
   Publisher: Department for Work and Pensions  
   Last checked: 2026-06-09  
   Confidence: official

2. GOV.UK — *PIP assessment guide part 2: the assessment criteria*  
   URL: https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-2-the-assessment-criteria  
   Publisher: Department for Work and Pensions  
   Last checked: 2026-06-09  
   Confidence: official

3. GOV.UK PDF — *How your disability affects you: PIP2 form and information booklet*  
   URL: https://assets.publishing.service.gov.uk/media/6602af72f1d3a09b1f32ac81/pip2-form-and-information-booklet__1_.pdf  
   Publisher: Department for Work and Pensions  
   Last checked: 2026-06-09  
   Confidence: official

**Secondary source for plain-English preparation**

4. Citizens Advice — *How the DWP makes a decision on PIP claims*  
   URL: https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/help-with-your-claim/how-decisions-are-made/  
   Publisher: Citizens Advice  
   Last checked: 2026-06-09  
   Confidence: secondary/credible

**Research summary**

- GOV.UK says PIP is assessed by looking at how difficult the person finds daily living and mobility tasks.
- GOV.UK lists daily living areas including preparing food, eating/drinking, managing medicines/treatments, washing/bathing, using the toilet, dressing, reading, managing money, socialising, and talking/listening/understanding.
- GOV.UK lists mobility areas including planning/following journeys, physically moving around, and leaving home.
- GOV.UK says DWP looks at whether the person can do tasks safely, how long they take, and whether they need help from a person or extra equipment.
- The PIP assessment guide says reliability is central. A person should be considered in terms of whether they can complete the activity safely, to an acceptable standard, repeatedly, and in a reasonable time period.
- The PIP assessment guide defines “reasonable time period” as no more than twice as long as the maximum period a non-disabled person would normally take.
- The PIP assessment guide says the assessment considers the likely ability over a year-long period and considers aids/appliances and help from another person.

**Card safety rule**

Do not write “you qualify for PIP”. Write:

> “PIP looks at how your condition affects daily living and mobility tasks, including whether you can do them safely, repeatedly, to an acceptable standard and in a reasonable time.”

---

### 5.6 Blue Badge

**Primary sources**

1. GOV.UK — *The Blue Badge scheme: rights and responsibilities in England*  
   URL: https://www.gov.uk/government/publications/the-blue-badge-scheme-rights-and-responsibilities-in-england/the-blue-badge-scheme-rights-and-responsibilities-in-england  
   Publisher: Department for Transport  
   Last checked: 2026-06-09  
   Confidence: official

2. GOV.UK PDF — *Blue Badge rights and responsibilities booklet*  
   URL: https://assets.publishing.service.gov.uk/media/611a22aed3bf7f63a54f5fad/blue-badge-rights-and-responsibility-large-type.pdf  
   Publisher: Department for Transport  
   Last checked: 2026-06-09  
   Confidence: official

**Research summary**

- GOV.UK says badge holders must display the Blue Badge clearly.
- When parking on yellow lines or other places with time restrictions, the parking clock may need to be displayed and set to the quarter-hour period when the person arrived.
- GOV.UK says badge holders may park on single or double yellow lines for up to 3 hours, but generally not where loading/unloading restrictions apply.
- GOV.UK says badge holders may park for free and as long as needed at on-street meters and pay-and-display machines, but the badge must be displayed.
- GOV.UK says off-street car park operators decide whether badge holders can park free of charge.
- GOV.UK explicitly says the Blue Badge is not a licence to park anywhere.
- The Blue Badge scheme is administered and enforced by local councils, and users should contact the relevant council first for further information.

**Card safety rule**

Do not imply a Blue Badge allows parking anywhere. Write:

> “A Blue Badge helps with parking concessions, but it is not a licence to park anywhere. Always check signs, local rules and car park rules.”

---

## 6. Initial Help Cards to build now

---

# Card 1: Section 88 driving licence explanation

```ts
id: "section-88-driving-licence"
slug: "section-88-driving-licence"
category: "Police & driving"
situation: "Stopped while DVLA is processing a licence application"
urgency: "high"
badge: "Police & driving"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Section 88 driving licence explanation

**Use this when:**  
You are stopped or challenged while your licence application is with DVLA and you need a calm way to explain that Section 88 may apply.

**Quick line:**  
“I understand I may be able to drive under Section 88 only if all DVLA conditions apply. My application is with DVLA, and I can show what evidence I have.”

**Key bullets:**

- Section 88 is conditional.
- DVLA says you and your doctor/healthcare professional are best placed to consider whether the criteria apply.
- Do not rely on this card if your licence was refused/revoked, you are disqualified, your application is over a year old, or you have been told not to drive.

## Expanded card content

### Say this first

- “I do not have my current licence because my application is with DVLA.”
- “I understand Section 88 may apply only if the DVLA conditions are met.”
- “I can show evidence that my application is with DVLA.”
- “I am happy to provide my details so this can be checked.”

### What I need

- Time to explain calmly.
- A chance to show evidence of the DVLA application.
- A chance to explain any medical/licensing context accurately.

### What to show if available

- DVLA application confirmation.
- DVLA letter/email or reference.
- Previous licence details.
- Proof of identity.
- Medical advice/fitness-to-drive evidence if relevant.
- Any DVLA form or renewal confirmation.

### Questions to ask

- “Can you explain what information you need from me?”
- “Can you record that my application is currently with DVLA?”
- “Would you like my DVLA reference or previous licence details?”
- “Can I show my application evidence?”

### Important limits

- This card is not legal advice.
- This card does not prove you can drive.
- You may only be able to drive if all Section 88 criteria apply.
- Do not drive if DVLA has refused or revoked your licence.
- Do not drive if you have been disqualified.
- Do not drive if your doctor or healthcare professional has advised you not to drive.
- Do not rely on Section 88 if your application is more than one year old.
- Section 88 is UK legislation and may not be accepted abroad.
- Always check DVLA guidance and your own medical/licensing situation.

### Sources checked

- GOV.UK — *Can I drive while my application is with DVLA? (INF188/6)*  
  https://www.gov.uk/government/publications/inf1886-can-i-drive-while-my-application-is-with-dvla
- DVLA PDF — *INF188/6*  
  https://assets.publishing.service.gov.uk/media/64edcf3a13ae1500116e2f5d/inf1886-can-i-drive-while-my-application-is-with-dvla.pdf

---

# Card 2: Equality Act reasonable adjustments

```ts
id: "equality-act-reasonable-adjustments"
slug: "equality-act-reasonable-adjustments"
category: "Rights & complaints"
situation: "Asking an organisation to remove or reduce a disability-related barrier"
urgency: "medium"
badge: "Rights & complaints"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Equality Act reasonable adjustments

**Use this when:**  
You need to ask a service, workplace, venue, healthcare provider, council, transport provider or other organisation to adjust how they do something because you are disabled or have a health condition.

**Quick line:**  
“I’m asking for a reasonable adjustment because without it I’m put at a substantial disadvantage.”

**Key bullets:**

- Reasonable adjustments can include changing a process, changing a physical feature, or providing support/auxiliary aids.
- What is reasonable depends on the situation.
- Ask for the adjustment in writing where possible.

## Expanded card content

### Say this first

- “I’m disabled / I have a health condition that affects how I access this service.”
- “Without an adjustment, I’m put at a substantial disadvantage.”
- “I’m asking for a reasonable adjustment so I can access this fairly.”
- “Please confirm what you can do and who is responsible for arranging it.”

### Useful rights line

“Under the Equality Act 2010, organisations may have a duty to make reasonable adjustments where a disabled person would otherwise be placed at a substantial disadvantage.”

### What I’m asking for

Use whichever apply:

- A change to the usual process.
- Step-free access or an accessible route.
- Accessible toilet information.
- Accessible parking/drop-off.
- Extra time.
- A quieter space.
- Written information.
- Communication support.
- Permission for a PA/carer/support person.
- Alternative appointment format.
- Equipment or support.
- Confirmation in writing.

### Questions to ask

- “Who is responsible for arranging the adjustment?”
- “Can you confirm this by email?”
- “What alternative can you offer if the first option is not available?”
- “Is there a named contact on the day?”
- “Can you record this adjustment for future visits?”

### Evidence to have ready

- Short access-needs summary.
- Medical or disability evidence if relevant.
- Photos or examples of the barrier.
- Previous adjustment examples.
- Emails/messages confirming what was requested.

### After the conversation

- Record date, time, person spoken to and what was agreed.
- Send a follow-up email confirming the request.
- Keep screenshots or copies of replies.
- If refused, ask for the reason in writing and whether alternatives were considered.

### Important limits

- This card is not legal advice.
- Whether an adjustment is legally “reasonable” depends on the circumstances.
- Do not state that an organisation has definitely broken the law unless you have taken advice.
- Keep requests specific and practical.

### Sources checked

- Equality Act 2010, Section 20  
  https://www.legislation.gov.uk/ukpga/2010/15/section/20
- GOV.UK — Equality Act 2010 guidance  
  https://www.gov.uk/guidance/equality-act-2010-guidance
- GOV.UK — Disability quick start guide for service providers  
  https://www.gov.uk/government/publications/equality-act-guidance/disability-quick-start-guide-for-service-providers-html
- GOV.UK — Reasonable adjustments for workers  
  https://www.gov.uk/reasonable-adjustments-for-disabled-workers
- ACAS — Reasonable adjustments at work  
  https://www.acas.org.uk/reasonable-adjustments

---

# Card 3: Job interview reasonable adjustment card

```ts
id: "job-interview-reasonable-adjustments"
slug: "job-interview-reasonable-adjustments"
category: "Work & interviews"
situation: "Preparing for a job interview or recruitment process"
urgency: "medium"
badge: "Work & interviews"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Job interview reasonable adjustment card

**Use this when:**  
You have a job interview and need changes such as extra time, accessible room setup, remote interview, communication support, rest breaks, parking, accessible toilet access or PA/carer support.

**Quick line:**  
“I’m asking for reasonable adjustments so I can take part in the interview fairly.”

**Key bullets:**

- Reasonable adjustments can apply to job applicants.
- Adjustments can include changes to recruitment processes.
- Ask early and get confirmation in writing.

## Expanded card content

### Say this first

- “Thank you for inviting me to interview.”
- “I’m looking forward to taking part.”
- “I need to request reasonable adjustments so I can participate fairly.”
- “Please confirm the arrangements in writing before the interview.”

### Useful rights line

“GOV.UK and ACAS guidance explain that reasonable adjustments can apply to job applicants, including changes to recruitment processes and interview arrangements.”

### What I’m asking for

Use whichever apply:

- Step-free interview location.
- Interview room accessible for a wheelchair or mobility aid.
- Accessible toilet nearby.
- Accessible parking or drop-off point.
- Extra time for written or reading tasks.
- Rest breaks.
- Remote interview option.
- Questions or materials in accessible format.
- Communication support.
- Permission for PA/carer/support person where needed.
- Clear arrival instructions and named contact.

### Questions to ask recruiter

- “Is the interview room step-free?”
- “Is there an accessible toilet nearby?”
- “Where is the nearest accessible parking/drop-off?”
- “Will there be any written test, reading task or timed task?”
- “Can I have extra time or breaks if needed?”
- “Can the interview be remote if the building is not accessible?”
- “Who should I contact on arrival?”

### Evidence to have ready

- Short access-needs summary.
- Medical/access evidence if required.
- Previous adjustment examples.
- Email request and reply.
- Travel/access notes.

### Follow-up wording

“Thank you for confirming the interview. To make sure I can take part fairly, please confirm the agreed reasonable adjustments: [list adjustments]. Please also confirm who I should contact on arrival.”

### Important limits

- This card is not legal advice.
- What is reasonable depends on the role, interview format and employer circumstances.
- Do not assume the employer knows your needs unless you tell them.
- Keep the request practical, specific and linked to the interview barrier.

### Sources checked

- GOV.UK — Reasonable adjustments for workers with disabilities or health conditions  
  https://www.gov.uk/reasonable-adjustments-for-disabled-workers
- ACAS — Reasonable adjustments at work  
  https://www.acas.org.uk/reasonable-adjustments
- Equality Act 2010, Section 20  
  https://www.legislation.gov.uk/ukpga/2010/15/section/20

---

# Card 4: GP / hospital appointment access card

```ts
id: "gp-hospital-appointment-access"
slug: "gp-hospital-appointment-access"
category: "Healthcare appointments"
situation: "Preparing for a GP, hospital or NHS appointment"
urgency: "medium"
badge: "Healthcare"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** GP / hospital appointment access card

**Use this when:**  
You need the GP surgery, hospital, clinic or NHS service to record and meet your communication, mobility, sensory or access needs.

**Quick line:**  
“Please record and flag my access and communication needs so staff know what support I need for appointments.”

**Key bullets:**

- NHS/adult social care services should identify, record, flag, share, meet and review information and communication support needs.
- Examples can include longer appointments, accessible information, specific contact methods, communication support or advocacy.
- Ask for agreed adjustments to be recorded.

## Expanded card content

### Say this first

- “I have access/communication needs that affect appointments.”
- “Please record these on my record so staff know what support I need.”
- “Please confirm how these needs will be flagged for future appointments.”
- “I need the appointment to be accessible so I can understand, communicate and take part.”

### What I need

Use whichever apply:

- Longer appointment.
- Step-free route.
- Accessible toilet nearby.
- Quiet waiting area.
- Specific contact method, such as email or text instead of phone.
- Written information after the appointment.
- Large print, audio, easy read or accessible digital information.
- BSL/deafblind interpreter or communication professional if needed.
- PA/carer/support person present.
- Time to answer questions.
- Help with transfers/positioning only if safe and agreed.
- Reasonable Adjustment Flag or record note if available.

### Questions to ask reception/admin

- “Can you record my communication/access needs?”
- “Can these needs be flagged for future appointments?”
- “Can I have a longer appointment?”
- “Is there a step-free route and accessible toilet?”
- “Can appointment letters/results be sent in my accessible format?”
- “Can a carer/PA/support person come with me?”
- “Can you confirm this in writing?”

### Questions to ask the clinician

- “Can you please speak directly to me and give me time to answer?”
- “Can you write down the key decisions and next steps?”
- “Can you explain what happens next and who is responsible?”
- “Can this adjustment be added to my record?”

### Evidence to have ready

- Access-needs summary.
- Medication list.
- Current symptoms/concerns.
- Medical letters or care plan.
- Communication passport if available.
- Notes from PA/carer if relevant.
- Photos or measurements if access is physical.

### After the appointment

- Ask for written next steps.
- Ask who to contact if the adjustment was not met.
- Record what happened.
- Ask for the needs to be corrected/updated if they were wrong.

### Important limits

- This card is not medical advice.
- It does not replace clinical advice.
- It is about access, communication and participation.
- Some adjustments may require advance notice, but services should still consider what can be done.

### Sources checked

- NHS England — Accessible Information Standard requirements  
  https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/
- NHS England — Accessible Information Standard implementation guidance  
  https://www.england.nhs.uk/long-read/accessible-information-standard-implementation-guidance/
- NHS England — Reasonable adjustments  
  https://www.england.nhs.uk/learning-disabilities/improving-health/reasonable-adjustments/
- NHS Digital — Reasonable Adjustment Flag  
  https://digital.nhs.uk/services/reasonable-adjustment-flag

---

# Card 5: Social care assessment preparation card

```ts
id: "social-care-assessment-preparation"
slug: "social-care-assessment-preparation"
category: "Social care"
situation: "Preparing for a council adult social care needs assessment"
urgency: "medium"
badge: "Social care"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Social care assessment preparation card

**Use this when:**  
You have a needs assessment with social services and need to explain your daily living needs, risks, support needs and outcomes.

**Quick line:**  
“I need the assessment to look at what support I need to live safely, manage daily life and achieve my outcomes.”

**Key bullets:**

- A needs assessment looks at what help and support you need.
- Support can include help at home, equipment, adaptations, day services or care.
- Do not understate what happens on bad days or when unpaid support is not available.

## Expanded card content

### Say this first

- “I need this assessment to cover what I can and cannot do safely.”
- “Please consider my needs across the whole day and night, not just one short snapshot.”
- “Please include the risks if support is not provided.”
- “Please send me the assessment and any care/support plan in writing.”

### What I need to explain

Use whichever apply:

- Washing/bathing.
- Dressing/undressing.
- Toileting/continence.
- Eating/drinking/meal preparation.
- Medication/treatment support.
- Transfers and mobility.
- Pressure care/skin risk.
- Falls or injury risk.
- Communication support.
- Access to the community.
- Household tasks.
- Managing appointments/admin.
- Night-time needs.
- Carer/PA support.
- What happens if family/unpaid support is not available.

### Outcomes I want

- To be safe at home.
- To avoid injury, neglect or deterioration.
- To access washing, toileting, food and medication safely.
- To reduce carer breakdown.
- To access appointments/community life.
- To have support that is reliable and sustainable.

### Questions to ask

- “What needs have you recorded?”
- “What risks have you recorded?”
- “What outcomes are being assessed?”
- “What support options are being considered?”
- “Will equipment/adaptations/direct payments/home care be considered?”
- “Can I have the assessment and decision in writing?”
- “What happens if I disagree?”
- “Can my carer have a carer’s assessment?”

### Evidence to have ready

- Care diary.
- Examples of what happens without support.
- Medical letters.
- OT/physio reports.
- District nurse notes if relevant.
- Photos of access barriers.
- Falls/injury/pressure-care records.
- Current support plan.
- PA/carer rota or gaps.
- Carer statement.

### After the conversation

- Ask for a copy of the assessment.
- Ask for the eligibility decision and reasons.
- Ask for the proposed care/support plan.
- Check whether risks and night-time needs are recorded.
- Correct anything inaccurate in writing.
- Keep a copy of all emails and notes.

### Important limits

- This card is not legal advice.
- It does not guarantee a care package or number of hours.
- Assessment outcomes depend on the council’s decision and the evidence recorded.
- Be specific about risks, frequency, duration and consequences.

### Sources checked

- GOV.UK — Apply for a needs assessment by social services  
  https://www.gov.uk/apply-needs-assessment-social-services
- NHS — Getting a care needs assessment  
  https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/
- Age UK — The Care Needs Assessment Explained  
  https://www.ageuk.org.uk/information-advice/care/arranging-care/care-needs-assessment/

---

# Card 6: PIP / benefits assessment card

```ts
id: "pip-benefits-assessment"
slug: "pip-benefits-assessment"
category: "Benefits & assessments"
situation: "Preparing for PIP form, review or assessment"
urgency: "medium"
badge: "Benefits & assessments"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** PIP / benefits assessment card

**Use this when:**  
You are preparing for a PIP claim, review or assessment and need to explain how your condition affects daily living and mobility.

**Quick line:**  
“PIP looks at how my condition affects daily living and mobility tasks, including whether I can do them safely, repeatedly, to an acceptable standard and in a reasonable time.”

**Key bullets:**

- Focus on what happens when you try to do the activity.
- Explain help, aids, prompting, supervision, risk, pain, fatigue and time taken.
- Give real examples, not just diagnosis labels.

## Expanded card content

### Say this first

- “I want to explain how my condition affects daily living and mobility.”
- “Please consider whether I can do each activity safely, repeatedly, to an acceptable standard and in a reasonable time.”
- “I need to explain what happens on bad days, after exertion and when support is not available.”

### What to explain

Use whichever apply:

- Preparing food.
- Eating/drinking.
- Managing medication or treatment.
- Washing/bathing.
- Using the toilet.
- Dressing/undressing.
- Reading/understanding information.
- Communicating.
- Mixing with people.
- Managing money.
- Planning/following journeys.
- Moving around.
- Leaving home.
- Pain, fatigue, breathlessness or risk after activity.
- Whether tasks can be repeated later the same day or next day.

### Reliability checklist

For each activity, explain:

- **Safely:** Could it cause harm during or afterwards?
- **Acceptable standard:** Can it be done properly enough?
- **Repeatedly:** Can it be done as often as reasonably needed?
- **Reasonable time:** Does it take much longer than it would for a non-disabled person?
- **Help:** Do you need prompting, supervision, assistance, aids, appliances or another person?

### Evidence to have ready

- Recent medical evidence.
- Medication/treatment list.
- Care/support plan.
- OT/physio reports.
- Diary of difficult days.
- Examples of accidents, falls, choking, fatigue, pain or unsafe attempts.
- Statements from carers, PA, family or professionals.
- Photos of aids/adaptations if relevant.
- Appointment letters or reports.

### After the assessment

- Write down what was asked and what you said.
- Record any problems with the assessment.
- Keep copies of evidence sent.
- Check the decision letter carefully when it arrives.
- Ask for advice if you disagree with the decision.

### Important limits

- This card is not benefits advice or legal advice.
- It does not mean you qualify for PIP.
- PIP decisions depend on the evidence, descriptors and DWP decision-making.
- Do not exaggerate, but do not understate the impact either.
- Use specific real examples.

### Sources checked

- GOV.UK — Personal Independence Payment (PIP)  
  https://www.gov.uk/pip
- GOV.UK — PIP assessment guide part 2  
  https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-2-the-assessment-criteria
- GOV.UK PDF — How your disability affects you: PIP2 form and information booklet  
  https://assets.publishing.service.gov.uk/media/6602af72f1d3a09b1f32ac81/pip2-form-and-information-booklet__1_.pdf
- Citizens Advice — How DWP makes a decision on PIP claims  
  https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/help-with-your-claim/how-decisions-are-made/

---

# Card 7: Venue access questions card

```ts
id: "venue-access-questions"
slug: "venue-access-questions"
category: "Venues & travel"
situation: "Checking access before visiting a venue"
urgency: "medium"
badge: "Venues & travel"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Venue access questions card

**Use this when:**  
You are contacting a venue before visiting and need clear answers about step-free access, toilets, parking, seating, sensory needs or staff assistance.

**Quick line:**  
“Please confirm the access details in writing so I can plan safely before I visit.”

**Key bullets:**

- Ask specific questions, not just “is it accessible?”
- Check entrance, route, toilet, parking, seating and staff assistance.
- Ask for photos or measurements if access is uncertain.

## Expanded card content

### Say this first

- “I’m planning a visit and need to check access before I travel.”
- “Please can you confirm the details in writing?”
- “A general ‘yes, we are accessible’ is not enough for me to plan safely.”

### Questions to ask

#### Entrance and route

- “Is there a step-free entrance?”
- “Are there any steps, lips, slopes or thresholds?”
- “Is the accessible entrance the same as the main entrance?”
- “If not, where exactly is it?”
- “Are doors manual, automatic or staff-assisted?”
- “Can you send photos of the entrance and route?”

#### Wheelchair / mobility

- “What is the narrowest doorway on the route?”
- “Is there enough turning space for a wheelchair?”
- “Are tables/seating movable?”
- “Is there a lift? What are the lift dimensions?”
- “Is the accessible route available at all opening times?”

#### Toilets

- “Is there an accessible toilet?”
- “Is it step-free to reach?”
- “Is it kept unlocked?”
- “Is it being used for storage?”
- “Does it have grab rails, transfer space and an emergency cord?”
- “Is there a Changing Places toilet nearby?”

#### Parking and arrival

- “Is there Blue Badge parking?”
- “How far is it from the entrance?”
- “Is there a safe drop-off point?”
- “Is the route from parking/drop-off step-free?”

#### Sensory / fatigue

- “Is there a quieter time to visit?”
- “Is there a quiet space?”
- “Can I avoid queues?”
- “Is seating available while waiting?”
- “Can I take breaks?”

#### Assistance

- “Can staff help with doors, route directions or queue management?”
- “Is there a named contact on arrival?”
- “Can I bring a PA/carer/support person?”

### Evidence to keep

- Venue email or message confirming access.
- Screenshots of access information.
- Photos sent by the venue.
- Name of staff member who confirmed.
- Date/time of confirmation.
- Any access issue experienced on arrival.

### Important limits

- This card is not legal advice.
- Access information can change.
- Always confirm directly before travelling if access is critical.
- Do not rely only on generic website claims.
- If access is not available, ask what reasonable alternative the venue can offer.

### Sources checked

- GOV.UK — Disability quick start guide for service providers  
  https://www.gov.uk/government/publications/equality-act-guidance/disability-quick-start-guide-for-service-providers-html
- Equality Act 2010, Section 20  
  https://www.legislation.gov.uk/ukpga/2010/15/section/20
- Citizens Advice — Duty to make reasonable adjustments  
  https://www.citizensadvice.org.uk/law-and-courts/discrimination/check-what-type-of-discrimination-youve-experienced/duty-to-make-reasonable-adjustments-for-disabled-people/

---

# Card 8: Blue Badge issue card

```ts
id: "blue-badge-issue"
slug: "blue-badge-issue"
category: "Police & driving"
situation: "Blue Badge parking challenge or PCN"
urgency: "high"
badge: "Police & driving"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Blue Badge issue card

**Use this when:**  
You are challenged about Blue Badge parking, or you receive a PCN and need to record the facts calmly.

**Quick line:**  
“I understand a Blue Badge is not a licence to park anywhere. Please explain which restriction you say applies so I can record it accurately.”

**Key bullets:**

- Always check signs and local rules.
- Badge and clock must be displayed correctly where required.
- Take photos and keep evidence if challenged.

## Expanded card content

### Say this first

- “I am a Blue Badge holder.”
- “I understand I must follow the rules and check signs.”
- “Please explain which parking restriction you say applies.”
- “I would like to record the details so I can respond properly.”

### What to check immediately

- Is the badge clearly displayed?
- Is the clock displayed and set correctly if required?
- Are there yellow kerb marks/loading restrictions?
- Are there signs with time limits or local restrictions?
- Is this an off-street/private car park with its own rules?
- Is this a red route, private road, airport road or special local scheme?
- Is the badge still valid and legible?

### Evidence to collect

- Photos of badge display.
- Photos of clock display.
- Photos of signs and road markings.
- Wider photos showing location/context.
- PCN/ticket number.
- Time and date.
- Name/ID of officer if available.
- Any relevant access need or reason for parking there.

### Questions to ask

- “Which sign or restriction applies here?”
- “Is this council-enforced, private, or another type of car park?”
- “Can you show me where the relevant restriction is displayed?”
- “What is the appeal or challenge process?”
- “Can I have the details in writing?”

### Important limits

- This card is not legal advice.
- A Blue Badge is not a licence to park anywhere.
- You must check signs, local rules and car park rules.
- Off-street/private car parks can have different rules.
- Do not misuse a badge or allow someone else to use it for their own benefit.
- Contact the relevant local council for Blue Badge scheme questions.

### Sources checked

- GOV.UK — Blue Badge scheme rights and responsibilities in England  
  https://www.gov.uk/government/publications/the-blue-badge-scheme-rights-and-responsibilities-in-england/the-blue-badge-scheme-rights-and-responsibilities-in-england
- GOV.UK PDF — Blue Badge rights and responsibilities booklet  
  https://assets.publishing.service.gov.uk/media/611a22aed3bf7f63a54f5fad/blue-badge-rights-and-responsibility-large-type.pdf

---

# Card 9: Communication support card

```ts
id: "communication-support-card"
slug: "communication-support-card"
category: "Communication cards"
situation: "When you need more time, written information, support or accessible communication"
urgency: "high"
badge: "Communication"
sourceConfidence: "official"
lastReviewed: "2026-06-09"
```

## Front preview

**Title:** Communication support card

**Use this when:**  
You need someone to speak clearly, give you more time, speak directly to you, write things down, use a different contact method, or allow a PA/carer/support person to help.

**Quick line:**  
“Please give me time to respond and communicate with me in a way I can access and understand.”

**Key bullets:**

- Speak directly to me.
- Give me time.
- Write down key decisions.
- Allow my PA/carer/support person if needed.

## Expanded card content

### Say this first

- “Please speak directly to me.”
- “Please give me time to respond.”
- “Please do not rush or talk over me.”
- “I may need my PA/carer/support person to help me communicate.”
- “Please write down key decisions or next steps.”

### What I need

Use whichever apply:

- More time to respond.
- Written information.
- Email/text instead of phone.
- Large print, easy read, audio or accessible digital format.
- Shorter questions, one at a time.
- Plain English.
- Breaks.
- PA/carer/support person present.
- BSL/interpreter/communication professional if needed.
- Confirmation of decisions in writing.

### Questions to ask

- “Can you write that down?”
- “Can you send that by email?”
- “Can you repeat the question more slowly?”
- “Can you ask one question at a time?”
- “Can my PA/carer support communication?”
- “Can this communication need be recorded for next time?”

### Evidence to keep

- Written summary.
- Appointment notes.
- Emails/messages.
- Name of person spoken to.
- Record of any communication barrier.
- Any existing communication passport.

### Important limits

- This card is not medical or legal advice.
- It explains communication support needs.
- In healthcare/adult social care, the Accessible Information Standard is especially relevant.
- In other services, reasonable adjustment duties may be relevant under the Equality Act.

### Sources checked

- NHS England — Accessible Information Standard requirements  
  https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/
- NHS England — Accessible Information Standard implementation guidance  
  https://www.england.nhs.uk/long-read/accessible-information-standard-implementation-guidance/
- GOV.UK — Disability quick start guide for service providers  
  https://www.gov.uk/government/publications/equality-act-guidance/disability-quick-start-guide-for-service-providers-html
- Equality Act 2010, Section 20  
  https://www.legislation.gov.uk/ukpga/2010/15/section/20

---

## 7. Card pack examples

### 7.1 Job interview access pack

Includes:

1. Job interview reasonable adjustment card.
2. Equality Act reasonable adjustments card.
3. Communication support card.
4. Follow-up wording card.
5. Evidence checklist card.

### 7.2 Medical appointment access pack

Includes:

1. GP / hospital appointment access card.
2. Communication support card.
3. “I need my PA/carer present” card.
4. Written next steps card.
5. Appointment evidence checklist.

### 7.3 Social care assessment pack

Includes:

1. Social care assessment preparation card.
2. Communication support card.
3. Daily living impact checklist.
4. Carer involvement card.
5. Follow-up request for written assessment/care plan.

### 7.4 Venue visit access pack

Includes:

1. Venue access questions card.
2. Equality Act reasonable adjustments card.
3. Communication support card.
4. Blue Badge issue card if relevant.
5. Save/email venue confirmation card.

---

## 8. Action behaviour requirements

### 8.1 Open card

- Opens detail panel or route.
- Accessible label: `Open [card title]`.

### 8.2 Copy quick line

- Copies `quickLine`.
- Shows “Copied” for around 1.8 seconds.
- Announce status with `aria-live="polite"`.
- Accessible label: `Copy quick line from [card title]`.

### 8.3 Print

- Print only the selected card.
- Hide nav/footer/background effects.
- Use white background and black text.
- Include source list and last reviewed date at the bottom.
- Accessible label: `Print [card title]`.

### 8.4 Save to phone

- If image export is available, export the card as clean PNG.
- If not genuinely implemented, rename to “Copy card text”.
- No fake functionality.
- Accessible label: `Save [card title] to phone`.

### 8.5 Tailor with AI

When clicked, open a panel/modal asking:

- Where are you going?
- Who are you speaking to?
- What access need do you need to explain?
- What outcome do you want?
- Is this urgent?
- Do you want a short script, longer explanation, checklist, or email?

AI output should generate:

- Quick script.
- Longer explanation.
- Questions to ask.
- Evidence checklist.
- Follow-up wording.
- Important limits.

No fake button. Must have loading, success and error states.

---

## 9. UI acceptance criteria

The Help Cards page is acceptable only if:

- The user understands what Help Cards are within 3 seconds.
- The cards are clearly for real-world moments, not generic topics.
- The first cards are based on the researched source pack above.
- Each card has source metadata and last-reviewed date.
- Each card has quick line, say-this-first script, evidence checklist, questions to ask, after-conversation steps and important limits.
- Every action works or is removed/renamed.
- The design feels premium, calm, practical, modern and disability-led.
- Minimum touch target is 44px.
- Full keyboard navigation works.
- No hidden focusable controls.
- No horizontal scroll at 320px.
- Print view is usable.
- Copy state is announced.
- No unverified advice is published as final.

---

## 10. Master Cursor build prompt

Paste this after the document above, or point Cursor to this file and say: **Use this Markdown file as the source of truth. Build the Help Cards from the researched content in it.**

```txt
Act as a senior frontend engineer, product designer, accessibility specialist and UK disability-rights content implementer.

Use the attached Markdown research document as the source of truth for rebuilding the Access Stamp Help Cards page. Do not invent legal, driving, healthcare, benefits, social care or Blue Badge advice. Use only the researched card content and source metadata in the document unless I explicitly ask you to add more cards.

Rebuild /help-cards so it becomes a practical, source-backed “pocket card” system for real-world access, rights, appointments, interviews, travel, police/driving, benefits and support situations.

This is not a generic help centre. Help Cards are portable, situation-specific cards that disabled people can open, show, read out, save to phone, print, copy or tailor before/during real-world moments.

Required files:
- src/app/help-cards/page.tsx
- src/features/help-cards/HelpCardsPage.tsx
- src/features/help-cards/helpCards.data.ts
- src/features/help-cards/helpCardTypes.ts
- src/features/help-cards/HelpCardsHero.tsx
- src/features/help-cards/HelpCardSearch.tsx
- src/features/help-cards/HelpCardFilters.tsx
- src/features/help-cards/HighPressureCards.tsx
- src/features/help-cards/RealWorldMoments.tsx
- src/features/help-cards/CardPackSection.tsx
- src/features/help-cards/FeaturedHelpCard.tsx
- src/features/help-cards/HelpCardGrid.tsx
- src/features/help-cards/HelpCardPreview.tsx
- src/features/help-cards/HelpCardDetail.tsx
- src/features/help-cards/HelpCardActions.tsx
- src/features/help-cards/HelpCardSources.tsx
- src/features/help-cards/HelpCardPrintView.tsx
- src/features/help-cards/HelpCardTailorPanel.tsx
- src/features/help-cards/useHelpCardSearch.ts
- src/features/help-cards/useHelpCardCopy.ts
- src/features/help-cards/useHelpCardPrint.ts
- src/features/help-cards/useHelpCardDownload.ts

Initial cards to build from the research document:
1. Section 88 driving licence explanation
2. Equality Act reasonable adjustments
3. Job interview reasonable adjustment card
4. GP / hospital appointment access card
5. Social care assessment preparation card
6. PIP / benefits assessment card
7. Venue access questions card
8. Blue Badge issue card
9. Communication support card

Page structure:
1. Hero with title, subtitle, body, search, primary CTA and featured wallet-card preview.
2. High-pressure cards.
3. Choose the situation.
4. Card packs for difficult conversations.
5. Featured card preview.
6. Browse all cards.
7. Tailor with AI panel.
8. Sources/safety notice.

Hero copy:
Title: Help Cards
Subtitle: Pocket-sized scripts for real-world access, rights and support situations.
Body: Open a card before an appointment, interview, venue visit, police stop or difficult conversation. Show it, read it out, print it, save it to your phone, or tailor it with AI.
Primary CTA: Build a card pack
Secondary CTA: Browse all cards
Search placeholder: What situation are you preparing for?

Visual direction:
Make the design feel like Apple Wallet, an access passport, emergency support card and premium disability-led product. Use dark navy/deep ink background, premium card surfaces, rounded pass-card style, strong badges, large readable titles, high contrast, subtle gold/blue/green accents, and calm confident interaction states.

Avoid:
- Generic support resource layout.
- Charity-coded design.
- Government-coded design.
- Bland category tiles.
- Vague “learn more” cards.
- Fake buttons.

Each preview card must show:
- Situation badge.
- Title.
- Use this when.
- Quick line.
- 2–3 key bullets.
- Source confidence badge.
- Actions row.

Each expanded card must show:
- Full title.
- Plain-English use case.
- Quick line.
- Say this first.
- What I need / what I’m asking for.
- Questions to ask.
- Evidence to have ready.
- After the conversation.
- Important limits.
- Sources checked.
- Last reviewed date.

Action requirements:
- Open card.
- Save to phone or Copy card text if export is not genuinely implemented.
- Print.
- Copy quick line.
- Tailor with AI.

Button accessibility:
- Open [card title]
- Save [card title] to phone
- Print [card title]
- Copy quick line from [card title]
- Tailor [card title] with AI

Search behaviour:
- Search by title, situation, category, quick line, tags and use case.
- Results update instantly.
- Empty state: “No cards match that situation yet. Try a broader term or build a custom card.”

Responsive requirements:
Desktop:
- Hero with search and featured wallet card preview.
- Filter rail/chips.
- Real-world moment grid.
- Featured card preview panel.
- Card packs section.

Mobile:
- Sticky search.
- Horizontal filter chips.
- Large tappable cards.
- Card actions visible.
- Expanded card readable with one hand.
- No horizontal overflow.
- Minimum 44px touch targets.

Accessibility requirements:
- Full keyboard navigation.
- Visible focus states.
- No hidden focusable controls.
- aria-expanded for expandable sections.
- aria-live for copy/save/loading states.
- All buttons have contextual names.
- Do not rely on colour alone.
- Reduced-motion support.

Content safety requirements:
- Every card must include Important limits.
- Do not present card content as legal, medical, financial, benefits or driving advice.
- Use language like “may”, “ask”, “check”, “confirm”, “official guidance says”.
- Never say “you are definitely entitled”, “you are legally allowed”, or “they must do X” unless the researched source explicitly supports that wording.
- For Section 88, do not say someone can drive unless all DVLA conditions are met.
- For PIP, do not say someone qualifies.
- For Blue Badge, do not imply it allows parking anywhere.
- For healthcare, focus on access, communication support and reasonable adjustments; do not give clinical advice.
- For social care, say the assessment identifies needs/support; do not promise hours or services.

Acceptance criteria:
- The page explains what Help Cards are within 3 seconds.
- Cards feel like tools someone would actually use in stressful real-world situations.
- The first card set is source-backed.
- Each card has source metadata and last-reviewed date.
- Design is premium, modern, calm, practical and disability-led.
- No generic help-centre tiles.
- No fake Save/Print/Copy/Tailor buttons.
- No unsupported legal/driving/benefits claims.
- No empty dropdowns.
- No unverified advice published as final.
```
