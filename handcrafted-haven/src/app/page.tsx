import styles from "./ui/styles/page.module.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header.jsx";
import { Hero } from "./components/hero.jsx";
import { Information } from "./components/information.jsx";

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
