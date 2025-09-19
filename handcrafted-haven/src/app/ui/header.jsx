import { Navigation } from "./nav.jsx";
import styles from '@/app/page.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Handcrafted Haven</h1>
      </div>
      <Navigation />
    </header>
  );
}
