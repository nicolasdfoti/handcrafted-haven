import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header.jsx";
import styles from "../ui/styles/page.module.css";
import { Product } from "@/app/lib/definitions";
import { fetchFromDB } from "../components/components";
import { ProductListings } from "../components/product-listings";


export default async function Products() {
  const products = (await fetchFromDB<Product>(
    "products",
    {},
    { limit: 50 }
  )) as Product[];

  // Calling the function immediately to run on load
  (async function printFunction() {
    console.log(products);
  })();

  return (
    <div className={`${styles["page"]} ${styles["marketplace__page"]}`}>
      <Header />
      <main className={`${styles["marketplace__container"]}`}>
        <div className={`${styles["marketplace__header"]}`}>
          <h1>Marketplace</h1>
        </div>

        <div className={`${styles["marketplace__dynamic-content"]}`}>
          <div className={`${styles["marketplace__search"]}`}>
            <h2>Search</h2>
          </div>
          <div className={`${styles["marketplace__sidebar"]}`}>
            <h2>Filter</h2>
          </div>
          <ProductListings products={products || []} />

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
