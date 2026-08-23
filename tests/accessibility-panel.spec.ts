import { expect, test } from "@playwright/test";

test.describe("Accessibility options panel", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("panel stays in viewport and closes with Escape restoring focus", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /open accessibility options|accessibility/i }).first();
    await trigger.click();

    const panel = page.getByTestId("accessibility-options-panel");
    await expect(panel).toBeVisible();

    const box = await panel.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(390 + 1);
      expect(box.width).toBeGreaterThan(200);
    }

    const close = page.getByRole("button", { name: /close accessibility options/i });
    const closeBox = await close.boundingBox();
    expect(closeBox).toBeTruthy();
    if (closeBox) {
      expect(closeBox.width).toBeGreaterThanOrEqual(44);
      expect(closeBox.height).toBeGreaterThanOrEqual(44);
    }

    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("close button dismisses the panel", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open accessibility options|accessibility/i }).first().click();
    const panel = page.getByTestId("accessibility-options-panel");
    await expect(panel).toBeVisible();
    await page.getByRole("button", { name: /close accessibility options/i }).click();
    await expect(panel).toHaveCount(0);
  });
});
