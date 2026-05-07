import type { AdviceArticle } from "@/lib/mock-data";

/**
 * Full-length equipment guides (UK-focused practical detail).
 * Kept separate from BASE_ADVICE_ARTICLES intro/steps seeds for readability.
 */
export const EQUIPMENT_ARTICLES_DETAILED: AdviceArticle[] = [
  {
    slug: "choosing-a-wheelchair",
    title: "Choosing a wheelchair: what to check before you commit",
    categorySlug: "equipment",
    updated: "2026-05-07",
    tags: ["Wheelchairs", "Mobility", "Seating", "NHS", "Private"],
    sections: [
      { type: "h2", text: "Start with the environment, not the brochure" },
      {
        type: "p",
        text: "A wheelchair has to work where you actually live: door widths, ramps, lifts, storage at home, how it folds into a car boot, whether staff can push it on school or hospital visits, and how far you roll on a typical day. List those places before you look at colours or accessories.",
      },
      {
        type: "ul",
        items: [
          "Indoors: turning circles, carpet drag, narrow WC doors, kitchen reach.",
          "Outdoors: kerbs, camber, gravel, wet leaves, hill gradients you cannot avoid.",
          "Transport: vehicle lift or boot fit, taxi rules, train ramp angles if you travel often.",
          "Backup: what happens if you cannot self-propel or the battery dies (powered chairs).",
        ],
      },
      {
        type: "h2",
        text: "Manual vs powered: the functional decision",
      },
      {
        type: "p",
        text: "Manual chairs suit people who can push safely over their real routes, store the frame, and manage transfers without increasing pain or fall risk. Powered chairs help when distance, hills, pain, fatigue, upper limb strain, or breathlessness would make self-propelling unsafe or unsustainable. Hybrid options (power-assist wheels, smart drives) sit in the middle—useful if your upper limbs must be protected long term.",
      },
      {
        type: "h2",
        text: "Measurements that actually matter",
      },
      {
        type: "ul",
        items: [
          "Seat width and depth: too narrow risks pressure and shear; too wide means unstable posture and sliding.",
          "Seat height and footplate position: affects transfers, propulsion efficiency, and reaching counters.",
          "Back height and lateral support: affects trunk control, comfort on long days, and cushion choice.",
          "Armrests: removable or flip-back types help transfers but must not bruise shoulders when propelling.",
          "Tyres and castors: outdoor tread vs indoor manoeuvrability; solid tyres vs puncture risk on rough routes.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Before you sign anything",
        body: "Ask for a written specification list (frame, seat sizes, cushion type, weight limit, warranty period, crash-test compatibility if you will travel in a vehicle). Get the supplier’s repair turnaround and who pays for call-outs.",
      },
      {
        type: "h2",
        text: "Cushion and posture are not optional extras",
      },
      {
        type: "p",
        text: "The cushion should match your skin risk, sensation, continence pattern, transfer style, and how long you sit. A cushion that is “fine for most people” can still be wrong for you. If you have altered sensation, history of pressure injury, or fixed posture, specialist seating advice matters.",
      },
      {
        type: "h2",
        text: "Trials, training, and honest limits",
      },
      {
        type: "ul",
        items: [
          "Request a home or route trial on surfaces you use weekly, not only showroom carpet.",
          "Practise folding, lifting into a car, or docking a powered chair if that is your reality.",
          "Check whether prescribed accessories (lateral pads, head support, bags) interfere with brakes or transfers.",
          "Ask how adjustments are made after delivery if pain or pressure areas appear.",
        ],
      },
      {
        type: "h2",
        text: "Funding routes in the UK (overview)",
      },
      {
        type: "p",
        text: "NHS wheelchair services use local eligibility and referral routes (often via GP, physiotherapist, occupational therapist, or consultant). Provision may include loan equipment, voucher schemes, or part-funding toward private purchase depending on your integrated care board’s policy. Charities and Access to Work may help in specific circumstances. Always confirm who owns the chair, who renews it, and how repairs are funded before you agree.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This guide is general information, not medical or legal advice. For seating, pressure risk, or transfers, seek qualified clinical advice. NHS processes vary by area—check your local service’s published information.",
      },
    ],
  },
  {
    slug: "nhs-wheelchair-services-equipment",
    title: "NHS wheelchair services: referral and what to expect",
    categorySlug: "equipment",
    updated: "2026-05-07",
    tags: ["NHS", "Wheelchairs", "Referral", "Assessment", "Repairs"],
    sections: [
      { type: "h2", text: "What wheelchair services do" },
      {
        type: "p",
        text: "In England, integrated care boards commission wheelchair services differently, but the purpose is consistent: assess mobility and posture needs, prescribe appropriate equipment, maintain loan stock where applicable, and arrange repairs. You might receive a chair on long-term loan, a personal wheelchair budget, or a voucher—terminology and amounts vary.",
      },
      {
        type: "h2",
        text: "Common referral routes",
      },
      {
        type: "ul",
        items: [
          "GP, practice nurse, or consultant for medical context.",
          "Physiotherapist or occupational therapist for mobility and daily living assessment.",
          "Some areas accept self-referral or hospital discharge referrals—check local guidance.",
          "Keep copies of letters that explain why current mobility is unsafe or unsustainable.",
        ],
      },
      {
        type: "h2",
        text: "What to take to an assessment",
      },
      {
        type: "ul",
        items: [
          "Photos or short videos (with consent) of steps, narrow doors, or awkward transfers—only if helpful.",
          "Measurements if you already know door widths or vehicle constraints.",
          "List of typical weekly journeys: work, education, caring responsibilities, medical appointments.",
          "Old prescriptions or equipment history if you are replacing or upgrading.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Waiting constructively",
        body: "Waiting times fluctuate. Ask what interim support exists if you cannot mobilise safely—temporary loan equipment, repair prioritisation, or local voluntary sector schemes. Keep a dated record if delays affect education, employment, or health.",
      },
      {
        type: "h2",
        text: "After prescription: reviews and adjustments",
      },
      {
        type: "p",
        text: "Needs change with pain levels, weight fluctuation, progression of a condition, or new life stages (starting university, pregnancy, new caring duties). Ask how often reviews happen, how to request an early review, and what counts as an urgent clinical need versus a comfort preference.",
      },
      {
        type: "h2",
        text: "Repairs and breakdowns",
      },
      {
        type: "ul",
        items: [
          "Clarify the out-of-hours number and whether weekend call-outs exist for powered chairs.",
          "Know whether batteries, tyres, or electronics are in-warranty and average turnaround for parts.",
          "If you rely on the chair for all mobility, ask about loan chairs while yours is in workshop.",
        ],
      },
      {
        type: "h2",
        text: "If something goes wrong with the process",
      },
      {
        type: "p",
        text: "Start with the service’s complaints or patient experience route, then the integrated care board’s complaints process if needed. The Patient Advice and Liaison Service (PALS) can help you understand local pathways. For discrimination in health services, the Equality Advisory Support Service (EASS) can signpost. This is not a substitute for legal advice in complex cases.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Local policies differ. Always confirm details with your wheelchair service and keep written records of what was agreed at assessment.",
      },
    ],
  },
  {
    slug: "home-equipment-and-adaptations",
    title: "Home equipment and adaptations: start with the task",
    categorySlug: "equipment",
    updated: "2026-05-07",
    tags: ["Home", "OT", "DFG", "Adaptations", "Social care"],
    sections: [
      { type: "h2", text: "Name the task before you buy the gadget" },
      {
        type: "p",
        text: "Equipment works when it solves a specific failure point: getting onto the toilet safely, turning in the bathroom, reaching the cooker controls, or transferring without two people hauling. If the task is unclear, you risk an expensive rail in the wrong place or a shower chair that does not clear the door.",
      },
      {
        type: "h2",
        text: "Occupational therapy: when it is worth it",
      },
      {
        type: "ul",
        items: [
          "Falls, balance change, or rapid deterioration in mobility.",
          "Cognitive or sensory change that affects safe sequencing (e.g. steps after stroke).",
          "Children or young people where growth and posture change the plan every year or two.",
          "Any setup involving hoists, through-floor lifts, or major bathroom redesign.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Small aids vs major adaptations",
        body: "Grab rails, perching stools, kettle tippers, and key safes are smaller interventions. Level-access showers, stairlifts, widening doorways, or extensions are major works—often needing planning, structural checks, and funding conversations.",
      },
      {
        type: "h2",
        text: "Disabled Facilities Grants (DFGs): the headline facts",
      },
      {
        type: "p",
        text: "In England, a DFG is means-tested for adults (not for children’s applications in the same way) and is capped by statute with regional administration details published by your council. You normally need an OT assessment that confirms the adaptation is necessary and appropriate. Start early—quotes, approvals, and contractor availability add months.",
      },
      {
        type: "p",
        text: "Wales, Scotland, and Northern Ireland use different grant names and rules. Always use your local authority’s housing adaptations team for accurate thresholds and forms.",
      },
      {
        type: "h2",
        text: "Social care equipment",
      },
      {
        type: "p",
        text: "Local authorities may provide equipment on loan after a needs assessment. Understand whether items are returnable, who maintains them, and what happens if your condition changes. Private purchases may still be the fastest route for low-cost items—but check VAT relief on qualifying disability equipment and eligibility criteria on gov.uk before assuming savings.",
      },
      {
        type: "h2",
        text: "Supplier and installer checks",
      },
      {
        type: "ul",
        items: [
          "Ask for itemised quotes and warranty terms for baths, lifts, and stairlifts.",
          "Check contractor reviews, insurance, and whether they routinely work with OT specifications.",
          "Plan cleaning access and future servicing—for example stairlift annual checks.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Building regulations, landlord consent, and leaseholder permissions may apply. This guide is not legal or financial advice—verify grants and permissions with your council and landlord.",
      },
    ],
  },
  {
    slug: "pressure-care-basics",
    title: "Pressure care basics for wheelchair users",
    categorySlug: "equipment",
    updated: "2026-05-07",
    tags: ["Pressure care", "Skin", "Posture", "Cushion", "Clinical"],
    sections: [
      { type: "h2", text: "Why pressure injuries happen" },
      {
        type: "p",
        text: "Tissue is damaged when pressure, shear, and moisture combine over time. Wheelchair users often load weight through a small seat surface. Reduced sensation, poor nutrition, incontinence, spasms, or repeated micro-slides on transfers increase risk. Prevention is cheaper and kinder than wound management.",
      },
      {
        type: "h2",
        text: "Daily skin checks you can actually sustain",
      },
      {
        type: "ul",
        items: [
          "Use a mirror or phone camera for areas you cannot see, or ask a trusted person with clear privacy boundaries.",
          "Look for persistent redness that does not fade after pressure relief, warmth, broken skin, or blisters.",
          "Note creases in clothing, badly fitted belts, or seams that press on one spot.",
        ],
      },
      {
        type: "h2",
        text: "Cushion choice is clinical, not retail",
      },
      {
        type: "p",
        text: "Foam, gel, air-filled, and hybrid cushions distribute load differently. The right cushion depends on posture, weight, shape after amputation, pelvic obliquity, and duration of sitting. An expensive cushion with wrong positioning still fails. Make sure the cushion matches the chair’s sling dimensions and that inflation (for air cells) is maintained to specification.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pressure relief that fits real life",
        body: "If a relief schedule is impossible to follow, the plan is wrong. Build relief into natural breaks: drinks, toilet, clothing adjustments, or repositioning before pain spikes. Powered tilt/recline can help when arms cannot push—but clinical setup still matters.",
      },
      {
        type: "h2",
        text: "Posture, transfers, and moisture",
      },
      {
        type: "ul",
        items: [
          "Avoid dragging across surfaces—shear damages deep tissue even when skin looks fine at first.",
          "Manage incontinence promptly; moisture macerates skin and raises infection risk.",
          "Review footrest height and calf support—pressure can concentrate under thighs or ischial tuberosities.",
        ],
      },
      {
        type: "h2",
        text: "Nutrition, hydration, and medication",
      },
      {
        type: "p",
        text: "Healing requires protein and adequate fluid intake. Some medications reduce sensation or make skin fragile. If appetite is poor or swelling changes leg volume, seating needs review. Dietetic input can be appropriate alongside tissue viability nursing.",
      },
      {
        type: "h2",
        text: "When to seek urgent help",
      },
      {
        type: "p",
        text: "Deep tissue injuries can escalate quickly. Seek urgent advice for black or necrotic tissue, spreading redness, fever, malodour, rapidly enlarging broken areas, or systemic illness signs. NHS 111 or your GP can triage; specialist tissue viability services exist in many areas.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "This is education, not personalised medical advice. Always follow your clinician’s pressure-care plan and seek urgent review if skin breaks down.",
      },
    ],
  },
  {
    slug: "assistive-tech-at-home",
    title: "Assistive tech at home: useful, low-fuss options",
    categorySlug: "equipment",
    updated: "2026-05-07",
    tags: ["Technology", "Independence", "Smart home", "Accessibility"],
    sections: [
      { type: "h2", text: "Pick one friction point, solve it well" },
      {
        type: "p",
        text: "Smarthome overload is real: ten apps and three hubs create more admin than they remove. Choose one repeated problem—turning off lights at night, knowing someone is at the door, remembering medication, or reading notifications aloud—and prove the fix for two weeks before expanding.",
      },
      {
        type: "h2",
        text: "Built-in accessibility first",
      },
      {
        type: "ul",
        items: [
          "iOS and Android screen readers, magnification, colour filters, switch control, and voice typing.",
          "Captioning for calls, live transcription apps for conversations in noisy rooms.",
          "Consistent placement of chargers so devices are not flat when you need them.",
        ],
      },
      {
        type: "h2",
        text: "Low-cost hardware that often helps",
      },
      {
        type: "ul",
        items: [
          "Smart plugs or bulbs with physical buttons as backup if Wi-Fi fails.",
          "Video doorbells with two-way talk—check wiring and subscription costs first.",
          "Simple medication organisers plus vibrating timers if cognitive load is high.",
          "Bluetooth trackers for keys or mobility aids that wander.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Privacy and trust boundaries",
        body: "Cameras and microphones in bedrooms or bathrooms are sensitive. Agree who can view feeds, use privacy shutters, and prefer local processing where possible. Read device privacy policies if carers share accounts.",
      },
      {
        type: "h2",
        text: "Environmental control systems",
      },
      {
        type: "p",
        text: "Some people need integrated environmental controls (doors, curtains, bed positions, intercoms). These may be funded through health, social care, or charitable routes depending on assessment. Specialist suppliers should train everyone who lives with you, including backup plans for power cuts.",
      },
      {
        type: "h2",
        text: "Fallbacks when tech fails",
      },
      {
        type: "ul",
        items: [
          "Battery-powered lamps if smart lighting breaks.",
          "Written emergency numbers if voice assistants mis-hear.",
          "Mechanical keys alongside electronic locks where fire safety allows.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Tech cannot replace human safeguards for breathing difficulty, falls with head injury, or abusive situations. Keep emergency routes appropriate to your risk level.",
      },
    ],
  },
  {
    slug: "mobility-aids-before-you-buy",
    title: "Mobility aids: questions before buying privately",
    categorySlug: "equipment",
    updated: "2026-05-07",
    tags: ["Mobility aids", "Rollators", "Scooters", "Safety", "VAT"],
    sections: [
      { type: "h2", text: "Match the aid to the problem" },
      {
        type: "p",
        text: "A walking stick suits directional balance cues; a rollator suits needing seated rests and basket transport; a scooter suits longer distances if posture, cognition, and storage fit. Using the wrong tier can increase falls—especially if upper limb strength is overestimated or braking on slopes is untested.",
      },
      {
        type: "h2",
        text: "Measurements and environment checks",
      },
      {
        type: "ul",
        items: [
          "Handle height: elbows slightly bent when standing tall—adjustable frames matter if swelling varies.",
          "Width: will it turn in your hallway, lift, or corner shop aisles you use weekly?",
          "Weight: can you lift it into a car boot if that is part of the plan?",
          "Brakes: cable stretch, wet grip on tyres, and parking brakes on slopes.",
        ],
      },
      {
        type: "h2",
        text: "Try before you buy",
      },
      {
        type: "p",
        text: "Many mobility shops offer showroom trials. Ask for a short outdoor route if pavements are uneven locally. For scooters, check kerb climbing ability, battery range on cold days, and whether your wrists can manage controls after an hour.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Professional input pays off",
        body: "If you have frequent falls, unpredictable balance, chest pain on exertion, or complex neurology, ask your GP or physiotherapist before spending hundreds privately. Some areas run falls clinics or loan schemes.",
      },
      {
        type: "h2",
        text: "VAT relief (UK products for disability)",
      },
      {
        type: "p",
        text: "Certain aids qualify for zero VAT when supplied for personal use by a disabled person meeting statutory definitions—verify eligibility on gov.uk and with the retailer at purchase. Keep paperwork if HMRC ever asks. VAT rules differ for hire, upgrades, and accessories.",
      },
      {
        type: "h2",
        text: "Returns, warranties, and insurance",
      },
      {
        type: "ul",
        items: [
          "Ask the cooling-off period for distance purchases and restocking fees if sizing is wrong.",
          "Check warranty length on motors, batteries, and frames.",
          "Home contents insurance may need notifying for high-value scooters stored outdoors.",
        ],
      },
      {
        type: "h2",
        text: "Public space and legal basics",
      },
      {
        type: "p",
        text: "Class 2 and Class 3 invalid carriages have different rules on pavements and roads. Insurance is not always mandatory but can be sensible. Visibility aids, lights, and reflective elements matter in winter. Always follow manufacturer limits on gradients and weight.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Important",
        body: "Using an unsuitable aid can injure you or others. This guide is not medical advice—seek assessment if you are unsure.",
      },
    ],
  },
];
