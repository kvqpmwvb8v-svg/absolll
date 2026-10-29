import Link from "next/link";
import { getPosts } from "@/lib/content";
import Image from "next/image";
import Navigation from "@/components/Navigation";

export default function PostsPage() {
  const posts = getPosts();

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
          Посты
        </h1>
        <p className="text-text-muted text-lg">
          Изучение истории через современные перспективы
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">
            Пока нет опубликованных постов
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
              <article className="bg-bg-secondary rounded-md overflow-hidden border border-border hover:border-green-primary transition-colors group">
                {post.frontmatter.cover && (
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
                    <time>{post.frontmatter.date}</time>
                    {post.frontmatter.tags.map((tag) => (
                      <span key={tag} className="bg-bg-secondary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-text-muted mb-4 line-clamp-2">
                    {post.frontmatter.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
}