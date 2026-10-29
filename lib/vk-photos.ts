/**
 * VK API фото модуль
 * Интерфейс для работы с фото ВКонтакте
 *
 * В реальном проекте здесь была бы интеграция с VK SDK:
 * - Инициализация SDK при загрузке страницы
 * - Методы API для получения альбомов и фото
 * - Авторизация через VK Connect
 */

// Типы данных для фото VK
export interface VkPhoto {
  id: number;
  owner_id: number;
  album_id: number;
  widths: number[];
  heights: number[];
  text: string;
  dates: number[];
  can_comment: number;
  can_like: number;
  can_view: number;
  crop_x: number;
  crop_y: number;
  crop_x2: number;
  crop_y2: number;
  likes: {
    count: number;
    user_likes: number;
  };
  comments: {
    count: number;
  };
  tags: string[];
  can_tag: number;
  photo_75: string;
  photo_130: string;
  photo_604: string;
  photo_807: string;
  photo_1280: string;
  photo_2560: string;
  original: string;
}

export interface VkAlbum {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  photos_count: number;
  cover_id: number;
  created: number;
  updated: number;
  thumb_url: string;
  size: number;
}

export interface VkApiResponse<D> {
  response: D;
  error?: {
    error_msg: string;
    error_code: number;
    request_params: any;
  };
}

/**
 * Функция получения альбомов VK
 * В режиме mock возвращает тестовые альбомы
 * В режиме прод продакшена — вызов VK API
 */
export async function getVkAlbums(
  accessToken: string,
  vkId: string,
  offset: number = 0,
  count: number = 100
): Promise<VkAlbum[]> {
  // Mock режим — симуляция API ответа
  // В реальном проекте: return await vk.api('photos.getAlbums', { access_token: accessToken, owner_id: '-' + vkId, offset, count })

  const mockAlbums: VkAlbum[] = [
    {
      id: 1,
      owner_id: -vkId * 1,
      title: 'Лента',
      description: 'Фото с обновлений соцсети',
      photos_count: 156,
      cover_id: 1024,
      created: Math.floor(Date.now() / 1000) - 365 * 86400,
      updated: Math.floor(Date.now() / 1000),
      thumb_url: '/images/hero.png',
      size: 156,
    },
    {
      id: 2,
      owner_id: -vkId * 1,
      title: 'События',
      description: 'Фото с мероприятий клуба',
      photos_count: 42,
      cover_id: 1025,
      created: Math.floor(Date.now() / 1000) - 730 * 86400,
      updated: Math.floor(Date.now() / 1000) - 30 * 86400,
      thumb_url: '/images/nastya.jpg',
      size: 42,
    },
    {
      id: 3,
      owner_id: -vkId * 1,
      title: 'Перекладываемые',
      description: 'Фото, присланные другими пользователями',
      photos_count: 18,
      cover_id: 1026,
      created: Math.floor(Date.now() / 1000) - 180 * 86400,
      updated: Math.floor(Date.now() / 1000) - 7 * 86400,
      thumb_url: '/images/hero.png',
      size: 18,
    },
  ];

  // Симуляция сетевой задержки
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAlbums;
}

/**
 * Функция получения фото из альбома VK
 */
export async function getVkPhotos(
  accessToken: string,
  vkId: string,
  albumId: number,
  offset: number = 0,
  count: number = 100
): Promise<VkPhoto[]> {
  // Mock режим
  const mockPhotos: VkPhoto[] = [
    {
      id: 1,
      owner_id: -vkId * 1,
      album_id: albumId,
      widths: [1200, 800, 600],
      heights: [800, 533, 400],
      text: '',
      dates: [Math.floor(Date.now() / 1000)],
      can_comment: 1,
      can_like: 1,
      can_view: 1,
      crop_x: 0,
      crop_y: 0,
      crop_x2: 1200,
      crop_y2: 800,
      likes: { count: 45, user_likes: 0 },
      comments: { count: 5 },
      tags: [],
      can_tag: 0,
      photo_75: '/images/hero.png',
      photo_130: '/images/hero.png',
      photo_604: '/images/hero.png',
      photo_807: '/images/hero.png',
      photo_1280: '/images/hero.png',
      photo_2560: '/images/hero.png',
      original: '/images/hero.png',
    },
    {
      id: 2,
      owner_id: -vkId * 1,
      album_id: albumId,
      widths: [1200, 800, 600],
      heights: [800, 533, 400],
      text: 'Лекция учредителя',
      dates: [Math.floor(Date.now() / 1000) - 86400],
      can_comment: 1,
      can_like: 1,
      can_view: 1,
      crop_x: 0,
      crop_y: 0,
      crop_x2: 1200,
      crop_y2: 800,
      likes: { count: 32, user_likes: 0 },
      comments: { count: 3 },
      tags: [],
      can_tag: 0,
      photo_75: '/images/nastya.jpg',
      photo_130: '/images/nastya.jpg',
      photo_604: '/images/nastya.jpg',
      photo_807: '/images/nastya.jpg',
      photo_1280: '/images/nastya.jpg',
      photo_2560: '/images/nastya.jpg',
      original: '/images/nastya.jpg',
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockPhotos;
}

/**
 * Функция загрузки фото в VK
 * В mock режиме просто симулирует успех
 */
export async function uploadVkPhoto(
  accessToken: string,
  vkId: string,
  albumId: number,
  file: File
): Promise<{ success: boolean; photo: VkPhoto }> {
  // Mock режим — симуляция загрузки
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockPhoto: VkPhoto = {
    id: Date.now(),
    owner_id: -vkId * 1,
    album_id: albumId,
    widths: [1200, 800, 600],
    heights: [800, 533, 400],
    text: '',
    dates: [Math.floor(Date.now() / 1000)],
    can_comment: 1,
    can_like: 1,
    can_view: 1,
    crop_x: 0,
    crop_y: 0,
    crop_x2: 1200,
    crop_y2: 800,
    likes: { count: 0, user_likes: 0 },
    comments: { count: 0 },
    tags: [],
    can_tag: 0,
    photo_75: '/images/hero.png',
    photo_130: '/images/hero.png',
    photo_604: '/images/hero.png',
    photo_807: '/images/hero.png',
    photo_1280: '/images/hero.png',
    photo_2560: '/images/hero.png',
    original: URL.createObjectURL(file),
  };

  return { success: true, photo: mockPhoto };
}

export default { getVkAlbums, getVkPhotos, uploadVkPhoto };