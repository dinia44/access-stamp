import type { HelpCardDownloadDocument } from "../download-types";

const base: HelpCardDownloadDocument = {
  version: 1,
  status: "published",
  layout: "one-page",
  slug: "fixture-compact-card",
  title: "Asking for a quieter waiting space",
  category: "Healthcare and appointments",
  purpose: "Use this card when a waiting room is too busy or noisy for you to wait safely.",
  keyMessage: "Ask staff to confirm a quieter waiting option before you arrive. This card does not prove an arrangement.",
  actions: [
    "Explain the waiting problem in one sentence.",
    "Ask what quieter option they can offer.",
    "Ask them to confirm it before you travel.",
  ],
  questionsToAsk: ["Is there a quieter waiting space?", "Can you confirm this before I travel?"],
  suggestedWording: {
    label: "You could say",
    text: "I need a quieter waiting space because the main waiting room is too busy for me. Can you confirm what you can arrange before I travel?",
  },
  appliesTo: "England, Scotland and Wales",
  authorityLabel: "Law or regulation; Access Stamp practical suggestion",
  reviewedAt: "2026-07-25",
  sources: [
    {
      title: "Equality Act 2010",
      url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
      publisher: "UK Parliament",
      authorityType: "law-or-regulation",
    },
  ],
  disclaimer:
    "This is a practical summary. Service providers must consider reasonable adjustments under the Equality Act 2010 in England, Scotland and Wales.",
  footerNote: "This card does not prove eligibility, entitlement or an access arrangement. Check the live Help Card for the latest reviewed detail.",
  liveUrl: "https://accessstamp.co.uk/help-cards/fixture-compact-card",
  liveUrlLabel: "accessstamp.co.uk/help-cards/fixture-compact-card",
};

export const COMPACT_DOWNLOAD_FIXTURE: HelpCardDownloadDocument = base;

export const LONG_DOWNLOAD_FIXTURE: HelpCardDownloadDocument = {
  ...base,
  slug: "fixture-long-content-card",
  layout: "two-page",
  title:
    "Requesting a detailed written confirmation of access arrangements for a time-sensitive appointment with more than one building entrance",
  suggestedWording: {
    label: "You could send this to the service organiser",
    text: "I am writing to confirm access arrangements before a time-sensitive appointment. Please confirm the step-free entrance I should use, the narrowest doorway width on that route, whether an accessible toilet is available and how its layout works, whether a support person can attend, and how long I may need to wait. Please also say who I should contact on the day if the usual route is blocked by temporary works, furniture or an event. I need this in writing because rearranging the appointment would be difficult.",
  },
  conditions: [
    "Service providers in England, Scotland and Wales must consider reasonable adjustments for disabled people under the Equality Act 2010.",
    "What a service can arrange still varies by building, staffing and the appointment type.",
    "Temporary works, furniture or events can change a route that is usually clear.",
  ],
  beforeYouGo: [
    "Keep the written reply with your appointment letter.",
    "Confirm the arrangement again if the visit is difficult to rearrange.",
    "Ask who to contact on the day if the route has changed.",
  ],
  sources: [
    {
      title:
        "Equality Act 2010, including the duty to make reasonable adjustments so disabled people are not placed at a substantial disadvantage",
      url: "https://www.legislation.gov.uk/ukpga/2010/15/contents",
      publisher: "UK Parliament",
      authorityType: "law-or-regulation",
    },
    {
      title: "Access Stamp: your rights and access",
      url: "https://accessstamp.co.uk/advice/rights",
      publisher: "Access Stamp",
      authorityType: "access-stamp-practical",
    },
  ],
  liveUrl: "https://accessstamp.co.uk/help-cards/fixture-long-content-card",
  liveUrlLabel: "accessstamp.co.uk/help-cards/fixture-long-content-card",
};

export const OPTIONAL_SECTIONS_FIXTURE: HelpCardDownloadDocument = {
  ...base,
  slug: "fixture-optional-sections",
  title: "Keeping a short access note with you",
  questionsToAsk: undefined,
  suggestedWording: undefined,
  conditions: undefined,
  beforeYouGo: undefined,
  liveUrl: "https://accessstamp.co.uk/help-cards/fixture-optional-sections",
  liveUrlLabel: "accessstamp.co.uk/help-cards/fixture-optional-sections",
};
