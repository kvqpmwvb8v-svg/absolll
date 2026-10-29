import { test, expect } from '@playwright/test';
import { TOTP } from 'otplib';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const TEST_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'Admin2026Secure!';
const TEST_TOTP_SECRET = process.env.TEST_TOTP_SECRET || '32KU57DC7DEQG4MVG53A6RSLDQMB2KGB';

test.describe('Admin auth flow', () => {
  test('invalid password returns 401', async ({ page }) => {
    const response = await page.request.post(`${BASE_URL}/api/admin/login`, {
      data: { password: 'wrongpassword', step: 'password' },
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Invalid password');
  });

  test('valid login flow succeeds', async ({ page }) => {
    // Use browser-based login to maintain session cookies
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle' });

    // Fill password
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('button:has-text("Продолжить к 2FA")');

    // Wait for TOTP step
    await page.waitForSelector('input[placeholder="Введите 6-значный код"]', { timeout: 5000 });

    // Generate and enter TOTP code
    const code = TOTP.generate(TEST_TOTP_SECRET);
    await page.fill('input[placeholder="Введите 6-значный код"]', code);
    await page.click('button:has-text("Войти")');

    // Should redirect to admin dashboard
    await page.waitForURL('**/admin/**', { timeout: 5000 });
    expect(page.url()).toContain('/admin/');
  });

  test('admin pages require session', async ({ page }) => {
    const routes = ['/admin/dashboard', '/admin/posts', '/admin/events'];
    for (const route of routes) {
      const response = await page.goto(`${BASE_URL}${route}`);
      // Should redirect to login
      expect(response?.status()).toBe(302);
    }
  });

  test('logout works', async ({ page }) => {
    // Login first
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle' });
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('button:has-text("Продолжить к 2FA")');
    await page.waitForSelector('input[placeholder="Введите 6-значный код"]', { timeout: 5000 });
    const code = TOTP.generate(TEST_TOTP_SECRET);
    await page.fill('input[placeholder="Введите 6-значный код"]', code);
    await page.click('button:has-text("Войти")');
    await page.waitForURL('**/admin/**', { timeout: 5000 });

    // Now test logout via API
    const logoutResponse = await page.request.post(`${BASE_URL}/api/admin/logout`);
    expect(logoutResponse.status()).toBe(200);

    // Verify session is cleared - admin pages should redirect
    const response = await page.goto(`${BASE_URL}/admin/dashboard`);
    expect(response?.status()).toBe(302);
  });
});