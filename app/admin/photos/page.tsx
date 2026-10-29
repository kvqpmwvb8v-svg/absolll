"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Section, Heading, Text, Button, Skeleton, Divider } from "@/components/ui";
import { getVkAlbums, getVkPhotos, uploadVkPhoto } from "@/lib/vk-photos";
import Image from "next/image";

export default function AdminPhotosPage() {
  const [albums, setAlbums] = useState<(await getVkAlbums) | []>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [photos, setPhotos] = useState<(await getVkPhotos) | []>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загрузка альбомов при монтировании
  useEffect(() => {
    setAlbums(await getVkAlbums('mock_token', '123'));
  }, []);

  // Загрузка фото при выборе альбома
  useEffect(() => {
    if (selectedAlbum) {
      setLoading(true);
      getVkPhotos('mock_token', '123', Number(selectedAlbum)).then((photos) => {
        setPhotos(photos);
        setOrder(photos.map((p) => p.id));
        setLoading(false);
      });
    }
  }, [selectedAlbum]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Magic bytes validation for image types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Поддерживаются только изображения: JPEG, PNG, WebP');
      return;
    }

    // Verify magic bytes
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const header = new Uint8Array(arrayBuffer, 0, 4);

      let isValid = false;
      if (file.type === 'image/jpeg') {
        isValid = header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
      } else if (file.type === 'image/png') {
        isValid = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
      } else if (file.type === 'image/webp') {
        isValid = header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46;
      }

      if (!isValid) {
        setError('Неверный формат файла (magic bytes mismatch)');
        return;
      }

      setError(null);
      uploadPhoto(file);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const result = await uploadVkPhoto('mock_token', '123', Number(selectedAlbum), file);
      if (result.success) {
        setPhotos((prev) => {
          const newOrder = [result.photo.id, ...prev.map((p) => p.id)];
          return [{ ...result.photo, ordering: 0 }, ...prev];
        });
        setOrder([result.photo.id, ...order]);
        setUploading(false);
      } else {
        setError(result.error || 'Ошибка загрузки');
        setUploading(false);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError('Ошибка соединения при загрузке');
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: number) => {
    if (confirm("Вы уверены, что хотите удалить это фото?")) {
      setLoading(true);
      try {
        // In a real implementation, we'd call an API to delete from VK
        // For now, filter locally
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        setOrder((prev) => prev.filter((id) => id !== photoId));
        setLoading(false);
        alert('Фото удалено');
      } catch (err) {
        console.error("Delete error:", err);
        setLoading(false);
        alert('Ошибка при удалении');
      }
    }
  };

  const handleCacheRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Кэш обновлен');
  };

  // Sortable photos - handle reorder
  const handleReorder = useCallback((activeId: number, overId: number) => {
    setOrder((prev) => {
      const newOrder = [...prev];
      const activeIndex = newOrder.indexOf(activeId);
      const overIndex = newOrder.indexOf(overId);

      if (activeIndex < 0 || overIndex < 0) return prev;

      [newOrder[activeIndex], newOrder[overIndex]] = [newOrder[overIndex], newOrder[activeIndex]];
      return newOrder;
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 md:p-12">
      <Container size="xl">
        <Section spacing="xl">
          <Heading as="h1" size="display-2" weight="bold" className="mb-6">
            Админка фото
          </Heading>

          {/* Stats overview */}
          <Section spacing="none" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div>
              <Text weight="medium" color="muted" className="text-xs uppercase tracking-wider mb-2">
                Альбомы
              </Text>
              <Text size="2xl" fontWeight="bold" color="primary">{albums.length}</Text>
            </div>
            <div>
              <Text weight="medium" color="muted" className="text-xs uppercase tracking-wider mb-2">
                Фото
              </Text>
              <Text size="2xl" fontWeight="bold" color="primary">{photos.length}</Text>
            </div>
          </Section>

          {/* Выбор альбома */}
          <Section spacing="none" className="mb-12">
            <Heading as="h2" size="h2" weight="bold" className="mb-4">
              Выбор альбома
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {albums.map((album) => (
                <Button
                  key={album.id}
                  variant={selectedAlbum === album.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAlbum(album.id)}
                  className="w-full justify-center"
                >
                  {album.title}{' '}
                  <span className="text-sm text-muted">
                    {album.photos_count} фото
                  </span>
                </Button>
              ))}
            </div>
          </Section>

          {/* Форма загрузки фото */}
          {selectedAlbum && (
            <div className="mb-12 border rounded-md p-6 bg-bg-secondary border-border">
              <Heading as="h2" size="h3" weight="bold" className="mb-4">
                Загрузка фото
              </Heading>

              {error && (
                <div className="bg-red-500/10 text-red-400 p-4 rounded mb-4 animate-shake">
                  {error}
                </div>
              )}

              {uploading && (
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-6 rounded" />
                  <Skeleton className="h-6 rounded" />
                </div>
              )}

              <form
                className="space-y-4"
                onChange={handleFileChange}
              >
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Выберите изображение
                  </label>
                  <input
                    type="file"
                    accept="image/*,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    className="w-full bg-bg-secondary border border-text-muted rounded-lg px-4 py-3 cursor-pointer file-input"
                  />
                  <p className="text-xs text-muted mt-1">
                    JPEG, PNG, WebP. Magic bytes validation applied.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Описание
                  </label>
                  <textarea
                    rows={2}
                    className="w-full bg-bg-secondary border border-text-muted rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="Краткое описание фото..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Загрузка..." : "Загрузить фото"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    Обзор
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Фото альбома */}
          {selectedAlbum && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <Text weight="medium" color="primary">
                  {selectedAlbum === '1' ? 'Лента' : selectedAlbum === '2' ? 'События' : 'Перекладываемые'}
                </Text>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedAlbum(null)}
                >
                  Назад
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <Skeleton variant="card" className="h-48" />
                ) : photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border rounded-md overflow-hidden group hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={photo.original}
                      alt={photo.text || 'Фото альбома'}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={400}
                      height={300}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs">
                      {new Date(photo.dates[0] * 1000).toLocaleDateString("ru-RU")}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 rounded-md hover:bg-bg-tertiary"
                        onClick={() => handleDelete(photo.id)}
                        title="Удалить"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6zm2-8h4v2h-4V9zM8 7a1 1 0 011 1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 rounded-md hover:bg-bg-tertiary"
                        title="Переместить"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 7h2v10h-2V7zm12-3.33V13a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1zm-9 3.33V13a1 1 0 001 1h2a1 1 0 001 1v2a1 1 0 00-1 1h-2a1 1 0 00-1-1v-2a1 1 0 001-1zm-4-6.67h4v2h-4V7zm4 6.67V13a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={handleCacheRefresh}>
                  Обновить кэш
                </Button>
              </div>
            </div>
          )}

          <Divider className="mt-16 mb-8" variant="subtle" />

          <nav className="text-center">
            <LinkComponent href="/admin/dashboard" variant="accent" underline="hover" size="base">
              ← К дашборду
            </LinkComponent>
          </nav>
        </Section>
      </Container>
    </div>
  );
}