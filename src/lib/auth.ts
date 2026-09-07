import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      avatarUrl?: string | null;
      studentProfileId?: string | null;
      teacherProfileId?: string | null;
    };
  }

  interface User {
    role: UserRole;
    avatarUrl?: string | null;
  }
}

declare module "next-auth" {
  interface JWT {
    role: UserRole;
    avatarUrl?: string | null;
    studentProfileId?: string | null;
    teacherProfileId?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            studentProfile: { select: { id: true } },
            teacherProfile: { select: { id: true } },
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
          throw new Error("Account is deactivated");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatarUrl: user.avatarUrl,
          image: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as { role: UserRole }).role;
        token.avatarUrl = (user as { avatarUrl?: string | null }).avatarUrl;

        // Fetch profile IDs
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id! },
          include: {
            studentProfile: { select: { id: true } },
            teacherProfile: { select: { id: true } },
          },
        });

        if (dbUser) {
          token.studentProfileId = dbUser.studentProfile?.id ?? null;
          token.teacherProfileId = dbUser.teacherProfile?.id ?? null;
        }
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.avatarUrl = session.avatarUrl;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.avatarUrl = token.avatarUrl as string | null;
        session.user.studentProfileId = token.studentProfileId as string | null;
        session.user.teacherProfileId = token.teacherProfileId as string | null;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Check if user exists, if not they'll be created by the adapter
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        
        if (existingUser && !existingUser.isActive) {
          return false; // Block deactivated users
        }
      }
      return true;
    },
  },
});
