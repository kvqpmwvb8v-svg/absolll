# docs/TOOLS.md — Карта задач и агентов/скиллов

| Задача | Агент/Скилл | Почему |
|---|---|---|
| **Code review** (поиск багов, упрощение, переиспользование) | `ecc:code-reviewer` | Экспертный ревью с фокусом на качество, безопасность и поддерживаемость кода |
| **TypeScript / Next.js проверка** | `ecc:typescript-reviewer` | Типобезопасность, async correctness, границы server/client, риски hydration mismatch |
| **Security review (admin panel)** | `ecc:security-reviewer` | Пароли, TOTP, session security, rate limiting, CSRF, секреты в клиентский код |
| **Build error resolution** | `ecc:build-error-resolver` | Исправление ошибок сборки TypeScript, Next.js, Tailwind с минимальными изменениями |
| **E2E тесты (Playwright)** | `ecc:e2e-runner` | Обход маршрутов на разных ширинах экрана, скриншоты, битые ссылки, авторизация |
| **Доступность (a11y)** | `ecc:frontend-a11y` | WCAG 2.2 compliance, доступность компонентов, ARIA, контрастность |
| **SEO аудит** | `ecc:seo-specialist` | Технический SEO, структурированные данные, meta tags, Core Web Vitals |
| **Дизайн-ревью** | `frontend-design` | Визуальный дизайн, цветовая палитра, отступы, иерархия, темная тема |
| **Производительность** | `ecc:performance-optimizer` | Ботлнеки, размер бандла, оптимизация изображений, ленивая загрузка |
| **Документация** | `ecc:doc-updater` | Обновление README, CODEMAPs,guides, документация по API |
| **Инвентаризация проекта** | `Plan` | Карта проекта, маршруты, дубли стилей, мертвый код, чтение контента |
| **Настройка окружения** | `init` | Переменные окружения (.env), секреты, игнорирование в git |
| **Ответ на вопрос деплоя** | — | По умолчанию: VPS + файловое хранилище за интерфейсом ContentRepository |

## Роли агентов (из `docs/TOOLS.md`)

- **code-review**: Ревью кода на correctness, simplification, efficiency
- **security-review**: Безопасность: авторизация, секреты, инъекции, XSS, CSRF
- **typescript/nextjs**: TypeScriptNext.js, границы роуминга, хуки, любые ошибки
- **build-fix**: Ошибки `npm run build`, `tsc`, `lint`
- **e2e-тесты**: Playwright, обход всех маршрутов, скриншоты
- **a11y**: Доступность, WCAG, контраст, ARIA
- **seo**: SEO-анализ, meta, schema, Core Web Vitals
- **design-reviewer**: Дизайн-ревью (проектный агент из `.claude/agents/`)
- **performance**: Производительность, ботлнеки, оптимизация
- **doc-updater**: Документация, кодомапы, руководства