'use client';

import Link from "next/link";
import styles from "@/app/ui/styles/page.module.css";
import { useSession, signOut } from 'next-auth/react';

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/explore",
  },
  {
    name: "Artisans",
    href: "/sellers",
  },
  {
    name: "Contact",
    href: "/",
  },
];

export function NavLinks() {
  // const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

 return (
    <nav className={styles.nav}>

      <div className={styles.right}>
        {links.map((x) => (
          <Link href={x.href} key={x.name}>
            <p>{x.name}</p>
          </Link>
        ))}

        {session?.user && (
          <Link href={`/sellers/profile`}>
            <p>My Profile</p>
          </Link>
        )}
      </div>

      <div className={styles.login}>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : !session?.user ? (
          <Link href="/login">
            <p>Login</p>
          </Link>
        ) : (
          <>
            <Link href={`/sellers/${session.user.id}`}>
              <p>Hello, {session.user.name}!</p>
            </Link>
            <button
              onClick={handleLogout}
              className={styles.logout_button}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};