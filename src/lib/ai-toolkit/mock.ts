import { guidesForArea, guidesForLetterType, guidesForTopic } from "@/lib/ai-toolkit/related-guides";
import { TOOLKIT_DISCLAIMER } from "@/lib/ai-toolkit/tools-meta";
import type {
  AccessNeedsProfilerInput,
  AccessNeedsProfilerOutput,
  ArticleCompanionInput,
  ArticleCompanionOutput,
  EvidenceChecklistInput,
  EvidenceChecklistOutput,
  LetterBuilderInput,
  LetterBuilderOutput,
  VenueQuestionsInput,
  VenueQuestionsOutput,
  TribunalBundleInput,
  TribunalBundleOutput,
  VenueFitPlannerInput,
  VenueFitPlannerOutput,
} from "@/lib/ai-toolkit/types";

function clip(s: string, max = 120) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

export function mockAccessNeedsProfiler(input: AccessNeedsProfilerInput): AccessNeedsProfilerOutput {
  const related = guidesForArea(input.area);
  return {
    situationSummary: `You are seeking help with ${input.area.toLowerCase()}: ${clip(input.whatHappened, 200)}. You need ${clip(input.supportNeeded, 100)}.`,
    likelyRoute: `Start with the official route for ${input.area} (check GOV.UK or your council/NHS as relevant). Use your chosen output — ${input.outputType} — to structure what you send or prepare.`,
    nextSteps: [
      "Write down dates and what happened in order (who, what, when).",
      `Gather evidence listed below before you submit or call — you asked for a ${input.outputType}.`,
      input.alreadyTried
        ? `Build on what you already tried: ${clip(input.alreadyTried, 80)} — note outcomes in writing.`
        : "List what you have already tried so you do not repeat steps without new information.",
    ],
    evidenceToGather: [
      "Your own dated diary of typical days (good and bad).",
      "Letters or emails you already sent or received.",
      "Fit notes, reports, or support plans (if health or care related).",
      input.conditionOrNeeds ? `Notes on access needs: ${clip(input.conditionOrNeeds, 80)}` : "Photos or measurements if venue or equipment related.",
    ],
    suggestedWording: `I am writing about ${input.area.toLowerCase()}. ${clip(input.whatHappened, 150)} I am asking for ${clip(input.supportNeeded, 100)}. Please confirm the next step and any forms I should complete.`,
    relatedGuides: related,
    importantNote: input.urgency
      ? `${TOOLKIT_DISCLAIMER} You marked urgency: ${input.urgency} — if you are unsafe or in crisis, contact emergency or NHS 111 / Samaritans as appropriate.`
      : TOOLKIT_DISCLAIMER,
  };
}

export function mockLetterBuilder(input: LetterBuilderInput): LetterBuilderOutput {
  const toneIntro =
    input.tone === "formal"
      ? "Dear Sir/Madam,"
      : input.tone === "short"
        ? "Hello,"
        : input.tone === "firm"
          ? "Dear Sir/Madam,"
          : "Dear Sir/Madam,";

  const body = `${toneIntro}

I am writing regarding ${input.letterType}.

${clip(input.whatHappened, 400)}

I am asking you to: ${clip(input.askingFor, 300)}

${input.evidenceExamples ? `Supporting examples: ${clip(input.evidenceExamples, 300)}` : "I can provide supporting examples on request."}

Please confirm receipt and the next step in your process.

Yours faithfully,
[Your name]
[Your contact details]`;

  return {
    subjectLine: `${input.letterType} — request for ${clip(input.askingFor, 60)}`,
    draftLetter: body,
    evidenceToAttach: [
      "Copies (not originals) of relevant letters or decisions",
      "Dated diary or examples of daily impact",
      input.evidenceExamples ? "Items you listed in your form" : "Any official forms already completed",
    ],
    followUpReminder:
      "Keep a note of when you sent this. If you do not hear back within a reasonable time, follow up in writing and keep a copy.",
    disclaimer: TOOLKIT_DISCLAIMER,
  };
}

