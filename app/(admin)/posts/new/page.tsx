import { useState } from "react";
import Link from "next/link";
import { Container, Section, Heading, Text, Button } from "@/components/ui";

interface PostFormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  status: "published" | "draft";
  cover: string;
}

export default function AdminPostNewPage() {
  const [form, setForm] = useState<PostFormState>({
    title: "",
    slug: "",
    description: "",
    content: "",
    status: "draft",
    cover: "/images/hero.png",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сохраняем пост
    const { savePost } = require("@/lib/content");
    // В реальном проекте здесь была бы валидация и сохранение
    setForm({
      title: "",
      slug: "",
      description: "",
      content: "",
      status: "draft",
      cover: "/images/hero.png",
    });
    alert("Пост сохранен (мок)");
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 md:p-12">
      <Container size="xl">
        <Section spacing="xl">
          <Heading as="h1" size="display-2" weight="bold" className="mb-6">
            Новый пост
          </Heading>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Заголовок
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Введите заголовок поста"
                required
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Slug (автоот генерируется из русского)
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="пример: pervaya-vstrecha"
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Text size="sm" color="muted">
                Формат: латиница, цифры, дефисы. Автоматическая транслитерация русского заголовка.
              </Text>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Краткое описание
              </label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Краткое описание для списков и превью"
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Тело поста (MDX)
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="# Введение...\n\n## Основная часть..."
                rows={10}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Text size="sm" color="muted">
                MDX формат. Запрет `import` и `export` внутри для безопасности.
              </Text>
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg">
                Опубликовать
              </Button>
              <Button type="submit" variant="secondary" size="lg" onClick={() => setForm({ ...form, status: "draft" })}>
                Сохранить как черновик
              </Button>
            </div>

            <div className="mt-6 p-4 bg-bg-secondary rounded-md">
              <Heading as="h3" size="h3" weight="bold" className="mb-2">
                Предпросмотр
              </Heading>
              <div className="prose prose-invert max-w-none">
                <p>Контент поста появится здесь после сохранения</p>
              </div>
            </div>
          </form>
        </Section>
      </Container>
    </div>
  );
}