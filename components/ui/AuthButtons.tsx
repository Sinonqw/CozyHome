"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButtons = ({ className = "" }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`
          px-5 py-2.5 rounded-lg 
          bg-[#8B2E2E] hover:bg-[#6B1E1E] 
          text-white font-semibold 
          shadow-lg shadow-red-950/30
          transition-all duration-200 
          hover:shadow-xl hover:shadow-red-950/40
          ${className}
        `}
      >
        Вийти ({session.user?.name || session.user?.email})
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push("/auth/signin")}
      className={`
        px-5 py-2.5 rounded-lg 
        bg-[#7C5840] hover:bg-[#5D4030] 
        text-white font-semibold
        shadow-lg shadow-[#7C5840]/30
        transition-all duration-200 
        hover:shadow-xl hover:shadow-[#7C5840]/40
        ${className}
      `}
    >
      Увійти
    </button>
  );
};

export default AuthButtons;
