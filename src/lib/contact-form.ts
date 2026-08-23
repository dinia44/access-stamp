export const CONTACT_ENQUIRY_TYPES = [
  "General enquiry",
  "Venue support",
  "Partnership or media",
  "Accessibility feedback",
  "Other",
] as const;

export type ContactEnquiryType = (typeof CONTACT_ENQUIRY_TYPES)[number];
