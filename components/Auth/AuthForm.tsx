"use client";
import React, { FormEvent, useState } from "react";
import InputField from "./InputField";

interface AuthFormProps {
  type: "signin" | "signup";
  onSubmit: (email: string, password: string, name?: string) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSignUp = type === "signup";
  const buttonText = isSignUp ? "Створити акаунт" : "Увійти";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      console.error("Помилка: Паролі не співпадають!");
      return;
    }

    onSubmit(email, password, isSignUp ? name : undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {isSignUp && (
        <InputField
          id="name"
          label="Ім'я"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <InputField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="mb-4">
        <InputField
          id="password"
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {isSignUp && (
        <div className="mb-6">
          <InputField
            id="confirmPassword"
            label="Підтвердіть пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#7C5840] hover:bg-[#261C1A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 disabled:bg-gray-400"
        >
          {isLoading ? "Обробка..." : buttonText}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
