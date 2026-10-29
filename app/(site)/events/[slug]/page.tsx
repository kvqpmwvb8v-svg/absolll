import Image from "next/image";
import Link from "next/link";
import { getEventBySlug } from "@/lib/content";
import { Container, Section, Heading, Text, Prose, Divider, Link as LinkComponent, Tag, Breadcrumbs } from "@/components/ui";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <>
        <Section spacing="xl">
          <Container size="md">
            <Heading as="h1" size="h2" weight="bold" className="mb-4">
              Мероприятие не найдено
            </Heading>
            <Text color="muted">
              Запрашиваемое мероприятие не существует.
            </Text>
          </Container>
        </Section>
      </>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const statusLabels: Record<string, string> = {
    upcoming: "Предстоит",
    past: "Прошло",
    ongoing: "Проходит сейчас",
    cancelled: "Отменено",
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Главное", href: "/" },
          { label: "Расписание", href: "/events" },
          { label: event.frontmatter.title },
        ]}
      />

      <Section spacing="xl">
        <Container size="md">
          <article className="bg-bg-secondary border border-border rounded-md p-8 md:p-12">
            <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-md">
              <Image
                src={event.frontmatter.cover}
                alt={event.frontmatter.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                width={800}
                height={600}
              />
            </div>

            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag variant="accent" size="sm">
                  <time dateTime={event.frontmatter.date}>
                    {formatDate(event.frontmatter.date)}
                  </time>
                </Tag>
                <Tag variant="muted" size="sm">
                  {event.frontmatter.location}
                </Tag>
                <Tag variant={event.frontmatter.status === "upcoming" ? "accent" : event.frontmatter.status === "past" ? "muted" : "default"} size="sm">
                  {statusLabels[event.frontmatter.status] || event.frontmatter.status}
                </Tag>
              </div>
              <Heading as="h1" size="display-2" weight="bold" className="mb-4">
                {event.frontmatter.title}
              </Heading>
            </header>

            <Divider className="mb-8" variant="subtle" />

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <Heading as="h2" size="h3" weight="bold" className="mb-4">
                  Описание
                </Heading>
                <Prose className="prose-lg">
                  <div dangerouslySetInnerHTML={{ __html: event.content || event.frontmatter.description }} />
                </Prose>
              </div>
              <div>
                <Heading as="h2" size="h3" weight="bold" className="mb-4">
                  Детали
                </Heading>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-text-subtle text-sm uppercase tracking-wider mb-1">Дата и время</dt>
                    <dd className="text-text-primary">
                      {formatDate(event.frontmatter.date)}
                      {event.frontmatter.endDate && ` — ${formatDate(event.frontmatter.endDate)}`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-text-subtle text-sm uppercase tracking-wider mb-1">Место</dt>
                    <dd className="text-text-primary">{event.frontmatter.location}</dd>
                  </div>
                  {event.frontmatter.capacity && (
                    <div>
                      <dt className="text-text-subtle text-sm uppercase tracking-wider mb-1">Вместимость</dt>
                      <dd className="text-text-primary">{event.frontmatter.capacity} человек</dd>
                    </div>
                  )}
                  {event.frontmatter.registrationLink && (
                    <div>
                      <dt className="text-text-subtle text-sm uppercase tracking-wider mb-1">Регистрация</dt>
                      <dd className="text-text-primary">
                        <LinkComponent href={event.frontmatter.registrationLink} variant="accent" underline="hover" target="_blank" rel="noopener noreferrer">
                          Зарегистрироваться →
                        </LinkComponent>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <Divider className="mt-12 mb-8" variant="subtle" />

            <footer>
              <LinkComponent href="/events" variant="accent" underline="hover">
                ← К расписанию
              </LinkComponent>
            </footer>
          </article>
        </Container>
      </Section>
    </>
  );
}