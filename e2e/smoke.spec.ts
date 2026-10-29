import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/events', name: 'Events' },
  { path: '/news', name: 'News' },
  { path: '/photos', name: 'Photos' },
];

test.describe('Smoke tests', () => {
  for (const route of routes) {
    test(`${route.name} (${route.path}) returns 200`, async ({ page }) => {
      const response = await page.goto(route.path, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe('Console errors', () => {
  for (const route of routes) {
    test(`${route.name} has no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      await page.goto(route.path, { waitUntil: 'networkidle' });
      expect(errors).toEqual([]);
    });
  }
});

test.describe('No horizontal scroll at 375px', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  for (const route of routes) {
    test(`${route.name} (${route.path}) no horizontal scroll`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll).toBe(false);
    });
  }
});
