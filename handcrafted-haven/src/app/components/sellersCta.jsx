import React from "react";
import styles from "@/app/ui/styles/page.module.css";

export function SellersCta() {
  return (
      <div className={styles.sellersCta}>
        <h2 className={styles.sellersCta__title}>
          Are you a artisan? Sell your creations at Handcrafted Haven!
        </h2>
        <div className={styles.hero__actions}>
          <a href="/sellers/join" className={`${styles.btn} ${styles.btnSecondarySellers}`}>
            Join as a Seller
          </a>
        </div>
      </div>
  );
}
