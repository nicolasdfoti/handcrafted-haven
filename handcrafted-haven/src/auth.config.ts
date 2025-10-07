import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  debug: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // Solo proteger el dashboard (requiere login)
      if (isOnDashboard) {
        return isLoggedIn;
      }
      // Ahora no va a forzar ningún redirect, deja que el frontend redirija.
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

