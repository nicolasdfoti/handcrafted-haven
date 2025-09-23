import styles from "./page.module.css";
import { Footer } from "./ui/footer.jsx";
import { Header } from "./ui/header.jsx";
import { Hero } from "./ui/hero.jsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
