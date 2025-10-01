import { Footer } from "@/app/ui/footer.jsx";
import { Header } from "@/app/ui/header.jsx";
import styles from "../styles/page.module.css";
import Image from "next/image";
import { Product } from "@/app/lib/definitions";
//import { fetchProductList } from "@/app/lib/data"

//const productList = await fetchProductList();

export default function Products() {
  return (
    <div className={`${styles["page"]} ${styles["marketplace__page"]}`}>
      <Header />
      <main className={`${styles["marketplace__container"]}`}>
        <div className={`${styles["marketplace__header"]}`}>
          <h1>hi</h1>
        </div>
        <div className={`${styles["marketplace__dynamic-content"]}`}>
          <div className={`${styles["marketplace__products"]}`}>
            <div className={`${styles["marketplace__product-card"]}`}>
              <div className={`${styles["image-wrapper"]}`}>
                {/*
                <Image 
                src={}//fetched product image
                />*/}
              </div>
              <h2>Product Title</h2>

              <a
                className={`${styles["marketplace__listing-button"]}`}
                href="#"
              >
                View Listing
              </a>
            </div>
          </div>
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
