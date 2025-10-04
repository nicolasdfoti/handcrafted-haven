'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/ui/styles/page.module.css";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/",
  },
  {
    name: "Artisans",
    href: "/",
  },
  {
    name: "Contact",
    href: "/",
  },
];

export function NavLinks() {
  const pathname = usePathname();
  console.log("pathname :>> ", pathname);
  return (
    <>

    <nav className={styles.nav}>
        <div className={styles.right}>
            {links
            .filter((x) => x.name !== "Login")
            .map((x) => (
                <Link href={x.href} key={x.name}>
                <p>{x.name}</p>
                </Link>
            ))}
        </div>
        <div className={styles.login}>
            <Link href="/login">
            <p>Login</p>
            </Link>
        </div>
    </nav>

    </>
  );
};