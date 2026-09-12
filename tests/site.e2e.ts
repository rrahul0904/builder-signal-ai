import { test, expect } from "@playwright/test";

test("core navigation, acquisition and search flows", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Know what matters/i })).toBeVisible();
  await page.getByRole("link", { name: "Intelligence" }).click();
  await expect(page).toHaveURL(/\/archive/);

  await page.goto("/search");
  await page.getByLabel("Search articles").fill("MCP");
  await expect(page.getByText("The production checklist every MCP server should pass")).toBeVisible();

  await page.goto("/");
  const form = page.locator("#subscribe").first();
  await form.getByPlaceholder("you@company.com").fill("e2e@example.com");
  await form.getByRole("button", { name: /Join free/ }).click();
  await expect(form.getByText(/You’re on the list/)).toBeVisible();

  await page.goto("/sponsor");
  await page.getByLabel("Name").fill("E2E Partner");
  await page.getByLabel("Work email").fill("partner@example.com");
  await page.getByLabel("Company").fill("Example Labs");
  await page.getByLabel("What are you hoping to promote?").fill("A production-ready agent infrastructure product for technical teams.");
  await page.getByRole("button", { name: /Request media kit/ }).click();
  await expect(page.getByText(/Request received/)).toBeVisible();

  const unauthorized = await page.request.get("/api/admin/export");
  expect([401, 503]).toContain(unauthorized.status());
});
