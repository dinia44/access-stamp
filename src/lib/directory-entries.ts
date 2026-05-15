export type DirectoryEntry = {
  name: string;
  category: string;
  area: string;
  phone?: string;
  website?: string;
  notes?: string;
};

/** Curated UK-wide services — external links; not affiliated with Access Stamp. */
export const DIRECTORY_ENTRIES: DirectoryEntry[] = [
  {
    name: "Citizens Advice",
    category: "Advice & rights",
    area: "UK",
    phone: "0800 144 8848 (England)",
    website: "https://www.citizensadvice.org.uk/",
    notes: "Free, confidential advice on benefits, housing, debt, employment, and discrimination.",
  },
  {
    name: "Scope",
    category: "Advice & rights",
    area: "UK",
    phone: "0808 800 3333",
    website: "https://www.scope.org.uk/",
    notes: "Disability information and support line. Mon–Fri, 9am–6pm (check site for current hours).",
  },
  {
    name: "Disability Rights UK",
    category: "Advice & rights",
    area: "UK",
    website: "https://www.disabilityrightsuk.org/",
    notes: "Rights, benefits guides, and resources including the National Key Scheme (Radar key).",
  },
  {
    name: "Samaritans",
    category: "Crisis support",
    area: "UK",
    phone: "116 123 (free, 24/7)",
    website: "https://www.samaritans.org/",
    notes: "Emotional support for anyone in distress. Not only for suicide crisis.",
  },
  {
    name: "Shout (text crisis line)",
    category: "Crisis support",
    area: "UK",
    phone: "Text SHOUT to 85258",
    website: "https://giveusashout.org/",
    notes: "Free, confidential text support, 24/7.",
  },
  {
    name: "NHS 111",
    category: "Health",
    area: "UK",
    phone: "111",
    website: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/",
    notes: "Urgent medical advice when it is not a 999 emergency.",
  },
  {
    name: "NHS Wheelchair Services",
    category: "Wheelchair services",
    area: "UK (local)",
    website: "https://www.nhs.uk/service-search/other-health-services/wheelchair-services/",
    notes: "Find your local wheelchair service via NHS service search — provision varies by area.",
  },
  {
    name: "Motability Scheme",
    category: "Transport & mobility",
    area: "UK",
    phone: "0300 456 4566",
    website: "https://www.motability.co.uk/",
    notes: "Lease a car, scooter, or powered wheelchair using qualifying mobility benefits.",
  },
  {
    name: "Blue Badge (GOV.UK)",
    category: "Transport & mobility",
    area: "UK",
    website: "https://www.gov.uk/apply-blue-badge",
    notes: "Apply for a disabled parking badge through your local council.",
  },
  {
    name: "Access to Work",
    category: "Workplace",
    area: "UK",
    phone: "0800 121 7479",
    website: "https://www.gov.uk/access-to-work",
    notes: "Government support for workplace adjustments and equipment.",
  },
  {
    name: "GOV.UK — Disabled Facilities Grant",
    category: "Home adaptations",
    area: "England",
    website: "https://www.gov.uk/disabled-facilities-grants",
    notes: "Council grants for home adaptations. Rules differ in Scotland, Wales, and Northern Ireland.",
  },
  {
    name: "Changing Places toilet map",
    category: "Toilets & access",
    area: "UK",
    website: "https://www.changing-places.org/find",
    notes: "Locate toilets with hoist and adult changing bench.",
  },
  {
    name: "RNID (hearing loss)",
    category: "Sensory",
    area: "UK",
    phone: "0808 808 0123",
    website: "https://rnid.org.uk/",
    notes: "Information and support for deafness and hearing loss.",
  },
  {
    name: "RNIB (sight loss)",
    category: "Sensory",
    area: "UK",
    phone: "0303 123 9999",
    website: "https://www.rnib.org.uk/",
    notes: "Practical and emotional support for sight loss.",
  },
  {
    name: "Mind",
    category: "Mental health",
    area: "UK",
    phone: "0300 123 3393",
    website: "https://www.mind.org.uk/",
    notes: "Mental health information and local Mind services.",
  },
  {
    name: "Carers UK",
    category: "Carers",
    area: "UK",
    phone: "0808 808 7777",
    website: "https://www.carersuk.org/",
    notes: "Advice and support for unpaid carers.",
  },
];
