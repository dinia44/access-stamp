import { SCORE_METHODOLOGY_VERSION } from "@/lib/venue-score";

export type MethodologySection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  note?: string;
};

export const METHODOLOGY_VERSION = SCORE_METHODOLOGY_VERSION;
export const METHODOLOGY_REVIEWED = "September 2026";

export const METHODOLOGY_SECTIONS: MethodologySection[] = [
  {
    id: "purpose-scope",
    title: "Purpose and scope",
    body: "Access Stamp records practical venue access information for disabled people, families, carers, and venue teams in the United Kingdom. This methodology explains how information is collected, labelled, reviewed, corrected, and expired.",
    bullets: [
      "Physical venue access — entrances, routes, toilets, parking, seating, sensory factors, and staff support.",
      "Confidence and verification — what we know, what we do not know, and how strong the evidence is.",
      "Not in scope — medical advice, legal entitlement decisions, or guarantees that a venue suits every person.",
    ],
  },
  {
    id: "what-we-record",
    title: "Venue information categories",
    body: "We aim to capture details that help someone decide whether a place may work before they travel.",
    bullets: [
      "Entrance and approach — steps, ramps, doors, distances, and drop-off.",
      "Internal routes — turning space, lifts, seating layout, and obstacles.",
      "Toilets — accessible toilet, transfer space, Changing Places where known.",
      "Parking and arrival — Blue Badge bays, distance, and surface.",
      "Sensory and communication — noise, lighting, hearing loops where recorded.",
      "Staff support and emergencies — what has been observed or confirmed.",
      "Known unknowns — features not yet confirmed.",
    ],
  },
  {
    id: "verification-levels",
    title: "Verification levels",
    body: "Every listing carries exactly one public verification label.",
    bullets: [
      "Demo — example data, not a recommendation or live venue information.",
      "Submitted / not independently verified — supplied information that still needs independent checking.",
      "Reviewed remotely — reviewed using available evidence without an on-site visit.",
      "On-site verified — measured on site with a complete review record (see below).",
    ],
  },
  {
    id: "onsite-audited",
    title: "On-site verified standard",
    body: "We only use the on-site verified label when all of the following exist in our audit record:",
    bullets: [
      "Audit date and auditor identity",
      "Audit report ID and report version",
      "Evidence records and measurement records",
      "Recheck or expiry date",
    ],
  },
  {
    id: "evidence-standards",
    title: "Evidence standards",
    body: "Evidence is linked to specific features — not added as decorative proof.",
    bullets: [
      "Measurements — doorway widths, turning circles, distances where measured.",
      "Photographs — entrances, routes, toilets; faces and plates avoided in publication.",
      "Venue statements — attributed and dated where used.",
      "Community submissions — treated as leads until reviewed.",
      "Public sources — council listings, operator pages; dated when retrieved.",
    ],
  },
  {
    id: "measurement-standards",
    title: "Measurement standards",
    body: "On-site measurements use consistent methods and are recorded with date and method.",
    bullets: [
      "Door clear opening width in centimetres at narrowest practical point.",
      "Turning space where safely observable.",
      "Route gradients and steps counted where relevant.",
      "Measurements are not a substitute for personal equipment checks.",
    ],
  },
  {
    id: "scoring-categories",
    title: "No single access score",
    body: "A universal score cannot tell you whether a venue meets your needs. We show evidence and unknowns so you can compare the details that matter to you.",
    bullets: [
      "Evidence completeness — how much useful information is available, including known limitations.",
      "Verification strength — whether the source is submitted, reviewed remotely, or checked on site.",
      "Evidence recency — when the information was checked or updated.",
      "Personal fit — compare the available details with your stated access requirements.",
    ],
    note: `Methodology version ${METHODOLOGY_VERSION}.`,
  },
  {
    id: "unknown-treatment",
    title: "Unknown-information treatment",
    body: "Unknown means there is not enough evidence; it does not mean a feature is unavailable. We show unknowns explicitly so you know what to check.",
    bullets: [
      "Unknown features are listed as known unknowns on venue pages.",
      "Demo listings use example data and cannot establish personal suitability.",
      "Low evidence coverage reduces confidence labels.",
    ],
  },
  {
    id: "confidence-calculation",
    title: "Confidence calculation",
    body: "Confidence (High, Medium, Low) reflects evidence completeness, recency, and verification level — not whether a venue is 'good' or 'bad'.",
  },
  {
    id: "auditor-requirements",
    title: "Who may perform an audit",
    body: "On-site audits are carried out by trained Access Stamp assessors following this methodology. Assessors must declare conflicts of interest where relevant.",
  },
  {
    id: "photo-requirements",
    title: "Photo requirements",
    body: "Published photos focus on routes, doors, toilets, and signage — not identifiable people, vehicle registration plates, or private documents.",
  },
  {
    id: "quality-assurance",
    title: "Quality assurance",
    body: "Desk review and on-site reports are checked for internal consistency before publication. Contradictions are resolved or marked as unknown.",
  },
  {
    id: "venue-corrections",
    title: "Venue corrections",
    body: "Venue owners and visitors can suggest corrections. See our corrections route for how to submit updates and evidence.",
  },
  {
    id: "community-reports",
    title: "Community reports",
    body: "Community submissions help us find gaps but are not published as on-site audited information until reviewed.",
  },
  {
    id: "reinspection-expiry",
    title: "Reinspection and expiry",
    body: "On-site audited listings include a recheck or expiry date. After expiry, the label may be downgraded until reinspection.",
  },
  {
    id: "complaints",
    title: "Complaints",
    body: "Venues and visitors can complain about listings, methodology application, or review processes. See our complaints page for what can be raised and expected response times.",
  },
  {
    id: "appeals",
    title: "Appeals",
    body: "Venues may appeal review outcomes where a formal review record exists. Appeals are handled separately from general corrections and require the report ID and date of the original review.",
  },
  {
    id: "version-history",
    title: "Methodology version history",
    body: "We publish methodology version changes when evidence or verification rules change materially.",
    bullets: [`${METHODOLOGY_VERSION} — September 2026: four public verification labels, source-aware measurement wording, and removal of universal access scores.`],
  },
  {
    id: "limitations",
    title: "Limitations",
    body: "Access needs vary. Layouts change. A report is a snapshot — always confirm details that matter for your visit.",
  },
];
