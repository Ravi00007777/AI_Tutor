import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Routes that require authentication
const protectedRoutes = ["/student", "/teacher", "/admin"];

// Routes that require specific roles
const roleRoutes: Record<string, string[]> = {
  "/student": ["STUDENT", "PARENT"],
  "/teacher": ["TEACHER"],
  "/admin": ["ADMIN"],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route requires protection
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await auth();

  // Not authenticated — redirect to login
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  for (const [routePrefix, allowedRoles] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(routePrefix)) {
      if (!allowedRoles.includes(session.user.role)) {
        // Redirect to appropriate dashboard based on role
        const roleRedirects: Record<string, string> = {
          STUDENT: "/student",
          PARENT: "/student",
          TEACHER: "/teacher",
          ADMIN: "/admin",
        };
        const redirectTo = roleRedirects[session.user.role] || "/";
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/admin/:path*"],
};
