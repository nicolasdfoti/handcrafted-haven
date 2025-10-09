import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  debug: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSellersRoute = nextUrl.pathname.startsWith("/sellers");

      if (isOnSellersRoute) {
        if (isLoggedIn) return true;

        // Redirect to login with callback URL
        const loginUrl = new URL("/login", nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(loginUrl);
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
