"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { generateURI, generateSecret } from "otplib";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"password" | "totp">("password");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [otpauth, setOtpauth] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  // Single useEffect: generate OTPAuth URL whenever totpSecret changes
  useEffect(() => {
    if (totpSecret) {
      const otpauth = generateURI({
        issuer: "Modern Historical Society",
        label: "admin@modernhistoricalsociety.com",
        secret: totpSecret,
      });
      setOtpauth(otpauth);
    }
  }, [totpSecret]);

  if (step === "password") {
    return (
      <main className="min-h-screen bg-bg-secondary p-6 md:p-12 flex items-center justify-center">
        <div className="bg-bg-primary rounded-2xl p-8 md:p-12 max-w-md w-full shadow-lg">
          <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">
            Админ-панель
          </h2>
          <p className="text-text-muted mb-8">
            Введите пароль администратора для продолжения
          </p>
          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 animate-shake">
              {error}
            </div>
          )}
          {apiError && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 animate-shake">
              {apiError}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              // Send password and step to API for verification
              fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, step: "password" }),
              })
                .then((res) => res.json())
                .then((data) => {
                  setIsLoading(false);
                  if (data.success && data.step === "totp") {
                    // Generate TOTP secret on client side for QR display
                    // The secret is already stored in the session server-side
                    const secret = generateSecret({ length: 20 });
                    setTotpSecret(secret);
                    setStep("totp");
                  } else if (data.error) {
                    setError(data.error);
                  }
                })
                .catch((err) => {
                  setIsLoading(false);
                  console.error("Auth fetch error:", err);
                  setError("Ошибка связи с сервером");
                });
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-muted mb-2">
                Пароль администратора
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-bg-secondary border border-text-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                placeholder="Введите пароль администратора"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-bg-primary py-3 rounded-lg font-medium hover:bg-bg-primary transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Проверка..." : "Продолжить к 2FA"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TOTP step - use secret from API only (no fallback to default)
  const secret = totpSecret || undefined;

  return (
    <main className="min-h-screen bg-bg-secondary p-6 md:p-12 flex items-center justify-center">
      <div className="bg-bg-primary rounded-2xl p-8 md:p-12 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">
          Двухфакторная аутентификация
        </h2>

        <div className="mb-6">
          <p className="text-text-muted text-sm mb-3">
            Сканируйте QR-код с помощью приложения-аутентификатора, затем введите код:
          </p>
          <div className="flex flex-col items-center">
            <img
              src={otpauth}
              alt="TOTP QR code"
              width={200}
              height={200}
              className="mb-4 border rounded-xl"
            />
            <p className="text-center text-sm text-text-muted">
              Или вручную: {secret}
            </p>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (totpCode.length === 6) {
              // Verify TOTP code - send to API
              const result = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ totpCode, step: "totp" }),
              }).then((res) => res.json());

              if (result.success) {
                // Login successful
                window.location.href = "/admin/posts";
              } else if (result.error) {
                setError("Неверный код TOTP. Попробуйте еще раз.");
              }
            }
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-muted mb-2">
              Код TOTP
            </label>
            <input
              type="number"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              maxLength={6}
              required
              className="w-full bg-bg-secondary border border-text-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              placeholder="Введите 6-значный код"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-bg-primary py-3 rounded-lg font-medium hover:bg-bg-primary transition-colors disabled:opacity-50"
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}