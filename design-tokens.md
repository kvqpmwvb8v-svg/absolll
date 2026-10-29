# Design Tokens — ABSOLUTI

## Цвета (Color Tokens)
Следует текущей конфигурации Tailwind, подтвержденной brief:

- `color-bg-primary`: `#0A0A0F` — основной фон (deep dark, editorial)
- `color-bg-secondary`: `#12121A` — вторичный фон
- `color-bg-tertiary`: `#1A1A24` — область акцентов
- `color-text-primary`: `#E8E8F0` — основной текст
- `color-text-muted`: `#737383` — вторичный текст
- `color-text-subtle`: `#5A5A6E` — приглушенный текст
- `color-accent`: `#0F766E` — акцентный зеленый
- `color-border`: `#2A2A3A` — линии и рамки
- `color-border-light`: `#3A3A4A` — легкие границы

## Типографика (Typography)

### Шрифты
- **Display/Headings**: expressive serif с поддержкой кириллицы
  - Рекомендация: `Cormorant Garamond`, `Playfair Display`, или `Literata`
  - В `next/font`: `font-family: 'Cormorant Garamond', serif;`
  - `subsets: ['latin', 'cyrillic']`
  
- **Body/Text**: читаемый шрифт
  - Рекомендация: `Inter`, `PT Serif`, или `Onest`
  - В `next/font`: `font-family: 'Inter', system-ui, sans-serif;`
  - `subsets: ['latin', 'cyrillic']`

### Шкала размеров (от brief: less than 80 chars line length)
- `text-[clamp(1rem,1.5vw,1.25rem)]` с `line-height: 1.6` — body
- `text-[clamp(2rem,4vw,3rem)]` с `line-height: 1.3` — display-2
- `text-[clamp(3rem,6vw,5rem)]` с `line-height: 1.1` — display-1
- Letterspacing: `-0.02em` для display, `-0.01em` для display-2

## Отступы (Spacing)
- Grid: 4/8 px система
- `px-4`, `px-6`, `px-8` — горизонтальные отступы
- `py-4`, `py-6`, `py-8` — вертикальные отступы секций
- `gap-2`, `gap-4`, `gap-6` — между элементами
- `section`: `py-12 md:py-20 lg:py-24` (из текущего tailwind.config)

## Радиусы (Radii)
- `none: "0"` — минимальное округление per brief
- `sm: "0.125rem"` — легкое сглаживание
- `md: "0.25rem"` — стандартный
- `lg: "0.5rem"` — если нужен

## Тени (Shadows)
- `soft: "0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)"` — мягкая тень
- `none: "none"` — когда не нужно

## Переходы (Transitions)
- `DEFAULT: "color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease"` — основной
- `subtle: "color 0.3s ease, background-color 0.3s ease"` — деликатный

## Z-Index
Значения не заданы explicitly — editorial дизайн обычно не нуждается в сложном z-index.
Использовать только когда действительно нужно (модалки, выпадающие меню).

## Принципы компоновки (Layout Principles)
1. **Max-width**: контент не должен быть шире 60-70 символов для комфортного чтения
2. **Margin**: левое_margin важнее центра — легче читать при следовании взглядом
3. **Vertical rhythm**: строгая Baseline grid на основе line-height
4. **No horizontal scroll**: проверять на всех width (375, 768, 1440)
5. **Content-first**: отступы и сетка служат контенту, не наоборот

## Required Components (Token-Mapped)
| Component | Token Mapping |
|-----------|--------------|
| `Container` | `max-w-4xl mx-auto px-6` |
| `Section` | `py-12 md:py-20 lg:py-24` + `container` |
| `Heading` (h1-h6) | `font-display font-bold tracking-tighter text-text-primary` |
| `Text` | `leading-relaxed text-text-muted` |
| `Button` (primary) | `bg-accent text-bg-primary hover:bg-bg-secondary hover:text-text-primary` |
| `Button` (secondary) | `bg-bg-secondary text-text-primary hover:bg-accent hover:text-bg-primary` |
| `Button` (ghost) | `bg-transparent text-text-primary hover:bg-bg-secondary hover:text-accent` |
| `Link` | `text-accent hover:underline` |
| `Card` | `bg-bg-secondary backdrop-blur-sm border border-border rounded-none p-6` |
| `Tag` | `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-bg-tertiary text-accent` |
| `Divider` | `border-t border-border my-8` |
| `Prose` | для MDX: `max-w-prose mx-auto` + стандартные стили prose |
| `Header` | мобильное меню, логотип, навигация |
| `Footer` | нижний колонтитул, ссылки, копирайт |
| `Breadcrumbs` | цепочка навигации, мелким шрифтом |
| `EmptyState` | состояние без контента с explanatory текстом |
| `Skeleton` | placeholders для контента в loading состоянии |

## States (all components)
- `:hover` — минимальное изменение (цвет или hover-bg)
- `:focus-visible` — `ring-2 ring-accent/20 ring-offset-2`
- `:active` — состояние нажатия
- `:disabled` — opacity-50, cursor-not-allowed
- `empty` — EmptyState с текстом-приглашением
- `loading` — Skeleton или.spinner
- `error` — сообщение с объяснением, что пошло не так

## Анимация (Animation Principles)
1. **One orchestrated moment** per page — fade-and-slide-up при загрузке, а не на каждый элемент
2. **Person-initiated transitions** welcome — кнопка→состояние, expanding card
3. **Reduced motion respected** — `prefers-reduced-motion` отключает анимации
4. **Motion answers action** — показывает, что изменилось

## Резюме уникальности этого brief
- Запрет градиентов, неонов, стоковых карточек, эмодзи
- Serif заголовки с поддержкой кириллицы
- Deep dark palette с единственным акцентом зеленого
- Editorial minimalism без шаблонных элементов
- Grid 4/8 px, без радиусов везде (none)
- Запрет ALL-CAPS eyebrow labels и пунктирных рамок «A · B · C»
