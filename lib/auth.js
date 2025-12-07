import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const ADMIN_ROLES = ["Admin"];

export async function checkAdminAuthorization() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.role) {
    return NextResponse.json(
      { error: "Требуется авторизация" },
      { status: 401 }
    );
  }

  const userRole = session.user.role

  if (!ADMIN_ROLES.includes(userRole)) {
    return NextResponse.json(
      { error: "Доступ запрещен. Требуется роль администратора." },
      { status: 403 }
    );
  }

  return null;
}

export async function checkAuthentication() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(   
      { error: "Требуется вход в систему" },
      { status: 401 }
    );
  }

  return null;
}
