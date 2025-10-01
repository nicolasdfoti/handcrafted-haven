import { Footer } from '@/app/ui/footer.jsx';
import { Header } from '@/app/ui/header.jsx';
import styles from '../styles/sellers.module.scss';


export default function ThankYou() {
  return (
    <div>
      <Header />            
        <main className={styles.container}>
            <h1 className={styles.title}>Thank You for Applying!</h1>
            <p className={styles.subtitle}>
                We appreciate your interest in becoming a seller on our platform. Our team will review your application and get back to you shortly.
            </p>
            <p className={styles.subtitle}>
                In the meantime, feel free to explore our marketplace and discover the amazing crafts from other sellers.
            </p>
        </main>
        <Footer />
    </div>
  );
}