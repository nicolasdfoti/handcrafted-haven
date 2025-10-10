// auth.config.js
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  debug: true,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSellersRoute = nextUrl.pathname.startsWith("/sellers");

      if (isOnSellersRoute) {
        if (isLoggedIn) return true;
        const loginUrl = new URL("/login", nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(loginUrl);
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.accountType = user.accountType;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      
      return token;
    },
    
    async session({ session, token }) {

      if (token && session.user) {
        const t = token as Record<string, unknown>;
        if (typeof t.id === "string") {
          session.user.id = t.id;
        } else if (typeof t.id === "number") {
          session.user.id = String(t.id);
        }

        if (typeof t.accountType === "string") {
          session.user.accountType = t.accountType;
        }
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;