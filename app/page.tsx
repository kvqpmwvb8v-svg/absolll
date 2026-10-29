import Image from "next/image";
import { Container, Section, Heading, Text, Button, Link as LinkComponent, Divider } from "@/components/ui";

export default function Homepage() {
  return (
    <>
      <Section spacing="xl" className="pt-16 md:pt-24 pb-8">
        <Container size="md">
          <Heading as="h1" size="display-1" weight="bold" className="mb-6 tracking-wider">
            ABSOLUTI — Исторический клуб
          </Heading>
          <Text size="xl" color="muted" leading="relaxed" className="max-w-2xl mb-12">
            Современное цифровое пространство культурного и интеллектуального сообщества.
            Мы объединяем исследователей, энтузиастов и всех, кто ценит истинную историю.
            Мы верим, что история должна рассказываться человеком, для людей.
          </Text>

          <Button variant="primary" size="lg" asChild>
            <LinkComponent href="/about" variant="default" underline="never">
              Узнать больше
            </LinkComponent>
          </Button>
        </Container>
      </Section>

      <Section spacing="none" className="relative overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Главное фото клуба"
          className="absolute inset-0 w-full h-[500px] md:h-[600px] object-cover"
          priority
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-bg-primary/60" />
        <Container size="md">
          <div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-6">
            <div className="w-full max-w-3xl">
              <Heading as="h1" size="display-1" weight="bold" className="mb-6 tracking-wider">
                ABSOLUTI — Исторический клуб
              </Heading>
              <Text color="muted" size="lg" className="mb-8">
                Современное цифровое пространство культурного и интеллектуального сообщества.
                Мы объединяем исследователей, энтузиастов и всех, кто ценит истинную историю.
              </Text>
              <Button variant="primary" size="lg" asChild>
                <LinkComponent href="/about" variant="default" underline="never">
                  Узнать больше
                </LinkComponent>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" className="border-t border-border">
        <Container size="md">
          <div className="grid md:grid-cols-3 gap-8">
            <article className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <Heading as="h3" size="h3" weight="bold" className="mb-3">
                Исследования
              </Heading>
              <Text color="muted" size="base">
                Глубинные исторические исследования без идеологических шаблонов и AI-генерации.
              </Text>
            </article>

            <article className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <Heading as="h3" size="h3" weight="bold" className="mb-3">
                Сообщество
              </Heading>
              <Text color="muted" size="base">
                Общение с единомышленниками, лекции, дискуссии и совместные проекты.
              </Text>
            </article>

            <article className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <Heading as="h3" size="h3" weight="bold" className="mb-3">
                Мероприятия
              </Heading>
              <Text color="muted" size="base">
                Лекции, экскурсии, исторические игры и встречи с экспертами.
              </Text>
            </article>
          </div>

          <Divider className="mt-16 mb-8" variant="subtle" />

          <div className="text-center">
            <Heading as="h2" size="h2" weight="bold" className="mb-4">
              Готовы присоединиться?
            </Heading>
            <Text color="muted" size="lg" className="mb-8 max-w-xl mx-auto">
              Станьте частью сообщества, которое ценит истинную историю и глубокий диалог.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <LinkComponent href="/events" variant="default" underline="never">
                  Посмотреть расписание
                </LinkComponent>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <LinkComponent href="/news" variant="default" underline="never">
                  Читать новости
                </LinkComponent>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}