export function mockEvidenceChecklist(input: EvidenceChecklistInput): EvidenceChecklistOutput {
  return {
    essentialEvidence: [
      "Clear summary of what you are requesting or challenging",
      "Dates and timeline of key events",
      input.evidenceHave ? `What you already have: ${clip(input.evidenceHave, 100)}` : "Identity and contact details for the application",
      input.evidenceMissing ? `Priority gaps: ${clip(input.evidenceMissing, 100)}` : "Official decision letter or reference number if applicable",
    ],
    helpfulEvidence: [
      "Professional letters linked to function (not diagnosis alone)",
      "Photos or measurements for access or equipment topics",
      "Emails showing you asked for help previously",
    ],
    personalExamples: [
      "Three typical days (including a harder day) written in your own words",
      "What happens without support or adjustments",
      "Time spent on care, travel, or tasks compared with others in similar situations",
    ],
    questionsForProfessionals: [
      "Can you describe how my condition affects daily activities, not only the diagnosis?",
      "What should I send with my application or request?",
      "Is there a standard form or reference number I should quote?",
    ],
    whatToAvoid: [
      "Sending originals when copies are enough",
      "Vague statements without dates or examples",
      "Contradicting earlier statements without explaining what changed",
    ],
    nextStep: `Prepare your ${clip(input.decisionOrRequest, 80)} for ${clip(input.topicArea, 40)} using the lists above, then use Letter Builder or an Access Stamp guide for wording.`,
  };
}

export function mockArticleCompanion(input: ArticleCompanionInput): ArticleCompanionOutput {
  const sections = input.sectionHeadings?.length
    ? input.sectionHeadings.slice(0, 4)
    : ["Summary", "Who this is for", "Steps", "Official links"];
  return {
    checklist: [
      `Read relevant sections of “${input.articleTitle}”`,
      `Clarify your situation: ${clip(input.situation, 80)}`,
      `Target outcome: ${clip(input.desiredOutcome, 80)}`,
      input.alreadyTried ? `Note what you tried: ${clip(input.alreadyTried, 60)}` : "List what you have already tried",
      "Gather evidence before contacting officials or professionals",
    ],
    nextSteps: [
      "Work through the guide sections in order and tick each item",
      "Draft your request using the wording section below",
      "Save copies of anything you send",
    ],
    draftWording: `Following the guide “${input.articleTitle}”: ${clip(input.situation, 120)} I would like ${clip(input.desiredOutcome, 100)}.`,
    relatedSections: sections,
    simpleEnglishSummary: `You want ${clip(input.desiredOutcome, 90)}. Start with clear examples from daily life, keep dates in order, and ask for a written response.`,
    phoneScript: `Hello, I’m calling about ${clip(input.articleTitle, 60)}. My situation is: ${clip(input.situation, 80)}. I need: ${clip(input.desiredOutcome, 80)}. Could you confirm the correct next step and what evidence I should send?`,
  };
}

