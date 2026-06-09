import { test, expect } from "@playwright/test";

test("venue search can be submitted by keyboard", async ({ page }) => {
  await page.goto("/venue-finder");

  await page.getByLabel(/^search$/i).fill("cafe");
  await page.getByLabel(/^location$/i).fill("Manchester");
  await page.keyboard.press("Enter");

  await expect(page.getByRole("status")).toContainText(/venues|finding your location/i);
});

test("mobile menu closes with Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: /open menu/i });
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: /mobile navigation/i })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: /mobile navigation/i })).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});
