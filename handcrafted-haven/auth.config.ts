import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { pool } from "@/app/lib/db";

export default {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const email =
            typeof credentials?.email === "string"
              ? credentials.email.trim().toLowerCase()
              : "";
          const password =
            typeof credentials?.password === "string" ? credentials.password : "";

          if (!email || !password) return null;

          const { rows } = await pool.query(
            `SELECT account_id, account_email, account_password
             FROM account
             WHERE account_email = $1
             LIMIT 1`,
            [email]
          );

          const user = rows?.[0];
          if (!user?.account_password) return null;

          const ok = await bcrypt.compare(password, user.account_password);
          if (!ok) return null;

          return {
            id: String(user.account_id),
            email: user.account_email as string,
            name: (user.account_email as string)?.split("@")[0] ?? undefined,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      
      if (user?.id) token.id = user.id as string;
      return token;
    },

    async session({ session, token }) {
     
      if (session.user && token?.id) {
        
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const target = new URL(url);
        if (target.origin === baseUrl) return url;
      } catch {
        
      }
      return baseUrl;
    },
  },

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
