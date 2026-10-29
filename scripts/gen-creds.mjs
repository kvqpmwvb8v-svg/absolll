#!/usr/bin/env node
import bcrypt from 'bcrypt';
import { generateSecret } from 'otplib';
import * as crypto from 'crypto';

async function generateCredentials() {
  const password = 'Admin2026Secure!';
  const hash = await bcrypt.hash(password, 12);
  console.log('ADMIN_PASSWORD_HASH=' + hash);

  const totpSecret = generateSecret({ length: 20 });
  console.log('ADMIN_TOTP_SECRET=' + totpSecret);

  const sessionSecret = crypto.randomBytes(32).toString('hex');
  console.log('ADMIN_SESSION_PASSWORD=' + sessionSecret);
}

generateCredentials();