import { SCORE_METHODOLOGY_VERSION } from "@/lib/venue-score";

export type MethodologySection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  note?: string;
};

export const METHODOLOGY_VERSION = SCORE_METHODOLOGY_VERSION;
export const METHODOLOGY_REVIEWED = "June 2026";

export const METHODOLOGY_SECTIONS: MethodologySection[] = [
  {
    id: "purpose-scope",
    title: "Purpose and scope",
    body: "Access Stamp records practical venue access information for disabled people, families, carers, and venue teams in the United Kingdom. This methodology explains how information is collected, labelled, scored, reviewed, corrected, and expired.",
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
      "Demo listing — illustrates how a report could work; not live venue data.",
      "Not yet verified — early information needing confirmation.",
      "Community reported — shared by visitors or staff; confirm before travel.",
      "Venue submitted — provided by the venue and checked against our checklist.",
      "Desk reviewed — reviewed remotely with submitted or public evidence.",
      "On-site audited — measured on site with full audit record (see below).",
    ],
  },
  {
    id: "onsite-audited",
    title: "On-site audited standard",
    body: "We only use the on-site audited label when all of the following exist in our audit record:",
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
    title: "Scoring categories",
    body: "Access scores are calculated in application code — not by AI. Scores are hidden for demo listings and where evidence is below the minimum threshold.",
    bullets: [
      "Entrance & approach (25%)",
      "Inside the venue (25%)",
      "Toilets (25%)",
      "Parking & support (25%)",
    ],
    note: `Methodology version ${METHODOLOGY_VERSION}.`,
  },
  {
    id: "category-weightings",
    title: "Category weightings",
    body: "Each category is weighted equally at 25% in the current model. Category scores reflect confirmed features within that group.",
  },
  {
    id: "unknown-treatment",
    title: "Unknown-information treatment",
    body: "Unknown features reduce confidence and may reduce the published score through an unknown penalty. We show unknowns explicitly rather than implying everything is fine.",
    bullets: [
      "Unknown features are listed as known unknowns on venue pages.",
      "Demo listings do not display authoritative scores.",
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
    body: "We publish methodology version changes when scoring or verification rules change materially.",
    bullets: [`${METHODOLOGY_VERSION} — June 2026: verification labels, deterministic scoring, demo listing rules.`],
  },
  {
    id: "limitations",
    title: "Limitations",
    body: "Access needs vary. Layouts change. A report is a snapshot — always confirm details that matter for your visit.",
  },
];
