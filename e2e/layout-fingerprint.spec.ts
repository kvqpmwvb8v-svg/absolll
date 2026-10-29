// «Отпечаток вёрстки»: защита от случайных поломок.
// Для каждой страницы и ширины (375, 768, 1440) записывает размеры и положение шапки, main, подвала,
// первого h1, высоту страницы и наличие горизонтального скролла. Правка, которая случайно сдвинула
// вёрстку на странице, не входившей в задачу, роняет этот тест.
//
//   Создать или обновить базовую линию:  UPDATE_BASELINE=1 npx playwright test e2e/layout-fingerprint.spec.ts
//   Обновить только часть страниц:       UPDATE_BASELINE=1 ROUTES=/about npx playwright test e2e/layout-fingerprint.spec.ts
//   Обычная проверка:                    npx playwright test e2e/layout-fingerprint.spec.ts
//   Допуск в пикселях (по умолчанию 2):  LAYOUT_TOLERANCE=3
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { STATIC_ROUTES, WIDTHS, discoverDetailRoutes, selectedRoute, settle } from './_routes';

type Box = { x: number; y: number; w: number; h: number };
type Print = {
  scrollHeight: number;
  overflowX: boolean;
  h1: string | null;
  boxes: Record<string, Box | null>;
};
type Baseline = Record<string, Print>; // ключ: "<маршрут>@<ширина>"

const FILE = path.join(process.cwd(), 'docs', 'baseline', 'layout.json');
const UPDATE = process.env.UPDATE_BASELINE === '1';
const TOL = Number(process.env.LAYOUT_TOLERANCE ?? 2);
const SELECTORS = ['header', 'main', 'footer', 'h1'];

async function measure(page: Page): Promise<Print> {
  return page.evaluate((selectors) => {
    // offset* не зависят от transform и анимаций появления, в отличие от getBoundingClientRect
    const box = (el: Element | null) => {
      if (!(el instanceof HTMLElement)) return null;
      let x = 0;
      let y = 0;
      let cur: HTMLElement | null = el;
      while (cur) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    };
    const boxes: Record<string, { x: number; y: number; w: number; h: number } | null> = {};
    for (const s of selectors) boxes[s] = box(document.querySelector(s));
    return {
      scrollHeight: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelector('h1')?.textContent?.trim().replace(/\s+/g, ' ') ?? null,
      boxes,
    };
  }, SELECTORS);
}

function compare(key: string, was: Print, now: Print): string[] {
  const out: string[] = [];
  if (Math.abs(was.scrollHeight - now.scrollHeight) > TOL * 2) {
    out.push(`${key}: высота страницы ${was.scrollHeight} → ${now.scrollHeight}`);
  }
  if (was.overflowX !== now.overflowX) {
    out.push(`${key}: горизонтальный скролл ${was.overflowX} → ${now.overflowX}`);
  }
  if (was.h1 !== now.h1) {
    out.push(`${key}: h1 «${was.h1}» → «${now.h1}»`);
  }
  for (const s of SELECTORS) {
    const a = was.boxes[s];
    const b = now.boxes[s];
    if (!a || !b) {
      if (Boolean(a) !== Boolean(b)) out.push(`${key}: <${s}> ${a ? 'был' : 'не было'} → ${b ? 'есть' : 'нет'}`);
      continue;
    }
    for (const k of ['x', 'y', 'w', 'h'] as const) {
      if (Math.abs(a[k] - b[k]) > TOL) out.push(`${key}: <${s}> ${k} ${a[k]} → ${b[k]}`);
    }
  }
  return out;
}

test.use({ reducedMotion: 'reduce' });

test('отпечаток вёрстки совпадает с базовой линией', async ({ page }, testInfo) => {
  // Достаточно одного проекта Playwright: ширины задаются внутри теста.
  test.skip(testInfo.project.name !== testInfo.config.projects[0].name, 'выполняется один раз');
  test.setTimeout(240_000);

  const routes = [...STATIC_ROUTES, ...(await discoverDetailRoutes(page))].filter(selectedRoute);
  expect(routes.length, 'ROUTES не совпал ни с одним маршрутом').toBeGreaterThan(0);

  const current: Baseline = {};
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: 'load' });
      expect(response?.status() ?? 0, `${route} должен открываться`).toBeLessThan(400);
      await settle(page);
      current[`${route}@${width}`] = await measure(page);
    }
  }

  const saved: Baseline = fs.existsSync(FILE) ? (JSON.parse(fs.readFileSync(FILE, 'utf8')) as Baseline) : {};

  if (UPDATE) {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    Object.assign(saved, current);
    fs.writeFileSync(FILE, JSON.stringify(saved, null, 2) + '\n');
    console.log(`Базовая линия обновлена: ${Object.keys(current).length} записей → ${FILE}`);
    return;
  }

  expect(Object.keys(saved).length, 'нет базовой линии: запусти с UPDATE_BASELINE=1').toBeGreaterThan(0);

  const problems: string[] = [];
  const fresh: string[] = [];
  for (const [key, now] of Object.entries(current)) {
    const was = saved[key];
    if (!was) {
      fresh.push(key);
      continue;
    }
    problems.push(...compare(key, was, now));
  }
  if (fresh.length > 0) console.log('Нет в базовой линии (пропущено):\n' + fresh.join('\n'));
  expect(problems.length, 'Вёрстка изменилась:\n' + problems.join('\n')).toBe(0);
});
