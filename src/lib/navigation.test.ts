import assert from "node:assert/strict";
import { test } from "node:test";
import { resourceNavItemActive, resourcesNavActive } from "./navigation";

test("letter-builder marks Letters current, not the Planning tools hub", () => {
  assert.equal(resourceNavItemActive("/ai-toolkit/letter-builder", "/ai-toolkit/letter-builder"), true);
  assert.equal(resourceNavItemActive("/ai-toolkit/letter-builder", "/ai-toolkit"), false);
  assert.equal(resourcesNavActive("/ai-toolkit/letter-builder"), true);
});

test("help-card detail marks Help cards current", () => {
  assert.equal(resourceNavItemActive("/help-cards/section-88-driving-licence", "/help-cards"), true);
  assert.equal(resourceNavItemActive("/help-cards/section-88-driving-licence", "/advice"), false);
});
