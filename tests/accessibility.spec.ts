import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { AXE_ROUTES } from "./routes";

for (const route of AXE_ROUTES) {
  test(`a11y: no serious axe violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();

    const serious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact || ""),
    );

    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test("homepage has visible keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
});
