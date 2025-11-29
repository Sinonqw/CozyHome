"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/Auth/AuthForm";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isSignInMode = mode === "signin";
  const title = isSignInMode ? "Вхід" : "Реєстрація";

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Невірний email або пароль.");
    } else {
      router.push("/");
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!name) {
        throw new Error("Ім'я обов'язкове для реєстрації.");
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Не вдалося створити користувача.");
      }

      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setIsLoading(false);

      if (signInResult?.error) {
        setError(
          "Акаунт створено, але не вдалося увійти автоматично. Спробуйте вручну."
        );
      } else {
        router.push("/");
      }
    } catch (e) {
      setIsLoading(false);
      setError(
        (e as Error).message || "Виникла невідома помилка під час реєстрації."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FBF0E6]">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-serif text-center text-[#261C1A] mb-6">
          {title}
        </h1>

        <AuthForm
          type={mode}
          onSubmit={isSignInMode ? handleSignIn : handleRegister}
          isLoading={isLoading}
          error={error}
        />

        {/* Переключатель между Входом и Регистрацией */}
        <div className="mt-6 text-center text-[#261C1A]">
          {isSignInMode ? (
            <>
              Немає акаунту?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className="text-[#7C5840] hover:text-[#261C1A] font-bold transition duration-150"
              >
                Зареєструватися
              </button>
            </>
          ) : (
            <>
              Вже є акаунт?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError(null);
                }}
                className="text-[#7C5840] hover:text-[#261C1A] font-bold transition duration-150"
              >
                Увійти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
