export type VenueNextStep = {
  id: string;
  label: string;
  href: string;
  reason: string;
};

export type VenueNextStepInput = {
  unknownFeatures: string[];
  confirmedFeatures: string[];
  unavailableFeatures: string[];
};

function includesNeed(features: string[], pattern: RegExp): boolean {
  return features.some((feature) => pattern.test(feature));
}

/** Map at most two relevant next steps from venue evidence — never a full tool catalogue. */
export function mapVenueNextSteps(input: VenueNextStepInput): VenueNextStep[] {
  const steps: VenueNextStep[] = [];
  const unknown = input.unknownFeatures;
  const unavailable = input.unavailableFeatures;

  if (unknown.length > 0) {
    const toiletUnknown = includesNeed(unknown, /toilet/i);
    steps.push({
      id: "ask-venue",
      label: "Prepare questions to ask the venue",
      href: toiletUnknown
        ? "/help-cards/wheelchair-access-venue"
        : "/ai-toolkit/venue-questions",
      reason:
        unknown.length === 1
          ? `${unknown[0]} is still unconfirmed.`
          : `${unknown.length} access details are still unconfirmed.`,
    });
  }

  if (
    includesNeed(unknown, /step-free|entrance|door/i) ||
    includesNeed(unavailable, /step-free|entrance/i)
  ) {
    steps.push({
      id: "wheelchair-card",
      label: "Open the wheelchair access Help Card",
      href: "/help-cards/wheelchair-access-venue",
      reason: "Use ready-to-send wording when you need specific measurements before booking.",
    });
  } else if (includesNeed(unknown, /hearing|information|loop/i)) {
    steps.push({
      id: "information-card",
      label: "Request accessible information",
      href: "/help-cards/report-inaccessible-information",
      reason: "Ask the provider for a format you can use.",
    });
  } else if (steps.length < 2) {
    steps.push({
      id: "appointment-card",
      label: "Explain access needs before you go",
      href: "/help-cards/explain-access-before-appointment",
      reason: "A short card for confirming arrangements with the venue or service.",
    });
  }

  const unique = steps.filter((step, index) => steps.findIndex((item) => item.href === step.href) === index);
  return unique.slice(0, 2);
}
