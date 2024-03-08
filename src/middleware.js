import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const adminPath = path.startsWith("/dashboard");
  const token = req.cookies.get("token")?.value || "";

  if (adminPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
