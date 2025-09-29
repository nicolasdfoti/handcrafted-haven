import { Footer } from "@/app/ui/footer.jsx";
import { Header } from "@/app/ui/header.jsx";
import styles from "../styles/page.module.css";

export default function Products() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={`${styles["marketplace-container"]}`}>
        <h1>hello</h1>
      </main>
      <Footer />
    </div>
  );
}
