import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const { pathname } = req.nextUrl;

    // Empêche un client d'accéder au dashboard freelance et inversement
    if (pathname.startsWith("/freelance") && role !== "FREELANCE") {
      return NextResponse.redirect(new URL("/client", req.url));
    }
    if (pathname.startsWith("/client") && role !== "CLIENT") {
      return NextResponse.redirect(new URL("/freelance", req.url));
    }
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/connexion",
    },
  }
);

export const config = {
  matcher: ["/client/:path*", "/freelance/:path*", "/admin/:path*"],
};
