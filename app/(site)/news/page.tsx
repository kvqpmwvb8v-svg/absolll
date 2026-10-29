import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/content";
import { Container, Section, Heading, Text, Card, Tag, Divider, EmptyState } from "@/components/ui";

const metadata = {
  title: "ABSOLUTI — Новости",
  description: "Последние новости и статьи ABSOLUTI — исторического клуба",
};

export default function NewsPage() {
  const posts = getPosts();

  return (
    <>
      <Section spacing="xl">
        <Container size="md">
          <div className="mb-12">
            <Heading as="h1" size="display-2" weight="bold" className="mb-4">
              Новости
            </Heading>
            <Text color="muted" size="lg">
              Публикации, статьи и анонсы клуба
            </Text>
          </div>

          {posts.length === 0 ? (
            <EmptyState
              title="Пока нет опубликованных материалов"
              description="Статьи появятся здесь, как только будут добавлены в админке."
              action={{ label: "В админку", href: "/admin/posts", variant: "primary" }}
            />
          ) : (
            <>
              <div className="grid gap-6">
                {posts.map((post) => (
                  <Card key={post.slug} variant="bordered" padding="none" hover className="overflow-hidden">
                    <Link href={`/news/${post.slug}`} className="block">
                      {post.frontmatter.cover && (
                        <div className="relative h-64 md:h-80 overflow-hidden">
                          <Image
                            src={post.frontmatter.cover}
                            alt={post.frontmatter.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            width={600}
                            height={400}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag variant="accent" size="sm">
                            <time dateTime={post.frontmatter.date}>
                              {new Date(post.frontmatter.date).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          </Tag>
                          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <>
                              {post.frontmatter.tags.slice(0, 2).map((tag) => (
                                <Tag key={tag} variant="muted" size="sm">
                                  {tag}
                                </Tag>
                              ))}
                            </>
                          )}
                        </div>
                        <Heading as="h2" size="h3" weight="bold" className="mb-3 group-hover:text-accent transition-colors">
                          {post.frontmatter.title}
                        </Heading>
                        <Text color="muted" size="sm" className="line-clamp-3 mb-4">
                          {post.frontmatter.excerpt}
                        </Text>
                        <Divider variant="subtle" className="mb-4" />
                        <Text size="sm" color="muted" className="flex items-center gap-1">
                          <span>Статус: {post.frontmatter.status === "published" ? "Опубликовано" : "Черновик"}</span>
                        </Text>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}