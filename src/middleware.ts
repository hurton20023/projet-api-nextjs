import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { LRUCache } from "lru-cache";

const rateLimit = new LRUCache<string, { count: number; lastReset: number }>({
  max: 500,
  ttl: 1000,
});

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    const userId: any = token.sub;

    if (
      request.nextUrl.pathname.startsWith("/api/ads") &&
      request.method === "POST"
    ) {
      const now = Date.now();
      const userRate = rateLimit.get(userId) || { count: 0, lastReset: now };

      if (now - userRate.lastReset > 1000) {
        userRate.count = 0;
        userRate.lastReset = now;
      }

      userRate.count += 1;

      if (userRate.count > 10) {
        return NextResponse.json(
          { success: false, status: 429, error: "Too Many Requests" },
          { status: 429 }
        );
      }

      rateLimit.set(userId, userRate);
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { success: false, status: 401, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (request.nextUrl.pathname.startsWith("/admin/ads")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/ads", "/api/ads/:path*", "/api/users/:path*"],
};
