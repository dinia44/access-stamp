import type { GuideOfficialLink } from "@/lib/guide-content/types";

/** Official links for guides that do not embed them in article sections. */
export const GUIDE_OFFICIAL_LINKS_BY_SLUG: Record<string, GuideOfficialLink[]> = {
  "equality-act": [
    { label: "Equality Act 2010 section 20", href: "https://www.legislation.gov.uk/ukpga/2010/15/section/20" },
    { label: "EHRC — Your rights", href: "https://www.equalityhumanrights.com/guidance/your-rights" },
    { label: "GOV.UK — Disability rights", href: "https://www.gov.uk/rights-disabled-person" },
  ],
  "reasonable-adjustments": [
    { label: "GOV.UK — Reasonable adjustments for disabled workers", href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers" },
    { label: "Acas — Reasonable adjustments", href: "https://www.acas.org.uk/reasonable-adjustments" },
  ],
  "formal-complaints": [
    { label: "Citizens Advice — Making a complaint", href: "https://www.citizensadvice.org.uk/consumer/complaints-and-compensation/" },
    { label: "GOV.UK — Complain about a public service", href: "https://www.gov.uk/complain-about-public-service" },
  ],
  eass: [
    { label: "Equality Advisory and Support Service", href: "https://www.equalityadvisoryservice.com/" },
    { label: "EHRC — Contact us", href: "https://www.equalityhumanrights.com/contact-us" },
  ],
  advocacy: [
    { label: "NHS — Advocacy services", href: "https://www.nhs.uk/nhs-services/advocacy-services/" },
    { label: "Citizens Advice", href: "https://www.citizensadvice.org.uk/" },
  ],
  "public-services": [
    { label: "GOV.UK — Disability rights", href: "https://www.gov.uk/rights-disabled-person" },
    { label: "EHRC — Services and public functions", href: "https://www.equalityhumanrights.com/guidance/your-rights-services-public-functions" },
  ],
  "nhs-wheelchair-services": [
    { label: "NHS — Wheelchair services", href: "https://www.nhs.uk/conditions/wheelchair-services/" },
    { label: "NHS England — Wheelchair services", href: "https://www.england.nhs.uk/commissioning/spec-services/highly-spec-services/wheelchair-services/" },
  ],
  "nhs-wheelchair-services-equipment": [
    { label: "NHS — Wheelchair services", href: "https://www.nhs.uk/conditions/wheelchair-services/" },
    { label: "NHS England — Wheelchair services", href: "https://www.england.nhs.uk/commissioning/spec-services/highly-spec-services/wheelchair-services/" },
  ],
  "continuing-healthcare-chc": [
    { label: "NHS — Continuing healthcare", href: "https://www.nhs.uk/nhs-services/healthcare-for-people-with-disabilities/nhs-continuing-healthcare/" },
    { label: "NHS England — CHC", href: "https://www.england.nhs.uk/commissioning/health-just/continuing-healthcare/" },
  ],
  "gp-access": [
    { label: "NHS — Accessible information standard", href: "https://www.england.nhs.uk/ourwork/accessibleinfo/" },
    { label: "GOV.UK — Disability rights in health", href: "https://www.gov.uk/rights-disabled-person/health-rights" },
  ],
  "nhs-complaints": [
    { label: "NHS — How to complain", href: "https://www.nhs.uk/nhs-services/hospitals/how-to-complain/" },
    { label: "Parliamentary and Health Service Ombudsman", href: "https://www.ombudsman.org.uk/" },
  ],
  "mental-health-crisis": [
    { label: "NHS — Urgent mental health help", href: "https://www.nhs.uk/nhs-services/mental-health-services/get-urgent-help-for-mental-health/" },
    { label: "Samaritans", href: "https://www.samaritans.org/" },
  ],
  "attendance-allowance": [
    { label: "GOV.UK — Attendance Allowance", href: "https://www.gov.uk/attendance-allowance" },
  ],
  "carers-allowance": [
    { label: "GOV.UK — Carer's Allowance", href: "https://www.gov.uk/carers-allowance" },
  ],
  "council-tax-disability-reduction": [
    { label: "GOV.UK — Council Tax disabled band reduction", href: "https://www.gov.uk/apply-for-council-tax-reduction/disabled-person-reduction" },
  ],
  "prescription-exemptions": [
    { label: "NHS — Who can get free prescriptions", href: "https://www.nhs.uk/nhs-services/prescriptions-and-pharmacies/who-can-get-free-prescriptions/" },
  ],
  "council-housing-priority": [
    { label: "GOV.UK — Apply for council housing", href: "https://www.gov.uk/apply-for-council-housing" },
  ],
  "adapting-a-rented-property": [
    { label: "GOV.UK — Disabled Facilities Grants", href: "https://www.gov.uk/disabled-facilities-grants" },
    { label: "GOV.UK — Renting with a disability", href: "https://www.gov.uk/private-renting" },
  ],
  "equipment-through-social-services": [
    { label: "GOV.UK — Equipment and home adaptations", href: "https://www.gov.uk/equipment-home-adaptations" },
    { label: "GOV.UK — Needs assessment", href: "https://www.gov.uk/apply-needs-assessment-social-services" },
  ],
  dfg: [
    { label: "GOV.UK — Disabled Facilities Grants", href: "https://www.gov.uk/disabled-facilities-grants" },
  ],
  "trains-and-passenger-assistance": [
    { label: "National Rail — Passenger Assist", href: "https://www.nationalrail.co.uk/help-and-assistance/passenger-assist/" },
    { label: "National Rail — Passenger Assistance app", href: "https://www.nationalrail.co.uk/help-and-assistance/passenger-assistance-app/" },
  ],
  "buses-and-local-access": [
    { label: "GOV.UK — Bus and coach accessibility", href: "https://www.gov.uk/transport-disabled/buses-and-coaches" },
  ],
  "taxis-and-private-hire-wheelchairs": [
    { label: "GOV.UK — Taxi and minicab accessibility", href: "https://www.gov.uk/transport-disabled/taxis-and-minicabs" },
  ],
  "flying-with-a-wheelchair-uk": [
    { label: "CAA — Your accessibility rights", href: "https://www.caa.co.uk/air-passengers/assisted-travel/your-accessibility-rights/" },
    { label: "GOV.UK — Transport support (planes)", href: "https://www.gov.uk/transport-disabled/planes" },
  ],
  "mobility-scooters-on-buses-and-trains": [
    { label: "GOV.UK — Transport disabled (buses and coaches)", href: "https://www.gov.uk/transport-disabled/buses-and-coaches" },
  ],
  "choosing-a-wheelchair": [
    { label: "NHS — Wheelchair services", href: "https://www.nhs.uk/conditions/wheelchair-services/" },
  ],
  "home-equipment-and-adaptations": [
    { label: "GOV.UK — Equipment and home adaptations", href: "https://www.gov.uk/equipment-home-adaptations" },
  ],
  "pressure-care-basics": [
    { label: "NHS — Pressure ulcers", href: "https://www.nhs.uk/conditions/pressure-sores/" },
  ],
  "access-to-work-basics": [
    { label: "GOV.UK — Access to Work", href: "https://www.gov.uk/access-to-work" },
    { label: "GOV.UK — Apply for Access to Work", href: "https://www.gov.uk/access-to-work/apply" },
  ],
  "reasonable-adjustments-you-can-ask-for": [
    { label: "GOV.UK — Reasonable adjustments for disabled workers", href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers" },
    { label: "Acas — Reasonable adjustments", href: "https://www.acas.org.uk/reasonable-adjustments" },
  ],
  "disability-discrimination-and-grievances": [
    { label: "Acas — Discrimination at work", href: "https://www.acas.org.uk/discrimination-and-bullying" },
    { label: "Equality Act 2010 section 20", href: "https://www.legislation.gov.uk/ukpga/2010/15/section/20" },
  ],
  "returning-to-work-after-disability": [
    { label: "Acas — Returning to work", href: "https://www.acas.org.uk/absence-from-work" },
    { label: "GOV.UK — Reasonable adjustments for disabled workers", href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers" },
  ],
  "flexible-working-and-health": [
    { label: "GOV.UK — Flexible working", href: "https://www.gov.uk/flexible-working" },
    { label: "Acas — Flexible working requests", href: "https://www.acas.org.uk/flexible-working" },
  ],
  "occupational-health-and-workplace-assessments": [
    { label: "Acas — Occupational health", href: "https://www.acas.org.uk/occupational-health" },
    { label: "GOV.UK — Reasonable adjustments for disabled workers", href: "https://www.gov.uk/reasonable-adjustments-for-disabled-workers" },
  ],
  "workplace-meeting-script-and-email-template": [
    { label: "Acas — Asking for reasonable adjustments", href: "https://www.acas.org.uk/reasonable-adjustments/asking-for-reasonable-adjustments" },
  ],
  "probation-disability-disclosure-and-risk": [
    { label: "Acas — Reasonable adjustments", href: "https://www.acas.org.uk/reasonable-adjustments" },
    { label: "GOV.UK — Disability rights at work", href: "https://www.gov.uk/rights-disabled-person/employment-rights" },
  ],
  "dsa-disabled-students-allowance": [
    { label: "GOV.UK — Disabled Students' Allowance", href: "https://www.gov.uk/disabled-students-allowance-dsa" },
    { label: "GOV.UK — Disabled students prepared for university", href: "https://www.gov.uk/guidance/getting-disabled-students-prepared-for-university-or-college" },
  ],
  "ehc-plan-basics": [
    { label: "GOV.UK — Children with SEND", href: "https://www.gov.uk/children-with-special-educational-needs" },
    { label: "IPSEA — EHC plans", href: "https://www.ipsea.org.uk/pages/category/ehc-plans" },
  ],
  "reasonable-adjustments-at-school": [
    { label: "GOV.UK — Extra SEN help", href: "https://www.gov.uk/children-with-special-educational-needs/extra-SEN-help" },
    { label: "GOV.UK — Education rights", href: "https://www.gov.uk/rights-disabled-person/education-rights" },
  ],
  "university-support-plan": [
    { label: "GOV.UK — Disabled students prepared for university", href: "https://www.gov.uk/guidance/getting-disabled-students-prepared-for-university-or-college" },
    { label: "GOV.UK — Disabled Students' Allowance", href: "https://www.gov.uk/disabled-students-allowance-dsa" },
  ],
  "exam-access-arrangements": [
    { label: "JCQ — Access arrangements", href: "https://www.jcq.org.uk/exams-office/access-arrangements-and-special-consideration/" },
    { label: "GOV.UK — Education rights", href: "https://www.gov.uk/rights-disabled-person/education-rights" },
  ],
  "transport-to-education": [
    { label: "GOV.UK — Transport to school for disabled children", href: "https://www.gov.uk/transport-to-school/college-or-work" },
  ],
  "personal-budgets-and-direct-payments": [
    { label: "GOV.UK — Direct payments", href: "https://www.gov.uk/direct-payments" },
    { label: "GOV.UK — Care and support planning", href: "https://www.gov.uk/care-and-support-planning" },
  ],
  "employing-a-personal-assistant-basics": [
    { label: "GOV.UK — Direct payments", href: "https://www.gov.uk/direct-payments" },
    { label: "Skills for Care — Employing PAs", href: "https://www.skillsforcare.org.uk/Resources/Employing-personal-assistants" },
  ],
  "care-act-assessments-and-eligibility": [
    { label: "GOV.UK — Needs assessment", href: "https://www.gov.uk/apply-needs-assessment-social-services" },
    { label: "NHS — Getting a needs assessment", href: "https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/" },
  ],
  "when-care-plans-break-down": [
    { label: "GOV.UK — Complain about social care", href: "https://www.gov.uk/complain-about-social-care" },
    { label: "Local Government and Social Care Ombudsman", href: "https://www.lgo.org.uk/" },
  ],
  "respite-carer-breaks-and-funded-support": [
    { label: "GOV.UK — Carer's breaks and respite care", href: "https://www.gov.uk/carers-breaks-and-respite-care" },
    { label: "GOV.UK — Carer's assessment", href: "https://www.gov.uk/carers-assessment" },
  ],
  "advocacy-social-care-complaints-and-ombudsman": [
    { label: "GOV.UK — Complain about social care", href: "https://www.gov.uk/complain-about-social-care" },
    { label: "Local Government and Social Care Ombudsman", href: "https://www.lgo.org.uk/" },
  ],
  "continuity-when-agency-or-worker-changes": [
    { label: "GOV.UK — Care and support planning", href: "https://www.gov.uk/care-and-support-planning" },
  ],
  "informal-carers-assessment-and-support": [
    { label: "GOV.UK — Carer's assessment", href: "https://www.gov.uk/carers-assessment" },
    { label: "Carers UK", href: "https://www.carersuk.org/" },
  ],
  "blue-badge": [
    { label: "GOV.UK — Apply or renew a Blue Badge", href: "https://www.gov.uk/apply-blue-badge" },
    { label: "GOV.UK — Who can get a Blue Badge", href: "https://www.gov.uk/government/publications/blue-badge-can-i-get-one" },
  ],
  motability: [
    { label: "Motability Scheme", href: "https://www.motability.co.uk/" },
    { label: "GOV.UK — Motability and benefits", href: "https://www.gov.uk/motability-scheme" },
  ],
  "vehicle-tax-exemption": [
    { label: "GOV.UK — Vehicle tax exemption (disability)", href: "https://www.gov.uk/get-vehicle-tax-exemption-disability" },
  ],
  "parking-rights": [
    { label: "GOV.UK — Blue Badge parking rules", href: "https://www.gov.uk/blue-badge-scheme-parking-rules" },
  ],
  wavs: [
    { label: "Motability — Wheelchair Accessible Vehicles", href: "https://www.motability.co.uk/find-a-vehicle/wavs/" },
    { label: "GOV.UK — Motability scheme", href: "https://www.gov.uk/motability-scheme" },
  ],
  "licence-conditions": [
    { label: "GOV.UK — Driving with a disability", href: "https://www.gov.uk/driving-disability" },
    { label: "DVLA — Medical conditions", href: "https://www.gov.uk/driving-medical-conditions" },
  ],
  "driving-adaptations-products-library": [
    { label: "GOV.UK — Driving with a disability", href: "https://www.gov.uk/driving-disability" },
    { label: "Rica — Adaptations and vehicles", href: "https://www.rica.org.uk/" },
  ],
  "leisure-centre-and-gym-access": [
    { label: "Activity Alliance — Gyms and leisure", href: "https://www.activityalliance.org.uk/" },
    { label: "EHRC — Services and public functions", href: "https://www.equalityhumanrights.com/guidance/your-rights-services-public-functions" },
  ],
  "adaptive-sport-and-local-clubs": [
    { label: "Activity Alliance", href: "https://www.activityalliance.org.uk/" },
    { label: "Parasport — Find a club", href: "https://www.parasport.org.uk/" },
  ],
  "swimming-pools-changing-places-and-access": [
    { label: "Changing Places — Find a toilet", href: "https://www.changing-places.org/find" },
    { label: "Swim England — Accessible swimming", href: "https://www.swimming.org/swimengland/" },
  ],
  "grassroots-sport-and-equality": [
    { label: "Activity Alliance", href: "https://www.activityalliance.org.uk/" },
    { label: "Equality Act 2010 section 20", href: "https://www.legislation.gov.uk/ukpga/2010/15/section/20" },
  ],
  "booking-accessible-accommodation": [
    { label: "EHRC — Services and public functions", href: "https://www.equalityhumanrights.com/guidance/your-rights-services-public-functions" },
  ],
  "travel-insurance-and-medical-equipment": [
    { label: "GOV.UK — Travel disabled", href: "https://www.gov.uk/transport-disabled" },
    { label: "FCDO — Travel insurance", href: "https://www.gov.uk/guidance/foreign-travel-insurance" },
  ],
  "airports-batteries-and-spare-parts": [
    { label: "CAA — Your accessibility rights", href: "https://www.caa.co.uk/air-passengers/assisted-travel/your-accessibility-rights/" },
    { label: "GOV.UK — Transport support (planes)", href: "https://www.gov.uk/transport-disabled/planes" },
  ],
  "ferries-and-coaches-access": [
    { label: "GOV.UK — Transport disabled (buses and coaches)", href: "https://www.gov.uk/transport-disabled/buses-and-coaches" },
  ],
  "pip-in-plain-english": [
    { label: "GOV.UK — Personal Independence Payment", href: "https://www.gov.uk/pip" },
    { label: "GOV.UK — How to claim PIP", href: "https://www.gov.uk/pip/how-to-claim" },
  ],
  "wheelchair-breakdown-what-to-do": [
    { label: "NHS — Wheelchair services", href: "https://www.nhs.uk/conditions/wheelchair-services/" },
  ],
  "urgent-mental-health-support-uk": [
    { label: "NHS — Urgent mental health help", href: "https://www.nhs.uk/nhs-services/mental-health-services/get-urgent-help-for-mental-health/" },
    { label: "Samaritans", href: "https://www.samaritans.org/" },
  ],
  "nhs-111-and-999-how-to-choose": [
    { label: "NHS 111", href: "https://111.nhs.uk/" },
    { label: "NHS — When to call 999", href: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-call-999/" },
  ],
  "helplines-text-lines-you-can-use-today": [
    { label: "Samaritans — 116 123", href: "https://www.samaritans.org/" },
    { label: "Shout — Text 85258", href: "https://giveusashout.org/" },
  ],
  "power-cuts-and-medical-equipment-plan-b": [
    { label: "GOV.UK — Priority Services Register", href: "https://www.gov.uk/priority-services-register" },
  ],
};

export const GUIDE_RELATED_LINKS_BY_SLUG: Record<string, Array<{ label: string; href: string }>> = {
  "reasonable-adjustments": [
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
  ],
  "access-to-work-basics": [
    { label: "Access to Work: What You Can Ask For and How to Apply", href: "/advice/access-to-work" },
  ],
  "access-to-work-application-walkthrough": [
    { label: "Access to Work: What You Can Ask For and How to Apply", href: "/advice/access-to-work" },
  ],
  "access-to-work-what-employer-pays-vs-grant": [
    { label: "Access to Work: What You Can Ask For and How to Apply", href: "/advice/access-to-work" },
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
  ],
  "trains-and-passenger-assistance": [
    { label: "How to Book Train Assistance with Passenger Assist", href: "/advice/book-train-assistance-passenger-assist" },
  ],
  dfg: [
    { label: "Disabled Facilities Grant: home adaptations", href: "/advice/disabled-facilities-grant-home-adaptations" },
  ],
  "attendance-allowance": [
    { label: "Attendance Allowance application guide", href: "/advice/attendance-allowance-application-guide" },
  ],
  "uc-lcwra": [
    { label: "Universal Credit LCWRA guide", href: "/advice/universal-credit-lcwra-work-capability" },
  ],
  "continuing-healthcare-chc": [
    { label: "NHS Continuing Healthcare screening guide", href: "/advice/nhs-continuing-healthcare-chc-screening" },
  ],
  "nhs-wheelchair-services": [
    { label: "NHS wheelchair services (equipment hub)", href: "/advice/nhs-wheelchair-services-equipment" },
  ],
  "reasonable-adjustments-you-can-ask-for": [
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
    { label: "Workplace adjustment meeting script", href: "/advice/workplace-meeting-script-and-email-template" },
  ],
  "workplace-meeting-script-and-email-template": [
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
  ],
  "disability-discrimination-and-grievances": [
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
  ],
  "returning-to-work-after-disability": [
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
    { label: "Access to Work guide", href: "/advice/access-to-work" },
  ],
  "flexible-working-and-health": [
    { label: "Reasonable adjustments at work: your rights", href: "/advice/reasonable-adjustments-at-work" },
  ],
  "ehc-plan-basics": [
    { label: "How to request an EHC needs assessment", href: "/advice/request-ehcp-needs-assessment" },
    { label: "School reasonable adjustments: a parent's guide", href: "/advice/school-reasonable-adjustments" },
  ],
  "reasonable-adjustments-at-school": [
    { label: "School reasonable adjustments: a parent's guide", href: "/advice/school-reasonable-adjustments" },
  ],
  "request-ehcp-needs-assessment": [
    { label: "EHC plan basics", href: "/advice/ehc-plan-basics" },
  ],
  "university-support-plan": [
    { label: "Disabled Students' Allowance guide", href: "/advice/dsa-disabled-students-allowance" },
  ],
  "dsa-disabled-students-allowance": [
    { label: "University support plans", href: "/advice/university-support-plan" },
  ],
  "care-act-assessments-and-eligibility": [
    { label: "Care needs assessment: ask social services", href: "/advice/care-needs-assessment-social-services" },
  ],
  "personal-budgets-and-direct-payments": [
    { label: "Employing a personal assistant", href: "/advice/employing-a-personal-assistant-basics" },
    { label: "Care needs assessment guide", href: "/advice/care-needs-assessment-social-services" },
  ],
  "employing-a-personal-assistant-basics": [
    { label: "Personal budgets and direct payments", href: "/advice/personal-budgets-and-direct-payments" },
    { label: "When care plans break down", href: "/advice/when-care-plans-break-down" },
  ],
  "when-care-plans-break-down": [
    { label: "Care needs assessment guide", href: "/advice/care-needs-assessment-social-services" },
    { label: "Advocacy and social care complaints", href: "/advice/advocacy-social-care-complaints-and-ombudsman" },
  ],
  "respite-carer-breaks-and-funded-support": [
    { label: "Carer's assessment request guide", href: "/advice/carers-assessment-request-guide" },
    { label: "Care needs assessment guide", href: "/advice/care-needs-assessment-social-services" },
  ],
  "informal-carers-assessment-and-support": [
    { label: "Carer's assessment request guide", href: "/advice/carers-assessment-request-guide" },
  ],
  "continuity-when-agency-or-worker-changes": [
    { label: "When care plans break down", href: "/advice/when-care-plans-break-down" },
  ],
  "blue-badge": [
    { label: "Blue Badge application and renewal guide", href: "/advice/blue-badge-application-renewal" },
  ],
  "pip-in-plain-english": [
    { label: "PIP renewal form guide", href: "/advice/pip-renewal-form-what-to-write" },
    { label: "PIP mandatory reconsideration", href: "/advice/pip-mandatory-reconsideration" },
    { label: "PIP tribunal appeals", href: "/advice/pip-tribunal-appeal-guide" },
  ],
  "first-30-days-disabled": [
    { label: "PIP in plain English", href: "/advice/pip-in-plain-english" },
    { label: "Paperwork when you are newly disabled", href: "/advice/newly-disabled-paperwork" },
  ],
  "newly-disabled-paperwork": [
    { label: "First 30 days route map", href: "/advice/first-30-days-disabled" },
    { label: "Talking to services", href: "/advice/talking-to-services" },
  ],
  "flying-with-a-wheelchair-uk": [
    { label: "Airports, batteries and spare parts (travel hub)", href: "/advice/airports-batteries-and-spare-parts" },
  ],
  "airports-batteries-and-spare-parts": [
    { label: "Flying with a wheelchair (transport guide)", href: "/advice/flying-with-a-wheelchair-uk" },
  ],
  "booking-accessible-accommodation": [
    { label: "Travel insurance and medical equipment", href: "/advice/travel-insurance-and-medical-equipment" },
  ],
  "urgent-mental-health-support-uk": [
    { label: "Mental health crisis routes (rights hub)", href: "/advice/mental-health-crisis" },
  ],
  "wheelchair-breakdown-what-to-do": [
    { label: "NHS wheelchair services", href: "/advice/nhs-wheelchair-services-equipment" },
    { label: "Choosing a wheelchair", href: "/advice/choosing-a-wheelchair" },
  ],
  motability: [
    { label: "Blue Badge guide", href: "/advice/blue-badge" },
    { label: "Driving adaptations library", href: "/advice/driving-adaptations-products-library" },
  ],
};
