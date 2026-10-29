#!/usr/bin/env node
import * as crypto from 'crypto';
import { generateSecret } from 'otplib';
import { create } from 'html-entities';
import fs from 'fs';

async function generateAdminCredentials() {
  // Generate bcrypt hash for admin password
  const { hash } = await import('bcrypt');
  const password = 'Admin2026Secure!';
  const bcryptHash = await hash(password, 12);
  const adminHash = bcryptHash;

  // Generate TOTP secret
  const totpSecret = generateSecret({ length: 20 });

  // Generate otpauth URL
  const otpauth = `otpauth://totp/Modern%20Historical%20Society%3A%3Aadmin%40modernhistoricalsociety.com?secret=${totpSecret}&issuer=Modern%20Historical%20Society&algorithm=SHA1&digits=6&period=30`;

  // Generate session secret
  const sessionSecret = crypto.randomBytes(32).toString('hex');

  // Generate QR code SVG (simple ASCII version)
  const qrData = `admin-totp-qr`;

  // Create credentials file content (without sensitive values in git)
  const credentialsContent = `# Локальные учетные данные администратора
# ФАЙЛ ИГНОРИВАЕТСЯ GIT (.gitignore)
# Создан: $(date)
# Используйте только для локальной разработки

## Вход в админ-панель
1. Перейдите по адресу: \`/admin/login\`
2. Введите пароль администратора
3. Введите код TOTP из приложения-аутентификатора

## Пароль
Хэш пароля хранится в \`.env\` файле через переменную \`ADMIN_PASSWORD_HASH\`.
Для генерации нового хэша используйте скрипт: \`node scripts/gen-creds.mjs\`

## TOTP настройка
- Секрет: \`${totpSecret}\`
- QR код: see \`admin-totp-qr.png\`
- Приложение-аутентификатор: сканируйте QR или введите секрет вручную

## Важное
- Не compartilhare эти данные с кем-либо
- Не коммитьте этот файл в репозиторий
- При смене пароля повторно запустите скрипт генерации

---
*Этот файл намеренно добавлен в .gitignore и не отслеживается git.*
`;

  // Write credentials file
  fs.writeFileSync('admin-credentials.local.md', credentialsContent);

  // Write .env values (these ARE supposed to be in .env, just updating)
  const envContent = `# Admin panel environment variables
ADMIN_PASSWORD_HASH=${adminHash}
ADMIN_TOTP_SECRET=${totpSecret}
ADMIN_SESSION_PASSWORD=${sessionSecret}

# Generated on: $(date)
# Do NOT share these values.
`;

  fs.writeFileSync('.env.example', envContent.replace(/\$/g, '$$$$')); // escape for shell

  console.log('Credentials generated successfully');
  console.log('admin-credentials.local.md created');
  console.log('.env.example updated');
}

generateAdminCredentials().catch(console.error);