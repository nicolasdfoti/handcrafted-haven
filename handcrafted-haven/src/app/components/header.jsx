import { NavLinks } from "./NavLinks";
import styles from "@/app/ui/styles/header.module.css";
import Logo from "./Logo";
import { SessionProvider } from "next-auth/react";

export function Header() {
  return (
    <header className={styles.header}>
        <Logo />
        <SessionProvider>
          <NavLinks />
        </SessionProvider>
    </header>
  );
}