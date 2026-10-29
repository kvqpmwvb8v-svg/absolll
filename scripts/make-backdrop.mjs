#!/usr/bin/env node
// Готовит смягчённую («затуманенную») версию hero-фото для фона сайта.
//
//   node scripts/make-backdrop.mjs <исходное фото> [результат] [--width 1920] [--blur 6] [--saturation 0.8] [--brightness 1.04] [--quality 70]
//
// По умолчанию результат: public/images/backdrop.webp. Исходник не изменяется.
// Размытие делается один раз здесь, а не в CSS: CSS-blur на весь экран тормозит в мобильном Safari.
// Нужен пакет sharp (он уже есть у Next.js; если нет: npm i -D sharp).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const positional = [];
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    flags[args[i].slice(2)] = args[i + 1];
    i++;
  } else {
    positional.push(args[i]);
  }
}

const [input, output = 'public/images/backdrop.webp'] = positional;
if (!input) {
  console.error('Использование: node scripts/make-backdrop.mjs <исходное фото> [результат] [--width 1920] [--blur 6] [--saturation 0.8] [--brightness 1.04] [--quality 70]');
  process.exit(2);
}
if (!fs.existsSync(input)) {
  console.error(`Файл не найден: ${input}`);
  process.exit(2);
}
if (path.resolve(input) === path.resolve(output)) {
  console.error('Результат не должен совпадать с исходником.');
  process.exit(2);
}

const width = Number(flags.width ?? 1920);
const blur = Number(flags.blur ?? 6);
const saturation = Number(flags.saturation ?? 0.8);
const brightness = Number(flags.brightness ?? 1.04);
const quality = Number(flags.quality ?? 70);

fs.mkdirSync(path.dirname(output), { recursive: true });
const info = await sharp(input)
  .rotate() // учесть EXIF-ориентацию
  .resize({ width, withoutEnlargement: true })
  .blur(blur)
  .modulate({ saturation, brightness })
  .webp({ quality })
  .toFile(output);

console.log(`Готово: ${output} (${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} КБ). Исходник не тронут.`);
