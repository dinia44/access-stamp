import { test, expect } from "@playwright/test";
import { SMOKE_ROUTES } from "./routes";

for (const route of SMOKE_ROUTES) {
  test(`smoke: ${route} loads`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("smoke: homepage primary CTAs are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /check venue access/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /find practical guidance/i })).toBeVisible();
});

test("smoke: venue page shows demo banner for demo listing", async ({ page }) => {
  await page.goto("/venue/harbour-kitchen-liverpool");
  await expect(page.getByText(/demo listing/i).first()).toBeVisible();
});
