#!/usr/bin/env node
// Проверка читаемости текста поверх «затуманенного» фона (фото + плоская вуаль).
//
//   node scripts/check-backdrop-contrast.mjs <картинка> --veil "#f6f1e7" --opacity 0.9 --text "#1c1a17,#6b645a" [--min 4.5]
//
// Вуаль накладывается так же, как в CSS (смешение в sRGB). Берутся самые тёмные и самые светлые 1% пикселей:
// это худшие места, где текст может оказаться. Код выхода 1, если контраст ниже порога.
// Нужен пакет sharp (он уже есть у Next.js; если нет: npm i -D sharp).
import sharp from 'sharp';

const args = process.argv.slice(2);
const file = args[0];

function opt(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : fallback;
}

if (!file || file.startsWith('--')) {
  console.error('Использование: node scripts/check-backdrop-contrast.mjs <картинка> --veil "#f6f1e7" --opacity 0.9 --text "#1c1a17,#6b645a" [--min 4.5]');
  process.exit(2);
}

function parseHex(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    console.error(`Не могу разобрать цвет «${hex}». Нужен формат #rgb или #rrggbb.`);
    process.exit(2);
  }
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

const channel = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

const veil = parseHex(opt('veil', '#ffffff'));
const opacity = Number(opt('opacity', '0.9'));
const texts = opt('text', '#000000').split(',').map((t) => t.trim()).filter(Boolean);
const min = Number(opt('min', '4.5'));

if (!(opacity >= 0 && opacity <= 1)) {
  console.error('--opacity должен быть числом от 0 до 1.');
  process.exit(2);
}

const { data } = await sharp(file).resize({ width: 480 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const pixelCount = data.length / 3;

function backdropLuminances(o) {
  const out = new Float32Array(pixelCount);
  for (let i = 0; i < pixelCount; i++) {
    const rgb = [0, 1, 2].map((k) => veil[k] * o + data[i * 3 + k] * (1 - o));
    out[i] = luminance(rgb);
  }
  return out.sort();
}

function worstRatio(textLum, o) {
  const lums = backdropLuminances(o);
  const dark = lums[Math.floor(pixelCount * 0.01)];
  const light = lums[Math.min(pixelCount - 1, Math.floor(pixelCount * 0.99))];
  return { dark, light, worst: Math.min(ratio(textLum, dark), ratio(textLum, light)) };
}

let failed = false;
console.log(`Фон: ${file}`);
console.log(`Вуаль ${opt('veil', '#ffffff')} при прозрачности ${opacity}, порог контраста ${min}`);
for (const t of texts) {
  const textLum = luminance(parseHex(t));
  const r = worstRatio(textLum, opacity);
  const ok = r.worst >= min;
  if (!ok) failed = true;

  // минимальная прозрачность вуали, при которой порог выполняется
  let lo = 0;
  let hi = 1;
  if (worstRatio(textLum, 1).worst < min) {
    hi = NaN;
  } else {
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (worstRatio(textLum, mid).worst >= min) hi = mid;
      else lo = mid;
    }
  }
  const advice = Number.isNaN(hi)
    ? 'порог недостижим: цвет текста слишком близок к цвету вуали'
    : `минимальная прозрачность вуали для порога: ${hi.toFixed(2)}`;
  console.log(
    `Текст ${t}: худший контраст ${r.worst.toFixed(2)} (тёмные 1% фона L=${r.dark.toFixed(3)}, светлые 1% L=${r.light.toFixed(3)}) → ${ok ? 'OK' : 'НЕТ'}; ${advice}`
  );
}
process.exit(failed ? 1 : 0);
