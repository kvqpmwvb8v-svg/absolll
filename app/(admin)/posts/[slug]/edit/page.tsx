import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, Heading, Text, Button } from "@/components/ui";
import { getPostBySlug, savePost } from "@/lib/content";

interface PostFormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  status: "published" | "draft";
  cover: string;
}

export default function AdminPostEditPage() {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");

  // Extract slug from URL path (next/[slug] format)
  // In production, we'd get this from the router params

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
    try {
      savePost(form.slug, form);
      router.push("/admin/posts");
      alert("Пост успешно сохранен!");
    } catch (error) {
      alert("Ошибка при сохранении: " + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 md:p-12">
      <Container size="xl">
        <Section spacing="xl">
          <Heading as="h1" size="display-2" weight="bold" className="mb-6">
            Редактировать пост
          </Heading>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Заголовок
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Slug
              </label>
              <input
                value={form.slug || slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Text size="sm" color="muted">
                Автоматически генерируется из заголовка при сохранении
              </Text>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Краткое описание
              </label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                rows={10}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Text size="sm" color="muted">
                MDX формат. Запрет `import` и `export` внутри для безопасности.
              </Text>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Статус
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as PostFormState["status"] })}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="published">Опубликовано</option>
                <option value="draft">Черновик</option>
              </select>
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg">
                Сохранить изменения
              </Button>
              <Button onClick={() => router.push("/admin/posts")} variant="ghost" size="lg">
                Отмена
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