import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

// RBAC middleware for API routes
export async function withAuth(
  request: Request,
  allowedRoles?: UserRole[]
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return NextResponse.json(
      { success: false, error: "Insufficient permissions" },
      { status: 403 }
    );
  }

  return null; // No error — proceed
}

export async function getAuthSession() {
  return await auth();
}

// Helper to get current user ID from session
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

// Helper to require auth and return session or throw
export async function requireAuth(allowedRoles?: UserRole[]) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Authentication required");
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    throw new Error("Insufficient permissions");
  }

  return session;
}
