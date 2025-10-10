import React from "react";
import styles from "@/app/ui/styles/page.module.css";

export function RegisterCta() {
  return (
      <div className={styles.sellersCta}>
        <h2 className={styles.sellersCta__title}>
          Join Our Artisan Community! Explore and buy unique crafts.
        </h2>
        <div className={styles.hero__actions}>
          <a href="/register" className={`${styles.btn} ${styles.btnSecondarySellers}`}>
            Join Now
          </a>
        </div>
      </div>
  );
}
