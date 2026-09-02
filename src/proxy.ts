import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const roleHome: Record<string, string> = {
  ADMIN: "/admin",
  MENTOR: "/mentor",
  STUDENT: "/student",
};

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  if (pathname === "/login") {
    if (user) {
      return NextResponse.redirect(new URL(roleHome[user.role], req.url));
    }
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    (pathname.startsWith("/admin") && user.role !== "ADMIN") ||
    (pathname.startsWith("/mentor") && user.role !== "MENTOR") ||
    (pathname.startsWith("/student") && user.role !== "STUDENT")
  ) {
    return NextResponse.redirect(new URL(roleHome[user.role], req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/mentor/:path*",
    "/student/:path*",
    "/profile",
  ],
};
