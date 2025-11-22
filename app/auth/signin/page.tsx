"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result) {
      if (result.error) {
        setError("Невірний email або пароль.");
      } else {
        router.push("/");
      }
    } else {
      setError("Не вдалося виконати вхід. Спробуйте пізніше.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FBF0E6]">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-serif text-center text-[#261C1A] mb-6">
          Вхід
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#7C5840] hover:bg-[#261C1A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            >
              Увійти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
