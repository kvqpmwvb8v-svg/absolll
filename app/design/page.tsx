"use client";

import { Container, Section, Heading, Text, Button, Card, Tag, Divider, Tag as TagComponent, Skeleton, EmptyState, Link as LinkComponent } from "@/components/ui";

export default function DesignPage() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <>
      <Section spacing="xl" className="pt-16 md:pt-24">
        <Container size="xl">
          <Heading as="h1" size="display-1" weight="bold" className="mb-4 tracking-tight">
            Дизайн-система ABSOLUTI
          </Heading>
          <Text size="lg" color="muted" className="mb-12">
            Витрина компонентов и токенов дизайна. Только в dev режиме.
          </Text>

          {/* Color Palette */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Цветовая палитра
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card variant="bordered" padding="md" className="bg-bg-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-bg-primary border border-border" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">bg-primary</Text>
                    <Text color="subtle" size="xs">#0A0A0F</Text>
                  </div>
                </div>
              </Card>
              <Card variant="bordered" padding="md" className="bg-bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-bg-secondary border border-border" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">bg-secondary</Text>
                    <Text color="subtle" size="xs">#12121A</Text>
                  </div>
                </div>
              </Card>
              <Card variant="bordered" padding="md" className="bg-bg-tertiary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-bg-tertiary border border-border" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">bg-tertiary</Text>
                    <Text color="subtle" size="xs">#1A1A24</Text>
                  </div>
                </div>
              </Card>
              <Card variant="bordered" padding="md" className="bg-accent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-accent" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">accent</Text>
                    <Text color="bg-primary/70" size="xs">#0F766E</Text>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="bordered" padding="md" className="bg-bg-primary border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-bg-primary border border-border" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">text-primary</Text>
                    <Text color="subtle" size="xs">#E8E8F0</Text>
                  </div>
                </div>
              </Card>
              <Card variant="bordered" padding="md" className="bg-bg-primary border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-text-muted/20 border border-border" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">text-muted</Text>
                    <Text color="subtle" size="xs">#737383</Text>
                  </div>
                </div>
              </Card>
              <Card variant="bordered" padding="md" className="bg-bg-primary border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-border border border-border" />
                  <div>
                    <Text weight="medium" color="primary" size="sm">border</Text>
                    <Text color="subtle" size="xs">#2A2A3A</Text>
                  </div>
                </div>
              </Card>
            </div>
          </Section>

          {/* Typography */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Типографика
            </Heading>
            <div className="space-y-8">
              <div>
                <Text size="sm" color="subtle" className="mb-2 uppercase tracking-wider">Display-1 — Заголовок героя</Text>
                <Heading as="h1" size="display-1" weight="bold" className="tracking-wider">
                  ABSOLUTI — Исторический клуб
                </Heading>
              </div>
              <div>
                <Text size="sm" color="subtle" className="mb-2 uppercase tracking-wider">Display-2 — Заголовок секции</Text>
                <Heading as="h2" size="display-2" weight="bold" className="tracking-tight">
                  Современное историческое общество
                </Heading>
              </div>
              <div>
                <Text size="sm" color="subtle" className="mb-2 uppercase tracking-wider">Display-3 / H2 — Заголовок статьи</Text>
                <Heading as="h2" size="display-3" weight="bold">
                  Почему история важна сейчас
                </Heading>
              </div>
              <div>
                <Text size="sm" color="subtle" className="mb-2 uppercase tracking-wider">H3 — Подзаголовок</Text>
                <Heading as="h3" size="h3" weight="bold">
                  Проблема поверхностного знания
                </Heading>
              </div>
              <div>
                <Text size="sm" color="subtle" className="mb-2 uppercase tracking-wider">Body — Основной текст</Text>
                <Text size="lg" color="muted" leading="relaxed" className="max-w-2xl">
                  Современное Историческое Общество объединяет исследователей, энтузиастов и всех, кто ценит истинную историю. Мы стремимся сделать историю доступной, увлекательной и отказываемся от шаблонных формул.
                </Text>
              </div>
              <div>
                <Text size="sm" color="subtle" className="mb-2 uppercase tracking-wider">Text small muted — Второстепенный текст</Text>
                <Text size="sm" color="subtle" leading="relaxed">
                  Последнее обновление: 15 января 2024
                </Text>
              </div>
            </div>
          </Section>

          {/* Buttons */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Кнопки
            </Heading>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md">Primary</Button>
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="ghost" size="md">Ghost</Button>
              <Button variant="outline" size="md">Outline</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" loading>Loading</Button>
            </div>
          </Section>

          {/* Links */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Ссылки
            </Heading>
            <div className="flex flex-wrap gap-6 items-center">
              <LinkComponent href="#" variant="default" underline="hover">Default link</LinkComponent>
              <LinkComponent href="#" variant="muted" underline="hover">Muted link</LinkComponent>
              <LinkComponent href="#" variant="accent" underline="hover">Accent link</LinkComponent>
              <LinkComponent href="#" variant="default" underline="never">No underline</LinkComponent>
            </div>
          </Section>

          {/* Cards */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Карточки
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="bordered" padding="lg" hover>
                <Heading as="h3" size="h3" weight="bold" className="mb-3">Card с ховером</Heading>
                <Text color="muted">Наведите курсор, чтобы увидеть эффект подсветки акцентом.</Text>
              </Card>
              <Card variant="bordered" padding="lg">
                <Heading as="h3" size="h3" weight="bold" className="mb-3">Обычная карточка</Heading>
                <Text color="muted">Карточка без ховер-эффекта для статического контента.</Text>
              </Card>
              <Card variant="elevated" padding="lg">
                <Heading as="h3" size="h3" weight="bold" className="mb-3">Elevated</Heading>
                <Text color="muted">Карточка с повышенной визуальной иерархией.</Text>
              </Card>
              <Card variant="bordered" padding="lg" className="overflow-hidden">
                <div className="aspect-video bg-bg-tertiary mb-4" />
                <Heading as="h3" size="h3" weight="bold" className="mb-3">Карточка с изображением</Heading>
                <Text color="muted">Для мероприятий, новостей и фото.</Text>
              </Card>
            </div>
          </Section>

          {/* Tags */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Теги
            </Heading>
            <div className="flex flex-wrap gap-3">
              <TagComponent variant="default" size="md">Default</TagComponent>
              <TagComponent variant="accent" size="md">Accent</TagComponent>
              <TagComponent variant="muted" size="md">Muted</TagComponent>
              <TagComponent variant="success" size="md">Success</TagComponent>
              <TagComponent variant="warning" size="md">Warning</TagComponent>
              <TagComponent variant="error" size="md">Error</TagComponent>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <TagComponent variant="accent" size="sm">Small accent</TagComponent>
              <TagComponent variant="muted" size="sm">Small muted</TagComponent>
            </div>
          </Section>

          {/* Dividers */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Разделители
            </Heading>
            <div className="space-y-4">
              <Divider variant="default" size="md" />
              <Divider variant="subtle" size="md" />
              <Divider variant="accent" size="md" />
              <Divider variant="default" size="lg" />
            </div>
          </Section>

          {/* Form Elements (demo) */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Состояния форм (демо)
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
              <div className="space-y-2">
                <Text size="sm" weight="medium" color="primary">Default</Text>
                <input type="text" className="w-full bg-bg-secondary border border-border rounded-none px-4 py-2 text-text-primary placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" placeholder="Введите текст" />
              </div>
              <div className="space-y-2">
                <Text size="sm" weight="medium" color="primary">Error</Text>
                <input type="text" className="w-full bg-bg-secondary border border-red-500 rounded-none px-4 py-2 text-text-primary placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Ошибка" />
                <Text size="xs" color="error">Сообщение об ошибке</Text>
              </div>
              <div className="space-y-2">
                <Text size="sm" weight="medium" color="primary">Disabled</Text>
                <input type="text" disabled className="w-full bg-bg-tertiary border border-border/50 rounded-none px-4 py-2 text-text-subtle" placeholder="Недоступно" />
              </div>
            </div>
          </Section>

          {/* Skeleton */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Скелетоны (загрузка)
            </Heading>
            <div className="space-y-4 max-w-xl">
              <Skeleton variant="text" lines={3} />
              <Skeleton variant="card" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <Skeleton variant="text" lines={2} width="80%" />
              </div>
            </div>
          </Section>

          {/* EmptyState */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Пустое состояние
            </Heading>
            <EmptyState
              title="Пока нет данных"
              description="Контент появится здесь, когда вы его добавите."
              action={{ label: "Добавить", href: "#", variant: "primary" }}
            />
          </Section>

          {/* Footer */}
          <Section spacing="none">
            <Divider variant="subtle" className="mb-8" />
            <Text color="subtle" size="sm" className="text-center">
              Дизайн-бриф: editorial minimalism. Цвета: #0A0A0F, #12121A, #1A1A24, #E8E8F0, #737383, #0F766E
            </Text>
          </Section>
        </Container>
      </Section>
    </>
  );
}