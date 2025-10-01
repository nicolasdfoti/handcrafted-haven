import { Footer } from "@/app/ui/footer.jsx";
import { Header } from "@/app/ui/header.jsx";
import styles from "../styles/page.module.css";

export default function Products() {
  return (
    <div className={`${styles["page"]} ${styles["marketplace__page"]}`}>
      <Header />
      <main className={`${styles["marketplace__container"]}`}>
        <div className={`${styles["marketplace__header"]}`}>
          <h1>hi</h1>
        </div>
        <div className={`${styles["marketplace__dynamic-content"]}`}>
          <div className={`${styles["marketplace__products"]}`}></div>
          <div className={`${styles["marketplace__sidebar"]}`}>
            <h2>hi</h2>
          </div>
          {/*
          <div className={`${styles["marketplace__mobile-sidebar"]}`}>
              <h2>hi</h2>
          </div>*/}
        </div>
      </main>
      <Footer />
    </div>
  );
}
