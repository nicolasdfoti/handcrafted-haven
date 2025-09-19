import styles from "./page.module.css";
import { Footer } from "./ui/footer.jsx";
import { Header } from "./ui/header.jsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Footer />
    </div>
  );
}
