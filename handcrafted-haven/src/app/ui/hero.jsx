import React from "react";
import styles from "@/app/page.module.css";
import Image from "next/image";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImage}>
        <Image
          src="/images/handcrafted-hero.jpg"
          alt="Handcrafted products"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.hero__title}>
          Discover Unique Handcrafted Treasures
        </h1>
        <p className={styles.hero__subtitle}>
          Connect with artisans and find one-of-a-kind creations made with
          passion.
        </p>
        <div className={styles.hero__actions}>
          <a href="/explore" className={`${styles.btn} ${styles.btnPrimary}`}>
            Start Exploring
          </a>
          <a href="/sellers" className={`${styles.btn} ${styles.btnSecondary}`}>
            Join as a Seller
          </a>
        </div>
      </div>
    </section>
  );
}
