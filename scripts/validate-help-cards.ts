#!/usr/bin/env node
/**
 * Build-time Help Cards validation.
 * - Runtime-validates the production HELP_CARDS data (source/date/authority rules).
 * - Verifies the Flying-with-mobility-equipment schema fixture (multi-variant) conforms.
 * These modules only use type-only imports at runtime, so node --experimental-strip-types
 * can import them directly without path-alias resolution.
 */
import { HELP_CARDS } from "../src/data/helpCards.ts";
import { FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE } from "../src/data/help-cards/__fixtures__/flying-with-mobility-equipment.ts";

const AUTHORITATIVE = new Set(["law-or-regulation", "regulator-guidance", "government-guidance"]);
const PLACEHOLDERS = [/^add latest review date$/i, /^tbc$/i, /^todo$/i, /^tba$/i, /^n\/?a$/i];

const isPlaceholder = (value) => {
  if (!value) return false;
  const trimmed = String(value).trim();
  if (!trimmed) return false;
  if (trimmed === "#") return true;
  return PLACEHOLDERS.some((pattern) => pattern.test(trimmed));
};

const isValidIso = (value) => {
  if (!value || isPlaceholder(value)) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

const urlUsable = (url) => {
  if (!url) return false;
  const trimmed = String(url).trim();
  if (!trimmed || trimmed === "#" || isPlaceholder(trimmed)) return false;
  return trimmed.startsWith("http") || trimmed.startsWith("/");
};

/** @param {any[]} cards @param {boolean} isFixture */
function validate(cards, isFixture) {
  const errors = [];
  for (const card of cards) {
    const sourceIds = new Set((card.sources ?? []).map((s) => s.id));
    for (const source of card.sources ?? []) {
      if (!source.title?.trim()) errors.push(`${card.slug}: source ${source.id} missing title`);
      if (!source.authority?.trim()) errors.push(`${card.slug}: source ${source.id} missing authority`);
      if (!source.jurisdiction?.trim()) errors.push(`${card.slug}: source ${source.id} missing jurisdiction`);
      if (!urlUsable(source.url)) errors.push(`${card.slug}: source ${source.id} empty/placeholder URL`);
      if (!isValidIso(source.checkedAt)) errors.push(`${card.slug}: source ${source.id} invalid checkedAt`);
    }
    if (!card.variants?.length) errors.push(`${card.slug}: no variants`);
    for (const variant of card.variants ?? []) {
      if (isPlaceholder(variant.reviewedAt)) errors.push(`${card.slug}/${variant.id}: placeholder reviewedAt`);
      if (variant.reviewedAt && !isValidIso(variant.reviewedAt))
        errors.push(`${card.slug}/${variant.id}: invalid reviewedAt`);
      const highStakesPublished = card.highStakes && card.publicationState === "published";
      if (highStakesPublished && !isValidIso(variant.reviewedAt))
        errors.push(`${card.slug}/${variant.id}: high-stakes published needs reviewedAt`);
      for (const rule of variant.rules ?? []) {
        for (const value of [rule.headline, rule.plainEnglish, rule.applicability]) {
          if (isPlaceholder(value)) errors.push(`${card.slug}/${rule.id}: placeholder value`);
        }
        if (!rule.applicability?.trim()) errors.push(`${card.slug}/${rule.id}: missing applicability`);
        if (!rule.sourceIds?.length) errors.push(`${card.slug}/${rule.id}: no source`);
        for (const id of rule.sourceIds ?? []) {
          if (!sourceIds.has(id)) errors.push(`${card.slug}/${rule.id}: unknown source ${id}`);
        }
        if (card.highStakes) {
          const hasAuthoritative = (rule.sourceIds ?? [])
            .map((id) => (card.sources ?? []).find((s) => s.id === id))
            .some((s) => s && AUTHORITATIVE.has(s.authorityType));
          if (!hasAuthoritative && !isFixture)
            errors.push(`${card.slug}/${rule.id}: high-stakes rule needs authoritative source`);
        }
      }
    }
  }
  return errors;
}

const productionErrors = validate(HELP_CARDS, false);

// Fixture: must be a draft (never shipped) and represent multiple variants.
const fixtureErrors = validate([FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE], true);
if (FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE.publicationState !== "draft")
  fixtureErrors.push("flying fixture must be publicationState 'draft'");
if (FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE.variants.length < 2)
  fixtureErrors.push("flying fixture must have multiple context variants");
if (HELP_CARDS.some((card) => card.slug === FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE.slug))
  fixtureErrors.push("flying fixture must not be added to production HELP_CARDS");

const allErrors = [...productionErrors, ...fixtureErrors];
if (allErrors.length > 0) {
  console.error("Help Cards validation failed:");
  for (const error of allErrors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Help Cards validation passed (${HELP_CARDS.length} cards, fixture schema OK).`);
