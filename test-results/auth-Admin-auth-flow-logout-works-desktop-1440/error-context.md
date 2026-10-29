# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Admin auth flow >> logout works
- Location: e2e/auth.spec.ts:48:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Введите 6-значный код"]') to be visible

```

# Page snapshot

```yaml
- generic [active]:
  - navigation [ref=e1]:
    - generic [ref=e3]:
      - heading "ABSOLUTI" [level=2] [ref=e4]
      - navigation [ref=e5]:
        - link "Home" [ref=e6] [cursor=pointer]:
          - /url: /
        - link "Posts" [ref=e9] [cursor=pointer]:
          - /url: /admin/posts
        - link "Events" [ref=e12] [cursor=pointer]:
          - /url: /admin/events
        - link "News" [ref=e15] [cursor=pointer]:
          - /url: /admin/news
    - generic [ref=e18]:
      - generic [ref=e20]:
        - generic [ref=e21]: Admin
        - generic [ref=e22]: A
        - button "Settings" [ref=e23] [cursor=pointer]
        - button "Logout" [ref=e24] [cursor=pointer]
      - main [ref=e25]:
        - main [ref=e26]:
          - generic [ref=e27]:
            - heading "Админ-панель" [level=2] [ref=e28]
            - paragraph [ref=e29]: Введите пароль администратора для продолжения
            - generic [ref=e30]: Invalid password
            - generic [ref=e31]:
              - generic [ref=e32]:
                - generic [ref=e33]: Пароль администратора
                - textbox "Введите пароль администратора" [ref=e34]: Admin2026Secure!
              - button "Продолжить к 2FA" [ref=e35] [cursor=pointer]
  - alert [ref=e36]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { TOTP } from 'otplib';
  3  | 
  4  | const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
  5  | const TEST_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'Admin2026Secure!';
  6  | const TEST_TOTP_SECRET = process.env.TEST_TOTP_SECRET || '32KU57DC7DEQG4MVG53A6RSLDQMB2KGB';
  7  | 
  8  | test.describe('Admin auth flow', () => {
  9  |   test('invalid password returns 401', async ({ page }) => {
  10 |     const response = await page.request.post(`${BASE_URL}/api/admin/login`, {
  11 |       data: { password: 'wrongpassword', step: 'password' },
  12 |     });
  13 |     expect(response.status()).toBe(401);
  14 |     const body = await response.json();
  15 |     expect(body.error).toBe('Invalid password');
  16 |   });
  17 | 
  18 |   test('valid login flow succeeds', async ({ page }) => {
  19 |     // Use browser-based login to maintain session cookies
  20 |     await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle' });
  21 | 
  22 |     // Fill password
  23 |     await page.fill('input[type="password"]', TEST_PASSWORD);
  24 |     await page.click('button:has-text("Продолжить к 2FA")');
  25 | 
  26 |     // Wait for TOTP step
  27 |     await page.waitForSelector('input[placeholder="Введите 6-значный код"]', { timeout: 5000 });
  28 | 
  29 |     // Generate and enter TOTP code
  30 |     const code = TOTP.now(TEST_TOTP_SECRET);
  31 |     await page.fill('input[placeholder="Введите 6-значный код"]', code);
  32 |     await page.click('button:has-text("Войти")');
  33 | 
  34 |     // Should redirect to admin dashboard
  35 |     await page.waitForURL('**/admin/**', { timeout: 5000 });
  36 |     expect(page.url()).toContain('/admin/');
  37 |   });
  38 | 
  39 |   test('admin pages require session', async ({ page }) => {
  40 |     const routes = ['/admin/dashboard', '/admin/posts', '/admin/events'];
  41 |     for (const route of routes) {
  42 |       const response = await page.goto(`${BASE_URL}${route}`);
  43 |       // Should redirect to login
  44 |       expect(response?.status()).toBe(302);
  45 |     }
  46 |   });
  47 | 
  48 |   test('logout works', async ({ page }) => {
  49 |     // Login first
  50 |     await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle' });
  51 |     await page.fill('input[type="password"]', TEST_PASSWORD);
  52 |     await page.click('button:has-text("Продолжить к 2FA")');
> 53 |     await page.waitForSelector('input[placeholder="Введите 6-значный код"]', { timeout: 5000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
  54 |     const code = TOTP.now(TEST_TOTP_SECRET);
  55 |     await page.fill('input[placeholder="Введите 6-значный код"]', code);
  56 |     await page.click('button:has-text("Войти")');
  57 |     await page.waitForURL('**/admin/**', { timeout: 5000 });
  58 | 
  59 |     // Now test logout via API
  60 |     const logoutResponse = await page.request.post(`${BASE_URL}/api/admin/logout`);
  61 |     expect(logoutResponse.status()).toBe(200);
  62 | 
  63 |     // Verify session is cleared - admin pages should redirect
  64 |     const response = await page.goto(`${BASE_URL}/admin/dashboard`);
  65 |     expect(response?.status()).toBe(302);
  66 |   });
  67 | });
```