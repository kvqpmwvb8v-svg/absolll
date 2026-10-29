import { getEvents } from "@/lib/content";
import Link from "next/link";

export default function AdminEventsPage() {
  const events = getEvents();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Мероприятия
        </h1>
        <p className="text-text-muted mt-2">
          Управление расписанием
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Всего мероприятий</p>
          <p className="text-3xl font-bold text-text-primary">
            {events.length}
          </p>
        </div>
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Предстоящие</p>
          <p className="text-3xl font-bold text-text-primary">
            {events.filter((e) => e.frontmatter.status === "upcoming").length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-4">Список мероприятий</h2>
          <ul className="space-y-3">
            {events.map((event) => (
              <li key={event.slug} className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary text-sm font-medium">
                    {event.frontmatter.title}
                  </p>
                  <p className="text-text-muted text-xs">
                    {new Date(event.frontmatter.date).toLocaleDateString("ru-RU")}
                  </p>
                </div>
                <Link
                  href={`/(admin)/events/${event.slug}/edit`}
                  className="text-primary text-sm hover:underline"
                >
                  Редактировать
                </Link>
              </li>
            ))}
            {events.length === 0 && (
              <p className="text-text-muted text-sm">Мероприятий пока нет</p>
            )}
          </ul>
        </div>

        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-4">Статусы</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="bg-green-900/20 text-green-300 border border-green-800 text-green-300 px-3 py-1 rounded text-xs uppercase">upcoming</span>
              <span className="text-text-muted text-xs block">Предстоящее</span>
            </div>
            <div>
              <span className="bg-red-900/20 text-red-300 border border-red-800 text-red-300 px-3 py-1 rounded text-xs uppercase">past</span>
              <span className="text-text-muted text-xs block">Прошедшее</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}