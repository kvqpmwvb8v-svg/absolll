import { useState } from "react";
import { Container, Section, Heading, Text, Button } from "@/components/ui";

interface EventFormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
  endDate: string;
  location: string;
  capacity: number;
  cover: string;
  registrationLink: string;
  status: "upcoming" | "ongoing" | "past" | "cancelled";
}

export default function AdminEventNewPage() {
  const [form, setForm] = useState<EventFormState>({
    title: "",
    slug: "",
    description: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    endDate: "",
    location: "",
    capacity: 0,
    cover: "/images/hero.png",
    registrationLink: "",
    status: "upcoming",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { saveEvent } = require("@/lib/content");
    setForm({
      title: "",
      slug: "",
      description: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      endDate: "",
      location: "",
      capacity: 0,
      cover: "/images/hero.png",
      registrationLink: "",
      status: "upcoming",
    });
    alert("Мероприятие сохранено (мок)");
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 md:p-12">
      <Container size="xl">
        <Section spacing="xl">
          <Heading as="h1" size="display-2" weight="bold" className="mb-6">
            Новое мероприятие
          </Heading>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Название
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Введите название мероприятия"
                required
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="primer-meropriyatiya"
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Дата начала
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Дата окончания (опционально)
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Место
              </label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Москва, ул. Пример, 1"
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Вместимость
                </label>
                <input
                  type="number"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Ссылка на регистрацию
                </label>
                <input
                  value={form.registrationLink}
                  onChange={(e) => setForm({ ...form, registrationLink: e.target.value })}
                  placeholder="https://example.com/register"
                  className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Описание
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Краткое описание для списков"
                rows={3}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Полное описание (MDX)
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="# Программа...\n\n## Подробности..."
                rows={8}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">
                Статус
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as EventFormState["status"] })}
                className="w-full bg-bg-secondary border border-border rounded-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="upcoming">Предстоящее</option>
                <option value="ongoing">Проходит сейчас</option>
                <option value="past">Прошедшее</option>
                <option value="cancelled">Отменено</option>
              </select>
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg">
                Сохранить
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={() => setForm({ ...form, status: "upcoming" })}>
                Сбросить
              </Button>
            </div>
          </form>
        </Section>
      </Container>
    </div>
  );
}