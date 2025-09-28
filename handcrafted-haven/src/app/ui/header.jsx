import { Navigation } from "./nav.jsx";
import styles from "@/app/styles/page.module.css";
import Image from "next/image.js";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">
          <Image
            src="/images/logo.png"
            alt="Handcrafted Haven Logo"
            width={200}
            height={100}
            priority
          />
        </a>
        {/* <a href="/"><h1>Handcrafted Haven</h1></a> */}
      </div>
      <Navigation />
    </header>
  );
}
