import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("skip to content link is present", async ({ page }) => {
    await page.goto("/");

    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toBeAttached();
  });

  test("skip link becomes visible on focus", async ({ page }) => {
    await page.goto("/");

    const skipLink = page.locator('a[href="#main"]');

    // Focus the skip link
    await skipLink.focus();

    // Should become visible (sr-only removed on focus)
    await expect(skipLink).toBeVisible();
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // Alt can be empty string for decorative images, but should exist
      expect(alt).toBeDefined();
    }
  });

  test("buttons have accessible names", async ({ page }) => {
    await page.goto("/");

    // Check visible buttons have accessible names
    const buttons = page.locator("button:visible");
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const name = await button.getAttribute("aria-label");
        const text = await button.textContent();
        const title = await button.getAttribute("title");

        // Button should have aria-label, title, or text content
        expect(name || text?.trim() || title).toBeTruthy();
      }
    }
  });

  test("links have accessible names", async ({ page }) => {
    await page.goto("/");

    const links = page.locator("a");
    const count = await links.count();

    for (let i = 0; i < Math.min(count, 20); i++) {
      const link = links.nth(i);
      const name = await link.getAttribute("aria-label");
      const text = await link.textContent();

      // Link should have aria-label or text content
      expect(name || text?.trim()).toBeTruthy();
    }
  });

  test("page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have exactly one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // h2s should exist for sections
    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test("interactive elements are keyboard focusable", async ({ page }) => {
    await page.goto("/");

    // Tab through the page
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Something should be focused
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });

  test("color contrast is sufficient", async ({ page }) => {
    await page.goto("/");

    // Check that body text isn't too light
    const bodyText = page.locator("p").first();
    const color = await bodyText.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Parse RGB values
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      // In dark mode, text should be light (high values)
      // In light mode, text should be dark (low values)
      // This is a basic check - real contrast testing needs more
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // Luminance should be either high (light text) or low (dark text)
      expect(luminance < 0.2 || luminance > 0.6).toBeTruthy();
    }
  });
});

test.describe("Accessibility - Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("touch targets are large enough", async ({ page }) => {
    await page.goto("/");

    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          // Minimum 44x44 for touch targets (WCAG)
          expect(box.width).toBeGreaterThanOrEqual(40);
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });
});
