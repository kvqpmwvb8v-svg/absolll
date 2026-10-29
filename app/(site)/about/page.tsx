import Image from "next/image";
import { Container, Section, Heading, Text, Link as LinkComponent, Divider } from "@/components/ui";

export default function AboutPage() {
  return (
    <>
      <Section spacing="xl">
        <Container size="md">
          <article className="bg-bg-secondary border border-border rounded-md p-8 md:p-12 max-w-2xl mx-auto">
            <Heading as="h1" size="display-2" weight="bold" className="mb-6">
              О клубе
            </Heading>

            <Text size="lg" color="muted" className="mb-8">
              ABSOLUTI — современное цифровое пространство культурного и интеллектуального
              сообщества. Мы объединяем исследователей, энтузиастов и всех, кто ценит
              истинную историю.
            </Text>

            <Section spacing="none" className="mb-12">
              <Heading as="h2" size="h2" weight="bold" className="mb-4">
                История
              </Heading>
              <Text color="muted" leading="relaxed" className="mb-6">
                История появления клуба начинается с визии создать пространство, где
                история оживает через реальный диалог и качество контента. Мы отказываемся
                от шаблонных формул и AI-ориентированного контента, предпочитая глубину
                и содержательность.
              </Text>
              <div className="flex items-start gap-4">
                <Image
                  src="/images/nastya.jpg"
                  alt="Анастасия Жукова"
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  width={400}
                  height={400}
                />
                <div>
                  <Text weight="medium" color="primary">
                    Анастасия Жукова
                  </Text>
                  <Text size="sm" color="subtle" className="mt-1">
                    Основатель, автор и лектор клуба · доцент · кандидат юридических наук
                  </Text>
                </div>
              </div>
            </Section>

            <nav className="mt-12 pt-8">
              <Divider className="mb-4" />
              <LinkComponent href="/" variant="accent" underline="hover">
                ← На главную
              </LinkComponent>
            </nav>
          </article>
        </Container>
      </Section>
    </>
  );
}