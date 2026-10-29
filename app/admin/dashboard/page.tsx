import { getPosts, getEvents, getPostDrafts } from "@/lib/content";
import Link from "next/link";

export default function AdminDashboard() {
  const posts = getPosts();
  const drafts = getPostDrafts();
  const events = getEvents();
  const upcoming = events.filter((e) => e.frontmatter.status === "upcoming");
  const published = posts.filter((p) => p.frontmatter.status === "published");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Дашборд
        </h1>
        <p className="text-text-muted mt-2">
          Обзор контента и быстрые действия
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Опубликовано постов</p>
          <p className="text-3xl font-bold text-text-primary">
            {published.length}
          </p>
        </div>
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Черновики</p>
          <p className="text-3xl font-bold text-text-primary">
            {drafts.length}
          </p>
        </div>
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Всего мероприятий</p>
          <p className="text-3xl font-bold text-text-primary">
            {events.length}
          </p>
        </div>
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Предстоящие</p>
          <p className="text-3xl font-bold text-text-primary">
            {upcoming.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-4">Быстрые действия</h2>
          <div className="space-y-3">
            <Link
              href="/(admin)/posts/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-primary transition-colors"
            >
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-text-primary">Новый пост</span>
            </Link>
            <Link
              href="/(admin)/events/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary hover:bg-bg-primary transition-colors"
            >
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-text-primary">Новое мероприятие</span>
            </Link>
          </div>
        </div>

        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-4">Последние посты</h2>
          <ul className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <li key={post.slug} className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary text-sm font-medium">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-text-muted text-xs">
                    {post.frontmatter.status} · {post.frontmatter.date}
                  </p>
                </div>
                <Link
                  href={`/(admin)/posts/${post.slug}/edit`}
                  className="text-primary text-sm hover:underline"
                >
                  Редактировать
                </Link>
              </li>
            ))}
            {posts.length === 0 && (
              <p className="text-text-muted text-sm">Постов пока нет</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}