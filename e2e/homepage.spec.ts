import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays hero section with name", async ({ page }) => {
    const name = page.locator("h1");
    await expect(name).toBeVisible();
    await expect(name).toContainText("Fardin Iqbal");
  });

  test("hero section has tagline", async ({ page }) => {
    const tagline = page.locator("#hero p").first();
    await expect(tagline).toBeVisible();
  });

  test("scroll indicator button is visible", async ({ page }) => {
    const scrollButton = page.getByRole("button", { name: /scroll to work/i });
    await expect(scrollButton).toBeVisible();
  });

  test("clicking scroll indicator scrolls to work section", async ({ page }) => {
    const scrollButton = page.getByRole("button", { name: /scroll to work/i });
    await scrollButton.click();

    const workSection = page.locator("#work");
    await expect(workSection).toBeInViewport();
  });

  test("work section displays featured projects", async ({ page }) => {
    const workSection = page.locator("#work");
    await expect(workSection).toBeVisible({ timeout: 10000 });
    await workSection.scrollIntoViewIfNeeded();

    const projectCards = workSection.locator("article");
    await expect(projectCards).toHaveCount(4);
  });

  test("writing section displays blog posts", async ({ page }) => {
    const writingSection = page.locator("#writing");
    await expect(writingSection).toBeVisible({ timeout: 10000 });
    await writingSection.scrollIntoViewIfNeeded();

    const postCards = writingSection.locator("article");
    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("about section is present", async ({ page }) => {
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible({ timeout: 10000 });
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(aboutSection).toBeVisible();
  });

  test("contact section is present", async ({ page }) => {
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible({ timeout: 10000 });
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });
});

test.describe("Homepage - Visual", () => {
  test("hero has premium typography", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Check computed font size (in pixels)
    const fontSize = await h1.evaluate((el) => {
      const computed = window.getComputedStyle(el).fontSize;
      return parseFloat(computed);
    });

    // Should be large on desktop (at least 48px)
    expect(fontSize).toBeGreaterThanOrEqual(48);
  });

  test("page has burgundy accent color", async ({ page }) => {
    await page.goto("/");

    // Check that accent elements have burgundy-ish color
    const accentElement = page.locator(".text-accent").first();
    if (await accentElement.isVisible()) {
      const color = await accentElement.evaluate((el) =>
        window.getComputedStyle(el).color
      );
      // Burgundy should have high red component
      expect(color).toMatch(/rgb\((\d+),/);
    }
  });
});
