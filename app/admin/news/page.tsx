import Link from "next/link";
import { getPosts, getPostDrafts } from "@/lib/content";

export default function AdminNewsPage() {
  const posts = getPosts();
  const drafts = getPostDrafts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Управление новостями
          </h1>
          <p className="text-text-muted mt-2">
            Создание, редактирование и публикация новостей
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="btn btn-primary py-2 px-4 text-sm"
        >
          + Новая новость
        </Link>
      </div>

      <div className="bg-bg-primary rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-secondary">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                Заголовок
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                Дата
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                Статус
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-text-muted">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {[...posts, ...drafts].map((post) => (
              <tr key={post.slug} className="border-t border-border">
                <td className="px-6 py-4 text-text-primary">
                  {post.frontmatter.title}
                </td>
                <td className="px-6 py-4 text-text-muted text-sm">
                  {post.frontmatter.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      post.frontmatter.status === "published"
                        ? "bg-green-primary/20 text-green-secondary"
                        : "bg-bg-secondary text-text-muted"
                    }`}
                  >
                    {post.frontmatter.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/news/${post.slug}/edit`}
                    className="text-primary hover:underline text-sm"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && drafts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-muted">
                  Новостей пока нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}