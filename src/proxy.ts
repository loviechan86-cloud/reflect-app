import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const roleHome: Record<string, string> = {
  STAFF: "/dashboard",
  STUDENT: "/student",
};

const staffPaths = ["/dashboard", "/students", "/reflections", "/staff"];

function matchesPath(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;
  // A session issued before a role rename (or any other unrecognized
  // role) has no valid home — treat it as logged out rather than
  // building a broken redirect URL.
  const home = user ? roleHome[user.role] : undefined;

  if (pathname === "/login") {
    if (user && home) {
      return NextResponse.redirect(new URL(home, req.url));
    }
    return NextResponse.next();
  }

  if (!user || !home) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isStaffPath = staffPaths.some((p) => matchesPath(pathname, p));
  const isStudentPath = matchesPath(pathname, "/student");

  if (
    (isStaffPath && user.role !== "STAFF") ||
    (isStudentPath && user.role !== "STUDENT")
  ) {
    return NextResponse.redirect(new URL(home, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/students/:path*",
    "/reflections/:path*",
    "/staff/:path*",
    "/student/:path*",
    "/profile",
  ],
};
