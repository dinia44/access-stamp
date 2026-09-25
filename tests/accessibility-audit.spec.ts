import { test, expect } from "@playwright/test";

for (const width of [1280, 390]) {
  test(`filters contain keyboard focus and restore it at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/venue-finder");
    const trigger = page.getByRole("button", { name: "More filters", exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "More access filters" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close filters" })).toBeFocused();
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      await expect(dialog.locator(":focus")).toHaveCount(1);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
}

test("venue report preserves search, filters, view, sort and result position", async ({ page }) => {
  await page.goto("/venue-finder?q=cafe&location=Manchester&filters=Step-free%20entrance&sort=Evidence%20confidence&view=list");
  await page.getByRole("link", { name: "View report for Gallery Café", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Gallery Café", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to search →", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Venue name or category" })).toHaveValue("cafe");
  await expect(page.getByRole("textbox", { name: "Town or postcode" })).toHaveValue("Manchester");
  await expect(page.getByRole("combobox", { name: "Sort venues" })).toHaveValue("Evidence confidence");
  await expect(page.getByRole("button", { name: "List", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Step-free entrance", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#venue-gallery-cafe-manchester$/);
});

test("fit result names the toilet barrier and does not claim demo evidence is audited", async ({ page }) => {
  await page.goto("/venue/harbour-kitchen-liverpool");
  await page.getByRole("spinbutton", { name: "Overall chair width (cm)" }).fill("78");
  await expect(page.getByText("Insufficient clearance at toilet door:", { exact: false })).toBeVisible();
  await expect(page.getByText("Toilet door: 80 cm — insufficient clearance including allowance.", { exact: true })).toBeVisible();
  await expect(page.getByText("Medium confidence", { exact: true })).toHaveCount(0);
  await expect(page.getByText("audited measurements", { exact: true })).toHaveCount(0);
  await expect(page.getByText("5 to confirm", { exact: true })).toBeVisible();
});
