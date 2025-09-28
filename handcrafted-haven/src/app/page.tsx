import styles from "./styles/page.module.css";
import { Footer } from "./ui/footer.jsx";
import { Header } from "./ui/header.jsx";
import { Hero } from "./ui/hero.jsx";
import { Information } from "./ui/information.jsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Hero />
      <Information />
      <Footer />
    </div>
  );
}
