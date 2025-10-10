import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

type DBUser = {
  account_id: string;
  account_email: string;
  account_password: string;
  account_firstname: string | null;
  account_type: string;
};

interface ExtendedUser extends User {
  accountType?: string;
}

export async function getUser(email: string): Promise<DBUser | undefined> {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const user =
      await sql<DBUser>`SELECT * FROM account WHERE account_email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const config = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          console.log("[AUTH] Credentials failed validation");
          return null;
        }

        const { email, password } = parsed.data;

        try {
          const user = await getUser(email);

          if (!user) {
            console.log("[AUTH] No user found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.account_password
          );

          if (!passwordsMatch) {
            console.log("[AUTH] Password incorrect");
            return null;
          }

          return {
            id: String(user.account_id),
            name: user.account_firstname ?? null,
            email: user.account_email,
            accountType: user.account_type,
          };
        } catch (error) {
          console.error("[AUTH] Database error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && user.id) {
        token.id = user.id;
        token.accountType = (user as ExtendedUser).accountType;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          accountType: token.accountType as string,
        },
      };
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn } = NextAuth(config);
