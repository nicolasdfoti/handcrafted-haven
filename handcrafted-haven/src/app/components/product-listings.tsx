import React from "react";
import { ProductListing } from "./components";
import { Product } from "../lib/definitions";
import styles from "../ui/styles/page.module.css";

interface ProductListingsProps {
  products: Product[];
}

export function ProductListings({ products }: ProductListingsProps) {
  return (
    <div className={`${styles["marketplace__products"]}`}>
      {products.map((product) => (
        <ProductListing
          key={product.product_id}
          product={product}
          className={`${styles["marketplace__product-card"]}`}
        />
      ))}
    </div>
  );
}
