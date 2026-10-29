import { getPosts, getPostDrafts } from "@/lib/content";
import Link from "next/link";

export default function AdminPostsPage() {
  const posts = getPosts();
  const drafts = getPostDrafts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Посты
        </h1>
        <p className="text-text-muted mt-2">
          Управление публикациями
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Опубликовано постов</p>
          <p className="text-3xl font-bold text-text-primary">
            {posts.length}
          </p>
        </div>
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <p className="text-text-muted text-sm mb-2">Черновики</p>
          <p className="text-3xl font-bold text-text-primary">
            {drafts.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-4">Список постов</h2>
          <ul className="space-y-3">
            {posts.slice(0, 10).map((post) => (
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

        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-4">Черновики</h2>
          <ul className="space-y-3">
            {drafts.map((post) => (
              <li key={post.slug} className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary text-sm font-medium">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-text-muted text-xs">
                    {post.frontmatter.date}
                  </p>
                </div>
                <Link
                  href={`/(admin)/posts/${post.slug}/edit`}
                  className="text-primary text-sm hover:underline"
                >
                  Опубликовать
                </Link>
              </li>
            ))}
            {drafts.length === 0 && (
              <p className="text-text-muted text-sm">Черновиков пока нет</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}