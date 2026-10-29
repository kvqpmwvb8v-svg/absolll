import Link from "next/link";
import Image from "next/image";
import { getEvents } from "@/lib/content";
import { Container, Section, Heading, Text, Card, Tag, Divider, EmptyState } from "@/components/ui";

const metadata = {
  title: "ABSOLUTI — Мероприятия",
  description: "Предстоящие и прошедшие мероприятия ABSOLUTI — исторического клуба",
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <>
      <Section spacing="xl">
        <Container size="md">
          <div className="mb-12">
            <Heading as="h1" size="display-2" weight="bold" className="mb-4">
              Расписание мероприятий
            </Heading>
            <Text color="muted" size="lg">
              Предстоящие и прошедшие встречи, лекции и экскурсии клуба
            </Text>
          </div>

          {events.length === 0 ? (
            <EmptyState
              title="Пока нет запланированных мероприятий"
              description="Мероприятия появятся здесь, как только будут добавлены в админке."
              action={{ label: "В админку", href: "/admin/events", variant: "primary" }}
            />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.slug} variant="bordered" padding="none" hover className="overflow-hidden">
                    <Link href={`/events/${event.slug}`} className="block">
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <Image
                          src={event.frontmatter.cover}
                          alt={event.frontmatter.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          width={600}
                          height={400}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag variant="accent" size="sm">
                            <time dateTime={event.frontmatter.date}>
                              {new Date(event.frontmatter.date).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          </Tag>
                          <Tag variant="muted" size="sm">
                            {event.frontmatter.location}
                          </Tag>
                        </div>
                        <Heading as="h2" size="h3" weight="bold" className="mb-3 group-hover:text-accent transition-colors">
                          {event.frontmatter.title}
                        </Heading>
                        <Text color="muted" size="sm" className="line-clamp-3 mb-4">
                          {event.frontmatter.description}
                        </Text>
                        <Divider variant="subtle" className="mb-4" />
                        <Text size="sm" color="muted" className="flex items-center gap-1">
                          <span>{event.frontmatter.status === "upcoming" ? "Предстоит" : event.frontmatter.status === "past" ? "Прошло" : event.frontmatter.status}</span>
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