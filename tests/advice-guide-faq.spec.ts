import { test, expect } from "@playwright/test";

test("reasonable adjustments guide FAQ accordion opens with keyboard", async ({ page }) => {
  await page.goto("/advice/reasonable-adjustments-at-work");

  const firstQuestion = page.getByRole("button", {
    name: /do i need a formal diagnosis/i,
  });
  await expect(firstQuestion).toBeVisible();
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");

  await firstQuestion.focus();
  await page.keyboard.press("Enter");
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "false");

  await page.keyboard.press("Enter");
  await expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/what to do next/i).first()).toBeVisible();
});
