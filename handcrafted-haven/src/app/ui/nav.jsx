import styles from "@/app/page.module.css"

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="">Sellers</a>
        </li>
        <li>
          <a href="">Explore</a>
        </li>
      </ul>
    </nav>
  );
}
