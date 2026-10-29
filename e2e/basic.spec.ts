import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ABSOLUTI/);
});

test('admin login page loads', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.locator('h2:has-text("Админ-панель")')).toBeVisible();
});
