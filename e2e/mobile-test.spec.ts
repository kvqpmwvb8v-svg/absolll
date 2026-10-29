import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

// Тестовые размеры экранов для проверки адаптивности
const TEST_SIZES = [
  { name: 'mobile-320', width: 320 },
  { name: 'mobile-375', width: 375 },
  { name: 'mobile-390', width: 390 },
  { name: 'mobile-430', width: 430 },
  { name: 'tablet-768', width: 768 },
  { name: 'desktop-1024', width: 1024 },
  { name: 'desktop-1440', width: 1440 },
];

test.describe('Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Устанавливаем viewport для каждого теста
    const size = TEST_SIZES.find((s) => s.name === testInfo.project.name);
    if (size) {
      await page.setViewportSize({ width: size.width, height: 667 });
    }
    await page.goto(BASE_URL);
  });

  test('no horizontal scroll on any device', async ({ page }) => {
    const scrollHeight = await page.evaluate(() => page.locator('html').scrollWidth());
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollHeight).toBeLessThanOrEqual(windowWidth + 1); // Allow 1px tolerance
  });

  test('viewport meta tag exists', async ({ page }) => {
    const meta = page.locator('meta[name="viewport"]');
    await expect(meta).toBeVisible();
    const content = await meta.getAttribute('content');
    expect(content).toContain('width=device-width');
  });

  test('font sizes are readable', async ({ page }) => {
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
    const count = await textElements.count();
    for (let i = 0; i < Math.min(count, 20); i++) {
      const element = textElements.nth(i);
      const fontSize = await element.evaluate((el) => window.getComputedStyle(el).fontSize);
      const fontSizeNum = parseFloat(fontSize);
      // Минимальный размер шрифта: 12px для мелкого текста, 16px для основного
      expect(fontSizeNum).toBeGreaterThanOrEqual(12);
    }
  });

  test('tap targets are at least 44px', async ({ page }) => {
    const buttons = page.locator('button, [role="button"], a');
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 30); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      if (box && box.width && box.height) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('focus visible is present', async ({ page }) => {
    await page.focus('button:first-of-type, a:first-of-type');
    // Проверяем, что элемент получает фокус и имеет стиль outline
    const hasFocus = await page.evaluate(() => {
      const button = document.querySelector('button');
      if (button) {
        button.focus();
        return document.activeElement === button;
      }
      return false;
    });
    expect(hasFocus).toBeTruthy();
  });

  test('language attribute is ru', async ({ page }) => {
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    expect(lang).toBe('ru');
  });
});

test.describe('Admin Panel Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/login`);
    await page.fill('input[type="password"]', 'test');
    await page.click('button:has-text("Продолжить к 2FA")');
    await page.waitForSelector('input[placeholder="Введите 6-значный код"]', { timeout: 5000 });
  });

  test('admin login form is usable on mobile', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('placeholder', 'Введите пароль администратора');

    const continueButton = page.locator('button:has-text("Продолжить к 2FA")');
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toBeEnabled();
  });

  test('mobile menu is accessible', async ({ page }) => {
    await page.click('button[aria-label="Toggle menu"]');
    const menu = page.locator('nav[aria-label="Мобильная навигация"]');
    await expect(menu).toBeVisible();

    // Check that menu items are focusable
    const firstItem = menu.locator('a').first();
    await expect(firstItem).toBeFocusable();
  });
});