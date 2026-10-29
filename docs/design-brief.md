# Design Brief — ABSOLUTI Historical Club

## Audience
Researchers, history enthusiasts, cultural intellectuals. People who value deep, well-researched content over quick AI-generated summaries. Primary language: Russian. Audience appreciates seriousness without pretension.

## Tone
Historical, serious, editorial, minimalist. No pop culture references, no AI hype, no tech bro language. "Without pomposity" — substantial but accessible.

## 3–5 Words of Aesthetics
- editorial minimalism
- editorial seriousness
- timeless typography
- organic structure
- restrained elegance

## What NOT to do
- ❌ Градиенты (gradients)
- ❌ Неоновые тени (neon shadows)
- ❌ Стоковые карточки (stock cards)
- ❌ Эмодзи-иконки (emoji icons)
- ❌ All-caps labels without reason
- ❌ Устройство «А · Б · C» через точки (A · B · C)
- ❌ Tracked-out ALL-CAPS eyebrow labels

## Typography
- **Headings**: expressive serif with Cyrillic support
  - Candidates: Cormorant Garamond, Playfair Display, Literata, Source Serif 4
  - Must support: lat + cyrillic subsets
- **Body text**: readable sans-serif or serif
  - Candidates: PT Serif, Onest, Inter
  - Must support: lat + cyrillic subsets

## Color System (Tokens)
- Фон (primary): deep dark, editorial — #0A0A0F или близкий
- Фон (secondary): slightly lighter — #12121A
- Фон (tertiary): accent area — #1A1A24
- Текст (primary): light on dark — #E8E8F0
- Текст (muted): secondary text — #737383
- Акцент: глубокий зеленый — #0F766E (из текущей конфигурации, подтверждается)
- Линии/разделители: #2A2A3A

## Layout
- Grid 4/8 px per brief
- Ширина контейнера: умеренная, для читаемости текста
- Выравнивание: левое или justified для статей, центр для хэдеров
- Нет горизонтального скролла

## Required Components
- Container, Section, Heading, Text
- Button: primary/secondary/ghost
- Link
- Card (для фото/контента)
- Tag
- Divider
- Prose (для MDX контента)
- Header с мобильным меню
- Footer
- Breadcrumbs
- EmptyState
- Skeleton

## States (all pages)
- hover, focus-visible, active, disabled
- empty, loading, error
- Анимации: сдержанные, prefers-reduced-motion

## Design Principle
Один продукт: одинаковые отступы, заголовки, кнопки, ссылки по всем страницам.
Нет стилей «на одну страницу». Контраст не ниже AA.
