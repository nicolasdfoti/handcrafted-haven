import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header.jsx";
import styles from "@styles/thankyou.module.scss";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>Thank You for Applying!</h1>
        <p className={styles.subtitle}>
          We appreciate your interest in becoming a seller on our platform. Our
          team will review your application and get back to you shortly.
        </p>
        <p className={styles.subtitle}>
          In the meantime, feel free to explore our marketplace and discover the
          amazing crafts from other sellers.
        </p>
        <p>
          <strong>
            For demonstration purposes, you have been verified as a seller.
          </strong>
        </p>

        <Link href="/" style={{ marginTop: '1rem', display: 'inline-block' }}>
        ← Back to Home
      </Link>

      </main>
      <Footer />
    </div>
  );
}
