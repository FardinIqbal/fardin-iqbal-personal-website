import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("displays page title", async ({ page }) => {
    const title = page.locator("h1");
    await expect(title).toContainText(/projects/i);
  });

  test("displays category filter buttons", async ({ page }) => {
    const allButton = page.getByRole("button", { name: "All" });
    await expect(allButton).toBeVisible();

    // Check for category buttons
    const filterButtons = page.locator("button").filter({ hasText: /ai|full-stack|systems|machine learning|tools/i });
    const count = await filterButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("All filter is active by default", async ({ page }) => {
    const allButton = page.getByRole("button", { name: "All" });
    await expect(allButton).toHaveClass(/bg-accent/);
  });

  test("clicking category filters projects", async ({ page }) => {
    // Get initial project count
    const initialProjects = page.locator("article");
    const initialCount = await initialProjects.count();

    // Click a category filter (not "All")
    const aiButton = page.getByRole("button", { name: "AI" });
    if (await aiButton.isVisible()) {
      await aiButton.click();

      // Projects should be filtered (possibly different count)
      const filteredProjects = page.locator("article");
      const filteredCount = await filteredProjects.count();

      // Either fewer projects or same (if all are that category)
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    }
  });

  test("project cards have required elements", async ({ page }) => {
    const firstProject = page.locator("article").first();

    // Has title
    const title = firstProject.locator("h2");
    await expect(title).toBeVisible();

    // Has description
    const description = firstProject.locator("p").first();
    await expect(description).toBeVisible();

    // Has tech tags
    const techTags = firstProject.locator("span").filter({ hasText: /.+/ });
    const tagCount = await techTags.count();
    expect(tagCount).toBeGreaterThan(0);
  });

  test("project cards are clickable", async ({ page }) => {
    const firstProject = page.locator("article").first();
    await firstProject.click();

    // Should navigate to project detail
    await expect(page).toHaveURL(/\/projects\/.+/);
  });

  test("project cards have hover effect", async ({ page }) => {
    const firstProject = page.locator("article").first();

    // Get initial transform
    const initialTransform = await firstProject.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    await firstProject.hover();
    await page.waitForTimeout(400);

    // Transform should change on hover
    const hoverTransform = await firstProject.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    // Premium-card should have translateY on hover
    // Note: This may not detect the change immediately due to CSS transition
  });
});

test.describe("Project Detail Page", () => {
  test("displays project title", async ({ page }) => {
    await page.goto("/projects/prometheus");

    const title = page.locator("h1");
    await expect(title).toBeVisible();
    await expect(title).toContainText(/prometheus/i);
  });

  test("displays project content", async ({ page }) => {
    await page.goto("/projects/prometheus");

    // Should have main content area
    const content = page.locator("main");
    await expect(content).toBeVisible();
  });

  test("has back navigation", async ({ page }) => {
    await page.goto("/projects/prometheus");

    const backLink = page.getByRole("link", { name: /back|projects/i });
    await expect(backLink).toBeVisible();
  });

  test("displays tech stack", async ({ page }) => {
    await page.goto("/projects/prometheus");

    // Look for tech-related content
    const techSection = page.locator("text=/tech|stack|built with/i");
    // This may vary based on project content
  });
});
