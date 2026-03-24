import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Stamps the current pathname onto every request as a custom header so that
 * the root layout (a Server Component) can read it and emit an accurate
 * <link rel="canonical"> without needing a client-side hook.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)"],
};
