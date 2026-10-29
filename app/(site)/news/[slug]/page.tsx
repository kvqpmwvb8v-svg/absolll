import Image from "next/image";
import Link from "next/link";
import { getPostBySlug } from "@/lib/content";
import { Container, Section, Heading, Text, Prose, Divider, Link as LinkComponent, Tag, Breadcrumbs } from "@/components/ui";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <Section spacing="xl">
          <Container size="md">
            <Heading as="h1" size="h2" weight="bold" className="mb-4">
              Новость не найдена
            </Heading>
            <Text color="muted">
              Запрашиваемая новость не существует.
            </Text>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главное", href: "/" },
          { label: "Новости", href: "/news" },
          { label: post.frontmatter.title },
        ]}
      />

      <Section spacing="xl">
        <Container size="md">
          <article className="bg-bg-secondary border border-border rounded-md p-8 md:p-12">
            {post.frontmatter.cover && (
              <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-md">
                <Image
                  src={post.frontmatter.cover}
                  alt={post.frontmatter.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  width={800}
                  height={600}
                />
              </div>
            )}

            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag variant="accent" size="sm">
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </Tag>
                {post.frontmatter.tags && post.frontmatter.tags.map((tag) => (
                  <Tag key={tag} variant="muted" size="sm">
                    {tag}
                  </Tag>
                ))}
              </div>
              <Heading as="h1" size="display-2" weight="bold" className="mb-4">
                {post.frontmatter.title}
              </Heading>
              {post.frontmatter.excerpt && (
                <Text size="lg" color="muted" leading="relaxed">
                  {post.frontmatter.excerpt}
                </Text>
              )}
            </header>

            <Divider className="mb-8" variant="subtle" />

            <Prose className="prose-lg">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Prose>

            <Divider className="mt-12 mb-8" variant="subtle" />

            <footer>
              <LinkComponent href="/news" variant="accent" underline="hover">
                ← К списку новостей
              </LinkComponent>
            </footer>
          </article>
        </Container>
      </Section>
    </>
  );
}