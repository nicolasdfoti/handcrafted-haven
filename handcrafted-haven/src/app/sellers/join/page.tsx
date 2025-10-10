import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header.jsx";
import SellerForm from "@/app/components/seller-form";
import styles from "@styles/sellerForm.module.scss";
import { auth } from "@/auth";

export default async function Sellers() {
  const session = await auth();

  return (
    <div>
      <Header />
      <main className={styles.container}>
        {/* <picture className={styles.banner}>
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 1024px)" />
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 768px)" />
        <img src="/images/banner-form.webp" alt="banner" className={styles.bannerImage} />
      </picture> */}

        <h1 className={styles.title}>Apply as a Seller</h1>
        <p className={styles.subtitle}>
          Create your account and tell us about your craft. We will review and get
          back to you.
        </p>

        <SellerForm />
      </main>

      <Footer />
    </div>
  );
}
