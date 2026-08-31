import assert from "node:assert/strict";
import { test } from "node:test";
import { mapVenueNextSteps } from "./venue-next-steps";

test("unknown details map to questions, not a full tool catalogue", () => {
  const steps = mapVenueNextSteps({
    unknownFeatures: ["Accessible toilet", "Nearby Blue Badge parking"],
    confirmedFeatures: ["Step-free entrance"],
    unavailableFeatures: [],
  });
  assert.equal(steps.length, 2);
  assert.equal(steps[0]?.id, "ask-venue");
  assert.match(steps[0]?.href ?? "", /wheelchair-access-venue|venue-questions/);
  assert.ok(steps.every((step) => step.label && step.reason && step.href.startsWith("/")));
});

test("step-free gaps surface the wheelchair Help Card", () => {
  const steps = mapVenueNextSteps({
    unknownFeatures: ["Step-free entrance"],
    confirmedFeatures: [],
    unavailableFeatures: [],
  });
  assert.ok(steps.some((step) => step.href === "/help-cards/wheelchair-access-venue"));
  assert.ok(steps.length <= 2);
});

test("hearing unknowns map to accessible information, not every planning tool", () => {
  const steps = mapVenueNextSteps({
    unknownFeatures: ["Hearing loop"],
    confirmedFeatures: ["Step-free entrance"],
    unavailableFeatures: [],
  });
  assert.equal(steps.length, 2);
  assert.ok(steps.some((step) => step.href === "/help-cards/report-inaccessible-information"));
  assert.doesNotMatch(steps.map((step) => step.href).join(" "), /letter-builder|ai-toolkit$/);
});
