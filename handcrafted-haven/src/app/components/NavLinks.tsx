'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "@/app/ui/styles/header.module.css";
import { useSession, signOut } from 'next-auth/react';

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/explore" },
  { name: "Artisans", href: "/sellers" },
];

export function NavLinks() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  // Close click outside drawer
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  return (
    <nav className={styles.nav}>
      {/* Burger button (mobile only) */}
      <button
        className={styles.burger}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="primary-drawer"
        onClick={() => setOpen(v => !v)}
      >
        <span className={styles.burgerBars} />
      </button>

      {/* Online links (desktop) */}
      <div className={styles.right}>
        {links.map((x) => (
          <Link href={x.href} key={x.name}><p>{x.name}</p></Link>
        ))}
      </div>

      {/* Login/account block (desktop) */}
      <div className={styles.login}>
        {status === "loading" ? (
          <p style={{ fontFamily: "Poppins, sans-serif" }}>Loading...</p>
        ) : !session?.user ? (
          <Link href="/login"><p>Login</p></Link>
        ) : (
          <>
            <Link href={`/profile/${session.user.id}`}>
              <p>Hello, {session.user.name}!</p>
            </Link>
            <button onClick={handleLogout} className={styles.logout_button}>Logout</button>
          </>
        )}
      </div>

      {/* Drawer mobile */}
      <div
        id="primary-drawer"
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
      >
        <ul className={styles.drawerList} role="list">
          {links.map((x) => (
            <li key={x.name} className={styles.drawerItem}>
              <Link href={x.href} onClick={() => setOpen(false)} className={styles.drawerLink}>
                {x.name}
              </Link>
            </li>
          ))}
          {session?.user && (
            <>
              <li className={styles.drawerItem}>
                <Link href={`/sellers/profile`} onClick={() => setOpen(false)} className={styles.drawerLink}>
                  My Profile
                </Link>
              </li>
              <li className={styles.drawerItem}>
                <Link href={`/sellers/${session.user.id}`} onClick={() => setOpen(false)} className={styles.drawerLink}>
                  Hello, {session.user.name}!
                </Link>
              </li>
              <li className={styles.drawerItem}>
                <button onClick={() => { setOpen(false); handleLogout(); }} className={styles.drawerLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!session?.user && status !== "loading" && (
            <li className={styles.drawerItem}>
              <Link href="/login" onClick={() => setOpen(false)} className={styles.drawerLogin}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Overlay */}
      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} />
    </nav>
  );
}
