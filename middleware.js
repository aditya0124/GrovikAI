import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/** List of protected routes */
const protectedRoutes = [
  "/dashboard",
  "/resume",
  "/interview",
  "/ai-cover-letter",
  "/onboarding",
  "/industry-insights",
  "/career",
];

/** Check if the current pathname starts with any protected route */
function isProtectedRoute(pathname) {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If this is a protected route and user is not authenticated, redirect to signin
  if (isProtectedRoute(pathname)) {
    if (!token) {
      const loginUrl = new URL("/signin", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url); // redirect back after login
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Matcher configuration to run middleware only on relevant paths
export const config = {
  matcher: [
    /*
      This pattern excludes:
      - _next internal paths
      - Static files like .js, .css, .png, etc
      - You can add more exceptions as needed
    */
    "/((?!_next|.*\\..*|api/public).*)",
  ],
};
