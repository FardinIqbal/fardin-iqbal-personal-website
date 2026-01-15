import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("displays page title", async ({ page }) => {
    const title = page.locator("h1");
    await expect(title).toBeVisible();
  });

  test("displays blog posts", async ({ page }) => {
    const posts = page.locator("article");
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);
  });

  test("blog posts have required elements", async ({ page }) => {
    const firstPost = page.locator("article").first();

    // Has title
    const title = firstPost.locator("h2, h3").first();
    await expect(title).toBeVisible();

    // Has date or reading time
    const meta = firstPost.locator("text=/\\d+ min|\\d{4}/");
    await expect(meta.first()).toBeVisible();
  });

  test("clicking post navigates to post page", async ({ page }) => {
    const firstPost = page.locator("article").first();
    const link = firstPost.locator("a").first();
    await link.click();

    // Should navigate to blog post
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});

test.describe("Blog Post Page", () => {
  test("displays post title", async ({ page }) => {
    // Go directly to a known blog post
    await page.goto("/blog/building-prometheus");

    const title = page.locator("h1");
    await expect(title).toBeVisible();
  });

  test("displays post content", async ({ page }) => {
    await page.goto("/blog/building-prometheus");

    const content = page.locator("main");
    await expect(content).toBeVisible();
  });

  test("has proper typography for reading", async ({ page }) => {
    await page.goto("/blog/building-prometheus");

    // Check that prose/body text exists
    const prose = page.locator("p").first();
    await expect(prose).toBeVisible();

    const lineHeight = await prose.evaluate((el) =>
      window.getComputedStyle(el).lineHeight
    );

    // Should have comfortable reading line-height
    expect(parseFloat(lineHeight)).toBeGreaterThan(1);
  });
});
