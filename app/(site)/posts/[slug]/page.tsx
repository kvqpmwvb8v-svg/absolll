import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/lib/content";
import Navigation from "@/components/Navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Пост не найден</h1>
        <p className="text-text-muted">Запрашиваемый пост не существует или был удален.</p>
      </div>
    );
  }

  return (
    <>
      <Navigation />
    <article className="max-w-4xl mx-auto p-8 md:p-12 bg-bg-secondary border border-border">
      {post.frontmatter.cover && (
        <div className="relative h-64 md:h-80 mb-6 overflow-hidden rounded-2xl">
          <Image
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            fill
            className="object-cover transition-opacity duration-300"
          />
        </div>
      )}

      <header className="mb-6">
        <time className="text-text-muted text-sm mb-2">
          {post.frontmatter.date}
        </time>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
          {post.frontmatter.title}
        </h1>
        <div className="flex flex-wrap gap-2 text-sm text-text-muted">
          {post.frontmatter.tags.map((tag) => (
            <span key={tag} className="bg-bg-secondary px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="line-clamp-4 text-text-muted mb-8">
        {post.content}
      </div>

      <footer className="pt-4 border-t border-bg-secondary">
        <Link
          href="/posts"
          className="text-primary hover:underline"
        >
          ← Назад к списку постов
        </Link>
      </footer>
    </article>
    </>
  );
}