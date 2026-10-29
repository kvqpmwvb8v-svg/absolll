// Скриншоты всех страниц на 375, 768 и 1440 px (для сравнения «до/после» и ревью глазами).
//   SHOTS_DIR=docs/screenshots/3r-before npx playwright test e2e/shots.spec.ts
//   Только часть страниц: ROUTES=/about,/news
import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { STATIC_ROUTES, WIDTHS, discoverDetailRoutes, routeSlug, selectedRoute, settle } from './_routes';

const DIR = path.resolve(process.cwd(), process.env.SHOTS_DIR ?? 'docs/screenshots/manual');

test.use({ reducedMotion: 'reduce' });

test('скриншоты всех страниц', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== testInfo.config.projects[0].name, 'выполняется один раз');
  test.setTimeout(240_000);

  fs.mkdirSync(DIR, { recursive: true });
  const routes = [...STATIC_ROUTES, ...(await discoverDetailRoutes(page))].filter(selectedRoute);

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route, { waitUntil: 'load' });
      await settle(page);
      await page.screenshot({ path: path.join(DIR, `${routeSlug(route)}-${width}.png`), fullPage: true });
    }
  }
  console.log(`Скриншоты сохранены: ${DIR}`);
});
