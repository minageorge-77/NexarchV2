import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const method = req.method;

        // Protect /admin routes, but not /admin/login
        if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
          return !!token;
        }

        // Protect API routes
        if (path.startsWith("/api/")) {
          // Public API endpoints (always allowed)
          if (path.startsWith("/api/auth") || path.startsWith("/api/contact") || path.startsWith("/api/analytics/track")) {
            return true;
          }

          // Read-only public APIs
          if (method === "GET" && (path.startsWith("/api/testimonials") || path.startsWith("/api/services") || path.startsWith("/api/stats"))) {
            return true;
          }

          // All other API requests require authentication (e.g. POST/PUT/DELETE testimonials, GET/PATCH messages, upload, etc)
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
