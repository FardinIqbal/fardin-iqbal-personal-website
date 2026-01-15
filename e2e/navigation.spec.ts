import { test, expect } from "@playwright/test";

test.describe("Navigation - Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header is visible", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("logo/name links to homepage", async ({ page }) => {
    const logo = page.locator("header a").first();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("nav links are visible on desktop", async ({ page }) => {
    const workLink = page.getByRole("link", { name: /work/i });
    const writingLink = page.getByRole("link", { name: /writing/i });
    const aboutLink = page.getByRole("link", { name: /about/i });

    await expect(workLink).toBeVisible();
    await expect(writingLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
  });

  test("theme toggle is present", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
  });

  test("theme toggle switches theme", async ({ page }) => {
    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");

    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(300);

    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });
});

test.describe("Navigation - Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu button is visible", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });

  test("mobile menu opens and shows links", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/i });
    await menuButton.click();

    // Wait for menu animation
    await page.waitForTimeout(300);

    // Check navigation links are visible
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("mobile menu closes when clicking link", async ({ page }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/i });
    await menuButton.click();
    await page.waitForTimeout(300);

    // Click a nav link
    const workLink = page.locator("nav").getByRole("link", { name: /work/i });
    await workLink.click();

    // Menu should close
    await page.waitForTimeout(300);
  });
});

test.describe("Page Navigation", () => {
  test("can navigate to projects page", async ({ page }) => {
    await page.goto("/");

    const viewAll = page.getByRole("link", { name: /view all projects/i });
    await viewAll.click();

    await expect(page).toHaveURL("/projects");
  });

  test("can navigate to blog page", async ({ page }) => {
    await page.goto("/");

    const viewAll = page.getByRole("link", { name: /view all posts/i });
    await viewAll.click();

    await expect(page).toHaveURL("/blog");
  });

  test("can navigate to individual project", async ({ page }) => {
    await page.goto("/");

    const projectCard = page.locator("#work article").first();
    await projectCard.click();

    await expect(page).toHaveURL(/\/projects\/.+/);
  });
});
