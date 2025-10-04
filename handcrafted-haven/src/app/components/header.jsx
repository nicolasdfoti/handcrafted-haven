import {NavLinks} from "./NavLinks";
import styles from "@/app/ui/styles/page.module.css";
import Logo from "./Logo";

export function Header() {
  return (
    <header className={styles.header}>
        <Logo />
        <NavLinks />
    </header>
  );
}
