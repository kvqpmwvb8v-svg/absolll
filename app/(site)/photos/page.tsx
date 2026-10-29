import Image from "next/image";
import Link from "next/link";
import { Container, Section, Heading, Text, Card, Divider, Link as LinkComponent, EmptyState, Skeleton } from "@/components/ui";
import { getVkAlbums, getVkPhotos } from "@/lib/vk-photos";

interface PhotosPageProps {
  params: Promise<{ albumId?: string }>;
}

export default function PhotosPage() {
  const { albumId } = await (params as Promise<{ albumId?: string }>);

  return (
    <>
      <Section spacing="xl" className="pt-16 md:pt-24">
        <Container size="xl">
          <Heading as="h1" size="display-1" weight="bold" className="mb-4 tracking-tight">
            Фотогалерея ABSOLUTI
          </Heading>
          <Text color="muted" size="lg" className="mb-8">
            Визуальная хроника событий и встреч клуба. Каждый образ — момент, который стоит вспомнить.
          </Text>

          {/* Альбомы */}
          <Section spacing="none" className="mb-16">
            <Heading as="h2" size="h2" weight="bold" className="mb-6">
              Албомы
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albumId ? [] : (
                <div key="albums" className="space-y-4">
                  {await getVkAlbums('mock_token', '123').then((albums) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {albums.map((album) => (
                        <Card
                          key={album.id}
                          variant="bordered"
                          padding="md"
                          hover
                          className="overflow-hidden cursor-pointer hover:border-accent hover:bg-bg-tertiary"
                        >
                          <div className="relative h-48 md:h-64 overflow-hidden rounded-md">
                            <Image
                              src={album.thumb_url}
                              alt={album.title}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              width={400}
                              height={300}
                            />
                          </div>
                          <div className="p-4">
                            <Text weight="medium" color="primary">
                              {album.title}
                            </Text>
                            <Text size="sm" color="muted">
                              {album.photos_count} фото
                            </Text>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* Фото избранного альбома */}
          {albumId ? (
            <div className="mb-12">
              <Heading as="h2" size="h2" weight="bold" className="mb-4">
                {albumId === '1' ? 'Лента' : albumId === '2' ? 'События' : 'Перекладываемые'}
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albumId ? await getVkPhotos('mock_token', '123', Number(albumId)).then((photos) => (
                  <div>
                    {photos.map((photo) => (
                      <Card
                        key={photo.id}
                        variant="bordered"
                        padding="none"
                        hover
                        className="overflow-hidden"
                      >
                        <div className="relative h-48 md:h-64 overflow-hidden rounded-md">
                          <Image
                            src={photo.original}
                            alt={photo.text || 'Фото клуба'}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            width={600}
                            height={400}
                          />
                        </div>
                        <div className="p-4">
                          <Text size="xs" color="subtle" className="uppercase tracking-wider mb-2">
                            {new Date(photo.dates[0] * 1000).toLocaleDateString("ru-RU", {
                              day: "numeric",
                              month: "long",
                            })}
                          </Text>
                          <Heading as="h3" size="base" weight="medium" className="mb-0">
                            {photo.text || 'Без описания'}
                          </Heading>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                    <EmptyState
                      title="Загрузка фото..."
                      description="Фото появятся здесь после выбора альбома."
                      action={{ label: "Обновить", href: window.location.href, variant: "primary" }}
                    />
                  )}
                )}
              </div>
            </div>
          ) : (
            <EmptyState
              title="Выберите альбом"
              description="Выберите альбом из списка выше, чтобы посмотреть фото."
              action={{ label: "Обновить", href: window.location.href, variant: "primary" }}
            />
          )}

          <Divider className="mt-12 mb-8" variant="subtle" />

          <nav className="text-center">
            <LinkComponent href="/events" variant="accent" underline="hover" size="base">
              ← К расписанию мероприятий
            </LinkComponent>
          </nav>
        </Container>
      </Section>
    </>
  );
}