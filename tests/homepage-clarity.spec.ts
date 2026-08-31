import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoSeriousAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();
  const serious = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact || ""),
  );
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
}

test("desktop navigation groups resources instead of listing every tool", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: /primary navigation/i });
  await expect(nav.getByRole("button", { name: /^resources$/i })).toBeVisible();
  await expect(nav.getByRole("link", { name: /for venues/i })).toBeVisible();
  await expect(nav.getByRole("link", { name: /^about$/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /check a venue/i }).first()).toBeVisible();
  await expect(nav.getByRole("link", { name: /venue finder/i })).toHaveCount(0);

  await nav.getByRole("button", { name: /^resources$/i }).click();
  await expect(nav.getByRole("button", { name: /^resources$/i })).toHaveAttribute("aria-expanded", "true");
  const panel = page.getByRole("region", { name: /^resources$/i });
  await expect(panel.getByRole("link", { name: /^guides$/i })).toBeVisible();
  await expect(panel.getByRole("link", { name: /^help cards$/i })).toBeVisible();
  await expect(panel.getByRole("link", { name: /^planning tools$/i })).toBeVisible();
  await expect(panel.getByRole("link", { name: /^letters$/i })).toBeVisible();
  await expect(panel.getByRole("link", { name: /^directory$/i })).toBeVisible();
  await expect(panel.getByRole("link", { name: /^glossary$/i })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(nav.getByRole("button", { name: /^resources$/i })).toHaveAttribute("aria-expanded", "false");
  await expect(nav.getByRole("button", { name: /^resources$/i })).toBeFocused();
});

test("desktop resources menu marks only the current destination", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/advice");

  const nav = page.getByRole("navigation", { name: /primary navigation/i });
  await nav.getByRole("button", { name: /^resources$/i }).click();
  const panel = page.getByRole("region", { name: /^resources$/i });
  await expect(panel.getByRole("link", { name: /^guides$/i })).toHaveAttribute("aria-current", "page");
  await expect(panel.getByRole("link", { name: /^help cards$/i })).not.toHaveAttribute("aria-current");

  await page.goto("/ai-toolkit/letter-builder");
  await nav.getByRole("button", { name: /^resources$/i }).click();
  await expect(panel.getByRole("link", { name: /^letters$/i })).toHaveAttribute("aria-current", "page");
  await expect(panel.getByRole("link", { name: /^planning tools$/i })).not.toHaveAttribute("aria-current");
});

test("mobile navigation presents resources as an expandable group", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: /open menu/i });
  await menuButton.click();
  const mobile = page.getByRole("navigation", { name: /mobile navigation/i });
  await expect(mobile.getByRole("button", { name: /^resources$/i })).toBeVisible();
  await expect(mobile.getByRole("link", { name: /check a venue/i })).toBeVisible();

  await mobile.getByRole("button", { name: /^resources$/i }).click();
  await expect(mobile.getByRole("link", { name: /^guides$/i })).toBeVisible();
  await expect(mobile.getByRole("link", { name: /help cards/i })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(mobile).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});

test("homepage search is venue-first without a competing advice tab", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("tab", { name: /get advice/i })).toHaveCount(0);
  await expect(page.getByLabel(/venue name or category/i)).toBeVisible();
  await expect(page.getByLabel(/town or postcode/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /search venues/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /explore access stamp resources/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /would your chair fit at /i })).toBeVisible();
  await expect(page.getByText(/doorway width alone does not prove/i)).toBeVisible();

  await page.getByLabel(/venue name or category/i).fill("Harbour Kitchen");
  await page.getByRole("button", { name: /search venues/i }).click();
  await expect(page).toHaveURL(/\/venue-finder/);
});

test("mobile access filters stay behind a labelled disclosure", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const filters = page.getByRole("button", { name: /access filters/i });
  await expect(filters).toBeVisible();
  await expect(filters).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("button", { name: /step-free access/i })).toHaveCount(0);

  await filters.click();
  await expect(filters).toHaveAttribute("aria-expanded", "true");
  const stepFree = page.getByRole("button", { name: /step-free access/i });
  await expect(stepFree).toBeVisible();
  await stepFree.click();
  await expect(stepFree).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: /search with 1 filter/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /access filters, 1 selected/i })).toBeVisible();
});

test("supporting resource routes remain reachable from the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /browse guides/i }).click();
  await expect(page).toHaveURL(/\/advice/);

  await page.goto("/");
  await page.getByRole("link", { name: /open help cards/i }).click();
  await expect(page).toHaveURL(/\/help-cards/);

  await page.goto("/");
  await page.getByRole("link", { name: /open planning tools/i }).click();
  await expect(page).toHaveURL(/\/ai-toolkit/);

  await page.goto("/");
  await page.getByRole("link", { name: /^for venues$/i }).first().click();
  await expect(page).toHaveURL(/\/for-venues/);
});

test("venue pages expose at most two contextual next steps", async ({ page }) => {
  await page.goto("/venue/harbour-kitchen-liverpool");
  const region = page.getByRole("region", { name: /useful next steps/i });
  await expect(region).toBeVisible();
  await expect(region.getByRole("link")).toHaveCount(2);
});

test("homepage does not overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBe(false);
});

test("homepage and open resources menu have no serious axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expectNoSeriousAxe(page);
  await page.getByRole("navigation", { name: /primary navigation/i }).getByRole("button", { name: /^resources$/i }).click();
  await expect(page.getByRole("region", { name: /^resources$/i })).toBeVisible();
  await expectNoSeriousAxe(page);
});

test("open mobile navigation has no serious axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: /open menu/i }).click();
  const mobile = page.getByRole("navigation", { name: /mobile navigation/i });
  await mobile.getByRole("button", { name: /^resources$/i }).click();
  await expect(mobile.getByRole("link", { name: /^guides$/i })).toBeVisible();
  await expectNoSeriousAxe(page);
});
