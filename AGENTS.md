# AGENTS.md — Modern Historical Society Site

## Стек технологий
- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI:** React 19, Tailwind CSS 3
- **Auth:** iron-session, otplib for TOTP
- **Content:** MDX files in `/content`
- **Forms:** react-hook-form, Zod validation
- **Testing:** Playwright E2E

## Команды проекта
```bash
# Разработка
npm run dev          # Start dev server at http://localhost:3000

# Проверки (базовый набор перед каждым коммитом)
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run build        # Next.js build

# E2E тесты
npx playwright test  # Run all Playwright tests

# Production режим
npm start            # Start production server
```

## Структура папок
```
app/              # Next.js App Router
  (site)/         # Public pages: /, /about, /events, /news, /photos
  admin/          # Admin panel: /admin/login, /admin/dashboard, /admin/posts, /admin/events, /admin/news
  api/            # API routes, включая /api/admin/login

components/       # React components
content/          # MDX контент: posts, events
lib/              # Утилиты и helpers
docs/             # Документация проекта
  PROGRESS.md     # Фазы и текущий статус
  TOOLS.md        # Карта задач и агентов
  design-brief.md   # Дизайно-бриф (фаза 3)
  FINAL.md        # Итоговый отчет (фаза 8)
```

## Правила проекта
- **Секреты:** Никогда не коммитить реальные секреты. `.env*` файлы в `.gitignore`.
- **Форматы контента:** Тексты, даты и события берутся из `/content`. Где данных нет — явные заглушки.
- **Язык:** Интерфейс и контент на русском языке (`lang="ru"`).
- **Типизация:** Всегда TypeScript. `npm run typecheck` должен проходить без ошибок.
- **Дизайн:** Editorial minimalism. Без градиентов, неоновых теней, стоковых карточек и эмодзи-иконок.
- **Доступность:** WCAG 2.2 AA, контраст не ниже AA, `alt` у всех изображений, `lang="ru"`,.skip-link.

## Переменные окружения (.env)
Создай `.env.local` на основе `.env.example`. Обязательные переменные:

```
ADMIN_PASSWORD_HASH=$2b$12$<реальный-хэш-bcrypt>
ADMIN_TOTP_SECRET=<ваш-секрет-20-символов>
ADMIN_SESSION_PASSWORD=<ключ-для-iron-session минимум 32 символа>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Как сгенерировать хэш и секрет (инструкция):**

```bash
# 1. Генерация bcrypt хеша пароля администратора
# Используйте Node.js:
node -e "
const bcrypt = require('bcrypt');
const password = 'ваш-пароль';  // например admin123 (только для разработки)
bcrypt.hash(password, 12, (err, hash) => {
  if (err) throw err;
  console.log('ADMIN_PASSWORD_HASH=' + hash);
});
"

# 2. Генерация TOTP секрета
node -e "
const { generateSecret } = require('otplib');
const secret = generateSecret({ length: 20 });
console.log('ADMIN_TOTP_SECRET=' + secret);
"
```

**Где что положено:**
- `ADMIN_PASSWORD_HASH` — в `.env` (не в git!). Хранится хеш bcrypt пароля.
- `ADMIN_TOTP_SECRET` — в `.env`, генерация настоящего секрета (не `JBSWY3DPEXAMPLE`).
- `ADMIN_SESSION_PASSWORD` — ключ для iron-session cookie, минимум 32 символа.
- `NEXT_PUBLIC_SITE_URL` — базовый URL сайта для OpenGraph и sitemap.

## Деплой
На данный момент деплой не выбран. Возможные варианты:
- **VPS + файловое хранилище** — для полного контроля над данными и админкой
- **Vercel/Netlify** — удобно для Next.js, но запись в файлы недоступна
- **Turso/Postgres + Drizzle/Prisma** — для serverless с базой данных

После решения обновify `docs/PROGRESS.md` и настройте соответствующий слой доступа.

## Playwright настройка
```bash
npm i -D @playwright/test
npx playwright install chromium
```

Конфиг `playwright.config.ts` настраивает:
- Базовый URL: `http://localhost:3000` (dev) или production URL
- Проекты: 375, 768, 1440 px (мобильные и десктопные ширины)
- `webServer`: перезапуск сервера для тестов

## Агенты и скиллы
Смотрите `docs/TOOLS.md` для карты задач и агентов/скиллов.
Ключевые роли:
- `code-review`: ревью кода на correctness, simplification, efficiency
- `security-review`: безопасность: авторизация, секреты, инъекции, XSS, CSRF
- `typescript/nextjs`: TypeScript, Next.js, границы server/client
- `build-fix`: ошибки сборки
- `e2e-тесты`: Playwright, обход маршрутов, скриншоты
- `a11y`: доступность, WCAG, контрастность
- `seo`: SEO-анализ, meta, schema, Core Web Vitals
- `design-reviewer`: визуальный дизайн, цветовая палитра, отступы
- `performance`: производительность, ботлнеки, оптимизация
- `doc-updater`: документация, кодомапы, руководства