"use client";

import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header.jsx";
import UserForm from "@/app/components/user-form";
import styles from "@styles/sellerForm.module.scss";

export default function Sellers() {
  return (
    <div>
      <Header />
      <main className={styles.container}>
        {/* <picture className={styles.banner}>
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 1024px)" />
        <source srcSet="/images/banner-form-desktop.webp" media="(min-width: 768px)" />
        <img src="/images/banner-form.webp" alt="banner" className={styles.bannerImage} />
      </picture> */}

        <h1 className={styles.title}>Register an Account</h1>
        <p className={styles.subtitle}>
          Create your account to participate in our community!
        </p>

        <UserForm />
      </main>

      <Footer />
    </div>
  );
}
