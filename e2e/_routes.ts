// Общие помощники для e2e/layout-fingerprint.spec.ts и e2e/shots.spec.ts.
// Файл не тест (нет .spec), Playwright его сам не запускает.
import type { Page } from '@playwright/test';

export const WIDTHS = [375, 768, 1440] as const;

export const STATIC_ROUTES = ['/', '/about', '/events', '/news', '/photos', '/admin/login'];

/**
 * Фильтр маршрутов из переменной ROUTES (через запятую).
 * `ROUTES=/news` включает /news и все /news/..., `ROUTES=/` только главную.
 */
const ONLY = (process.env.ROUTES ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export function selectedRoute(route: string): boolean {
  if (ONLY.length === 0) return true;
  return ONLY.some((r) => (r === '/' ? route === '/' : route === r || route.startsWith(r + '/')));
}

/** Первая страница мероприятия и первая новость (если они есть на сайте). */
export async function discoverDetailRoutes(page: Page): Promise<string[]> {
  const found: string[] = [];
  const lists = [
    ['/events', '/events/'],
    ['/news', '/news/'],
  ] as const;
  for (const [list, prefix] of lists) {
    await page.goto(list, { waitUntil: 'load' });
    const links = page.locator(`a[href^="${prefix}"]`);
    if ((await links.count()) > 0) {
      const href = await links.first().getAttribute('href');
      if (href) found.push(href.split('#')[0].split('?')[0]);
    }
  }
  return found;
}

export function routeSlug(route: string): string {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/[^a-zA-Z0-9]+/g, '_');
}

/**
 * Привести страницу в стабильное состояние: отключить анимации, дождаться шрифтов,
 * прокрутить страницу (ленивые картинки, появление при прокрутке) и вернуться наверх.
 */
export async function settle(page: Page): Promise<void> {
  await page.addStyleTag({
    content:
      '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}',
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(window.innerHeight, 400);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}
