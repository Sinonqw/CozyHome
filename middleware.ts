import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const ADMIN_ROLES = ["Admin"];

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const tokenRole = req.nextauth.token?.role;

    if (pathname.startsWith("/admin")) {
      if (!tokenRole || !ADMIN_ROLES.includes(tokenRole)) {
        console.warn(
          `Доступ запрещен. Пользователь с ролью '${
            tokenRole || "N/A"
          }' пытался получить доступ к админке.`
        );
        return NextResponse.rewrite(new URL("/", req.url));
      }

      if (pathname.startsWith("/auth") && req.nextauth.token) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/auth/signin")) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/auth/:path"],
};
