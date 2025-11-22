import { DefaultSession, DefaultUser } from "next-auth";

// Расширяем тип User, который возвращается из Callbacks
declare module "next-auth" {
  /**
   * Расширяем встроенный тип 'User', добавляя наше кастомное свойство 'role'.
   * Этот тип используется в 'authorize' и 'jwt' callback'ах.
   */
  interface User extends DefaultUser {
    role?: "Admin" | "User";
  }

  /**
   * Расширяем тип 'Session', который доступен на клиенте через useSession().
   * Это устраняет ошибку в AdminButton.jsx.
   */
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      role?: "Admin" | "User"; // 💡 Добавляем свойство role
    } & DefaultSession["user"];
  }
}

// Расширяем токен JWT
declare module "next-auth/jwt" {
  /**
   * Расширяем тип 'JWT' для включения свойства 'role'.
   * Этот тип используется в 'jwt' callback'е.
   */
  interface JWT {
    role?: "Admin" | "User";
  }
}
