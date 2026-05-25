/** Tool identifiers for routing and API. */
export type ToolkitToolId =
  | "access-needs-profiler"
  | "letter-builder"
  | "evidence-checklist"
  | "article-companion"
  | "venue-questions";

export type ToolkitGuideLink = { label: string; href: string };

// —— Access Needs Profiler ——

export type ProfilerArea =
  | "Benefits"
  | "Work"
  | "Travel"
  | "Education"
  | "Housing"
  | "Care"
  | "Venue Visit"
  | "Other";

export type ProfilerOutputType = "letter" | "checklist" | "action plan" | "questions to ask";

export type AccessNeedsProfilerInput = {
  area: ProfilerArea;
  whatHappened: string;
  supportNeeded: string;
  alreadyTried: string;
  outputType: ProfilerOutputType;
  conditionOrNeeds?: string;
  urgency?: string;
};

export type AccessNeedsProfilerOutput = {
  situationSummary: string;
  likelyRoute: string;
  nextSteps: string[];
  evidenceToGather: string[];
  suggestedWording: string;
  relatedGuides: ToolkitGuideLink[];
  importantNote: string;
};

// —— Letter Builder ——

export type LetterType =
  | "PIP renewal"
  | "PIP mandatory reconsideration"
  | "Access to Work"
  | "Reasonable adjustments at work"
  | "School reasonable adjustments"
  | "EHCP assessment request"
  | "Passenger Assist complaint"
  | "Care needs assessment request"
  | "Blue Badge support"
  | "Disabled Facilities Grant enquiry"
  | "Other";

export type LetterTone = "calm" | "firm" | "formal" | "short";

export type LetterBuilderInput = {
  letterType: LetterType;
  recipient: string;
  whatHappened: string;
  askingFor: string;
  evidenceExamples: string;
  tone: LetterTone;
};

export type LetterBuilderOutput = {
  subjectLine: string;
  draftLetter: string;
  evidenceToAttach: string[];
  followUpReminder: string;
  disclaimer: string;
};

// —— Evidence Checklist ——

export type EvidenceChecklistInput = {
  topicArea: string;
  situationSummary: string;
  decisionOrRequest: string;
  evidenceHave: string;
  evidenceMissing: string;
};

export type EvidenceChecklistOutput = {
  essentialEvidence: string[];
  helpfulEvidence: string[];
  personalExamples: string[];
  questionsForProfessionals: string[];
  whatToAvoid: string[];
  nextStep: string;
};

// —— Article Companion ——

export type ArticleCompanionInput = {
  articleSlug: string;
  articleTitle: string;
  situation: string;
  desiredOutcome: string;
  alreadyTried: string;
  sectionHeadings?: string[];
};

export type ArticleCompanionOutput = {
  checklist: string[];
  nextSteps: string[];
  draftWording: string;
  relatedSections: string[];
};

// —— Venue Questions ——

export type VenueAccessNeed =
  | "wheelchair access"
  | "powered wheelchair"
  | "manual wheelchair"
  | "walking aid"
  | "fatigue"
  | "sensory needs"
  | "assistance dog"
  | "accessible toilet"
  | "parking"
  | "step-free access"
  | "quiet space"
  | "seating"
  | "other";

export type VenueQuestionsInput = {
  venueType: string;
  visitPurpose: string;
  accessNeeds: VenueAccessNeed[];
  specificConcern?: string;
};

export type VenueQuestionsOutput = {
  questionsToAsk: string[];
  shortMessage: string;
  redFlags: string[];
  photosToRequest: string[];
  bookingNotes: string[];
};

export type ToolkitInputMap = {
  "access-needs-profiler": AccessNeedsProfilerInput;
  "letter-builder": LetterBuilderInput;
  "evidence-checklist": EvidenceChecklistInput;
  "article-companion": ArticleCompanionInput;
  "venue-questions": VenueQuestionsInput;
};

export type ToolkitOutputMap = {
  "access-needs-profiler": AccessNeedsProfilerOutput;
  "letter-builder": LetterBuilderOutput;
  "evidence-checklist": EvidenceChecklistOutput;
  "article-companion": ArticleCompanionOutput;
  "venue-questions": VenueQuestionsOutput;
};

/** openai = live model; mock = no API key (local preview); fallback = key set but request/parse failed */
export type ToolkitResultSource = "openai" | "mock" | "fallback";

export type ToolkitRunResult<T extends ToolkitToolId> = {
  tool: T;
  source: ToolkitResultSource;
  output: ToolkitOutputMap[T];
};