export function mockVenueQuestions(input: VenueQuestionsInput): VenueQuestionsOutput {
  const needs = input.accessNeeds.length ? input.accessNeeds.join(", ") : "general access";
  return {
    questionsToAsk: [
      `Is there step-free access from the street to ${clip(input.visitPurpose, 40)}?`,
      "What is the width of the main entrance and any internal doors on the route?",
      input.accessNeeds.includes("accessible toilet")
        ? "Where is the accessible toilet, and is it on the same level as the event space?"
        : "Are there accessible toilets on the route I will use?",
      input.accessNeeds.includes("parking")
        ? "Is there Blue Badge or drop-off parking, and how far is it from the entrance?"
        : "Where is the nearest accessible parking or drop-off?",
      input.accessNeeds.includes("sensory needs") || input.accessNeeds.includes("quiet space")
        ? "Are there quieter times or a low-sensory area?"
        : "Are there busy periods I should avoid?",
      input.accessNeeds.includes("assistance dog")
        ? "Are assistance dogs welcome throughout, including seating areas?"
        : "Can staff help with seating or carrying items if needed?",
      input.specificConcern ? `About my concern: ${clip(input.specificConcern, 100)}` : "Can I visit at a quiet time before my booking to check the route?",
    ],
    shortMessage: `Hello, I am planning a visit (${input.venueType}) for ${clip(input.visitPurpose, 60)}. My access needs include: ${needs}. Could you confirm step-free routes, toilet access, parking, and seating? ${input.specificConcern ? `I am especially concerned about: ${clip(input.specificConcern, 80)}.` : ""} Thank you.`,
    redFlags: [
      "Vague answers such as “we are accessible” without measurements or photos",
      "Accessible toilet only on a different floor with no working lift",
      "No way to reserve seating or a quiet space when you need it",
    ],
    photosToRequest: [
      "Entrance and doorways on your route",
      "Accessible toilet (including transfer space if relevant)",
      "Parking and path from parking to entrance",
      "Seating layout or table height if dining or events",
    ],
    bookingNotes: [
      "Ask for written confirmation of access arrangements",
      "Note a named contact and direct phone number",
      "Plan arrival earlier to resolve issues before your visit starts",
    ],
  };
}

export function mockTribunalBundle(input: TribunalBundleInput): TribunalBundleOutput {
  return {
    chronology: [
      input.decisionDate ? `Decision date: ${input.decisionDate}` : "Decision date: [add date from letter]",
      `Issue summary: ${clip(input.issueSummary, 100)}`,
      "Requested mandatory reconsideration / challenge (if applicable)",
      "Collected further evidence and prepared submission",
    ],
    keyPointsForSubmission: [
      "What the original decision missed or misunderstood",
      "How your daily function is affected (not diagnosis label only)",
      "Why your evidence supports a different outcome",
    ],
    evidenceBundleChecklist: [
      "Decision letter and any mandatory reconsideration notice",
      "Medical/support letters linked to function",
      input.evidenceHave ? `Current evidence: ${clip(input.evidenceHave, 100)}` : "Your diary and examples",
      input.evidenceMissing ? `Priority gaps: ${clip(input.evidenceMissing, 100)}` : "Any missing reports requested from professionals",
    ],
    likelyGaps: [
      "Inconsistent dates across forms and letters",
      "Limited real-world examples of impact",
      "No explanation of bad days vs better days",
    ],
    hearingDayChecklist: [
      "Bring your notes and a copy of your submission bundle",
      "Use clear examples for each activity or descriptor in dispute",
      "Ask for clarification if a question is unclear",
      "Request short breaks if needed for pain, fatigue, or distress",
    ],
    shortSubmissionOpening: `I am appealing because the decision does not reflect my actual daily limitations. I rely on support for: ${clip(input.issueSummary, 120)}. The attached evidence explains why a different award is more accurate.`,
    disclaimer: TOOLKIT_DISCLAIMER,
  };
}

export function mockVenueFitPlanner(input: VenueFitPlannerInput): VenueFitPlannerOutput {
  return {
    fitSummary: `${input.venueName} appears potentially workable for your needs (${clip(input.userNeeds, 100)}), but you should confirm unknown details before travel.`,
    confidenceLevel: input.unknownFeatureCount > 2 ? "low" : input.unknownFeatureCount > 0 ? "medium" : "high",
    askBeforeVisit: [
      "Confirm step-free route from entrance to main area and toilet",
      "Ask for door widths and turning space on your route",
      "Check whether staff can reserve suitable seating",
    ],
    redFlags: [
      "Staff cannot provide measurements or route photos",
      "Accessible toilet is unavailable or used as storage",
      "No fallback entrance if a lift/door fails",
    ],
    backupPlan: [
      "Identify one nearby backup venue",
      "Plan a flexible arrival time if access setup is uncertain",
      "Keep transport options open in case you need to leave quickly",
    ],
    shortCallScript: `Hi, I’m planning to visit ${input.venueName} in ${input.location}. My access needs are ${clip(input.userNeeds, 120)}. Could you confirm step-free access, toilet access, and key measurements before I book?`,
  };
}
