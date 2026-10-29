import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import bcrypt from "bcrypt";
import { generateSecret, verify } from "otplib";

interface AdminSession {
  user?: { id: string; iat: number };
  temp?: { step: "password" | "totp" | "loggedin"; totpSecret?: string; passwordOk?: boolean; passwordExpires?: number };
}

async function getSession(req: Request, res: Response) {
  const session = await getIronSession<AdminSession>(req, res, {
    cookieName: "ms_admin_session",
    password: process.env.ADMIN_SESSION_PASSWORD || "modern-historical-society-admin-secret-key-dev-only",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    },
  });
  return session;
}

export async function POST(request: Request) {
  try {
    const res = new Response();
    const body = await request.json();
    const { password, step, totpCode } = body;

    const session = await getSession(request, res);

    if (step === "password") {
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
      if (!adminPasswordHash) {
        return NextResponse.json(
          { error: "Admin not configured. Set ADMIN_PASSWORD_HASH in .env." },
          { status: 500 }
        );
      }

      const passwordValid = await bcrypt.compare(password, adminPasswordHash);
      if (!passwordValid) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }

      // Set passwordOk flag with 5-minute TTL in session
      const FIVE_MINUTES_MS = 5 * 60 * 1000;
      session.user = { id: "admin-1", iat: Math.floor(Date.now() / 1000) };
      session.temp = {
        step: "totp",
        totpSecret: body.totpSecret || session.temp?.totpSecret,
        passwordOk: true,
        passwordExpires: Date.now() + FIVE_MINUTES_MS
      };
      await session.save();

      return NextResponse.json({
        success: true,
        step: "totp",
        message: "Password verified, please enter TOTP code",
      });
    }

    if (step === "totp") {
      // Check passwordOk flag - require valid password before accepting TOTP
      const passwordOk = session.temp?.passwordOk;
      const passwordExpires = session.temp?.passwordExpires;
      const now = Date.now();

      // If passwordOk is set but expired, clear it and require re-auth
      if (passwordOk && passwordExpires && now > passwordExpires) {
        session.temp = { step: "totp" }; // clear passwordOk
        await session.save();
      }

      // If passwordOk is not set, redirect to password step
      if (!passwordOk) {
        return NextResponse.json(
          { error: "Сначала нужно пройти аутентификацию паролем. Пожалуйста, войдите снова." },
          { status: 401 }
        );
      }

      // Get TOTP secret from session, fall back to env or default
      const sessionSecret = session.temp?.totpSecret;
      const secret = sessionSecret || process.env.ADMIN_TOTP_SECRET || "12345678901234567890123456789012";
      const result = await verify({ secret, token: totpCode });
      const isValid = result.valid;

      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid TOTP code" },
          { status: 401 }
        );
      }

      // Finalize login
      session.user = { id: "admin-1", iat: Math.floor(Date.now() / 1000) };
      session.temp = { step: "loggedin" };
      await session.save();

      return NextResponse.json({
        success: true,
        message: "TOTP verified, login successful",
      });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}